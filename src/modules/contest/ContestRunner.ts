import type {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
    PureComputed,
} from 'knockout';
import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import { CONTEST_TICK, CONTEST_TIME, GameState, SECOND } from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import ContestHelper from './ContestHelper';
import ContestScore from './ContestScore';
import ContestBattle from './ContestBattle';
import GameHelper from '../GameHelper';

export default class ContestRunner {
    // Timers
    public static timeLeft: KnockoutObservable<number> = ko.observable(CONTEST_TIME);
    public static frenzyTime: KnockoutObservable<number> = ko.observable(0);
    public static jamTime: KnockoutObservable<number> = ko.observable(0);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    // Audience
    public static maxAudienceAppeal: KnockoutObservable<number> = ko.observable(0);
    public static audienceAppeal: KnockoutObservable<number> = ko.observable(0);
    public static crowdHype: KnockoutObservable<number> = ko.observable(0);

    // Modes
    public static danceMode: KnockoutObservable<boolean> = ko.observable(false);
    public static frenzyMode: KnockoutObservable<boolean> = ko.observable(false);

    public static encoreRound: KnockoutObservable<number> = ko.observable(0);

    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static rank: KnockoutObservable<number> = ko.observable(0);
    public static type: KnockoutObservable<number> = ko.observable(0);

    // Updated via ContestHall.ts
    public static contestTypeObservable: KnockoutObservableArray<ContestType> = ko.observableArray([0, 1, 2, 3, 4]);
    public static contestRankObservable: KnockoutObservableArray<ContestRank> = ko.observableArray([1]);

    // Start, End
    public static startContest() {
        if (!ContestHelper.contestIsUnlocked(ContestRunner.rank(), ContestRunner.type())) {
            Notifier.notify({
                title: 'Pokémon Contest',
                message: ContestHelper.getContestHallRequirements(ContestRunner.rank(), ContestRunner.type()).flatMap(r => r.hint()).join(' and '),
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        ContestRunner.running(false);
        ContestRunner.danceMode(ContestHelper.isDanceHall(ContestRunner.rank()));
        ContestRunner.timeLeft((!ContestBattle.toggleTesting() ? (ContestHelper.contestRankTimer(ContestRunner.rank()) * 10) : ContestBattle.testTimer()) * SECOND);
        ContestRunner.timeLeftPercentage(100);
        ContestRunner.audienceAppeal(0);
        ContestRunner.maxAudienceAppeal(ContestHelper.getBaseAudienceHP(ContestRunner.rank()));

        // Reset gameplay gimmicks
        ContestRunner.crowdHype(0);
        ContestRunner.jamTime(0);
        ContestRunner.frenzyTime(0);
        ContestRunner.frenzyMode(false);
        ContestRunner.encoreRound(0);

        // Reset score
        ContestScore.totalScore(0);
        ContestScore.activeChain(1);
        ContestScore.encoreBonus(1);

        // Ready up the rhythm gimmicks
        ContestBattle.selectedEnemy(0);
        ContestBattle.counter = 0;
        ContestBattle.beat(0);
        ContestBattle.crotchetValue(ContestRunner.type());
        ContestBattle.activeSpectacularType(ContestRunner.type());

        // Give fresh reward log
        ContestBattle.tokenReward(0);
        ContestBattle.itemRewardLog().forEach(i => i.amount(0));
        ContestBattle.berryRewardLog().forEach(b => b.amount(0));

        // Begin contest
        ContestBattle.generateNewEnemy();
        App.game.gameState = GameState.contest;
        ContestRunner.running(true);
    }

    public static endContest() {
        ContestRunner.running(false);
        
        ContestBattle.prepareNextTrainerBatch(false);

        // Empty arrays
        ContestBattle.trainers.removeAll();
        ContestBattle.pokemons.removeAll();
        ContestBattle.trainersPartyIndex.removeAll();
        ContestBattle.moveArray.removeAll();
        ContestBattle.finishingPose.removeAll();
    }

    public static restartContest() {
        ContestRunner.endContest();
        ContestRunner.startContest();
    }

    public static tick() {
        if (!ContestRunner.running()) {
            return;
        }

        ContestBattle.pokemonAppeal(true);

        if (!ContestRunner.frenzyMode() && ContestRunner.timeLeftPercentage() < 100 && !ContestBattle.toggleTesting()) {
            ContestHelper.reduceSheenPerSecond(ContestRunner.rank(), ContestRunner.type(), ContestRunner.timeLeft());
        }
        // Assess completion
        if (ContestRunner.timeLeft() < 0) {
            ContestRunner.finishContest();
        }
        // Transition from Frenzy
        if (ContestRunner.frenzyMode() && ContestRunner.frenzyTime() <= 0) {
            ContestRunner.frenzyMode(false);
            ContestRunner.crowdHype(0);
            ContestBattle.prepareNextTrainerBatch(true);
        }

        // Timers
        // Regular timer, only count down if no frenzy
        ContestRunner.timeLeft(ContestRunner.timeLeft() - (!ContestRunner.frenzyMode() ? CONTEST_TICK : 0));
        // Percentage for html
        ContestRunner.timeLeftPercentage(Math.floor(!ContestRunner.frenzyMode() ?
            ContestRunner.timeLeft() / (CONTEST_TIME * ContestHelper.contestRankTimer(ContestRunner.rank())) * 100 :
            ContestRunner.frenzyTime() / CONTEST_TIME * 100,
        ));
        // Always reduce gimmick timers
        ContestRunner.jamTime(Math.max(ContestRunner.jamTime() - CONTEST_TICK, 0));
        ContestRunner.frenzyTime(Math.max(ContestRunner.frenzyTime() - CONTEST_TICK, 0));
    }

    // Completion
    public static isRallied(): boolean {
        return ContestRunner.audienceAppeal() >= ContestRunner.maxAudienceAppeal();
    }

    /**
     * Adds audience points and calculates encore bonus
     * Updates max audience bar if full
     * @param rally - by how much to increase the audience bar by
     */
    public static rally(rally: number): void {
        // expand max width of audience bar after last rally has been calculated so players have time to process completion status
        const baseHP = ContestHelper.getBaseAudienceHP(ContestRunner.rank());
        let alreadyRallied = false;
        if (ContestRunner.isRallied()) {
            alreadyRallied = true;
            ContestRunner.maxAudienceAppeal(Math.round(baseHP * Math.pow(1.5, ContestRunner.encoreRound())));
        }

        const rallyAmount = ContestRunner.audienceAppeal() + Math.round(rally);

        const encores = Math.ceil(Math.log10(Math.max(rallyAmount / baseHP, 1)) / Math.log10(1.5));

        ContestRunner.encoreRound(encores);
        ContestScore.encoreBonus(1 + encores / 10);

        ContestRunner.audienceAppeal(rallyAmount);

        // update bar if it's been full for too long to better indicate progress being made
        if (ContestRunner.isRallied() && alreadyRallied) {
            ContestRunner.maxAudienceAppeal(Math.round(baseHP * Math.pow(1.5, ContestRunner.encoreRound())));
        }
    }

    public static contestScoreTokens() {
        let multiplier = 100;
        multiplier += ContestBattle.contestClearedMultiplier();
        multiplier /= 100;
        return Math.floor(ContestRunner.rank() + ContestRunner.rank() * Math.round(ContestScore.totalScore() * multiplier / 100));
    }

    public static updateScore() {
        if (ContestRunner.rank() != ContestRank.Practice) {
            App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](
                Math.max(App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](), ContestScore.totalScore()),
            );
        } else {
            App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](ContestScore.totalScore());
        }
    }

    public static finishContest() {
        if (ContestRunner.running()) {
            ContestRunner.running(false);

            ContestRunner.updateScore();

            if (ContestRunner.encoreRound() > 0) {
                ContestBattle.addContestTokenReward(ContestRunner.contestScoreTokens(), true);

                // First time completion
                if (App.game.statistics.contestsWon[this.rank()][this.type()]() == 0) {
                    $('#contestWonModal').modal('show');
                }

                // Update statistics
                GameHelper.incrementObservable(App.game.statistics.contestsWon[ContestRunner.rank()][ContestRunner.type()]);
            }
        }
    }

    // HTML Computables
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static audienceAppealPercentage: PureComputed<number> = ko.pureComputed(() => {
        return Math.floor(ContestRunner.audienceAppeal() / ContestRunner.maxAudienceAppeal() * 100);
    });

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static audienceStatus: PureComputed<string> = ko.pureComputed(() => {
        return `${`${ContestRunner.audienceAppeal().toLocaleString('en-US')} / ${ContestRunner.maxAudienceAppeal().toLocaleString('en-US')}`}`;
    });

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static timeLeftSeconds: PureComputed<string> = ko.pureComputed(() => {
        return (Math.ceil((!ContestRunner.frenzyMode() ? ContestRunner.timeLeft() : ContestRunner.frenzyTime()) / 100) / 10).toFixed(1);
    });

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static crowdHypeComputable: PureComputed<string> = ko.pureComputed(() => {
        const appealLeft = '🤍';
        const appeal = ContestHelper.getContestEmoji(ContestRunner.type());
        if (!ContestRunner.jamTime()) {
            const hypePoints = Math.min(5, ContestRunner.crowdHype());
            return appeal.repeat(hypePoints).concat(appealLeft.repeat(5 - hypePoints));
        }

        // Jamming is specific to Hoenn contests and prevents crowd hype for its duration, so we turn the emojis into a timer
        const jam = '🖤';
        const jamTickInterval = ContestBattle.totalJamTime() / 5;
        return jam.repeat(Math.ceil(ContestRunner.jamTime() / jamTickInterval)).concat(Math.ceil(ContestRunner.jamTime() / jamTickInterval) === 5 ? '' : '🩶').concat(appealLeft.repeat(Math.max(4 - Math.ceil(ContestRunner.jamTime() / jamTickInterval), 0)));
    });
}
