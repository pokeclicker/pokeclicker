/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/enums/Badges.d.ts" />

class GymRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    public static gymObservable: KnockoutObservable<Gym> = ko.observable(gymList['Pewter City']);
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
        if (Gym.isUnlocked(gym)) {
            if (gym instanceof Champion) {
                gym.setPokemon(player.starter());
            }
            App.game.gameState = GameConstants.GameState.idle;
            GymRunner.timeLeft(GameConstants.GYM_TIME);
            GymRunner.timeLeftPercentage(100);

            GymBattle.gym = gym;
            GymBattle.totalPokemons(gym.pokemons.length);
            GymBattle.index(0);
            GymBattle.generateNewEnemy();
            App.game.gameState = GameConstants.GameState.gym;
            this.running(true);
            this.resetGif();

            setTimeout(() => {
                this.hideGif();
            }, GameConstants.GYM_COUNTDOWN);

        } else {
            const reqsList = [];
            gym.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });
            Notifier.notify({
                message: `You don't have access to ${gym.leaderName}s Gym yet.<br/>${reqsList.join('<br/>')}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    private static hideGif() {
        $('#gymCountdown').hide();
    }

    public static resetGif() {
        if (!this.autoRestart() || this.initialRun) {
            $('#gymCountdown').show();
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
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.GYM_TIME * 100));
    }

    public static gymLost() {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: `It appears you are not strong enough to defeat ${GymBattle.gym.leaderName}`,
                type: NotificationConstants.NotificationOption.danger,
            });
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static gymWon(gym: Gym) {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: `Congratulations, you defeated ${GymBattle.gym.leaderName}!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.gym_won,
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
            player.town(TownList[gym.town]);
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
            KeyItemController.showGainModal(KeyItems.KeyItem.Safari_ticket);
        }
        if (GymBattle.gym.badgeReward == BadgeEnums.Earth) {
            KeyItemController.showGainModal(KeyItems.KeyItem.Shard_case);
        }
    });
});
