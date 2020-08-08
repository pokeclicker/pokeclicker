class QuestHelper {
    public static generateQuestList(seed: number, amount = 10, uniqueQuestTypes = true) {
        const quests = [];

        SeededRand.seed(+seed);

        const QuestTypes = new Set(GameConstants.QuestTypes);
        for (let i = 0; i < amount; i++) {
            const type = SeededRand.fromArray(Array.from(QuestTypes));
            if (uniqueQuestTypes) {
                QuestTypes.delete(type);
            }
            const quest = QuestHelper.random(type);
            quest.index = i;
            quests.push(quest);
        }
        return quests;
    }

    public static random(type: string) {
        let amount, route, region;
        switch (type) {
            case 'DefeatPokemons':
                region = SeededRand.intBetween(0, player.highestRegion());
                route = SeededRand.intBetween(GameConstants.RegionRoute[region][0], GameConstants.RegionRoute[region][1]);
                amount = SeededRand.intBetween(100, 500);
                return new DefeatPokemonsQuest(route, region, amount);
            case 'CapturePokemons':
                amount = SeededRand.intBetween(100, 500);
                return new CapturePokemonsQuest(amount);
            case 'GainMoney':
                amount = SeededRand.intBetween(20000, 60000);
                return new GainMoneyQuest(amount);
            case 'GainTokens':
                amount = SeededRand.intBetween(1000, 8000);
                return new GainTokensQuest(amount);
            case 'GainShards':
                const possibleTypes = [
                    PokemonType.Normal,
                    PokemonType.Poison,
                    PokemonType.Water,
                    PokemonType.Grass,
                    PokemonType.Flying,
                    PokemonType.Fire,
                    PokemonType.Fighting,
                ];
                const type = SeededRand.fromArray(possibleTypes);
                amount = SeededRand.intBetween(200, 600);
                return new GainShardsQuest(type, amount);
            case 'HatchEggs':
                amount = SeededRand.intBetween(1, 30);
                return new HatchEggsQuest(amount);
            case 'MineLayers':
                amount = SeededRand.intBetween(1, 3);
                return new MineLayersQuest(amount);
            case 'CatchShinies':
                return new CatchShiniesQuest(1);
            case 'DefeatGym':
                region = SeededRand.intBetween(0, player.highestRegion());
                const gymTown = SeededRand.fromArray(GameConstants.RegionGyms[region]);
                amount = SeededRand.intBetween(5, 20);
                return new DefeatGymQuest(gymTown, amount);
            case 'DefeatDungeon':
                // Allow upto highest region
                region = SeededRand.intBetween(0, player.highestRegion());
                const dungeon = SeededRand.fromArray(GameConstants.RegionDungeons[region]);
                amount = SeededRand.intBetween(5, 20);
                return new DefeatDungeonQuest(dungeon, amount);
            case 'UsePokeball':
                const possiblePokeballs = [GameConstants.Pokeball.Pokeball, GameConstants.Pokeball.Greatball, GameConstants.Pokeball.Ultraball];
                const pokeball = SeededRand.fromArray(possiblePokeballs);
                amount = SeededRand.intBetween(100, 500);
                return new UsePokeballQuest(pokeball, amount);
            case 'UseOakItem':
                const possibleItems = [
                    OakItems.OakItem.Magic_Ball,
                    OakItems.OakItem.Amulet_Coin,
                    //OakItems.OakItem.Poison_Barb,
                    OakItems.OakItem.Exp_Share,
                    //OakItems.OakItem.Sprayduck,
                    //OakItems.OakItem.Shiny_Charm,
                    //OakItems.OakItem.Blaze_Cassette,
                    //OakItems.OakItem.Cell_Battery,
                ];
                const oakItem = SeededRand.fromArray(possibleItems);
                amount = SeededRand.intBetween(100, 500);
                return new UseOakItemQuest(oakItem, amount);
            case 'HarvestBerriesQuest':
                const berryType = SeededRand.fromEnum(BerryType);
                amount = SeededRand.intBetween(30, 300);
                return new HarvestBerriesQuest(berryType, amount);
        }
    }

    public static highestOneShotRoute(region: GameConstants.Region): number {
        const [first, last] = GameConstants.RegionRoute[region];
        const attack = Math.max(1, App.game.party.calculatePokemonAttack());

        for (let route = last; route >= first; route--) {
            if (PokemonFactory.routeHealth(route, region) < attack) {
                return route;
            }
        }

        return 0;
    }
}
