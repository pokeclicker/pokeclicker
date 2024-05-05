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

    public static getCurrentEnvironment(): GameConstants.Environment {
        const area = player.route() ||
            (App.game.gameState == GameConstants.GameState.temporaryBattle
                ? TemporaryBattleRunner.getEnvironmentArea() : undefined) ||
            (App.game.gameState == GameConstants.GameState.gym
                ? GymRunner.getEnvironmentArea() : undefined) ||
            player.town()?.name ||
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
        return GameConstants.EnvironmentCssClass[this.getCurrentEnvironment()];
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
        return player.route() == route && player.region == region;
    }

    public static isTownCurrentLocation(townName: string): boolean {
        if (App.game.gameState == GameConstants.GameState.temporaryBattle) {
            return TemporaryBattleRunner.battleObservable().getTown().name == townName;
        }
        return !player.route() && player.town().name == townName;
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
        if (dungeonList[townName]) {
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
            player.route(0);
            Battle.route = 0;
            Battle.catching(false);
            const town = TownList[townName];
            player.town(town);
            player._subregion(town.subRegion);
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
            if (BreedingFilters.region.value() == (2 << player.highestRegion() - 1) - 1) {
                BreedingFilters.region.value((2 << player.highestRegion()) - 1);
                Settings.setSettingByName('breedingRegionFilter', BreedingFilters.region.value());
            }
            $('#pickStarterModal').modal('show');
        }
    }
}

class MapNavigation {
    public static viewBox = {
        x: 0, y: 0, w: 1600, h: 960,
    };
    public static scale = 1;
    public static svgSize = { w: 1600, h: 960 };
    public static svgImage: HTMLElement;
    public static svgContainer: HTMLElement;

    public static updateViewbox() {
        this.svgImage.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.w} ${this.viewBox.h}`);
    }

    public static enableZoom() {
        this.svgImage = document.getElementById('map');
        this.svgContainer = document.getElementById('mapBody');

        this.updateViewbox();

        // Zooming
        this.svgContainer.addEventListener('wheel', (e) => {
            // Don't scroll the page
            e.preventDefault();
            // If already min/max scale, return;
            const canScale = e.deltaY > 0 ? this.scale > 1 : this.scale < 5;
            if (!canScale) {
                return;
            }

            // Mouse pos, we want to zoom towards the mouse
            const mx = e.offsetX;
            const my = e.offsetY;
            // New dimensions
            const dw = this.viewBox.w * Math.sign(-e.deltaY) * 0.07;
            const dh = this.viewBox.h * Math.sign(-e.deltaY) * 0.07;

            const dx = (dw * mx) / this.svgContainer.clientWidth;
            const dy = (dh * my) / this.svgContainer.clientHeight;

            // Update out positioning and size
            this.viewBox.w = Math.min(this.svgSize.w, this.viewBox.w - dw);
            this.viewBox.h = Math.min(this.svgSize.h, this.viewBox.h - dh);
            this.viewBox.x = Math.max(0, Math.min(this.svgSize.w - this.viewBox.w, this.viewBox.x + dx));
            this.viewBox.y = Math.max(0, Math.min(this.svgSize.h - this.viewBox.h, this.viewBox.y + dy));
            this.updateViewbox();
            // Remember our current scale
            this.scale = this.svgSize.w / this.viewBox.w;
        }, { passive: false });

        // Panning
        let isPanning = false;
        let startPoint = { x: 0, y: 0 };
        let initialViewBox = { x: 0, y: 0 };
        let zoom = this.svgContainer.clientWidth / this.svgSize.w

        this.svgContainer.onmousedown = (e) => {
            isPanning = true;
            startPoint = { x: e.x, y: e.y };
            initialViewBox = { x: this.viewBox.x, y: this.viewBox.y };
            zoom = this.svgContainer.clientWidth / this.svgSize.w
        };

        this.svgContainer.onmousemove = (e) => {
            if (!isPanning) {
                return;
            }
            const endPoint = { x: e.x, y: e.y };
            const dx = (startPoint.x - endPoint.x) / (zoom * this.scale);
            const dy = (startPoint.y - endPoint.y) / (zoom * this.scale);
            const movedViewBox = {
                // Don't let it go outside the bounds (min, max, calculated position + movement)
                x: Math.max(0, Math.min(this.svgSize.w - this.viewBox.w, initialViewBox.x + dx)),
                y: Math.max(0, Math.min(this.svgSize.h - this.viewBox.h, initialViewBox.y + dy)),
            };
            this.viewBox.x = movedViewBox.x;
            this.viewBox.y = movedViewBox.y;
            this.updateViewbox();
        };

        this.svgContainer.onmouseup = (e) => {
            if (!isPanning) {
                return;
            }
            isPanning = false;
        };
        this.svgContainer.onmouseleave = (e) => {
            this.svgContainer.onmouseup(e);
        };

        // when our region or subregion changes, the map changes, reset the zoom/pan
        player._region.subscribe(() => {
            this.resetZoom();
        });

        player._subregion.subscribe(() => {
            this.resetZoom();
        });
    }

    public static resetZoom() {
        this.viewBox.w = this.svgSize.w;
        this.viewBox.h = this.svgSize.h;
        this.viewBox.x = 0;
        this.viewBox.y = 0;
        this.scale = 1;
        this.updateViewbox();
    }
}
