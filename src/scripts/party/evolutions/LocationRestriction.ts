interface LocationRestricted extends Evolution {
  atLocation(): boolean
}

type LocationEvo = ConstructorImplementing<LocationRestricted, 'getEvolvedPokemon' | 'atLocation'>

function LocationRestricted<EvoClass extends LocationEvo>(Base: EvoClass) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            this.type.push(EvolutionType.Location);
        }

        isSatisfied(): boolean {
            return this.atLocation()
                && super.isSatisfied();
        }
    };
}

function locationEvoHelper(atLocationTest: () => boolean) {
    const restrictor = function<EvoClass extends MinimalEvo>(Base: EvoClass) {
        return class extends Base implements LocationRestricted {
            atLocation = atLocationTest;
        };
    };

    return function<T extends Constructor<any>>(Base: T): T {
        return LocationRestricted(restrictor(Base));
    };
}
