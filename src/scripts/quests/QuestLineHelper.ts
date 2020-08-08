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
        const routeTwo = new DefeatPokemonsQuest(2, GameConstants.Region.kanto, 5);
        routeTwo.pointsReward = 30;
        routeTwo.description = 'Defeat 5 Pokémon on route 2. Click route 2 on the map to move there and begin fighting.';
        tutorial.addQuest(routeTwo);

        //Defeat Pewter Gym
        const pewter = new DefeatGymQuest(GameConstants.KantoGyms[0], 1);
        pewter.pointsReward = 40;
        pewter.description = 'Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.';
        tutorial.addQuest(pewter);

        //Buy pokeballs
        const buyPokeballs = new BuyPokeballsQuest(20, GameConstants.Pokeball.Pokeball, 50);
        buyPokeballs.pointsReward = 50;
        buyPokeballs.description = 'Buy 20 pokeballs. You can find these in the Pewter City Shop.';
        tutorial.addQuest(buyPokeballs);

        //Kill 10 on route 3
        const routeThree = new DefeatPokemonsQuest(3, GameConstants.Region.kanto, 10);
        routeThree.pointsReward = 100;
        tutorial.addQuest(routeThree);

        //Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 10, 'Buy the Dungeon ticket from Pewter City Shop.', () => + App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Dungeon_ticket), 0);
        tutorial.addQuest(buyDungeonTicket);

        //Clear Mt Moon dungeon
        const clearMtMoon = new DefeatDungeonQuest(GameConstants.KantoDungeons[2], 1);
        clearMtMoon.pointsReward = 10;
        clearMtMoon.description = 'Gather 75 Dungeon tokens by capturing Pokémon, then clear the Mt. Moon dungeon.';
        tutorial.addQuest(clearMtMoon);

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
        const defeatPsychic = new CustomQuest(500, 0, 'Defeat 500 Psychic type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(defeatPsychic);
        
        // TODO: Unlock Deoxys dungeon or something? instead of just giving the player a Deoxys - Should probably just be a battle frontier reward though
        const deoxysReward = () => {
            App.game.party.gainPokemonById(pokemonMap.Deoxys.id);
        };
        // const reachStage100 = new CustomQuest(100, 10, 'Reach stage 100 in the Battle Frontier', App.game.statistics.battleFrontierHighestStageCompleted, 0, () => {
        //     App.game.party.gainPokemonById(pokemonMap.Deoxys.id);
        // });
        // deoxysQuestLine.addQuest(reachStage100);

        // TODO: remove once battle frontier added
        // Capture 200 Psychic type Pokemon
        const catchPsychic = new CustomQuest(200, deoxysReward, 'Capture 200 Psychic type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(catchPsychic);

        App.game.quests.questLines().push(deoxysQuestLine);
    }

    public static loadQuestLines() {
        this.createTutorial();
        this.createDeoxysQuestLine();
    }
}
