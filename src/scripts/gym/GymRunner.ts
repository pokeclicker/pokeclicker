/**
 * Created by dennis on 05-07-17.
 */
class GymRunner {

    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    public static gymObservable: KnockoutObservable<Gym> = ko.observable(gymList["Pewter City"]);

    public static startGym(gym: Gym) {
        this.gymObservable(gym);
        if (Gym.isUnlocked(gym)) {
            if (gym instanceof Champion) {
                gym.setPokemon(player.starter);
            }
            Game.gameState(GameConstants.GameState.idle);

            GymBattle.gym = gym;
            GymBattle.index(0);
            GymBattle.totalPokemons(gym.pokemons.length);
            GymRunner.timeLeft(GameConstants.GYM_TIME);
            Game.gameState(GameConstants.GameState.gym);
            GymBattle.generateNewEnemy();
        } else {
            Notifier.notify(gym.leaderName + " does not deem you a worthy opponent yet...<br>Perhaps you can convince her with more gym badges", GameConstants.NotificationOption.danger);
        }
    }

    public static tick() {
        if (this.timeLeft() < 0) {
            GymRunner.gymLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.GYM_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.GYM_TIME * 100))
    }

    public static gymLost() {
        Notifier.notify("It appears you are not strong enough to defeat " + GymBattle.gym.leaderName, GameConstants.NotificationOption.danger);
        Game.gameState(GameConstants.GameState.town);
    }

    public static gymWon(gym: Gym) {
        Notifier.notify("Congratulations, you defeated " + GymBattle.gym.leaderName + "!", GameConstants.NotificationOption.success);
        this.gymObservable(gym);
        player.gainMoney(gym.moneyReward);
        if (!player.hasBadge(gym.badgeReward)) {
            player.gainBadge(gym.badgeReward);

            $('#receiveBadgeModal').modal('show');
        }
        let gymIndex = GameConstants.Gyms.indexOf(gym.town);
        player.gymDefeats[gymIndex]( player.gymDefeats[gymIndex]()+1 );
        player.town(TownList[gym.town]);
        MapHelper.updateAllRoutes();
        Game.gameState(GameConstants.GameState.town);
    }

    public static timeLeftSeconds = ko.computed(function () {
        return (Math.ceil(GymRunner.timeLeft() / 10) / 10).toFixed(1);
    })

}

document.addEventListener("DOMContentLoaded", function (event) {

    $('#receiveBadgeModal').on('hidden.bs.modal', function () {
       if(GymBattle.gym.badgeReward == GameConstants.Badge.Boulder){
           player.gainKeyItem("Dungeon ticket");
       }
       if(GymBattle.gym.badgeReward == GameConstants.Badge.Soul){
           player.gainKeyItem("Safari ticket");
       }

    });
});