import BadgeEnums from '../enums/Badges';
import {
    Region,
    KantoSubregions,
    JohtoSubregions,
    HoennSubregions,
    SinnohSubregions,
    UnovaSubregions,
    KalosSubregions,
    AlolaSubregions,
    GalarSubregions,
    HisuiSubregions,
    PaldeaSubregions,
} from '../GameConstants';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import RouteKillRequirement from '../requirements/RouteKillRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import * as GameConstants from '../GameConstants';
import Subregion from './Subregion';
import QuestLineStartedRequirement from '../requirements/QuestLineStartedRequirement';
import LazyRequirementWrapper from '../requirements/LazyRequirementWrapper';

export default class Subregions {
    public static list: Record<number, Subregion[]> = {};

    public static addSubregion(region: Region, subregion: Subregion): void {
        if (!this.list[region]) {
            this.list[region] = [];
        }
        this.list[region].push(subregion);
    }

    public static getSubregions(region: Region): Subregion[] {
        return this.list[region]?.filter((s) => s.unlocked());
    }

    public static getSubregion(region: Region, subregion: string): Subregion {
        return this.list[region].find((s) => s.name === subregion);
    }

    public static getSubregionById(region: Region, subregionID: number): Subregion {
        return this.list[region].find((s) => s.id === subregionID);
    }

    public static isSubregionUnlocked(region: Region, subregion: number): boolean {
        return this.getSubregionById(region, subregion).unlocked();
    }

    public static openModal() {
        $('#SubregionModal').modal('show');
    }
}

Subregions.addSubregion(Region.kanto, new Subregion('Kanto', KantoSubregions.Kanto, undefined, 'Vermilion City', undefined));
Subregions.addSubregion(Region.kanto, new Subregion('Sevii Islands 123', KantoSubregions.Sevii123, new GymBadgeRequirement(BadgeEnums.Volcano), 'One Island', undefined));
Subregions.addSubregion(Region.kanto, new Subregion('Sevii Islands 4567', KantoSubregions.Sevii4567, new QuestLineStepCompletedRequirement('Celio\'s Errand', 5), 'Four Island', undefined));

Subregions.addSubregion(Region.johto, new Subregion('Johto', JohtoSubregions.Johto));

Subregions.addSubregion(Region.hoenn, new Subregion('Hoenn', HoennSubregions.Hoenn, undefined, 'Slateport City'));
Subregions.addSubregion(Region.hoenn, new Subregion('Orre', HoennSubregions.Orre, new QuestLineStartedRequirement('Shadows in the Desert'), 'Outskirt Stand', undefined));

Subregions.addSubregion(Region.sinnoh, new Subregion('Sinnoh', SinnohSubregions.Sinnoh));

Subregions.addSubregion(Region.unova, new Subregion('Unova', UnovaSubregions.Unova));

Subregions.addSubregion(Region.kalos, new Subregion('Kalos', KalosSubregions.Kalos));

Subregions.addSubregion(Region.alola, new Subregion('Melemele Island', AlolaSubregions.MelemeleIsland, undefined, 'Hau\'oli City'));
Subregions.addSubregion(Region.alola, new Subregion('Akala Island', AlolaSubregions.AkalaIsland, new GymBadgeRequirement(BadgeEnums.Melemele_Stamp), 'Heahea City'));
Subregions.addSubregion(Region.alola, new Subregion('Ula\'ula Island', AlolaSubregions.UlaulaIsland, new TemporaryBattleRequirement('Ultra Wormhole'), 'Malie City'));
Subregions.addSubregion(Region.alola, new Subregion('Poni Island', AlolaSubregions.PoniIsland, new QuestLineStartedRequirement('Emissary of Light'), 'Seafolk Village'));
Subregions.addSubregion(Region.alola, new Subregion('Magikarp Jump', AlolaSubregions.MagikarpJump, new QuestLineStartedRequirement('Magikarp Jump'), 'Hoppy Town'));

Subregions.addSubregion(Region.galar, new Subregion('South Galar', GalarSubregions.SouthGalar, undefined, 'Hulbury'));
Subregions.addSubregion(Region.galar, new Subregion('North Galar', GalarSubregions.NorthGalar, new LazyRequirementWrapper(() => new RouteKillRequirement(10, GameConstants.Region.galar, 22)), 'Hammerlocke'));
Subregions.addSubregion(Region.galar, new Subregion('Isle of Armor', GalarSubregions.IsleofArmor, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), 'Armor Station'));
Subregions.addSubregion(Region.galar, new Subregion('Crown Tundra', GalarSubregions.CrownTundra, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), 'Crown Tundra Station'));

Subregions.addSubregion(Region.hisui, new Subregion('Hisui', HisuiSubregions.Hisui, undefined, 'Prelude Beach'));

Subregions.addSubregion(Region.paldea, new Subregion('Paldea', PaldeaSubregions.Paldea));
