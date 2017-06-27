///<reference path="wildBattle/RouteHelper.ts"/>
///<reference path="Battle.ts"/>

document.addEventListener("DOMContentLoaded", function (event) {
    let game: Game = new Game();
    game.start()
});
class Game {
    interval: number;
    battleCounter: number;
    undergroundCounter: number;
    farmCounter: number;

    constructor() {

    }

    start() {
        this.load();
        this.interval = setInterval(this.gameTick(), GameConstants.TICK_TIME);
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Update tick counters
        this.battleCounter += GameConstants.TICK_TIME;
        this.undergroundCounter += GameConstants.TICK_TIME;
        this.farmCounter += GameConstants.TICK_TIME;

        if(this.battleCounter > GameConstants.BATTLE_TICK){
            this.battleCounter = 0;
            Battle.turn();
        }
        console.log(pokemonFactory.generateWildPokemon(1, GameConstants.Regions.kanto));
    }

    save() {

    }

    load() {

    }
}
