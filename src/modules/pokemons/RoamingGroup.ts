import { Subregions } from '../GameConstants';

export default class RoamingGroup {
    public subregions: Subregions[];
    public name: string;

    constructor(name: string, subregions: Subregions[]) {
        this.name = name;
        this.subregions = subregions;
    }
}
