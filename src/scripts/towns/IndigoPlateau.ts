///<reference path="PokemonLeague.ts"/>
class IndigoPlateau extends PokemonLeague {


    constructor(shop?: Shop) {
        super("Indigo Plateau", [23], shop);
        this.gym(null);
        this.gymList = ko.observableArray<KnockoutObservable<Gym>>();
        this.gymList.push(ko.observable(gymList["Elite Lorelei"]));
        this.gymList.push(ko.observable(gymList["Elite Bruno"]));
        this.gymList.push(ko.observable(gymList["Elite Agatha"]));
        this.gymList.push(ko.observable(gymList["Elite Lance"]));
        this.gymList.push(ko.observable(gymList["Champion Blue"]));

        //todo add champion
    }


}
//TODO move this to town class
TownList["Indigo Plateau"] = new IndigoPlateau();
TownList["Elite Lorelei"] = TownList["Indigo Plateau"];
TownList["Elite Bruno"] = TownList["Indigo Plateau"];
TownList["Elite Agatha"] = TownList["Indigo Plateau"];
TownList["Elite Lance"] = TownList["Indigo Plateau"];
TownList["Champion Blue"] = TownList["Indigo Plateau"];