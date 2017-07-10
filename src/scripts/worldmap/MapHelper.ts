class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (!isNaN(route) && !(route == player.route())) {
            if (this.accessToRoute(route, region)) {
                Game.gameState(GameConstants.GameState.fighting);
                $("[data-route='" + player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute');
                player.route(route);
                $("[data-route='" + route + "']").removeClass('unlockedRoute').addClass('currentRoute');
                Battle.generateNewEnemy();
            }
            else {
                console.log("You don't have access to that route yet.");
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        if (!player.hasBadge(GameConstants.routeBadgeRequirements[region][route])) {
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
            if (player.route.peek() == route && player.region == region) {
                return "currentRoute";
            }
            if (MapHelper.accessToRoute(route, region)) {
                return "unlockedRoute";
            }
            return "lockedRoute";
        });
    }

    public static accessToTown(townName:string) : boolean {
        let town = TownList[townName];
        for(let i of town.reqRoutes) {
            if (player.routeKills[i]() < player.routeKillsNeeded) {
                return false;
            }
        }
        return true;
    };

    public static moveToTown(townName: string) {
        if(MapHelper.accessToTown(townName)) {
            Game.gameState(GameConstants.GameState.idle);
            $("[data-route='" + player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute');
            player.route(0);
            player.town(TownList[townName]);
            //this should happen last, so all the values all set beforehand
            Game.gameState(GameConstants.GameState.town);
        }
    };

}