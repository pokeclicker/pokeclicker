class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        console.log("called");
        console.log(region);
        if (!isNaN(route) && !(route == Player.route())) {
            if (this.accessToRoute(route, region)) {
                Player.route(route);
            }
            else {
                console.log("You don't have access to that route yet.");
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        console.log("Checking route: " + route);
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
            if (Player.routeKills[route]() < Player.routeKillsNeeded()) {
                console.log("Not enough kills on route: " + route);
                return false
            }
        }

        console.log("Access");
        return true;
    };

    public static calculateRouteCssClass(route: number, region: GameConstants.Region): KnockoutComputed<KnockoutObservable<string>> {
        return ko.computed(function () {
            if (Player.route() == route && Player.region == region) {
                return ko.observable(GameConstants.RouteCssClass[GameConstants.RouteCssClass.currentRoute]);
            }
            if (MapHelper.accessToRoute(route, region)) {
                return ko.observable(GameConstants.RouteCssClass[GameConstants.RouteCssClass.unlockedRoute]);
            }
            return ko.observable(GameConstants.RouteCssClass[GameConstants.RouteCssClass.lockedRoute]);
        });
    }

}