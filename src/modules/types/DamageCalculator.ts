import PokemonType from '../enums/PokemonType';
import { AlolaSubRegions, Region } from '../GameConstants';
import WeatherType from '../weather/WeatherType';
import { getPokemonByName } from '../pokemons/PokemonHelper';
import GameHelper from '../GameHelper';
import type { PokemonNameType } from '../pokemons/PokemonNameType';

export default class DamageCalculator {
    public static type1 = ko.observable(PokemonType.None).extend({ numeric: 0 });
    public static type2 = ko.observable(PokemonType.None).extend({ numeric: 0 });
    public static region = ko.observable(Region.none);
    public static subregion = ko.observable(-1);
    public static weather = ko.observable(WeatherType.Clear);
    public static includeBreeding = ko.observable(false);
    public static baseAttackOnly = ko.observable(false);
    public static ignoreLevel = ko.observable(false);
    public static detailType = ko.observable(PokemonType.None).extend({ numeric: 0 });

    public static observableTypeDamageArray = ko.pureComputed(DamageCalculator.getDamageByTypes);
    public static observableTypeDetails = ko.pureComputed(DamageCalculator.getTypeDetail);
    public static observableTotalDamage = ko.pureComputed(DamageCalculator.totalDamage);

    public static initialize(): void {
        DamageCalculator.region.subscribe((value) => {
            const subregion = value == Region.none ? -1 : 0;
            DamageCalculator.subregion(subregion);
        });
    }

    public static totalDamage(): number {
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;

        return App.game.party.calculatePokemonAttack(
            DamageCalculator.type1(),
            DamageCalculator.type2(),
            ignoreRegionMultiplier,
            DamageCalculator.region(),
            DamageCalculator.includeBreeding(),
            DamageCalculator.baseAttackOnly(),
            DamageCalculator.weather(),
            DamageCalculator.ignoreLevel(),
            true,
            DamageCalculator.subregion(),
        );
    }

    public static getDamageByTypes(): number[] {
        const typedamage = new Array(GameHelper.enumLength(PokemonType) - 1).fill(0);
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;

        for (const pokemon of App.game.party.caughtPokemon) {
            const dataPokemon = getPokemonByName(pokemon.name);
            if (dataPokemon.type1 === PokemonType.None) {
                continue;
            }

            if (DamageCalculator.region() == Region.alola && DamageCalculator.subregion() == AlolaSubRegions.MagikarpJump && Math.floor(pokemon.id) != 129) {
                continue;
            }

            const attack = App.game.party.calculateOnePokemonAttack(pokemon, DamageCalculator.type1(), DamageCalculator.type2(), DamageCalculator.region(), ignoreRegionMultiplier,
                DamageCalculator.includeBreeding(), DamageCalculator.baseAttackOnly(), DamageCalculator.weather(), DamageCalculator.ignoreLevel());

            typedamage[dataPokemon.type1] += attack / 2;
            const otherType = dataPokemon.type2 !== PokemonType.None ? dataPokemon.type2 : dataPokemon.type1;
            typedamage[otherType] += attack / 2;
        }

        return typedamage;
    }

    // TODO replace temporary type with PartyPokemon type once that class is ported
    public static getOneTypeDetail(pokemon: { name: PokemonNameType, displayName: string }): TypeDetail {
        const ignoreRegionMultiplier = DamageCalculator.region() == Region.none;
        const dataPokemon = getPokemonByName(pokemon.name);
        return {
            id: dataPokemon.id,
            name: dataPokemon.name,
            type1: dataPokemon.type1,
            type2: dataPokemon.type2,
            damage: App.game.party.calculateOnePokemonAttack(
                pokemon,
                DamageCalculator.type1(),
                DamageCalculator.type2(),
                DamageCalculator.region(),
                ignoreRegionMultiplier,
                DamageCalculator.includeBreeding(),
                DamageCalculator.baseAttackOnly(),
                DamageCalculator.weather(),
                DamageCalculator.ignoreLevel(),
            	true,
                DamageCalculator.subregion(),
            ),
            displayName: pokemon.displayName,
        };
    }

    public static getTypeDetail(): TypeDetail[] {
        return App.game.party.caughtPokemon.filter(pokemon => {
            const dataPokemon = getPokemonByName(pokemon.name);
            return dataPokemon.type1 == DamageCalculator.detailType() || dataPokemon.type2 == DamageCalculator.detailType();
        }).reduce((details, pokemon) => {
            details.push(DamageCalculator.getOneTypeDetail(pokemon));
            return details;
        }, []).sort((a, b) => b.damage - a.damage);
    }
}

export type TypeDetail = {
    id: number,
    name: string,
    type1: PokemonType,
    type2: PokemonType,
    damage: number,
    displayName: string,
};
