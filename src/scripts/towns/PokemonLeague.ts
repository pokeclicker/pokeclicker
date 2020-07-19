/* eslint-disable array-bracket-newline */
///<reference path="Town.ts"/>
class PokemonLeague extends Town {
    public gymList: KnockoutObservableArray<KnockoutObservable<Gym>>;

    constructor(name: string, routes: number[], shop: Shop, dungeonReq: string, gyms: string[]) {
        super(name, routes, shop, null, dungeonReq);
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
TownList['Indigo Plateau Kanto'] = new PokemonLeague('Indigo Plateau Kanto', [23], indigoPlateauShop, 'Victory Road', indigoPlateauKanto);
(<PokemonLeague>TownList['Indigo Plateau Kanto']).setupGymTowns();

const indigoPlateauJohto = ['Elite Will', 'Elite Koga', 'Elite Bruno2', 'Elite Karen', 'Champion Lance'];
TownList['Indigo Plateau Johto'] = new PokemonLeague('Indigo Plateau Johto', [27], indigoPlateauShop, null, indigoPlateauJohto);
(<PokemonLeague>TownList['Indigo Plateau Johto']).setupGymTowns();

const pokemonLeagueHoenn = ['Elite Sidney', 'Elite Phoebe', 'Elite Glacia', 'Elite Drake', 'Champion Wallace'];
TownList['Pokemon League Hoenn'] = new PokemonLeague('Pokemon League Hoenn', [128], indigoPlateauShop, 'Victory Road Hoenn', pokemonLeagueHoenn);
(<PokemonLeague>TownList['Pokemon League Hoenn']).setupGymTowns();
