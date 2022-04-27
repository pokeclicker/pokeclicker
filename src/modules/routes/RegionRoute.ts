import { Region } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import RoutePokemon from './RoutePokemon';

export default class RegionRoute {
    constructor(
        public routeName: string,
        public region: Region,
        public number: number,
        public pokemon: RoutePokemon,
        public requirements: Requirement[] = [],
        public orderNumber?: number,
        public subRegion?: number,
        public ignoreRouteInCalculations = false,
        public routeHealth = undefined,
    ) {
        this.orderNumber = orderNumber || number;
    }

    public isUnlocked() {
        return this.requirements.every((requirement) => requirement.isCompleted());
    }
}
