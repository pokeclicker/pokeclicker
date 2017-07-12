///<reference path="wildBattle/RouteHelper.ts"/>
///<reference path="Battle.ts"/>
/**
 * Start the game when all html elements are loaded.
 */
declare var player;
const debug = false;


document.addEventListener("DOMContentLoaded", function (event) {
    OakItemRunner.initialize();
    let game: Game = new Game();
    // DungeonRunner.initializeDungeon(dungeonList["Viridian Forest"]);
    game.start();

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    ko.bindingHandlers.tooltip = {
        init: function(element, valueAccessor) {
            var local = ko.utils.unwrapObservable(valueAccessor()),
                options = {};

            ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
            ko.utils.extend(options, local);

            $(element).tooltip(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                // $(element).tooltip("destroy");
            });
        },
        options: {
            placement: "bottom",
            trigger: "click"
        }
    };

    ko.applyBindings(Game);
    ko.options.deferUpdates = true;
});

/**
 * Main game class.
 */
class Game {
    interval;
    undergroundCounter: number;
    farmCounter: number;

    public static gameState : KnockoutObservable<GameConstants.GameState> = ko.observable(GameConstants.GameState.fighting);

    constructor() {
        (<any>window).player = Save.load();
    }

    start() {
        player.region = GameConstants.Region.kanto;
        this.load();

        this.interval = setInterval(this.gameTick, GameConstants.TICK_TIME);
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Update tick counters
        this.undergroundCounter += GameConstants.TICK_TIME;
        this.farmCounter += GameConstants.TICK_TIME;
        Save.counter += GameConstants.TICK_TIME;

        switch (Game.gameState()) {
            case GameConstants.GameState.fighting: {
                Battle.counter += GameConstants.TICK_TIME;
                if (Battle.counter > GameConstants.BATTLE_TICK) {
                    Battle.tick();
                }
                break;
            }
            case GameConstants.GameState.gym: {
                GymBattle.counter += GameConstants.TICK_TIME;
                if (GymBattle.counter > GameConstants.BATTLE_TICK) {
                    GymBattle.tick();
                }
                GymRunner.tick();
                break;
            }
            case GameConstants.GameState.dungeon: {
                DungeonBattle.counter += GameConstants.TICK_TIME;
                if (DungeonBattle.counter > GameConstants.BATTLE_TICK) {
                    DungeonBattle.tick();
                }
                DungeonRunner.tick();
                break;
            }
        }



        if (Save.counter > GameConstants.SAVE_TICK) {
            Save.store(player);
        }
    }

    save() {

    }

    load() {
        OakItemRunner.loadOakItems();
        Battle.generateNewEnemy();
    }
}
