///<reference path="../../../declarations/enums/EvolutionType.d.ts"/>
abstract class Evolution {
    type: EvolutionType[];

    constructor(
        public basePokemon: PokemonNameType
    ) {
        this.type = [];
    }

    isSatisfied(): boolean {
        // Check that evolution is within reached regions
        return PokemonHelper.calcNativeRegion(this.getEvolvedPokemon()) <= player.highestRegion();
    }

    abstract getEvolvedPokemon(): PokemonNameType

    evolve(notification = false): boolean {
        const evolvedPokemon = this.getEvolvedPokemon();

        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(evolvedPokemon) > player.highestRegion()) {
            return false;
        }

        // Notify the player if they haven't already caught the evolution, or notifications are forced
        if (!App.game.party.alreadyCaughtPokemonByName(evolvedPokemon) || notification) {
            Notifier.notify({
                message: `Your ${this.basePokemon} evolved into a ${evolvedPokemon}`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);

        if (App.game.party.getPokemon(PokemonHelper.getPokemonByName(evolvedPokemon).id).pokerus >= GameConstants.Pokerus.Contagious) {
            const EPYield = (shiny ? GameConstants.SHINY_EP_YIELD : 1) * GameConstants.STONE_EP_YIELD;
            GameHelper.incrementObservable(App.game.statistics.effortPoints[PokemonHelper.getPokemonByName(evolvedPokemon).id], EPYield);
        }

        return shiny;
    }

}

type MinimalEvo = ConstructorImplementing<Evolution, 'getEvolvedPokemon'>

function restrictEvoWith(restrictionTest: () => boolean, type: EvolutionType = null) {
    return function<T extends MinimalEvo>(Base: T): T {
        return class extends Base {
            constructor(...args: any[]) {
                super(...args);
                if (type !== null) {
                    this.type.push(type);
                }
            }

            isSatisfied(): boolean {
                return restrictionTest() && super.isSatisfied();
            }
        };
    };
}
