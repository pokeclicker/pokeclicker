class QuestLineHelper {
    public static createTutorial() {
        const tutorial = new QuestLine('Tutorial Quests', 'A short set of quests to get you going');

        //Defeat Starter
        const defeatStarter = new CapturePokemonsQuest(1);
        //Capture pokemon because start sequence resets route 1 kills to 0, making this quest think it is incomplete
        defeatStarter.pointsReward = 10;
        defeatStarter.description = 'Defeat the Pokémon. Click to deal damage';
        tutorial.addQuest(defeatStarter);

        //Capture 1 pokemon
        const captureOne = new CapturePokemonsQuest(1);
        captureOne.pointsReward = 20;
        captureOne.description = 'Capture 1 Pokémon. When you defeat a Pokémon, a pokeball is thrown and you have a chance to capture it.';
        tutorial.addQuest(captureOne);

        //Kill 5 on route 2
        const routeTwo = new DefeatPokemonsQuest(2, GameConstants.Region.kanto, 10);
        routeTwo.pointsReward = 20;
        routeTwo.description = 'Defeat 10 Pokémon on route 2. Click route 2 on the map to move there and begin fighting.';
        tutorial.addQuest(routeTwo);

        //Buy pokeballs
        const buyPokeballs = new BuyPokeballsQuest(10, GameConstants.Pokeball.Pokeball, 50);
        buyPokeballs.pointsReward = 50;
        buyPokeballs.description = 'Buy 10 pokeballs. You can find these in the Viridian City Shop.';
        tutorial.addQuest(buyPokeballs);

        //Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 10, 'Buy the Dungeon ticket from Viridian City Shop.', () => + App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Dungeon_ticket), 0);
        tutorial.addQuest(buyDungeonTicket);

        //Clear Viridian Forest
        const clearMtMoon = new DefeatDungeonQuest('Viridian Forest', 1);
        clearMtMoon.pointsReward = 50;
        clearMtMoon.description = 'Gather 50 Dungeon tokens by (re)capturing Pokémon, then clear the Viridian Forest dungeon.';
        tutorial.addQuest(clearMtMoon);

        //Defeat Pewter Gym
        const pewter = new DefeatGymQuest(GameConstants.KantoGyms[0], 1);
        pewter.pointsReward = 50;
        pewter.description = 'Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.';
        tutorial.addQuest(pewter);

        App.game.quests.questLines().push(tutorial);
    }

    // Need to check if tutorial is completed before showing the other quests stuff
    public static isTutorialCompleted() {
        return App.game.quests.getQuestLine('Tutorial Quests')?.state() == QuestLineState.ended;
    }

    public static createDeoxysQuestLine() {
        const deoxysQuestLine = new QuestLine('Mystery of Deoxys', 'Discover the mystery of Deoxys');

        // Defeat 50 Pokemon on route 129
        const route129 = new DefeatPokemonsQuest(129, GameConstants.Region.hoenn, 50);
        route129.pointsReward = 0;
        deoxysQuestLine.addQuest(route129);

        // Defeat 500 Psychic type Pokemon
        const psychicShardReward = () => {
            App.game.shards.gainShards(500, PokemonType.Psychic);
            Notifier.notify({ title: deoxysQuestLine.name, message: 'You have gained 500 Psychic shards', type: GameConstants.NotificationOption.success });
        };
        const defeatPsychic = new CustomQuest(500, psychicShardReward, 'Defeat 500 Psychic type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(defeatPsychic);

        // Capture 200 Psychic type Pokemon
        const mindPlateReward = () => {
            const mindPlate = UndergroundItem.list.find(item => item.name == 'Mind Plate');
            if (!mindPlate) {
                return console.error('Unable to find item Mind Plate');
            }
            Underground.gainMineItem(mindPlate.id, 20);
            Notifier.notify({ title: deoxysQuestLine.name, message: `You have gained 20 ${mindPlate.name}s`, type: GameConstants.NotificationOption.success });
        };
        const catchPsychic = new CustomQuest(200, mindPlateReward, 'Capture 200 Psychic type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(catchPsychic);

        // Reach stage 100 in battle frontier
        const reachStage100Reward = () => {
            Notifier.notify({ title: deoxysQuestLine.name, message: 'Quest line completed!<br/><i>You have uncovered the Mystery of Deoxys</i>', type: GameConstants.NotificationOption.success, timeout: 3e4 });
        };
        const reachStage100 = new CustomQuest(100, reachStage100Reward, 'Defeat stage 100 in the Battle Frontier', App.game.statistics.battleFrontierHighestStageCompleted, 0);
        deoxysQuestLine.addQuest(reachStage100);

        App.game.quests.questLines().push(deoxysQuestLine);
    }

    public static loadQuestLines() {
        this.createTutorial();
        this.createDeoxysQuestLine();
    }
}
