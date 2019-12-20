class QuestLineHelper {
    public static tutorial: QuestLine;
    public static tutorialTracker: KnockoutSubscription;
    public static tutorialCompleter: KnockoutSubscription;

    public static createTutorial() {
        this.tutorial = new QuestLine("Tutorial Quests", "A short set of quests to get you going");

        //Defeat Starter
        let defeatStarter = new CapturePokemonsQuest(1);
        //Capture pokemon because start sequence resets route 1 kills to 0, making this quest think it is incomplete
        defeatStarter.pointsReward = 10;
        defeatStarter.description = "Defeat the pokemon. Click to deal damage";
        this.tutorial.addQuest(defeatStarter);

        //Capture 1 pokemon
        let captureOne = new CapturePokemonsQuest(1);
        captureOne.pointsReward = 20;
        captureOne.description = "Capture 1 pokemon. When you defeat a pokemon, a pokeball is thrown and you have a chance to capture it.";
        this.tutorial.addQuest(captureOne);

        //Kill 5 on route 2
        let routeTwo = new DefeatPokemonsQuest(2, 5);
        routeTwo.pointsReward = 30;
        routeTwo.description = "Defeat 5 pokemon on route 2. Click route 2 on the map to move there and begin fighting.";
        this.tutorial.addQuest(routeTwo);

        //Defeat Pewter Gym
        let pewter = new DefeatGymQuest(GameConstants.KantoGyms[0], 1);
        pewter.pointsReward = 40;
        pewter.description = "Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.";
        this.tutorial.addQuest(pewter);

        //Buy pokeballs
        let buyPokeballs = new BuyPokeballsQuest(30, GameConstants.Pokeball.Pokeball, 50);
        buyPokeballs.pointsReward = 50;
        buyPokeballs.description = "Buy 30 pokeballs. You can find these in the Pewter City Shop.";
        this.tutorial.addQuest(buyPokeballs);

        //Kill 10 on route 3
        let routeThree = new DefeatPokemonsQuest(3, 10);
        routeThree.pointsReward = 100;
        this.tutorial.addQuest(routeThree);

        //Buy Dungeon ticket
        let buyDungeonTicket = new Quest(1, 10);
        buyDungeonTicket.description = 'Buy the Dungeon ticket from Pewter City Shop.';
        buyDungeonTicket.questFocus = ()=>+player.hasKeyItem('Dungeon ticket');
        this.tutorial.addQuest(buyDungeonTicket);

        //Cleat Mt Moon dungeon
        let clearMtMoon = new DefeatDungeonQuest(GameConstants.KantoDungeons[2], 1);
        clearMtMoon.pointsReward = 10;
        clearMtMoon.description = 'Gather 75 Dungeon tokens by capturing Pokemon, then clear the Mt. Moon dungeon.';
        this.tutorial.addQuest(clearMtMoon);

        this.tutorialTracker = this.tutorial.curQuestInitial.subscribe((newInitial)=>{
            player.tutorialProgress(QuestLineHelper.tutorial.curQuest());
            player.tutorialState = newInitial;
        })

        this.tutorialCompleter = this.tutorial.curQuest.subscribe((quest)=>{
            if (quest == QuestLineHelper.tutorial.totalQuests) {
                QuestLineHelper.tutorialTracker.dispose();
                player.tutorialState = null;
                player.tutorialProgress(quest);
                player.tutorialComplete(true);
            }
        })
    }
}
