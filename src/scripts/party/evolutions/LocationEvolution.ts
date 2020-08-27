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

function ByDungeon<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return class extends Base implements LocationRestricted {
        dungeon: string

        constructor(...args: any[]) {
            const [dungeon, ...rest] = args;
            super(...rest);
            this.dungeon = dungeon;
        }

        atLocation(): boolean {
            return App.game.gameState == GameConstants.GameState.dungeon
                && DungeonRunner.dungeon.name() == this.dungeon;
        }
    };
}

function DungeonRestricted(Base) {
    return LocationRestricted(ByDungeon(Base));
}

// Utility type so that typescript can figure out
// the constructor params for our lifted evolution
type DungeonRestrictedT<T extends Constructor<any>> =
    new (dungeon: string,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>

// Typescript will only unroll the other constructor
// params if we use the utility type on the class variable.
// If we only specify the type for the DungeonRestricted function,
// it will only tell us that this class is constructed with
// (dungeon: string, ...rest: any[])
const DungeonRestrictedLevelEvolution
    : DungeonRestrictedT<typeof LevelEvolution>
    = DungeonRestricted(LevelEvolution);
