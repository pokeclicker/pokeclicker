const HatcheryHelperSkills = [
    'energy',
    'efficiency',
    'accuracy',
    'cost',
];

const HatcheryHelperCalcHatchBonus = (hatched) => Math.min(50, Math.floor(Math.sqrt(hatched / 50) * 10) / 10);

const HatcheryHelperMinBonusMap: Record<number, number> = {};
// Generate our bonus amounts map
(() => {
    let bonus = -1;
    for (let hatched = 0; bonus < 50; hatched++) {
        const b = HatcheryHelperCalcHatchBonus(hatched);
        if (b > bonus) {
            HatcheryHelperMinBonusMap[b] = hatched;
            bonus = b;
        }
    }
})();


class HatcheryHelper {
    public trainerSprite = 0;
    public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public tooltip: KnockoutComputed<string>;
    public sortOption: KnockoutObservable<SortOptions> = ko.observable(SortOptions.id).extend({ numeric: 0 });
    public sortDirection: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public hatched: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public hatchBonus: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 1 });
    public stepEfficiency: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 1 });
    public attackEfficiency: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 1 });
    public prevBonus: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public nextBonus: KnockoutObservable<number> = ko.observable(1).extend({ numeric: 0 });
    // public level: number;
    // public experience: number;

    constructor(
        public name: string,
        public cost: Amount,
        public stepEfficiencyBase: number, // 1 - 200
        public attackEfficiencyBase: number,
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        SeededRand.seed(parseInt(this.name, 36));
        this.trainerSprite = SeededRand.intBetween(0, 118);

        this.tooltip = ko.pureComputed(() => `<strong>${this.name}</strong><br/>
            Cost: <img src="assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" width="20px">&nbsp;${(this.cost.amount).toLocaleString('en-US')}/hatch<br/>
            Step Efficiency: ${this.stepEfficiency()}%<br/>
            Attack Efficiency: ${this.attackEfficiency()}%<br/>
            Hatched: ${this.hatched().toLocaleString('en-US')}<br/>`
        );

        // Update our bonus values
        this.updateBonus();
        // Update our bonus values whenever our hatched amount changes
        this.hatched.subscribe((hatched) => {
            if (hatched >= this.nextBonus() || hatched <= this.prevBonus()) {
                this.updateBonus();
            }
        });
    }

    updateBonus(): void {
        this.hatchBonus(HatcheryHelperCalcHatchBonus(this.hatched()));
        this.stepEfficiency(this.stepEfficiencyBase + this.hatchBonus());
        this.attackEfficiency(this.attackEfficiencyBase + this.hatchBonus());
        this.prevBonus(HatcheryHelperMinBonusMap[this.hatchBonus()] || 0);
        this.nextBonus(HatcheryHelperMinBonusMap[((this.hatchBonus() * 10) + 1) / 10] || 1);
    }

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
        });
    }

    fire(): void {
        Notifier.notify({
            title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for the work.\nLet me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
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
            App.game.logbook.newLog(LogBookTypes.OTHER, `You ran out of ${this.currencyString()} to pay Hatchery Helper ${this.name}!`);
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
            const steps = Math.max(1, Math.round(amount * (helper.stepEfficiency() / 100)));

            // Add steps to the egg we are managing
            let egg = this.hatchery.eggList[index]();
            egg.addSteps(steps, multiplier, true);

            // Check if the egg is ready to hatch
            if (egg.canHatch()) {
                const hatched = egg.hatch(helper.attackEfficiency(), true);
                if (hatched) {
                    // Reset egg
                    this.hatchery.eggList[index](new Egg());
                    egg = this.hatchery.eggList[index]();
                }
            }

            // Check if egg slot empty
            if (egg.isNone()) {
                // Get the currently selected region
                const currentRegion = +Settings.getSetting('breedingRegionalAttackDebuffSetting').value;

                // Check if there's a pokemon we can chuck into an egg
                const pokemon = [...App.game.party.caughtPokemon]
                    .sort(PartyController.compareBy(helper.sortOption(), helper.sortDirection(), currentRegion))
                    .find(p => BreedingController.visible(p)());
                if (pokemon) {
                    this.hatchery.gainPokemonEgg(pokemon, true);
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
HatcheryHelpers.add(new HatcheryHelper('Sam', new Amount(1000, GameConstants.Currency.money), 10, 10, new HatchRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Blake', new Amount(10000, GameConstants.Currency.money), 10, 20, new HatchRequirement(500)));
HatcheryHelpers.add(new HatcheryHelper('Jasmine', new Amount(50000, GameConstants.Currency.money), 15, 50, new ItemOwnedRequirement('HatcheryHelperJasmine')));
HatcheryHelpers.add(new HatcheryHelper('Parker', new Amount(1000, GameConstants.Currency.dungeonToken), 15, 25, new HatchRequirement(1000)));
HatcheryHelpers.add(new HatcheryHelper('Dakota', new Amount(10000, GameConstants.Currency.dungeonToken), 50, 50, new ItemOwnedRequirement('HatcheryHelperDakota')));
HatcheryHelpers.add(new HatcheryHelper('Cameron', new Amount(75, GameConstants.Currency.farmPoint), 75, 75, new ItemOwnedRequirement('HatcheryHelperCameron')));
HatcheryHelpers.add(new HatcheryHelper('Justice', new Amount(10, GameConstants.Currency.questPoint), 100, 50, new QuestRequirement(200)));
HatcheryHelpers.add(new HatcheryHelper('Carey', new Amount(20, GameConstants.Currency.questPoint), 50, 125, new ItemOwnedRequirement('HatcheryHelperCarey')));
HatcheryHelpers.add(new HatcheryHelper('Aiden', new Amount(5, GameConstants.Currency.diamond), 100, 100, new UndergroundLayersMinedRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Kris', new Amount(10, GameConstants.Currency.diamond), 150, 100, new ItemOwnedRequirement('HatcheryHelperKris')));
HatcheryHelpers.add(new HatcheryHelper('Noel', new Amount(25, GameConstants.Currency.battlePoint), 100, 200, new ItemOwnedRequirement('HatcheryHelperNoel')));
