///<reference path="wildBattle/RouteHelper.ts"/>
///<reference path="Battle.ts"/>
/**
 * Start the game when all html elements are loaded.
 */
let player;
const debug = false;

document.addEventListener("DOMContentLoaded", function (event) {
    if (debug) {
        $('.loader').hide("fast")
    }
    Preload.loadTownImages();
    OakItemRunner.initialize();
    UndergroundItem.initialize();
    let game: Game = new Game();
    // DungeonRunner.initializeDungeon(dungeonList["Viridian Forest"]);
    game.start();

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

    (ko as any).bindingHandlers.tooltip = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            let local = ko.utils.unwrapObservable(valueAccessor()),
                options = {};

            ko.utils.extend(options, ko.bindingHandlers.tooltip.options);
            ko.utils.extend(options, local);

            $(element).tooltip(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).tooltip("dispose");
            });

            if (bindingContext.$data instanceof Plot) {
                $(element).hover(function () {
                    $(this).data('to', setInterval(function () {
                        $(element).tooltip('hide')
                            .attr('data-original-title', FarmRunner.getTooltipLabel(bindingContext.$index()))
                            .tooltip('show');
                    }, 100));
                }, function () {
                    clearInterval($(this).data('to'));
                });
            }

        },
        options: {
            placement: "bottom",
            trigger: "click"
        }
    };

    PokedexHelper.populateTypeFilters();
    PokedexHelper.updateList();

    ko.applyBindings(game);
    ko.options.deferUpdates = true;

    Game.applyRouteBindings();

});


/**
 * Main game class.
 */
class Game {
    interval;
    undergroundCounter: number;
    farmCounter: number = 0;
    public static achievementCounter: number = 0;

    public static gameState: KnockoutObservable<GameConstants.GameState> = ko.observable(GameConstants.GameState.fighting);

    constructor() {
        player = Save.load();
        KeyItemHandler.initialize();
        AchievementHandler.initialize();
        player.gainKeyItem("Coin case", true);
        player.gainKeyItem("Teachy tv", true);
        player.gainKeyItem("Pokeball bag", true);
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
        FarmRunner.counter += GameConstants.TICK_TIME;
        Game.achievementCounter += GameConstants.TICK_TIME;
        if (Game.achievementCounter > GameConstants.ACHIEVEMENT_TICK) {
            Game.achievementCounter = 0;
            AchievementHandler.checkAchievements();
        }
        Save.counter += GameConstants.TICK_TIME;
        Underground.counter += GameConstants.TICK_TIME;

        GameHelper.counter += GameConstants.TICK_TIME;
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
            let now = new Date();
            if (new Date(player._lastSeen).toLocaleDateString() !== now.toLocaleDateString()) {
                player.questRefreshes = 0;
                QuestHelper.quitQuest();
                QuestHelper.clearQuests();
                QuestHelper.generateQuests(player.questLevel, player.questRefreshes, now);
                DailyDeal.generateDeals(player.maxDailyDeals, now);
                Notifier.notify("It's a new day! Your quests and underground deals have been updated.", GameConstants.NotificationOption.info);
            }
            player._lastSeen = Date.now()
            Save.store(player);
        }

        if (Underground.counter > GameConstants.UNDERGROUND_TICK) {
            Underground.energyTick(Math.max(0, Underground.energyTick() - 1));
            if (Underground.energyTick() == 0) {
                Underground.gainEnergy();
                Underground.energyTick(player._mineEnergyRegenTime());
            }
            Underground.counter = 0;
        }

        if (FarmRunner.counter > GameConstants.FARM_TICK) {
            FarmRunner.tick();
        }

        if (GameHelper.counter > 60 * 1000) {
            GameHelper.updateTime();
        }
    }

    save() {

    }

    load() {
        OakItemRunner.loadOakItems();
        Battle.generateNewEnemy();
        Save.loadMine();
        Underground.energyTick(player._mineEnergyRegenTime())
        DailyDeal.generateDeals(player.maxDailyDeals, new Date());
        QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date());
        QuestHelper.loadCurrentQuest(player.currentQuest());
    }

    static applyRouteBindings() {
        $('path, rect').hover(function () {
            let id = $(this).attr('data-town');
            if (id && id != 'mapTooltipWrapper') {
                let tooltip = $('#mapTooltip');
                tooltip.text(id);
                tooltip.css('visibility', 'visible')

            }
        }, function () {
            let tooltip = $('#mapTooltip');
            tooltip.text('');
            tooltip.css('visibility', 'hidden')
        });
    }

}

