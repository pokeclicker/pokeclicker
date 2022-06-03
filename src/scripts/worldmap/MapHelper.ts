/// <reference path="../../declarations/DataStore/StatisticStore/index.d.ts" />
/// <reference path="../GameConstants.d.ts" />

enum areaStatus {
    currentLocation,
    locked,
    unlockedUnfinished,
    questOnRoute,
    questAtLocation,
    questAtLocationFlash,
    uncaughtPokemon,
    uncaughtShinyPokemonAndMissingAchievement,
    uncaughtShinyPokemon,
    missingAchievement,
    completed,
}

class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (isNaN(route)) {
            return;
        }
        const routeData = Routes.getRoute(region, route);
        let genNewEnemy = false;
        if (route != Battle.route) {
            genNewEnemy = true;
        }
        if (this.accessToRoute(route, region)) {
            player.route(route);
            player._subregion(routeData.subRegion != undefined ? routeData.subRegion : 0);
            if (player.region != region) {
                player.region = region;
            }
            if (genNewEnemy && !Battle.catching()) {
                Battle.generateNewEnemy();
            }
            App.game.gameState = GameConstants.GameState.fighting;
        } else {
            if (!MapHelper.routeExist(route, region)) {
                return Notifier.notify({
                    message: `${Routes.getName(route, region)} does not exist in the ${GameConstants.Region[region]} region.`,
                    type: NotificationConstants.NotificationOption.danger,
                });
            }

            const reqsList = [];

            routeData.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });

            Notifier.notify({
                message: `You don't have access to that route yet.\n${reqsList.join('\n')}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    };

    public static routeExist(route: number, region: GameConstants.Region): boolean {
        return !!Routes.getRoute(region, route);
    }

    public static normalizeRoute(route: number, region: GameConstants.Region): number {
        return Routes.normalizedNumber(region, route);
    }

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        return this.routeExist(route, region) && Routes.getRoute(region, route).isUnlocked();
    };

    public static getCurrentEnvironment(): GameConstants.Environment {
        const area = player.route() || player.town()?.name || undefined;

        const [env] = Object.entries(GameConstants.Environments).find(
            ([, regions]) => regions[player.region]?.has(area)
        ) || [];

        return (env as GameConstants.Environment);
    }

    public static calculateBattleCssClass(): string {
        return GameConstants.EnvironmentCssClass[this.getCurrentEnvironment()];
    }

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        let cls = '';

        if (player.route() == route && player.region == region) {
            cls = areaStatus[areaStatus.currentLocation];
        } else if (!MapHelper.accessToRoute(route, region)) {
            cls = areaStatus[areaStatus.locked];
        } else  if (App.game.statistics.routeKills[region][route]() < GameConstants.ROUTE_KILLS_NEEDED) {
            cls = areaStatus[areaStatus.unlockedUnfinished];
        } else  if (RouteHelper.isThereQuestAtLocation(route, region)) {
            cls = areaStatus[areaStatus.questOnRoute];
        } else if (!RouteHelper.routeCompleted(route, region, false)) {
            cls = areaStatus[areaStatus.uncaughtPokemon];
        } else if (!RouteHelper.routeCompleted(route, region, true) && !RouteHelper.isAchievementsComplete(route, region)) {
            cls = areaStatus[areaStatus.uncaughtShinyPokemonAndMissingAchievement];
        } else if (!RouteHelper.routeCompleted(route, region, true)) {
            cls = areaStatus[areaStatus.uncaughtShinyPokemon];
        } else if (!RouteHelper.isAchievementsComplete(route, region)) {
            cls = areaStatus[areaStatus.missingAchievement];
        } else {
            cls = areaStatus[areaStatus.completed];
        }

        // Water routes
        if (GameConstants.Environments.Water[region]?.has(route)) {
            cls = `${cls} waterRoute`;
        }

        return cls;
    }

    public static calculateTownCssClass(townName: string): string {
        // Check if we are currently at this location
        if (!player.route() && player.town().name == townName) {
            return areaStatus[areaStatus.currentLocation];
        }
        // Check if this location is locked
        if (!MapHelper.accessToTown(townName)) {
            return areaStatus[areaStatus.locked];
        }
        const states = [];
        // Is this location a dungeon
        if (dungeonList[townName]) {
            if (!App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(townName)]()) {
                return areaStatus[areaStatus.unlockedUnfinished];
            } else if (DungeonRunner.isThereQuestAtLocation(dungeonList[townName])) {
                if(Settings.getSetting('addQuestLocationFlash').observableValue()){
                    return areaStatus[areaStatus.questAtLocationFlash]
                } else {
                    return areaStatus[areaStatus.questAtLocation];
                }
            } else if (!DungeonRunner.dungeonCompleted(dungeonList[townName], false)) {
                return areaStatus[areaStatus.uncaughtPokemon];
            } else if (!DungeonRunner.dungeonCompleted(dungeonList[townName], true) && !DungeonRunner.isAchievementsComplete(dungeonList[townName])) {
                return areaStatus[areaStatus.uncaughtShinyPokemonAndMissingAchievement];
            } else if (!DungeonRunner.dungeonCompleted(dungeonList[townName], true)) {
                return areaStatus[areaStatus.uncaughtShinyPokemon];
            } else if (!DungeonRunner.isAchievementsComplete(dungeonList[townName])) {
                return areaStatus[areaStatus.missingAchievement];
            }
        }
        const town = TownList[townName];
        town.content.forEach(c => {
            states.push(c.areaStatus());
        });
        if (states.length) {
            return areaStatus[Math.min(...states)];
        }
        return areaStatus[areaStatus.completed];
    }

    public static accessToTown(townName: string): boolean {
        const town = TownList[townName];
        if (!town) {
            return false;
        }
        return town.isUnlocked();
    }

    public static moveToTown(townName: string) {
        if (MapHelper.accessToTown(townName)) {
            App.game.gameState = GameConstants.GameState.idle;
            player.route(0);
            Battle.route = 0;
            Battle.catching(false);
            const town = TownList[townName];
            player.town(town);
            Battle.enemyPokemon(null);
            //this should happen last, so all the values all set beforehand
            App.game.gameState = GameConstants.GameState.town;
        } else {
            const town = TownList[townName];
            const reqsList = [];

            town.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });

            Notifier.notify({
                message: `You don't have access to that location yet.\n${reqsList.join('\n')}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static validRoute(route = 0, region: GameConstants.Region = 0): boolean {
        return !!Routes.getRoute(region, route);
    }

    public static openShipModal() {
        const openModal = () => {
            $('#ShipModal').modal('show');
        };
        if (player.highestRegion() > 0 && (TownList[GameConstants.DockTowns[player.region]].isUnlocked())) {
            openModal();
        } else {
            Notifier.notify({
                message: 'You cannot access this dock yet',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static ableToTravel() {
        // If player already reached highest region, they can't move on
        if (player.highestRegion() >= GameConstants.MAX_AVAILABLE_REGION) {
            return false;
        }

        // Check if player doesn't require complete dex to move on to the next region and has access to next regions starter town
        if (!App.game.challenges.list.requireCompletePokedex.active()) {
            return TownList[GameConstants.StartingTowns[player.highestRegion() + 1]]?.isUnlocked() ?? false;
        }

        // Check if all regional pokemon are obtained
        return AchievementHandler.findByName(`${GameConstants.camelCaseToString(GameConstants.Region[player.highestRegion()])} Master`).isCompleted();
    }

    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            // Gain queue slots based on highest region
            App.game.breeding.gainQueueSlot(App.game.breeding.queueSlotsGainedFromRegion(player.highestRegion()));
            GameHelper.incrementObservable(player.highestRegion);
            player.highestSubRegion(0);
            MapHelper.moveToTown(GameConstants.StartingTowns[player.highestRegion()]);
            player.region = player.highestRegion();
            // Track when users move region and how long it took in seconds
            LogEvent('new region', 'new region',
                GameConstants.Region[player.highestRegion()],
                App.game.statistics.secondsPlayed());
            // Gather users attack when they moved regions
            LogEvent('attack measurement', 'new region',
                GameConstants.Region[player.highestRegion()],
                App.game.party.calculatePokemonAttack(undefined, undefined, true, undefined, true, false, WeatherType.Clear));
            $('#pickStarterModal').modal('show');
        }
    }

}
