import { SubRegions } from '../GameConstants';

export default class RoamingGroup {
    public subRegions: SubRegions[];
    public name: string;

    constructor(name: string, subRegions: SubRegions[]) {
        this.name = name;
        this.subRegions = subRegions;
    }
}
