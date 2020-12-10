/// <reference path="../../GameConstants.d.ts" />

function ByEnvironment<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return class extends Base implements LocationRestricted {
        environment: GameConstants.Environment

        constructor(...args: any[]) {
            const [env, ...rest] = args;
            super(...rest);
            this.environment = env;
            this.type.push(EvolutionType.Environment);
        }

        atLocation(): boolean {
            return MapHelper.getCurrentEnvironment() == this.environment;
        }
    };
}

type EnvironmentRestrictedT<T extends Constructor<any>> =
    new (environment: GameConstants.Environment,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>

function EnvironmentRestricted<T extends Constructor<any>>(Base: T): EnvironmentRestrictedT<T> {
    return LocationRestricted(ByEnvironment(Base));
}

const EnvironmentRestrictedLevelEvolution = EnvironmentRestricted(LevelEvolution);
