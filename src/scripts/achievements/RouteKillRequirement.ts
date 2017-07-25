///<reference path="Requirement.ts"/>

class RouteKillRequirement extends Requirement {
    private route: number;

    constructor(value: number, route:number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.route = route;
    }

    public getProgress() {
        return Math.min(player._routeKills[this.route](), this.requiredValue);
    }
}