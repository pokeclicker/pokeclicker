/// <reference path="../../declarations/GameHelper.d.ts" />
// /// <reference path="../../declarations/enums/Ribbons.d.ts" />

class ContestRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.CONTEST_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static appeal: KnockoutObservable<number> = ko.observable(0);
    public static appealPercentage: KnockoutObservable<number> = ko.observable(100);

    public static contestObservable: KnockoutObservable<Contest> = ko.observable();
    public static contestTypeObservable: KnockoutObservableArray<ContestType> = ko.observableArray([]);
    public static contestRankObservable: KnockoutObservableArray<ContestRank> = ko.observableArray([]);
    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static startContest(
        contest: Contest
    ) {
        this.running(false);
        this.contestObservable(contest);
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        this.timeLeft(GameConstants.CONTEST_TIME * this.timeBonus());
        this.timeLeftPercentage(100);

        this.appeal(0);
        this.appealPercentage(100);

        ContestBattle.contest = contest;
        ContestBattle.contest.audienceAppeal = ko.observable(0);
        ContestBattle.contest.audiencePercentageAppeal = ko.observable(0);

        contest.trainers = Rand.shuffleArray(contest.trainers);
        ContestBattle.trainerIndex(0);
        ContestBattle.pokemonIndex(0);
        ContestBattle.totalTrainers(0);
        ContestBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.contest;
        this.running(true);
        this.resetGif();

        setTimeout(() => {
            this.hideGif();
        }, GameConstants.GYM_COUNTDOWN);
    }

    private static hideGif() {
        $('#gymGoContainer').hide();
    }

    public static resetGif() {
        if (!Settings.getSetting('showGymGoAnimation').value) {
            return;
        }
        $('#gymGoContainer').show();
        setTimeout(() => {
            $('#gymGo').attr('src', 'assets/gifs/go.gif');
        }, 0);
    }

    public static tick() {
        if (!this.running()) {
            return;
        }
        if (this.timeLeft() < 0) {
            ContestBattle.contest.isRallied() ? this.contestWon() : this.contestLost();
            ContestBattle.enemyPokemon(null);
            ContestBattle.trainer(null);
        }
        this.timeLeft(this.timeLeft() - GameConstants.CONTEST_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / (GameConstants.CONTEST_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));

        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != this.timeBonus()) {
            if (currentFluteBonus > this.timeBonus()) {
                if (this.timeBonus() === 1) {
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                } else {
                    this.timeLeft(this.timeLeft() / this.timeBonus());
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                }
            } else {
                this.timeLeft(this.timeLeft() / this.timeBonus());
                this.timeBonus(currentFluteBonus);
            }
        }
    }

    public static contestLost() {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: 'You did not have enough appeal to win the crowd over.',
                type: NotificationConstants.NotificationOption.danger,
            });
        }
    }

    public static contestWon() {
        if (this.running()) {
            this.running(false);         
            const contestTokenMultiplier = ContestBattle.totalTrainers();
            const rank = ContestBattle.contest.rank;
            const tokenReward = Math.floor(4 + (rank * 2) + (0.1 * rank * contestTokenMultiplier));
            // Award money for defeating gym
            App.game.wallet.gainContestTokens(tokenReward);
            Notifier.notify({
                message: `Congratulations, you won ${tokenReward} Contest Tokens!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.gym_won,
            });
            // first time reward

            // GameHelper.incrementObservable(App.game.statistics.contestsWon[GameConstants.getContestIndex(contest.name)]); maybe?

        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(this.timeLeft() / 100) / 10).toFixed(1);
    })

    public static getEnvironmentArea() {
        const contest = this.contestObservable();
        return contest.optionalArgs.environment;
    }
}
