class MapHelper {

    public static moveToRoute = function (route: number, region: GameConstants.Region) {
        console.log("called");
        console.log(region);
        if (!isNaN(route) && !(route == player.route())) {
            if (this.accessToRoute(route, region)) {
                $("[data-route='" + player.route() + "']").removeClass('currentRoute').addClass('unlockedRoute');
                player.route(route);
                $("[data-route='" + route + "']").removeClass('unlockedRoute').addClass('currentRoute')
                Battle.generateNewEnemy();
            }
            else {
                console.log("You don't have access to that route yet.");
            }
        }
    };

    public static accessToRoute = function (route: number, region: GameConstants.Region) {
        console.log("Checking route: " + route);
        if (!player.hasBadge(GameConstants.routeBadgeRequirements[region][route])) {
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
            if (player.routeKillsObservable(route)() < player.routeKillsNeeded) {
                console.log("Not enough kills on route: " + route);
                return false
            }
        }

        console.log("Access");
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

}