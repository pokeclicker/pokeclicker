///<reference path="MoneyRequirement.ts"/>

class AchievementHandler {

    public static achievementList: Achievement[] = [];
    public static navigateIndex: KnockoutObservable<number> = ko.observable(0);
    private static maxBonus: number;

    public static navigateRight() {
        if (AchievementHandler.navigateIndex() < AchievementHandler.getNumberOfTabs()) {
            AchievementHandler.navigateIndex(AchievementHandler.navigateIndex() + 1);
        }
    }

    public static navigateLeft() {
        if (AchievementHandler.navigateIndex() > 0) {
            AchievementHandler.navigateIndex(AchievementHandler.navigateIndex() - 1);
        }
    }

    public static getNumberOfTabs() {
        return Math.floor(AchievementHandler.achievementList.length / 10);
    }

    public static getAchievementListWithIndex(index: number) {
        return AchievementHandler.achievementList.slice(index, index + 10);
    }

    public static checkAchievements() {
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            if (!AchievementHandler.achievementList[i].unlocked) {
                AchievementHandler.achievementList[i].check();
            }
        }
    }

    public static addAchievement(name: string, description: string, property: Requirement, bonus: number) {
        const unlocked: boolean = player.achievementsCompleted[name];
        AchievementHandler.achievementList.push(new Achievement(name, description, property, bonus, unlocked));
    }

    public static calculateMaxBonus() {
        let sum = 0;
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            sum += AchievementHandler.achievementList[i].bonus;
        }
        return sum;
    }

    public static bonusUnlocked(): number {
        let sum = 0;
        for (const achievement of AchievementHandler.achievementList) {
            if (achievement.isCompleted()) {
                sum += achievement.bonus;
            }
        }
        return sum;
    }

    public static achievementBonus(): number {
        return AchievementHandler.bonusUnlocked() / AchievementHandler.maxBonus;
    }

    public static getMoneyMultiplier() {
        return 1 + this.achievementBonus();
    }

    public static achievementBonusPercent(): string {
        return `${(100 * AchievementHandler.achievementBonus()).toFixed(2)}%`;
    }

    public static initialize() {

        AchievementHandler.addAchievement('My First Hundo', 'Obtain 100 Pokédollars', new MoneyRequirement(100), 0.05);
        AchievementHandler.addAchievement('I Should Buy a PokéMart', 'Obtain 1,000 Pokédollars', new MoneyRequirement(1000), 0.10);
        AchievementHandler.addAchievement('A Small Fortune', 'Obtain 10,000 Pokédollars', new MoneyRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Annual Wage', 'Obtain 100,000 Pokédollars', new MoneyRequirement(100000), 0.20);
        AchievementHandler.addAchievement("Pfft, I Don't Need a Bike Voucher", 'Obtain 1,000,000 Pokédollars', new MoneyRequirement(1000000), 0.25);
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

        AchievementHandler.addAchievement('Bling', 'Obtain 100 Diamonds', new DiamondRequirement(100), 0.05);
        AchievementHandler.addAchievement('Bling x10!', 'Obtain 1000 Diamonds', new DiamondRequirement(1000), 0.15);
        AchievementHandler.addAchievement("If you like it, you should've put a ring on it.", 'Obtain 10,000 Diamonds', new DiamondRequirement(10000), 0.25);

        AchievementHandler.addAchievement('Is my thumb green yet?', 'Dig up 1 item', new UndergroundItemsFoundRequirement(1), 0.01);
        AchievementHandler.addAchievement('My shovel is starting to crack', 'Dig up 10 items', new UndergroundItemsFoundRequirement(10), 0.01);
        AchievementHandler.addAchievement("Why can't I make a diamond shovel?", 'Dig up 100 items', new UndergroundItemsFoundRequirement(100), 0.01);
        AchievementHandler.addAchievement('This is definitely not Minecraft', 'Dig up 1,000 items', new UndergroundItemsFoundRequirement(1000), 0.01);
        AchievementHandler.addAchievement('I wonder how much is down there...', 'Dig up 10,000 items', new UndergroundItemsFoundRequirement(10000), 0.01);

        AchievementHandler.addAchievement('The earth is like unions', 'Dig deeper 1 time', new UndergroundLayersMinedRequirement(1), 0.01);
        AchievementHandler.addAchievement('This takes foreverrrrrrr', 'Dig deeper 10 times', new UndergroundLayersMinedRequirement(10), 0.01);
        AchievementHandler.addAchievement("DigDug ain't got nothin on me", 'Dig deeper 100 times', new UndergroundLayersMinedRequirement(100), 0.01);
        AchievementHandler.addAchievement("Both my thumbs are green! This can't be healthy", 'Dig deeper 1000 times', new UndergroundLayersMinedRequirement(1000), 0.01);

        AchievementHandler.addAchievement('First Team', 'Capture 100 Pokemon', new CapturedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Filling the PC', 'Capture 1,000 Pokemon', new CapturedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Pokemon Army', 'Capture 10,000 Pokemon', new CapturedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('Pokemon Collector', 'Capture 100,000 Pokemon', new CapturedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('You get a pokemon, you get a pokemon, everyone gets a pokemon!', 'Capture 1,000,000 Pokemon', new CapturedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement('A Long Road Ahead', 'Defeat 100 Pokemon', new DefeatedRequirement(100), 0.05);
        AchievementHandler.addAchievement('Highway to Pallet Town', 'Defeat 1,000 Pokemon', new DefeatedRequirement(1000), 0.10);
        AchievementHandler.addAchievement('Overleveled', 'Defeat 10,000 Pokemon', new DefeatedRequirement(10000), 0.15);
        AchievementHandler.addAchievement('The Cake is a Lie, but the Grind is real', 'Defeat 100,000 Pokemon', new DefeatedRequirement(100000), 0.25);
        AchievementHandler.addAchievement('Are there any left?', 'Defeat 1,000,000 Pokemon', new DefeatedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement("Startin' Out", 'Capture your first Pokémon', new CaughtPokemonRequirement(1), 0.01);
        AchievementHandler.addAchievement('Like Ants in a PC', 'Capture 10 unique Pokémons', new CaughtPokemonRequirement(10), 0.02);
        AchievementHandler.addAchievement('Better Than Season 1 Ash', 'Capture 20 unique Pokémons', new CaughtPokemonRequirement(20), 0.03);
        AchievementHandler.addAchievement('More Pokémon than Patrick', 'Capture 30 unique Pokémons', new CaughtPokemonRequirement(30), 0.04);
        AchievementHandler.addAchievement('Rick and Fourty', 'Capture 40 unique Pokémons', new CaughtPokemonRequirement(40), 0.05);
        AchievementHandler.addAchievement('50 Shades of Pikachu', 'Capture 50 unique Pokémons', new CaughtPokemonRequirement(50), 0.10);
        AchievementHandler.addAchievement('Keeping Oak Really Busy', 'Capture 75 unique Pokémons', new CaughtPokemonRequirement(75), 0.15);
        AchievementHandler.addAchievement('Surpassing Ash', 'Capture 88 unique Pokémons', new CaughtPokemonRequirement(88), 0.05);
        AchievementHandler.addAchievement('I Wanna be The Very Best', 'Capture 100 unique Pokémons', new CaughtPokemonRequirement(100), 0.20);
        AchievementHandler.addAchievement('I Should Probably Take a Break', 'Complete the Kanto Pokédex!', new CaughtPokemonRequirement(151), 0.50);

        AchievementHandler.addAchievement("I'd rather be shiny", 'Capture your first Shiny', new ShinyPokemonRequirement(1), 0.03);
        AchievementHandler.addAchievement('These pokémon must be sick', 'Capture 10 unique Shinies', new ShinyPokemonRequirement(10), 0.06);
        AchievementHandler.addAchievement('Why Am I Doing This?', 'Capture 20 unique Shinies', new ShinyPokemonRequirement(20), 0.09);
        AchievementHandler.addAchievement('Why Am I Still Doing This?!', 'Capture 30 unique Shinies', new ShinyPokemonRequirement(30), 0.12);
        AchievementHandler.addAchievement('Okay fine, I can do a few more', 'Capture 40 unique Shinies', new ShinyPokemonRequirement(40), 0.15);
        AchievementHandler.addAchievement('Where Did All The Shiny Pokémon Go?', 'Capture 50 unique Shinies', new ShinyPokemonRequirement(50), 0.30);
        AchievementHandler.addAchievement('Nvm, found some more', 'Capture 75 unique Shinies', new ShinyPokemonRequirement(75), 0.45);
        AchievementHandler.addAchievement('Just keep swimming just keep swimming -- oooo shiny!', 'Capture 100 unique Shinies', new ShinyPokemonRequirement(100), 0.60);
        AchievementHandler.addAchievement("I don't know if I can handle the next batch of shinies.", 'Complete the Kanto Pokédex shiny!', new ShinyPokemonRequirement(151), 1.50);

        AchievementHandler.addAchievement('Pokemon Nursery', 'Hatch 1 egg', new HatchRequirement(1), 0.01);
        AchievementHandler.addAchievement('A Lot of Running', 'Hatch 10 eggs', new HatchRequirement(10), 0.01);
        AchievementHandler.addAchievement('Marathon Runner', 'Hatch 100 eggs', new HatchRequirement(100), 0.01);
        AchievementHandler.addAchievement('Egg Factory', 'Hatch 1,000 eggs', new HatchRequirement(1000), 0.01);
        AchievementHandler.addAchievement('Offical Easter Bunny', 'Hatch 10,000 eggs', new HatchRequirement(10000), 0.01);

        AchievementHandler.addAchievement('Why is my Voltorb Upside Down?', 'Obtain your first Pokéball', new PokeballRequirement(1, GameConstants.Pokeball.Pokeball), 0.01);
        AchievementHandler.addAchievement('Starting a Collection', 'Obtain 10 Pokéballs', new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.03);
        AchievementHandler.addAchievement('Stocking Up', 'Obtain 100 Pokéballs', new PokeballRequirement(100, GameConstants.Pokeball.Pokeball), 0.05);
        AchievementHandler.addAchievement('Fully Stocked', 'Obtain 1,000 Pokéballs', new PokeballRequirement(1000, GameConstants.Pokeball.Pokeball), 0.10);
        AchievementHandler.addAchievement('Maybe just a few more for the bunker', 'Obtain 10,000 Pokéballs', new PokeballRequirement(10000, GameConstants.Pokeball.Pokeball), 0.15);
        AchievementHandler.addAchievement('Doomsday Bunker stocked with Pokeballs!', 'Obtain 100,000 Pokéballs', new PokeballRequirement(100000, GameConstants.Pokeball.Pokeball), 0.20);

        AchievementHandler.addAchievement('ooooo A blue one!', 'Obtain your first Greatball', new PokeballRequirement(1, GameConstants.Pokeball.Greatball), 0.03);
        AchievementHandler.addAchievement('Greatball 2', 'Obtain 10 Greatballs', new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.05);
        AchievementHandler.addAchievement('Greatball 3', 'Obtain 100 Greatballs', new PokeballRequirement(100, GameConstants.Pokeball.Greatball), 0.10);
        AchievementHandler.addAchievement('Greatball 4', 'Obtain 1,000 Greatballs', new PokeballRequirement(1000, GameConstants.Pokeball.Greatball), 0.15);
        AchievementHandler.addAchievement('Greatball 5', 'Obtain 10,000 Greatballs', new PokeballRequirement(10000, GameConstants.Pokeball.Greatball), 0.20);
        AchievementHandler.addAchievement('Greatball 6', 'Obtain 100,000 Greatballs', new PokeballRequirement(100000, GameConstants.Pokeball.Greatball), 0.30);

        AchievementHandler.addAchievement('Ultraball 1', 'Obtain your first Ultraball', new PokeballRequirement(1, GameConstants.Pokeball.Ultraball), 0.05);
        AchievementHandler.addAchievement('Ultraball 2', 'Obtain 10 Ultraballs', new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.10);
        AchievementHandler.addAchievement('Ultraball 3', 'Obtain 100 Ultraballs', new PokeballRequirement(100, GameConstants.Pokeball.Ultraball), 0.15);
        AchievementHandler.addAchievement('Ultraball 4', 'Obtain 1,000 Ultraballs', new PokeballRequirement(1000, GameConstants.Pokeball.Ultraball), 0.20);
        AchievementHandler.addAchievement('Ultraball 5', 'Obtain 10,000 Ultraballs', new PokeballRequirement(10000, GameConstants.Pokeball.Ultraball), 0.30);
        AchievementHandler.addAchievement('Ultraball 6', 'Obtain 100,000 Ultraballs', new PokeballRequirement(100000, GameConstants.Pokeball.Ultraball), 0.40);

        AchievementHandler.addAchievement('Masterball 1', 'Obtain your first Masterball', new PokeballRequirement(1, GameConstants.Pokeball.Masterball), 0.20);
        AchievementHandler.addAchievement('Masterball 2', 'Obtain 10 Masterballs', new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.30);
        AchievementHandler.addAchievement('Masterball 3', 'Obtain 100 Masterballs', new PokeballRequirement(100, GameConstants.Pokeball.Masterball), 0.40);

        AchievementHandler.addAchievement('A Few Clicks In', 'Click 10 Times', new ClickRequirement(10, 1), 0.02);
        AchievementHandler.addAchievement('Clicking Pro', 'Click 100 Times', new ClickRequirement(100, 1), 0.05);
        AchievementHandler.addAchievement('Ultra Clicker', 'Click 1,000 Times', new ClickRequirement(1000, 1), 0.10);
        AchievementHandler.addAchievement('Need a new mouse yet?', 'Click 10,000 Times', new ClickRequirement(10000, 1), 0.25);

        for (let i = 1; i <= GameConstants.AMOUNT_OF_ROUTES_KANTO; i++) {

            AchievementHandler.addAchievement(`Route ${i} traveler`, `Defeat 100 Pokémon on route ${i}`, new RouteKillRequirement(100, i), 0.02);
            AchievementHandler.addAchievement(`Route ${i} explorer`, `Defeat 1,000 Pokémon on route ${i}`, new RouteKillRequirement(1000, i), 0.05);
            AchievementHandler.addAchievement(`Route ${i} conqueror`, `Defeat 10,000 Pokémon on route ${i}`, new RouteKillRequirement(10000, i), 0.10);
        }

        for (let i = 0; i < GameConstants.KantoGyms.length; i++) {
            AchievementHandler.addAchievement(`${GameConstants.KantoGyms[i]} Gym tourist`, 'Clear 1 time', new ClearGymRequirement( 1, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoGyms[i]} Gym regular`, 'Clear 10 times', new ClearGymRequirement(10, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoGyms[i]} Gym ruler`, 'Clear 100 times', new ClearGymRequirement( 100, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoGyms[i]} Gym owner`, 'Clear 1,000 times', new ClearGymRequirement(1000, i), 0.01);
        }

        for (let i = 0; i < GameConstants.KantoDungeons.length; i++) {
            AchievementHandler.addAchievement(`${GameConstants.KantoDungeons[i]} visitor`, 'Clear 1 time', new ClearDungeonRequirement(1, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoDungeons[i]} explorer`, 'Clear 10 times', new ClearDungeonRequirement(10, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoDungeons[i]} expert`, 'Clear 100 times', new ClearDungeonRequirement(100, i), 0.01);
            AchievementHandler.addAchievement(`${GameConstants.KantoDungeons[i]} hermit`, 'Clear 1,000 times', new ClearDungeonRequirement(1000, i), 0.01);
        }


        AchievementHandler.maxBonus = AchievementHandler.calculateMaxBonus();

    }
}
