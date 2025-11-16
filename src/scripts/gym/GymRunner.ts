/// <reference path="../../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/enums/Badges.d.ts" />

class GymRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static gymObservable: KnockoutObservable<Gym> = ko.observable(GymList['Pewter City']);
    public static running: KnockoutObservable<boolean> = ko.observable(false);
    public static autoRestart: KnockoutObservable<boolean> = ko.observable(false);
    public static initialRun = true;

    public static startGym(
        gym: Gym,
        autoRestart = false,
        initialRun = true
    ) {
        GymRunner.initialRun = initialRun;
        GymRunner.autoRestart(autoRestart);
        GymRunner.running(false);
        GymRunner.gymObservable(gym);
        App.game.gameState = GameConstants.GameState.idle;
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        GymRunner.timeLeft(GameConstants.GYM_TIME * GymRunner.timeBonus());
        GymRunner.timeLeftPercentage(100);

        GymBattle.gym = gym;
        GymBattle.totalPokemons(gym.getPokemonList().length);
        GymBattle.index(0);
        GymBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.gym;
        GymRunner.running(true);
        GymRunner.resetGif();

        setTimeout(() => {
            GymRunner.hideGif();
        }, GameConstants.GYM_COUNTDOWN);
    }

    private static hideGif() {
        $('#gymGoContainer').hide();
    }

    public static resetGif() {
        // If the user doesn't want the animation, just return
        if (!Settings.getSetting('showGymGoAnimation').value) {
            return;
        }

        if (!GymRunner.autoRestart() || GymRunner.initialRun) {
            $('#gymGoContainer').show();
            setTimeout(() => {
                $('#gymGo').attr('src', 'assets/gifs/go.gif');
            }, 0);
        }
    }

    public static tick() {
        if (!GymRunner.running()) {
            return;
        }
        if (GymRunner.timeLeft() < 0) {
            GymRunner.gymLost();
        }

        GymRunner.timeLeft(GymRunner.timeLeft() - GameConstants.GYM_TICK);
        GymRunner.timeLeftPercentage(Math.floor(GymRunner.timeLeft() / (GameConstants.GYM_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));

        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != GymRunner.timeBonus()) {
            if (currentFluteBonus > GymRunner.timeBonus()) {
                if (GymRunner.timeBonus() === 1) {
                    GymRunner.timeBonus(currentFluteBonus);
                    GymRunner.timeLeft(GymRunner.timeLeft() * GymRunner.timeBonus());
                } else {
                    GymRunner.timeLeft(GymRunner.timeLeft() / GymRunner.timeBonus());
                    GymRunner.timeBonus(currentFluteBonus);
                    GymRunner.timeLeft(GymRunner.timeLeft() * GymRunner.timeBonus());
                }
            } else {
                GymRunner.timeLeft(GymRunner.timeLeft() / GymRunner.timeBonus());
                GymRunner.timeBonus(currentFluteBonus);
            }
        }
    }

    public static gymLost() {
        if (GymRunner.running()) {
            GymRunner.running(false);
            Notifier.notify({
                message: `It appears you are not strong enough to defeat ${GymBattle.gym.leaderName.replace(/\d/g, '')}.`,
                type: NotificationConstants.NotificationOption.danger,
            });
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static gymWon(gym: Gym) {
        if (GymRunner.running()) {
            GymRunner.running(false);
            Notifier.notify({
                message: `Congratulations, you defeated ${GymBattle.gym.leaderName.replace(/\d/g, '')}!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.gym_won,
            });
            // If this is the first time defeating this gym
            if (!App.game.badgeCase.hasBadge(gym.badgeReward)) {
                gym.firstWinReward();
            }
            GameHelper.incrementObservable(App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gym.town)]);

            // Auto restart gym battle
            if (GymRunner.autoRestart()) {
                const clears = App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gym.town)]();
                const cost = clears >= 100 ? 0 : (GymRunner.gymObservable().moneyReward || 10) * 2;
                const amt = new Amount(cost, GameConstants.Currency.money);
                const reward = GymRunner.gymObservable().autoRestartReward();
                // If the player can afford it, restart the gym
                if (cost === 0 || App.game.wallet.loseAmount(amt)) {
                    if (reward > 0) {
                        App.game.wallet.gainMoney(reward);
                    }
                    GymRunner.startGym(GymRunner.gymObservable(), GymRunner.autoRestart(), false);
                    return;
                }
            }

            // Award money for defeating gym
            App.game.wallet.gainMoney(gym.moneyReward);
            // Send the player back to a town state
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(GymRunner.timeLeft() / 100) / 10).toFixed(1);
    })

    public static getEnvironmentArea() {
        const gym = GymRunner.gymObservable();
        return gym.optionalArgs.environment;
    }

    public static getBattleBackgroundImage() {
        const gym = GymRunner.gymObservable();
        return gym.optionalArgs.battleBackground;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    $('#receiveBadgeModal').on('hidden.bs.modal', () => {
        if (GymBattle.gym.badgeReward == BadgeEnums.Soul) {
            KeyItemController.showGainModal(KeyItemType.Safari_ticket);
        }
        if (GymBattle.gym.badgeReward == BadgeEnums.Earth) {
            KeyItemController.showGainModal(KeyItemType.Gem_case);
        }
    });
});

GymRunner satisfies TmpGymRunnerType;
