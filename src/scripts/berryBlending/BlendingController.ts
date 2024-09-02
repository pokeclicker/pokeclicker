class BlendingController {

    public static blendingModalTabSelected: KnockoutObservable<string> = ko.observable('blendingView');

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedPokeBlock: KnockoutObservable<Item> = ko.observable(ItemList.Pokeblock_Red);
}
