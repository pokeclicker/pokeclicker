/// <reference path="../../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../../declarations/DataStore/StatisticStore/index.d.ts" />

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
        let genNewEnemy = false;
        if (route != Battle.route) {
            genNewEnemy = true;
        }
        if (this.accessToRoute(route, region)) {
            if (player.region != region) {
                player.region = region;
            }
            player.subregion = routeData.subRegion ?? 0;
            player.route = route;
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
        return this.routeExist(route, region) && Routes.getRoute(region, route).isUnlocked();
    };

    public static getEnvironments(area: number | string, region: GameConstants.Region): GameConstants.Environment[] {
        // Environments aren't stored in the locations themselves, so we need to refer to the record in GameConstants.Environments to get an array (list) of all the environments we've written it under
        const envs = Object.keys(GameConstants.Environments).filter(
            (env) => GameConstants.Environments[env][region]?.has(area)
        ) as GameConstants.Environment[]; // keeping everything as GameConstants.Environment makes them easier to refer to with an IDE (like VSCode). Environments will show up in a dropdown when you type

        // Now that we have an array we can push (add) environments straight up
        // determine Hisui environments for Burmy and electric friends
        if (region === GameConstants.Region.hisui) {
            const hisuilands = ['AlabasterIcelands', 'CobaltCoastlands', 'CoronetHighlands', 'CrimsonMirelands', 'JubilifeVillage', 'ObsidianFieldlands'] as GameConstants.Environment[];
            const blanklands = hisuilands.find(land => envs.includes(land)); // find which __land the area is part of
            switch (blanklands as GameConstants.Environment) {
                case 'ObsidianFieldlands':
                case 'JubilifeVillage':
                    envs.push('PlantCloak');
                    break; // group cloaks together to keep the switch breaks tidy, only three needed
                case 'CoronetHighlands':
                    envs.push('MagneticField'); // no break after this because we want to add SandyCloak to CoronetHighlands too
                case 'CrimsonMirelands':
                    envs.push('SandyCloak');
                    break;
                case 'AlabasterIcelands':
                case 'CobaltCoastlands':
                    envs.push('TrashCloak');
                    break;
            }
        // if not in Hisui, add general envs for Burmy
        } else if (envs.includes('Cave')) {
            envs.push('SandyCloak');
        } else if (typeof area === 'string' && ['City', 'League', 'Tower'].some(word => area.includes(word))) {
            envs.push('TrashCloak');
        }

        // if not in Cave or TrashCloak, Burmy evolves into (Plant). (this is mainly for realEvos challenge)
        const burmyCloaks = ['PlantCloak', 'SandyCloak', 'TrashCloak'] as GameConstants.Environment[];
        // if some element (cloak) of the "burmyCloaks" array is not (!) included in the "envs" array, add (push) the 'PlantCloak' environment
        if (!burmyCloaks.some(cloak => envs.includes(cloak))) {
            envs.push('PlantCloak');
        }

        // Get environments from Gym and Temp battles lists, if any
        const battleArea =
            (App.game.gameState == GameConstants.GameState.temporaryBattle
                ? TemporaryBattleRunner.getEnvironmentArea() : undefined) ||
            (App.game.gameState == GameConstants.GameState.gym
                ? GymRunner.getEnvironmentArea() : undefined) ||
            undefined;

        // Add the battle environment arrays
        if (battleArea != undefined) {
            envs.push(...battleArea);
        }

        return (envs);
    }

    public static getCurrentEnvironments(): GameConstants.Environment[] {
        const area = player.route ||
            player.town?.name ||
            undefined;
        return this.getEnvironments(area, player.region);
    }

    public static getBattleBackground(): GameConstants.BattleBackground {
        const area = player.route ||
            (App.game.gameState == GameConstants.GameState.temporaryBattle
                ? TemporaryBattleRunner.getBattleBackgroundImage() : undefined) ||
            (App.game.gameState == GameConstants.GameState.gym
                ? GymRunner.getBattleBackgroundImage() : undefined) ||
            (App.game.gameState == GameConstants.GameState.battleFrontier
                ? BattleFrontierRunner.battleBackground() : undefined) ||
            player.town?.name ||
            undefined;

        if (area in GameConstants.BattleBackgrounds) {
            return area;
        }

        const [img] = Object.entries(GameConstants.BattleBackgrounds).find(
            ([, regions]) => regions[player.region]?.has(area)
        ) || [];

        return (img as GameConstants.BattleBackground);
    }

    public static calculateBattleCssClass(): string {
        return GameConstants.BattleBackgroundImage[this.getBattleBackground()];
    }

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        let cls = '';

        if (!MapHelper.accessToRoute(route, region)) {
            cls = areaStatus[areaStatus.locked];
        } else  if (App.game.statistics.routeKills[region][route]() < GameConstants.ROUTE_KILLS_NEEDED) {
            cls = areaStatus[areaStatus.incomplete];
        } else  if (RouteHelper.isThereQuestAtLocation(route, region)) {
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
        if (!MapHelper.accessToTown(townName)) {
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
        return town.isUnlocked();
    }

    public static moveToTown(townName: string) {
        if (MapHelper.accessToTown(townName)) {
            App.game.gameState = GameConstants.GameState.idle;
            player.route = 0;
            Battle.route = 0;
            Battle.catching(false);
            const town = TownList[townName];
            player.region = town.region;
            player.subregion = town.subRegion;
            player.town = town;
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
                message: `You don't have access to that location yet.\n<i>${reqsList.join('\n')}</i>`,
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
                message: `You cannot access this dock yet!${player.region > GameConstants.Region.kanto ? '\n<i>Progress further to return to previous regions!</i>' : ''}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static ableToTravel() {
        // If player already reached highest region, they can't move on
        if (player.highestRegion() >= GameConstants.MAX_AVAILABLE_REGION) {
            return false;
        }

        const challengeActive = App.game.challenges.list.requireCompletePokedex.active();
        const nextStartingTownUnlocked = TownList[GameConstants.StartingTowns[player.highestRegion() + 1]]?.isUnlocked() ?? false;
        const fullDex = AchievementHandler.findByName(`${GameConstants.camelCaseToString(GameConstants.Region[player.highestRegion()])} Master`).isCompleted();

        return nextStartingTownUnlocked && (fullDex || !challengeActive);
    }

    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            // Gain queue slots based on highest region
            App.game.breeding.gainQueueSlot(App.game.breeding.queueSlotsGainedFromRegion(player.highestRegion()));
            GameHelper.incrementObservable(player.highestRegion);
            player.highestSubRegion(0);
            MapHelper.moveToTown(GameConstants.StartingTowns[player.highestRegion()]);
            player.region = player.highestRegion();
            // Update hatchery region filter to include new region if all previous regions selected
            const previousRegionFullMask = (2 << (player.highestRegion() - 1)) - 1;
            const regionFilterMask = Settings.getSetting('breedingRegionFilter').value & previousRegionFullMask;
            if (regionFilterMask == previousRegionFullMask) {
                const newRegionFullMask = (2 << player.highestRegion()) - 1;
                Settings.setSettingByName('breedingRegionFilter', newRegionFullMask);
            }
            $('#pickStarterModal').modal('show');
        }
    }

}

MapHelper satisfies TmpMapHelperType;
