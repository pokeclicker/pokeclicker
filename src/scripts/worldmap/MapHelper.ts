class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (!isNaN(route) && !(route == player.route())) {
            if (this.accessToRoute(route, region)) {
                player.route(route);
                player.region = region;
                player.currentTown('');
                Battle.generateNewEnemy();
                Game.gameState(GameConstants.GameState.fighting);
                Game.applyRouteBindings();
            }
            else {
                Notifier.notify("You don't have access to that route yet.", GameConstants.NotificationOption.warning);
            }
        }
    };

    private static hasBadgeReq(route, region) {
        return player.hasBadge(GameConstants.routeBadgeRequirements[region][route]);
    }

    private static hasDungeonReq(route, region) {
        let dungeonReq = GameConstants.routeDungeonRequirements[region][route];
        return dungeonReq == undefined || 0 < player.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeonReq)]();
    }

    private static hasRouteKillReq(route, region) {
        let reqList = GameConstants.routeRequirements[region][route];
        if (reqList == undefined) {
            return true;
        }
        for (let i = 0; i < reqList.length; i++) {
            let route: number = reqList[i];
            if (player.routeKillsObservable(route)() < player.routeKillsNeeded) {
                return false
            }
        }
        return true;
    }

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        return MapHelper.hasBadgeReq(route, region) && MapHelper.hasDungeonReq(route, region) && MapHelper.hasRouteKillReq(route, region);
    };

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): string {
        if (player.route() == route && player.region == region) {
            return "currentRoute";
        }
        if (MapHelper.accessToRoute(route, region)) {
            return "unlockedRoute";
        }
        return "lockedRoute";
    }

    public static calculateTownCssClass(town: string): string {
        if (player.currentTown() == town) {
            return "city currentTown";
        }
        if (MapHelper.accessToTown(town)) {
            if (dungeonList.hasOwnProperty(town)) {
                if (DungeonRunner.dungeonCompleted(dungeonList[town], false)) {
                    return "dungeon completedDungeon"
                }
                return "dungeon unlockedDungeon"
            }
            return "city unlockedTown";
        }
        if (dungeonList.hasOwnProperty(town)) {
            return "dungeon"
        }
        return "city";
    }

    public static accessToTown(townName: string): boolean {
        let town = TownList[townName];
        return town.isUnlocked();
    };

    public static moveToTown(townName: string) {
        if (MapHelper.accessToTown(townName)) {
            //console.log($("[data-town]"));
            Game.gameState(GameConstants.GameState.idle);
            $("[data-route='" + player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute'); //pretty sure any jquery in typescript does not work fyi
            player.route(0);
            player.town(TownList[townName]);
            player.currentTown(townName);
            //this should happen last, so all the values all set beforehand
            Game.gameState(GameConstants.GameState.town);
            Game.applyRouteBindings();
        } else {
            Notifier.notify("You don't have access to that location yet.", GameConstants.NotificationOption.warning);
        }
    };

    public static updateAllRoutes() {
        for (let i = 0; i < GameConstants.AMOUNT_OF_ROUTES_KANTO; i++) {
            // TODO fix for multiple regions
            if (MapHelper.accessToRoute(i, GameConstants.Region.kanto)) {
                $("[data-route='" + i + "']").removeClass('currentRoute').removeClass('lockedRoute').addClass('unlockedRoute');
            }
        }
    }

    public static validRoute(route: number, region: GameConstants.Region): boolean {
        switch (region) {
            case GameConstants.Region.kanto:
                return route > 0 && route < 26;
            case GameConstants.Region.johto:
                return route > 25 && route < 49;
        }
    }

    public static openShipModal() {
        let openModal = () => {Game.gameState(GameConstants.GameState.idle);$("#ShipModal").modal('show');}
        switch (player.region) {
            case 0:
                if (TownList["Vermillion City"].isUnlocked() && player.highestRegion > 0) {
                    openModal();
                    return;
                }
            case 1:
                if (TownList["Olivine City"].isUnlocked()) {
                    openModal();
                    return;
                }
        }
        Notifier.notify("You cannot access this dock yet", GameConstants.NotificationOption.warning)
    }

    public static ableToTravel() {
        return player.caughtPokemonList.length >= GameConstants.pokemonsNeededToTravel[player.highestRegion]
    }

    public static travelToNextRegion() {
        if (MapHelper.ableToTravel()) {
            player.highestRegion++;
            MapHelper.moveToTown(GameConstants.StartingTowns[player.highestRegion]);
            player.region = player.highestRegion;
        }
    }

}
