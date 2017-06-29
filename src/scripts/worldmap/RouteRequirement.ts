class RouteRequirement {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        if (!isNaN(route) && !(route == Player.route)) {
            if (this.accessToRoute(route, region)) {
                Player.route = route;
            }
            else {
                console.log("You don't have access to that route yet.");
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        if (!Player.hasBadge(GameConstants.routeBadgeRequirements[region][route])) {
            console.log("Missing badge: " + GameConstants.routeBadgeRequirements[region][route]);
            return false;
        }
        let reqList = GameConstants.routeRequirements[region][route];
        if (reqList == undefined) {
            console.log("No route requirements");
            return true;
        }
        for (let i = 0; i < reqList.length; i++) {
            let route: number = reqList[i];
            if (Player.routeKills[route] < Player.routeKillsNeeded) {
                console.log("Not enough kills on route: " + route);
                return false
            }
        }
        return true;
    };

}