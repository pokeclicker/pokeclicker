class QuestHelper{
    public static questList: KnockoutObservableArray<Quest> = ko.observableArray();

    public static generateQuests(level: number, refreshes: number, d: Date) {
        console.log(level, refreshes, d);
        SeededRand.seed(Number( level * (d.getFullYear() + refreshes * 10) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate()));

        for (let i=0; i<GameConstants.QUESTS_PER_SET; i++) {
            let type = SeededRand.fromArray(GameConstants.QuestTypes);
            let quest = QuestHelper.random(type, i);
            quest.index = i;
            QuestHelper.questList.push(quest);
        }
    }

    public static random(type: string, index: number) {
        let amount, route;
        switch (type) {
            case "DefeatPokemons":
                route = SeededRand.intBetween(1, 25);
                amount = SeededRand.intBetween(100, 500);
                return new DefeatPokemonsQuest(route, amount);
            case "CapturePokemons":
                amount = SeededRand.intBetween(100, 500);
                return new CapturePokemonsQuest(amount);
            case "GainMoney":
                amount = SeededRand.intBetween(20000, 60000);
                return new GainMoneyQuest(amount);
            case "GainTokens":
                amount = SeededRand.intBetween(1000, 8000);
                return new GainTokensQuest(amount);
            case "GainShards":
                let possibleTypes = [
                    GameConstants.PokemonType.Normal,
                    GameConstants.PokemonType.Poison,
                    GameConstants.PokemonType.Water,
                    GameConstants.PokemonType.Grass,
                    GameConstants.PokemonType.Flying,
                    GameConstants.PokemonType.Fire,
                    GameConstants.PokemonType.Fighting,
                ];
                let type = SeededRand.fromArray(possibleTypes);
                amount = SeededRand.intBetween(200, 600);
                return new GainShardsQuest(type, amount);
            case "HatchEggs":
                amount = SeededRand.intBetween(1, 30);
                return new HatchEggsQuest(amount);
            case "MineLayers":
                amount = SeededRand.intBetween(1,3);
                return new MineLayersQuest(amount);
            case "CatchShinies":
                return new CatchShiniesQuest(1);
            case "DefeatGym":
                let gymIndex = SeededRand.intBetween(0, GameConstants.Gyms.length - 1);
                amount = SeededRand.intBetween(20, 100);
                return new DefeatGymQuest(gymIndex, amount);
            case "DefeatDungeon":
                let dungeonIndex = SeededRand.intBetween(0, GameConstants.Dungeons.length-1);
                amount = SeededRand.intBetween(20, 100);
                return new DefeatDungeonQuest(dungeonIndex, amount);
            case "UsePokeball":
                let possiblePokeballs = [GameConstants.Pokeball.Pokeball, GameConstants.Pokeball.Greatball, GameConstants.Pokeball.Ultraball];
                let pokeball = SeededRand.fromArray(possiblePokeballs);
                amount = SeededRand.intBetween(100, 500);
                return new UsePokeballQuest(pokeball, amount);
            case "UseOakItem":
                let possibleItems = [
                    GameConstants.OakItem["Magic Ball"],
                    GameConstants.OakItem["Amulet Coin"],
                    //GameConstants.OakItem["Poison Barb"],
                    GameConstants.OakItem["Exp Share"],
                    //GameConstants.OakItem["Sprayduck"],
                    //GameConstants.OakItem["Shiny Charm"],
                    //GameConstants.OakItem["Blaze Cassette"],
                    //GameConstants.OakItem["Cell Battery"],
                ]
                let oakItem = SeededRand.fromArray(possibleItems);
                amount = SeededRand.intBetween(100, 500);
                return new UseOakItemQuest(oakItem, amount);
        }
    }

    public static refreshQuests(free: boolean = false) {
        if (free || QuestHelper.canAffordRefresh()) {
            if (!free) {
                player._money(player._money() - QuestHelper.getRefreshCost());
            }
            player.questRefreshes++;
            QuestHelper.quitQuest();
            QuestHelper.clearQuests();
            QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date())
        } else {
            Notifier.notify("You can't afford to do that!", GameConstants.NotificationOption.danger);
        }
    }

    public static canAffordRefresh(): boolean {
        return player.money >= QuestHelper.getRefreshCost();
    }

    public static clearQuests() {
        // Empty quest list and reset completed quests
        QuestHelper.questList.splice(0,GameConstants.QUESTS_PER_SET);
        for (let elem of player.completedQuestList) {
            elem(false);
        }
    }

    // Returns 0 when all quests are complete, ~1 million when none are
    public static getRefreshCost(): number {
        let notComplete = player.completedQuestList.filter((elem) => {return !elem()}).length;
        return Math.floor(250000 * Math.LOG10E * Math.log(Math.pow(notComplete, 4) + 1))
    }

    public static loadCurrentQuest(saved) {
        if (saved !== null) {
            QuestHelper.questList()[saved.index].initial(saved.initial)
        }
    }

    // 1000 xp needed to reach level 2, amount needed for next level increases by 20% of previous level
    public static levelToXP(level: number): number {
        if (level >= 2) {
            // Sum of geometric series
            let a = 1000, r = 1.2, n = level - 1;
            let sum = a * (Math.pow(r, n) - 1) / (r - 1);
            return Math.ceil(sum);
        } else {
            return 0;
        }
    }

    public static xpToLevel(xp: number): number {
        let sum = xp, a = 1000, r = 1.2;
        let n = Math.log(1 + ((r - 1) * sum) / a) / Math.log(r);
        return Math.floor(n + 1);
    }

    public static quitQuest() {
        if (player.currentQuest()) {
            QuestHelper.questList()[player.currentQuest().index].quit();
        }
    }

    public static checkCompletedSet() {
        for (let questCompleted of player.completedQuestList) {
            if (!questCompleted()) {
                return;
            }
        }
        //Only reachable if all quests are completed
        QuestHelper.getCompletionReward();
    }

    private static getCompletionReward() {
        console.log("All quests Completed!")
    }
}