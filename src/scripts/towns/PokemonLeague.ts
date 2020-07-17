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

const indigoPlateauKanto = ['Elite Lorelei', 'Elite Bruno', 'Elite Agatha', 'Elite Lance', 'Champion Blue'];
const indigoPlateauKantoShop = new Shop([
    ItemList['Masterball'],
    ItemList['RareCandy'],
]);
TownList['Indigo Plateau Kanto'] = new PokemonLeague('Indigo Plateau Kanto', [23], indigoPlateauKantoShop, 'Victory Road', indigoPlateauKanto);
(<PokemonLeague>TownList['Indigo Plateau Kanto']).setupGymTowns();

const indigoPlateauJohtoShop = new Shop([
    ItemList['Protein'],
]);
const indigoPlateauJohto = ['Elite Will', 'Elite Koga', 'Elite Bruno2', 'Elite Karen', 'Champion Lance'];
TownList['Indigo Plateau Johto'] = new PokemonLeague('Indigo Plateau Johto', [27], indigoPlateauJohtoShop, null, indigoPlateauJohto);
(<PokemonLeague>TownList['Indigo Plateau Johto']).setupGymTowns();

const pokemonLeagueHoennShop = null;
const pokemonLeagueHoenn = ['Elite Sidney', 'Elite Phoebe', 'Elite Glacia', 'Elite Drake', 'Champion Wallace'];
TownList['Pokemon League Hoenn'] = new PokemonLeague('Pokemon League Hoenn', [128], pokemonLeagueHoennShop, 'Victory Road Hoenn', pokemonLeagueHoenn);
(<PokemonLeague>TownList['Pokemon League Hoenn']).setupGymTowns();
