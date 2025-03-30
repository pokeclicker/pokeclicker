import type { Observable } from 'knockout';
import '../../koExtenders';
import ContestRank from '../../enums/ContestRank';

const failedSetValue = () => 0;

// TODO: Determine what the return type is
export default (): any => {
    // Filter the Rank enum to only the string values (names)
    const rankNames = Object.values(ContestRank)
        .filter((v) => Number.isNaN(Number(v)));

    const zeroedRanks = Object.fromEntries(rankNames.map((rank) => ([
        rank,
        new Proxy({}, {
            get: (rankStats, prop: string) => {
                if (rankStats[prop]) {
                    return rankStats[prop];
                }

                // Rounds Won are tracked by the Contest Type Enum number as the key,
                // so only allow keys that can be numbers
                if (Number.isNaN(Number(prop))) {
                    if (Number.isNaN(prop)) {
                        // eslint-disable-next-line no-console
                        console.trace(`[Statistics] [${rank}] Invalid property requested:`, prop);
                    }
                    return failedSetValue;
                }

                // eslint-disable-next-line no-param-reassign
                rankStats[prop] = ko.observable<number>(0).extend({ numeric: 0 });
                return rankStats[prop];
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

    return new Proxy(zeroedRanks, {
        get: (ranks, prop: ContestRank | symbol | string) => {
            // Convert the prop to the string version of the rank
            const rankName = Number.isNaN(Number(prop))
                ? prop // A string was passed in
                : ContestRank[prop]; // Number was passed in
            if (!rankName) {
                // eslint-disable-next-line no-console
                console.trace('[Statistics] Attempted to get invalid Contest Rank:', prop);
            }
            return ranks[rankName];
        },

        // Prevent adding ranks dynamically once the proxy is created
        set: (
            obj: Record<string, Record<number, Observable<number>>>,
            prop: ContestRank | symbol | string,
            value: any,
        ): boolean => {
            // eslint-disable-next-line no-console
            console.trace(`[Statistics] Attempted to dynamically set Contest Rank ${String(prop)}:`, value);
            return false;
        },
    });
};
