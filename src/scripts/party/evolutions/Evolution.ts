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
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);

        const newPokemon = !App.game.party.alreadyCaughtPokemonByName(evolvedPokemon);
        if (newPokemon || shiny || notification) {
            // Notify the player if they haven't already caught the evolution, or notifications are forced
            Notifier.notify({
                message: `Your ${this.basePokemon} evolved into ${shiny ? 'a shiny' : GameHelper.anOrA(evolvedPokemon)} ${evolvedPokemon}!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        // Add shiny to logbook
        if (shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `Your ${this.basePokemon} evolved into a shiny ${evolvedPokemon}! ${App.game.party.alreadyCaughtPokemonByName(evolvedPokemon, true) ? '(duplicate)' : ''}`);
        }

        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);

        const evolvedPartyPokemon = App.game.party.getPokemonByName(evolvedPokemon);
        if (newPokemon && App.game.challenges.list.realEvolutions.active()) {
            const basePartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id);
            evolvedPartyPokemon.effortPoints = basePartyPokemon.effortPoints;
            evolvedPartyPokemon.pokerus = basePartyPokemon.pokerus;
            evolvedPartyPokemon.shiny = evolvedPartyPokemon.shiny || basePartyPokemon.shiny;
            evolvedPartyPokemon.attackBonusAmount = basePartyPokemon.attackBonusAmount;
            evolvedPartyPokemon.attackBonusPercent = basePartyPokemon.attackBonusPercent;
            evolvedPartyPokemon.proteinsUsed = basePartyPokemon.proteinsUsed;
            App.game.party.removePokemonByName(this.basePokemon);
            const basePokemonStatistics = App.game.statistics.pokemonCaptured[PokemonHelper.getPokemonByName(this.basePokemon).id];
            App.game.statistics.pokemonCaptured[evolvedPartyPokemon.id](basePokemonStatistics());
            basePokemonStatistics(0);
        }

        // EVs
        evolvedPartyPokemon.effortPoints += App.game.party.calculateEffortPoints(evolvedPartyPokemon, shiny, GameConstants.STONE_EP_YIELD);
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
