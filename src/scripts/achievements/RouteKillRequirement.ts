///<reference path="Requirement.ts"/>

class RouteKillRequirement extends Requirement {
    public route: number;

    constructor(value: number, route: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.route = route;
    }

    public getProgress() {
        return Math.min(App.game.statistics.routeKills[this.route](), this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue != GameConstants.ROUTE_KILLS_NEEDED) {
            return `${this.requiredValue} Pokémon need to be defeated on Route ${this.route}.`;
        } else {
            return `Route ${this.route} still needs to be completed.`;
        }
    }
}