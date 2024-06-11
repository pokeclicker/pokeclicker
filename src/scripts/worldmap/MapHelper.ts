/// <reference path="../../declarations/DataStore/StatisticStore/index.d.ts" />
/// <reference path="../GameConstants.d.ts" />

enum areaStatus {
    locked,
    incomplete,
    questAtLocation,
    uncaughtPokemon,
    uncaughtShadowPokemon,
    uncaughtShinyPokemonAndMissingAchievement,
    uncaughtShinyPokemon,
    missingAchievement,
    missingResistant,
    completed,
}

class MapHelper {

    public static getUsableFilters(): CssVariableSetting[] {
        return GameHelper.enumStrings(areaStatus).map(status => Settings.getSetting(`--${status}`)).filter(setting => setting.isUnlocked());
    }

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (isNaN(route)) {
            return;
        }
        const routeData = Routes.getRoute(region, route);
        if (MapHelper.accessToRoute(route, region)) {
            App.game.gameState = GameConstants.GameState.idle;
            if (player.region !== region) {
                MapHelper.moveToRegion(region, false);
            }
            const subRegion = routeData.subRegion ?? 0;
            if (player.subregion !== subRegion) {
                MapHelper.moveToSubRegion(region, subRegion, false);
            }
            player.route = route;
            const genNewEnemy = route != Battle.route;
            if (genNewEnemy && !Battle.catching()) {
                Battle.generateNewEnemy();
            }
            App.game.gameState = GameConstants.GameState.fighting;
        } else {
            if (!routeData) {
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
                message: `You don't have access to that route yet.\n<i>${reqsList.join('\n')}</i>`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    };

    public static routeExist(route: number, region: GameConstants.Region): boolean {
        return !!Routes.getRoute(region, route);
    }

    public static normalizeRoute(route: number, region: GameConstants.Region, skipIgnoredRoutes = true): number {
        return Routes.normalizedNumber(region, route, skipIgnoredRoutes);
    }

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        const routeData = Routes.getRoute(region, route);
        if (!routeData) {
            return false;
        }
        return routeData.isUnlocked() && MapHelper.accessToSubRegion(region, routeData.subRegion ?? 0);
    };

    public static getCurrentEnvironment(): GameConstants.Environment {
        const area = player.route ||
            (App.game.gameState == GameConstants.GameState.temporaryBattle
                ? TemporaryBattleRunner.getEnvironmentArea() : undefined) ||
            (App.game.gameState == GameConstants.GameState.gym
                ? GymRunner.getEnvironmentArea() : undefined) ||
            (App.game.gameState == GameConstants.GameState.battleFrontier
                ? BattleFrontierRunner.environment() : undefined) ||
            player.town?.name ||
            undefined;

        if (area in GameConstants.Environments) {
            return area;
        }

        const [env] = Object.entries(GameConstants.Environments).find(
            ([, regions]) => regions[player.region]?.has(area)
        ) || [];

        return (env as GameConstants.Environment);
    }

    public static calculateBattleCssClass(): string {
        return GameConstants.EnvironmentCssClass[MapHelper.getCurrentEnvironment()];
    }

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        let cls = '';

        if (!Routes.getRoute(region, route)?.isUnlocked()) {
            cls = areaStatus[areaStatus.locked];
        } else if (App.game.statistics.routeKills[region][route]() < GameConstants.ROUTE_KILLS_NEEDED) {
            cls = areaStatus[areaStatus.incomplete];
        } else if (RouteHelper.isThereQuestAtLocation(route, region)) {
            cls = areaStatus[areaStatus.questAtLocation];
        } else if (!RouteHelper.routeCompleted(route, region, false)) {
            cls = areaStatus[areaStatus.uncaughtPokemon];
        } else if (!RouteHelper.routeCompleted(route, region, true) && !RouteHelper.isAchievementsComplete(route, region)) {
            cls = areaStatus[areaStatus.uncaughtShinyPokemonAndMissingAchievement];
        } else if (!RouteHelper.routeCompleted(route, region, true)) {
            cls = areaStatus[areaStatus.uncaughtShinyPokemon];
        } else if (!RouteHelper.isAchievementsComplete(route, region)) {
            cls = areaStatus[areaStatus.missingAchievement];
        } else if (Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(RouteHelper.getAvailablePokemonList(route, region, true)) < GameConstants.Pokerus.Resistant) {
            cls = areaStatus[areaStatus.missingResistant];
        } else {
            cls = areaStatus[areaStatus.completed];
        }

        // Water routes
        if (GameConstants.Environments.Water[region]?.has(route)) {
            cls = `${cls} waterRoute`;
        }

        return cls;
    }

    public static isRouteCurrentLocation(route: number, region: GameConstants.Region): boolean {
        return player.route == route && player.region == region;
    }

    public static isTownCurrentLocation(townName: string): boolean {
        if (App.game.gameState == GameConstants.GameState.temporaryBattle) {
            return TemporaryBattleRunner.battleObservable().getTown().name == townName;
        }
        return !player.route && player.town.name == townName;
    }

    public static calculateTownCssClass(townName: string): string {
        // We don't want to spoil easter eggs with map colors
        if (TownList[townName]?.ignoreAreaStatus) {
            return '';
        }
        // Check if this location is locked
        if (!TownList[townName]?.isUnlocked()) {
            return areaStatus[areaStatus.locked];
        }
        const states = [];
        // Is this location a dungeon
        if (dungeonList[townName] && dungeonList[townName].isUnlocked()) {
            const possiblePokemon = dungeonList[townName].allAvailablePokemon();
            const shadowPokemon = dungeonList[townName].allAvailableShadowPokemon();

            if (!App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(townName)]()) {
                states.push(areaStatus.incomplete);
            } else if (dungeonList[townName].isThereQuestAtLocation()) {
                states.push(areaStatus.questAtLocation);
            } else if (!RouteHelper.listCompleted(possiblePokemon, false)) {
                states.push(areaStatus.uncaughtPokemon);
            } else if (Settings.getSetting(`--${areaStatus[areaStatus.uncaughtShadowPokemon]}`).isUnlocked()
                && shadowPokemon.some(pokemon => App.game.party.getPokemonByName(pokemon)?.shadow < GameConstants.ShadowStatus.Shadow)) {
                states.push(areaStatus.uncaughtShadowPokemon);
            } else if (!RouteHelper.listCompleted(possiblePokemon, true)) {
                if (!DungeonRunner.isAchievementsComplete(dungeonList[townName])) {
                    states.push(areaStatus.uncaughtShinyPokemonAndMissingAchievement);
                } else {
                    states.push(areaStatus.uncaughtShinyPokemon);
                }
            } else if (!DungeonRunner.isAchievementsComplete(dungeonList[townName])) {
                states.push(areaStatus.missingAchievement);
            } else if (Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(possiblePokemon) < GameConstants.Pokerus.Resistant) {
                states.push(areaStatus.missingResistant);
            }
        }
        const town = TownList[townName];
        town.content.forEach(c => {
            // If the town itself is not locked, it should never show locked
            if (c.areaStatus() != areaStatus.locked) {
                states.push(c.areaStatus());
            }
        });
        if (states.length) {
            const importantState = Math.min(...states);
            if (importantState >= areaStatus.uncaughtShinyPokemon && states.includes(areaStatus.uncaughtShinyPokemon) && states.includes(areaStatus.missingAchievement)) {
                return areaStatus[areaStatus.uncaughtShinyPokemonAndMissingAchievement];
            }
            return areaStatus[importantState];
        }
        return areaStatus[areaStatus.completed];
    }

    public static accessToTown(townName: string): boolean {
        const town = TownList[townName];
        if (!town) {
            return false;
        }
        return town.isUnlocked() && MapHelper.accessToSubRegion(town.region, town.subRegion);
    }

    public static moveToTown(townName: string) {
        const town = TownList[townName];
        if (MapHelper.accessToTown(townName)) {
            App.game.gameState = GameConstants.GameState.idle;
            if (player.region !== town.region) {
                MapHelper.moveToRegion(town.region, false);
            }
            if (player.subregion !== town.subRegion) {
                MapHelper.moveToSubRegion(town.region, town.subRegion, false);
            }
            player.route = 0;
            Battle.route = 0;
            Battle.catching(false);
            Battle.enemyPokemon(null);
            player.town = town;
            //this should happen last, so all the values all set beforehand
            App.game.gameState = GameConstants.GameState.town;
        } else {
            if (!town) {
                return Notifier.notify({
                    message: `The town '${townName}'' does not exist.`,
                    type: NotificationConstants.NotificationOption.danger,
                });
            }

            const reqsList = [];

            town.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });

            Notifier.notify({
                message: `You don't have access to that location yet.\n<i>${reqsList.join('\n')}</i>`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static validRoute(route = 0, region: GameConstants.Region = 0): boolean {
        return !!Routes.getRoute(region, route);
    }

    /* Region functions */

    /**
     *  For moving between already-unlocked regions.
     */
    public static moveToRegion(region: GameConstants.Region, moveToDefaultLocation = true) {
        if (MapHelper.accessToRegion(region)) {
            player.region = region;
            if (moveToDefaultLocation) {
                if (MapHelper.accessToTown(GameConstants.DockTowns[region])) {
                    MapHelper.moveToTown(GameConstants.DockTowns[region]);
                } else {
                    MapHelper.moveToTown(GameConstants.StartingTowns[region]);
                }
            }
        } else {
            Notifier.notify({
                message: 'You don\'t have access to that region right now.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static accessToRegion(region: GameConstants.Region) {
        // Whether player can currently travel to locations in the given region
        return region === player.region || (MapHelper.accessToShip() && TownList[GameConstants.StartingTowns[region]].isUnlocked() &&
            region <= player.highestRegion() && region <= GameConstants.MAX_AVAILABLE_REGION && region !== GameConstants.Region.none);
    }

    public static accessToShip() {
        return player.highestRegion() > 0 && TownList[GameConstants.DockTowns[player.region]].isUnlocked();
    }

    public static openShipModal() {
        if (MapHelper.accessToShip()) {
            $('#ShipModal').modal('show');
        } else {
            Notifier.notify({
                message: `You cannot access this dock yet!${player.region > GameConstants.Region.kanto ? '\n<i>Progress further to return to previous regions!</i>' : ''}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    /* SubRegion functions */

    public static moveToSubRegion(region: GameConstants.Region, subRegion: number, moveToDefaultLocation = true) {
        if (MapHelper.accessToSubRegion(region, subRegion)) {
            if (player.region !== region) {
                MapHelper.moveToRegion(region, false);
            }
            player.subregion = subRegion;
            if (moveToDefaultLocation) {
                const subRegionData = SubRegions.getSubRegionById(region, subRegion);
                if (subRegionData.startRoute) {
                    MapHelper.moveToRoute(subRegionData.startRoute, region);
                } else if (subRegionData.startTown) {
                    MapHelper.moveToTown(subRegionData.startTown);
                }
            }
        } else {
            Notifier.notify({
                message: 'You don\'t have access to that subregion right now.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static accessToSubRegion(region: GameConstants.Region, subRegion: number) {
        const subRegionData = SubRegions.getSubRegionById(region, subRegion);
        return MapHelper.accessToRegion(region) && subRegionData.unlocked() &&
            (subRegionData.startTown ? TownList[subRegionData.startTown].isUnlocked() :
                (subRegionData.startRoute ? Routes.getRoute(region, subRegionData.startRoute).isUnlocked() : true));
    }

    public static moveToNextUnlockedSubRegion() {
        const unlockedSubRegions = SubRegions.getUnlockedSubRegions(player.region).map(sr => sr.id);
        const idx = unlockedSubRegions.indexOf(player.subregion);
        if (idx === -1) {
            MapHelper.moveToSubRegion(player.region, unlockedSubRegions[0]);
        }
        const nextUnlockedSubRegion = unlockedSubRegions[(idx + 1) % unlockedSubRegions.length];
        MapHelper.moveToSubRegion(player.region, nextUnlockedSubRegion);
    }

    public static moveToPrevUnlockedSubRegion() {
        const unlockedSubRegions = SubRegions.getUnlockedSubRegions(player.region).map(sr => sr.id);
        const idx = unlockedSubRegions.indexOf(player.subregion);
        if (idx === -1) {
            MapHelper.moveToSubRegion(player.region, unlockedSubRegions[0]);
        }
        const prevUnlockedSubRegion = unlockedSubRegions[(idx - 1 + unlockedSubRegions.length) % unlockedSubRegions.length];
        MapHelper.moveToSubRegion(player.region, prevUnlockedSubRegion);
    }

    /* Progression functions */

    public static ableToTravel() {
        // If player already reached highest region, they can't move on
        if (player.highestRegion() >= GameConstants.MAX_AVAILABLE_REGION) {
            return false;
        }

        const challengeActive = App.game.challenges.list.requireCompletePokedex.active();
        const nextStartingTownUnlocked = TownList[GameConstants.StartingTowns[player.highestRegion() + 1]]?.isUnlocked() ?? false;
        const fullDex = AchievementHandler.findByName(`${GameConstants.camelCaseToString(GameConstants.Region[player.highestRegion()])} Master`).isCompleted();

        return MapHelper.accessToShip() && nextStartingTownUnlocked && (fullDex || !challengeActive);
    }


    /**
     *  For traveling to the next region for the first time
     */
    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            // Move regions
            GameHelper.incrementObservable(player.highestRegion);
            MapHelper.moveToRegion(player.highestRegion(), false);
            const startingTown = GameConstants.StartingTowns[player.highestRegion()];
            player.highestSubRegion(TownList[startingTown].subRegion ?? 0);
            MapHelper.moveToTown(startingTown);
            // Gain queue slots based on the completed region
            App.game.breeding.gainQueueSlot(App.game.breeding.queueSlotsGainedFromRegion(player.highestRegion() - 1));
            // Update hatchery region filter to include new region if all previous regions selected
            if (BreedingFilters.region.value() == (2 << (player.highestRegion() - 1)) - 1) {
                BreedingFilters.region.value((2 << player.highestRegion()) - 1);
                Settings.setSettingByName('breedingRegionFilter', BreedingFilters.region.value());
            }
            $('#pickStarterModal').modal('show');
        }
    }

}
