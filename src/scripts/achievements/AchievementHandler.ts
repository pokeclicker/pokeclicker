/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/achievements/Achievement.d.ts" />

class AchievementHandler {
    public static achievementList: Achievement[] = [];
    public static navigateIndex: KnockoutObservable<number> = ko.observable(0);
    public static maxBonus: KnockoutObservableArray<number> = ko.observableArray([]);
    public static achievementListFiltered: KnockoutObservableArray<Achievement> = ko.observableArray([]);
    public static numberOfTabs: KnockoutObservable<number> = ko.observable(0);

    public static setNavigateIndex(index: number): void {
        if (index < 0 || index >= AchievementHandler.numberOfTabs()) {
            return;
        }
        AchievementHandler.navigateIndex(index);
        Settings.setSettingByName('achievementsPage', index);
    }

    public static navigateRight() {
        this.setNavigateIndex(AchievementHandler.navigateIndex() + 1);
    }

    public static navigateLeft() {
        this.setNavigateIndex(AchievementHandler.navigateIndex() - 1);
    }

    public static isNavigateDirectionDisabled(navigateBackward: boolean): boolean {
        return navigateBackward
            ? this.navigateIndex() === 0
            : this.navigateIndex() + 1 === this.numberOfTabs();
    }

    public static calculateNumberOfTabs() {
        this.numberOfTabs(Math.max(1, Math.ceil(this.achievementListFiltered().length / 10)));
    }

    public static filter = {
        status: ko.observable(-2).extend({ numeric: 0 }),
        type:   ko.observable(-2).extend({ numeric: 0 }),
        region: ko.observable(-2).extend({ numeric: 0 }),
    }

    public static getAchievementListWithIndex() {
        return this.getAchievementList().slice(this.navigateIndex() * 10, (this.navigateIndex() * 10) + 10);
    }

    public static getAchievementList() {
        const achievementSortValue = Settings.getSetting('achievementSort').observableValue();

        // Checks if the user has selected the default sorting option
        if (achievementSortValue === AchievementSortOptions.default) {
            // ... in this case, returns the filtered list without sorting.
            return this.achievementListFiltered();
        }

        // ... otherwise, returns a copy of the filtered list sorted by provided property.
        const achievementSortedList = [...this.achievementListFiltered()];
        return achievementSortedList.sort(AchievementHandler.compareBy(
            achievementSortValue, Settings.getSetting('achievementSortDirection').observableValue()
        ));
    }

    public static filterAchievementList(retainPage = false) {
        this.achievementListFiltered(this.achievementList.filter((a) => (
            a.region <= player.highestRegion() &&
            a.achievable() &&
            (this.filter.status() == -2 || a.unlocked === !!this.filter.status()) &&
            (this.filter.type()   == -2 || a.property.achievementType === this.filter.type()) &&
            (this.filter.region() == -2 || a.region === this.filter.region())
        )));
        this.calculateNumberOfTabs();
        if (!retainPage) {
            this.setNavigateIndex(0);
        } else if (this.getAchievementListWithIndex().length === 0 && this.navigateIndex() > 0) {
            this.setNavigateIndex(this.numberOfTabs() - 1);
        }
    }

    public static compareBy(option: AchievementSortOptions, direction: boolean): (a: Achievement, b: Achievement) => number {
        return function (a, b) {
            let res, dir = (direction) ? -1 : 1;
            const config = AchievementSortOptionConfigs[option];

            const aValue = config.getValue(a);
            const bValue = config.getValue(b);

            if (config.invert) {
                dir *= -1;
            }

            //Compare by provided property
            if (aValue == bValue) {
                //If they are equal according to provided property, sort by name
                return a.name.localeCompare(b.name);
            } else if (aValue < bValue) {
                res = -1;
            } else if (aValue > bValue) {
                res = 1;
            } else {
                res = 0;
            }

            return res * dir;
        };
    }

    public static preCheckAchievements() {
        // Check if our achievements are completed, we don't want to re-notify if already done
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            AchievementHandler.achievementList[i].unlocked = AchievementHandler.achievementList[i].isCompleted();
        }
    }

    public static checkAchievements() {
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            if (!AchievementHandler.achievementList[i].unlocked) {
                AchievementHandler.achievementList[i].check();
            }
        }
    }

    public static addAchievement(name: string, description: string, property: AchievementRequirement, bonus: number, region = GameConstants.Region.none, achievableFunction: () => boolean | null = null) {
        AchievementHandler.achievementList.push(new Achievement(name, description, property, bonus, region, achievableFunction));
    }

    public static calculateBonus(): void {
        AchievementHandler.achievementList.forEach((achievement) => {
            if (!achievement.achievable()) {
                return 0;
            }
            const max = AchievementHandler.maxBonus()[achievement.region];
            achievement.bonus = (achievement.bonusWeight / max) * 100;
        });
    }

    public static calculateMaxBonus() {
        GameHelper.enumNumbers(GameConstants.Region).forEach(region => {
            AchievementHandler.maxBonus()[region] = AchievementHandler.achievementList.filter(a => a.region == region && a.achievable()).reduce((sum, a) => sum + a.bonusWeight, 0);
        });
        AchievementHandler.calculateBonus();
    }

    public static bonusUnlocked(): number {
        let sum = 0;
        GameHelper.enumNumbers(GameConstants.Region).forEach(region => {
            sum += AchievementHandler.achievementList.filter(a => a.region == region && a.isCompleted()).reduce((sum, a) => sum + a.bonusWeight, 0);
        });
        return sum;
    }

    public static achievementBonus(): number {
        let sum = 0;
        GameHelper.enumNumbers(GameConstants.Region).forEach(region => {
            const total = AchievementHandler.achievementList.filter(a => a.region == region && a.isCompleted()).reduce((sum, a) => sum + a.bonusWeight, 0) / AchievementHandler.maxBonus()[region];
            if (!isNaN(total)) {
                sum += total;
            }
        });
        return sum;
    }

    public static achievementBonusPercent(): string {
        return `${(100 * AchievementHandler.achievementBonus()).toFixed(2)}%`;
    }

    public static findByName(name: string): Achievement {
        return AchievementHandler.achievementList.find((achievement) => achievement.name === name && achievement.achievable());
    }

    public static initialize(multiplier: Multiplier, challenges: Challenges) {

        /*
         * GENERAL
         */
        AchievementHandler.addAchievement('My First Hundo', 'Obtain 100 Pokédollars', new MoneyRequirement(100), 0.05);
        AchievementHandler.addAchievement('I Should Buy a Poké Mart', 'Obtain 1,000 Pokédollars', new MoneyRequirement(1000), 0.10);
        AchievementHandler.addAchievement('A Small Fortune', 'Obtain 10,000 Pokédollars', new MoneyRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Annual Wage', 'Obtain 100,000 Pokédollars', new MoneyRequirement(100000), 0.20);
        AchievementHandler.addAchievement('Pfft, I Don\'t Need a Bike Voucher', 'Obtain 1,000,000 Pokédollars', new MoneyRequirement(1000000), 0.25);
        AchievementHandler.addAchievement('A billion Poképennies', 'Obtain 10,000,000 Pokédollars', new MoneyRequirement(10000000), 0.5);

        AchievementHandler.addAchievement('Dungeon Time', 'Obtain 100 Dungeon Tokens', new TokenRequirement(100), 0.05);
        AchievementHandler.addAchievement('Token Collector', 'Obtain 1,000 Dungeon Tokens', new TokenRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Dungeon Grinder', 'Obtain 10,000 Dungeon Tokens', new TokenRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Dungeon Master', 'Obtain 100,000 Dungeon Tokens', new TokenRequirement(100000), 0.20);
        AchievementHandler.addAchievement('Dungeon Legend', 'Obtain 1,000,000 Dungeon Tokens', new TokenRequirement(1000000), 0.25);

        AchievementHandler.addAchievement('Basic Trainer', 'Have 100 Attack', new AttackRequirement(100), 0.05);
        AchievementHandler.addAchievement('Improving', 'Have 1,000 Attack', new AttackRequirement(1000), 0.10);
        AchievementHandler.addAchievement('An Unrelenting Force', 'Have 5,000 Attack', new AttackRequirement(5000), 0.15);
        AchievementHandler.addAchievement('FUS DOH RAH', 'Have 10,000 Attack', new AttackRequirement(10000), 0.20);
        AchievementHandler.addAchievement('Ok, I have enough attack already...', 'Have 25,000 Attack', new AttackRequirement(25000), 0.25);
        AchievementHandler.addAchievement('Silver attack button!', 'Have 100,000 Attack', new AttackRequirement(100000), 0.30);
        AchievementHandler.addAchievement('Pesky roamings, I need to oneshot routes for them...', 'Have 250,000 Attack', new AttackRequirement(250000), 0.35);
        AchievementHandler.addAchievement('You pressed F12 by any chance?', 'Have 500,000 Attack', new AttackRequirement(500000), 0.40);
        AchievementHandler.addAchievement('Left Left Right Right A B A B - Hey, 1 million!', 'Have 1,000,000 Attack', new AttackRequirement(1000000), 0.40);

        AchievementHandler.addAchievement('Bling', 'Obtain 100 Diamonds', new DiamondRequirement(100), 0.05);
        AchievementHandler.addAchievement('Bling x10!', 'Obtain 1,000 Diamonds', new DiamondRequirement(1000), 0.15);
        AchievementHandler.addAchievement('If you like it, you should\'ve put a ring on it.', 'Obtain 10,000 Diamonds', new DiamondRequirement(10000), 0.25);

        AchievementHandler.addAchievement('Is my thumb green yet?', 'Dig up 1 item', new UndergroundItemsFoundRequirement(1), 0.01);
        AchievementHandler.addAchievement('My shovel is starting to crack', 'Dig up 10 items', new UndergroundItemsFoundRequirement(10), 0.02);
        AchievementHandler.addAchievement('Why can\'t I make a diamond shovel?', 'Dig up 100 items', new UndergroundItemsFoundRequirement(100), 0.08);
        AchievementHandler.addAchievement('This is definitely not Minecraft', 'Dig up 1,000 items', new UndergroundItemsFoundRequirement(1000), 0.1);
        AchievementHandler.addAchievement('I wonder how much is down there...', 'Dig up 10,000 items', new UndergroundItemsFoundRequirement(10000), 0.4);

        AchievementHandler.addAchievement('The earth is like onions', 'Dig deeper 1 time', new UndergroundLayersMinedRequirement(1), 0.01);
        AchievementHandler.addAchievement('This takes foreverrrrrrr', 'Dig deeper 10 times', new UndergroundLayersMinedRequirement(10), 0.03);
        AchievementHandler.addAchievement('DigDug ain\'t got nothin on me', 'Dig deeper 100 times', new UndergroundLayersMinedRequirement(100), 0.1);
        AchievementHandler.addAchievement('Both my thumbs are green! This can\'t be healthy', 'Dig deeper 1,000 times', new UndergroundLayersMinedRequirement(1000), 0.3);

        AchievementHandler.addAchievement('Is that how I use this?', 'Level 1 Oak Item to the maximum level', new MaxLevelOakItemRequirement(1), 0.05, GameConstants.Region.none, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('I\'ve got my hands full with all of these', 'Level 3 Oak Items to the maximum level', new MaxLevelOakItemRequirement(3), 0.1, GameConstants.Region.none, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('Professor Oak is the best!', 'Level 8 Oak Items to the maximum level', new MaxLevelOakItemRequirement(8), 0.14, GameConstants.Region.none, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('Prepared for anything!', 'Level 11 Oak Items to the maximum level', new MaxLevelOakItemRequirement(11), 0.18, GameConstants.Region.none, () => !challenges.list.disableOakItems.active() && challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Prepared for anything!', 'Level 12 Oak Items to the maximum level', new MaxLevelOakItemRequirement(12), 0.18, GameConstants.Region.none, () => !challenges.list.disableOakItems.active() && !challenges.list.disableClickAttack.active());

        AchievementHandler.addAchievement('First Team', 'Capture 100 Pokémon', new CapturedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Filling the PC', 'Capture 1,000 Pokémon', new CapturedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Pokémon Army', 'Capture 10,000 Pokémon', new CapturedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Pokémon Collector', 'Capture 100,000 Pokémon', new CapturedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('You get a Pokémon, you get a Pokémon, everyone gets a Pokémon!', 'Capture 1,000,000 Pokémon', new CapturedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement('A Long Road Ahead', 'Defeat 100 Pokémon', new DefeatedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Highway to Pallet Town', 'Defeat 1,000 Pokémon', new DefeatedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Overleveled', 'Defeat 10,000 Pokémon', new DefeatedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('The Cake is a Lie, but the Grind is real', 'Defeat 100,000 Pokémon', new DefeatedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('Are there any left?', 'Defeat 1,000,000 Pokémon', new DefeatedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement('Startin\' Out', 'Capture your first Pokémon', new CaughtPokemonRequirement(1), 0.01);
        AchievementHandler.addAchievement('Better Than Season 1 Ash', 'Capture 15 unique Pokémon', new CaughtPokemonRequirement(15), 0.05);
        AchievementHandler.addAchievement('Wonderful! Do you like to collect things?', 'Capture 50 unique Pokémon', new CaughtPokemonRequirement(50), 0.10);
        AchievementHandler.addAchievement('Surpassing Ash', 'Capture 100 unique Pokémon', new CaughtPokemonRequirement(100), 0.20);

        AchievementHandler.addAchievement('I\'d rather be shiny', 'Capture your first Shiny', new ShinyPokemonRequirement(1), 0.03);
        AchievementHandler.addAchievement('These Pokémon must be sick', 'Capture 10 unique Shinies', new ShinyPokemonRequirement(10), 0.06);
        AchievementHandler.addAchievement('Why Am I Doing This?', 'Capture 20 unique Shinies', new ShinyPokemonRequirement(20), 0.09);
        AchievementHandler.addAchievement('Why Am I Still Doing This?!', 'Capture 30 unique Shinies', new ShinyPokemonRequirement(30), 0.12);
        AchievementHandler.addAchievement('Okay fine, I can do a few more', 'Capture 40 unique Shinies', new ShinyPokemonRequirement(40), 0.15);
        AchievementHandler.addAchievement('Where Did All The Shiny Pokémon Go?', 'Capture 50 unique Shinies', new ShinyPokemonRequirement(50), 0.30);
        AchievementHandler.addAchievement('Nvm, found some more', 'Capture 75 unique Shinies', new ShinyPokemonRequirement(75), 0.45);
        AchievementHandler.addAchievement('Just keep swimming just keep swimming -- oooo shiny!', 'Capture 100 unique Shinies', new ShinyPokemonRequirement(100), 0.60);
        AchievementHandler.addAchievement('I don\'t know if I can handle the next batch of shinies.', 'Capture 151 unique Shinies!', new ShinyPokemonRequirement(151), 1.50);

        AchievementHandler.addAchievement('Pokémon Nursery', 'Hatch 1 egg', new HatchRequirement(1), 0.01);
        AchievementHandler.addAchievement('A Lot of Running', 'Hatch 10 eggs', new HatchRequirement(10), 0.04);
        AchievementHandler.addAchievement('Marathon Runner', 'Hatch 100 eggs', new HatchRequirement(100), 0.15);
        AchievementHandler.addAchievement('Egg Factory', 'Hatch 1,000 eggs', new HatchRequirement(1000), 0.3);
        AchievementHandler.addAchievement('Offical Easter Bunny', 'Hatch 10,000 eggs', new HatchRequirement(10000), 0.4);

        AchievementHandler.addAchievement('Why is my Voltorb Upside Down?', 'Purchase your first Poké Ball', new PokeballRequirement(1, GameConstants.Pokeball.Pokeball), 0.01);
        AchievementHandler.addAchievement('Starting a Collection', 'Purchase 10 Poké Balls', new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.03);
        AchievementHandler.addAchievement('Stocking Up', 'Purchase 100 Poké Balls', new PokeballRequirement(100, GameConstants.Pokeball.Pokeball), 0.05);
        AchievementHandler.addAchievement('Fully Stocked', 'Purchase 1,000 Poké Balls', new PokeballRequirement(1000, GameConstants.Pokeball.Pokeball), 0.10);
        AchievementHandler.addAchievement('Maybe just a few more for the bunker', 'Purchase 10,000 Poké Balls', new PokeballRequirement(10000, GameConstants.Pokeball.Pokeball), 0.15);
        AchievementHandler.addAchievement('Doomsday Bunker stocked with Poké Balls!', 'Purchase 100,000 Poké Balls', new PokeballRequirement(100000, GameConstants.Pokeball.Pokeball), 0.20);

        AchievementHandler.addAchievement('ooooo A blue one!', 'Purchase your first Great Ball', new PokeballRequirement(1, GameConstants.Pokeball.Greatball), 0.03);
        AchievementHandler.addAchievement('I got a few Shiny Voltorb! Oh, wait...', 'Obtain 10 Great Balls', new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.05);
        AchievementHandler.addAchievement('Now Shinies won\'t run away so easily!', 'Obtain 100 Great Balls', new PokeballRequirement(100, GameConstants.Pokeball.Greatball), 0.10);
        AchievementHandler.addAchievement('Regular Poké Balls just aren\'t what they used to be', 'Obtain 1,000 Great Balls', new PokeballRequirement(1000, GameConstants.Pokeball.Greatball), 0.15);
        AchievementHandler.addAchievement('A Great Investment', 'Obtain 10,000 Great Balls', new PokeballRequirement(10000, GameConstants.Pokeball.Greatball), 0.20);
        AchievementHandler.addAchievement('The Greatest Collection of all time', 'Obtain 100,000 Great Balls', new PokeballRequirement(100000, GameConstants.Pokeball.Greatball), 0.30);

        AchievementHandler.addAchievement('They made one even better?', 'Obtain your first Ultra Ball', new PokeballRequirement(1, GameConstants.Pokeball.Ultraball), 0.05);
        AchievementHandler.addAchievement('Let\'s see how high the Catch Rate becomes', 'Obtain 10 Ultra Balls', new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.10);
        AchievementHandler.addAchievement('This should be enough for those elusive roamers...', 'Obtain 100 Ultra Balls', new PokeballRequirement(100, GameConstants.Pokeball.Ultraball), 0.15);
        AchievementHandler.addAchievement('They don\'t work on Ultra Beasts? That\'s false advertising!', 'Obtain 1,000 Ultra Balls', new PokeballRequirement(1000, GameConstants.Pokeball.Ultraball), 0.20);
        AchievementHandler.addAchievement('I don\'t think I\'ll ever be able to go back to the commoner\'s Great Ball', 'Obtain 10,000 Ultra Balls', new PokeballRequirement(10000, GameConstants.Pokeball.Ultraball), 0.30);
        AchievementHandler.addAchievement('Just making sure no rare Pokémon flees', 'Obtain 100,000 Ultra Balls', new PokeballRequirement(100000, GameConstants.Pokeball.Ultraball), 0.40);

        AchievementHandler.addAchievement('The ultimate catching device', 'Obtain your first Master Ball', new PokeballRequirement(1, GameConstants.Pokeball.Masterball), 0.20);
        AchievementHandler.addAchievement('Can a human handle this much power?', 'Obtain 10 Master Balls', new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.30);
        AchievementHandler.addAchievement('No Pokémon in the world can run away from me now!', 'Obtain 100 Master Balls', new PokeballRequirement(100, GameConstants.Pokeball.Masterball), 0.40);

        AchievementHandler.addAchievement('A Few Clicks In', 'Click 10 times', new ClickRequirement(10, 1), 0.02, GameConstants.Region.none, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Clicking Pro', 'Click 100 times', new ClickRequirement(100, 1), 0.05, GameConstants.Region.none, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Ultra Clicker', 'Click 1,000 times', new ClickRequirement(1000, 1), 0.10, GameConstants.Region.none, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Need a new mouse yet?', 'Click 10,000 times', new ClickRequirement(10000, 1), 0.25, GameConstants.Region.none, () => !challenges.list.disableClickAttack.active());

        AchievementHandler.addAchievement('My new dirty hobby', 'Unlock 3 Plots in the Farm', new FarmPlotsUnlockedRequirement(3), 0.05);
        AchievementHandler.addAchievement('Allotment gardener', 'Unlock 9 Plots in the Farm', new FarmPlotsUnlockedRequirement(9), 0.15);
        AchievementHandler.addAchievement('Horticulture', 'Unlock 25 Plots in the Farm', new FarmPlotsUnlockedRequirement(25), 0.25);

        AchievementHandler.addAchievement('Who planted these here?', 'Unlock 8 Berries', new BerriesUnlockedRequirement(8), 0.1);
        AchievementHandler.addAchievement('Farmer in training', 'Unlock 18 Berries', new BerriesUnlockedRequirement(18), 0.2);
        AchievementHandler.addAchievement('Farming apprentice', 'Unlock 36 Berries', new BerriesUnlockedRequirement(36), 0.3);
        AchievementHandler.addAchievement('Master Farmer', 'Unlock 67 Berries', new BerriesUnlockedRequirement(67), 0.4);

        AchievementHandler.addAchievement('Can you do this for me?', 'Complete 1 quest', new QuestRequirement(1), 0.05);
        AchievementHandler.addAchievement('One more favor', 'Complete 10 quests', new QuestRequirement(10), 0.15);
        AchievementHandler.addAchievement('YES MAN!', 'Complete 100 quests', new QuestRequirement(100), 0.25);
        AchievementHandler.addAchievement('I just love green coins', 'Complete 1,000 quests', new QuestRequirement(1000), 0.4);

        AchievementHandler.addAchievement('Fighting novice', 'Complete stage 100 in Battle Frontier', new BattleFrontierHighestStageRequirement(100), 0.05);
        AchievementHandler.addAchievement('Competent fighter', 'Complete stage 250 in Battle Frontier', new BattleFrontierHighestStageRequirement(250), 0.15);
        AchievementHandler.addAchievement('Unstoppable fighting machine', 'Complete stage 500 in Battle Frontier', new BattleFrontierHighestStageRequirement(500), 0.25);
        AchievementHandler.addAchievement('Living Legend', 'Complete stage 1,000 in Battle Frontier', new BattleFrontierHighestStageRequirement(1000), 0.4);

        AchievementHandler.addAchievement('Keep on fighting', 'Complete 500 total stages in Battle Frontier', new BattleFrontierTotalStageRequirement(500), 0.05);
        AchievementHandler.addAchievement('Uphill battle', 'Complete 1,000 total stages in Battle Frontier', new BattleFrontierTotalStageRequirement(1000), 0.15);
        AchievementHandler.addAchievement('Don\'t stop trying', 'Complete 2,500 total stages in Battle Frontier', new BattleFrontierTotalStageRequirement(2500), 0.25);
        AchievementHandler.addAchievement('King of the hill', 'Complete 5,000 total stages in Battle Frontier', new BattleFrontierTotalStageRequirement(5000), 0.4);

        AchievementHandler.addAchievement('Let\'s try this out', 'Obtain your first Protein', new ProteinObtainRequirement(1), 0.01);
        AchievementHandler.addAchievement('Pre-workout supplements', 'Obtain five Proteins', new ProteinObtainRequirement(5), 0.02);
        AchievementHandler.addAchievement('Well-stocked medicine cabinet', 'Obtain 10 Proteins', new ProteinObtainRequirement(10), 0.04);
        AchievementHandler.addAchievement('I can\'t hold all these Proteins!', 'Obtain 50 Proteins', new ProteinObtainRequirement(50), 0.08);
        AchievementHandler.addAchievement('Essential nutrients', 'Obtain 100 Proteins', new ProteinObtainRequirement(100), 0.10);
        AchievementHandler.addAchievement('Putting the \'bulk\' in bulk-buy', 'Obtain 500 Proteins', new ProteinObtainRequirement(500), 0.15);
        AchievementHandler.addAchievement('Protein stockpile', 'Obtain 1,000 Proteins', new ProteinObtainRequirement(1000), 0.20);
        AchievementHandler.addAchievement('Fish, eggs, nuts, and cheese', 'Obtain 5,000 Proteins', new ProteinObtainRequirement(5000), 0.35);
        AchievementHandler.addAchievement('A literal mountain of muscle', 'Obtain 10,000 Proteins', new ProteinObtainRequirement(10000), 0.50);

        /*
         * REGIONAL
         */
        GameHelper.enumNumbers(GameConstants.Region).filter(r => r != GameConstants.Region.none && r <= GameConstants.MAX_AVAILABLE_REGION).forEach(region => {
            // Routes
            Routes.getRoutesByRegion(region).forEach(route => {
                const routeName = Routes.getName(route.number, region, true);
                AchievementHandler.addAchievement(`${route.routeName} traveler`, `Defeat 100 Pokémon on ${routeName}`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[0], region, route.number), 1, region);
                AchievementHandler.addAchievement(`${route.routeName} explorer`, `Defeat 1,000 Pokémon on ${routeName}`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[1], region, route.number), 2, region);
                AchievementHandler.addAchievement(`${route.routeName} conqueror`, `Defeat 10,000 Pokémon on ${routeName}`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[2], region, route.number), 3, region);
            });
            // Gyms
            GameConstants.RegionGyms[region]?.forEach(gym => {
                const gymTitle: string = gym.includes('Elite') || gym.includes('Champion') ? gym : `${gym} Gym`;
                if (GymList[gym]?.flags?.achievement) {
                    AchievementHandler.addAchievement(`${gym} Gym regular`, `Clear ${gymTitle} 10 times`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[0], GameConstants.getGymIndex(gym)), 1, region);
                    AchievementHandler.addAchievement(`${gym} Gym ruler`, `Clear ${gymTitle} 100 times`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[1], GameConstants.getGymIndex(gym)), 2, region);
                    AchievementHandler.addAchievement(`${gym} Gym owner`, `Clear ${gymTitle} 1,000 times`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[2], GameConstants.getGymIndex(gym)), 3, region);
                }
            });
            // Dungeons
            GameConstants.RegionDungeons[region]?.forEach(dungeon => {
                AchievementHandler.addAchievement(`${dungeon} explorer`, `Clear ${dungeon} 10 times`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[0], GameConstants.getDungeonIndex(dungeon)), 0.8, region);
                AchievementHandler.addAchievement(`${dungeon} expert`, `Clear ${dungeon} 100 times`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[1], GameConstants.getDungeonIndex(dungeon)), 1.2, region);
                AchievementHandler.addAchievement(`${dungeon} hermit`, `Clear ${dungeon} 250 times`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[2], GameConstants.getDungeonIndex(dungeon)), 1.6, region);
                AchievementHandler.addAchievement(`${dungeon} dweller`, `Clear ${dungeon} 500 times`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[3], GameConstants.getDungeonIndex(dungeon)), 2.4, region);
            });
            // Unique Pokémon
            const amt10 = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region) * .1);
            const amt50 = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region) * .5);
            const amtAll = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region));
            // Caught unique pokemon
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Trainer`, `Catch ${amt10} unique Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region`, new CaughtUniquePokemonsByRegionRequirement(region, amt10), 2, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Ace`, `Catch ${amt50} unique Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region`, new CaughtUniquePokemonsByRegionRequirement(region, amt50), 4, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Master`, `Complete the ${GameConstants.camelCaseToString(GameConstants.Region[region])} Pokédex!`, new CaughtUniquePokemonsByRegionRequirement(region, amtAll), 6, region);
            // Caught unique shiny pokemon
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Trainer`, `Catch ${amt10} unique Shiny Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amt10), 3, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Ace`, `Catch ${amt50} unique Shiny Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amt50), 6, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Master`, `Complete the ${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Pokédex!`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amtAll), 9, region);
        });

        // load filters, filter the list & calculate number of tabs
        this.load();
        this.filterAchievementList(true);
        this.calculateNumberOfTabs();

        // subscribe to filters so that when the player changes a filter it automatically refilters the list
        Object.keys(this.filter).forEach(e => (<KnockoutObservable<any>> this.filter[e]).subscribe(() => this.filterAchievementList()));

        multiplier.addBonus('exp', () => 1 + this.achievementBonus());
        multiplier.addBonus('money', () => 1 + this.achievementBonus());
        multiplier.addBonus('dungeonToken', () => 1 + this.achievementBonus());
    }

    static load() {
        AchievementHandler.calculateMaxBonus();
        this.achievementListFiltered(this.achievementList.filter(a => a.region <= player.highestRegion() && a.achievable()));
        AchievementHandler.navigateIndex(Settings.getSetting('achievementsPage').value);
        AchievementHandler.filter.status(Settings.getSetting('achievementsStatus').value);
        AchievementHandler.filter.type(Settings.getSetting('achievementsType').value);
        AchievementHandler.filter.region(Settings.getSetting('achievementsRegion').value);
        // Cycle the pages to make sure they are upto date
        AchievementHandler.navigateRight();
        setTimeout(() => {
            AchievementHandler.navigateLeft();
            AchievementHandler.filterAchievementList();
        }, 1);
    }
}
