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

        const newPokemon = !App.game.party.alreadyCaughtPokemonByName(evolvedPokemon);
        if (newPokemon || notification) {
            // Notify the player if they haven't already caught the evolution, or notifications are forced
            Notifier.notify({
                message: `Your ${this.basePokemon} evolved into ${GameHelper.anOrA(evolvedPokemon)} ${evolvedPokemon}!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);

        // Add shiny to logbook
        if (shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `Your ${this.basePokemon} evolved into a shiny ${evolvedPokemon}! ${App.game.party.alreadyCaughtPokemonByName(evolvedPokemon, true) ? '(duplicate)' : ''}`);
        }

        if (newPokemon && App.game.challenges.list.realEvolutions.active()) {
            const basePokemonParty = App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id);
            const evolvedPokemonParty = App.game.party.getPokemon(PokemonHelper.getPokemonByName(evolvedPokemon).id);
            evolvedPokemonParty.effortPoints = basePokemonParty.effortPoints;
            evolvedPokemonParty.pokerus = basePokemonParty.pokerus;
            evolvedPokemonParty.shiny = basePokemonParty.shiny;
            evolvedPokemonParty.attackBonusAmount = basePokemonParty.attackBonusAmount;
            // TODO: add attackBonusProcent
            App.game.party.removePokemonByName(this.basePokemon);
        }

        // EVs
        const evolvedPartyPokemon = App.game.party.getPokemonByName(evolvedPokemon);
        if (evolvedPartyPokemon.pokerus >= GameConstants.Pokerus.Contagious) {
            const EPYield = (shiny ? GameConstants.SHINY_EP_YIELD : 1) * GameConstants.STONE_EP_YIELD;
            evolvedPartyPokemon.effortPoints +=  EPYield;
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
