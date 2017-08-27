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
        let unlocked: boolean = player.achievementsCompleted[name];
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
        
        AchievementHandler.addAchievement("Token 1", "Obtain 100 Dungeon Tokens", new TokenRequirement(100), 0.05);
        AchievementHandler.addAchievement("Token 2", "Obtain 1000 Dungeon Tokens", new TokenRequirement(1000), 0.10);
        AchievementHandler.addAchievement("Token 3", "Obtain 10,000 Dungeon Tokens", new TokenRequirement(10000), 0.15);
        AchievementHandler.addAchievement("Token 4", "Obtain 100,000 Dungeon Tokens", new TokenRequirement(100000), 0.20);
        AchievementHandler.addAchievement("Token 5", "Obtain 1,000,000 Dungeon Tokens", new TokenRequirement(1000000), 0.25);
        
        AchievementHandler.addAchievement("Attack 1", "Have 100 Attack", new AttackRequirement(100), 0.05);
        AchievementHandler.addAchievement("Attack 2", "Have 1000 Attack", new AttackRequirement(1000), 0.10);
        AchievementHandler.addAchievement("Attack 3", "Have 5000 Attack", new AttackRequirement(5000), 0.15);
        AchievementHandler.addAchievement("Attack 4", "Have 10,000 Attack", new AttackRequirement(10000), 0.20);
        AchievementHandler.addAchievement("Attack 5", "Have 25,000 Attack", new AttackRequirement(25000), 0.25);
        
        AchievementHandler.addAchievement("Diamond 1", "Obtain 100 Diamonds", new DiamondRequirement(100), 0.05);
        AchievementHandler.addAchievement("Diamond 2", "Obtain 1000 Diamonds", new DiamondRequirement(1000), 0.15);
        AchievementHandler.addAchievement("Diamond 3", "Obtain 10,000 Diamonds", new DiamondRequirement(10000), 0.25);
        
        AchievementHandler.addAchievement("Capture 1", "Capture 100 Pokemon", new CapturedRequirement(100), 0.05);
        AchievementHandler.addAchievement("Capture 2", "Capture 1000 Pokemon", new CapturedRequirement(1000), 0.10);
        AchievementHandler.addAchievement("Capture 3", "Capture 10,000 Pokemon", new CapturedRequirement(10000), 0.15);
        AchievementHandler.addAchievement("Capture 4", "Capture 100,000 Pokemon", new CapturedRequirement(100000), 0.25);
        AchievementHandler.addAchievement("Capture 5", "Capture 1,000,000 Pokemon", new CapturedRequirement(1000000), 0.50);

        AchievementHandler.addAchievement("Defeat 1", "Defeat 100 Pokemon", new DefeatedRequirement(100), 0.05);
        AchievementHandler.addAchievement("Defeat 2", "Defeat 1000 Pokemon", new DefeatedRequirement(1000), 0.10);
        AchievementHandler.addAchievement("Defeat 3", "Defeat 10,000 Pokemon", new DefeatedRequirement(10000), 0.15);
        AchievementHandler.addAchievement("Defeat 4", "Defeat 100,000 Pokemon", new DefeatedRequirement(100000), 0.25);
        AchievementHandler.addAchievement("Defeat 5", "Defeat 1,000,000 Pokemon", new DefeatedRequirement(1000000), 0.50);
        
        AchievementHandler.addAchievement("Pokemons 1", "Capture your first Pokémon", new CaughtPokemonRequirement(1), 0.01);
        AchievementHandler.addAchievement("Pokemons 2", "Capture 10 unique Pokémons", new CaughtPokemonRequirement(10), 0.02);
        AchievementHandler.addAchievement("Pokemons 3", "Capture 20 unique Pokémons", new CaughtPokemonRequirement(20), 0.03);
        AchievementHandler.addAchievement("Pokemons 4", "Capture 30 unique Pokémons", new CaughtPokemonRequirement(30), 0.04);
        AchievementHandler.addAchievement("Pokemons 5", "Capture 40 unique Pokémons", new CaughtPokemonRequirement(40), 0.05);
        AchievementHandler.addAchievement("Pokemons 6", "Capture 50 unique Pokémons", new CaughtPokemonRequirement(50), 0.10);
        AchievementHandler.addAchievement("Pokemons 7", "Capture 75 unique Pokémons", new CaughtPokemonRequirement(75), 0.15);
        AchievementHandler.addAchievement("Pokemons 8", "Capture 100 unique Pokémons", new CaughtPokemonRequirement(100), 0.20);
        AchievementHandler.addAchievement("Pokemons 9", "Complete the Kanto Pokédex!", new CaughtPokemonRequirement(151), 0.50);

        AchievementHandler.addAchievement("Shiny 1", "Capture your first Shiny", new ShinyPokemonRequirement(1), 0.03);
        AchievementHandler.addAchievement("Shiny 2", "Capture 10 unique Shinies", new ShinyPokemonRequirement(10), 0.06);
        AchievementHandler.addAchievement("Shiny 3", "Capture 20 unique Shinies", new ShinyPokemonRequirement(20), 0.09);
        AchievementHandler.addAchievement("Shiny 4", "Capture 30 unique Shinies", new ShinyPokemonRequirement(30), 0.12);
        AchievementHandler.addAchievement("Shiny 5", "Capture 40 unique Shinies", new ShinyPokemonRequirement(40), 0.15);
        AchievementHandler.addAchievement("Shiny 6", "Capture 50 unique Shinies", new ShinyPokemonRequirement(50), 0.30);
        AchievementHandler.addAchievement("Shiny 7", "Capture 75 unique Shinies", new ShinyPokemonRequirement(75), 0.45);
        AchievementHandler.addAchievement("Shiny 8", "Capture 100 unique Shinies", new ShinyPokemonRequirement(100), 0.60);
        AchievementHandler.addAchievement("Shiny 9", "Complete the Kanto Pokédex shiny!", new ShinyPokemonRequirement(151), 1.50);


        AchievementHandler.addAchievement("Pokeball 1", "Get your first Pokéball", new PokeballRequirement(1, GameConstants.Pokeball.Pokeball), 0.01);
        AchievementHandler.addAchievement("Pokeball 2", "Get 10 Pokéballs", new PokeballRequirement(10, GameConstants.Pokeball.Pokeball), 0.03);
        AchievementHandler.addAchievement("Pokeball 3", "Get 100 Pokéballs", new PokeballRequirement(100, GameConstants.Pokeball.Pokeball), 0.05);
        AchievementHandler.addAchievement("Pokeball 4", "Get 1000 Pokéballs", new PokeballRequirement(1000, GameConstants.Pokeball.Pokeball), 0.10);
        AchievementHandler.addAchievement("Pokeball 5", "Get 10,000 Pokéballs", new PokeballRequirement(10000, GameConstants.Pokeball.Pokeball), 0.15);
        AchievementHandler.addAchievement("Pokeball 6", "Get 100,000 Pokéballs", new PokeballRequirement(100000, GameConstants.Pokeball.Pokeball), 0.20);

        AchievementHandler.addAchievement("Greatball 1", "Get your first Greatball", new PokeballRequirement(1, GameConstants.Pokeball.Greatball), 0.03);
        AchievementHandler.addAchievement("Greatball 2", "Get 10 Greatballs", new PokeballRequirement(10, GameConstants.Pokeball.Greatball), 0.05);
        AchievementHandler.addAchievement("Greatball 3", "Get 100 Greatballs", new PokeballRequirement(100, GameConstants.Pokeball.Greatball), 0.10);
        AchievementHandler.addAchievement("Greatball 4", "Get 1000 Greatballs", new PokeballRequirement(1000, GameConstants.Pokeball.Greatball), 0.15);
        AchievementHandler.addAchievement("Greatball 5", "Get 10,000 Greatballs", new PokeballRequirement(10000, GameConstants.Pokeball.Greatball), 0.20);
        AchievementHandler.addAchievement("Greatball 6", "Get 100,000 Greatballs", new PokeballRequirement(100000, GameConstants.Pokeball.Greatball), 0.30);

        AchievementHandler.addAchievement("Ultraball 1", "Get your first Ultraball", new PokeballRequirement(1, GameConstants.Pokeball.Ultraball), 0.05);
        AchievementHandler.addAchievement("Ultraball 2", "Get 10 Ultraballs", new PokeballRequirement(10, GameConstants.Pokeball.Ultraball), 0.10);
        AchievementHandler.addAchievement("Ultraball 3", "Get 100 Ultraballs", new PokeballRequirement(100, GameConstants.Pokeball.Ultraball), 0.15);
        AchievementHandler.addAchievement("Ultraball 4", "Get 1000 Ultraballs", new PokeballRequirement(1000, GameConstants.Pokeball.Ultraball), 0.20);
        AchievementHandler.addAchievement("Ultraball 5", "Get 10,000 Ultraballs", new PokeballRequirement(10000, GameConstants.Pokeball.Ultraball), 0.30);
        AchievementHandler.addAchievement("Ultraball 6", "Get 100,000 Ultraballs", new PokeballRequirement(100000, GameConstants.Pokeball.Ultraball), 0.40);

        AchievementHandler.addAchievement("Masterball 1", "Get your first Masterball", new PokeballRequirement(1, GameConstants.Pokeball.Masterball), 0.10);
        AchievementHandler.addAchievement("Masterball 2", "Get 10 Masterballs", new PokeballRequirement(10, GameConstants.Pokeball.Masterball), 0.15);
        AchievementHandler.addAchievement("Masterball 3", "Get 100 Masterballs", new PokeballRequirement(100, GameConstants.Pokeball.Masterball), 0.20);
        AchievementHandler.addAchievement("Masterball 4", "Get 1000 Masterballs", new PokeballRequirement(1000, GameConstants.Pokeball.Masterball), 0.30);
        AchievementHandler.addAchievement("Masterball 5", "Get 10,000 Masterballs", new PokeballRequirement(10000, GameConstants.Pokeball.Masterball), 0.40);
        AchievementHandler.addAchievement("Masterball 6", "Get 100,000 Masterballs", new PokeballRequirement(100000, GameConstants.Pokeball.Masterball), 0.50);

        AchievementHandler.addAchievement("Click 1", "Click 10 Times", new ClickRequirement(10, 1), 0.02);
        AchievementHandler.addAchievement("Clcik 2", "Click 100 Times", new ClickRequirement(100, 1), 0.05);
        AchievementHandler.addAchievement("Click 3", "Click 1000 Times", new ClickRequirement(1000, 1), 0.10);
        AchievementHandler.addAchievement("Click 4", "Click 10000 Times", new ClickRequirement(10000, 1), 0.25);

        AchievementHandler.addAchievement("Route 1-1", "Get 100 kills on route 1", new RouteKillRequirement(100, 1), 0.02);
        AchievementHandler.addAchievement("Route 1-2", "Get 1000 kills on route 1", new RouteKillRequirement(1000, 1), 0.05);
        AchievementHandler.addAchievement("Route 1-3", "Get 10000 kills on route 1", new RouteKillRequirement(10000, 1), 0.10);
        AchievementHandler.addAchievement("Route 2-1", "Get 100 kills on route 2", new RouteKillRequirement(100, 2), 0.02);
        AchievementHandler.addAchievement("Route 2-2", "Get 1000 kills on route 2", new RouteKillRequirement(1000, 2), 0.05);
        AchievementHandler.addAchievement("Route 2-3", "Get 10000 kills on route 2", new RouteKillRequirement(10000, 2), 0.10);
        AchievementHandler.addAchievement("Route 3-1", "Get 100 kills on route 3", new RouteKillRequirement(100, 3), 0.02);
        AchievementHandler.addAchievement("Route 3-2", "Get 1000 kills on route 3", new RouteKillRequirement(1000, 3), 0.05);
        AchievementHandler.addAchievement("Route 3-3", "Get 10000 kills on route 3", new RouteKillRequirement(10000, 3), 0.10);
        AchievementHandler.addAchievement("Route 4-1", "Get 100 kills on route 4", new RouteKillRequirement(100, 4), 0.02);
        AchievementHandler.addAchievement("Route 4-2", "Get 1000 kills on route 4", new RouteKillRequirement(1000, 4), 0.05);
        AchievementHandler.addAchievement("Route 4-3", "Get 10000 kills on route 4", new RouteKillRequirement(10000, 4), 0.10);
        AchievementHandler.addAchievement("Route 5-1", "Get 100 kills on route 5", new RouteKillRequirement(100, 5), 0.02);
        AchievementHandler.addAchievement("Route 5-2", "Get 1000 kills on route 5", new RouteKillRequirement(1000, 5), 0.05);
        AchievementHandler.addAchievement("Route 5-3", "Get 10000 kills on route 5", new RouteKillRequirement(10000, 5), 0.10);
        AchievementHandler.addAchievement("Route 6-1", "Get 100 kills on route 6", new RouteKillRequirement(100, 6), 0.02);
        AchievementHandler.addAchievement("Route 6-2", "Get 1000 kills on route 6", new RouteKillRequirement(1000, 6), 0.05);
        AchievementHandler.addAchievement("Route 6-3", "Get 10000 kills on route 6", new RouteKillRequirement(10000, 6), 0.10);
        AchievementHandler.addAchievement("Route 7-1", "Get 100 kills on route 7", new RouteKillRequirement(100, 7), 0.02);
        AchievementHandler.addAchievement("Route 7-2", "Get 1000 kills on route 7", new RouteKillRequirement(1000, 7), 0.05);
        AchievementHandler.addAchievement("Route 7-3", "Get 10000 kills on route 7", new RouteKillRequirement(10000, 7), 0.10);
        AchievementHandler.addAchievement("Route 8-1", "Get 100 kills on route 8", new RouteKillRequirement(100, 8), 0.02);
        AchievementHandler.addAchievement("Route 8-2", "Get 1000 kills on route 8", new RouteKillRequirement(1000, 8), 0.05);
        AchievementHandler.addAchievement("Route 8-3", "Get 10000 kills on route 8", new RouteKillRequirement(10000, 8), 0.10);
        AchievementHandler.addAchievement("Route 9-1", "Get 100 kills on route 9", new RouteKillRequirement(100, 9), 0.02);
        AchievementHandler.addAchievement("Route 9-2", "Get 1000 kills on route 9", new RouteKillRequirement(1000, 9), 0.05);
        AchievementHandler.addAchievement("Route 9-3", "Get 10000 kills on route 9", new RouteKillRequirement(10000, 9), 0.10);
        AchievementHandler.addAchievement("Route 10-1", "Get 100 kills on route 10", new RouteKillRequirement(100, 10), 0.02);
        AchievementHandler.addAchievement("Route 10-2", "Get 1000 kills on route 10", new RouteKillRequirement(1000, 10), 0.05);
        AchievementHandler.addAchievement("Route 10-3", "Get 10000 kills on route 10", new RouteKillRequirement(10000, 10), 0.10);
        AchievementHandler.addAchievement("Route 11-1", "Get 100 kills on route 11", new RouteKillRequirement(100, 11), 0.02);
        AchievementHandler.addAchievement("Route 11-2", "Get 1000 kills on route 11", new RouteKillRequirement(1000, 11), 0.05);
        AchievementHandler.addAchievement("Route 11-3", "Get 10000 kills on route 11", new RouteKillRequirement(10000, 11), 0.10);
        AchievementHandler.addAchievement("Route 12-1", "Get 100 kills on route 12", new RouteKillRequirement(100, 12), 0.02);
        AchievementHandler.addAchievement("Route 12-2", "Get 1000 kills on route 12", new RouteKillRequirement(1000, 12), 0.05);
        AchievementHandler.addAchievement("Route 12-3", "Get 10000 kills on route 12", new RouteKillRequirement(10000, 12), 0.10);
        AchievementHandler.addAchievement("Route 13-1", "Get 100 kills on route 13", new RouteKillRequirement(100, 13), 0.02);
        AchievementHandler.addAchievement("Route 13-2", "Get 1000 kills on route 13", new RouteKillRequirement(1000, 13), 0.05);
        AchievementHandler.addAchievement("Route 13-3", "Get 10000 kills on route 13", new RouteKillRequirement(10000, 13), 0.10);
        AchievementHandler.addAchievement("Route 14-1", "Get 100 kills on route 14", new RouteKillRequirement(100, 14), 0.02);
        AchievementHandler.addAchievement("Route 414-2", "Get 1000 kills on route 14", new RouteKillRequirement(1000, 14), 0.05);
        AchievementHandler.addAchievement("Route 14-3", "Get 10000 kills on route 14", new RouteKillRequirement(10000, 14), 0.10);
        AchievementHandler.addAchievement("Route 15-1", "Get 100 kills on route 15", new RouteKillRequirement(100, 15), 0.02);
        AchievementHandler.addAchievement("Route 15-2", "Get 1000 kills on route 15", new RouteKillRequirement(1000, 15), 0.05);
        AchievementHandler.addAchievement("Route 15-3", "Get 10000 kills on route 15", new RouteKillRequirement(10000, 15), 0.10);
        AchievementHandler.addAchievement("Route 16-1", "Get 100 kills on route 16", new RouteKillRequirement(100, 16), 0.02);
        AchievementHandler.addAchievement("Route 16-2", "Get 1000 kills on route 16", new RouteKillRequirement(1000, 16), 0.05);
        AchievementHandler.addAchievement("Route 16-3", "Get 10000 kills on route 16", new RouteKillRequirement(10000, 16), 0.10);
        AchievementHandler.addAchievement("Route 17-1", "Get 100 kills on route 17", new RouteKillRequirement(100, 17), 0.02);
        AchievementHandler.addAchievement("Route 17-2", "Get 1000 kills on route 17", new RouteKillRequirement(1000, 17), 0.05);
        AchievementHandler.addAchievement("Route 17-3", "Get 10000 kills on route 17", new RouteKillRequirement(10000, 17), 0.10);
        AchievementHandler.addAchievement("Route 18-1", "Get 100 kills on route 18", new RouteKillRequirement(100, 18), 0.02);
        AchievementHandler.addAchievement("Route 18-2", "Get 1000 kills on route 18", new RouteKillRequirement(1000, 18), 0.05);
        AchievementHandler.addAchievement("Route 18-3", "Get 10000 kills on route 18", new RouteKillRequirement(10000, 18), 0.10);
        AchievementHandler.addAchievement("Route 19-1", "Get 100 kills on route 19", new RouteKillRequirement(100, 19), 0.02);
        AchievementHandler.addAchievement("Route 19-2", "Get 1000 kills on route 19", new RouteKillRequirement(1000, 19), 0.05);
        AchievementHandler.addAchievement("Route 19-3", "Get 10000 kills on route 19", new RouteKillRequirement(10000, 19), 0.10);
        AchievementHandler.addAchievement("Route 20-1", "Get 100 kills on route 20", new RouteKillRequirement(100, 20), 0.02);
        AchievementHandler.addAchievement("Route 20-2", "Get 1000 kills on route 20", new RouteKillRequirement(1000, 20), 0.05);
        AchievementHandler.addAchievement("Route 20-3", "Get 10000 kills on route 20", new RouteKillRequirement(10000, 20), 0.10);
        AchievementHandler.addAchievement("Route 21-1", "Get 100 kills on route 21", new RouteKillRequirement(100, 21), 0.02);
        AchievementHandler.addAchievement("Route 21-2", "Get 1000 kills on route 21", new RouteKillRequirement(1000, 21), 0.05);
        AchievementHandler.addAchievement("Route 21-3", "Get 10000 kills on route 21", new RouteKillRequirement(10000, 21), 0.10);
        AchievementHandler.addAchievement("Route 22-1", "Get 100 kills on route 22", new RouteKillRequirement(100, 22), 0.02);
        AchievementHandler.addAchievement("Route 22-2", "Get 1000 kills on route 22", new RouteKillRequirement(1000, 22), 0.05);
        AchievementHandler.addAchievement("Route 22-3", "Get 10000 kills on route 22", new RouteKillRequirement(10000, 22), 0.10);
        AchievementHandler.addAchievement("Route 23-1", "Get 100 kills on route 23", new RouteKillRequirement(100, 23), 0.02);
        AchievementHandler.addAchievement("Route 23-2", "Get 1000 kills on route 23", new RouteKillRequirement(1000, 23), 0.05);
        AchievementHandler.addAchievement("Route 23-3", "Get 10000 kills on route 23", new RouteKillRequirement(10000, 23), 0.10);
        AchievementHandler.addAchievement("Route 24-1", "Get 100 kills on route 24", new RouteKillRequirement(100, 24), 0.02);
        AchievementHandler.addAchievement("Route 24-2", "Get 1000 kills on route 24", new RouteKillRequirement(1000, 24), 0.05);
        AchievementHandler.addAchievement("Route 24-3", "Get 10000 kills on route 24", new RouteKillRequirement(10000, 24), 0.10);
        AchievementHandler.addAchievement("Route 25-1", "Get 100 kills on route 25", new RouteKillRequirement(100, 25), 0.02);
        AchievementHandler.addAchievement("Route 25-2", "Get 1000 kills on route 25", new RouteKillRequirement(1000, 25), 0.05);
        AchievementHandler.addAchievement("Route 25-3", "Get 10000 kills on route 25", new RouteKillRequirement(10000, 25), 0.10);

    }
}
