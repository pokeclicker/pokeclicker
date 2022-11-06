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
        // The player might not have the pokemon if realEvolutions is active and there are more than one evolution
        return App.game.party.alreadyCaughtPokemonByName(this.basePokemon) && PokemonHelper.calcNativeRegion(this.getEvolvedPokemon()) <= player.highestRegion();
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
                message: `Your ${PokemonHelper.displayName(this.basePokemon)()} evolved into ${shiny ? 'a shiny' : GameHelper.anOrA(evolvedPokemon)} ${PokemonHelper.displayName(evolvedPokemon)()}!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        // Add shiny to logbook
        if (shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemonByName(evolvedPokemon, true)
                    ? createLogContent.evolvedShinyDupe({ basePokemon: this.basePokemon, evolvedPokemon})
                    : createLogContent.evolvedShiny({ basePokemon: this.basePokemon, evolvedPokemon })
            );
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
            evolvedPartyPokemon.heldItem = basePartyPokemon.heldItem;
            App.game.party.removePokemonByName(this.basePokemon);
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
