///<reference path="wildBattle/RouteHelper.ts"/>
///<reference path="Battle.ts"/>
///<reference path="PlayerView.ts"/>
/**
 * Start the game when all html elements are loaded.
 */
document.addEventListener("DOMContentLoaded", function (event) {
    let game: Game = new Game();
    game.start();
});

/**
 * Main game class.
 */
class Game {
    interval;
    undergroundCounter: number;
    farmCounter: number;

    constructor() {

    }

    start() {
        Player.route = 1;
        Player.region = GameConstants.Region.kanto;
        this.load();
        this.interval = setInterval(this.gameTick, GameConstants.TICK_TIME);
        console.log("started");
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Update tick counters
        Battle.counter += GameConstants.TICK_TIME;
        this.undergroundCounter += GameConstants.TICK_TIME;
        this.farmCounter += GameConstants.TICK_TIME;

        if (Battle.counter > GameConstants.BATTLE_TICK) {
            Battle.tick();
        }

    }

    save() {

    }

    load() {
        Battle.generateNewEnemy();
    }
}
