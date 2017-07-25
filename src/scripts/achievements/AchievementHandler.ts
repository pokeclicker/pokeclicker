///<reference path="MoneyRequirement.ts"/>

class AchievementHandler {

    public static achievementList: Achievement[] = [];

    public static checkAchievements() {
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            if (!AchievementHandler.achievementList[i].unlocked) {
                AchievementHandler.achievementList[i].check();
            }
        }
    }

    public static addAchievement(name: string, description: string, property: Requirement, bonus: number) {
        let unlocked: boolean = player.achievementsCompleted[name] == true;
        AchievementHandler.achievementList.push(new Achievement(name, description, property, bonus, unlocked));
    }

    public static calculateMaxBonus() {
        let sum = 0;
        for (let i = 0; i < AchievementHandler.achievementList.length; i++) {
            sum += AchievementHandler.achievementList[i].bonus;
        }
        return sum;
    }

    public static initialize() {
        // TODO invent clever names
        AchievementHandler.addAchievement("Money 1", "Obtain 100 Pokédollars", new MoneyRequirement(100), 0.05);
        AchievementHandler.addAchievement("Money 2", "Obtain 1,000 Pokédollars", new MoneyRequirement(1000), 0.10);
        AchievementHandler.addAchievement("Money 3", "Obtain 10,000 Pokédollars", new MoneyRequirement(10000), 0.15);
        AchievementHandler.addAchievement("Money 4", "Obtain 100,000 Pokédollars", new MoneyRequirement(100000), 0.20);
        AchievementHandler.addAchievement("Money 5", "Obtain 1,000,000 Pokédollars", new MoneyRequirement(1000000), 0.25);
        AchievementHandler.addAchievement("Money 6", "Obtain 10,000,000 Pokédollars", new MoneyRequirement(10000000), 0.5);

        AchievementHandler.addAchievement("Pokemons 1", "Capture your first Pokémon", new CaughtPokemonRequirement(1), 0.01);
        AchievementHandler.addAchievement("Pokemons 2", "Capture 10 unique Pokémons", new CaughtPokemonRequirement(10), 0.02);
        AchievementHandler.addAchievement("Pokemons 3", "Capture 20 unique Pokémons", new CaughtPokemonRequirement(20), 0.03);
        AchievementHandler.addAchievement("Pokemons 4", "Capture 30 unique Pokémons", new CaughtPokemonRequirement(30), 0.04);
        AchievementHandler.addAchievement("Pokemons 5", "Capture 40 unique Pokémons", new CaughtPokemonRequirement(40), 0.05);
        AchievementHandler.addAchievement("Pokemons 6", "Capture 50 unique Pokémons", new CaughtPokemonRequirement(50), 0.10);
        AchievementHandler.addAchievement("Pokemons 7", "Capture 75 unique Pokémons", new CaughtPokemonRequirement(75), 0.15);
        AchievementHandler.addAchievement("Pokemons 8", "Capture 100 unique Pokémons", new CaughtPokemonRequirement(100), 0.20);
        AchievementHandler.addAchievement("Pokemons 9", "Complete the Kanto Pokédex!", new CaughtPokemonRequirement(151), 0.50);

        AchievementHandler.addAchievement("Pokeball 1", "Get your first Pokéball", new PokeballRequirement(1, GameConstants.Pokeball.Pokeball), 0.01);
        AchievementHandler.addAchievement("Pokeball 2", "Get 10 Pokéballs", new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.03);
        AchievementHandler.addAchievement("Pokeball 3", "Get 100 Pokéballs", new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.05);
        AchievementHandler.addAchievement("Pokeball 4", "Get 1000 Pokéballs", new PokeballRequirement(1000, GameConstants.Pokeball.Pokeball), 0.10);
        AchievementHandler.addAchievement("Pokeball 5", "Get 10,000 Pokéballs", new PokeballRequirement(10000, GameConstants.Pokeball.Pokeball), 0.15);
        AchievementHandler.addAchievement("Pokeball 6", "Get 100,000 Pokéballs", new PokeballRequirement(100000, GameConstants.Pokeball.Pokeball), 0.20);

        AchievementHandler.addAchievement("Greatball 1", "Get your first Greatball", new PokeballRequirement(1, GameConstants.Pokeball.Greatball), 0.03);
        AchievementHandler.addAchievement("Greatball 2", "Get 10 Greatballs", new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.05);
        AchievementHandler.addAchievement("Greatball 3", "Get 100 Greatballs", new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.10);
        AchievementHandler.addAchievement("Greatball 4", "Get 1000 Greatballs", new PokeballRequirement(1000, GameConstants.Pokeball.Greatball), 0.15);
        AchievementHandler.addAchievement("Greatball 5", "Get 10,000 Greatballs", new PokeballRequirement(10000, GameConstants.Pokeball.Greatball), 0.20);
        AchievementHandler.addAchievement("Greatball 6", "Get 100,000 Greatballs", new PokeballRequirement(100000, GameConstants.Pokeball.Greatball), 0.30);

        AchievementHandler.addAchievement("Ultraball 1", "Get your first Ultraball", new PokeballRequirement(1, GameConstants.Pokeball.Ultraball), 0.05);
        AchievementHandler.addAchievement("Ultraball 2", "Get 10 Ultraballs", new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.10);
        AchievementHandler.addAchievement("Ultraball 3", "Get 100 Ultraballs", new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.15);
        AchievementHandler.addAchievement("Ultraball 4", "Get 1000 Ultraballs", new PokeballRequirement(1000, GameConstants.Pokeball.Ultraball), 0.20);
        AchievementHandler.addAchievement("Ultraball 5", "Get 10,000 Ultraballs", new PokeballRequirement(10000, GameConstants.Pokeball.Ultraball), 0.30);
        AchievementHandler.addAchievement("Ultraball 6", "Get 100,000 Ultraballs", new PokeballRequirement(100000, GameConstants.Pokeball.Ultraball), 0.40);

        AchievementHandler.addAchievement("Masterball 1", "Get your first Masterball", new PokeballRequirement(1, GameConstants.Pokeball.Masterball), 0.10);
        AchievementHandler.addAchievement("Masterball 2", "Get 10 Masterballs", new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.15);
        AchievementHandler.addAchievement("Masterball 3", "Get 100 Masterballs", new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.20);
        AchievementHandler.addAchievement("Masterball 4", "Get 1000 Masterballs", new PokeballRequirement(1000, GameConstants.Pokeball.Masterball), 0.30);
        AchievementHandler.addAchievement("Masterball 5", "Get 10,000 Masterballs", new PokeballRequirement(10000, GameConstants.Pokeball.Masterball), 0.40);
        AchievementHandler.addAchievement("Masterball 6", "Get 100,000 Masterballs", new PokeballRequirement(100000, GameConstants.Pokeball.Masterball), 0.50);

    }
}
