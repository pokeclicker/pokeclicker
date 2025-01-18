/// <reference path="../../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/achievements/Achievement.d.ts" />

class AchievementHandler {
    public static achievementList: Achievement[] = [];
    public static navigateIndex: KnockoutObservable<number> = ko.observable(0);
    public static achievementListFiltered: KnockoutObservableArray<Achievement> = ko.observableArray([]);
    public static numberOfTabs: KnockoutObservable<number> = ko.observable(0);
    public static _cachedAchievementBonus: KnockoutObservable<number> = ko.observable(0);

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
        category: ko.observable('all'),
    }

    public static getAchievementListWithIndex() {
        return this.achievementSortedList().slice(this.navigateIndex() * 10, (this.navigateIndex() * 10) + 10);
    }

    public static cachedSortedList: Achievement[];
    public static achievementSortedList = ko.pureComputed(() => {
        const achievementSortValue = Settings.getSetting('achievementSort').observableValue();

        if (DisplayObservables.modalState.achievementsModal !== 'show') {
            return AchievementHandler.cachedSortedList || AchievementHandler.achievementListFiltered();
        }

        // Checks if the user has selected the default sorting option
        if (achievementSortValue === AchievementSortOptions.default) {
            // ... in this case, returns the filtered list without sorting.
            return AchievementHandler.achievementListFiltered();
        }

        // ... otherwise, returns a copy of the filtered list sorted by provided property.
        const achievementSortedList = [...AchievementHandler.achievementListFiltered()];
        achievementSortedList.sort(AchievementHandler.compareBy(
            achievementSortValue, Settings.getSetting('achievementSortDirection').observableValue()
        ));
        AchievementHandler.cachedSortedList = achievementSortedList;
        return achievementSortedList;
    }).extend({ rateLimit: 100 });

    public static filterAchievementList(retainPage = false) {
        this.achievementListFiltered(this.achievementList.filter((a) => (
            a.category.isUnlocked() &&
            a.achievable() &&
            (this.filter.status() == -2 || a.unlocked() === !!this.filter.status()) &&
            (this.filter.type()   == -2 || a.property.achievementType === this.filter.type()) &&
            (this.filter.category() == 'all' || a.category.name === this.filter.category())
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
        AchievementHandler.filterAchievementList();
        // Check if our achievements are completed, we don't want to re-notify if already done
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            AchievementHandler.achievementList[i].unlocked(AchievementHandler.achievementList[i].isCompleted());
        }
        AchievementHandler.updateAchievementBonus();
    }

    public static checkAchievements() {
        let updateBonus = false;
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            if (!AchievementHandler.achievementList[i].unlocked()) {
                const unlocked = AchievementHandler.achievementList[i].check();
                if (unlocked) {
                    updateBonus = true;
                }
            }
        }
        if (updateBonus) {
            AchievementHandler.updateAchievementBonus();
        }
    }

    public static toJSON(): string[] {
        // Saves only achievements which have already been completed but currently don't have their requirements met
        const storage = AchievementHandler.achievementList.filter(a => a.unlocked() && !a.property.isCompleted()).map(a => a.name);
        return storage;
    }

    public static fromJSON(unlockedAchievements: string[]) {
        unlockedAchievements?.forEach(achName => {
            AchievementHandler.findByName(achName)?.unlocked(true);
        });
    }

    public static addAchievement(name: string, description: string, property: AchievementRequirement, bonus: number, category: GameConstants.Region | GameConstants.ExtraAchievementCategories = GameConstants.ExtraAchievementCategories.global, achievableFunction: () => boolean | null = null) {
        let categoryObj : AchievementCategory;
        // ExtraAchievementCategory always starts at finals index
        if (category >= GameConstants.Region.final) {
            categoryObj = AchievementHandler.getAchievementCategoryByExtraCategory(category as GameConstants.ExtraAchievementCategories);
        } else {
            categoryObj = AchievementHandler.getAchievementCategoryByRegion(category as GameConstants.Region);
        }
        categoryObj.totalWeight += bonus;
        AchievementHandler.achievementList.push(new Achievement(name, description, property, bonus, categoryObj, achievableFunction));
    }

    public static calculateBonus(): void {
        AchievementHandler.achievementList.forEach((achievement) => {
            if (!achievement.achievable()) {
                return 0;
            }
            achievement.bonus = (achievement.bonusWeight / achievement.category.totalWeight) * achievement.category.achievementBonus;
        });
    }

    public static calculateMaxBonus(): void {
        AchievementHandler.getAchievementCategories().forEach(category => {
            category.totalWeight = AchievementHandler.achievementList.filter(a => a.category == category && a.achievable()).reduce((sum, a) => sum + a.bonusWeight, 0);
        });
        AchievementHandler.calculateBonus();
        AchievementHandler.updateAchievementBonus();
    }

    public static achievementBonus(): number {
        return AchievementHandler._cachedAchievementBonus();
    }

    public static updateAchievementBonus() {
        let sum = 0;
        AchievementHandler.getAchievementCategories().forEach(category => {
            const total = AchievementHandler.achievementList.filter(a => {
                return a.category == category && a.isCompleted();
            }).reduce((sum, a) => sum + a.bonusWeight, 0) / category.totalWeight * category.achievementBonus / 100;
            if (!isNaN(total)) {
                sum += total;
            }
        });
        AchievementHandler._cachedAchievementBonus(sum);
    }

    public static achievementBonusPercent(): string {
        return `${AchievementHandler.achievementBonus().toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    public static findByName(name: string): Achievement {
        return AchievementHandler.achievementList.find((achievement) => achievement.name === name && achievement.achievable());
    }

    private static _achievementCategories : AchievementCategory[]
    public static getAchievementCategories() : AchievementCategory[] {
        if (AchievementHandler._achievementCategories) {
            return AchievementHandler._achievementCategories;
        }
        const categories = GameHelper.enumStrings(GameConstants.Region).filter(r => r != 'none' && r != 'final').map(r => new AchievementCategory(r, 100, () => player.highestRegion() >= GameConstants.Region[r]));
        categories.push(new AchievementCategory(GameConstants.ExtraAchievementCategories[GameConstants.ExtraAchievementCategories.global], 150, () => true));
        categories.push(new AchievementCategory(GameConstants.ExtraAchievementCategories[GameConstants.ExtraAchievementCategories.sevii], 50, () => SubRegions.isSubRegionUnlocked(GameConstants.Region.kanto, GameConstants.KantoSubRegions.Sevii123)));
        categories.push(new AchievementCategory(GameConstants.ExtraAchievementCategories[GameConstants.ExtraAchievementCategories.orre], 75, () => SubRegions.isSubRegionUnlocked(GameConstants.Region.hoenn, GameConstants.HoennSubRegions.Orre)));
        categories.push(new AchievementCategory(GameConstants.ExtraAchievementCategories[GameConstants.ExtraAchievementCategories.magikarpJump], 25, () => SubRegions.isSubRegionUnlocked(GameConstants.Region.alola, GameConstants.AlolaSubRegions.MagikarpJump)));

        AchievementHandler._achievementCategories = categories;
        return categories;
    }
    public static getAchievementCategoryByRegion(region: GameConstants.Region): AchievementCategory {
        return AchievementHandler.getAchievementCategories().find(c => c.name == GameConstants.Region[region]);
    }
    public static getAchievementCategoryByExtraCategory(category: GameConstants.ExtraAchievementCategories): AchievementCategory {
        return AchievementHandler.getAchievementCategories().find(c => c.name == GameConstants.ExtraAchievementCategories[category]);
    }

    public static initialize(multiplier: Multiplier, challenges: Challenges) {

        /*
         * GENERAL
         */
        AchievementHandler.addAchievement('My First Hundo', 'Obtain 100 Pokédollars.', new MoneyRequirement(100), 0.05);
        AchievementHandler.addAchievement('I Should Buy a Poké Mart', 'Obtain 1,000 Pokédollars.', new MoneyRequirement(1000), 0.10);
        AchievementHandler.addAchievement('A Small Fortune', 'Obtain 10,000 Pokédollars.', new MoneyRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Annual Wage', 'Obtain 100,000 Pokédollars.', new MoneyRequirement(100000), 0.20);
        AchievementHandler.addAchievement('Pfft, I Don\'t Need a Bike Voucher', 'Obtain 1,000,000 Pokédollars.', new MoneyRequirement(1000000), 0.25);
        AchievementHandler.addAchievement('A Billion Poképennies', 'Obtain 10,000,000 Pokédollars.', new MoneyRequirement(10000000), 0.3);
        AchievementHandler.addAchievement('Ready To Retire', 'Obtain 1,000,000,000 Pokédollars.', new MoneyRequirement(1000000000), 0.4);
        AchievementHandler.addAchievement('I Should Go to Space...', 'Obtain 100,000,000,000 Pokédollars.', new MoneyRequirement(100000000000), 0.6);

        AchievementHandler.addAchievement('Dungeon Time', 'Obtain 100 Dungeon Tokens.', new TokenRequirement(100), 0.05);
        AchievementHandler.addAchievement('Token Collector', 'Obtain 1,000 Dungeon Tokens.', new TokenRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Dungeon Grinder', 'Obtain 10,000 Dungeon Tokens.', new TokenRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Dungeon Master', 'Obtain 100,000 Dungeon Tokens.', new TokenRequirement(100000), 0.20);
        AchievementHandler.addAchievement('Dungeon Legend', 'Obtain 1,000,000 Dungeon Tokens.', new TokenRequirement(1000000), 0.25);
        AchievementHandler.addAchievement('Dungeon Myth', 'Obtain 100,000,000 Dungeon Tokens.', new TokenRequirement(100000000), 0.3);
        AchievementHandler.addAchievement('Dungeon God', 'Obtain 10,000,000,000 Dungeon Tokens.', new TokenRequirement(10000000000), 0.6);

        AchievementHandler.addAchievement('Farm Master', 'Obtain 100,000 Farm Points.', new FarmPointsRequirement(100000), 0.20);
        AchievementHandler.addAchievement('Farm Legend', 'Obtain 1,000,000 Farm Points.', new FarmPointsRequirement(1000000), 0.30);
        AchievementHandler.addAchievement('Farm Myth', 'Obtain 20,000,000 Farm Points.', new FarmPointsRequirement(20000000), 0.60);

        AchievementHandler.addAchievement('Startin\' Out', 'Capture your first Pokémon.', new CaughtPokemonRequirement(1), 0.01);
        AchievementHandler.addAchievement('Better Than Season 1 Ash', 'Capture 15 unique Pokémon.', new CaughtPokemonRequirement(15), 0.05);
        AchievementHandler.addAchievement('Wonderful! Do You Like To Collect Things?', 'Capture 50 unique Pokémon.', new CaughtPokemonRequirement(50), 0.10);
        AchievementHandler.addAchievement('Surpassing Ash', 'Capture 100 unique Pokémon.', new CaughtPokemonRequirement(100), 0.20);
        AchievementHandler.addAchievement('Enough for a Zoo', 'Capture 500 unique Pokémon.', new CaughtPokemonRequirement(500), 0.30);
        AchievementHandler.addAchievement('The PC Will Be Filled', 'Capture 1,000 unique Pokémon.', new CaughtPokemonRequirement(1000), 0.40);

        AchievementHandler.addAchievement('I\'d Rather Be Shiny', 'Capture your first Shiny Pokémon.', new ShinyPokemonRequirement(1), 0.03);
        AchievementHandler.addAchievement('These Pokémon Must Be Sick', 'Capture 10 unique Shiny Pokémon.', new ShinyPokemonRequirement(10), 0.06);
        AchievementHandler.addAchievement('Why Am I Doing This?', 'Capture 20 unique Shiny Pokémon.', new ShinyPokemonRequirement(20), 0.09);
        AchievementHandler.addAchievement('Why Am I Still Doing This?!', 'Capture 30 unique Shiny Pokémon.', new ShinyPokemonRequirement(30), 0.12);
        AchievementHandler.addAchievement('Okay Fine, I Can Do a Few More', 'Capture 40 unique Shiny Pokémon.', new ShinyPokemonRequirement(40), 0.15);
        AchievementHandler.addAchievement('Where Did All the Shiny Pokémon Go?', 'Capture 50 unique Shiny Pokémon.', new ShinyPokemonRequirement(50), 0.30);
        AchievementHandler.addAchievement('Nvm, Found Some More', 'Capture 75 unique Shiny Pokémon.', new ShinyPokemonRequirement(75), 0.45);
        AchievementHandler.addAchievement('Just Keep Swimming Just Keep Swimming - Oooo Shiny!', 'Capture 100 unique Shiny Pokémon.', new ShinyPokemonRequirement(100), 0.60);
        AchievementHandler.addAchievement('I Don\'t Know if I Can Handle the Next Batch of Shinies', 'Capture 151 unique Shiny Pokémon!', new ShinyPokemonRequirement(151), 1.00);
        AchievementHandler.addAchievement('Will Need Sunglasses', 'Capture 250 unique Shiny Pokémon!', new ShinyPokemonRequirement(250), 1.20);
        AchievementHandler.addAchievement('What Were the Odds Again?', 'Capture 500 unique Shiny Pokémon!', new ShinyPokemonRequirement(500), 1.30);
        AchievementHandler.addAchievement('Non-Shiny Is Now Becoming Rare', 'Capture 1,000 unique Shiny Pokémon!', new ShinyPokemonRequirement(1000), 1.50);

        AchievementHandler.addAchievement('First Team', 'Capture 100 Pokémon.', new CapturedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Filling the PC', 'Capture 1,000 Pokémon.', new CapturedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Pokémon Army', 'Capture 10,000 Pokémon.', new CapturedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Pokémon Collector', 'Capture 100,000 Pokémon.', new CapturedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('You Get a Pokémon, You Get a Pokémon, Everyone Gets a Pokémon!', 'Capture 1,000,000 Pokémon.', new CapturedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement('A Long Road Ahead', 'Defeat 100 Pokémon.', new DefeatedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Highway to Pallet Town', 'Defeat 1,000 Pokémon.', new DefeatedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Overleveled', 'Defeat 10,000 Pokémon.', new DefeatedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('The Cake Is a Lie, but the Grind Is Real', 'Defeat 100,000 Pokémon.', new DefeatedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('Are There Any Left?', 'Defeat 1,000,000 Pokémon.', new DefeatedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement('Basic Trainer', 'Have 100 Attack.', new AttackRequirement(100), 0.05);
        AchievementHandler.addAchievement('Improving', 'Have 1,000 Attack.', new AttackRequirement(1000), 0.10);
        AchievementHandler.addAchievement('An Unrelenting Force', 'Have 5,000 Attack.', new AttackRequirement(5000), 0.15);
        AchievementHandler.addAchievement('FUS RO DAH', 'Have 10,000 Attack.', new AttackRequirement(10000), 0.20);
        AchievementHandler.addAchievement('OK, I Have Enough Attack Already...', 'Have 25,000 Attack.', new AttackRequirement(25000), 0.25);
        AchievementHandler.addAchievement('Silver Attack Button!', 'Have 100,000 Attack.', new AttackRequirement(100000), 0.30);
        AchievementHandler.addAchievement('Pesky Roamers, I Need to One-Shot Routes for Them...', 'Have 250,000 Attack.', new AttackRequirement(250000), 0.35);
        AchievementHandler.addAchievement('You Pressed F12 by Any Chance?', 'Have 500,000 Attack.', new AttackRequirement(500000), 0.40);
        AchievementHandler.addAchievement('Left-Left-Right-Right-A-B-A-B - Hey, 1 Million!', 'Have 1,000,000 Attack.', new AttackRequirement(1000000), 0.40);
        AchievementHandler.addAchievement('Can I Beat Diantha Yet?', 'Have 5,000,000 Attack.', new AttackRequirement(5000000), 0.45);
        AchievementHandler.addAchievement('No One Can Challenge Me!', 'Have 20,000,000 Attack.', new AttackRequirement(20000000), 0.60);

        AchievementHandler.addAchievement('A Few Clicks In', 'Click Attack 10 times.', new ClickRequirement(10, 1), 0.02, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Clicking Pro', 'Click Attack 100 times.', new ClickRequirement(100, 1), 0.05, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Ultra Clicker', 'Click Attack 1,000 times.', new ClickRequirement(1000, 1), 0.10, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Need a New Mouse Yet?', 'Click Attack 10,000 times.', new ClickRequirement(10000, 1), 0.25, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableClickAttack.active());

        AchievementHandler.addAchievement('Why Is My Voltorb Upside Down?', 'Purchase your first Poké Ball.', new PokeballRequirement(1, GameConstants.Pokeball.Pokeball), 0.01);
        AchievementHandler.addAchievement('Starting a Collection', 'Purchase 10 Poké Balls.', new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.03);
        AchievementHandler.addAchievement('Stocking Up', 'Purchase 100 Poké Balls.', new PokeballRequirement(100, GameConstants.Pokeball.Pokeball), 0.05);
        AchievementHandler.addAchievement('Fully Stocked', 'Purchase 1,000 Poké Balls.', new PokeballRequirement(1000, GameConstants.Pokeball.Pokeball), 0.10);
        AchievementHandler.addAchievement('Maybe Just a Few More for the Bunker', 'Purchase 10,000 Poké Balls.', new PokeballRequirement(10000, GameConstants.Pokeball.Pokeball), 0.15);
        AchievementHandler.addAchievement('Doomsday Bunker Stocked With Poké Balls!', 'Purchase 100,000 Poké Balls.', new PokeballRequirement(100000, GameConstants.Pokeball.Pokeball), 0.20);

        AchievementHandler.addAchievement('Ooooo a Blue One!', 'Purchase your first Great Ball.', new PokeballRequirement(1, GameConstants.Pokeball.Greatball), 0.03);
        AchievementHandler.addAchievement('I Got a Few Shiny Voltorb! Oh, Wait...', 'Obtain 10 Great Balls.', new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.05);
        AchievementHandler.addAchievement('Now Shinies Won\'t Run Away So Easily!', 'Obtain 100 Great Balls.', new PokeballRequirement(100, GameConstants.Pokeball.Greatball), 0.10);
        AchievementHandler.addAchievement('Regular Poké Balls Just Aren\'t What They Used To Be', 'Obtain 1,000 Great Balls.', new PokeballRequirement(1000, GameConstants.Pokeball.Greatball), 0.15);
        AchievementHandler.addAchievement('A Great Investment', 'Obtain 10,000 Great Balls.', new PokeballRequirement(10000, GameConstants.Pokeball.Greatball), 0.20);
        AchievementHandler.addAchievement('The Greatest Collection of All Time', 'Obtain 100,000 Great Balls.', new PokeballRequirement(100000, GameConstants.Pokeball.Greatball), 0.30);

        AchievementHandler.addAchievement('They Made One Even Better?', 'Obtain your first Ultra Ball.', new PokeballRequirement(1, GameConstants.Pokeball.Ultraball), 0.05);
        AchievementHandler.addAchievement('Let\'s See How High the Catch Rate Becomes', 'Obtain 10 Ultra Balls.', new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.10);
        AchievementHandler.addAchievement('This Should Be Enough for Those Elusive Roamers...', 'Obtain 100 Ultra Balls.', new PokeballRequirement(100, GameConstants.Pokeball.Ultraball), 0.15);
        AchievementHandler.addAchievement('They Don\'t Work on Ultra Beasts? That\'s False Advertising!', 'Obtain 1,000 Ultra Balls.', new PokeballRequirement(1000, GameConstants.Pokeball.Ultraball), 0.20);
        AchievementHandler.addAchievement('I Don\'t Think I\'ll Ever Be Able To Go Back to the Commoner\'s Great Ball', 'Obtain 10,000 Ultra Balls.', new PokeballRequirement(10000, GameConstants.Pokeball.Ultraball), 0.30);
        AchievementHandler.addAchievement('Just Making Sure No Rare Pokémon Flees', 'Obtain 100,000 Ultra Balls.', new PokeballRequirement(100000, GameConstants.Pokeball.Ultraball), 0.40);

        AchievementHandler.addAchievement('The Ultimate Catching Device', 'Obtain your first Master Ball.', new PokeballRequirement(1, GameConstants.Pokeball.Masterball), 0.20);
        AchievementHandler.addAchievement('Legendaries Hate That Guy', 'Obtain 10 Master Balls.', new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.30);
        AchievementHandler.addAchievement('No Pokémon in the World Can Run Away From Me Now!', 'Obtain 100 Master Balls.', new PokeballRequirement(100, GameConstants.Pokeball.Masterball), 0.40);

        AchievementHandler.addAchievement('Can You Do This for Me?', 'Complete your first quest.', new QuestRequirement(1), 0.05);
        AchievementHandler.addAchievement('One More Favor', 'Complete 10 quests.', new QuestRequirement(10), 0.15);
        AchievementHandler.addAchievement('YES MAN!', 'Complete 100 quests.', new QuestRequirement(100), 0.25);
        AchievementHandler.addAchievement('I Just Love Green Coins', 'Complete 1,000 quests.', new QuestRequirement(1000), 0.4);
        AchievementHandler.addAchievement('I Want To Be Ready for the Next Region', 'Complete 5,000 quests.', new QuestRequirement(5000), 0.6);

        AchievementHandler.addAchievement('Oh, Another Quest Slot!', 'Reach Quest Level 5.', new QuestLevelRequirement(5), 0.2);
        AchievementHandler.addAchievement('I Am Getting Good at Questing!', 'Reach Quest Level 10.', new QuestLevelRequirement(10), 0.3);
        AchievementHandler.addAchievement('What Do I Gain From Leveling This?', 'Reach Quest Level 20.', new QuestLevelRequirement(20), 0.5);
        AchievementHandler.addAchievement('Quest Master', 'Reach Quest Level 30.', new QuestLevelRequirement(30), 0.8);

        AchievementHandler.addAchievement('Is That How I Use This?', 'Level 1 Oak Item to the maximum level.', new MaxLevelOakItemRequirement(1), 0.05, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('I\'ve Got My Hands Full With All of These', 'Level 3 Oak Items to the maximum level.', new MaxLevelOakItemRequirement(3), 0.1, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('Professor Oak Is the Best!', 'Level 8 Oak Items to the maximum level.', new MaxLevelOakItemRequirement(8), 0.14, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableOakItems.active());
        AchievementHandler.addAchievement('Almost Prepared for Anything', 'Level 11 Oak Items to the maximum level.', new MaxLevelOakItemRequirement(11), 0.18, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableOakItems.active() && challenges.list.disableClickAttack.active());
        AchievementHandler.addAchievement('Prepared for Anything!', 'Level all 12 Oak Items to the maximum level.', new MaxLevelOakItemRequirement(12), 0.18, GameConstants.ExtraAchievementCategories.global, () => !challenges.list.disableOakItems.active() && !challenges.list.disableClickAttack.active());

        AchievementHandler.addAchievement('Pokémon Nursery', 'Hatch your first egg.', new HatchRequirement(1), 0.01);
        AchievementHandler.addAchievement('A Lot of Running', 'Hatch 10 eggs.', new HatchRequirement(10), 0.04);
        AchievementHandler.addAchievement('Marathon Runner', 'Hatch 100 eggs.', new HatchRequirement(100), 0.15);
        AchievementHandler.addAchievement('Egg Factory', 'Hatch 1,000 eggs.', new HatchRequirement(1000), 0.3);
        AchievementHandler.addAchievement('Official Easter Bunny', 'Hatch 10,000 eggs.', new HatchRequirement(10000), 0.4);
        AchievementHandler.addAchievement('What Do You Do With All the Eggshells?', 'Hatch 100,000 eggs.', new HatchRequirement(100000), 0.5);
        AchievementHandler.addAchievement('Day Care Is My Home', 'Hatch 250,000 eggs.', new HatchRequirement(250000), 0.7);

        AchievementHandler.addAchievement('Some Nice Help for the Day Care', 'Unlock 5 Hatchery Helpers.', new HatcheryHelperRequirement(5, 0), 0.1);
        AchievementHandler.addAchievement('Why Do They Have To Work in Shifts?', 'Unlock 11 Hatchery Helpers.', new HatcheryHelperRequirement(11, 0), 0.3);
        AchievementHandler.addAchievement('My Loyal Helpers', 'Get 3 Hatchery Helpers to 10% bonus efficiency.', new HatcheryHelperRequirement(3, 10), 0.4);
        AchievementHandler.addAchievement('Let\'s Try Some Other Helpers Too?', 'Get 5 Hatchery Helpers to 10% bonus efficiency.', new HatcheryHelperRequirement(5, 10), 0.5);
        AchievementHandler.addAchievement('Sam Just Wants To Help', 'Get 10 Hatchery Helpers to 10% bonus efficiency.', new HatcheryHelperRequirement(10, 10), 1);
        AchievementHandler.addAchievement('When Are You Going to Breed Yourself?', 'Get 10 Hatchery Helpers to 25% bonus efficiency.', new HatcheryHelperRequirement(10, 25), 1.3);

        AchievementHandler.addAchievement('My New Dirty Hobby', 'Unlock 3 Plots in the Farm.', new FarmPlotsUnlockedRequirement(3), 0.05);
        AchievementHandler.addAchievement('Allotment Gardener', 'Unlock 9 Plots in the Farm.', new FarmPlotsUnlockedRequirement(9), 0.15);
        AchievementHandler.addAchievement('Horticulture', 'Unlock all 25 Plots in the Farm.', new FarmPlotsUnlockedRequirement(25), 0.25);

        AchievementHandler.addAchievement('Who Planted These Here?', 'Unlock 8 Berries.', new BerriesUnlockedRequirement(8), 0.1);
        AchievementHandler.addAchievement('Farmer in Training', 'Unlock 18 Berries.', new BerriesUnlockedRequirement(18), 0.2);
        AchievementHandler.addAchievement('Farming Apprentice', 'Unlock 36 Berries.', new BerriesUnlockedRequirement(36), 0.3);
        AchievementHandler.addAchievement('Master Farmer', 'Unlock all 69 Berries.', new BerriesUnlockedRequirement(69), 0.4);

        AchievementHandler.addAchievement('Getting Some Help at the Farm', 'Unlock 3 Farm Hands.', new FarmHandRequirement(3), 0.2);
        AchievementHandler.addAchievement('Starting a Farming Empire', 'Unlock 6 Farm Hands.', new FarmHandRequirement(6), 0.3);
        AchievementHandler.addAchievement('Will I Ever Need All This Help?', 'Unlock all 9 Farm Hands.', new FarmHandRequirement(9), 0.4);

        AchievementHandler.addAchievement('Bling', 'Obtain 1,000 Diamonds.', new DiamondRequirement(1000), 0.05);
        AchievementHandler.addAchievement('Bling x10!', 'Obtain 10,000 Diamonds.', new DiamondRequirement(10000), 0.15);
        AchievementHandler.addAchievement('If You Like It, Then You Should\'ve Put a Ring on It', 'Obtain 100,000 Diamonds.', new DiamondRequirement(100000), 0.25);
        AchievementHandler.addAchievement('Just Keep Trading!', 'Obtain 250,000 Diamonds.', new DiamondRequirement(250000), 0.4);
        AchievementHandler.addAchievement('Get some daylight!', 'Obtain 1,000,000 Diamonds.', new DiamondRequirement(1000000), 0.6);

        AchievementHandler.addAchievement('Is My Thumb Green Yet?', 'Dig up an item in the Underground for the first time.', new UndergroundItemsFoundRequirement(1), 0.01);
        AchievementHandler.addAchievement('My Shovel Is Starting To Crack', 'Dig up 10 items in the Underground.', new UndergroundItemsFoundRequirement(10), 0.02);
        AchievementHandler.addAchievement('Why Can\'t I Make a Diamond Shovel?', 'Dig up 100 items in the Underground.', new UndergroundItemsFoundRequirement(100), 0.08);
        AchievementHandler.addAchievement('This Is Definitely Not Minecraft', 'Dig up 1,000 items in the Underground.', new UndergroundItemsFoundRequirement(1000), 0.1);
        AchievementHandler.addAchievement('I Wonder How Much Is Down There...', 'Dig up 10,000 items in the Underground.', new UndergroundItemsFoundRequirement(10000), 0.4);

        AchievementHandler.addAchievement('The Earth Is Like Onions', 'Dig deeper into the Underground for the first time.', new UndergroundLayersMinedRequirement(1), 0.01);
        AchievementHandler.addAchievement('This Takes Foreverrrrrrr', 'Dig deeper into the Underground 10 times.', new UndergroundLayersMinedRequirement(10), 0.03);
        AchievementHandler.addAchievement('DigDug Ain\'t Got Nothin\' on Me', 'Dig deeper into the Underground 100 times.', new UndergroundLayersMinedRequirement(100), 0.1);
        AchievementHandler.addAchievement('Both My Thumbs Are Green! This Can\'t Be Healthy', 'Dig deeper into the Underground 1,000 times.', new UndergroundLayersMinedRequirement(1000), 0.3);

        AchievementHandler.addAchievement('Well, this is easy', 'Reach Underground Level 10.', new UndergroundLevelRequirement(10), 0.25);
        AchievementHandler.addAchievement('To infinity and beyond', 'Reach Underground Level 20.', new UndergroundLevelRequirement(20), 0.5);
        AchievementHandler.addAchievement('Just one more thing', 'Reach Underground Level 50.', new UndergroundLevelRequirement(50), 1);

        AchievementHandler.addAchievement('Just pick one', 'Get at least 1 Underground Helper to level 25.', new UndergroundHelperRequirement(1, 25), 0.3);
        AchievementHandler.addAchievement('It\'s an honest days work', 'Get all 5 Underground Helpers to level 25.', new UndergroundHelperRequirement(5, 25), 0.6);
        AchievementHandler.addAchievement('Got a favorite?', 'Get at least 1 Underground Helper to level 50.', new UndergroundHelperRequirement(1, 50), 0.6);
        AchievementHandler.addAchievement('They\'re all my favorites', 'Get all 5 Underground Helpers to level 50.', new UndergroundHelperRequirement(5, 50), 1.2);

        AchievementHandler.addAchievement('Everyday I\'m chiseling', 'Use the Chisel Tool 1,000 times.', new UndergroundUseToolRequirement(UndergroundToolType.Chisel, 1000), 0.25);
        AchievementHandler.addAchievement('U Can\'t Touch This', 'Use the Hammer Tool 2,000 times.', new UndergroundUseToolRequirement(UndergroundToolType.Hammer, 2000), 0.25);
        AchievementHandler.addAchievement('KABOOM!', 'Use the Bomb Tool 5,000 times.', new UndergroundUseToolRequirement(UndergroundToolType.Bomb, 5000), 0.25);
        AchievementHandler.addAchievement('Eagle Eye', 'Use the Survey Tool 50 times.', new UndergroundUseToolRequirement(UndergroundToolType.Survey, 50), 0.25);
        AchievementHandler.addAchievement('Fine, I\'ll do it myself', 'Use any tool 10,000 times.', new UndergroundUseToolRequirement(null, 10000), 0.5);

        AchievementHandler.addAchievement('Let\'s Try This Out', 'Obtain your first Vitamin.', new VitaminObtainRequirement(1), 0.01);
        AchievementHandler.addAchievement('Pre-Workout Supplements', 'Obtain 5 Vitamins.', new VitaminObtainRequirement(5), 0.02);
        AchievementHandler.addAchievement('Well-Stocked Medicine Cabinet', 'Obtain 10 Vitamins.', new VitaminObtainRequirement(10), 0.04);
        AchievementHandler.addAchievement('I Can\'t Hold All These Vitamins!', 'Obtain 50 Vitamins.', new VitaminObtainRequirement(50), 0.08);
        AchievementHandler.addAchievement('Essential Nutrients', 'Obtain 100 Vitamins.', new VitaminObtainRequirement(100), 0.10);
        AchievementHandler.addAchievement('Putting the \'Bulk\' in Bulk-Buy', 'Obtain 500 Vitamins.', new VitaminObtainRequirement(500), 0.15);
        AchievementHandler.addAchievement('Vitamin Stockpile', 'Obtain 1,000 Vitamins.', new VitaminObtainRequirement(1000), 0.20);
        AchievementHandler.addAchievement('Fish, Eggs, Nuts, and Cheese', 'Obtain 5,000 Vitamins.', new VitaminObtainRequirement(5000), 0.35);
        AchievementHandler.addAchievement('Does This Powder Come With Flavours?', 'Obtain 10,000 Vitamins.', new VitaminObtainRequirement(10000), 0.50);
        AchievementHandler.addAchievement('A Literal Mountain of Muscle', 'Obtain 50,000 Vitamins.', new VitaminObtainRequirement(50000), 0.70);

        AchievementHandler.addAchievement('Fighting Novice', 'Complete stage 100 in the Battle Frontier.', new BattleFrontierHighestStageRequirement(100), 0.05);
        AchievementHandler.addAchievement('Competent Fighter', 'Complete stage 250 in the Battle Frontier.', new BattleFrontierHighestStageRequirement(250), 0.15);
        AchievementHandler.addAchievement('Unstoppable Fighting Machine', 'Complete stage 500 in the Battle Frontier.', new BattleFrontierHighestStageRequirement(500), 0.25);
        AchievementHandler.addAchievement('Living Legend', 'Complete stage 1,000 in the Battle Frontier.', new BattleFrontierHighestStageRequirement(1000), 0.4);
        AchievementHandler.addAchievement('Where Do They Find These Trainers?', 'Complete stage 2,000 in the Battle Frontier.', new BattleFrontierHighestStageRequirement(2000), 0.5);

        AchievementHandler.addAchievement('Keep On Fighting', 'Complete 500 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(500), 0.05);
        AchievementHandler.addAchievement('Uphill Battle', 'Complete 1,000 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(1000), 0.15);
        AchievementHandler.addAchievement('Don\'t Stop Trying', 'Complete 2,500 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(2500), 0.25);
        AchievementHandler.addAchievement('Need More Battle Points', 'Complete 5,000 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(5000), 0.4);
        AchievementHandler.addAchievement('I Can Do It This Time!', 'Complete 25,000 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(25000), 0.5);
        AchievementHandler.addAchievement('King of the Hill', 'Complete 100,000 total stages in the Battle Frontier.', new BattleFrontierTotalStageRequirement(100000), 0.7);

        AchievementHandler.addAchievement('I Hope It\'s Not Dangerous', 'Infect 20 Pokémon with Pokérus.', new PokerusStatusRequirement(20, GameConstants.Pokerus.Infected), 0.1);
        AchievementHandler.addAchievement('Any Way To Get Rid of It?', 'Infect 50 Pokémon with Pokérus.', new PokerusStatusRequirement(50, GameConstants.Pokerus.Infected), 0.2);
        AchievementHandler.addAchievement('It Is the Flu Season', 'Infect 100 Pokémon with Pokérus.', new PokerusStatusRequirement(100, GameConstants.Pokerus.Infected), 0.3);
        AchievementHandler.addAchievement('Where Is Nurse Joy?', 'Infect 250 Pokémon with Pokérus.', new PokerusStatusRequirement(250, GameConstants.Pokerus.Infected), 0.4);
        AchievementHandler.addAchievement('Infecting the Whole World', 'Infect 1,000 Pokémon with Pokérus.', new PokerusStatusRequirement(1000, GameConstants.Pokerus.Infected), 0.5);

        AchievementHandler.addAchievement('Curing Them One at a Time', 'Have 10 Pokémon Resistant to Pokérus.', new PokerusStatusRequirement(10, GameConstants.Pokerus.Resistant), 0.3);
        AchievementHandler.addAchievement('Pokémon Center Regular', 'Have 50 Pokémon Resistant to Pokérus.', new PokerusStatusRequirement(50, GameConstants.Pokerus.Resistant), 0.5);
        AchievementHandler.addAchievement('Doctor in Training', 'Have 250 Pokémon Resistant to Pokérus.', new PokerusStatusRequirement(250, GameConstants.Pokerus.Resistant), 1);
        AchievementHandler.addAchievement('I Should Open My Own Pokémon Center', 'Have 500 Pokémon Resistant to Pokérus.', new PokerusStatusRequirement(500, GameConstants.Pokerus.Resistant), 1.5);

        AchievementHandler.addAchievement('In the Shadow of Giants', 'Capture your first Shadow Pokémon', new ShadowPokemonRequirement(1), 1, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('That\'s some Shady Pokémon! Do You Want to Sell Them?', 'Capture 10 unique Shadow Pokémon', new ShadowPokemonRequirement(10), 2, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('Now Go Purify Them!', 'Capture 51 unique Shadow Pokémon', new ShadowPokemonRequirement(51), 4, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('Beyond a Shadow of a Doubt', 'Capture all 131 unique Shadow Pokémon', new ShadowPokemonRequirement(131), 8, GameConstants.ExtraAchievementCategories.orre);

        AchievementHandler.addAchievement('Cleaning Crew', 'Purify your first Shadow Pokémon', new ShadowPokemonRequirement(1, GameConstants.ShadowStatus.Purified), 1.5, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('Almost Clean Enough to Look Shiny', 'Purify 10 unique Shadow Pokémon', new ShadowPokemonRequirement(10, GameConstants.ShadowStatus.Purified), 3, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('Priest in Training', 'Purify 51 unique Shadow Pokémon', new ShadowPokemonRequirement(51, GameConstants.ShadowStatus.Purified), 6, GameConstants.ExtraAchievementCategories.orre);
        AchievementHandler.addAchievement('Hand of Light', 'Purify all 131 unique Shadow Pokémon', new ShadowPokemonRequirement(131, GameConstants.ShadowStatus.Purified), 12, GameConstants.ExtraAchievementCategories.orre);

        AchievementHandler.addAchievement('Who Dropped These Here?', 'Pick up 10 Items in a Safari Zone', new SafariItemsRequirement(10), 0.1);
        AchievementHandler.addAchievement('Cheaper Than Buying It', 'Pick up 50 Items in a Safari Zone', new SafariItemsRequirement(50), 0.2);
        AchievementHandler.addAchievement('Itemfinder Has Nothing On Me!', 'Pick up 100 Items in a Safari Zone', new SafariItemsRequirement(100), 0.4);

        AchievementHandler.addAchievement('This Is Not A Pokéball!', 'Throw 10 Rocks in a Safari Zone', new SafariRocksRequirement(10), 0.1);
        AchievementHandler.addAchievement('You\'re A Big Meanie!', 'Throw 100 Rocks in a Safari Zone', new SafariRocksRequirement(100), 0.3);
        AchievementHandler.addAchievement('Why Are You Like This?', 'Throw 1,000 Rocks in a Safari Zone', new SafariRocksRequirement(1000), 0.7);

        AchievementHandler.addAchievement('Hope It Likes Berries', 'Throw 10 Bait in a Safari Zone', new SafariBaitRequirement(10), 0.1);
        AchievementHandler.addAchievement('What Is "Bait" Made Of?', 'Throw 100 Bait in a Safari Zone', new SafariBaitRequirement(100), 0.3);
        AchievementHandler.addAchievement('Stay For Dinner', 'Throw 1,000 Bait in a Safari Zone', new SafariBaitRequirement(1000), 0.5);

        AchievementHandler.addAchievement('Gotta Get Your Steps In!', 'Walk 100 Steps in a Safari Zone', new SafariStepsRequirement(100), 0.1);
        AchievementHandler.addAchievement('One More Lap', 'Walk 1,000 Steps in a Safari Zone', new SafariStepsRequirement(1000), 0.2);
        AchievementHandler.addAchievement('Marathon Runner 2', 'Walk 10,000 Steps in a Safari Zone', new SafariStepsRequirement(10000), 0.3);

        AchievementHandler.addAchievement('Where Pinsir?', 'Reach Safari Level 5.', new SafariLevelRequirement(5), 0.25);
        AchievementHandler.addAchievement('Chasing the Chansey', 'Reach Safari Level 15.', new SafariLevelRequirement(15), 0.5);
        AchievementHandler.addAchievement('Catch Animation Enthusiast', 'Reach Safari Level 30.', new SafariLevelRequirement(30), 1);

        AchievementHandler.addAchievement('Just Keep Chuckin\' Balls', 'Catch 50 Pokémon in a Safari Zone', new SafariCatchRequirement(50), 0.1);
        AchievementHandler.addAchievement('Strategic Chucker', 'Catch 100 Pokémon in a Safari Zone', new SafariCatchRequirement(100), 0.2);
        AchievementHandler.addAchievement('Master of the Safari', 'Catch 250 Pokémon in a Safari Zone', new SafariCatchRequirement(250), 0.4);
        AchievementHandler.addAchievement('Do Shines Cost Extra?', 'Catch a Shiny Pokémon in a Safari Zone', new SafariCatchRequirement(1, true), 0.5);

        const totalMegaStones = Object.values(ItemList).filter((i) => i instanceof MegaStoneItem).length;
        AchievementHandler.addAchievement('What a neat rock!', 'Obtain your first Mega Stone.', new TotalMegaStoneObtainedRequirement(1), 5, GameConstants.Region.kalos);
        AchievementHandler.addAchievement('Go, Go, Mega Force!', 'Obtain 25 Mega Stones.', new TotalMegaStoneObtainedRequirement(25), 7, GameConstants.Region.kalos);
        AchievementHandler.addAchievement('Y\'all got any more of them Mega Stones?', `Obtain all ${totalMegaStones} Mega Stones.`, new TotalMegaStoneObtainedRequirement(totalMegaStones), 10, GameConstants.Region.kalos);

        /*
         * REGIONAL
         */
        const addGymAchievements = (gyms: string[], category: GameConstants.Region | GameConstants.ExtraAchievementCategories, subregion?: string) => {
            gyms.forEach(gym => {
                if (GymList[gym].requirements.some((req) => req instanceof DevelopmentRequirement)) {
                    return;
                }
                const elite = gym.includes('Elite') || gym.includes('Champion') || gym.includes('Supreme');
                const displayName = GymList[gym]?.displayName;

                const gymRegion = subregion ? subregion : GameConstants.camelCaseToString(GameConstants.Region[GameConstants.getGymRegion(gym)]);

                // Name of person's title if elite/champion, else the gym's town name + 'Gym'
                const gymTitle: string = displayName ?? (!elite ? `${gym} Gym` : gym);

                const leaderName: string = !elite && !displayName ? `${GymList[gym].leaderName}'s` : '';

                if (GymList[gym]?.flags?.achievement) {
                    AchievementHandler.addAchievement(
                        `${elite ? `${gymRegion} ` : ''}${gymTitle} Regular`,
                        `Defeat ${leaderName} ${gymTitle} in ${gymRegion} 10 times.`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[0], GameConstants.getGymIndex(gym)), 1, category);
                    AchievementHandler.addAchievement(
                        `${elite ? `${gymRegion} ` : ''}${gymTitle} Ruler`,
                        `Defeat ${leaderName} ${gymTitle} in ${gymRegion} 100 times.`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[1], GameConstants.getGymIndex(gym)), 2, category);
                    AchievementHandler.addAchievement(
                        `${elite ? `${gymRegion} ` : ''}${gymTitle} Owner`,
                        `Defeat ${leaderName} ${gymTitle} in ${gymRegion} 1,000 times.`, new ClearGymRequirement(GameConstants.ACHIEVEMENT_DEFEAT_GYM_VALUES[2], GameConstants.getGymIndex(gym)), 3, category);
                }
            });
        };

        GameHelper.enumNumbers(GameConstants.Region).filter(r => r != GameConstants.Region.none && r <= GameConstants.MAX_AVAILABLE_REGION).forEach(region => {
            // Routes
            Routes.getRoutesByRegion(region).forEach(route => {
                if (SubRegions.getSubRegionById(region, route.subRegion)?.requirement instanceof NullRequirement) {
                    return;
                }

                let category = region;
                // Split bigger subregions into their own achievement pool
                if (region == GameConstants.Region.kanto && (route.subRegion == GameConstants.KantoSubRegions.Sevii123 || route.subRegion == GameConstants.KantoSubRegions.Sevii4567)) {
                    category = GameConstants.ExtraAchievementCategories.sevii;
                }
                if (region == GameConstants.Region.hoenn && route.subRegion == GameConstants.HoennSubRegions.Orre) {
                    category = GameConstants.ExtraAchievementCategories.orre;
                }
                if (region == GameConstants.Region.alola && route.subRegion == GameConstants.AlolaSubRegions.MagikarpJump) {
                    category = GameConstants.ExtraAchievementCategories.magikarpJump;
                }
                const routeName = Routes.getName(route.number, region, true);
                AchievementHandler.addAchievement(`${route.routeName} Traveler`, `Defeat 100 Pokémon on ${routeName}.`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[0], region, route.number), 1, category);
                AchievementHandler.addAchievement(`${route.routeName} Explorer`, `Defeat 1,000 Pokémon on ${routeName}.`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[1], region, route.number), 2, category);
                AchievementHandler.addAchievement(`${route.routeName} Conqueror`, `Defeat 10,000 Pokémon on ${routeName}.`, new RouteKillRequirement(GameConstants.ACHIEVEMENT_DEFEAT_ROUTE_VALUES[2], region, route.number), 3, category);
            });
            // Gyms
            if (GameConstants.RegionGyms[region]) {
                addGymAchievements(GameConstants.RegionGyms[region], region);
            }
            // Dungeons
            GameConstants.RegionDungeons[region]?.forEach(dungeon => {
                if (TownList[dungeon].requirements.some((req) => req instanceof DevelopmentRequirement)) {
                    return;
                }
                let category = region;
                // Split bigger subregions into their own achievement pool
                if (region == GameConstants.Region.kanto && (TownList[dungeon].subRegion == GameConstants.KantoSubRegions.Sevii123 || TownList[dungeon].subRegion == GameConstants.KantoSubRegions.Sevii4567)) {
                    category = GameConstants.ExtraAchievementCategories.sevii;
                }
                if (region == GameConstants.Region.hoenn && TownList[dungeon].subRegion == GameConstants.HoennSubRegions.Orre) {
                    category = GameConstants.ExtraAchievementCategories.orre;
                }
                if (region == GameConstants.Region.alola && TownList[dungeon].subRegion == GameConstants.AlolaSubRegions.MagikarpJump) {
                    category = GameConstants.ExtraAchievementCategories.magikarpJump;
                }
                AchievementHandler.addAchievement(`${dungeon} Explorer`, `Clear ${dungeon} 10 times.`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[0], GameConstants.getDungeonIndex(dungeon)), 0.8, category);
                AchievementHandler.addAchievement(`${dungeon} Expert`, `Clear ${dungeon} 100 times.`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[1], GameConstants.getDungeonIndex(dungeon)), 1.2, category);
                AchievementHandler.addAchievement(`${dungeon} Hermit`, `Clear ${dungeon} 250 times.`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[2], GameConstants.getDungeonIndex(dungeon)), 1.6, category);
                AchievementHandler.addAchievement(`${dungeon} Dweller`, `Clear ${dungeon} 500 times.`, new ClearDungeonRequirement(GameConstants.ACHIEVEMENT_DEFEAT_DUNGEON_VALUES[3], GameConstants.getDungeonIndex(dungeon)), 2.4, category);
            });
            // Unique Pokémon
            const amt10 = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region) * .1);
            const amt50 = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region) * .5);
            const amtAll = Math.floor(PokemonHelper.calcUniquePokemonsByRegion(region));
            // Caught unique pokemon
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Trainer`, `Catch ${amt10} unique Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region.`, new CaughtUniquePokemonsByRegionRequirement(region, amt10), 2, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Ace`, `Catch ${amt50} unique Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region.`, new CaughtUniquePokemonsByRegionRequirement(region, amt50), 4, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Master`, `Complete the ${GameConstants.camelCaseToString(GameConstants.Region[region])} Pokédex!`, new CaughtUniquePokemonsByRegionRequirement(region, amtAll), 6, region);
            // Caught unique shiny pokemon
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Trainer`, `Catch ${amt10} unique Shiny Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region.`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amt10), 3, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Ace`, `Catch ${amt50} unique Shiny Pokémon native to the ${GameConstants.camelCaseToString(GameConstants.Region[region])} region.`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amt50), 6, region);
            AchievementHandler.addAchievement(`${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Master`, `Complete the ${GameConstants.camelCaseToString(GameConstants.Region[region])} Shiny Pokédex!`, new CaughtUniqueShinyPokemonsByRegionRequirement(region, amtAll), 9, region);
        });

        // Unown pokédex for Johto
        const unownID = pokemonMap['Unown (A)'].id;
        const unownDexFilter = (p: PartyPokemon) => Math.floor(p.id) === unownID;
        const unownAmount = pokemonList.reduce((count, p) => count + +(Math.floor(p.id) === unownID), 0);
        AchievementHandler.addAchievement('Alphabet Soup for Ruin Maniac', 'Catch all unique Unown forms.', new CaughtUniquePokemonByFilterRequirement(unownDexFilter, 'Catch all unique Unown forms.', unownAmount), 2, GameConstants.Region.johto);
        AchievementHandler.addAchievement('"I am the Alpha and the Omega"', 'Catch all unique Shiny Unown forms.', new CaughtUniquePokemonByFilterRequirement(unownDexFilter, 'Catch all unique Unown forms.', unownAmount, true), 3, GameConstants.Region.johto);


        // Battle Café pokédex for Galar, highly optional as this is End Game farming, so no high bonus
        const alcremieDexFilter = (p: PartyPokemon) => p.name === 'Milcery (Cheesy)' || p.name.startsWith('Alcremie');
        const alcremieAmount = pokemonList.reduce((count, p) => count + +(p.name === 'Milcery (Cheesy)' || p.name.startsWith('Alcremie')), 0);
        AchievementHandler.addAchievement('Moomoo Milk Served Right', 'Catch 32 unique Battle Café flavors.', new CaughtUniquePokemonByFilterRequirement(alcremieDexFilter, 'Catch 32 unique Alcremie flavors.', 32), 0.5, GameConstants.Region.galar);
        AchievementHandler.addAchievement('Gotta Taste \'Em All!', 'Catch all unique Battle Café flavors.', new CaughtUniquePokemonByFilterRequirement(alcremieDexFilter, 'Catch all unique Alcremie flavors.', alcremieAmount), 1, GameConstants.Region.galar);
        AchievementHandler.addAchievement('Yoshida\'s Coffees Enjoyer', 'Catch 32 unique Shiny Battle Café flavors.', new CaughtUniquePokemonByFilterRequirement(alcremieDexFilter, 'Catch 32 unique Shiny Alcremie flavors.', 32, true), 0.75, GameConstants.Region.galar);
        AchievementHandler.addAchievement('All These Flavors And You Choose To Be Cheesy', 'Catch all unique Shiny Battle Café flavors.', new CaughtUniquePokemonByFilterRequirement(alcremieDexFilter, 'Catch all unique Shiny Alcremie flavors.', alcremieAmount, true), 1.5, GameConstants.Region.galar);

        // Gigantamax pokédex for Galar
        const gigaDexFilter = (p: PartyPokemon) => p.name.startsWith('Gigantamax') || p.name.startsWith('Eternamax');
        const gigaAmount = pokemonList.reduce((count, p) => count + +(p.name.startsWith('Gigantamax') || p.name.startsWith('Eternamax')), 0);
        AchievementHandler.addAchievement('Way Too Many Bosses', 'Catch all Gigantamax Pokémon.', new CaughtUniquePokemonByFilterRequirement(gigaDexFilter, 'Catch all Gigantamax Pokémon.', gigaAmount), 2, GameConstants.Region.galar);
        AchievementHandler.addAchievement('Really Big Sparkle', 'Catch all Shiny Gigantamax Pokémon.', new CaughtUniquePokemonByFilterRequirement(gigaDexFilter, 'Catch all Shiny Gigantamax Pokémon.', gigaAmount, true), 3, GameConstants.Region.galar);

        /*
         * MINIREGIONS
         */
        addGymAchievements(GameConstants.RegionGyms[GameConstants.Region.final], GameConstants.ExtraAchievementCategories.sevii, 'Sevii Islands');
        AchievementHandler.addAchievement('Sevii Trainer', 'Catch 15 unique Pokémon native to the Sevii Islands.', new SeviiCaughtRequirement(15, false), 3, GameConstants.ExtraAchievementCategories.sevii);
        AchievementHandler.addAchievement('Sevii Master', 'Catch 34 unique Pokémon native to the Sevii Islands.', new SeviiCaughtRequirement(34, false), 6, GameConstants.ExtraAchievementCategories.sevii);
        AchievementHandler.addAchievement('Sevii Shiny Trainer', 'Catch 15 unique Shiny Pokémon native to the Sevii Islands.', new SeviiCaughtRequirement(15, true), 5, GameConstants.ExtraAchievementCategories.sevii);
        AchievementHandler.addAchievement('Sevii Shiny Master', 'Catch 34 unique Shiny Pokémon native to the Sevii Islands.', new SeviiCaughtRequirement(34, true), 9, GameConstants.ExtraAchievementCategories.sevii);

        addGymAchievements(GameConstants.RegionGyms[GameConstants.Region.final + 1], GameConstants.ExtraAchievementCategories.magikarpJump, 'Magikarp Jump');
        // Magikarp pokédex, highly optional as some forms are End Game farming, so no high bonus
        const magikarpID = pokemonMap.Magikarp.id;
        const karpDexFilter = (p: PartyPokemon) => Math.floor(p.id) === magikarpID;
        const karpAmount = pokemonList.reduce((count, p) => count + +(Math.floor(p.id) === magikarpID), 0);
        AchievementHandler.addAchievement('Do You Even Splash?', 'Catch all unique Magikarp forms.', new CaughtUniquePokemonByFilterRequirement(karpDexFilter, 'Catch all unique Magikarp forms.', karpAmount), 1, GameConstants.ExtraAchievementCategories.magikarpJump);
        AchievementHandler.addAchievement('Twenty Thousands Karps Under the Seas', 'Catch all unique Shiny Magikarp forms.', new CaughtUniquePokemonByFilterRequirement(karpDexFilter, 'Catch all unique Shiny Magikarp forms.', karpAmount, true), 1.5, GameConstants.ExtraAchievementCategories.magikarpJump);

        addGymAchievements(GameConstants.RegionGyms[GameConstants.Region.final + 2], GameConstants.ExtraAchievementCategories.orre, 'Orre');

        // load filters
        this.load();

        // subscribe to filters so that when the player changes a filter it automatically refilters the list
        Object.keys(this.filter).forEach(e => (<KnockoutObservable<any>> this.filter[e]).subscribe(() => this.filterAchievementList()));

        const multiplierSource = 'Achievements';
        multiplier.addBonus('exp', () => 1 + this.achievementBonus(), multiplierSource);
        multiplier.addBonus('money', () => 1 + this.achievementBonus(), multiplierSource);
        multiplier.addBonus('dungeonToken', () => 1 + this.achievementBonus(), multiplierSource);
        multiplier.addBonus('clickAttack', () => 1 + this.achievementBonus(), multiplierSource);
    }

    static load() {
        AchievementHandler.calculateMaxBonus();
        AchievementHandler.navigateIndex(Settings.getSetting('achievementsPage').value);
        AchievementHandler.filter.status(Settings.getSetting('achievementsStatus').value);
        AchievementHandler.filter.type(Settings.getSetting('achievementsType').value);
        AchievementHandler.filter.category(Settings.getSetting('achievementsCategory').value);
        // Cycle the pages to make sure they are upto date
        AchievementHandler.navigateRight();
        setTimeout(() => {
            AchievementHandler.navigateLeft();
        }, 1);
    }
}

AchievementHandler satisfies TmpAchievementHandlerType;
