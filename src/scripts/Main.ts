///<reference path="wildBattle/RouteHelper.ts"/>
///<reference path="Battle.ts"/>
/**
 * Start the game when all html elements are loaded.
 */
let player;
const debug = true;
let game;

if (!debug)
  Object.freeze(GameConstants);

interface JQuery {
    animateNumber(options: object): void;
}

document.addEventListener("DOMContentLoaded", function (event) {
    Preload.load(debug).then(function () {
        OakItemRunner.initialize();
        UndergroundItem.initialize();
        Prestige.initialize();

        game = new Game();
        // DungeonRunner.initializeDungeon(dungeonList["Viridian Forest"]);

        $(document).ready(function () {
            $('[data-toggle="popover"]').popover();
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
        Preload.hideSplashScreen();
        game.start();
    });
});

/**
 * Main game class.
 */
class Game {
    interval;
    undergroundCounter: number;
    public static achievementCounter: number = 0;

    public static gameState: KnockoutObservable<GameConstants.GameState> = ko.observable(GameConstants.GameState.fighting);

    constructor() {
        player = Save.load();
        KeyItemHandler.initialize();
        AchievementHandler.initialize();
        player.gainKeyItem("Coin case", true);
        player.gainKeyItem("Teachy tv", true);
        player.gainKeyItem("Pokeball bag", true);
        this.load();
    }

    start() {
        console.log("game started");
        this.interval = setInterval(this.gameTick, GameConstants.TICK_TIME);
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Update tick counters
        this.undergroundCounter += GameConstants.TICK_TIME;
        FarmRunner.counter += GameConstants.TICK_TIME;
        EffectEngineRunner.counter += GameConstants.TICK_TIME;
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
                QuestHelper.quitAllQuests();
                QuestHelper.clearQuests();
                QuestHelper.generateQuests(player.questLevel, player.questRefreshes, now);
                DailyDeal.generateDeals(Underground.getDailyDealsMax(), now);
                Notifier.notify("It's a new day! Your quests and underground deals have been updated.", GameConstants.NotificationOption.info);
            }
            player._lastSeen = Date.now()
            Save.store(player);
        }

        if (Underground.counter > GameConstants.UNDERGROUND_TICK) {
            Underground.energyTick(Math.max(0, Underground.energyTick() - 1));
            if (Underground.energyTick() == 0) {
                Underground.gainEnergy();
                Underground.energyTick(Underground.getEnergyRegenTime());
            }
            Underground.counter = 0;
        }

        if (FarmRunner.counter > GameConstants.FARM_TICK) {
            FarmRunner.tick();
        }

        if (EffectEngineRunner.counter > GameConstants.EFFECT_ENGINE_TICK){
            EffectEngineRunner.tick();
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
        Safari.load();
        Save.loadMine();
        Underground.energyTick(Underground.getEnergyRegenTime());
        DailyDeal.generateDeals(Underground.getDailyDealsMax(), new Date());
        QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date());
        QuestHelper.loadCurrentQuests(player.currentQuests);
        if (!player.tutorialComplete()) {
            QuestLineHelper.createTutorial();
            QuestLineHelper.tutorial.resumeAt(player.tutorialProgress(), player.tutorialState);
        }
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

    static updateMoney(text: string = $("#playerMoney").text()) {
        $("#playerMoney").prop('number', player.money);
    }

    static animateMoney(money,target){
        let pos;
        if($('#'+target).offset()){
            pos = $('#'+target).offset();
        }else{
            pos = {"top":-200, "left":0};
        }

        let left= ((Math.random() * ((pos.left + 25) - (pos.left - 25)) + (pos.left - 25))).toFixed(2);
        let place = money.toString().length;
        let multi = 1;
        for(let i = 0; i < place; i++){
            multi *= 10;
        }
        let ani = '<p class="moneyanimation" style="z-index:50;position:absolute;left:'+left+'px;top:'+pos.top+'px;">+'+money+'</p>';
        $(ani).prependTo('body').animate({
            top: -100,
            opacity: 0
        }, 250 * Math.log(money) + 150,"linear",
            function() {
        $(this).remove();
        });
    }
}
