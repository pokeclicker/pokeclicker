class QuestHelper{
    public static questList: KnockoutObservableArray<Quest> = ko.observableArray();

    public static generateQuests(level: number, refreshes: number, d: Date) {
        console.log(level, refreshes, d)
        SeededRand.seed(Number( level * (d.getFullYear() + refreshes * 10) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate()))

        // Empty quest list and reset compeleted quests
        QuestHelper.questList.splice(0,GameConstants.QUESTS_PER_SET);
        for (let elem of player.completedQuestList) {
            elem(false);
        }

        for (let i=0; i<GameConstants.QUESTS_PER_SET; i++) {
            let type = SeededRand.fromArray(GameConstants.QuestTypes);
            let quest = QuestHelper.random(type);
            QuestHelper.questList.push(quest);
        }
    }

    public static random(type: string) {
        let amount, route;
        switch (type) {
            case "DefeatPokemons":
                route = SeededRand.intBetween(1, 25);
                amount = SeededRand.intBetween(100, 500);
                return new DefeatPokemonsQuest(route, amount);
            case "GainMoney":
                amount = SeededRand.intBetween(20000, 60000);
                return new GainMoneyQuest(amount);
            case "HatchEggs":
                amount = SeededRand.intBetween(1, 30);
                return new HatchEggsQuest(amount);
        }
    }

    public static refreshQuests() {
        player.questRefreshes++;
        QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date())
    }
}