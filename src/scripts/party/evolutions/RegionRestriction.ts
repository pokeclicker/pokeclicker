/// <reference path="./LocationRestriction.ts" />

function ByRegion<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return class extends Base implements LocationRestricted {
        regions: Array<string>

        constructor(...args: any[]) {
            const [region, ...rest] = args;
            super(...rest);
            this.type.push(EvolutionType.Region);
            this.regions = region;
        }

        atLocation(): boolean {
            let regionSatisfied = false;
            for (const region of this.regions) {
                if (player.region == region) {
                    regionSatisfied = true;
                }
            }
            return regionSatisfied;
        }
    };
}

// Utility type so that typescript can figure out
// the constructor params for our lifted evolution
type RegionRestrictedT<T extends Constructor<any>> =
    new (regionArray: Array<GameConstants.Region>,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>

function RegionRestricted<T extends Constructor<any>>(Base: T): RegionRestrictedT<T> {
    return LocationRestricted(ByRegion(Base));
}
