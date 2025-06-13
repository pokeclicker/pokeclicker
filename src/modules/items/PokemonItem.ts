import PokerusIndicatingItem from './PokerusIndicatingItem';
import { PokemonNameType } from  '../pokemons/PokemonNameType';
import CaughtStatus from '../enums/CaughtStatus';
import { Computed as KnockoutComputed } from 'knockout';
import { Currency, SHINY_CHANCE_SHOP, SHOPMON_EP_YIELD, ShadowStatus, PokemonStatisticsType, Pokerus } from '../GameConstants';
import { ShopOptions } from './types';
import * as PokemonHelper from '../pokemons/PokemonHelper';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { createLogContent } from '../logbook/helpers';
import { LogBookTypes } from '../logbook/LogBookTypes';

export default class PokemonItem extends PokerusIndicatingItem {
    type: PokemonNameType;
    private _translatedOrDisplayName: KnockoutComputed<string>;

    constructor(
        pokemon: PokemonNameType,
        basePrice: number = undefined,
        currency: Currency = Currency.questPoint,
        public ignoreEV = false,
        displayName: string = undefined,
        options?: ShopOptions,
        name: string = pokemon,
    ) {
        super(name, basePrice, currency, options, undefined, `Add ${pokemon} to your party.`, 'pokemonItem');
        this.type = pokemon;
        this._translatedOrDisplayName = ko.pureComputed(() => displayName ?? PokemonHelper.displayName(pokemon)());
    }

    gain(amt: number) {
        let shiny = false;
        let numShiny = 0;
        const pokemonName = this.type;
        const pokemonID = PokemonHelper.getPokemonByName(pokemonName).id;
        for (let i = 0; i < amt; i++) {
            const shinyBool = PokemonFactory.generateShiny(SHINY_CHANCE_SHOP);
            if (shinyBool) {
                numShiny++;
            }
            shiny = shiny || shinyBool;

            // Statistics
            if (i < amt - 1) { // -1 because gainPokemonById will add 1 to statistics
                const gender = PokemonFactory.generateGenderById(pokemonID);
                const shinyStatistic = shinyBool && numShiny > 1;
                PokemonHelper.incrementPokemonStatistics(pokemonID, PokemonStatisticsType.Captured, shinyStatistic, gender, ShadowStatus.None);
            }
        }

        if (shiny || !App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id)) {
            const newCatch = !(shiny && App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true));
            Notifier.notify({
                message: `${(shiny) ? `✨ You obtained a shiny ${pokemonName}! ✨` : `You obtained ${GameHelper.anOrA(pokemonName)} ${pokemonName}!`}`,
                pokemonImage: PokemonHelper.getImage(pokemonID, shiny, undefined, ShadowStatus.None),
                type: (shiny ? NotificationConstants.NotificationOption.warning : NotificationConstants.NotificationOption.success),
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: (newCatch ? NotificationConstants.NotificationSound.General.new_catch : null),
            });
        }
        if (shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true)
                    ? createLogContent.purchasedShinyDupe({ pokemon: pokemonName })
                    : createLogContent.purchasedShiny({ pokemon: pokemonName }),
            );
        }

        App.game.party.gainPokemonById(pokemonID, shiny, true);

        const partyPokemon = App.game.party.getPokemon(pokemonID);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, false, ShadowStatus.None, SHOPMON_EP_YIELD * (amt - numShiny), this.ignoreEV);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, true, ShadowStatus.None, SHOPMON_EP_YIELD * numShiny, this.ignoreEV);
    }

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.type);
    }

    getPokerusStatus(): Pokerus {
        return PartyController.getPokerusStatusByName(this.type);
    }

    getPokerusProgress(): string {
        const evs = PartyController.getEvsByName(this.type);
        return evs >= 50 ? 'Already resistant!' : `EVs: ${evs.toLocaleString('en-US')} / 50`;
    }

    showBagAmount() {
        return false;
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name.replace(/[^\s\w.()-]/g, '')}.png`;
    }

    get displayName(): string {
        return this._translatedOrDisplayName();
    }
}
