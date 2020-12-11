/// <reference path="../../GameConstants.d.ts" />

function EnvironmentRestricted<T extends Constructor<any> & MinimalEvo>(Base: T): EnvironmentRestrictedT<T> {
    const Mixin = class extends Base {
        environment: GameConstants.Environment

        constructor(...args: any[]) {
            const [env, ...rest] = args;
            super(...rest);
            this.environment = env;
            this.type.push(EvolutionType.Environment);
        }

        isSatisfied(): boolean {
            return MapHelper.getCurrentEnvironment() == this.environment
                && super.isSatisfied();
        }
    };

    return Mixin;
}

type EnvironmentRestrictedT<T extends Constructor<any>> =
    new (environment: GameConstants.Environment,
         ...rest: ConstructorParameters<T>
        )
    => InstanceType<T>
