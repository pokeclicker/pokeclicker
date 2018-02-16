class QuestLineHelper {
    public static tutorial: QuestLine;
    public static tutorialTracker: KnockoutSubscription;
    public static tutorialCompleter: KnockoutSubscription;

    public static createTutorial() {
        this.tutorial = new QuestLine("Tutorial Quests", "A short set of quests to get you going");

        //Defeat Starter
        let defeatStarter = new DefeatPokemonsQuest(1,1);
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
        routeTwo.description = "Defeat 5 pokemon on route 2. Click route 2 on the map to move there and begin fighting."
        this.tutorial.addQuest(routeTwo);

        //Defeat Pewter Gym
        let pewter = new DefeatGymQuest(0, GameConstants.Region.kanto, 1);
        pewter.pointsReward = 40;
        pewter.description = "Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle."
        this.tutorial.addQuest(pewter)

        //Buy pokeballs
        let buyPokeballs = new BuyPokeballsQuest(50,GameConstants.Pokeball.Pokeball,50);
        buyPokeballs.pointsReward = 50;
        buyPokeballs.description = "Buy 50 pokeballs. You can find these in the Pewter City Shop."
        this.tutorial.addQuest(buyPokeballs);

        //Kill 10 on route 3
        let routeThree = new DefeatPokemonsQuest(3, 10);
        routeThree.pointsReward = 100;
        this.tutorial.addQuest(routeThree);

        this.tutorialTracker = this.tutorial.curQuestInitial.subscribe((newInitial)=>{
            player.tutorialProgress(QuestLineHelper.tutorial.curQuest());
            player.tutorialState = newInitial;
        })

        this.tutorialCompleter = this.tutorial.curQuest.subscribe((quest)=>{
            if (quest == QuestLineHelper.tutorial.totalQuests) {
                QuestLineHelper.tutorialTracker.dispose();
                player.tutorialState = null;
                player.tutorialProgress(quest);
            }
        })
    }
}