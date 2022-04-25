import BadgeEnums from '../enums/Badges';
import { Region } from '../GameConstants';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import NullRequirement from '../requirements/NullRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import SubRegion from './SubRegion';

export default class SubRegions {
    public static list: Record<number, SubRegion[]> = {};

    public static addSubRegion(region: Region, subregion: SubRegion): void {
        if (!this.list[region]) {
            this.list[region] = [];
        }
        this.list[region].push(subregion);
        this.list[region].forEach((r, i) => {
            // eslint-disable-next-line no-param-reassign
            r.id = i;
            return r;
        });
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

    public static openModal() {
        $('#SubregionModal').modal('show');
    }
}

SubRegions.addSubRegion(Region.kanto, new SubRegion('Kanto'));
SubRegions.addSubRegion(Region.johto, new SubRegion('Johto'));
SubRegions.addSubRegion(Region.hoenn, new SubRegion('Hoenn'));
SubRegions.addSubRegion(Region.sinnoh, new SubRegion('Sinnoh'));
SubRegions.addSubRegion(Region.unova, new SubRegion('Unova'));
SubRegions.addSubRegion(Region.kalos, new SubRegion('Kalos'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Melemele island', undefined, 'Hau\'oli City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Akala island', new GymBadgeRequirement(BadgeEnums.FightiniumZ), 'Heahea City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Ula\'ula & Poni islands', new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
// For when Alola is split into 4 regions
// SubRegions.addSubRegion(Region.alola, new SubRegion('Akala island', new GymBadgeRequirement(BadgeEnums.MelemeleKahuna), 'Heahea City'));
// SubRegions.addSubRegion(Region.alola, new SubRegion('Ula\'ula island', new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
// SubRegions.addSubRegion(Region.alola, new SubRegion('Poni island', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation')), 'Seafolk Village'));

export enum AlolaSubRegions {
    MelemeleIsland = 0,
    AkalaIsland,
    UlaulaAndPoniIslands,
    // UlaulaIsland,
    // PoniIsland,
}

SubRegions.addSubRegion(Region.galar, new SubRegion('Galar', undefined, 'Postwick'));
// For once Galar is split into 2 regions
// SubRegions.addSubRegion(GameConstants.Region.galar, new SubRegion('Galar South', undefined, 'Postwick'));
// SubRegions.addSubRegion(GameConstants.Region.galar, new SubRegion('Galar North', new RouteKillRequirement(10, GameConstants.Region.galar, 14), 'Hammerlocke'));
// Galar DLC islands
SubRegions.addSubRegion(Region.galar, new SubRegion('Isle of Armor', new MultiRequirement([
    new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion),
    new NullRequirement(),
])));
SubRegions.addSubRegion(Region.galar, new SubRegion('Crown Tundra', new MultiRequirement([
    new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion),
    new NullRequirement(),
])));
