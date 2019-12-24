class QuestHelper{
    public static questList: KnockoutObservableArray<Quest> = ko.observableArray();

    public static generateQuests(level: number, refreshes: number, d: Date) {
        SeededRand.seed(Number( level * (d.getFullYear() + refreshes * 10) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate()));

        const QuestTypes = new Set(GameConstants.QuestTypes);
        for (let i=0; i<GameConstants.QUESTS_PER_SET; i++) {
            let type = SeededRand.fromArray(Array.from(QuestTypes));
            QuestTypes.delete(type);
            let quest = QuestHelper.random(type, i);
            quest.index = i;
            QuestHelper.questList.push(quest);
        }
    }

    public static random(type: string, index: number) {
        let amount, route, region;
        switch (type) {
            case "DefeatPokemons":
                route = SeededRand.intBetween(1, GameConstants.RegionRoute[player.highestRegion()]);
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
                region = SeededRand.intBetween(0, player.highestRegion());
                const gymTown = SeededRand.fromArray(GameConstants.RegionGyms[region]);
                amount = SeededRand.intBetween(5, 20);
                return new DefeatGymQuest(gymTown, amount);
            case "DefeatDungeon":
                // Allow upto highest region
                region = SeededRand.intBetween(0, player.highestRegion());
                const dungeon = SeededRand.fromArray(GameConstants.RegionDungeons[region]);
                amount = SeededRand.intBetween(5, 20);
                return new DefeatDungeonQuest(dungeon, amount);
            case "UsePokeball":
                let possiblePokeballs = [GameConstants.Pokeball.Pokeball, GameConstants.Pokeball.Greatball, GameConstants.Pokeball.Ultraball];
                let pokeball = SeededRand.fromArray(possiblePokeballs);
                amount = SeededRand.intBetween(100, 500);
                return new UsePokeballQuest(pokeball, amount);
            case "UseOakItem":
                let possibleItems = [
                    GameConstants.OakItem.Magic_Ball,
                    GameConstants.OakItem.Amulet_Coin,
                    //GameConstants.OakItem.Poison_Barb,
                    GameConstants.OakItem.Exp_Share,
                    //GameConstants.OakItem.Sprayduck,
                    //GameConstants.OakItem.Shiny_Charm,
                    //GameConstants.OakItem.Blaze_Cassette,
                    //GameConstants.OakItem.Cell_Battery,
                ]
                let oakItem = SeededRand.fromArray(possibleItems);
                amount = SeededRand.intBetween(100, 500);
                return new UseOakItemQuest(oakItem, amount);
            case "HarvestBerriesQuest":
                const possibleBerries = Object.keys(BerryList);
                const berryType = SeededRand.fromArray(possibleBerries);
                amount = SeededRand.intBetween(30, 300);
                return new HarvestBerriesQuest(berryType, amount);
        }
    }

    public static refreshQuests(free: boolean = false) {
        if (free || QuestHelper.canAffordRefresh()) {
            if (!free) {
                player.payMoney(QuestHelper.getRefreshCost())
            }
            player.questRefreshes++;
            QuestHelper.quitAllQuests();
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

    public static loadCurrentQuests(saved: KnockoutObservableArray<any>) {
        for (let i = 0; i < saved().length; i++) {
            QuestHelper.questList()[saved()[i].index].initial(saved()[i].initial());
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

    public static canStartNewQuest(): boolean {
        // Two conditions for starting new quest:
        // 1. Current quests not exceed maximum slots
        // 2. At least one quest is neither completed nor in-progress
        if (player.currentQuests().length >= this.questSlots()()) {
            return false;
        }
        for (let i = 0; i < QuestHelper.questList().length; i++) {
            if (!(player.completedQuestList[i]() || QuestHelper.questList()[i].isCompleted()
                    || QuestHelper.questList()[i].inProgress()())) {
                return true;
            }
        }
        return false;
    }

    public static onQuest(index: number): KnockoutObservable<boolean> {
        return ko.observable(player.currentQuests().map(x => x.index).includes(index));
    }

    public static beginQuest(index: number) {
        if (this.canStartNewQuest()) {
            this.questList()[index].beginQuest();
            player.currentQuests.push({
                index: index,
                initial: this.questList()[index].initial(),
            });
            player.currentQuests.sort((x, y) => x.index - y.index);
        } else {
            Notifier.notify("You cannot start more quests", GameConstants.NotificationOption.danger);
        }
    }

    public static quitAllQuests() {
        let questIndexArr = player.currentQuests().map(x => x.index);
        questIndexArr.forEach(index => {
            this.questList()[index].endQuest();
        });
    }

    // returns true is all quest are completed
    public static allQuestCompleted() {
        for (let questCompleted of player.completedQuestList) {
            if (!questCompleted()) {
                return false;
            }
        }
        return true;
    }

    public static questSlots(): KnockoutComputed<number> {
        return ko.computed(function () {
            // Minimum of 1, Maximum of 4
            return Math.min(4, Math.max(1, player ? Math.floor(player.questLevel / 5) : 1));
        }, this);
    }
}
