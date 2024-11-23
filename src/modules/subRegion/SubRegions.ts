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
    HisuiSubRegions,
    PaldeaSubRegions,
} from '../GameConstants';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import RouteKillRequirement from '../requirements/RouteKillRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import * as GameConstants from '../GameConstants';
import SubRegion from './SubRegion';
import QuestLineStartedRequirement from '../requirements/QuestLineStartedRequirement';
import LazyRequirementWrapper from '../requirements/LazyRequirementWrapper';

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

SubRegions.addSubRegion(Region.kanto, new SubRegion('Kanto', KantoSubRegions.Kanto, undefined, 'Vermilion City', undefined));
SubRegions.addSubRegion(Region.kanto, new SubRegion('Sevii Islands 123', KantoSubRegions.Sevii123, new GymBadgeRequirement(BadgeEnums.Volcano), 'One Island', undefined));
SubRegions.addSubRegion(Region.kanto, new SubRegion('Sevii Islands 4567', KantoSubRegions.Sevii4567, new QuestLineStepCompletedRequirement('Celio\'s Errand', 5), 'Four Island', undefined));

SubRegions.addSubRegion(Region.johto, new SubRegion('Johto', JohtoSubRegions.Johto));

SubRegions.addSubRegion(Region.hoenn, new SubRegion('Hoenn', HoennSubRegions.Hoenn, undefined, 'Slateport City'));
SubRegions.addSubRegion(Region.hoenn, new SubRegion('Orre', HoennSubRegions.Orre, new QuestLineStartedRequirement('Shadows in the Desert'), 'Outskirt Stand', undefined));

SubRegions.addSubRegion(Region.sinnoh, new SubRegion('Sinnoh', SinnohSubRegions.Sinnoh));

SubRegions.addSubRegion(Region.unova, new SubRegion('Unova', UnovaSubRegions.Unova));

SubRegions.addSubRegion(Region.kalos, new SubRegion('Kalos', KalosSubRegions.Kalos));

SubRegions.addSubRegion(Region.alola, new SubRegion('Melemele Island', AlolaSubRegions.MelemeleIsland, undefined, 'Hau\'oli City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Akala Island', AlolaSubRegions.AkalaIsland, new GymBadgeRequirement(BadgeEnums.Melemele_Stamp), 'Heahea City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Ula\'ula Island', AlolaSubRegions.UlaulaIsland, new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Poni Island', AlolaSubRegions.PoniIsland, new QuestLineStartedRequirement('Emissary of Light'), 'Seafolk Village'));
SubRegions.addSubRegion(Region.alola, new SubRegion('Magikarp Jump', AlolaSubRegions.MagikarpJump, new QuestLineStartedRequirement('Magikarp Jump'), 'Hoppy Town'));

SubRegions.addSubRegion(Region.galar, new SubRegion('South Galar', GalarSubRegions.SouthGalar, undefined, 'Hulbury'));
SubRegions.addSubRegion(Region.galar, new SubRegion('North Galar', GalarSubRegions.NorthGalar, new LazyRequirementWrapper(() => new RouteKillRequirement(10, GameConstants.Region.galar, 22)), 'Hammerlocke'));
SubRegions.addSubRegion(Region.galar, new SubRegion('Isle of Armor', GalarSubRegions.IsleofArmor, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), 'Armor Station'));
SubRegions.addSubRegion(Region.galar, new SubRegion('Crown Tundra', GalarSubRegions.CrownTundra, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), 'Crown Tundra Station'));

SubRegions.addSubRegion(Region.hisui, new SubRegion('Hisui', HisuiSubRegions.Hisui, undefined, 'Prelude Beach'));

SubRegions.addSubRegion(Region.paldea, new SubRegion('Paldea', PaldeaSubRegions.Paldea));
