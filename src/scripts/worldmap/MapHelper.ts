class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (!isNaN(route) && !(route == player.route())) {
            if (this.accessToRoute(route, region)) {
                $("[data-route='" + player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute');
                player.route(route);
                player.currentTown("");
                $("[data-route='" + route + "']").removeClass('unlockedRoute').addClass('currentRoute');
                Battle.generateNewEnemy();
                Game.gameState(GameConstants.GameState.fighting);
                Game.applyRouteBindings();
            }
            else {
                Notifier.notify("You don't have access to that route yet.", GameConstants.NotificationOption.warning);
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        if (!player.hasBadge(GameConstants.routeBadgeRequirements[region][route])) {
            return false;
        }
        let dungeonReq = GameConstants.routeDungeonRequirements[region][route];
        if (dungeonReq !== undefined && 1 > player.statistics.dungeonsCleared[GameConstants.Dungeons.indexOf(dungeonReq)]()) {
            return false;
        }
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
    };

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): KnockoutComputed<string> {
        return ko.computed(function () {
            if (player.route() == route && player.region == region) {
                return "currentRoute";
            }
            if (MapHelper.accessToRoute(route, region)) {
                return "unlockedRoute";
            }
            return "lockedRoute";
        });
    }

    public static calculateTownCssClass(town: string): KnockoutComputed<string> {
        return ko.computed(function () {
            if (player.currentTown() == town) {
                return "city currentTown";
            }
            if (MapHelper.accessToTown(town)) {
                return "city unlockedTown";
            }
            return "city lockedTown";
        });
    }

    public static accessToTown(townName: string): boolean {
        let town = TownList[townName];
        return town.isUnlocked();
    };

    public static moveToTown(townName: string) {
        if (MapHelper.accessToTown(townName)) {
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

}