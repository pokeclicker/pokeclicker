/// <reference path="./LocationRestriction.ts" />

function ByRegion<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return class extends Base implements LocationRestricted {
        region: string

        constructor(...args: any[]) {
            const [region, ...rest] = args;
            super(...rest);
            this.region = region;
        }

        atLocation(): boolean {
            return player.region == this.region;
        }
    };
}

// Utility type so that typescript can figure out
// the constructor params for our lifted evolution
type RegionRestrictedT<T extends Constructor<any>> =
    new (region: GameConstants.Region,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>

function RegionRestricted<T extends Constructor<any>>(Base: T): RegionRestrictedT<T> {
    return LocationRestricted(ByRegion(Base));
}
