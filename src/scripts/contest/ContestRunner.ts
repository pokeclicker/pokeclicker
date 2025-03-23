/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.CONTEST_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static maxAudienceAppeal: KnockoutObservable<number> = ko.observable(1);
    public static audienceAppeal: KnockoutObservable<number> = ko.observable(0);

    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static rank: KnockoutObservable<ContestRank> = ko.observable();
    public static type: KnockoutObservable<ContestType> = ko.observable();
    public static trainers: KnockoutObservableArray<ContestTrainer> = ko.observableArray();

    public static encoreStatus: KnockoutObservable<boolean> = ko.observable(false);
    public static encoreRounds: KnockoutObservable<number> = ko.observable(0);
    public static finaleStatus: KnockoutObservable<boolean> = ko.observable(false);

    // Updated via ContestHall.ts
    public static contestTypeObservable: KnockoutObservableArray<ContestType> = ko.observableArray();
    public static contestRankObservable: KnockoutObservableArray<ContestRank> = ko.observableArray();

    public static startContest(
        rank: ContestRank,
        type: ContestType
    ) {
        if (!ContestHelper.contestIsUnlocked(rank, type)) {
            Notifier.notify({
                message: 'You have not won the previous rank\'s contest yet.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }
        ContestRunner.running(false);
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        ContestRunner.timeLeft(GameConstants.CONTEST_TIME * ContestRunner.timeBonus());
        ContestRunner.timeLeftPercentage(100);

        ContestRunner.rank(rank);
        ContestRunner.type(type);

        ContestRunner.maxAudienceAppeal(ContestHelper.rankAppeal[ContestRunner.rank()] * 80 * ContestRunner.rank() * ContestRunner.rank());
        ContestRunner.audienceAppeal(0);

        ContestRunner.encoreStatus(false);
        ContestRunner.encoreRounds(0);
        ContestRunner.finaleStatus(false);

        ContestRunner.trainers(Rand.shuffleArray(ContestOpponents[ContestRunner.rank()]));
        ContestBattle.trainerStreak(0);
        ContestBattle.clickCombo(0);
        ContestBattle.generateTrainers();
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
        // activate encore if doing well enough
        if (ContestRunner.timeLeft() >= 3 * GameConstants.SECOND && ContestRunner.isRallied() && ContestRunner.encoreStatus() != true && ContestRunner.finaleStatus() != true) {
            if (ContestRunner.encoreRounds() < ContestRunner.rank() || ContestRank.Spectacular <= ContestRunner.rank()) {
                Notifier.notify({
                    message: 'The crowd is cheering! Bonus round incoming!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.General.gym_won, // TODO: contest notifications
                });
                ContestRunner.encoreStatus(true);
            } else {
                Notifier.notify({
                    message: 'What a grand finale! Auto-restart incoming!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.General.gym_won, // TODO: contest notifications
                });
                ContestRunner.finaleStatus(true);
            }
        }
        if (ContestRunner.timeLeft() < 0) {
            ContestRunner.isRallied() ? ContestRunner.contestWon() : ContestRunner.contestLost();
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
    }

    public static getTrainerList() {
        return ContestRunner.trainers().filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }

    public static contestTokenReward() {
        const trainerBonus = ContestBattle.trainerStreak();
        const rankBonus = ContestRunner.rank();
        const clickBonus = ContestRunner.rank() < 5 ? ContestBattle.clickCombo() / 50 : 0;
        return Math.floor(5 + (trainerBonus * rankBonus) + (trainerBonus * clickBonus));
    }

    public static contestLost() {
        if (ContestRunner.running()) {
            ContestRunner.running(false);
            if (ContestRunner.encoreRounds() != 0) {
                // Award some tokens
                App.game.wallet.gainContestTokens(Math.floor(ContestRunner.contestTokenReward() / 3));
                Notifier.notify({
                    message: `Good job! You got a bonus of ${Math.floor(ContestRunner.contestTokenReward() / 3)} Contest Tokens!`,
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.General.gym_won, // TODO: contest notifications
                });
            } else {
                Notifier.notify({
                    message: 'You did not have enough appeal to win the crowd over.',
                    type: NotificationConstants.NotificationOption.danger,
                });
            }
            // always end the contest if lost
            ContestBattle.endContest();
        }
    }

    public static contestWon() {
        if (ContestRunner.running()) {
            // Award tokens after each round
            App.game.wallet.gainContestTokens(ContestRunner.contestTokenReward());
            Notifier.notify({
                message: `${ContestHelper.encoreWord[Math.min(ContestRunner.encoreRounds(), ContestRunner.rank())]} You won ${ContestRunner.contestTokenReward()} Contest Tokens!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.gym_won, // TODO: contest notifications
            });

            if (App.game.statistics.contestRoundsWon[this.rank()][this.type()]() == 0) {
                $('#contestWonModal').modal('show');
            }

            GameHelper.incrementObservable(App.game.statistics.contestRoundsWon[ContestRunner.rank()][ContestRunner.type()]);

            if (ContestRunner.encoreStatus()) {
                // increase encore round
                ContestRunner.encoreRounds(ContestRunner.encoreRounds() + 1);
                // reset audience, time, and encore status
                ContestRunner.audienceAppeal(0);
                ContestRunner.timeLeft(GameConstants.CONTEST_TIME * ContestRunner.timeBonus());
                ContestRunner.encoreStatus(false);
                // increase audience bar (needs updated encore round from above)
                ContestRunner.maxAudienceAppeal(ContestHelper.rankAppeal[ContestRunner.rank()] * 80 * ContestRunner.rank() * ContestRunner.rank() * (ContestRunner.encoreRounds() + 1));
            } else if (ContestRunner.finaleStatus()) {
                // if max encore rounds, auto restart contest
                ContestRunner.startContest(ContestRunner.rank(), ContestRunner.type());
            } else {
                // if neither, end the contest
                ContestRunner.running(false);
                ContestBattle.endContest();
            }

            // TODO: reward ribbons to party pokemon based on rank, type, and how high their appeal is
        }
    }

    // Computables
    public static audienceAppealPercentage: KnockoutComputed<number> = ko.pureComputed(() => {
        return Math.floor(ContestRunner.audienceAppeal() / ContestRunner.maxAudienceAppeal() * 100);
    })

    public static audienceStatus: KnockoutComputed<string> = ko.pureComputed(() => {
        if (!ContestRunner.encoreStatus() && !ContestRunner.finaleStatus()) {
            return `${`${ContestRunner.audienceAppeal().toLocaleString('en-US')} / ${ContestRunner.maxAudienceAppeal().toLocaleString('en-US')}`}`;
        } else {
            return ContestRunner.encoreStatus() ? '<i>Encore!</i>' : '<i>Grand Finale!</i>';
        }
    })

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(ContestRunner.timeLeft() / 100) / 10).toFixed(1);
    })
}

ContestRunner satisfies TmpContestRunnerType;
