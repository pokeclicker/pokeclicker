/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/notifications/Notifier.d.ts" />
/// <reference path="../../declarations/notifications/NotificationConstants.d.ts" />

class ContestRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.CONTEST_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    public static maxAudienceAppeal: KnockoutObservable<number> = ko.observable(1);
    public static audienceAppeal: KnockoutObservable<number> = ko.observable(0);

    public static crowdHype: KnockoutObservable<number> = ko.observable(0);
    public static jamTime: KnockoutObservable<number> = ko.observable(0);
    public static frenzyTime: KnockoutObservable<number> = ko.observable(0);
    public static encoreRound: KnockoutObservable<number> = ko.observable(0);

    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static rank: KnockoutObservable<number> = ko.observable(0);
    public static type: KnockoutObservable<number> = ko.observable(0);

    // Updated via ContestHall.ts
    public static contestTypeObservable: KnockoutObservableArray<ContestType> = ko.observableArray();
    public static contestRankObservable: KnockoutObservableArray<ContestRank> = ko.observableArray();

    public static startContest(
        rank: ContestRank,
        type: ContestType
    ) {
        // Check if unlocked
        if (!ContestHelper.contestIsUnlocked(rank, type)) {
            Notifier.notify({
                title: 'Pokémon Contest',
                message: `You have not won the previous Rank\'s ${ContestType[type]} contest yet.`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        // Set up for new contest
        ContestRunner.running(false);
        ContestRunner.rank(rank);
        ContestRunner.type(type);
        ContestBattle.danceMode(ContestHelper.isDanceHall(ContestRunner.rank()));
        ContestRunner.timeLeft(GameConstants.CONTEST_TIME * ContestHelper.contestRankTimer(ContestRunner.rank()));
        ContestRunner.timeLeftPercentage(100);
        ContestRunner.maxAudienceAppeal(ContestHelper.rankAppeal[ContestRunner.rank()]); // todo: increase number when pokeblocks are in

        // Ready up the rhythm gimmicks
        ContestBattle.selectedEnemy(0);
        ContestBattle.counter = 0;
        ContestBattle.beat(0);
        ContestBattle.crotchetValue(ContestRunner.type());
        ContestBattleSpectacular.activeSpectacularType(ContestRunner.type());

        // Give fresh reward log
        ContestBattle.tokenReward(0);
        ContestBattle.itemRewardLog().forEach(i => i.amount(0));
        ContestBattle.berryRewardLog().forEach(b => b.amount(0));

        // Begin contest
        ContestBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.contest;
        ContestRunner.running(true);
    }

    public static endContest() {
        ContestRunner.running(false);

        ContestRunner.updateScore();

        // Reset score
        ContestScore.totalScore(0);
        ContestScore.activeChain(1);

        // Reset stuff that would interfere with manually test-starting the contest
        ContestBattle.prepareNextTrainerBatch(false);
        ContestBattle.frenzyMode(false);
        ContestRunner.audienceAppeal(0);
        ContestRunner.crowdHype(0);
        ContestRunner.jamTime(0);
        ContestRunner.frenzyTime(0);
        ContestRunner.encoreRound(0);
        
        // Empty arrays
        ContestBattle.trainers.removeAll();
        ContestBattle.pokemons.removeAll();
        ContestBattle.trainersPartyIndex.removeAll();
        ContestBattle.moveArray.removeAll();
        ContestBattle.finishingPose.removeAll();
    }

    public static resetContest() {
        ContestRunner.endContest();
        ContestRunner.startContest(ContestRunner.rank(), ContestRunner.type());
    }

    public static tick() {
        if (!ContestRunner.running()) {
            return;
        }
        // Assess completion
        if (ContestRunner.timeLeft() < 0) {
            ContestRunner.isRallied() ? ContestRunner.contestWon() : ContestRunner.contestLost();
        }
        // Transition from Frenzy
        if (ContestBattle.frenzyMode() && ContestRunner.frenzyTime() <= 0) {
            ContestBattle.frenzyMode(false);
            ContestRunner.crowdHype(0);
            ContestBattle.prepareNextTrainerBatch(true);
        }

        // Timers
            // Regular timer, only count down if no frenzy
        ContestRunner.timeLeft(ContestRunner.timeLeft() - (!ContestBattle.frenzyMode() ? GameConstants.CONTEST_TICK : 0));
            // Percentage for html
        ContestRunner.timeLeftPercentage(Math.floor(!ContestBattle.frenzyMode() ?
            ContestRunner.timeLeft() / (GameConstants.CONTEST_TIME * ContestHelper.contestRankTimer(ContestRunner.rank())) * 100 :
            ContestRunner.frenzyTime() / GameConstants.CONTEST_TIME * 100
        ));
            // Always reduce gimmick timers
        ContestRunner.jamTime(Math.max(ContestRunner.jamTime() - GameConstants.CONTEST_TICK, 0));
        ContestRunner.frenzyTime(Math.max(ContestRunner.frenzyTime() - GameConstants.CONTEST_TICK, 0));
    }

    // Completion
    public static isRallied(): boolean {
        return ContestRunner.audienceAppeal() >= ContestRunner.maxAudienceAppeal();
    }

    /**
     * Gain audience points
     * @param rally - by how much to increase the audience bar
     */
    public static rally(rally: number): void {
        ContestRunner.audienceAppeal(Math.min(ContestRunner.audienceAppeal() + Math.round(rally), ContestRunner.maxAudienceAppeal()));
    }

    public static getTrainerList() {
        return ContestTrainerList.ContestOpponents[ContestRunner.rank()].concat(ContestTrainerList.SpecialEventContestOpponents).filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }

    public static contestTokenReward() {
        let multiplier = 100;
        multiplier += ContestBattle.contestClearedMultiplier();
        multiplier /= 100;
        return Math.floor(ContestRunner.rank() + ContestRunner.rank() * Math.round(ContestScore.totalScore() * multiplier / 100));
    }

    public static updateScore() {
        if (ContestRunner.rank() != ContestRank.Practice) {
            App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](Math.max(App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](), ContestScore.totalScore()));
        } else {
            App.game.statistics.contestHighestScore[ContestRunner.rank()][ContestRunner.type()](ContestScore.totalScore());
        }
    }

    public static contestLost() {
        if (ContestRunner.running()) {
            Notifier.notify({
                title: 'Pokémon Contest',
                message: 'You did not accrue enough appeal to win the crowd over.',
                type: NotificationConstants.NotificationOption.danger,
                // TODO: setting to turn off contest notifications
            });
            ContestRunner.endContest();
        }
    }

    public static contestWon() {
        if (ContestRunner.running()) {
            if (ContestRunner.rank() > ContestRank.Practice) {
                // Award tokens after each round
                ContestBattle.addContestTokenReward(ContestRunner.contestTokenReward());
                Notifier.notify({
                    title: 'Pokémon Contest',
                    message: `Congratulations! You won <img src="./assets/images/currency/contestToken.svg" height="16px"/> ${ContestRunner.contestTokenReward()} Contest Tokens!`,
                    type: NotificationConstants.NotificationOption.success,
                    // TODO: setting to turn off contest notifications
                });

                // First time completion - end here and don't proceed to encore bonus rounds
                if (App.game.statistics.contestHighestRound[this.rank()][this.type()]() == 0) {
                    $('#contestWonModal').modal('show');
                    ContestRunner.endContest();
                    GameHelper.incrementObservable(App.game.statistics.contestHighestRound[ContestRunner.rank()][ContestRunner.type()]);
                    return;
                }

                // Update statistics
                App.game.statistics.contestHighestRound[ContestRunner.rank()][ContestRunner.type()](Math.max(App.game.statistics.contestHighestRound[ContestRunner.rank()][ContestRunner.type()](), ContestRunner.encoreRound() + 1));
                ContestRunner.updateScore();
            }

            // Reset time and appeal
            ContestRunner.audienceAppeal(0);
            ContestRunner.timeLeft(GameConstants.CONTEST_TIME * ContestHelper.contestRankTimer(ContestRunner.rank()));
            // Increase encore round
            ContestRunner.encoreRound(ContestRunner.encoreRound() + 1);
            ContestRunner.maxAudienceAppeal(ContestHelper.rankAppeal[ContestRunner.rank()] * ContestRunner.encoreRound());
        }
    }

    // Computables
    public static audienceAppealPercentage: KnockoutComputed<number> = ko.pureComputed(() => {
        return Math.floor(ContestRunner.audienceAppeal() / ContestRunner.maxAudienceAppeal() * 100);
    })

    public static audienceStatus: KnockoutComputed<string> = ko.pureComputed(() => {
        return `${`${ContestRunner.audienceAppeal().toLocaleString('en-US')} / ${ContestRunner.maxAudienceAppeal().toLocaleString('en-US')}`}`;
    })

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil((!ContestBattle.frenzyMode() ? ContestRunner.timeLeft() : ContestRunner.frenzyTime()) / 100) / 10).toFixed(1);
    })
}

ContestRunner satisfies TmpContestRunnerType;
