import BadgeEnums from '../enums/Badges';
import {
    Region,
    KantoSubRegions,
    JohtoSubRegions,
    HoennSubRegions,
    SinnohSubRegions,
    UnovaSubRegions,
    KalosSubRegions,
    AlolaSubRegions,
    GalarSubRegions,
} from '../GameConstants';
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

SubRegions.addSubRegion(Region.kanto, new SubRegion('Kanto', KantoSubRegions.Kanto, undefined, 'Vermilion City', undefined));
SubRegions.addSubRegion(Region.kanto, new SubRegion('Sevii Islands 123', KantoSubRegions.Sevii123, new GymBadgeRequirement(BadgeEnums.Volcano), 'One Island', undefined));

SubRegions.addSubRegion(Region.johto, new SubRegion('Johto', JohtoSubRegions.Johto));
SubRegions.addSubRegion(Region.hoenn, new SubRegion('Hoenn', HoennSubRegions.Hoenn));
SubRegions.addSubRegion(Region.sinnoh, new SubRegion('Sinnoh', SinnohSubRegions.Sinnoh));
SubRegions.addSubRegion(Region.unova, new SubRegion('Unova', UnovaSubRegions.Unova));
SubRegions.addSubRegion(Region.kalos, new SubRegion('Kalos', KalosSubRegions.Kalos));
SubRegions.addSubRegion(Region.alola, new SubRegion('Melemele island', AlolaSubRegions.MelemeleIsland, undefined, 'Hau\'oli City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Akala island', AlolaSubRegions.AkalaIsland, new GymBadgeRequirement(BadgeEnums.FightiniumZ), 'Heahea City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Ula\'ula & Poni islands', AlolaSubRegions.UlaulaAndPoniIslands, new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
// For when Alola is split into 4 regions
// SubRegions.addSubRegion(Region.alola, new SubRegion('Akala island', new GymBadgeRequirement(BadgeEnums.MelemeleKahuna), 'Heahea City'));
// SubRegions.addSubRegion(Region.alola, new SubRegion('Ula\'ula island', new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
// SubRegions.addSubRegion(Region.alola, new SubRegion('Poni island', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation')), 'Seafolk Village'));

SubRegions.addSubRegion(Region.galar, new SubRegion('Galar', GalarSubRegions.Galar, undefined, 'Postwick', undefined));
// For once Galar is split into 2 regions
// SubRegions.addSubRegion(GameConstants.Region.galar, new SubRegion('Galar South', undefined, 'Postwick', undefined));
// SubRegions.addSubRegion(GameConstants.Region.galar, new SubRegion('Galar North', new RouteKillRequirement(10, GameConstants.Region.galar, 14), 'Hammerlocke', undefined));
// Galar DLC islands
SubRegions.addSubRegion(Region.galar, new SubRegion('Isle of Armor', GalarSubRegions.IsleOfArmor, new MultiRequirement([
    new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion),
    new NullRequirement(),
]), undefined, undefined));
SubRegions.addSubRegion(Region.galar, new SubRegion('Crown Tundra', GalarSubRegions.CrownTundra, new MultiRequirement([
    new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion),
    new NullRequirement(),
]), undefined, undefined));
