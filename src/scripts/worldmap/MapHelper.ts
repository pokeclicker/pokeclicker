import GameState = GameConstants.GameState;
class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (!isNaN(route) && !(route == Player.route())) {
            if (this.accessToRoute(route, region)) {
                $("[data-route='" + Player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute');
                Player.route(route);
                $("[data-route='" + route + "']").removeClass('unlockedRoute').addClass('currentRoute');
                Battle.generateNewEnemy();
            }
            else {
                console.log("You don't have access to that route yet.");
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        if (!Player.hasBadge(GameConstants.routeBadgeRequirements[region][route])) {
            return false;
        }
        let reqList = GameConstants.routeRequirements[region][route];
        if (reqList == undefined) {
            return true;
        }
        for (let i = 0; i < reqList.length; i++) {
            let route: number = reqList[i];
            if (Player.routeKillsObservable(route)() < Player.routeKillsNeeded()) {
                return false
            }
        }
        return true;
    };

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): KnockoutComputed<string> {
        return ko.computed(function () {
            if (Player.route.peek() == route && Player.region == region) {
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
            if(Player.routeKills[i] < Player.routeKillsNeeded[i]) {
                return false;
            }
        }
        console.log("Access to town " + townName);
        return true;
    };

    public static moveToTown(townName: string) {
        if(MapHelper.accessToTown(townName)) {
            Game.gameState = GameState.paused;
        }
    };

}