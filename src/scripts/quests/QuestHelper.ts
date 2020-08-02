class QuestHelper {
    public static questList: KnockoutObservableArray<Quest> = ko.observableArray();

    public static generateQuests(level: number, refreshes: number, d: Date) {
        SeededRand.seed(Number(level * (d.getFullYear() + refreshes * 10) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate()));

        const QuestTypes = new Set(GameConstants.QuestTypes);
        for (let i = 0; i < GameConstants.QUESTS_PER_SET; i++) {
            const type = SeededRand.fromArray(Array.from(QuestTypes));
            QuestTypes.delete(type);
            const quest = QuestHelper.random(type, i);
            quest.index = i;
            QuestHelper.questList.push(quest);
        }
    }

    public static random(type: string, index: number) {
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

    public static refreshQuests(free = false) {
        if (free || QuestHelper.canAffordRefresh()) {
            if (!free) {
                App.game.wallet.loseAmount(QuestHelper.getRefreshCost());
            }
            player.questRefreshes++;
            QuestHelper.quitAllQuests();
            QuestHelper.clearQuests();
            QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date());
        } else {
            Notifier.notify({ message: "You can't afford to do that!", type: GameConstants.NotificationOption.danger });
        }
    }

    public static canAffordRefresh(): boolean {
        return App.game.wallet.hasAmount(this.getRefreshCost());
    }

    public static clearQuests() {
        // Empty quest list and reset completed quests
        QuestHelper.questList.splice(0, GameConstants.QUESTS_PER_SET);
        for (const elem of player.completedQuestList) {
            elem(false);
        }
    }

    // Returns 0 when all quests are complete, ~1 million when none are
    public static getRefreshCost(): Amount {
        const notComplete = player.completedQuestList.filter((elem) => {
            return !elem();
        }).length;
        return new Amount(Math.floor(250000 * Math.LOG10E * Math.log(Math.pow(notComplete, 4) + 1)), GameConstants.Currency.money);
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
            const a = 1000, r = 1.2, n = level - 1;
            const sum = a * (Math.pow(r, n) - 1) / (r - 1);
            return Math.ceil(sum);
        } else {
            return 0;
        }
    }

    public static xpToLevel(xp: number): number {
        const sum = xp, a = 1000, r = 1.2;
        const n = Math.log(1 + ((r - 1) * sum) / a) / Math.log(r);
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
            Notifier.notify({ message: 'You cannot start more quests', type: GameConstants.NotificationOption.danger });
        }
    }

    public static quitAllQuests() {
        const questIndexArr = player.currentQuests().map(x => x.index);
        questIndexArr.forEach(index => {
            this.questList()[index].endQuest();
        });
    }

    // returns true is all quest are completed
    public static allQuestCompleted() {
        for (const questCompleted of player.completedQuestList) {
            if (!questCompleted()) {
                return false;
            }
        }
        return true;
    }

    public static questSlots(): KnockoutComputed<number> {
        return ko.pureComputed(function () {
            // Minimum of 1, Maximum of 4
            return Math.min(4, Math.max(1, player ? Math.floor(player.questLevel / 5) : 1));
        }, this);
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
