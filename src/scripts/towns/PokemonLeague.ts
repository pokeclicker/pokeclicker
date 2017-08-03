///<reference path="Town.ts"/>
abstract class PokemonLeague extends Town {
    public gymList: KnockoutObservableArray<KnockoutObservable<Gym>>;
}