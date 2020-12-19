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
                route = SeededRand.fromArray(Routes.getRoutesByRegion(region)).number;
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
                const berryRegionBound = Farming.genBounds[Math.min(player.highestRegion(), GameConstants.Region.unova)];
                // Getting Berries that can be grown in less than half a day
                const berryTypes = GameHelper.enumNumbers(BerryType).filter(berry => {
                    // Needs to be a berry that can be planted
                    return berry != BerryType.None
                    // Need to be able obtain within our highest region
                    && berry < berryRegionBound
                    // Needs to take less than 6 hours to fully grow
                    && App.game.farming.berryData[berry].growthTime[3] < 6 * 60 * 60;
                });

                const berryType = SeededRand.fromArray(berryTypes);
                // Calculating balanced amount based on BerryType
                // Hard limits are between 10 and 300
                // Additional limits based on growing on all 25 plots non-stop in 3 hours
                const minAmt = 30;
                let maxAmt = 300;

                const totalGrowths = Math.floor((3 * 60 * 60 * 25) / App.game.farming.berryData[berryType].growthTime[3]);
                const totalBerries = totalGrowths * App.game.farming.berryData[berryType].harvestAmount;
                maxAmt = Math.min(maxAmt, totalBerries);

                amount = SeededRand.intBetween(minAmt, maxAmt);
                return new HarvestBerriesQuest(berryType, amount);
        }
    }

    public static highestOneShotRoute(region: GameConstants.Region): number {
        const routes = Routes.getRoutesByRegion(region).map(r => r.number);
        const first = Math.min(...routes);
        const last = Math.max(...routes);
        const attack = Math.max(1, App.game.party.calculatePokemonAttack(PokemonType.None, PokemonType.None, false, region, true, false, false));

        for (let route = last; route >= first; route--) {
            if (PokemonFactory.routeHealth(route, region) < attack) {
                return route;
            }
        }

        return 0;
    }
}
