class HatcheryHelper {
    public static MAX_LEVEL = 50;
    public trainerSprite = 0;
    public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public tooltip: KnockoutComputed<string>;
    public fireAllButtonTooltip: KnockoutComputed<string>;
    public sortOption: KnockoutObservable<SortOptions> = ko.observable(SortOptions.id).extend({ numeric: 0 });
    public sortDirection: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public hatched: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public categories: KnockoutObservableArray<number> = ko.observableArray([]);
    public useHatcheryFilters: KnockoutObservable<boolean> = ko.observable(true);
    // public experience: number;

    constructor(
        public name: string,
        public cost: Amount,
        public efficiencyBase: number,
        public levelBonus: number,
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        SeededRand.seed(parseInt(this.name, 36));
        this.trainerSprite = SeededRand.intBetween(0, 118);

        this.tooltip = ko.pureComputed(() => `<strong>${this.name} Lv.${this.level()}</strong><br/>
            Cost: <img src="assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" width="20px">&nbsp;${(this.cost.amount).toLocaleString('en-US')}/hatch<br/>
            Efficiency: ${this.efficiency()}%<br/>
            Hatched: ${this.hatched().toLocaleString('en-US')}<br/>`
        );
    }

    private hatchedToLevel(hatched: number): number {
        return Math.floor(Math.min(HatcheryHelper.MAX_LEVEL, Math.sqrt(hatched * 2) / 10));
    }

    private levelToHatched(level: number): number {
        return (level * 10) ** 2 / 2;
    }

    private levelToLevelBonus(level: number): number {
        return this.levelBonus * level;
    }

    public level = ko.pureComputed(() => this.hatchedToLevel(this.hatched()));
    public bonusEfficiency = ko.pureComputed(() => this.levelToLevelBonus(this.level()));
    public efficiency = ko.pureComputed(() => this.efficiencyBase + this.bonusEfficiency());
    public currentLevelHatched = ko.pureComputed(() => this.levelToHatched(this.level()));
    public nextLevelHatched = ko.pureComputed(() => this.level() < HatcheryHelper.MAX_LEVEL ? this.levelToHatched(this.level() + 1) : Infinity);

    isUnlocked(): boolean {
        return this.unlockRequirement?.isCompleted() ?? true;
    }

    // String for currency in Notifications and Logs
    currencyString() {
        switch (GameConstants.Currency[this.cost.currency]) {
            case 'money':
                return 'Pokédollars';
            default:
                return `${GameConstants.camelCaseToString(GameConstants.Currency[this.cost.currency])}s`;
        }
    }

    hire(): void {

        // Check the player has enough Currency to hire this Hatchery Helper
        if (!App.game.wallet.hasAmount(this.cost)) {
            Notifier.notify({
                title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
                message: `You don't have enough ${this.currencyString()} to hire me...\nCost: <img src="./assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" height="24px"/> ${this.cost.amount.toLocaleString('en-US')}`,
                type: NotificationConstants.NotificationOption.warning,
                timeout: 30 * GameConstants.SECOND,
            });
            return;
        }
        // Hatchery helper is hired
        this.hired(true);
        Notifier.notify({
            title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * GameConstants.SECOND,
            setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
        });
    }

    fire(): void {
        Notifier.notify({
            title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for the work.\nLet me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
            setting: NotificationConstants.NotificationSetting.Hatchery.hatchery_helper,
        });
        this.hired(false);
        return;
    }

    charge(): void {
        // Charge the player if they can afford it, otherwise notify that they cannot
        if (!App.game.wallet.loseAmount(this.cost)) {
            Notifier.notify({
                title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
                message: `It looks like you are a little short on ${this.currencyString()} right now...\nLet me know when you're hiring again!\nCost: <img src="./assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" height="24px"/> ${this.cost.amount.toLocaleString('en-US')}`,
                type: NotificationConstants.NotificationOption.danger,
                timeout: 30 * GameConstants.MINUTE,
            });
            this.hired(false);
            App.game.logbook.newLog(
                LogBookTypes.OTHER,
                createLogContent.unableToPayHatcheryHelper({
                    currency: this.currencyString(),
                    name: this.name,
                })
            );
            return;
        }
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            hired: this.hired(),
            sortOption: this.sortOption(),
            sortDirection: this.sortDirection(),
            hatched: this.hatched(),
            categories: this.categories(),
            useHatcheryFilters: this.useHatcheryFilters(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        this.hired(json.hired || false);
        this.sortOption(json.sortOption || 0);
        this.sortDirection(json.sortDirection || false);
        this.hatched(json.hatched || 0);
        this.categories(json.categories || []);
        this.useHatcheryFilters(json.useHatcheryFilters ?? true);
    }
}

class HatcheryHelpers {
    public static list: HatcheryHelper[] = [];

    public static add(helper: HatcheryHelper) {
        this.list.push(helper);
    }

    public MAX_HIRES = 3;
    public available: KnockoutComputed<HatcheryHelper[]>;
    public hired: KnockoutComputed<HatcheryHelper[]>;
    public canHire: KnockoutComputed<boolean>;
    public requirement = new HatchRequirement(100);

    constructor(public hatchery: Breeding) {
        this.available = ko.pureComputed(() => HatcheryHelpers.list.filter(f => f.isUnlocked()));
        this.hired = ko.pureComputed(() => HatcheryHelpers.list.filter(f => f.hired()));
        this.canHire =  ko.pureComputed(() => this.hired().length < Math.min(this.MAX_HIRES, this.hatchery.eggSlots));
    }

    public isUnlocked() {
        return this.requirement.isCompleted();
    }

    public addSteps(amount: number, multiplier: Multiplier): void {
        // Add steps and attack based on efficiency
        this.hired().forEach((helper, index) => {
            // Calculate how many steps should be applied

            // Add steps to the egg we are managing
            let egg = this.hatchery.eggList[index]();
            egg.addSteps(amount, multiplier, true);

            // Check if the egg is ready to hatch
            if (egg.canHatch()) {
                const hatched = egg.hatch(helper.efficiency(), true);
                if (hatched) {
                    // Reset egg
                    this.hatchery.eggList[index](new Egg());
                    egg = this.hatchery.eggList[index]();
                }
            }

            // Check if egg slot empty
            if (egg.isNone()) {
                // Check if there's a pokemon we can chuck into an egg
                const regionalAttackDebuff = App.game.challenges.list.regionalAttackDebuff.active() ? Settings.getSetting('breedingRegionalAttackDebuffSetting').value : GameConstants.Region.none;
                const compare = PartyController.compareBy(helper.sortOption(), helper.sortDirection(), regionalAttackDebuff);

                const categories = helper.categories();
                const useHatcheryFilters = helper.useHatcheryFilters();
                const pokemon = App.game.party.caughtPokemon.reduce((best, pokemon) => {
                    if (useHatcheryFilters && !pokemon.isHatchableFiltered()) {
                        return best;
                    }
                    if (!pokemon.isHatchable()) {
                        return best;
                    }
                    if (categories.length && !categories.some((cat) => pokemon.category.includes(cat))) {
                        return best;
                    }
                    if (best === null) {
                        return pokemon;
                    }
                    return compare(best, pokemon) <= 0 ? best : pokemon;
                }, null);

                if (pokemon) {
                    this.hatchery.gainPokemonEgg(pokemon, index);
                    // Charge the player when we put a pokemon in the hatchery
                    helper.charge();
                    // Increment our hatched counter
                    GameHelper.incrementObservable(helper.hatched, 1);
                }
            }
        });
    }

    public toJSON(): Record<string, any>[] {
        return this.available().map(f => f.toJSON());
    }

    public fromJSON(json: Array<any>): void {
        if (!json || !json.length) {
            return;
        }

        HatcheryHelpers.list.forEach(f => {
            const data = json?.find(_f => _f.name == f.name);
            if (data) {
                f.fromJSON(data);
            }
        });
    }
}

// Note: Mostly Gender-neutral names used as the trainer sprite is (seeded) randomly generated, or check the sprite
HatcheryHelpers.add(new HatcheryHelper('Sam', new Amount(3000, GameConstants.Currency.money), 10, 0.2, new HatchRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Blake', new Amount(20000, GameConstants.Currency.money), 20, 0.4, new HatchRequirement(500)));
HatcheryHelpers.add(new HatcheryHelper('Jasmine', new Amount(50000, GameConstants.Currency.money), 35, 0.6, new UniqueItemOwnedRequirement('HatcheryHelperJasmine', 'purchase', 'Purchased in the Hoenn region.')));
HatcheryHelpers.add(new HatcheryHelper('Leslie', new Amount(1571751, GameConstants.Currency.money), 75, 2.5, new UniqueItemOwnedRequirement('HatcheryHelperLeslie', 'purchase', 'Obtain and redeem a code from the PokéClicker Discord server.')));
HatcheryHelpers.add(new HatcheryHelper('Parker', new Amount(3000, GameConstants.Currency.dungeonToken), 25, 0.5, new HatchRequirement(1000)));
HatcheryHelpers.add(new HatcheryHelper('Dakota', new Amount(10000, GameConstants.Currency.dungeonToken), 50, 1, new UniqueItemOwnedRequirement('HatcheryHelperDakota', 'purchase', 'Purchased in the Johto region.')));
HatcheryHelpers.add(new HatcheryHelper('Cameron', new Amount(100, GameConstants.Currency.farmPoint), 55, 2, new UniqueItemOwnedRequirement('HatcheryHelperCameron', 'purchase', 'Purchased in the Hoenn region.')));
HatcheryHelpers.add(new HatcheryHelper('Justice', new Amount(10, GameConstants.Currency.questPoint), 100, 2.5, new QuestRequirement(200)));
HatcheryHelpers.add(new HatcheryHelper('Carey', new Amount(20, GameConstants.Currency.questPoint), 150, 3, new UniqueItemOwnedRequirement('HatcheryHelperCarey', 'purchase', 'Purchased in the Johto region.')));
HatcheryHelpers.add(new HatcheryHelper('Aiden', new Amount(30, GameConstants.Currency.diamond), 50, 2, new UndergroundLayersMinedRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Kris', new Amount(60, GameConstants.Currency.diamond), 75, 2, new UniqueItemOwnedRequirement('HatcheryHelperKris', 'purchase', 'Purchased in the Kanto region.')));
HatcheryHelpers.add(new HatcheryHelper('Noel', new Amount(25, GameConstants.Currency.battlePoint), 200, 3.5, new UniqueItemOwnedRequirement('HatcheryHelperNoel', 'purchase', 'Purchased in the Hoenn region.')));
