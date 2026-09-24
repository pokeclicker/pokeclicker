import { Observable } from 'knockout';
import { ObjectiveOption } from './ObjectiveTypes';
import GameHelper from '../../GameHelper';
import { camelCaseToString, getDungeonIndex, Region } from '../../GameConstants';
import SubRegions from '../../subRegion/SubRegions';

export interface DungeonClearObjectiveConfig {
    region: Observable<Region>;
    dungeonName: Observable<string>;
}


export const dungeonClearObjectiveOption: ObjectiveOption<DungeonClearObjectiveConfig> = {
    label: 'Dungeon Clears',
    options: [
        {
            key: 'region',
            label: 'Region',
            values: () => {
                return GameHelper.enumNumbers(Region)
                    .filter((r) => (r <= player.highestRegion() && r > Region.none))
                    .map((r) => ({ name: camelCaseToString(Region[r]), value: r }));
            },
        },
        {
            key: 'dungeonName',
            label: 'Dungeon',
            values: (config: DungeonClearObjectiveConfig) => {
                const region = config.region?.();
                if (region === undefined) {
                    return [];
                }

                const dungeons = Object.values(dungeonList)
                    .filter((dungeon) => {
                        const town = TownList[dungeon.name];
                        if (town?.region !== region) {
                            return false;
                        }
                        const subRegion = town.subRegion ?? 0;
                        return subRegion === 0 || SubRegions.isSubRegionUnlocked(region, subRegion);
                    })
                    .map((dungeon) => dungeon.name);

                return dungeons.map((dungeonName) => ({
                    name: dungeonName,
                    value: dungeonName,
                }));
            },
        },
    ],
    getProgress: (config: DungeonClearObjectiveConfig): number => {
        const dungeonName = config.dungeonName?.();
        if (!dungeonName) return 0;
        return App.game.statistics.dungeonsCleared[getDungeonIndex(dungeonName)]();
    },
    createConfig: (): DungeonClearObjectiveConfig => {
        const dungeonName = ko.observable();
        const region = ko.observable().extend({ clearDependent: dungeonName }); // clear dungeon if the region changes
        return { region, dungeonName };
    },
    getDisplayName: (config: DungeonClearObjectiveConfig) => {
        const dungeonName = config.dungeonName();
        if (dungeonName === undefined) return 'Unconfigured Objective';
        return `Clear Dungeon - ${dungeonName}`;
    },
};
