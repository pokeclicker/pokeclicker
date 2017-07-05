/**
 * Created by dennis on 05-07-17.
 */
class GymRunner {

    static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static startGym(gym: Gym) {
        Game.gameState(GameConstants.GameState.idle);

        GymBattle.gym = gym;
        GymBattle.index(0);
        GymBattle.totalPokemons(gym.pokemons.length);
        GymRunner.timeLeft(GameConstants.GYM_TIME);
        Game.gameState(GameConstants.GameState.gym);
        GymBattle.generateNewEnemy();

    }

    public static tick() {
        if (this.timeLeft() < 0) {
            GymRunner.gymLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.GYM_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.GYM_TIME * 100))
    }

    public static gymLost() {
        Game.gameState(GameConstants.GameState.town);
    }

    public static gymWon(gym: Gym) {
        player.gainMoney(gym.moneyReward);
        Game.gameState(GameConstants.GameState.town);
    }

    public static timeLeftSeconds = ko.computed(function () {
        return Math.ceil(GymRunner.timeLeft() / 10) / 10;
    })

}