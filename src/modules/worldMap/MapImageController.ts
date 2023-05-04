import { KantoSubRegions, Region } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import SpecialEventRequirement from '../requirements/SpecialEventRequirement';
import { observable, pureComputed } from 'knockout';
import SubRegion from '../subRegion/SubRegion';

type SpecialMap = {
    path: string,
    requirement: Requirement
};

export default class MapImageController {
    // If more than one is true, the first one on the list will be used
    private static specialMaps: Record<number, Record<number, SpecialMap[]>> = {
        [Region.kanto]: {
            [KantoSubRegions.Kanto]: [
                { path: 'flying-pikachu', requirement: new SpecialEventRequirement('Flying Pikachu') },
            ],
        },
    };

    public static getImagePath(region: Region, subregion: SubRegion) : KnockoutObservable<string> {
        if (MapImageController.specialMaps[region]?.[subregion.id]) {
            return pureComputed<string>(() => {
                let path = Region[region] + '-' + subregion.name.toLowerCase();
                MapImageController.specialMaps[region][subregion.id].forEach((sm) => {
                    if (sm.requirement.isCompleted()) {
                        path += '-' + sm.path;
                        return false;
                    }
                });
                return 'assets/images/maps/' + Region[region] + '/' + path + '.png';
            });
        }
        return observable('assets/images/maps/' + Region[region] + '/' + Region[region] + '-' + subregion.name.toLowerCase() + '.png');
    }
}
