/* eslint-disable array-bracket-newline */
///<reference path="Town.ts"/>
class PokemonLeague extends Town {
    public gymList: KnockoutObservableArray<KnockoutObservable<Gym>>;

    constructor(name: string, requirements: Requirement[], shop: Shop, gyms: string[]) {
        super(name, requirements, shop);
        this.gym(null);
        this.gymList = ko.observableArray<KnockoutObservable<Gym>>();
        for (const gym of gyms) {
            this.gymList.push(ko.observable(gymList[gym]));
        }
    }

    public setupGymTowns() {
        for (const gym of this.gymList()) {
            TownList[gym().town] = TownList[this.name()];
        }
    }
}

// Share a shop across all Elite 4s
const indigoPlateauShop = new Shop([
    new PokeballItem(GameConstants.Pokeball.Masterball, 10000000, GameConstants.Currency.money       , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.money]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 75000   , GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.dungeonToken]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.questPoint  , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.questPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 3000    , GameConstants.Currency.farmPoint   , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.farmPoint]}` }),
    new PokeballItem(GameConstants.Pokeball.Masterball, 50      , GameConstants.Currency.diamond     , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.diamond]}` }),
    ItemList['RareCandy'],
    ItemList['Protein'],
]);

const indigoPlateauKanto = ['Elite Lorelei', 'Elite Bruno', 'Elite Agatha', 'Elite Lance', 'Champion Blue'];
TownList['Indigo Plateau Kanto'] = new PokemonLeague('Indigo Plateau Kanto', [new RouteKillRequirement(10, 23), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road'))], indigoPlateauShop, indigoPlateauKanto);
(<PokemonLeague>TownList['Indigo Plateau Kanto']).setupGymTowns();

const indigoPlateauJohto = ['Elite Will', 'Elite Koga', 'Elite Bruno2', 'Elite Karen', 'Champion Lance'];
TownList['Indigo Plateau Johto'] = new PokemonLeague('Indigo Plateau Johto', [new RouteKillRequirement(10, 27)], indigoPlateauShop, indigoPlateauJohto);
(<PokemonLeague>TownList['Indigo Plateau Johto']).setupGymTowns();

const pokemonLeagueHoenn = ['Elite Sidney', 'Elite Phoebe', 'Elite Glacia', 'Elite Drake', 'Champion Wallace'];
TownList['Pokemon League Hoenn'] = new PokemonLeague('Pokemon League Hoenn', [new RouteKillRequirement(10, 128), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road Hoenn'))], indigoPlateauShop, pokemonLeagueHoenn);
(<PokemonLeague>TownList['Pokemon League Hoenn']).setupGymTowns();

const pokemonLeagueSinnoh = ['Elite Aaron', 'Elite Bertha', 'Elite Flint', 'Elite Lucian', 'Champion Cynthia'];
TownList['Pokemon League Sinnoh'] = new PokemonLeague('Pokemon League Sinnoh', [new RouteKillRequirement(10, 223), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road Sinnoh'))], indigoPlateauShop, pokemonLeagueSinnoh);
(<PokemonLeague>TownList['Pokemon League Sinnoh']).setupGymTowns();

