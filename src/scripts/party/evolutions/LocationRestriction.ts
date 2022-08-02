interface LocationRestricted extends Evolution {
  atLocation(): boolean
}

type LocationEvo = ConstructorImplementing<LocationRestricted, 'getEvolvedPokemon' | 'atLocation'>

function LocationRestricted<EvoClass extends LocationEvo>(Base: EvoClass) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
        }

        isSatisfied(): boolean {
            return this.atLocation()
                && super.isSatisfied();
        }
    };
}
