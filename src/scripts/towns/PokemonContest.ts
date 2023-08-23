class PokemonContest implements Feature {
    name = 'Pokemon Contest';
    saveKey = 'pokemonContest';

    public lastEnteredDate: KnockoutObservable<Date>;
    public entries: KnockoutObservableArray<ContestEntry>;

    public prizes = [
        new PokemonContestPrizes('10 Rare Candy',
            'Get 10 Rare Candy by catching a Machop! (real requirement will be added later)',
            'Rare_Candy',
            10,
            new ObtainedPokemonRequirement('Machop')
        ),
        /*new PokemonContestPrizes('Secret Mega Stone',
            'Get a secret Mega Stone for reaching Kalos. (real requirement will be added later)',
            'Altarianite',
            10,
            new MaxRegionRequirement(GameConstants.Region.kalos),
            new MaxRegionRequirement(GameConstants.Region.kalos)
        ),*/
    ];

    constructor() {
        this.lastEnteredDate = ko.observable(undefined);
        this.entries = ko.observableArray(Array(3).fill(undefined).map(() => new ContestEntry()));
    }

    initialize(): void {

    }

    canAccess(): boolean {
        return PokemonContestController.requirements.isCompleted();
    }

    update(delta: number): void {
    }

    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            prizes: this.prizes.map(p => p.toJSON()),
        };
    }
    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        this.prizes.forEach(p => {
            const jsonPrize = json?.prizes.find(p2 => p2.title == p.title);
            if (jsonPrize) {
                p.fromJSON(jsonPrize);
            }
        });
    }
}

class PokemonContestController {
    static contestStyle: KnockoutObservable<ContestStyle> = ko.observable(undefined);
    static pokemonType: KnockoutObservable<PokemonType> = ko.observable(PokemonType.None);
    //static inProgress = ko.observable<boolean>(false); //TODO: this should be used for some sort of animation or something
    static contestText: KnockoutObservable<string> = ko.observable(undefined);
    static requirements = new MultiRequirement([new MaxRegionRequirement(GameConstants.Region.hoenn), new DevelopmentRequirement()]);

    static entryAmount = 3;

    public static generateDailyContest(date: Date) {
        SeededRand.seedWithDate(date);

        // Generate Contest Style and Pokemon Type constraints
        this.contestStyle(SeededRand.fromArray(GameHelper.enumNumbers(ContestStyle)));
        const validTypes = GameHelper.enumNumbers(PokemonType).filter((t) => t !== PokemonType.None);
        this.pokemonType(SeededRand.fromArray(validTypes));
    }

    public static getValidPokemonList(entryIndex: number) {
        return ko.pureComputed((): PartyPokemon[] => {
            const pokemonType = PokemonContestController.pokemonType();
            const otherEntries = App.game.pokemonContest.entries().filter((e, i) => i !== entryIndex && e.pokemonName()).map((e) => e.pokemonName());
            const validPokemon = App.game.party.caughtPokemon.filter((p) => pokemonMap[p.name].type.includes(pokemonType) && !otherEntries.includes(p.name));
            return validPokemon.sort((a, b) => a.displayName.localeCompare(b.displayName));
        });
    }

    public static getBerryList = ko.pureComputed(() => {
        const berries = App.game.farming.berryData.filter((b) => App.game.farming.unlockedBerries[b.type]() && App.game.farming.berryList[b.type]() > 0);
        return berries;
    });

    public static getTotalStylePoints = ko.pureComputed((): number => {
        return App.game.pokemonContest.entries().reduce((sum, e) => sum + e.getStylePoints(), 0);
    });

    private static canEnterContest() : boolean {
        if (App.game.pokemonContest.lastEnteredDate() && App.game.pokemonContest.lastEnteredDate().toDateString() == (new Date()).toDateString()) {
            Notifier.notify({
                title: 'You can\'t enter the contest',
                message: 'You have already entered the contest today',
                type: NotificationConstants.NotificationOption.warning,
            });
            return false;
        }
        return true;
    }

    public static startContest() {
        if (!PokemonContestController.canEnterContest()) {
            return;
        }
        //PokemonContestController.inProgress(true);
        App.game.pokemonContest.lastEnteredDate(new Date());
        //TODO: take some berries from the user

        const stylePoints = PokemonContestController.getTotalStylePoints();
        const contestTokensGained = stylePoints;
        let result : GameConstants.ContestResults = undefined;
        if (stylePoints > 700) {
            result = GameConstants.ContestResults.Master;
        } else if (stylePoints > 450) {
            result = GameConstants.ContestResults.Hyper;
        } else if (stylePoints > 200) {
            result = GameConstants.ContestResults.Super;
        } else {
            result = GameConstants.ContestResults.Normal;
        }

        App.game.wallet.gainContestTokens(contestTokensGained);
        GameHelper.incrementObservable(App.game.statistics.contestResults[result], 1);
        const message = `Your Result is ${GameConstants.ContestResults[result]}!\n` +
            `You gained ${contestTokensGained} Contest Tokens.\n` +
            'Please check our Reward stand to see if you won anything new.\n' +
            'I hope to see you again tomorrow.';
        Notifier.notify({
            title: 'Contest is over!',
            message: message,
            type: NotificationConstants.NotificationOption.success,
            timeout: GameConstants.MINUTE * 3,
        });
    }
}

class ContestEntry {
    public pokemonName: KnockoutObservable<PokemonNameType>;
    public berry: KnockoutObservable<BerryType>;

    constructor() {
        this.pokemonName = ko.observable(undefined);
        this.berry = ko.observable(BerryType.None);
    }

    public getPokemonImage() {
        return !this.pokemonName() ? 'assets/images/pokeball/Pokeball.svg' : PokemonHelper.getImage(pokemonMap[this.pokemonName()].id);
    }

    getStylePoints = ko.pureComputed((): number => {
        if (!this.pokemonName()) {
            return 0;
        }

        let stylePoints = 0;
        let flavorType: FlavorType;
        const baseStats = pokemonMap[this.pokemonName()].base;

        switch (PokemonContestController.contestStyle()) {
            case ContestStyle.Cool:
                stylePoints = baseStats.attack + baseStats.specialDefense;
                flavorType = FlavorType.Spicy;
                break;
            case ContestStyle.Beautiful:
                stylePoints = baseStats.specialAttack + baseStats.defense;
                flavorType = FlavorType.Dry;
                break;
            case ContestStyle.Cute:
                stylePoints = baseStats.specialDefense + baseStats.hitpoints;
                flavorType = FlavorType.Sweet;
                break;
            case ContestStyle.Clever:
                stylePoints = baseStats.specialAttack + baseStats.speed;
                flavorType = FlavorType.Bitter;
                break;
            case ContestStyle.Tough:
                stylePoints = baseStats.hitpoints + baseStats.defense;
                flavorType = FlavorType.Sour;
                break;
        }

        if (this.berry() && this.berry() !== BerryType.None) {
            stylePoints += App.game.farming.berryData[this.berry()].flavors[flavorType].value;
        }

        return stylePoints;
    });
}

enum ContestStyle {
    Cool,
    Beautiful,
    Cute,
    Clever,
    Tough,
}

class PokemonContestTownContent extends TownContent {
    constructor() {
        super([PokemonContestController.requirements]);
    }
    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return 'Pokémon Contest';
    }
    public onclick(): void {
        $('#pokemonContestModal').modal('show');
    }
}

class PokemonContestPrizes {
    private item: Item;
    public claimed: KnockoutObservable<boolean> = ko.observable<boolean>(false);

    constructor(
        public title: string,
        public description: string,
        itemName: ItemNameType,
        private amount: number,
        private claimRequirement: Requirement,
        private visibleRequirement?: Requirement
    ) {
        this.item = ItemList[itemName];
    }

    getImage() {
        return this.item.image;
    }

    isVisible() {
        return this.item.isAvailable() && !this.item.isSoldOut() && (!this.visibleRequirement || this.visibleRequirement.isCompleted());
    }

    canBeClaimed() {
        return !this.claimed() && this.claimRequirement.isCompleted();
    }

    claim() {
        if (!this.canBeClaimed()) {
            return;
        }
        this.claimed(true);
        this.item.gain(this.amount);
    }

    toJSON(): Record<string, any> {
        return {
            title: this.title,
            claimed: this.claimed(),
        };
    }
    fromJSON(json: Record<string, any>): void {
        if (json) {
            this.claimed(json.claimed);
        }
    }
}
