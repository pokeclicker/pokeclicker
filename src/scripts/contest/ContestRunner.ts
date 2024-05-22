/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.CONTEST_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static maxAudienceAppeal: KnockoutObservable<number> = ko.observable(1);
    public static audienceAppeal: KnockoutObservable<number> = ko.observable(0);
    public static audienceAppealPercentage: KnockoutObservable<number> = ko.observable(0);

    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static rank: KnockoutObservable<ContestRank> = ko.observable();
    public static type: KnockoutObservable<ContestType> = ko.observable();
    public static trainers: KnockoutObservableArray<ContestTrainer> = ko.observableArray([]);

    // Updated via ContestHall.ts
    public static contestTypeObservable: KnockoutObservableArray<ContestType> = ko.observableArray([]);
    public static contestRankObservable: KnockoutObservableArray<ContestRank> = ko.observableArray([]);

    public static startContest(
        rank: ContestRank,
        type: ContestType
    ) {
        ContestRunner.running(false);
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        ContestRunner.timeLeft(GameConstants.CONTEST_TIME * ContestRunner.timeBonus());
        ContestRunner.timeLeftPercentage(100);

        ContestRunner.rank(rank);
        ContestRunner.type(type);

        ContestRunner.maxAudienceAppeal(ContestHelper.rankAppeal(ContestRunner.rank()) * 80 * Math.pow(ContestRunner.rank(), 2));
        ContestRunner.audienceAppeal(0);
        ContestRunner.audienceAppealPercentage(0);

        ContestRunner.trainers(Rand.shuffleArray(ContestOpponents[ContestRunner.rank()]));
        ContestBattle.trainerIndex(0);
        ContestBattle.pokemonIndex(0);
        ContestBattle.trainerStreak(0);
        ContestBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.contest;
        ContestRunner.running(true);
        ContestRunner.resetGif();

        setTimeout(() => {
            ContestRunner.hideGif();
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
        if (!ContestRunner.running()) {
            return;
        }
        if (ContestRunner.timeLeft() < 0) {
            ContestRunner.isRallied() ? ContestRunner.contestWon() : ContestRunner.contestLost();
            ContestBattle.enemyPokemon(null);
            ContestBattle.trainer(null);
        }
        ContestRunner.timeLeft(ContestRunner.timeLeft() - GameConstants.CONTEST_TICK);
        ContestRunner.timeLeftPercentage(Math.floor(ContestRunner.timeLeft() / (GameConstants.CONTEST_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));

        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != ContestRunner.timeBonus()) {
            if (currentFluteBonus > ContestRunner.timeBonus()) {
                if (ContestRunner.timeBonus() === 1) {
                    ContestRunner.timeBonus(currentFluteBonus);
                    ContestRunner.timeLeft(ContestRunner.timeLeft() * ContestRunner.timeBonus());
                } else {
                    ContestRunner.timeLeft(ContestRunner.timeLeft() / ContestRunner.timeBonus());
                    ContestRunner.timeBonus(currentFluteBonus);
                    ContestRunner.timeLeft(ContestRunner.timeLeft() * ContestRunner.timeBonus());
                }
            } else {
                ContestRunner.timeLeft(ContestRunner.timeLeft() / ContestRunner.timeBonus());
                ContestRunner.timeBonus(currentFluteBonus);
            }
        }
    }

    public static isRallied(): boolean {
        return ContestRunner.audienceAppeal() >= ContestRunner.maxAudienceAppeal();
    }

    /**
     * Gain audience points
     * @param rally
     */
    public static rally(rally: number): void {
        ContestRunner.audienceAppeal(Math.min(ContestRunner.audienceAppeal() + rally, ContestRunner.maxAudienceAppeal()));
        ContestRunner.audienceAppealPercentage(Math.floor(ContestRunner.audienceAppeal() / ContestRunner.maxAudienceAppeal() * 100));
    }

    public static getTrainerList() {
        return ContestRunner.trainers().filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }

    public static contestLost() {
        if (ContestRunner.running()) {
            ContestRunner.running(false);
            Notifier.notify({
                message: 'You did not have enough appeal to win the crowd over.',
                type: NotificationConstants.NotificationOption.danger,
            });
        }
    }

    public static contestWon() {
        if (ContestRunner.running()) {
            ContestRunner.running(false);
            const contestTokenMultiplier = ContestBattle.trainerStreak();
            const rank = ContestRunner.rank();
            const tokenReward = Math.floor(5 + (rank * 2) + (0.1 * rank * contestTokenMultiplier));
            // Award money for defeating gym
            App.game.wallet.gainContestTokens(tokenReward);
            Notifier.notify({
                message: `Congratulations, you won ${tokenReward} Contest Tokens!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.gym_won,
            });
            // TODO: reward ribbons to party pokemon based on rank, type, and how high their appeal is
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(ContestRunner.timeLeft() / 100) / 10).toFixed(1);
    })
}
