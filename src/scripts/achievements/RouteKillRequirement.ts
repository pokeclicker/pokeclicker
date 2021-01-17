///<reference path="AchievementRequirement.ts"/>

class RouteKillRequirement extends AchievementRequirement {
    constructor(
        value: number,
        public region: GameConstants.Region,
        public route: number,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more
    ) {
        super(value, option, GameConstants.AchievementType['Route Kill']);
    }

    public getProgress() {
        const routeKills = App.game.statistics.routeKills[this.region][this.route]();
        return Math.min(routeKills, this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue != GameConstants.ROUTE_KILLS_NEEDED) {
            return `${this.requiredValue} Pokémon need to be defeated on ${Routes.getName(this.route, this.region)}.`;
        } else {
            return `${Routes.getName(this.route, this.region)} still needs to be completed.`;
        }
    }
}
