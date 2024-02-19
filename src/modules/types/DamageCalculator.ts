import PokemonType from '../enums/PokemonType';
import { Region } from '../GameConstants';
import WeatherType from '../weather/WeatherType';
import { getPokemonByName } from '../pokemons/PokemonHelper';
import GameHelper from '../GameHelper';
import type { PokemonNameType } from '../pokemons/PokemonNameType';

export type TypeDetail = {
    id: number,
    name: string,
    type1: PokemonType,
    type2: PokemonType,
    damage: number,
    displayName: string,
};

export const type1 = ko.observable(PokemonType.None).extend({ numeric: 0 });
export const type2 = ko.observable(PokemonType.None).extend({ numeric: 0 });
export const region = ko.observable(Region.none);
export const weather = ko.observable(WeatherType.Clear);
export const includeBreeding = ko.observable(false);
export const baseAttackOnly = ko.observable(false);
export const ignoreLevel = ko.observable(false);
export const detailType = ko.observable(PokemonType.None).extend({ numeric: 0 });

export function totalDamage(): number {
    const ignoreRegionMultiplier = region() == Region.none;

    return App.game.party.calculatePokemonAttack(
        type1(),
        type2(),
        ignoreRegionMultiplier,
        region(),
        includeBreeding(),
        baseAttackOnly(),
        weather(),
        ignoreLevel(),
    );
}

export function getDamageByTypes(): number[] {
    const typedamage = new Array(GameHelper.enumLength(PokemonType) - 1).fill(0);
    const ignoreRegionMultiplier = region() == Region.none;

    for (const pokemon of App.game.party.caughtPokemon) {
        const dataPokemon = getPokemonByName(pokemon.name);
        if (dataPokemon.type1 === PokemonType.None) {
            continue;
        }

        const attack = App.game.party.calculateOnePokemonAttack(pokemon, type1(), type2(), region(), ignoreRegionMultiplier, includeBreeding(), baseAttackOnly(), weather(), ignoreLevel());

        typedamage[dataPokemon.type1] += attack / 2;
        const otherType = dataPokemon.type2 !== PokemonType.None ? dataPokemon.type2 : dataPokemon.type1;
        typedamage[otherType] += attack / 2;
    }

    return typedamage;
}

// TODO replace temporary type with PartyPokemon type once that class is ported
export function getOneTypeDetail(pokemon: { name: PokemonNameType, displayName: string }): TypeDetail {
    const ignoreRegionMultiplier = region() == Region.none;
    const dataPokemon = getPokemonByName(pokemon.name);
    return {
        id: dataPokemon.id,
        name: dataPokemon.name,
        type1: dataPokemon.type1,
        type2: dataPokemon.type2,
        damage: App.game.party.calculateOnePokemonAttack(
            pokemon,
            type1(),
            type2(),
            region(),
            ignoreRegionMultiplier,
            includeBreeding(),
            baseAttackOnly(),
            weather(),
            ignoreLevel(),
        ),
        displayName: pokemon.displayName,
    };
}

export function getTypeDetail(): TypeDetail[] {
    return App.game.party.caughtPokemon.filter(pokemon => {
        const dataPokemon = getPokemonByName(pokemon.name);
        return dataPokemon.type1 == detailType() || dataPokemon.type2 == detailType();
    }).reduce((details, pokemon) => {
        details.push(getOneTypeDetail(pokemon));
        return details;
    }, []).sort((a, b) => b.damage - a.damage);
}

export const observableTypeDamageArray = ko.pureComputed(getDamageByTypes);
export const observableTypeDetails = ko.pureComputed(getTypeDetail);
export const observableTotalDamage = ko.pureComputed(totalDamage);
