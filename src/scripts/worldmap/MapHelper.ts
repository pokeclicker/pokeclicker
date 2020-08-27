class MapHelper {
    public static returnToMap() {
        if (player.currentTown()) {
            return this.moveToTown(player.currentTown());
        }
        if (player.route()) {
            return this.moveToRoute(player.route(), player.region);
        }
    }

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (isNaN(route)) {
            return;
        }
        let genNewEnemy = false;
        if (route != player.route()) {
            genNewEnemy = true;
        }
        if (this.accessToRoute(route, region)) {
            player.route(route);
            player.region = region;
            player.currentTown('');
            if (genNewEnemy) {
                Battle.generateNewEnemy();
            }
            App.game.gameState = GameConstants.GameState.fighting;
            GameController.applyRouteBindings();
        } else {
            if (!MapHelper.routeExist(route, region)) {
                return Notifier.notify({ message: `Route ${route} does not exist in the ${GameConstants.Region[region]} region.`, type: GameConstants.NotificationOption.warning });
            }

            const routeData = Routes.getRoute(region, route);
            const reqsList = [];

            routeData.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });

            Notifier.notify({ message: `You don't have access to that route yet.<br/>${reqsList.join('<br/>')}`, type: GameConstants.NotificationOption.warning });
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

    public static calculateBattleCssClass(): string {
        const area = player.route() || player.town()?.name() || undefined;

        if (GameConstants.WaterAreas[player.region].has(area)) {
            return 'water';
        } else if (GameConstants.IceAreas[player.region].has(area)) {
            return 'ice';
        } else if (GameConstants.ForestAreas[player.region].has(area)) {
            return 'forest';
        } else if (GameConstants.CaveAreas[player.region].has(area)) {
            return 'cave';
        } else if (GameConstants.GemCaveAreas[player.region].has(area)) {
            return 'cave-gem';
        } else if (GameConstants.PowerPlantAreas[player.region].has(area)) {
            return 'power-plant';
        } else if (GameConstants.MansionAreas[player.region].has(area)) {
            return 'mansion';
        } else if (GameConstants.GraveyardAreas[player.region].has(area)) {
            return 'graveyard';
        }
    }

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        let cls;

        if (player.route() == route && player.region == region) {
            cls = 'currentRoute';
        } else if (MapHelper.accessToRoute(route, region)) {
            if (App.game.statistics.routeKills[route]() >= GameConstants.ROUTE_KILLS_NEEDED) {
                cls = 'unlockedRoute';
            } else {
                cls = 'unlockedUnfinishedRoute';
            }
        } else {
            cls = 'lockedRoute';
        }

        // Water routes
        if (GameConstants.WaterAreas[region].has(route)) {
            cls = `${cls} waterRoute`;
        }

        return cls;
    }

    public static calculateTownCssClass(town: string): string {
        // TODO(@Isha) this is very weird, refactor this.
        if (App.game.keyItems.hasKeyItem(KeyItems.KeyItem[town])) {
            return 'city unlockedTown';
        }
        if (player.currentTown() == town) {
            return 'city currentTown';
        }
        if (MapHelper.accessToTown(town)) {
            if (dungeonList.hasOwnProperty(town)) {
                if (App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(town)]()) {
                    return 'dungeon completedDungeon';
                }
                return 'dungeon unlockedDungeon';
            }
            if (gymList.hasOwnProperty(town)) {
                const gym = gymList[town];
                // If defeated the previous gym, but not this one
                const gymIndex = Statistics.getGymIndex(town);
                if (Gym.isUnlocked(gym) && !App.game.badgeCase.hasBadge(gym.badgeReward)) {
                    return 'city unlockedUnfinishedTown';
                }
            }
            return 'city unlockedTown';
        }
        if (dungeonList.hasOwnProperty(town)) {
            return 'dungeon';
        }
        return 'city';
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
            player.town(TownList[townName]);
            player.currentTown(townName);
            Battle.enemyPokemon(null);
            //this should happen last, so all the values all set beforehand
            App.game.gameState = GameConstants.GameState.town;
            GameController.applyRouteBindings();
        } else {
            const town = TownList[townName];
            const reqsList = [];

            town.requirements?.forEach(requirement => {
                if (!requirement.isCompleted()) {
                    reqsList.push(requirement.hint());
                }
            });

            Notifier.notify({ message: `You don't have access to that location yet.<br/>${reqsList.join('<br/>')}`, type: GameConstants.NotificationOption.warning });
        }
    }

    public static validRoute(route = 0, region: GameConstants.Region = 0): boolean {
        return route >= GameConstants.RegionRoute[region][0] && route <= GameConstants.RegionRoute[region][1];
    }

    public static openShipModal() {
        const openModal = () => {
            $('#ShipModal').modal('show');
        };
        switch (player.region) {
            case 0:
                if (TownList['Vermillion City'].isUnlocked() && player.highestRegion() > 0) {
                    openModal();
                    return;
                }
            case 1:
                if (TownList['Olivine City'].isUnlocked()) {
                    openModal();
                    return;
                }
            case 2:
                if (TownList['Slateport City'].isUnlocked()) {
                    openModal();
                    return;
                }
            case 3:
                if (TownList['Canalave City'].isUnlocked()) {
                    openModal();
                    return;
                }
        }
        Notifier.notify({ message: 'You cannot access this dock yet', type: GameConstants.NotificationOption.warning });
    }

    public static ableToTravel() {
        return player.highestRegion() < GameConstants.MAX_AVAILABLE_REGION && new Set(App.game.party.caughtPokemon.filter(p => p.id > 0).map(p => Math.floor(p.id))).size >= GameConstants.TotalPokemonsPerRegion[player.highestRegion()];
    }

    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            player.highestRegion(player.highestRegion() + 1);
            MapHelper.moveToTown(GameConstants.StartingTowns[player.highestRegion()]);
            player.region = player.highestRegion();
        }
    }

}
