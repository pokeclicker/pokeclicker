/// <reference path="../../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../../declarations/DataStore/StatisticStore/index.d.ts" />


class MapHelper {

    public static getUsableFilters(): CssVariableSetting[] {
        const priority = Settings.getSetting('mapAreaStateOrder').observableValue();
        return priority.map(status => Settings.getSetting(`--${areaStatus[status]}`)).filter(setting => setting.isUnlocked());
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
        return MapHelper.getEnvironments(area, player.region);
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
        return GameConstants.BattleBackgroundImage[MapHelper.getBattleBackground()];
    }

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        const states = new Set([areaStatus.completed]);

        if (!Routes.getRoute(region, route)?.isUnlocked()) {
            states.add(areaStatus.locked);
        }
        if (App.game.statistics.routeKills[region][route]() < GameConstants.ROUTE_KILLS_NEEDED) {
            states.add(areaStatus.incomplete);
        }
        if (RouteHelper.isThereQuestAtLocation(route, region)) {
            states.add(areaStatus.questAtLocation);
        }
        if (!RouteHelper.routeCompleted(route, region, false)) {
            states.add(areaStatus.uncaughtPokemon);
        }
        if (!RouteHelper.routeCompleted(route, region, true) && !RouteHelper.isAchievementsComplete(route, region)) {
            states.add(areaStatus.uncaughtShinyPokemonAndMissingAchievement);
        }
        if (!RouteHelper.routeCompleted(route, region, true)) {
            states.add(areaStatus.uncaughtShinyPokemon);
        }
        if (!RouteHelper.isAchievementsComplete(route, region)) {
            states.add(areaStatus.missingAchievement);
        }
        if (Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(RouteHelper.getAvailablePokemonList(route, region, true)) < GameConstants.Pokerus.Resistant) {
            states.add(areaStatus.missingResistant);
        }

        const statusPriority = Settings.getSetting('mapAreaStateOrder').observableValue();
        const mostImportant = statusPriority.find(state => states.has(state));
        let cls = areaStatus[mostImportant];

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
            return TemporaryBattleRunner.battleObservable().getTown()?.name == townName;
        }
        return !player.route && player.town.name == townName;
    }

    public static calculateTownCssClass(townName: string): string {
        // We don't want to spoil easter eggs with map colors
        if (TownList[townName]?.ignoreAreaStatus) {
            return '';
        }
        const states = new Set([areaStatus.completed]);
        // Check if this location is locked
        if (!TownList[townName]?.isUnlocked()) {
            states.add(areaStatus.locked);
        }
        // Is this location a dungeon
        if (dungeonList[townName] && dungeonList[townName].isUnlocked()) {
            const possiblePokemon = dungeonList[townName].allAvailablePokemon();
            const shadowPokemon = dungeonList[townName].allAvailableShadowPokemon();

            if (!App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(townName)]()) {
                states.add(areaStatus.incomplete);
            }
            if (dungeonList[townName].isThereQuestAtLocation()) {
                states.add(areaStatus.questAtLocation);
            }
            if (!RouteHelper.listCompleted(possiblePokemon, false)) {
                states.add(areaStatus.uncaughtPokemon);
            }
            if (Settings.getSetting(`--${areaStatus[areaStatus.uncaughtShadowPokemon]}`).isUnlocked()
                && shadowPokemon.some(pokemon => App.game.party.getPokemonByName(pokemon)?.shadow < GameConstants.ShadowStatus.Shadow)) {
                states.add(areaStatus.uncaughtShadowPokemon);
            }
            if (!RouteHelper.listCompleted(possiblePokemon, true)) {
                states.add(areaStatus.uncaughtShinyPokemon);
            }
            if (!DungeonRunner.isAchievementsComplete(dungeonList[townName])) {
                states.add(areaStatus.missingAchievement);
            }
            if (Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(possiblePokemon) < GameConstants.Pokerus.Resistant) {
                states.add(areaStatus.missingResistant);
            }
        }
        const town = TownList[townName];
        town.content.forEach(c => {
            c.areaStatus().forEach(s => {
            // If the town itself is not locked, it should never show locked
                if (s != areaStatus.locked) {
                    states.add(s);
                }
            });
        });

        if (states.has(areaStatus.uncaughtShinyPokemon) && states.has(areaStatus.missingAchievement)) {
            states.add(areaStatus.uncaughtShinyPokemonAndMissingAchievement);
        }
        const statusPriority = Settings.getSetting('mapAreaStateOrder').observableValue();
        const importantState = statusPriority.find(state => states.has(state));
        return areaStatus[importantState];
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
            const previousRegionFullMask = (2 << (player.highestRegion() - 1)) - 1;
            const regionFilterMask = Settings.getSetting('breedingRegionFilter').value & previousRegionFullMask;
            if (regionFilterMask == previousRegionFullMask) {
                const newRegionFullMask = (2 << player.highestRegion()) - 1;
                Settings.setSettingByName('breedingRegionFilter', newRegionFullMask);
            }
            $('#pickStarterModal').modal('show');
        }
    }

    public static getBlimpData(professorName = ''): Blimp {
        const baseProps = {
            name: `${professorName}'s Blimp`,
            width: 6 * 16,
            height: 3 * 16,
            image: '',
        };

        if (!MapHelper.ableToTravel()) {
            return baseProps as Blimp;
        }



        if (player.regionStarters[GameConstants.Region.kanto]() == GameConstants.Starter.Special) {
            return new Blimp(
                baseProps.name,
                baseProps.width,
                baseProps.height,
                'assets/images/map/blimp_pikachu.png'
            );
        } else if (!App.game.challenges.list.requireCompletePokedex.active()) {
            return new Blimp(
                'Team Rocket\'s Blimp',
                4 * 16,
                8 * 16,
                'assets/images/map/blimp_meowth.png'
            );
        } else {
            return new Blimp(
                baseProps.name,
                baseProps.width,
                baseProps.height,
                'assets/images/map/blimp_empty.png'
            );
        }

    }

}

MapHelper satisfies TmpMapHelperType;
