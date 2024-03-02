import type SubRegion from './SubRegion';
import type { Region } from '../GameConstants';

/*
    Only import directly from this file when necessary to prevent circular dependency issues
*/

export default class SubRegions {
    public static list: Record<number, SubRegion[]> = {};

    public static addSubRegion(region: Region, subregion: SubRegion): void {
        if (!this.list[region]) {
            this.list[region] = [];
        }
        this.list[region].push(subregion);
    }

    public static getSubRegions(region: Region): SubRegion[] {
        return this.list[region]?.filter((s) => s.unlocked());
    }

    public static getSubRegion(region: Region, subregion: string): SubRegion {
        return this.list[region].find((s) => s.name === subregion);
    }

    public static getSubRegionById(region: Region, subregionID: number): SubRegion {
        return this.list[region].find((s) => s.id === subregionID);
    }

    public static isSubRegionUnlocked(region: Region, subRegion: number): boolean {
        return this.getSubRegionById(region, subRegion).unlocked();
    }

    public static openModal() {
        $('#SubregionModal').modal('show');
    }
}
