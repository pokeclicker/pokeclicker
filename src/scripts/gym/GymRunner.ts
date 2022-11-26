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
        this.initialRun = initialRun;
        this.autoRestart(autoRestart);
        this.running(false);
        this.gymObservable(gym);
        App.game.gameState = GameConstants.GameState.idle;
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        GymRunner.timeLeft(GameConstants.GYM_TIME * this.timeBonus());
        GymRunner.timeLeftPercentage(100);

        GymBattle.gym = gym;
        GymBattle.totalPokemons(gym.getPokemonList().length);
        GymBattle.index(0);
        GymBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.gym;
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
        // If the user doesn't want the animation, just return
        if (!Settings.getSetting('showGymGoAnimation').value) {
            return;
        }

        if (!this.autoRestart() || this.initialRun) {
            $('#gymGoContainer').show();
            setTimeout(() => {
                $('#gymGo').attr('src', 'assets/gifs/go.gif');
            }, 0);
        }
    }

    public static tick() {
        if (!this.running()) {
            return;
        }
        if (this.timeLeft() < 0) {
            GymRunner.gymLost();
        }

        this.timeLeft(this.timeLeft() - GameConstants.GYM_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / (GameConstants.GYM_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));

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

    public static gymLost() {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: `It appears you are not strong enough to defeat ${GymBattle.gym.leaderName.replace(/\d/g, '')}.`,
                type: NotificationConstants.NotificationOption.danger,
            });
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static gymWon(gym: Gym) {
        if (this.running()) {
            this.running(false);
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
            if (this.autoRestart()) {
                const cost = (this.gymObservable().moneyReward || 10) * 2;
                const amt = new Amount(cost, GameConstants.Currency.money);
                // If the player can afford it, restart the gym
                if (App.game.wallet.loseAmount(amt)) {
                    this.startGym(this.gymObservable(), this.autoRestart(), false);
                    return;
                }
            }

            // Award money for defeating gym
            App.game.wallet.gainMoney(gym.moneyReward);
            // Send the player back to the town they were in
            player.town(gym.parent);
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(GymRunner.timeLeft() / 100) / 10).toFixed(1);
    })

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
