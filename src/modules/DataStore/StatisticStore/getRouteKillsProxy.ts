import type { Observable } from 'knockout';
import '../../koExtenders';
import * as GameConstants from '../../GameConstants';

const failedSetValue = () => 0;

// TODO: Determine what the return type is
export default (): any => {
    // Filter the Region constant to only the string values (names)
    const regionNames = Object.values(GameConstants.Region)
        .filter((v) => Number.isNaN(Number(v)));

    const zeroedRegions = Object.fromEntries(regionNames.map((region) => ([
        region,
        new Proxy({}, {
            get: (regionStats, prop: string) => {
                if (regionStats[prop]) {
                    return regionStats[prop];
                }

                // Route Defeat are tracked by the route number as the key,
                // so only allow keys that can be numbers
                if (Number.isNaN(Number(prop))) {
                    if (Number.isNaN(prop)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [routeDefeat.${region}] Invalid property requested:`, prop);
                    }
                    return failedSetValue;
                }

                // eslint-disable-next-line no-param-reassign
                regionStats[prop] = ko.observable<number>(0).extend({ numeric: 0 });
                return regionStats[prop];
            },

            // This makes it so the stats observable can't be accidently changed
            set: (
                obj: Record<number, Observable<number>>,
                prop: number | string | symbol,
                value: number,
            ): boolean => {
                const result = obj[prop](value);
                return result === failedSetValue;
            },
        }),
    ])));

    return new Proxy(zeroedRegions, {
        get: (regions, prop: GameConstants.Region | symbol | string) => {
            // Convert the prop to the string version of the region
            const regionName = Number.isNaN(Number(prop))
                ? prop // A string was passed in
                : GameConstants.Region[prop]; // Number was passed in
            if (!regionName) {
                // eslint-disable-next-line no-console
                console.trace('[Statistics] [routeKills] Attempted to get invalid region:', prop);
            }
            return regions[regionName];
        },

        // Prevent adding regions dynamically once the proxy is created
        set: (
            obj: Record<string, Record<number, Observable<number>>>,
            prop: GameConstants.Region | symbol | string,
            value: any,
        ): boolean => {
            // eslint-disable-next-line no-console
            console.trace(`[Statistics] [routeKills] Attempted to dynamically set region ${String(prop)}:`, value);
            return false;
        },
    });
};
