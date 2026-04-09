import { ResearchLevel, Region, AchievementOption } from '../GameConstants';
import MultiRequirement from './MultiRequirement';
import RouteKillRequirement from './RouteKillRequirement';

export default class LentalRouteRequirement extends MultiRequirement {
    constructor(route: number, minLevel: number, maxLevel = 0) {
        const requirements = [];
        if (minLevel) {
            requirements.push(new RouteKillRequirement(ResearchLevel[minLevel], Region.galar, route));
        }
        if (maxLevel) {
            requirements.push(new RouteKillRequirement(ResearchLevel[maxLevel], Region.galar, route, AchievementOption.less));
        }
        super(requirements);
    }
}
