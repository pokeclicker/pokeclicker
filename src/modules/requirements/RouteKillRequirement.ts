import {
    AchievementOption,
    AchievementType,
    Region,
    ROUTE_KILLS_NEEDED,
} from '../GameConstants';
import Routes from '../routes/Routes';
import AchievementRequirement from './AchievementRequirement';

export default class RouteKillRequirement extends AchievementRequirement {
    constructor(
        value: number,
        public region: Region,
        public route: number,
        option: AchievementOption = AchievementOption.more,
    ) {
        super(value, option, AchievementType['Route Kill']);
    }

    public getProgress() {
        const routeKills = App.game.statistics.routeKills[this.region][this.route]();
        return Math.min(routeKills, this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue !== ROUTE_KILLS_NEEDED) {
            return `${this.requiredValue} Pokémon need to be defeated on ${Routes.getName(this.route, this.region)}.`;
        }

        return `${Routes.getName(this.route, this.region)} still needs to be completed.`;
    }
}
