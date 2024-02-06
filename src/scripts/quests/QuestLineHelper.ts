/* Static class used to handle Quest Lines */

class QuestLineHelper {

    /* Kanto QuestLines */

    public static createTutorial() {
        const tutorial = new QuestLine('Tutorial Quests', 'A short set of quests to get you going.');

        // Defeat Starter
        const defeatStarter = new CustomQuest(1, 10,
            'Defeat the Pokémon. Click to deal damage!',
            () => App.game.statistics.totalPokemonDefeated()
        ).withInitialValue(0); // Initial of 0 so it auto completes if bugged
        tutorial.addQuest(defeatStarter);

        // Capture 1 pokemon
        const captureOne = new CapturePokemonsQuest(1, 20).withDescription('Capture 1 Pokémon. When you defeat a Pokémon, a Poké Ball is thrown and you have a chance to capture it.').withInitialValue(1); // Initial of 1 so it auto completes if bugged
        tutorial.addQuest(captureOne);

        // Kill 10 on Route 2
        const routeTwo = new DefeatPokemonsQuest(10, 20, 2, GameConstants.Region.kanto).withDescription('Defeat 10 Pokémon on Route 2. Click Route 2 on the map to move there and begin fighting.').withInitialValue(0); // Initial of 0 so it auto completes if bugged
        tutorial.addQuest(routeTwo);

        // Say bye to mom
        const talkToMom = new TalkToNPCQuest(PalletMom1, 'Go back to Pallet Town and say bye to mom.');
        tutorial.addQuest(talkToMom);

        // Buy pokeballs
        const buyPokeballs = new BuyPokeballsQuest(10, 20, GameConstants.Pokeball.Pokeball).withInitialValue(0); // Initial of 0 so it auto completes if bugged
        tutorial.addQuest(buyPokeballs);

        // Learn about catching from the Old Man
        const OldManReward = () => {
            $('#npc-modal').one('hidden.bs.modal', () => {
                Information.show({
                    steps: [
                        {
                            element: document.getElementById('pokeballSelector'),
                            intro: 'Select which Poké Ball types to catch Pokémon with based on their caught/shiny status.<br/><i><sup>Hover over the names for more info.</sup></i><br/><br/>Capturing Pokémon gains you <img title="Dungeon Tokens\nGained by capturing Pokémon" src="assets/images/currency/dungeonToken.svg" height="25px"> Dungeon Tokens.<br/><br/>Try now by clicking the "Caught" selector to change it.',
                        },
                    ],
                    exitOnEsc: false,
                    showButtons: false,
                });
                const caughtSelector: HTMLElement = document.querySelector('tr[data-name="Caught"] img.pokeball-small.clickable.pokeball-selected');
                caughtSelector.addEventListener('click', () => {
                    Information.hide();
                    $('#pokeballSelectorModal').one('shown.bs.modal', null, () => {
                        // Need to set a timeout, otherwise it messes up the modal layout
                        setTimeout(() => {
                            Information.show({
                                steps: [
                                    {
                                        element: document.querySelector('#pokeballSelectorModal .modal-body'),
                                        intro: 'Select the <img title="Poké Ball" src="assets/images/pokeball/Pokeball.svg" height="25px"> Poké Ball to use this type of ball to capture already caught Pokémon, which will give you <img title="Dungeon Tokens\nGained by capturing Pokémon" src="assets/images/currency/dungeonToken.svg" height="25px"> Dungeon Tokens when captured.',
                                    },
                                ],
                                // Needed for IntroJs on modals
                                overlayOpacity: 0,
                            });
                        }, 100);

                        // Hide the IntroJS overlay once the user selects the Pokeball
                        const selectPokeball = document.querySelectorAll('#pokeballSelectorModal .clickable')[1];
                        selectPokeball.addEventListener('click', () => {
                            Information.hide();
                        }, {
                            once: true,
                        });
                    });
                }, {
                    once: true,
                });
            });
        };
        const talkToOldMan = new TalkToNPCQuest(ViridianCityOldMan2, 'Talk to the Old Man in Viridian City to learn about catching.').withCustomReward(OldManReward);
        tutorial.addQuest(talkToOldMan);

        const catch5Pidgey = new CaptureSpecificPokemonQuest('Pidgey', 5, false, 30).withDescription('Use what you\'ve learned to catch 5 Pidgey. Talk to the Old Man again if you need a reminder.');
        tutorial.addQuest(catch5Pidgey);

        // Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 50,
            'Buy the Dungeon Ticket from Viridian City Shop.',
            () => +App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket)
        ).withInitialValue(0);
        tutorial.addQuest(buyDungeonTicket);

        // Clear Viridian Forest
        const clearViridianForest = new DefeatDungeonQuest(1, 50, 'Viridian Forest').withDescription('Gather 50 Dungeon Tokens by (re)capturing Pokémon, then clear the Viridian Forest dungeon.').withInitialValue(0);
        tutorial.addQuest(clearViridianForest);

        // Defeat Pewter Gym
        const pewterReward = () => {
            Notifier.notify({ message: 'Tutorial completed!', type: NotificationConstants.NotificationOption.success });
            Information.show({
                steps: [
                    {
                        element: document.getElementById('questDisplayContainer'),
                        intro: 'Click "List" to see the current quests that can be completed for <img title="Quest points" src="assets/images/currency/questPoint.svg" height="24px"> Quest Points.',
                    },
                    {
                        element: document.getElementById('startMenu'),
                        intro: 'See the badges you\'ve earned in the Badge Case. Badges influence the max level of your Pokémon.',
                    },
                ],
            });
        };
        const pewter = new DefeatGymQuest(1, 0, 'Pewter City').withDescription('Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.').withInitialValue(0).withCustomReward(pewterReward);
        tutorial.addQuest(pewter);

        App.game.quests.questLines().push(tutorial);
    }

    // Available upon talking with Bill's Grandpa.
    public static createBillsGrandpaQuestLine() {
        const BillsGrandpaQuestLine = new QuestLine('Bill\'s Grandpa Treasure Hunt', 'Check the hints and bring Bill\'s Grandpa the Pokémon he wants to see.', new RouteKillRequirement(10, GameConstants.Region.kanto, 25), GameConstants.BulletinBoards.Kanto);

        const talkToBillsGrandpa1 = new TalkToNPCQuest(BillsGrandpa1, 'Talk to Bill\'s Grandpa in Bill\'s House.');
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa1);

        const pinkBalloon = new CaptureSpecificPokemonQuest('Jigglypuff', 1).withDescription('Catch the desired Pokémon.');
        const punchNormal = new CustomQuest(100, 0, 'Defeat 100 Normal-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Normal)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });

        BillsGrandpaQuestLine.addQuest(new MultipleQuestsQuest([
            pinkBalloon,
            punchNormal,
        ],'Bill\'s Grandpa wants you to catch a Pokémon that is pink and like a balloon.'));

        // Talk to Bill's Grandpa after catching a Jigglypuff
        const MoonStoneReward = () => {
            player.gainItem('Moon_stone', 1);
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you a Moon Stone.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToBillsGrandpa2 = new TalkToNPCQuest(BillsGrandpa2, 'Show your Jigglypuff to Bill\'s Grandpa.').withCustomReward(MoonStoneReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa2);

        const blueRound = new CaptureSpecificPokemonQuest('Oddish', 1).withDescription('Catch the desired Pokémon.');
        const punchGrass = new CustomQuest(100, 0, 'Defeat 100 Grass-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Grass)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });

        BillsGrandpaQuestLine.addQuest(new MultipleQuestsQuest([
            blueRound,
            punchGrass,
        ],'Bill\'s Grandpa wants you to catch a Pokémon that is round, blue, and has leaves growing on its head.'));

        // Talk to Bill's Grandpa after catching an Oddish
        const LeafStoneReward = () => {
            player.gainItem('Leaf_stone', 1);
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you a Leaf Stone.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToBillsGrandpa3 = new TalkToNPCQuest(BillsGrandpa3, 'Show your Oddish to Bill\'s Grandpa.').withCustomReward(LeafStoneReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa3);

        const redSphere = new CaptureSpecificPokemonQuest('Staryu', 1).withDescription('Catch the desired Pokémon.');
        const punchWater = new CustomQuest(100, 0, 'Defeat 100 Water-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Water)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });

        BillsGrandpaQuestLine.addQuest(new MultipleQuestsQuest([
            redSphere,
            punchWater,
        ],'Bill\'s Grandpa wants you to catch a Pokémon that it has a red sphere in its body and is shaped like a star.'));

        // Talk to Bill's Grandpa after catching a Staryu
        const WaterStoneReward = () => {
            player.gainItem('Water_stone', 1);
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you a Water Stone.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToBillsGrandpa4 = new TalkToNPCQuest(BillsGrandpa4, 'Show your Staryu to Bill\'s Grandpa.').withCustomReward(WaterStoneReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa4);

        const loyalRoar = new CaptureSpecificPokemonQuest('Growlithe', 1).withDescription('Catch the desired Pokémon.');
        const punchFire = new CustomQuest(100, 0, 'Defeat 100 Fire-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Fire)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });

        BillsGrandpaQuestLine.addQuest(new MultipleQuestsQuest([
            loyalRoar,
            punchFire,
        ],'Bill\'s Grandpa wants you to catch a Pokémon that is very loyal and supposedly roars pretty well.'));

        // Talk to Bill's Grandpa after catching a Growlithe
        const FireStoneReward = () => {
            player.gainItem('Fire_stone', 1);
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you a Fire Stone.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToBillsGrandpa5 = new TalkToNPCQuest(BillsGrandpa5, 'Show your Growlithe to Bill\'s Grandpa.').withCustomReward(FireStoneReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa5);

        const yellowAndRed = new CaptureSpecificPokemonQuest('Pikachu', 1).withDescription('Catch the desired Pokémon.');
        const punchElectric = new CustomQuest(100, 0, 'Defeat 100 Electric-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Electric)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });

        BillsGrandpaQuestLine.addQuest(new MultipleQuestsQuest([
            yellowAndRed,
            punchElectric,
        ],'Bill\'s Grandpa wants you to catch a Pokémon that has a yellow body and red cheeks.'));

        // Talk to Bill's Grandpa after catching a Pikachu
        const ThunderStoneReward = () => {
            player.gainItem('Thunder_stone', 1);
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you a Thunder Stone.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToBillsGrandpa6 = new TalkToNPCQuest(BillsGrandpa6, 'Show your Pikachu to Bill\'s Grandpa.').withCustomReward(ThunderStoneReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa6);

        const fightBillsGrandpa = new DefeatTemporaryBattleQuest('Bill\'s Grandpa', 'Bill\'s Grandpa would like to have a battle with you!');
        BillsGrandpaQuestLine.addQuest(fightBillsGrandpa);

        // Talk to Bill's Grandpa after battling him
        const EeveeReward = () => {
            App.game.party.gainPokemonByName('Eevee');
            Notifier.notify({
                title: BillsGrandpaQuestLine.name,
                message: 'Bill\'s Grandpa has given you an Eevee, treat it well!',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                timeout: 3e4,
            });
        };

        const talkToBillsGrandpa7 = new TalkToNPCQuest(BillsGrandpa7, 'Talk to Bill\'s Grandpa one last time.').withCustomReward(EeveeReward);
        BillsGrandpaQuestLine.addQuest(talkToBillsGrandpa7);

        App.game.quests.questLines().push(BillsGrandpaQuestLine);
    }

    // Started upon defeating Cerulean City's gym.
    public static createRocketKantoQuestLine() {
        const rocketKantoQuestLine = new QuestLine('Team Rocket', 'Some nasty villains are up to no good.');

        const clearRocketGameCorner = new DefeatDungeonQuest(1, 0, 'Rocket Game Corner').withDescription('Illegal activity is afoot. Clear the Rocket Game Corner in Celadon City.')
            .withOptionalArgs({
                clearedMessage: 'I see that you raise Pokémon with utmost care. A child like you would never understand what I hope to achieve. I shall step aside this time! I hope we meet again...',
                npcDisplayName: 'Team Rocket Boss Giovanni',
                npcImageName: 'Team Rocket Boss Giovanni',
            });
        rocketKantoQuestLine.addQuest(clearRocketGameCorner);

        const clearSilphCo1 = new DefeatDungeonQuest(1, 0, 'Silph Co.').withDescription('Team Rocket has occupied Silph Co. Clear Silph Co. in Saffron City to find the Card Key.')
            .withOptionalArgs({
                clearedMessage: 'What kept you $playername$? Hahaha! I thought you\'d turn up if I waited here! I guess Team Rocket slowed you down! Not that I care! I saw you in Saffron, so I decided to see if you got better!',
                npcDisplayName: 'Rival Blue',
                npcImageName: 'Rival Blue',
            });
        rocketKantoQuestLine.addQuest(clearSilphCo1);

        const clearBlue = new DefeatTemporaryBattleQuest('Blue 5', 'Blue is getting in your way. Defeat him in Silph Co.');
        rocketKantoQuestLine.addQuest(clearBlue);

        const clearSilphCo2 = new DefeatDungeonQuest(1, 0, 'Silph Co.').withDescription('Team Rocket has occupied Silph Co. Clear Silph Co. in Saffron City once more to foil their plans.')
            .withOptionalArgs({
                clearedMessage: 'Arrgh!! I lost again!? Blast it all! You ruined our plans for Silph! But Team Rocket will never fall! $playername$, never forget that all Pokémon exist for Team Rocket! I must go, but I shall return!',
                npcDisplayName: 'Team Rocket Boss Giovanni',
                npcImageName: 'Team Rocket Boss Giovanni',
            });
        rocketKantoQuestLine.addQuest(clearSilphCo2);

        const ViridianGymReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: rocketKantoQuestLine.name,
                message: 'The President of Silph Co. has rewarded you with a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearViridianGym = new DefeatGymQuest(1, 0, 'Viridian City').withCustomReward(ViridianGymReward).withDescription('If you take down Team Rocket\'s leader one more time they will surely never come back from this! Clear Viridian City Gym.');
        rocketKantoQuestLine.addQuest(clearViridianGym);

        App.game.quests.questLines().push(rocketKantoQuestLine);
    }

    // Started upon defeating Fuchsia City's gym.
    public static createUndergroundQuestLine() {
        const undergroundQuestLine = new QuestLine('Mining Expedition', 'Explore the underground!');

        //Buy Explorer Kit (no reward)
        const buyExplorerKit = new CustomQuest(1, 0, 'Buy the Explorer Kit from Cinnabar Island Shop.', () => +App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit)).withInitialValue(0);
        undergroundQuestLine.addQuest(buyExplorerKit);

        // Mine 5 layers in the Underground
        const oldAmberReward = () => {
            // Gain an Old Amber
            ItemList.Old_amber.gain(1);
            Notifier.notify({
                title: undergroundQuestLine.name,
                message: 'You have gained an Old Amber fossil!\n<i>You can breed this in the hatchery.</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: GameConstants.MINUTE,
            });
        };
        const mineLayers = new MineLayersQuest(5, 0).withDescription('Mine 5 layers in the Underground.').withCustomReward(oldAmberReward);
        undergroundQuestLine.addQuest(mineLayers);

        App.game.quests.questLines().push(undergroundQuestLine);
    }

    // Started upon defeating Cinnabar Island's gym.
    public static createBillSeviiQuestLine() {
        const billSeviiQuestLine = new QuestLine('Bill\'s Errand', 'Bill has asked you to journey to the Sevii Islands with him to set up a digital connection to mainland Kanto.');

        const talktoCelio1 = new TalkToNPCQuest(OneIslandCelio1, 'Use the Subregional Travel button at the top of the map to travel to the Sevii Islands and speak with Celio on One Island.');
        billSeviiQuestLine.addQuest(talktoCelio1);

        const talktoGameCornerOwner1 = new TalkToNPCQuest(TwoIslandGameCornerOwner1, 'Ask the Game Corner owner on Two Island about the meteorite.');
        billSeviiQuestLine.addQuest(talktoGameCornerOwner1);

        const clearBikerGangTemporaryBattles = new CustomQuest(3, 0, 'A biker gang has invaded Three island. They will not let you continue to Berry Forest. Defeat the Biker Goons.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Biker Goon 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Biker Goon 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Biker Goon 3')]()
        );
        billSeviiQuestLine.addQuest(clearBikerGangTemporaryBattles);

        const clearCueBallPaxtonTemporaryBattle = new DefeatTemporaryBattleQuest('Cue Ball Paxton', 'Defeat the biker gang\'s leader.');
        billSeviiQuestLine.addQuest(clearCueBallPaxtonTemporaryBattle);

        const clearBerryForest = new DefeatDungeonQuest(1, 0, 'Berry Forest').withDescription('Find Lostelle. Clear Berry Forest.');
        billSeviiQuestLine.addQuest(clearBerryForest);

        const talktoGameCornerOwner2 = new TalkToNPCQuest(TwoIslandGameCornerOwner2, 'Lostelle has been found. Return to the Game Corner owner on Two Island.').withCustomReward(() => ItemList.Meteorite_Bills_Errand.gain(1));
        billSeviiQuestLine.addQuest(talktoGameCornerOwner2);

        const BillsErrandReward = () => {
            App.game.wallet.gainQuestPoints(1000, true);
            Notifier.notify({
                title: billSeviiQuestLine.name,
                message: 'Celio has rewarded you with 1,000 Quest Points!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talktoCelio2 = new TalkToNPCQuest(OneIslandCelio2, 'Deliver the meteorite to Celio on One Island.').withCustomReward(BillsErrandReward);
        billSeviiQuestLine.addQuest(talktoCelio2);

        App.game.quests.questLines().push(billSeviiQuestLine);
    }

    // Started upon defeating Viridian City's gym.
    public static createPersonsofInterestQuestLine() {
        const personsofInterestQuestLine = new QuestLine('Persons of Interest', 'Some people want to talk to you.');

        const talktoBreeder = new TalkToNPCQuest(SaffronBreeder, 'Talk to the Breeder in Saffron City.', 250);
        personsofInterestQuestLine.addQuest(talktoBreeder);

        const talktoGemScientist = new TalkToNPCQuest(PewterScientist, 'Talk to the Gem Scientist in Pewter City.', 250);
        personsofInterestQuestLine.addQuest(talktoGemScientist);

        App.game.quests.questLines().push(personsofInterestQuestLine);
    }

    /* Johto QuestLines */

    // Started upon defeating Ecruteak City's gym.
    public static createRocketJohtoQuestLine() {
        const rocketJohtoQuestLine = new QuestLine('Team Rocket Again', 'Team Rocket is up to no good again!');

        const defeatRedGyarados = new DefeatTemporaryBattleQuest('Red Gyarados', 'Defeat the rampaging Red Gyarados!');
        rocketJohtoQuestLine.addQuest(defeatRedGyarados);

        const clearTeamRocketHideout = new DefeatDungeonQuest(1, 0, 'Team Rocket\'s Hideout').withDescription('Clear the Team Rocket\'s Hideout dungeon in Mahogany Town');
        rocketJohtoQuestLine.addQuest(clearTeamRocketHideout);

        const radioTowerReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: rocketJohtoQuestLine.name,
                message: 'The grateful radio director gave you a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearRadioTower = new DefeatDungeonQuest(1, 0, 'Radio Tower').withDescription('Clear the Radio Tower dungeon in Goldenrod City').withCustomReward(radioTowerReward);
        rocketJohtoQuestLine.addQuest(clearRadioTower);

        App.game.quests.questLines().push(rocketJohtoQuestLine);
    }

    // Available upon clearing Route 37
    public static createJohtoBeastsQuestLine() {
        const johtoBeastsQuestLine = new QuestLine('The Legendary Beasts', 'Investigate the legends surrounding the strange Burned Tower in Ecruteak City.', new RouteKillRequirement(10, GameConstants.Region.johto, 37), GameConstants.BulletinBoards.Johto, true);

        const talktoEusine1 = new TalkToNPCQuest(EcruteakEusine, 'Talk to Eusine in Ecruteak City.');
        johtoBeastsQuestLine.addQuest(talktoEusine1);

        const clearBurnedTower = new DefeatDungeonQuest(1, 0, 'Burned Tower').withDescription('Clear the Burned Tower.');
        johtoBeastsQuestLine.addQuest(clearBurnedTower);

        const clearSilver = new DefeatTemporaryBattleQuest('Silver 3', 'Defeat Silver.');
        johtoBeastsQuestLine.addQuest(clearSilver);

        const talktoPokéfanDerek = new TalkToNPCQuest(EcruteakPokéfan, 'Talk to Pokéfan Derek in Ecruteak City.').withCustomReward(() => App.game.quests.getQuestLine('Eusine\'s Chase').beginQuest(0, undefined, true));
        johtoBeastsQuestLine.addQuest(talktoPokéfanDerek);

        const catchRaikou = new CaptureSpecificPokemonQuest('Raikou', 1, true);

        const catchEntei = new CaptureSpecificPokemonQuest('Entei', 1, true);

        const catchSuicune = new CaptureSpecificPokemonQuest('Suicune');

        johtoBeastsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRaikou,
                catchEntei,
                catchSuicune,
            ], 'Catch the Legendary Beasts.'));

        App.game.quests.questLines().push(johtoBeastsQuestLine);
    }
    public static createJohtoSuicuneQuestLine() {
        const johtoSuicuneQuestLine = new QuestLine('Eusine\'s Chase', 'Eusine is looking for Suicune.');

        const clearCianwoodSuicune = new DefeatTemporaryBattleQuest('Suicune 1', 'Find Suicune.');
        johtoSuicuneQuestLine.addQuest(clearCianwoodSuicune);

        const talktoEusine2 = new TalkToNPCQuest(CianwoodEusine, 'Talk to Eusine in Cianwood City.');
        johtoSuicuneQuestLine.addQuest(talktoEusine2);

        const clearEusine = new DefeatTemporaryBattleQuest('Eusine', 'Defeat Eusine.');
        johtoSuicuneQuestLine.addQuest(clearEusine);

        const clearRoute42Suicune = new DefeatTemporaryBattleQuest('Suicune 2', 'Find Suicune.');
        johtoSuicuneQuestLine.addQuest(clearRoute42Suicune);

        const talktoEusine3 = new TalkToNPCQuest(MahoganyEusine, 'Talk to Eusine in Mahogany Town.');
        johtoSuicuneQuestLine.addQuest(talktoEusine3);

        const clearVermilionSuicune = new DefeatTemporaryBattleQuest('Suicune 3', 'Find Suicune.');
        johtoSuicuneQuestLine.addQuest(clearVermilionSuicune);

        const talktoEusine4 = new TalkToNPCQuest(VermilionEusine, 'Talk to Eusine in Vermilion City.');
        johtoSuicuneQuestLine.addQuest(talktoEusine4);

        const clearRoute14Suicune = new DefeatTemporaryBattleQuest('Suicune 4', 'Find Suicune.');
        johtoSuicuneQuestLine.addQuest(clearRoute14Suicune);

        const talktoEusine5 = new TalkToNPCQuest(FuchsiaEusine, 'Talk to Eusine in Fuchsia City.');
        johtoSuicuneQuestLine.addQuest(talktoEusine5);

        const clearRoute25Suicune = new DefeatTemporaryBattleQuest('Suicune 5', 'Find Suicune.');
        johtoSuicuneQuestLine.addQuest(clearRoute25Suicune);

        const talktoEusine6 = new TalkToNPCQuest(BillsHouseEusine, 'Talk to Eusine in Bill\'s House.');
        johtoSuicuneQuestLine.addQuest(talktoEusine6);

        const catchRoute25Suicune = new CaptureSpecificPokemonQuest('Suicune');

        johtoSuicuneQuestLine.addQuest(catchRoute25Suicune);

        App.game.quests.questLines().push(johtoSuicuneQuestLine);
    }

    // Lugia Quest - Available upon clearing Rocket Johto questline
    public static createlugiaJohtoQuestLine() {
        const lugiaJohtoQuestLine = new QuestLine('Whirl Guardian', 'The Kimono Girls of Ecruteak City need help.', new QuestLineCompletedRequirement('Team Rocket Again'), GameConstants.BulletinBoards.Johto);

        const talktoZuki = new TalkToNPCQuest(Zuki, 'Talk to Kimono Girl Zuki in Violet City.');
        lugiaJohtoQuestLine.addQuest(talktoZuki);

        const helpZuki = new HatchEggsQuest(25, 0);
        lugiaJohtoQuestLine.addQuest(helpZuki);

        const talktoNaoko = new TalkToNPCQuest(Naoko, 'Talk to Kimono Girl Naoko in the Ilex Forest.');
        lugiaJohtoQuestLine.addQuest(talktoNaoko);

        const helpNaoko = new DefeatDungeonQuest(1, 0, 'Ilex Forest').withDescription('Clear Ilex Forest to lead Naoko to safety.');
        lugiaJohtoQuestLine.addQuest(helpNaoko);

        const kimonoReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Ultraball, 50, false);
            Notifier.notify({
                title: lugiaJohtoQuestLine.name,
                message: 'Kimono Girl Miki has given you a package containing 50 Ultra Balls.',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talktoMiki = new TalkToNPCQuest(Miki, 'Talk to Kimono Girl Miki at the Ecruteak City Dance Theatre.').withCustomReward(kimonoReward);
        lugiaJohtoQuestLine.addQuest(talktoMiki);

        const talktoSayo = new TalkToNPCQuest(Sayo, 'Talk to Kimono Girl Sayo in the Ice Path.');
        lugiaJohtoQuestLine.addQuest(talktoSayo);

        const helpSayo = new DefeatDungeonQuest(1, 0, 'Ice Path').withDescription('Clear the Ice Path to give Sayo a push.');
        lugiaJohtoQuestLine.addQuest(helpSayo);

        const talktoKuni = new TalkToNPCQuest(Kuni, 'Talk to Kimono Girl Kuni in Goldenrod City.');
        lugiaJohtoQuestLine.addQuest(talktoKuni);

        const helpKuni = new DefeatDungeonQuest(1, 0, 'Radio Tower').withDescription('Clear the Radio Tower to get rid of any lingering Team Rocket activity.');
        lugiaJohtoQuestLine.addQuest(helpKuni);

        const talktoKimonoGirlsWhirl = new TalkToNPCQuest(KimonoGirlsWhirl, 'Meet the Kimono Girls at the Whirl Islands.').withCustomReward(() => ItemList.Tidal_Bell_Lugia.gain(1));
        lugiaJohtoQuestLine.addQuest(talktoKimonoGirlsWhirl);

        const LugiaCatch = new CaptureSpecificPokemonQuest('Lugia').withDescription('Catch Lugia in the Whirl Islands.');
        lugiaJohtoQuestLine.addQuest(LugiaCatch);

        App.game.quests.questLines().push(lugiaJohtoQuestLine);
    }

    // Ho-Oh Quest - Available upon clearing Lugia questline
    public static createhoohJohtoQuestLine() {
        const hoohJohtoQuestLine = new QuestLine('Rainbow Guardian', 'The Kimono Girls of Ecruteak City wish to speak with you again.', new MultiRequirement([new QuestLineStepCompletedRequirement('Whirl Guardian', 9), new ObtainedPokemonRequirement('Raikou'), new ObtainedPokemonRequirement('Entei'), new ObtainedPokemonRequirement('Suicune')]), GameConstants.BulletinBoards.Johto);

        const talkKimonoGirlsEcruteak = new TalkToNPCQuest(KimonoGirlsEcruteak, 'Meet the Kimono Girls at the Ecruteak Dance Theatre.');
        hoohJohtoQuestLine.addQuest(talkKimonoGirlsEcruteak);

        const clearKimonoGirls = new DefeatTemporaryBattleQuest('Kimono Girls', 'Prove your abilities as a trainer to the Kimono Girls of Ecruteak City.').withCustomReward(() => ItemList.Clear_Bell_Hooh.gain(1));
        hoohJohtoQuestLine.addQuest(clearKimonoGirls);

        const HoohCatch = new CaptureSpecificPokemonQuest('Ho-Oh').withDescription('Catch Ho-Oh in the Tin Tower.');
        hoohJohtoQuestLine.addQuest(HoohCatch);

        App.game.quests.questLines().push(hoohJohtoQuestLine);
    }

    // Available upon completing Bill's Errand
    public static createCelebiJohtoQuestLine() {
        const celebiJohtoQuestLine = new QuestLine('Unfinished Business', 'A request from Professor Oak.', new QuestLineCompletedRequirement('Bill\'s Errand'), GameConstants.BulletinBoards.Kanto);

        const talktoProfOak1 = new TalkToNPCQuest(PalletCelebiProfOak1, 'Talk to Professor Oak in Pallet Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak1);

        const talktoProfIvy = new TalkToNPCQuest(CelebiProfIvy, 'Talk to Professor Ivy in her lab in the Sevii Islands.').withCustomReward(() => ItemList.GS_Ball_Celebi.gain(1));
        celebiJohtoQuestLine.addQuest(talktoProfIvy);

        const talktoProfOak2 = new TalkToNPCQuest(PalletCelebiProfOak2, 'Deliver the GS Ball to Professor Oak in Pallet Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak2);

        const talktoKurt1 = new TalkToNPCQuest(AzaleaCelebiKurt2, 'Deliver the GS Ball to Kurt in Azalea Town in Johto.');
        celebiJohtoQuestLine.addQuest(talktoKurt1);

        const talktoKurt2 = new TalkToNPCQuest(AzaleaCelebiKurt4, 'Talk to Kurt again after becoming Champion of Johto.');
        celebiJohtoQuestLine.addQuest(talktoKurt2);

        const talktoProfOak3 = new TalkToNPCQuest(AzaleaCelebiOak1, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak3);

        const talktoIlexForestShrine1 = new TalkToNPCQuest(IlexForestShrine1, 'Investigate the shrine in Ilex Forest.');
        celebiJohtoQuestLine.addQuest(talktoIlexForestShrine1);

        const SpikyEaredPichuReward = () => {
            App.game.party.gainPokemonByName('Spiky-eared Pichu');
            Notifier.notify({
                title: celebiJohtoQuestLine.name,
                message: 'You captured the Spiky-eared Pichu!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearSpikyEaredPichu = new DefeatTemporaryBattleQuest('Spiky-eared Pichu', 'Defeat the strange Pichu.').withCustomReward(SpikyEaredPichuReward);
        celebiJohtoQuestLine.addQuest(clearSpikyEaredPichu);

        const talktoProfOak4 = new TalkToNPCQuest(AzaleaCelebiOak2, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak4);

        const talktoTohjoFallsTimeDistortion = new TalkToNPCQuest(TohjoFallsCelebiTimeDistortion, 'Investigate the Time Distortion in Tohjo Falls.');
        celebiJohtoQuestLine.addQuest(talktoTohjoFallsTimeDistortion);

        const clearGiovanni = new DefeatTemporaryBattleQuest('Rocket Boss Giovanni', 'Defeat Giovanni.');
        celebiJohtoQuestLine.addQuest(clearGiovanni);

        const talktoProfOak5 = new TalkToNPCQuest(AzaleaCelebiOak3, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak5);

        const talktoIlexForestShrine2 = new TalkToNPCQuest(IlexForestShrine2, 'Investigate the shrine in Ilex Forest.');
        celebiJohtoQuestLine.addQuest(talktoIlexForestShrine2);

        const CelebiCatch = new CaptureSpecificPokemonQuest('Celebi').withDescription('Play with the Celebi in Ilex Forest.');

        celebiJohtoQuestLine.addQuest(CelebiCatch);

        const talktoProfOak6 = new TalkToNPCQuest(AzaleaCelebiOak5, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak6);

        App.game.quests.questLines().push(celebiJohtoQuestLine);
    }

    /* Hoenn QuestLines */

    // Started upon defeating Mauville City's gym.
    public static createAquaMagmaHoennQuestLine() {
        const aquaMagmaHoennQuestLine = new QuestLine('Land vs. Water', 'Put a stop to the schemes of Team Aqua and Team Magma!');

        const clearMtChimney = new DefeatDungeonQuest(1, 0, 'Mt. Chimney Crater').withDescription('Stop Team Magma at Mt. Chimney Crater.');
        aquaMagmaHoennQuestLine.addQuest(clearMtChimney);

        const clearWeatherInstitute = new DefeatDungeonQuest(1, 0, 'Weather Institute').withDescription('Stop Team Aqua at the Weather Institute.');
        aquaMagmaHoennQuestLine.addQuest(clearWeatherInstitute);

        const clearMagmaHideout = new DefeatDungeonQuest(1, 0, 'Magma Hideout').withDescription('Raid the Team Magma hideout.');
        aquaMagmaHoennQuestLine.addQuest(clearMagmaHideout);

        const clearAquaHideout = new DefeatDungeonQuest(1, 0, 'Aqua Hideout').withDescription('Raid the Team Aqua hideout.');
        aquaMagmaHoennQuestLine.addQuest(clearAquaHideout);

        const seafloorCavernReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: aquaMagmaHoennQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearSeafloorCavern = new DefeatDungeonQuest(1, 0, 'Seafloor Cavern').withDescription('Team Aqua\'s leader Archie escaped from their hideout. Find him in the Seafloor Cavern and put a stop to this once and for all!').withCustomReward(seafloorCavernReward);
        aquaMagmaHoennQuestLine.addQuest(clearSeafloorCavern);

        App.game.quests.questLines().push(aquaMagmaHoennQuestLine);
    }

    // Weather Trio - Available upon clearing Aqua/Magma questline
    public static createWeatherTrioQuestLine() {
        const weatherTrioQuestLine = new QuestLine('The Weather Trio', 'Put an ancient battle to rest.', new QuestLineCompletedRequirement('Land vs. Water'), GameConstants.BulletinBoards.Hoenn);

        const weatherBattle1 = new TalkToNPCQuest(WeatherBattle1, 'Investigate the commotion in Sootopolis City.');
        weatherTrioQuestLine.addQuest(weatherBattle1);

        const clearCaveOfOrigin = new DefeatDungeonQuest(1, 0, 'Cave of Origin').withDescription('Explore the Cave of Origin to find Wallace.');
        weatherTrioQuestLine.addQuest(clearCaveOfOrigin);

        const talkToWallace1 = new TalkToNPCQuest(Wallace1, 'Talk to Wallace in the Cave of Origin to learn how to stop Kyogre and Groudon from fighting.');
        weatherTrioQuestLine.addQuest(talkToWallace1);

        const clearSkyPillar = new DefeatDungeonQuest(1, 0, 'Sky Pillar').withDescription('Climb the Sky Pillar to find the super-ancient Pokémon Rayquaza.');
        weatherTrioQuestLine.addQuest(clearSkyPillar);

        const weatherBattle2 = new TalkToNPCQuest(WeatherBattle2, 'Return to Sootopolis City to see what Rayquaza will do.');
        weatherTrioQuestLine.addQuest(weatherBattle2);

        const talkToWallace2 = new TalkToNPCQuest(Wallace2, 'Talk to Wallace in the Cave of Origin about the aftermath of the battle.');
        weatherTrioQuestLine.addQuest(talkToWallace2);

        const catchRayquaza = new CaptureSpecificPokemonQuest('Rayquaza');

        const catchKyogre = new CaptureSpecificPokemonQuest('Kyogre');

        const catchGroudon = new CaptureSpecificPokemonQuest('Groudon');

        weatherTrioQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRayquaza,
                catchKyogre,
                catchGroudon,
            ], 'Catch the Weather Trio.'));


        App.game.quests.questLines().push(weatherTrioQuestLine);
    }

    // Deoxys - Available post-E4
    public static createDeoxysQuestLine() {
        const deoxysQuestLine = new QuestLine('Mystery of Deoxys', 'Discover the mystery of Deoxys.', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), GameConstants.BulletinBoards.Hoenn);

        // Defeat 50 Pokemon on route 129
        const route129 = new DefeatPokemonsQuest(50, 0, 129, GameConstants.Region.hoenn);
        deoxysQuestLine.addQuest(route129);

        // Defeat 500 Psychic type Pokemon
        const psychicGemReward = () => {
            App.game.gems.gainGems(500, PokemonType.Psychic);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'You have gained 500 Psychic gems!',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const defeatPsychic = new CustomQuest(500, 0, 'Defeat 500 Psychic-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        }).withCustomReward(psychicGemReward);
        deoxysQuestLine.addQuest(defeatPsychic);

        // Capture 200 Psychic type Pokemon
        const mindPlateReward = () => {
            ItemList.Mind_plate.gain(20);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'You have gained 20 Mind Plates!',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchPsychic = new CapturePokemonTypesQuest(200, 0, PokemonType.Psychic).withDescription('Capture or hatch 200 Psychic-type Pokémon.').withCustomReward(mindPlateReward);
        deoxysQuestLine.addQuest(catchPsychic);

        // Reach stage 100 in battle frontier
        const reachStage100Reward = () => {
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'Quest line completed!\n<i>You have uncovered the Mystery of Deoxys!</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };
        const reachStage100 = new CustomQuest(100, 0, 'Defeat stage 100 in the Battle Frontier.', App.game.statistics.battleFrontierHighestStageCompleted).withInitialValue(0).withCustomReward(reachStage100Reward);
        deoxysQuestLine.addQuest(reachStage100);

        App.game.quests.questLines().push(deoxysQuestLine);
    }
    // Eon Duo - Available post-E4
    public static createEonDuoQuestLine() {
        const eonDuoQuestLine = new QuestLine('The Eon Duo', 'Track down the elusive Eon Duo.', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), GameConstants.BulletinBoards.Hoenn);

        const television1 = new TalkToNPCQuest(Television1, 'Watch a news report in Littleroot Town about a mysterious Pokémon.');
        eonDuoQuestLine.addQuest(television1);

        const television2 = new TalkToNPCQuest(Television2, 'Change channels to watch a different TV station in Littleroot town.');
        eonDuoQuestLine.addQuest(television2);

        const ticketClaim = new TalkToNPCQuest(TicketClaim, 'Go to Hoenn Pokémon League to claim your Eon ticket.');
        eonDuoQuestLine.addQuest(ticketClaim);

        const southernIslandClearing = new TalkToNPCQuest(SouthernIsland1, 'Claim your Eon Ticket in the Start Menu and investigate the Southern Island.');
        eonDuoQuestLine.addQuest(southernIslandClearing);

        const catchLatias = new CaptureSpecificPokemonQuest('Latias', 1, true);

        const catchLatios = new CaptureSpecificPokemonQuest('Latios', 1, true);

        eonDuoQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchLatias,
                catchLatios,
            ], 'Catch or hatch the Eon Duo.'));

        App.game.quests.questLines().push(eonDuoQuestLine);
    }

    // Ruby/Sapphire - Available post-E4
    public static createRubySapphireSeviiQuestLine() {
        const rubySapphireSeviiQuestLine = new QuestLine('Celio\'s Errand', 'Celio has asked you to help him set up a digital connection between the Sevii Islands and Hoenn.', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), GameConstants.BulletinBoards.Hoenn);

        const talktoCelio3 = new TalkToNPCQuest(OneIslandCelio4, 'Speak with Celio on One Island in Sevii.');
        rubySapphireSeviiQuestLine.addQuest(talktoCelio3);

        const talktoRocketGrunts = new TalkToNPCQuest(SeviiRocketGrunts, 'Eavesdrop on the Team Rocket Grunts at Mt. Ember.');
        rubySapphireSeviiQuestLine.addQuest(talktoRocketGrunts);

        const clearSeviiRocketGrunts1 = new CustomQuest(2, 0, 'Two Team Rocket Grunts are blocking the entrance to Ruby Path. Defeat them.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Grunt 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Grunt 2')]()
        );
        rubySapphireSeviiQuestLine.addQuest(clearSeviiRocketGrunts1);

        const clearRubyPath = new DefeatDungeonQuest(1, 0, 'Ruby Path').withDescription('Locate the Ruby. Clear Ruby Path in Mt. Ember.');
        rubySapphireSeviiQuestLine.addQuest(clearRubyPath);

        const talktoRuby = new TalkToNPCQuest(SeviiRuby, 'Take the Ruby in Ruby Path').withCustomReward(() => ItemList.Celios_Errand_Ruby.gain(1));
        rubySapphireSeviiQuestLine.addQuest(talktoRuby);

        const talktoCelio4 = new TalkToNPCQuest(OneIslandCelio5, 'Return the Ruby to Celio on One Island');
        rubySapphireSeviiQuestLine.addQuest(talktoCelio4);

        const clearIcefallCave = new DefeatDungeonQuest(1, 0, 'Icefall Cave').withDescription('Help Lorelei with Team Rocket Grunts by clearing Icefall Cave on Four Island.');
        rubySapphireSeviiQuestLine.addQuest(clearIcefallCave);

        const talktoLorelei = new TalkToNPCQuest(SeviiLorelei, 'Talk to Lorelei in Icefall Cave');
        rubySapphireSeviiQuestLine.addQuest(talktoLorelei);

        const talktoGideon = new TalkToNPCQuest(SeviiGideon2, 'Talk to Gideon in Dotted Hole');
        rubySapphireSeviiQuestLine.addQuest(talktoGideon);

        const clearSeviiRocketGrunts2 = new CustomQuest(3, 0, 'Defeat the Three Team Rocket Grunts in Rocket Warehouse.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Grunt 3')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Grunt 4')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Grunt 5')]()
        );
        rubySapphireSeviiQuestLine.addQuest(clearSeviiRocketGrunts2);

        const clearSeviiAriana = new DefeatTemporaryBattleQuest('Sevii Rocket Ariana', 'Defeat Team Rocket Executive Ariana in Rocket Warehouse.');
        rubySapphireSeviiQuestLine.addQuest(clearSeviiAriana);

        const clearSeviiArcher = new DefeatTemporaryBattleQuest('Sevii Rocket Archer', 'Defeat Team Rocket Executive Archer in Rocket Warehouse.');
        rubySapphireSeviiQuestLine.addQuest(clearSeviiArcher);

        const clearSeviiGideon = new DefeatTemporaryBattleQuest('Scientist Gideon', 'Defeat Scientist Gideon to reclaim the Sapphire.').withCustomReward(() => ItemList.Celios_Errand_Sapphire.gain(1));
        rubySapphireSeviiQuestLine.addQuest(clearSeviiGideon);

        const talktoCelio5 = new TalkToNPCQuest(OneIslandCelio6, 'Return the Sapphire to Celio on One Island');
        rubySapphireSeviiQuestLine.addQuest(talktoCelio5);

        App.game.quests.questLines().push(rubySapphireSeviiQuestLine);
    }

    // Rocket Pinkan - Available post-Orange
    public static createPinkanThemeparkQuestLine() {
        const pinkanThemeparkQuestLine = new QuestLine('Team Rocket\'s Pinkan Theme Park', 'Help Team Rocket build a theme park on Pinkan Island?', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion), GameConstants.BulletinBoards.Sevii4567);

        const talktoTeamRocket = new TalkToNPCQuest(ThemeparkTeamRocket1, 'Talk to Team Rocket on Pinkan Island to hear about their plans.');
        pinkanThemeparkQuestLine.addQuest(talktoTeamRocket);

        const farmPinkan = new HarvestBerriesQuest(1, 0, BerryType.Pinkan).withDescription('Mutate and harvest 1 Pinkan Berry at the farm.');
        pinkanThemeparkQuestLine.addQuest(farmPinkan);

        const defeatPinkans = new MultipleQuestsQuest(
            [
                new DefeatPokemonsQuest(500, 0, 41, GameConstants.Region.kanto),
                new DefeatPokemonsQuest(500, 0, 42, GameConstants.Region.kanto),
            ], 'Help Team Rocket recruit some Pinkan Pokémon').withCustomReward(() => App.game.farming.gainBerry(BerryType.Pinkan, 20));
        pinkanThemeparkQuestLine.addQuest(defeatPinkans);

        const collectPinkanMaterials = new MultipleQuestsQuest(
            [
                new GainGemsQuest(1000, 0, PokemonType.Fairy),
                new CustomQuest(10, 0, 'Gain 10 Pixie Plates', () => player.itemList.Pixie_plate()),
            ], 'Collect Fairy Gems and Pixie Plates');
        pinkanThemeparkQuestLine.addQuest(collectPinkanMaterials);

        const talktoTeamRocket2 = new TalkToNPCQuest(ThemeparkTeamRocket4, 'Talk to Team Rocket on Pinkan Island to open the theme park!');
        pinkanThemeparkQuestLine.addQuest(talktoTeamRocket2);

        const clearPinkanTeamRocket = new DefeatTemporaryBattleQuest('Pinkan Jessie & James', 'Defeat Team Rocket Jessie & James on Pinkan Island.');
        pinkanThemeparkQuestLine.addQuest(clearPinkanTeamRocket);

        const clearPinkanOfficerJenny = new DefeatTemporaryBattleQuest('Pinkan Officer Jenny', 'Oh no! Officer Jenny has showed up. She\'s not happy! No time to plead your case, it\'s time to battle!');
        pinkanThemeparkQuestLine.addQuest(clearPinkanOfficerJenny);

        App.game.quests.questLines().push(pinkanThemeparkQuestLine);
    }

    // Regi Trio Quest - Available upon clearing Mossdeep City's Gym
    public static createRegiTrioQuestLine() {
        const regiTrioQuestLine = new QuestLine('The Three Golems', 'Discover the secrets of the Sealed Chamber.', new GymBadgeRequirement(BadgeEnums.Mind), GameConstants.BulletinBoards.Hoenn);

        const clearSealedChamber = new DefeatDungeonQuest(1, 0, 'Sealed Chamber').withDescription('Enter the Sealed Chamber to find clues.');
        regiTrioQuestLine.addQuest(clearSealedChamber);

        const readEntranceSign = new TalkToNPCQuest(SCEntrance, 'Investigate the strange markings in the Sealed Chamber.');
        regiTrioQuestLine.addQuest(readEntranceSign);

        const mazeStep1 = new TalkToNPCQuest(SCMazeLeft, 'Navigate the maze inside the Sealed Chamber.');
        regiTrioQuestLine.addQuest(mazeStep1);

        const mazeStep2 = new TalkToNPCQuest(SCMazeLeft, 'Navigate the maze inside the Sealed Chamber.');
        regiTrioQuestLine.addQuest(mazeStep2);

        const mazeStep3 = new TalkToNPCQuest(SCMazeStraight, 'Navigate the maze inside the Sealed Chamber.');
        regiTrioQuestLine.addQuest(mazeStep3);

        const mazeStep4 = new TalkToNPCQuest(SCMazeStraight, 'Navigate the maze inside the Sealed Chamber.');
        regiTrioQuestLine.addQuest(mazeStep4);

        const mazeStep5 = new TalkToNPCQuest(SCMazeRight, 'Navigate the maze inside the Sealed Chamber.');
        regiTrioQuestLine.addQuest(mazeStep5);

        const readSCHints = new TalkToNPCQuest(SCHints, 'Investigate the hidden message at the end of the Sealed Chamber maze.');
        regiTrioQuestLine.addQuest(readSCHints);

        const regiHint1 = new DefeatPokemonsQuest(100, 0, 111, GameConstants.Region.hoenn, 'Release Regirock');

        const regiHint2 = new DefeatPokemonsQuest(100, 0, 105, GameConstants.Region.hoenn, 'Release Regice');

        const regiHint3 = new DefeatPokemonsQuest(100, 0, 120, GameConstants.Region.hoenn, 'Release Registeel');

        regiTrioQuestLine.addQuest(new MultipleQuestsQuest(
            [
                regiHint1,
                regiHint2,
                regiHint3,
            ], 'Explore Hoenn by defeating Pokémon on the hinted routes to release the Regi Trio.'));

        const catchRegirock = new CaptureSpecificPokemonQuest('Regirock');

        const catchRegice = new CaptureSpecificPokemonQuest('Regice');

        const catchRegisteel = new CaptureSpecificPokemonQuest('Registeel');

        regiTrioQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRegirock,
                catchRegice,
                catchRegisteel,
            ], 'Catch the Regi Trio.'));

        App.game.quests.questLines().push(regiTrioQuestLine);
    }

    // Jirachi Quest - Available post-E4
    public static createJirachiQuestLine() {
        const jirachiQuestLine = new QuestLine('Wish Maker', 'Harness the power of the Millennium Comet and make a wish!', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), GameConstants.BulletinBoards.Hoenn);

        const millenniumFest = new TalkToNPCQuest(MillenniumFest, 'Attend the opening ceremony of the Millennium Festival near Lavaridge Town.');
        jirachiQuestLine.addQuest(millenniumFest);

        const clownRocket = new DefeatTemporaryBattleQuest('Clown Jessie & James', 'Defeat Team Rocket Jessie & James at the Millennium Festival near Lavaridge Town.');
        jirachiQuestLine.addQuest(clownRocket);

        const talkToButler1 = new TalkToNPCQuest(Butler1, 'Learn the legend of the Millennium Comet from Butler near Lavaridge Town.');
        jirachiQuestLine.addQuest(talkToButler1);

        const clearMtChimney2 = new DefeatDungeonQuest(1, 0, 'Mt. Chimney Crater').withDescription('Climb to the Mt. Chimney Crater to get a better view of the Millennium Comet as it passes.').withCustomReward(() => ItemList.Crystalline_Cocoon_Jirachi.gain(1));
        jirachiQuestLine.addQuest(clearMtChimney2);

        const catchAbsol = new CaptureSpecificPokemonQuest('Absol', 1, true).withDescription('You are being stalked by Absol, the Disaster Pokémon. Capture it or hatch your own to befriend it.');
        jirachiQuestLine.addQuest(catchAbsol);

        const cocoonHatch = new TalkToNPCQuest(CocoonHatch, 'Examine the crystalline cocoon Butler gave you while at the Mt. Chimney Crater.');
        jirachiQuestLine.addQuest(cocoonHatch);

        const fightButler1 = new DefeatTemporaryBattleQuest('Butler 1', 'Butler has followed you to the Mt. Chimney Crater and is trying to kidnap Jirachi!');
        jirachiQuestLine.addQuest(fightButler1);

        const fightButler2 = new DefeatTemporaryBattleQuest('Butler 2', 'Butler has escaped through the Jagged Pass and hooked Jirachi up to some sort of machine. Fight him to free Jirachi.');
        jirachiQuestLine.addQuest(fightButler2);

        const fightMetaGroudon1 = new DefeatTemporaryBattleQuest('Meta Groudon', 'Butler\'s attempts to resurrect Groudon have gone terribly wrong! Fight the resulting abomination!');
        jirachiQuestLine.addQuest(fightMetaGroudon1);

        const catchJirachi = new CaptureSpecificPokemonQuest('Jirachi', 1, true).withDescription('Jirachi has escaped in the chaos and is roaming Hoenn. Catch or hatch Jirachi.');

        jirachiQuestLine.addQuest(catchJirachi);

        App.game.quests.questLines().push(jirachiQuestLine);
    }

    // Meta Groudon Quest - Available post-Jirachi, must have obtained Groudon
    public static createMetaGroudonQuestLine() {
        const metaGroudonQuestLine = new QuestLine('A Meta Discovery', 'Help Butler\'s wish come true, responsibly.', new MultiRequirement([new ObtainedPokemonRequirement('Groudon'), new QuestLineCompletedRequirement('Wish Maker')]), GameConstants.BulletinBoards.Hoenn);

        const talkToButler2 = new TalkToNPCQuest(Butler2, 'Talk to Butler in the Jagged Pass to learn about his new plan.');
        metaGroudonQuestLine.addQuest(talkToButler2);

        const butlerMaterials1 = new CaptureSpecificPokemonQuest('Electrode', 100, true).withDescription('Catch or hatch 100 Electrode');

        const butlerMaterials2 = new MineLayersQuest(25, 0);

        const butlerMaterials3 = new CatchShiniesQuest(3, 0);

        metaGroudonQuestLine.addQuest(new MultipleQuestsQuest(
            [
                butlerMaterials1,
                butlerMaterials2,
                butlerMaterials3,
            ], 'Gather the materials Butler needs to rebuild his resurrection machine.'));

        const calibrateMachine = new CaptureSpecificPokemonQuest('Groudon', 5, true).withDescription('Calibrate the machine by catching or hatching 5 Groudon');
        metaGroudonQuestLine.addQuest(calibrateMachine);

        const MetaGroudonReward = () => {
            App.game.party.gainPokemonByName('Meta Groudon');
            Notifier.notify({
                title: metaGroudonQuestLine.name,
                message: 'Butler turns control of Meta Groudon over to you!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talkToButler3 = new TalkToNPCQuest(Butler3, 'Deliver the materials to Butler in the Jagged Pass and start the resurrection machine.').withCustomReward(MetaGroudonReward);
        metaGroudonQuestLine.addQuest(talkToButler3);

        App.game.quests.questLines().push(metaGroudonQuestLine);
    }

    // Orre Questlines - Available post-Hoenn-E4
    public static createOrreColosseumQuestLine() {
        const orreColosseumQuestLine = new QuestLine('Shadows in the Desert', 'Explore Orre and uncover the origin of Shadow Pokémon.', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), GameConstants.BulletinBoards.Hoenn);

        const exploreStand = new TalkToNPCQuest(ExploreStand, 'Travel to Orre and explore the Outskirt Stand.');
        orreColosseumQuestLine.addQuest(exploreStand);

        const fightWillie = new DefeatTemporaryBattleQuest('Willie', 'Fight Willie');
        orreColosseumQuestLine.addQuest(fightWillie);

        const fightFolly = new DefeatTemporaryBattleQuest('Folly', 'Fight Folly the Shady Guy in Phenac City');
        orreColosseumQuestLine.addQuest(fightFolly);

        const checkSack = new TalkToNPCQuest(Sack, 'Check what is in the mysterious sack.'); // Step 3
        orreColosseumQuestLine.addQuest(checkSack);

        const defeatShadowsPhenac = new CustomQuest(10, 0, 'Defeat 10 trainers who are using Shadow Pokémon in Phenac City.', () => App.game.statistics.totalShadowPokemonDefeated());
        orreColosseumQuestLine.addQuest(defeatShadowsPhenac);

        const talkToEsCade1 = new TalkToNPCQuest(EsCade1, 'Talk to the Mayor of Phenac City about the criminals you have been fighting.');
        orreColosseumQuestLine.addQuest(talkToEsCade1);

        const talkToRui1 = new TalkToNPCQuest(Rui1, 'Meet up with Rui again in Phenac City.'); // Step 6
        orreColosseumQuestLine.addQuest(talkToRui1);

        const fightPyriteTown = new DefeatDungeonQuest(5, 0, 'Pyrite Town Battles').withDescription('Fight trainers in Pyrite Town to flush out the criminals.');
        orreColosseumQuestLine.addQuest(fightPyriteTown);

        const talkToDuking1 = new TalkToNPCQuest(Duking1, 'Talk to the distraught bodybuilder Duking in Pyrite Town.');
        orreColosseumQuestLine.addQuest(talkToDuking1);

        const fightPyriteColosseum = new DefeatDungeonQuest(5, 0, 'Pyrite Colosseum').withDescription('Fight trainers in Pyrite Colosseum to flush out the criminals.'); // Step 9
        orreColosseumQuestLine.addQuest(fightPyriteColosseum);

        const fightPyriteBuilding = new DefeatDungeonQuest(5, 0, 'Pyrite Building').withDescription('No sign of Shadow Pokémon so far. Fight trainers at the Pyrite Building to flush out the criminals.');
        orreColosseumQuestLine.addQuest(fightPyriteBuilding);

        const talkToDoken1 = new TalkToNPCQuest(Doken1, 'Interrogate Hunter Doken in the Pyrite Building to find out who has taken Plusle, and where to.');
        orreColosseumQuestLine.addQuest(talkToDoken1);

        const clearPyriteCave = new DefeatDungeonQuest(1, 0, 'Pyrite Cave').withDescription('Find Miror B. and rescue Duking\'s Plusle in Pyrite Cave!')
            .withOptionalArgs({
                clearedMessage: 'How, how, how dare you! Don\'t you dare think you\'ll get away with your latest outrage! One of these days, I will take great pleasure in kicking you about with my elegant dance steps! Oh, and I\'m not giving up our Shadow Pokémon plan!',
                npcDisplayName: 'Miror B.',
                npcImageName: 'Cipher Admin Miror B',
            });
        orreColosseumQuestLine.addQuest(clearPyriteCave);

        const freePlusle = new TalkToNPCQuest(FreePlusle, 'Free Duking\'s Plusle.'); //Step 13
        orreColosseumQuestLine.addQuest(freePlusle);

        const talkToRui2 = new TalkToNPCQuest(Rui2, 'Discuss your next move with Rui at Pyrite Colosseum.');
        orreColosseumQuestLine.addQuest(talkToRui2);

        const clearAgatePeons = new CustomQuest (3, 0, 'Defeat the Team Cipher Peons looting Agate Village.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Cipher Peon Doven')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Cipher Peon Silton')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Cipher Peon Kass')]()
        );
        orreColosseumQuestLine.addQuest(clearAgatePeons);

        const fightRelicCave = new DefeatDungeonQuest(1, 0, 'Relic Cave').withDescription('Rui is worried her grandpa is in trouble. Search for him by clearing Relic Cave.');
        orreColosseumQuestLine.addQuest(fightRelicCave);

        const talkToGrandpaEagun = new TalkToNPCQuest(GrandpaEagun1, 'Find out more about Relic Cave from Grandpa Eagun.'); // Step 17
        orreColosseumQuestLine.addQuest(talkToGrandpaEagun);

        const fightMtBattle = new DefeatDungeonQuest(1, 0, 'Mt. Battle').withDescription('There\'s rumors of more Team Cipher activity at Mt. Battle. Go investigate!')
            .withOptionalArgs({
                clearedMessage: 'This isn\'t over yet. Stronger Pokémon are being made even now. You\'d better get serious about training your Pokémon for our next meeting. Daahahah!',
                npcDisplayName: 'Dakim',
                npcImageName: 'Cipher Admin Dakim',
            });
        orreColosseumQuestLine.addQuest(fightMtBattle);

        const talkToRui3 = new TalkToNPCQuest(Rui3, 'Discuss your next move with Rui at Mt. Battle.');
        orreColosseumQuestLine.addQuest(talkToRui3);

        const fightTheUnder = new DefeatDungeonQuest(1, 0, 'The Under').withDescription('Track down the TV broadcast coming from The Under in Pyrite Town. Clear The Under.')
            .withOptionalArgs({
                clearedMessage: 'Aiyeeeeh! How dare you! How could I get bested by a mere child? Remember this! I\'ll get you back for this!',
                npcDisplayName: 'Venus',
                npcImageName: 'Cipher Admin Venus',
            });
        orreColosseumQuestLine.addQuest(fightTheUnder);

        const searchTheStudio = new TalkToNPCQuest(SearchTheStudio, 'Search Venus\' Studio in the Under for clues.'); // Step 21
        orreColosseumQuestLine.addQuest(searchTheStudio);

        const fightCipherLab = new DefeatDungeonQuest(1, 0, 'Cipher Lab').withDescription('Follow the secret tunnel to the Cipher Lab and clear out the enemies.')
            .withOptionalArgs({
                clearedMessage: 'Humph! Your struggle to get here was all in vain! The Shadow Pokémon we produced have already been moved elsewhere. And that, of course, includes the ultimate Shadow Pokémon I created for the boss! Wahahahah!',
                npcDisplayName: 'Ein',
                npcImageName: 'Cipher Admin Ein',
            });
        orreColosseumQuestLine.addQuest(fightCipherLab);

        const fightRealgamTower = new DefeatDungeonQuest(5, 0, 'Realgam Tower Battles').withDescription('Team Cipher has taken over Realgam Tower! Fight to kick them out!');
        orreColosseumQuestLine.addQuest(fightRealgamTower);

        const talkToEsCade2 = new TalkToNPCQuest(EsCade2, 'From the top of Realgam Tower, you see Mayor Es Cade. Go ask him for help.'); //Step 24
        orreColosseumQuestLine.addQuest(talkToEsCade2);

        const fightRealgamColosseum = new DefeatDungeonQuest(10, 0, 'Realgam Colosseum').withDescription('Team Cipher\'s leaders have holed up in the Realgam Colosseum. Fight them to end this once and for all!');
        orreColosseumQuestLine.addQuest(fightRealgamColosseum);

        const watchEviceEscape = new TalkToNPCQuest(EviceEscape, 'Just when you have him cornered, Evice calls in a helicopter. Watch him escape the Realgam Colosseum.'); // Step 26
        orreColosseumQuestLine.addQuest(watchEviceEscape);

        App.game.quests.questLines().push(orreColosseumQuestLine);
    }

    /* Sinnoh QuestLines */

    // Started upon defeating Oreburgh City's gym.
    public static createGalacticSinnohQuestLine() {
        const galacticSinnohQuestLine = new QuestLine('A New World', 'End Team Galactic\'s plan to destroy the world and create a new one in its place.');

        const clearValleyWindworks = new DefeatDungeonQuest(1, 0, 'Valley Windworks').withDescription('Team Galactic is stealing energy. Clear Valley Windworks.');
        galacticSinnohQuestLine.addQuest(clearValleyWindworks);

        const clearTeamGalacticEternaBuilding = new DefeatDungeonQuest(1, 0, 'Team Galactic Eterna Building').withDescription('Team Galactic is kidnapping Pokémon now. Clear Team Galactic Eterna Building in Eterna City.');
        galacticSinnohQuestLine.addQuest(clearTeamGalacticEternaBuilding);

        const clearPastoriaCityGym = new DefeatGymQuest(1, 0, 'Pastoria City').withDescription('All is quiet. Team Galactic isn\'t doing anything. Maybe they learned their lesson. Just keep traveling, I guess. Clear the Pastoria City Gym.');
        galacticSinnohQuestLine.addQuest(clearPastoriaCityGym);

        const clearCyrus1TemporaryBattle = new DefeatTemporaryBattleQuest('Galactic Boss Cyrus', 'The boss of Team Galactic has been spotted in Celestic Town!');
        galacticSinnohQuestLine.addQuest(clearCyrus1TemporaryBattle);

        const clearCanalaveCityGym = new DefeatGymQuest(1, 0, 'Canalave City').withDescription('Cyrus is gone. Nothing to do but proceed. Adventure awaits! Clear the Canalave City Gym.');
        galacticSinnohQuestLine.addQuest(clearCanalaveCityGym);

        const clearLakeValor = new DefeatDungeonQuest(1, 0, 'Lake Valor').withDescription('A commotion was heard at Lake Valor. You must protect the lake\'s guardian! Clear Lake Valor.');
        galacticSinnohQuestLine.addQuest(clearLakeValor);

        const clearLakeVerity = new DefeatDungeonQuest(1, 0, 'Lake Verity').withDescription('Lake Valor\'s guardian was taken. Better try again at the next lake. Clear Lake Verity.');
        galacticSinnohQuestLine.addQuest(clearLakeVerity);

        const clearLakeAcuity = new DefeatDungeonQuest(1, 0, 'Lake Acuity').withDescription('Lake Verity\'s guardian was also taken. Only one lake remains. Clear Lake Acuity.');
        galacticSinnohQuestLine.addQuest(clearLakeAcuity);

        const clearTeamGalacticHQ = new DefeatDungeonQuest(1, 0, 'Team Galactic HQ').withDescription('You failed to protect any of the lake guardians. They have been taken to Veilstone City. So that\'s what that strange building was... Clear Team Galactic HQ in Veilstone City.');
        galacticSinnohQuestLine.addQuest(clearTeamGalacticHQ);

        const clearSpearPillar = new DefeatDungeonQuest(1, 0, 'Spear Pillar').withDescription('The lake guardians have been rescued, but Cyrus has used them to forge the Red Chain. He is taking it to the top of Mount Coronet. Follow him! Clear Spear Pillar.');
        galacticSinnohQuestLine.addQuest(clearSpearPillar);

        const DistortionWorldReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            MapHelper.moveToTown('Mt. Coronet');
            Notifier.notify({
                title: galacticSinnohQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearDistortionWorld = new DefeatDungeonQuest(1, 0, 'Distortion World')
            .withDescription('Cyrus planned to use the Red Chain to enslave Dialga and Palkia, but he accidentally angered Giratina and has been taken to its realm. A portal has appeared on top of Mount Coronet. Use it to follow Cyrus and end his threat once and for all. Clear Distortion World.')
            .withCustomReward(DistortionWorldReward);
        galacticSinnohQuestLine.addQuest(clearDistortionWorld);

        App.game.quests.questLines().push(galacticSinnohQuestLine);
    }

    // Manaphy Quest - Available upon defeating Eterna City's Gym
    public static createManaphyQuestLine() {
        const manaphyQuestLine = new QuestLine('Recover the Precious Egg!', 'A rare egg is at the Sandgem Lab! Surely it should be easy to hatch one little egg, right?', new GymBadgeRequirement(BadgeEnums.Forest), GameConstants.BulletinBoards.Sinnoh);

        const talkHastings1 = new TalkToNPCQuest(ManaphyHastings1, 'Speak to Professor Hastings in Sandgem Town.');
        manaphyQuestLine.addQuest(talkHastings1);

        const investigateBoulders = new TalkToNPCQuest(ManaphyBoulders, 'Search for clues in Eterna Forest.');
        manaphyQuestLine.addQuest(investigateBoulders);

        const catchPolitoedSubstitutes = new CapturePokemonTypesQuest(50, 0, PokemonType.Water).withDescription('Catch or hatch 50 Water-type Pokémon, and see if those boulders are really just boulders.');
        manaphyQuestLine.addQuest(catchPolitoedSubstitutes);

        const clearManaphyGoRock1 = new DefeatTemporaryBattleQuest('Manaphy Go-Rock MGrunt 1', 'Time to give those mysterious boulders the soaking of their life! Return to the Eterna Forest, and prepare for a battle.');
        manaphyQuestLine.addQuest(clearManaphyGoRock1);

        const talkGoRockCommander1 = new TalkToNPCQuest(ManaphyGoRockCommander, 'Speak to the Go-Rock Commander in the Eterna Forest.');
        manaphyQuestLine.addQuest(talkGoRockCommander1);

        const clearManaphyGoRock2 = new DefeatTemporaryBattleQuest('Manaphy Go-Rock FGrunt 1', 'Chase the fleeing Go-Rock Squad through the Eterna Forest!');
        manaphyQuestLine.addQuest(clearManaphyGoRock2);

        const clearManaphyGoRock3 = new CustomQuest(3, 0, 'Keep chasing the Go-Rock Squad through the Eterna Forest, but... didn\'t they already pass that tree?', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Manaphy Go-Rock MGrunt 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Manaphy Go-Rock MGrunt 3')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Manaphy Go-Rock FGrunt 2')]()
        );
        manaphyQuestLine.addQuest(clearManaphyGoRock3);

        const talkGoRockGrunt1 = new TalkToNPCQuest(ManaphyGoRock, 'The Go-Rock Squad are definitely going in circles, but they\'re too dumb to realise it. Interrogate one on their method of navigating the Eterna Forest!');
        manaphyQuestLine.addQuest(talkGoRockGrunt1);

        const defeatParasect = new DefeatDungeonBossQuest('Eterna Forest', 'Parasect').withDescription('They\'re using Parasect to navigate the Eterna Forest. Clear out a Parasect and they should get trapped!');
        manaphyQuestLine.addQuest(defeatParasect);

        const clearManaphyGoRock4 = new DefeatTemporaryBattleQuest('Manaphy Go-Rock MGrunt 4', 'Now you\'ve muddied the path, continue the Eterna Forest chase!');
        manaphyQuestLine.addQuest(clearManaphyGoRock4);

        const clearManaphyCommander1 = new DefeatTemporaryBattleQuest('Manaphy Go-Rock Commander', 'You\'ve cornered the Go-Rock Commander outside the Old Chateau! Time to finish this.');
        manaphyQuestLine.addQuest(clearManaphyCommander1);

        const talkHastings2 = new TalkToNPCQuest(ManaphyHastings2, 'Return the egg to Professor Hastings in Sandgem Town. ');
        manaphyQuestLine.addQuest(talkHastings2);

        const talkHastings3 = new TalkToNPCQuest(ManaphyHastings3, 'Professor Hastings has headed off to Canalave to do more research on Manaphy. Check in on him when you can!');
        manaphyQuestLine.addQuest(talkHastings3);

        const happinyChase1 = new TalkToNPCQuest(HappinyWitness1, 'A little girl\'s Happiny stole the egg! Search for witnesses east of Canalave!');
        manaphyQuestLine.addQuest(happinyChase1);

        const happinyChase2 = new TalkToNPCQuest(HappinyWitness2, 'The Happiny headed north out of Jubilife! Ask for witnesses in the next town.');
        manaphyQuestLine.addQuest(happinyChase2);

        const happinyChase3 = new TalkToNPCQuest(HappinyWitness3, 'The Happiny went north, through the Eterna Forest. Ask if anyone\'s seen it in Eterna City.');
        manaphyQuestLine.addQuest(happinyChase3);

        const happinyChase4 = new TalkToNPCQuest(HappinyWitness4, 'Search for someone who\'s seen the Happiny Egg-napper! It was last seen heading east across Route 211.');
        manaphyQuestLine.addQuest(happinyChase4);

        const happinyChase5 = new TalkToNPCQuest(HappinyWitness5, 'Keep asking around and following the Happiny Egg-thief! It was heading south, towards Solaceon Town.');
        manaphyQuestLine.addQuest(happinyChase5);

        const happinyChase6 = new TalkToNPCQuest(HappinyWitness6, 'Hopefully you can finally catch up to this Happiny at Hearthome City. Ask around for any witnesses.');
        manaphyQuestLine.addQuest(happinyChase6);

        const happinyChase7 = new TalkToNPCQuest(HappinyWitness7, 'The Happiny went through Mt. Coronet again? This time it went west through the Southern path. Ask around for witnesses on the other side.');
        manaphyQuestLine.addQuest(happinyChase7);

        const happinyChase8 = new TalkToNPCQuest(HappinyWitness8, 'The Happiny fled from Oreburgh and headed west, through the Oreburgh Gate. Search for another witness on the far side.');

        manaphyQuestLine.addQuest(happinyChase8);

        const happinyChase9 = new TalkToNPCQuest(HappinyWitness9, 'Search for evidence of the Happiny\'s path after turning south from Jubilife City.');
        manaphyQuestLine.addQuest(happinyChase9);

        const clearManaphyGoRock5 = new DefeatTemporaryBattleQuest('Manaphy Go-Rock Pincher', 'An ex-Go-Rock in Sandgem Town has turned to Pokémon Pinching, and wants to steal the egg first. But after all you\'ve been through to get it, he\'s in for a rude awakening');
        manaphyQuestLine.addQuest(clearManaphyGoRock5);

        const happinyChase10 = new TalkToNPCQuest(HappinyBoulders, 'After leaving Sandgem, the Happiny went south-east, across the water. There\'s only one place it could be now...');
        manaphyQuestLine.addQuest(happinyChase10);

        const catchBunearySubstitutes = new CapturePokemonTypesQuest(50, 0, PokemonType.Fighting).withDescription('Oh no, you\'re not gonna let more boulders stop you now. Catch or hatch 50 Fighting-types and smash right through them.');
        manaphyQuestLine.addQuest(catchBunearySubstitutes);

        const clearManaphyHappiny = new DefeatTemporaryBattleQuest('Manaphy Egg Protectors', 'Time to head back to Pal Park and teach this little pink snot not to steal important eggs!');
        manaphyQuestLine.addQuest(clearManaphyHappiny);

        const talkHastings4 = new TalkToNPCQuest(ManaphyHastings4, 'The egg hatched after your battle with the egg-nappers! Bring Manaphy back to Hastings in Canalave City, and close off this mission for good.');

        manaphyQuestLine.addQuest(talkHastings4);

        App.game.quests.questLines().push(manaphyQuestLine);
    }

    // Giratina quest - Available post-E4, must have obtained Azelf, Mesprit, and Uxie
    public static createGiratinaQuestLine() {
        const giratinaQuestLine = new QuestLine('Zero\'s Ambition', 'Help Zero find an entrance to the Distortion World.', new MultiRequirement([new ObtainedPokemonRequirement('Uxie'), new ObtainedPokemonRequirement('Mesprit'), new ObtainedPokemonRequirement('Azelf'), new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]), GameConstants.BulletinBoards.Sinnoh);

        const talktoZero1 = new TalkToNPCQuest(FightAreaZero1, 'Talk to Zero in the Fight Area.');
        giratinaQuestLine.addQuest(talktoZero1);

        const readSinnohMyth = new TalkToNPCQuest(CanalaveSinnohMyth, 'Read the recently discovered book in Canalave City.');
        giratinaQuestLine.addQuest(readSinnohMyth);

        const talktoZero2 = new TalkToNPCQuest(FightAreaZero2, 'Report to Zero what was in the book.');
        giratinaQuestLine.addQuest(talktoZero2);

        const talktoMesprit = new TalkToNPCQuest(VerityMesprit, 'Ask Mesprit about the Distortion World in Lake Verity.');
        giratinaQuestLine.addQuest(talktoMesprit);

        const obtain10PurpleShards = new CustomQuest(10, 0, 'Obtain 10 Purple Shards.', () => player.itemList.Purple_shard());
        giratinaQuestLine.addQuest(obtain10PurpleShards);

        const talktoAzelf = new TalkToNPCQuest(ValorAzelf, 'Ask Azelf about the Distortion World in Lake Valor.');
        giratinaQuestLine.addQuest(talktoAzelf);

        const obtain10OchreShards = new CustomQuest(10, 0, 'Obtain 10 Ochre Shards.', () => player.itemList.Ochre_shard());
        giratinaQuestLine.addQuest(obtain10OchreShards);

        const talktoUxie = new TalkToNPCQuest(AcuityUxie, 'Ask Uxie about the Distortion World in Lake Acuity.');
        giratinaQuestLine.addQuest(talktoUxie);

        const obtain10CrimsonShards = new CustomQuest(10, 0, 'Obtain 10 Crimson Shards.', () => player.itemList.Crimson_shard());
        giratinaQuestLine.addQuest(obtain10CrimsonShards);

        const clearSendoffSpring = new DefeatDungeonQuest(1, 0, 'Sendoff Spring').withDescription('Clear Sendoff Spring to meet the Lake Trio.');
        giratinaQuestLine.addQuest(clearSendoffSpring);

        const talktoLakeTrio = new TalkToNPCQuest(SendoffSpringLakeTrio, 'Talk to the Lake Trio in Sendoff Spring.');
        giratinaQuestLine.addQuest(talktoLakeTrio);

        const chargeDistortionKey = new MultipleQuestsQuest(
            [
                new GainGemsQuest(500, 0, PokemonType.Ghost),
                new CustomQuest(1, 0, 'Gain 1 Spooky Plate.', () => player.itemList.Spooky_plate()),
            ], 'Charge the key to the Distortion World.');
        giratinaQuestLine.addQuest(chargeDistortionKey);

        const talktoZero3 = new TalkToNPCQuest(SendoffSpringZero1, 'Talk to Zero in Sendoff Spring.');
        giratinaQuestLine.addQuest(talktoZero3);

        const clearZero = new DefeatTemporaryBattleQuest('Zero', 'Defeat Zero to protect the key.');
        giratinaQuestLine.addQuest(clearZero);

        const catchGiratina = new CaptureSpecificPokemonQuest('Giratina (Altered)', 1, false).withDescription('Catch the ruler of the Distortion World.');
        giratinaQuestLine.addQuest(catchGiratina);

        const talktoZero4 = new TalkToNPCQuest(SendoffSpringZero2, 'Talk to Zero in Sendoff Spring.');
        giratinaQuestLine.addQuest(talktoZero4);

        App.game.quests.questLines().push(giratinaQuestLine);
    }

    /* Unova QuestLines */

    // Started upon defeating Virbank City's gym.
    public static createPlasmaUnovaQuestLine() {
        const plasmaUnovaQuestLine = new QuestLine('Hollow Truth and Ideals', 'Prevent Team Plasma from using these dangerous Splicers.');

        const clearVirbankGrunt = new DefeatTemporaryBattleQuest('Team Plasma Grunt 1', 'A Team Plasma Grunt in Virbank City would like to steal your Pokémon. Defeat the grunt.');
        plasmaUnovaQuestLine.addQuest(clearVirbankGrunt);

        const clearCastliaSewers = new DefeatDungeonQuest(10, 0, 'Castelia Sewers').withDescription('Some Team Plasma Grunts were seen entering the Castelia Sewers. Clear Castelia Sewers.');
        plasmaUnovaQuestLine.addQuest(clearCastliaSewers);

        const talktoPlasmaGrunt1 = new TalkToNPCQuest(PlasmaGrunt1, 'Investigate the Perfectly Ordinary Frigate.');
        plasmaUnovaQuestLine.addQuest(talktoPlasmaGrunt1);

        const clearNimbasaGym = new DefeatGymQuest(1, 0, 'Nimbasa City').withDescription('Seems there\'s nothing suspicious going on in Castelia City. Time to continue your journey. Clear the Nimbasa Gym.');
        plasmaUnovaQuestLine.addQuest(clearNimbasaGym);

        const clearNimbasaGrunts = new CustomQuest (2, 0, 'Hugh thinks some Team Plasma Grunts in Nimbasa City are stealing Pokémon. Defeat the grunts.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 3')]()
        );
        plasmaUnovaQuestLine.addQuest(clearNimbasaGrunts);

        const talktoPlasmaGrunt2 = new TalkToNPCQuest(PlasmaGrunt2, 'They are definitely stealing Pokémon. Investigate the Totally Unsuspicious Frigate.');
        plasmaUnovaQuestLine.addQuest(talktoPlasmaGrunt2);

        const clearDriftveilGrunts = new CustomQuest (4, 0, 'Defeat the Team Plasma Grunts on the Totally Unsuspicious Frigate.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 4')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 5')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunts 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunts 2')]()
        );
        plasmaUnovaQuestLine.addQuest(clearDriftveilGrunts);

        const talktoZinzolinReward = () => {
            MapHelper.moveToTown('Driftveil City');
        };

        const talktoZinzolin = new TalkToNPCQuest(DriftveilZinzolin, 'Talk to Zinzolin.').withCustomReward(talktoZinzolinReward);
        plasmaUnovaQuestLine.addQuest(talktoZinzolin);

        const unovaRoute13 = new DefeatPokemonsQuest(10, 0, 13, GameConstants.Region.unova).withDescription('The Frigate is gone. Nothing to do but move forward. Clear route 13.');
        plasmaUnovaQuestLine.addQuest(unovaRoute13);

        const clearLacunosaGrunt = new DefeatTemporaryBattleQuest('Team Plasma Grunt 6', 'You have stumbled upon Zinzolin and a Team Plasma Grunt in Lacunosa Town. Defeat the grunt.');
        plasmaUnovaQuestLine.addQuest(clearLacunosaGrunt);

        const clearZinzolin1 = new DefeatTemporaryBattleQuest('Zinzolin 1', 'Defeat Zinzolin.');
        plasmaUnovaQuestLine.addQuest(clearZinzolin1);

        const clearOpelucidGym = new DefeatGymQuest(1, 0, 'Opelucid City').withDescription('Defeat the Opelucid City gym leader to obtain the DNA Splicers before Team Plasma does!');
        plasmaUnovaQuestLine.addQuest(clearOpelucidGym);

        const clearOpelucidGrunts = new CustomQuest (3, 0, 'Team Plasma has stolen the DNA Splicers and is assaulting the city with an army of grunts and shadows! Defend against the Team Plasma Assault!', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 7')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 8')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 9')]()
        );
        plasmaUnovaQuestLine.addQuest(clearOpelucidGrunts);

        const clearZinzolin2 = new DefeatTemporaryBattleQuest('Zinzolin 2', 'Defeat Zinzolin.');
        plasmaUnovaQuestLine.addQuest(clearZinzolin2);

        const clearPlasmaShadow1Reward = () => {
            MapHelper.moveToTown('Opelucid City');
        };

        const clearPlasmaShadow1 = new DefeatTemporaryBattleQuest('Plasma Shadow 1', 'Defeat the Plasma Shadow.').withCustomReward(clearPlasmaShadow1Reward);
        plasmaUnovaQuestLine.addQuest(clearPlasmaShadow1);

        const clearPlasmaFrigateReward = () => {
            MapHelper.moveToTown('Humilau City');
        };

        const clearPlasmaFrigate = new DefeatDungeonQuest(1, 0, 'Plasma Frigate')
            .withDescription('Team Plasma has fled the scene with the stolen DNA Splicers. Find and clear out the Plasma Frigate.')
            .withCustomReward(clearPlasmaFrigateReward);
        plasmaUnovaQuestLine.addQuest(clearPlasmaFrigate);

        const clearGiantChasm = new DefeatDungeonQuest(1, 0, 'Giant Chasm').withDescription('Team Plasma\'s leader Ghetsis plans on using the DNA Splicers on Kyurem in Giant Chasm. Clear the dungeon to end his evil plans.');
        plasmaUnovaQuestLine.addQuest(clearGiantChasm);

        const talktoColress = new TalkToNPCQuest(GiantChasmColress, 'Talk to Colress on the Plasma Frigate.');
        plasmaUnovaQuestLine.addQuest(talktoColress);

        const clearColress = new DefeatTemporaryBattleQuest('Colress 3', 'Defeat Colress.');
        plasmaUnovaQuestLine.addQuest(clearColress);

        const clearPlasmaShadow2 = new CustomQuest (3, 0, 'Defeat the Plasma Shadows.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 3')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 4')]()
        );
        plasmaUnovaQuestLine.addQuest(clearPlasmaShadow2);

        const talktoShadowTriad = new TalkToNPCQuest(GiantChasmShadowTriad, 'Talk to the Shadow Triad.');
        plasmaUnovaQuestLine.addQuest(talktoShadowTriad);

        const clearGhetsis1 = new DefeatTemporaryBattleQuest('Ghetsis 1', 'Ghetsis has done something to the legendary Dragon-type Pokémon inside Giant Chasm!');
        plasmaUnovaQuestLine.addQuest(clearGhetsis1);

        const ghetsisReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: plasmaUnovaQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
            App.game.keyItems.gainKeyItem(KeyItemType.DNA_splicers, true);
            $('#temporaryBattleWonModal').one('hidden.bs.modal', () => {
                KeyItemController.showGainModal(KeyItemType.DNA_splicers);
            });
        };

        const clearGhetsis2 = new DefeatTemporaryBattleQuest('Ghetsis 2', 'Defeat Ghetsis one final time!').withCustomReward(ghetsisReward);
        plasmaUnovaQuestLine.addQuest(clearGhetsis2);

        App.game.quests.questLines().push(plasmaUnovaQuestLine);
    }

    // Genesect quest - Available after clearing P2 lab
    public static createGenesectQuestLine() {
        const genesectQuestLine = new QuestLine('The Legend Awakened', 'Learn about the powerful Pokémon discovered under the P2 Laboratory.', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory')), GameConstants.BulletinBoards.Unova);

        const investigateP2 = new TalkToNPCQuest(InvestigateP2, 'Investigate the basement of the P2 Laboratory.');
        genesectQuestLine.addQuest(investigateP2);

        const battleRedGenesect1 = new DefeatTemporaryBattleQuest('Red Genesect 1', 'Fight the mysterious Pokémon in the Castelia Sewers.');
        genesectQuestLine.addQuest(battleRedGenesect1);

        const fightCasteliaSewers = new DefeatDungeonQuest(1, 0, 'Castelia Sewers').withDescription('Search the Castelia Sewers for clues about the Red Genesect.');
        genesectQuestLine.addQuest(fightCasteliaSewers);

        const talkToAncientBugHunter = new TalkToNPCQuest(AncientBugHunter1, 'Talk to the Ancient Bug Hunter in the Castelia Sewers.');
        genesectQuestLine.addQuest(talkToAncientBugHunter);

        const fightDriveGenesect = new CustomQuest (4, 0, 'Defeat the four Genesect surrounding Castelia City.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Genesect Burn')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Genesect Chill')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Genesect Douse')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Genesect Shock')]()
        );
        genesectQuestLine.addQuest(fightDriveGenesect);

        const battleRedGenesect2 = new DefeatTemporaryBattleQuest('Red Genesect 2', 'The Red Genesect is trying to escape the Castelia Sewers, stop it!');
        genesectQuestLine.addQuest(battleRedGenesect2);

        const watchGenesectFight  = new TalkToNPCQuest(GenesectFight, 'Witness the battle between the Red Genesect and another powerful Pokémon in Castelia City.');
        genesectQuestLine.addQuest(watchGenesectFight);

        const digP2 = new MineLayersQuest(5, 0).withDescription('The Red Genesect has crashed into the P2 Lab and escaped underground. Start digging to learn more.');
        genesectQuestLine.addQuest(digP2);

        const catchGenesect = new CaptureSpecificPokemonQuest('Genesect').withDescription('Catch Genesect in P2 Lab.');
        genesectQuestLine.addQuest(catchGenesect);

        App.game.quests.questLines().push(genesectQuestLine);
    }

    // XD Questline, available after Unova E4
    public static createOrreXDQuestLine() {
        const orreXDQuestLine = new QuestLine('Gale of Darkness', 'Team Cipher has returned to Orre. Stop their new evil plan!', new MultiRequirement([new QuestLineCompletedRequirement('Shadows in the Desert'), new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]), GameConstants.BulletinBoards.Unova);

        const talkToGateonSailor = new TalkToNPCQuest(GateonSailor, 'Ask around Gateon Port for clues about new Team Cipher activity.');
        orreXDQuestLine.addQuest(talkToGateonSailor);

        const battleNaps = new DefeatTemporaryBattleQuest('Cipher Peon Naps', 'Fight the Cipher Peons attacking the Pokemon HQ Lab.');
        orreXDQuestLine.addQuest(battleNaps);

        const clearGateonPort = new DefeatDungeonQuest(1, 0, 'Gateon Port Battles').withDescription('Clear Gateon Port to search for the Cipher Peons who kidnapped Professor Krane.')
            .withOptionalArgs({
                clearedMessage: 'Cipher? Nah, I don\'t play with those punks. I\'m my own man, flying solo. No, I won\'t say where I got this Zangoose.',
                npcDisplayName: 'Thug Zook',
                npcImageName: 'Thug',
            });
        orreXDQuestLine.addQuest(clearGateonPort);

        const battleChobin1 = new DefeatTemporaryBattleQuest('Chobin 1', 'Talk to Chobin at Kaminko\'s Manor, if he\'s willing to talk.');
        orreXDQuestLine.addQuest(battleChobin1);

        const talkToChobin1 = new TalkToNPCQuest(Chobin1, 'Talk to Chobin at Kaminko\'s Manor.');
        orreXDQuestLine.addQuest(talkToChobin1);

        const talkToEagun2 = new TalkToNPCQuest(Eagun2, 'Talk to Grandpa Eagun at the Relic Stone.'); // Step 5
        orreXDQuestLine.addQuest(talkToEagun2);

        const clearMtBattle = new DefeatDungeonQuest(1, 0, 'Mt. Battle').withDescription('Clear Mount Battle and see if anyone there has a lead on the source of Shadow Pokémon.')
            .withOptionalArgs({
                clearedMessage: 'Wow, you\'ve got some strong Pokémon! You might be able to beat Team Cipher! I heard they re-activated their operations at the Cipher Lab.',
                npcDisplayName: 'Vander',
                npcImageName: 'Cooltrainer (male)',
            });
        orreXDQuestLine.addQuest(clearMtBattle);

        const defeatLovrina = new DefeatDungeonBossQuest('Cipher Lab', 'Cipher Admin Lovrina', 0).withDescription('Track down the new boss of the Cipher Lab.'); //Step 7
        orreXDQuestLine.addQuest(defeatLovrina);

        const talkToLovrina = new TalkToNPCQuest(Lovrina, 'Talk to Cipher Admin Lovrina at the Cipher Lab.');
        orreXDQuestLine.addQuest(talkToLovrina);

        const clearPyriteTown = new DefeatDungeonQuest(1, 0, 'Pyrite Town Battles').withDescription('Pyrite Town is in chaos! Battle your way through to get some answers.')
            .withOptionalArgs({
                clearedMessage: 'This is Marcia live on the scene! Chaos in Pyrite Town as Team Cipher has returned! Rumors are swirling about an infamous dance machine making a scene!',
                npcDisplayName: 'Marcia',
                npcImageName: 'Reporter',
            });
        orreXDQuestLine.addQuest(clearPyriteTown);

        const battleMirorB1 = new DefeatTemporaryBattleQuest('Miror B. 1', 'Find and defeat Miror B. near a cool cave.'); // Step 10
        orreXDQuestLine.addQuest(battleMirorB1);

        const defeatExol = new DefeatDungeonBossQuest('Pyrite Building', 'Cipher Commander Exol', 0).withDescription('Track down the new boss of the Pyrite Building.');
        orreXDQuestLine.addQuest(defeatExol);

        const talkToExol = new TalkToNPCQuest(Exol, 'Talk to Cipher Commander Exol at the Pyrite Building.');
        orreXDQuestLine.addQuest(talkToExol);

        const fightPhenacCity = new DefeatDungeonQuest(10, 0, 'Phenac City Battles').withDescription('Battle through the new Cipher Peons in Phenac City.');
        orreXDQuestLine.addQuest(fightPhenacCity);

        const defeatSnattle = new DefeatDungeonBossQuest('Phenac Stadium', 'Cipher Admin Snattle', 0).withDescription('Track down the new boss of the Phenac Stadium.');
        orreXDQuestLine.addQuest(defeatSnattle);

        const talkToSnattle = new TalkToNPCQuest(Snattle, 'Talk to Cipher Admin Snattle at the Phenac Stadium.'); //Step 15
        orreXDQuestLine.addQuest(talkToSnattle);

        const RareCandyReward = () => {
            player.gainItem('Rare_Candy', 50);
            Notifier.notify({
                title: orreXDQuestLine.name,
                message: 'Mayor Trest has given you a big box of Rare Candy.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToMayorTrest = new TalkToNPCQuest(Trest, 'Talk to Mayor Trest at the Phenac City.').withCustomReward(RareCandyReward);
        orreXDQuestLine.addQuest(talkToMayorTrest);

        const talkToVerich = new TalkToNPCQuest(Verich, 'Talk to the wealthy Mr. Verich at Gateon Port to learn more about the S. S. Libra.');
        orreXDQuestLine.addQuest(talkToVerich);

        const battleChobin2 = new DefeatTemporaryBattleQuest('Chobin 2', 'Talk to Chobin at Kaminko\'s Manor, if he\'s willing to talk.');
        orreXDQuestLine.addQuest(battleChobin2);

        const talkToChobin2 = new TalkToNPCQuest(Chobin2, 'Talk to Chobin at Kaminko\'s Manor.'); // Step 19
        orreXDQuestLine.addQuest(talkToChobin2);

        const battleSmarton = new DefeatTemporaryBattleQuest('Cipher Peon Smarton', 'Fight the Cipher Peon at the wreck of the S. S. Libra.'); // Step 20
        orreXDQuestLine.addQuest(battleSmarton);

        const LuxuryReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Luxuryball, 100, false);
            Notifier.notify({
                title: orreXDQuestLine.name,
                message: 'You find a crate of Luxury Balls in the wreckage.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const searchSSLibra = new TalkToNPCQuest(SearchLibra, 'Search the S. S. Libra for clues.').withCustomReward(LuxuryReward);
        orreXDQuestLine.addQuest(searchSSLibra);

        const battleZook = new DefeatTemporaryBattleQuest('Zook', 'Fight Zook outside of the Cipher Key Lair.');
        orreXDQuestLine.addQuest(battleZook);

        const battleMirorB2 = new DefeatTemporaryBattleQuest('Miror B. 2', 'Miror B. has surfaced again! Fight him at the Outskirt Stand.');
        orreXDQuestLine.addQuest(battleMirorB2);

        const fightSnagemHideout = new DefeatDungeonQuest(10, 0, 'Snagem Hideout').withDescription('Battle through the Snagem Hideout and look for clues.');
        orreXDQuestLine.addQuest(fightSnagemHideout);

        const clearCipherKeyLair = new DefeatDungeonQuest(1, 0, 'Cipher Key Lair').withDescription('You found a key to the Cipher Key Lair. Find out what\'s inside!') // Step 25
            .withOptionalArgs({
                clearedMessage: 'Bah! No fair! Fine, you can take your precious Professor Krane. Get out of here!',
                npcDisplayName: 'Gorigan',
                npcImageName: 'Cipher Admin Gorigan',
            });
        orreXDQuestLine.addQuest(clearCipherKeyLair);

        const KraneReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: orreXDQuestLine.name,
                message: 'Professor Krane gives you a Master Ball.',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const talkToProfKrane = new TalkToNPCQuest(ProfKrane, 'Talk to Professor Krane at the Pokémon HQ Lab.').withCustomReward(KraneReward);
        orreXDQuestLine.addQuest(talkToProfKrane);

        const fightCitadarkIsle = new DefeatDungeonQuest(10, 0, 'Citadark Isle').withDescription('Battle through Team Cipher on Citadark Isle');
        orreXDQuestLine.addQuest(fightCitadarkIsle);

        const fightCitadarkIsleDome = new DefeatDungeonQuest(1, 0, 'Citadark Isle Dome').withDescription('Defeat Grand Master Greevil and XD001 in the Citadark Isle Dome.');
        orreXDQuestLine.addQuest(fightCitadarkIsleDome);

        App.game.quests.questLines().push(orreXDQuestLine);
    }

    /* Kalos QuestLines */

    // Started upon defeating Professor Sycamore in Lumiose City.
    public static createFlareKalosQuestLine() {
        const flareKalosQuestLine = new QuestLine('A Beautiful World', 'End Team Flare\'s plan to destroy the world and create a new one in its place.');

        const talkToLysandre1 = new TalkToNPCQuest(Lysandre1, 'Talk to Lysandre inside Professor Sycamore\'s lab in Lumiose City.');
        flareKalosQuestLine.addQuest(talkToLysandre1);

        const talkToKalem1 = new TalkToNPCQuest(Calem1, 'Well, that was definitely a weird guy... Seems like Calem wants to meet you somewhere in Lumiose City, go talk with him.');
        flareKalosQuestLine.addQuest(talkToKalem1);

        const talkToKalem2 = new TalkToNPCQuest(Calem2, 'Meet Calem in Ambrette Town.');
        flareKalosQuestLine.addQuest(talkToKalem2);

        const clearGlitteringCave = new DefeatDungeonQuest(1, 0, 'Glittering Cave').withDescription('Clear Glittering Cave and find the scientist.')
            .withOptionalArgs({
                clearedMessage: 'What\'s this? Well, well. What do we have here? A nosy little trainer has come poking around. Listen up! We\'re the fashionable team whose very name makes people tremble in fear: Team Flare! Team Flare\'s goal is to make it so we\'re the only ones who are happy! We don\'t care one bit about what happens to other trainers or Pokémon. Get out of here, kid. Don\'t you know not to play with fire? We\'ll obliterate you!',
                npcDisplayName: 'Team Flare Grunt',
                npcImageName: 'Team Flare Grunt (male)',
            });
        flareKalosQuestLine.addQuest(clearGlitteringCave);

        const battleTeamFlareGrunt1 = new DefeatTemporaryBattleQuest('Team Flare Grunt 1', 'It seems that Team Flare Grunt is holding the scientist captive, free him!');
        flareKalosQuestLine.addQuest(battleTeamFlareGrunt1);

        // Talk to Fossil Scientist after beating Team Flare Grunt
        const KalosFossilReward = () => {
            const item = Rand.boolean() ? 'Sail_fossil' : 'Jaw_fossil';

            ItemList[item].gain(1);
            Notifier.notify({
                title: flareKalosQuestLine.name,
                message: `Fossil Scientist has given you a ${GameConstants.humanifyString(item)}!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        };

        const talkToFossilScientist = new TalkToNPCQuest(FossilScientist, 'From what you gathered, Team Flare wanted to sell fossils for money. Talk with the fossil scientist you just rescued in Glittering Cave.').withCustomReward(KalosFossilReward);
        flareKalosQuestLine.addQuest(talkToFossilScientist);

        const clearCyllageCityGym = new DefeatGymQuest(1, 0, 'Cyllage City')
            .withDescription('With interesting thoughts about Team Flare in your head, you decide to challenge the Cyllage City Gym to become stronger.');
        flareKalosQuestLine.addQuest(clearCyllageCityGym);

        const talkToTeamFlareGrunt1 = new TalkToNPCQuest(TeamFlareGrunt1, 'You can see in Geosenge Town the Team Flare Grunt you battled earlier. Approach him once more.');
        flareKalosQuestLine.addQuest(talkToTeamFlareGrunt1);

        const battleTeamFlareGrunt2 = new DefeatTemporaryBattleQuest('Team Flare Grunt 2', 'Beat the Team Flare Grunt once more!');
        flareKalosQuestLine.addQuest(battleTeamFlareGrunt2);

        const talkToDiantha1 = new TalkToNPCQuest(Diantha1, 'You heard rumors of Diantha being in Coumarine City. Go there to check if you can see her.');
        flareKalosQuestLine.addQuest(talkToDiantha1);

        const talkToLysandre2 = new TalkToNPCQuest(Lysandre2, 'Lysandre is calling you while you are standing in Coumarine City, pick up the phone.');
        flareKalosQuestLine.addQuest(talkToLysandre2);

        const clearKalosPowerPlant = new DefeatDungeonBossQuest('Kalos Power Plant', 'Team Flare Aliana')
            .withDescription('Well, that was extremely awkward... But ignoring that, Lumiose City still hasn\'t fixed the power outage, go clear the Kalos Power Plant.')
            .withOptionalArgs({
                clearedMessage: 'You\'re quite strong. Oh yes... very strong, indeed. I certainly didn\'t expect you to be so interesting. But it matters not, we already have enough energy to power the device. I do hope we can meet again!',
                npcDisplayName: 'Team Flare Aliana',
                npcImageName: 'Team Flare Aliana',
            });
        flareKalosQuestLine.addQuest(clearKalosPowerPlant);

        const clearLumioseCityGym = new DefeatGymQuest(1, 0, 'Lumiose City').withDescription('You\'ve helped with the power outage problem, now the gym in Lumiose City is back up and you can challenge it!');
        flareKalosQuestLine.addQuest(clearLumioseCityGym);

        const talkToLysandre3 = new TalkToNPCQuest(Lysandre3, 'Professor Sycamore wants to meet you in Lumiose City. He\'s with Lysandre, go say hi.');
        flareKalosQuestLine.addQuest(talkToLysandre3);

        const clearPokéBallFactory = new DefeatDungeonQuest(1, 0, 'Poké Ball Factory')
            .withDescription('For someone so obsessed with beauty he seems to really care about filth... Anyway, the Poké Ball Factory sounds like a fun place, let\'s go check it out.')
            .withOptionalArgs({
                clearedMessage: 'No way you beat us! Wow, we are lame. Probability is just probability after all... Absolutes do not exist. But enough already! We\'ve already stolen the Poké Balls, Great Balls, and Ultra Balls. Let\'s call it good and leave.',
                npcDisplayName: 'Team Flare Bryony',
                npcImageName: 'Team Flare Bryony',
            });
        flareKalosQuestLine.addQuest(clearPokéBallFactory);

        // Talk to Poké Ball Factory Director after talking with Team Flare Bryony
        const KalosMasterBallReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: flareKalosQuestLine.name,
                message: 'The Poké Ball Factory Director has given you a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
                setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
            });
        };

        const talkToPokéBallFactoryDirector = new TalkToNPCQuest(PokéBallFactoryDirector, 'Now that Team Flare is not in the Poké Ball Factory anymore, talk with the Director that you just saved.').withCustomReward(KalosMasterBallReward);
        flareKalosQuestLine.addQuest(talkToPokéBallFactoryDirector);

        const talkToProfessorSycamore1 = new TalkToNPCQuest(ProfessorSycamore1, 'Professor Sycamore is waiting for you in Dendemille Town. He has some important things to say about the legendary Pokémon of Kalos.');
        flareKalosQuestLine.addQuest(talkToProfessorSycamore1);

        const clearFrostCavern = new DefeatDungeonQuest(1, 0, 'Frost Cavern').withDescription('You were going to Frost Cavern for Pokémon, but what you found there is Team Flare instead! Clear it!')
            .withOptionalArgs({
                clearedMessage: 'Not just strong... TOO strong! Not ordinary, indeed. Whatever, it doesn\'t matter, we already tested what we wanted to know. The Abomasnow from this cavern is a fine specimen. The more we agitate it, the stronger its Snow Warning ability becomes, making the snow fall even more furiously. Whoever has the most energy will come out on top! And it\'s Team Flare, and only Team Flare who will survive!',
                npcDisplayName: 'Team Flare Mable',
                npcImageName: 'Team Flare Mable',
            });
        flareKalosQuestLine.addQuest(clearFrostCavern);

        const clearAnistarCityGym = new DefeatGymQuest(1, 0, 'Anistar City').withDescription('So everything is over now, right? Right? Go beat Anistar City Gym!');
        flareKalosQuestLine.addQuest(clearAnistarCityGym);

        const talkToKalosTVNews = new TalkToNPCQuest(KalosTVNews, 'Lysandre is giving an important speech through the TV News. Watch it in Anistar City.');
        flareKalosQuestLine.addQuest(talkToKalosTVNews);

        const talkToLysandre4 = new TalkToNPCQuest(Lysandre4, 'Wow! Absolutely no one could have seen this coming! You think you might find Lysandre in Lumiose City where you first met him. Look for him!');
        flareKalosQuestLine.addQuest(talkToLysandre4);

        const battleTeamFlareLysandre1 = new DefeatTemporaryBattleQuest('Team Flare Lysandre 1', 'Show Team Flare Lysandre the strength of your convictions in Lumiose City!');
        flareKalosQuestLine.addQuest(battleTeamFlareLysandre1);

        const talkToAZ1 = new TalkToNPCQuest(AZ1, 'You run after Lysandre and while going through the Labs you find a jailed mysterious man in Lumiose City. It seems like he has a story to tell...');
        flareKalosQuestLine.addQuest(talkToAZ1);

        const battleTeamFlareXerosic = new DefeatTemporaryBattleQuest('Team Flare Xerosic', 'Now that you learnt what the ultimate weapon is able to do, you need to stop it. Team Flare Xerosic is in the way in Lumiose City, defeat him!');
        flareKalosQuestLine.addQuest(battleTeamFlareXerosic);

        const talkToBlueButton = new TalkToNPCQuest(BlueButton, 'Press the blue button!');
        const talkToRedButton = new TalkToNPCQuest(RedButton, 'Press the red button!');

        flareKalosQuestLine.addQuest(new MultipleQuestsQuest([
            talkToBlueButton,
            talkToRedButton,
        ],'Xerosic offers you the possibility to stop the ultimate weapon in Lumiose City. Blue or Red Button, press one!', 0, 1)); //Step 24

        const clearTeamFlareSecretHQ1 = new DefeatDungeonQuest(1, 0, 'Team Flare Secret HQ').withDescription('The ultimate weapon was activated in Geosenge Town! Go to the Team Flare Secret HQ to put a stop to it! First step: Beating Team Flare Aliana.')
            .withOptionalArgs({
                clearedMessage: 'I had fun at the Kalos Power Plant. Of course, we could have generated electricity with Team Flare\'s technology, too, you know. We just didn\'t think it justified the cost. To create a world for us and us alone, we have to play it smart, you see.',
                npcDisplayName: 'Team Flare Aliana',
                npcImageName: 'Team Flare Aliana',
            });
        flareKalosQuestLine.addQuest(clearTeamFlareSecretHQ1);

        const clearTeamFlareSecretHQ2 = new DefeatDungeonQuest(1, 0, 'Team Flare Secret HQ').withDescription('Continue traversing through the Team Flare Secret HQ! Second step: Beating Team Flare Celosia.')
            .withOptionalArgs({
                clearedMessage: 'In reality, those stones that line Route 10 are the graves of Pokémon. When the ultimate weapon was used to end that horrible war over 3,000 years ago, it stole the lives of all those Pokémon. Their lives were the price of peace then. And if we want to make our own wishes come true today, we in Team Flare also have to sacrifice something precious.',
                npcDisplayName: 'Team Flare Celosia',
                npcImageName: 'Team Flare Celosia',
            });
        flareKalosQuestLine.addQuest(clearTeamFlareSecretHQ2);

        const clearTeamFlareSecretHQ3 = new DefeatDungeonQuest(1, 0, 'Team Flare Secret HQ').withDescription('You should be halfway through. Go further in the Team Flare Secret HQ! Third step: Beating Team Flare Bryony.')
            .withOptionalArgs({
                clearedMessage: 'We\'ve been using the electricity we stole from the Power Plant to get everything prepared for activating the ultimate weapon. But it\'s not like that\'s all we\'ll need to use it. Are you following me? We\'ll need energy absorbed from Pokémon to power the device! Yes! It\'s the stones on Route 10 that will steal that energy for us and power the ultimate weapon.',
                npcDisplayName: 'Team Flare Bryony',
                npcImageName: 'Team Flare Bryony',
            });
        flareKalosQuestLine.addQuest(clearTeamFlareSecretHQ3);

        const clearTeamFlareSecretHQ4 = new  DefeatDungeonQuest(1, 0, 'Team Flare Secret HQ').withDescription('You are getting close. Resume delving into the Team Flare Secret HQ! Fourth step: Beating Team Flare Mable.')
            .withOptionalArgs({
                clearedMessage: 'The power of the Legendary Pokémon... The power to grant life to all around it... The power to steal life from all around it... It\'s a mysterious ability that even scientists like us haven\'t been able to really decode. What d\'you think will happen to the world if we fuel the ultimate weapon with something like that?',
                npcDisplayName: 'Team Flare Mable',
                npcImageName: 'Team Flare Mable',
            });
        flareKalosQuestLine.addQuest(clearTeamFlareSecretHQ4);

        const clearTeamFlareSecretHQ5 = new  DefeatDungeonQuest(1, 0, 'Team Flare Secret HQ').withDescription('You are almost there! One more time traversing through the Team Flare Secret HQ and you\'ll get to the end! Fifth step: Beating Team Flare Lysandre.');
        flareKalosQuestLine.addQuest(clearTeamFlareSecretHQ5);

        const talkToTeamFlareLysandre1 = new TalkToNPCQuest(TeamFlareLysandre1, 'This is it, you\'ve beaten Lysandre at the top of his game in Team Flare Secret HQ, right? He might have something else to say...');
        flareKalosQuestLine.addQuest(talkToTeamFlareLysandre1);

        const battleXerneas = new DefeatTemporaryBattleQuest('Xerneas', 'Calm Xerneas down!');
        const battleYveltal = new DefeatTemporaryBattleQuest('Yveltal', 'Calm Yveltal down!');

        flareKalosQuestLine.addQuest(new MultipleQuestsQuest([
            battleXerneas,
            battleYveltal,
        ],'You go to the lowest level of the Team Flare Secret HQ as Lysandre told you to. There you find Xerneas and Yveltal fighting each other! Fight them yourself and calm them down!'));

        const talkToTeamFlareBossLysandre1 = new TalkToNPCQuest(TeamFlareBossLysandre1, 'Lysandre appears menacingly in front of you in Team Flare Secret HQ. He doesn\'t seem fazed about you subsiding both legendary Pokémon.');
        flareKalosQuestLine.addQuest(talkToTeamFlareBossLysandre1);

        const battleTeamFlareBossLysandre1 = new DefeatTemporaryBattleQuest('Team Flare Boss Lysandre 1', 'Stop Team Flare Boss Lysandre in Team Flare Secret HQ once and for all!!');
        flareKalosQuestLine.addQuest(battleTeamFlareBossLysandre1);

        const clearKalosLeague = new DefeatGymQuest(1, 0, 'Champion Diantha').withDescription('You did it! You saved Kalos! There is nothing else to do except to continue your journey to beat the Kalos Pokémon League!');
        flareKalosQuestLine.addQuest(clearKalosLeague);

        // Battle AZ and finish the quest
        const KalosKeyStoneReward = () => {
            player.gainItem('Key_stone', 1);
            Notifier.notify({
                message: 'You got a Key Stone for completing the quest!',
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
            });
        };

        const battleAZ1 = new DefeatTemporaryBattleQuest('Storyline AZ', 'What an amazing trainer! You became Kalos Champion! There is a parade in your honor in Lumiose City. But wait, AZ is there asking you for a battle. Show him what being a Pokémon Trainer is like!').withCustomReward(KalosKeyStoneReward);
        flareKalosQuestLine.addQuest(battleAZ1);

        App.game.quests.questLines().push(flareKalosQuestLine);
    }

    // Delta Episode - Available upon defeating Shalour City's gym
    public static createDeltaEpisodeQuestLine() {
        const deltaEpisodeQuestLine = new QuestLine('The Delta Episode', 'A catastrophe is on the horizon! Work with the people of Hoenn to stop it.', new GymBadgeRequirement(BadgeEnums.Rumble), GameConstants.BulletinBoards.Kalos);

        const talkToCozmo1 = new TalkToNPCQuest(Cozmo1, 'Talk to Dr. Cozmo in Fallarbor Town.');
        deltaEpisodeQuestLine.addQuest(talkToCozmo1);

        const talkToZinnia1 = new TalkToNPCQuest(Zinnia1, 'Talk to the mysterious figure at the Sky Pillar.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia1);

        const talkToDeltaMay1 = new TalkToNPCQuest(DeltaMay1, 'Travel with Zinnia to Littleroot Town and talk to May.');
        deltaEpisodeQuestLine.addQuest(talkToDeltaMay1);

        const talkToNewsBirch = new TalkToNPCQuest(NewsBirch, 'Discuss the news with Professor Birch in Littleroot Town.');
        deltaEpisodeQuestLine.addQuest(talkToNewsBirch);

        const talkToDeltaMay2 = new TalkToNPCQuest(DeltaMay2, 'Find out why May is so mad in Littleroot Town.');
        deltaEpisodeQuestLine.addQuest(talkToDeltaMay2);

        const fightCourtney1 = new DefeatTemporaryBattleQuest('Courtney 1', 'Defeat Courtney');
        const fightMatt1 = new DefeatTemporaryBattleQuest('Matt 1', 'Defeat Matt');

        deltaEpisodeQuestLine.addQuest(new MultipleQuestsQuest(
            [
                fightCourtney1,
                fightMatt1,
            ], 'Follow Zinnia to Petalburg City.'));

        const talkToDeltaSteven1 = new TalkToNPCQuest(DeltaSteven1, 'Answer your ringing Holo Caster.');
        const talkToDeltaWally1 = new TalkToNPCQuest(DeltaWally1, 'Talk to Wally.');

        deltaEpisodeQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talkToDeltaSteven1,
                talkToDeltaWally1,
            ], 'Talk to Wally and answer your ringing Holo Caster in Petalburg City.'));

        const clearGranite = new DefeatDungeonQuest(10, 0, 'Granite Cave').withDescription('Clear Granite Cave 10 times.');

        const findStars = new CustomQuest(1, 0, 'Find a Star Piece.', () => player.itemList.Star_piece());

        deltaEpisodeQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearGranite,
                findStars,
            ], 'Search Granite Cave and look for Star Pieces.'));

        const talkToZinnia2 = new TalkToNPCQuest(Zinnia2, 'Talk to Zinnia in Granite Cave.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia2);

        const fightZinnia1 = new DefeatTemporaryBattleQuest('Zinnia 1', 'Defeat Zinnia in Granite Cave').withCustomReward(() => ItemList.Meteorite_Shard_Delta.gain(1));
        deltaEpisodeQuestLine.addQuest(fightZinnia1);

        const talkToZinnia3 = new TalkToNPCQuest(Zinnia3, 'Talk to Zinnia in Granite Cave.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia3);

        const talkToCozmo2 = new TalkToNPCQuest(Cozmo2, 'Talk to Dr. Cozmo at the Mossdeep Space Center.');
        deltaEpisodeQuestLine.addQuest(talkToCozmo2);

        const talkToZinnia4 = new TalkToNPCQuest(Zinnia4, 'Talk to Zinnia at the Mossdeep Space Center.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia4);

        const talkToCozmo3 = new TalkToNPCQuest(Cozmo3, 'Talk to Dr. Cozmo at the Mossdeep Space Center.');
        deltaEpisodeQuestLine.addQuest(talkToCozmo3);

        const clearMeteor = new DefeatDungeonQuest(10, 0, 'Meteor Falls').withDescription('Clear Meteor Falls 10 times to search for the Meteor Shard.');
        deltaEpisodeQuestLine.addQuest(clearMeteor);

        const talkToDracElder1 = new TalkToNPCQuest(DraconidElder1, 'Talk to the Draconid Elder in Meteor Falls.');
        deltaEpisodeQuestLine.addQuest(talkToDracElder1);

        const fightDracElder = new DefeatTemporaryBattleQuest('Draconid Elder', 'Defeat the Draconid Elder in Meteor Falls.');
        deltaEpisodeQuestLine.addQuest(fightDracElder);

        const talkToDracElder2 = new TalkToNPCQuest(DraconidElder2, 'Talk to the Draconid Elder in Meteor Falls.').withCustomReward(() => ItemList.Meteorite_Shard_Delta.gain(1));
        deltaEpisodeQuestLine.addQuest(talkToDracElder2);

        const fightAquaGrunts = new DefeatTemporaryBattleQuest('Aqua Grunt', 'Defeat the Aqua Grunt.');
        const fightMagmaGrunts = new DefeatTemporaryBattleQuest('Magma Grunt', 'Defeat the Magma Grunt.');

        deltaEpisodeQuestLine.addQuest(new MultipleQuestsQuest(
            [
                fightAquaGrunts,
                fightMagmaGrunts,
            ], 'Defeat the Team Aqua and Magma Grunts attacking the Mossdeep Space Center.'));

        const fightCourtney2 = new DefeatTemporaryBattleQuest('Courtney 2', 'Defeat Courtney');
        const fightMatt2 = new DefeatTemporaryBattleQuest('Matt 2', 'Defeat Matt');

        deltaEpisodeQuestLine.addQuest(new MultipleQuestsQuest(
            [
                fightCourtney2,
                fightMatt2,
            ], 'Defeat the admins trying to take over the Mossdeep Space Center.'));

        const talkToZinnia5 = new TalkToNPCQuest(Zinnia5, 'Talk to Zinnia at the Mossdeep Space Center.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia5);

        const clearAquaHideoutDelta = new DefeatDungeonQuest(1, 0, 'Aqua Hideout').withDescription('Follow Zinnia to the Aqua hideout and search for her.');
        deltaEpisodeQuestLine.addQuest(clearAquaHideoutDelta);

        const talkToArchie = new TalkToNPCQuest(Archie, 'Talk to Archie in the Team Aqua Hideout.');
        deltaEpisodeQuestLine.addQuest(talkToArchie);

        const clearMagmaHideoutDelta = new DefeatDungeonQuest(1, 0, 'Magma Hideout').withDescription('Follow Zinnia to the Magma Hideout and search for her.');
        deltaEpisodeQuestLine.addQuest(clearMagmaHideoutDelta);

        const talkToMaxie = new TalkToNPCQuest(Maxie, 'Talk to Maxie in the Team Magma Hideout.');
        deltaEpisodeQuestLine.addQuest(talkToMaxie);

        const talkToWallace3 = new TalkToNPCQuest(Wallace3, 'Talk to Wallace in Sootopolis City.');
        deltaEpisodeQuestLine.addQuest(talkToWallace3);

        const fightDeltaWallace = new DefeatTemporaryBattleQuest('Delta Wallace', 'Defeat Wallace in Sootopolis City.');
        deltaEpisodeQuestLine.addQuest(fightDeltaWallace);

        const fightZinnia2 = new DefeatTemporaryBattleQuest('Zinnia 2', 'Defeat Zinnia at the Sky Pillar.');
        deltaEpisodeQuestLine.addQuest(fightZinnia2);

        const catchDeltaRayquaza = new CaptureSpecificPokemonQuest('Rayquaza', 1, true);
        deltaEpisodeQuestLine.addQuest(catchDeltaRayquaza);

        const MeteoriteReward = () => {
            player.gainMegaStone(GameConstants.MegaStoneType.Meteorite);
            Notifier.notify({
                title: deltaEpisodeQuestLine.name,
                message: 'Your Meteorite Shards combine into a Meteorite!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talkToZinnia6 = new TalkToNPCQuest(Zinnia6, 'Talk to Zinnia at the Sky Pillar.').withCustomReward(MeteoriteReward);
        deltaEpisodeQuestLine.addQuest(talkToZinnia6);

        const catchMegaRayquaza = new CaptureSpecificPokemonQuest('Mega Rayquaza').withDescription('Mega Evolve Rayquaza.');
        deltaEpisodeQuestLine.addQuest(catchMegaRayquaza);

        const talkToZinnia7 = new TalkToNPCQuest(Zinnia7, 'Talk to Zinnia at the Sky Pillar.');
        deltaEpisodeQuestLine.addQuest(talkToZinnia7);

        const fightDeoxys = new DefeatTemporaryBattleQuest('Deoxys', 'Fly Mega Rayquaza into space to destroy the Meteor.');
        deltaEpisodeQuestLine.addQuest(fightDeoxys);

        const talkToCozmo4 = new TalkToNPCQuest(Cozmo4, 'Talk to Dr. Cozmo at the Mossdeep Space Center.');
        deltaEpisodeQuestLine.addQuest(talkToCozmo4);

        App.game.quests.questLines().push(deltaEpisodeQuestLine);
    }

    // Available after Delta step 28, must have obtained Groudon and Kyogre
    public static createPrimalReversionQuestLine() {
        const primalReversionQuestLine = new QuestLine('Primal Reversion', 'Teams Aqua and Magma have been trying to unlock the Primal power of Groudon and Kyogre.', new MultiRequirement([new QuestLineStepCompletedRequirement('The Delta Episode', 28), new ObtainedPokemonRequirement('Groudon'), new ObtainedPokemonRequirement('Kyogre')]), GameConstants.BulletinBoards.Hoenn);

        const talkToMrStone1 = new TalkToNPCQuest(MrStone1, 'Talk to Mr. Stone in Slateport City.');
        primalReversionQuestLine.addQuest(talkToMrStone1);

        const clearGranite2 = new DefeatDungeonQuest(10, 0, 'Granite Cave').withDescription('Clear Granite Cave 10 times to search for the Primal Reversion Mural.');
        primalReversionQuestLine.addQuest(clearGranite2);

        const viewPrimalMural1 = new TalkToNPCQuest(PrimalMural1, 'Examine the first Primal Mural in Granite Cave.');

        const viewPrimalMural2 = new TalkToNPCQuest(PrimalMural2, 'Examine the second Primal Mural in Granite Cave.');

        primalReversionQuestLine.addQuest(new MultipleQuestsQuest(
            [
                viewPrimalMural1,
                viewPrimalMural2,
            ], 'Examine the Primal Murals.'));

        const talkToSteven = new TalkToNPCQuest(PrimalSteven, 'Talk to Steven in the Granite Cave to learn more about the Primal Murals.');
        primalReversionQuestLine.addQuest(talkToSteven);

        const talkToStern1 = new TalkToNPCQuest(Stern1, 'Find Captain Stern at Sea Mauville during Thunderstorm Weather.');
        primalReversionQuestLine.addQuest(talkToStern1);

        const fightStern = new DefeatTemporaryBattleQuest('Captain Stern', 'Fight Captain Stern at Sea Mauville.');
        primalReversionQuestLine.addQuest(fightStern);

        const talkToStern2 = new TalkToNPCQuest(Stern2, 'Talk to Captain Stern at Sea Mauville about the mysteries of the sea.');
        primalReversionQuestLine.addQuest(talkToStern2);

        const findMetalCoats = new CustomQuest(10, 0, 'Find 10 Metal Coats.', () => player.itemList.Metal_coat());

        const findMysticWater = new CustomQuest(1, 0, 'Find one Mystic Water.', () => player.itemList.Mystic_Water());

        const findHeatRocks = new CustomQuest(3, 0, 'Find 3 Heat Rocks.', () => player.itemList.Heat_rock());

        primalReversionQuestLine.addQuest(new MultipleQuestsQuest(
            [
                findMetalCoats,
                findMysticWater,
                findHeatRocks,
            ], 'Obtain the items Captain Stern needs to upgrade the Submarine.'));

        const talkToStern3 = new TalkToNPCQuest(Stern3, 'Talk to Captain Stern at Sea Mauville and upgrade the submarine.');
        primalReversionQuestLine.addQuest(talkToStern3);

        const clearSeafloorCavern2 = new DefeatDungeonQuest(10, 0, 'Seafloor Cavern').withDescription('Clear the Seafloor Cavern 10 times to learn more about the mysterious occurrences.');
        primalReversionQuestLine.addQuest(clearSeafloorCavern2);

        const fightArchiePrimal = new DefeatTemporaryBattleQuest('Archie Primal', 'Defeat Archie');
        const fightMaxiePrimal = new DefeatTemporaryBattleQuest('Maxie Primal', 'Defeat Maxie');

        primalReversionQuestLine.addQuest(new MultipleQuestsQuest(
            [
                fightArchiePrimal,
                fightMaxiePrimal,
            ], 'Defeat the Team Aqua and Team Magma leaders in the Seafloor Cavern.'));

        const clearWeatherInstitute2 = new DefeatDungeonQuest(10, 0, 'Weather Institute').withDescription('Clear the Weather Institute 10 times to search for clues about Archie and Maxie\'s plans.');
        primalReversionQuestLine.addQuest(clearWeatherInstitute2);

        const weatherScan = new TalkToNPCQuest(WeatherScan, 'Scan the area for unusual weather at the Weather Institute.');
        primalReversionQuestLine.addQuest(weatherScan);

        const clearMtPyre = new DefeatDungeonQuest(1, 0, 'Mt. Pyre').withDescription('Investigate Mt. Pyre for the source of the disturbances.');
        primalReversionQuestLine.addQuest(clearMtPyre);

        const talkToPrimalArchie = new TalkToNPCQuest(PrimalArchie, 'Talk to Archie.');

        const talkToPrimalMaxie = new TalkToNPCQuest(PrimalMaxie, 'Talk to Maxie.');

        primalReversionQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talkToPrimalArchie,
                talkToPrimalMaxie,
            ], 'Find out what the Team Leaders are up to at Mt. Pyre.'));

        const fightPrimalGroudon = new DefeatTemporaryBattleQuest('Primal Groudon', 'Defeat Primal Groudon in Harsh Sunlight Weather.');
        const fightPrimalKyogre = new DefeatTemporaryBattleQuest('Primal Kyogre', 'Defeat Primal Kyogre in Raining Weather.');

        primalReversionQuestLine.addQuest(new MultipleQuestsQuest(
            [
                fightPrimalGroudon,
                fightPrimalKyogre,
            ], 'Defeat the Primal Reversions. Predict their rampage by monitoring the weather at the Weather Institute.'));

        const talkToMrStone2 = new TalkToNPCQuest(MrStone2, 'Talk to Mr. Stone in Slateport City.');
        primalReversionQuestLine.addQuest(talkToMrStone2);

        App.game.quests.questLines().push(primalReversionQuestLine);
    }

    // Available after defeating Santalune City's Gym
    public static createDetectivePikachuQuestLine() {
        const detectivePikachuQuestLine = new QuestLine('Detective Pikachu', 'Detective Pikachu\'s partner has gone missing, and he needs your help!', new MultiRequirement([new ObtainedPokemonRequirement('Detective Pikachu'), new GymBadgeRequirement(BadgeEnums.Bug)]) , GameConstants.BulletinBoards.Kalos);

        const searchForClues1 = new TalkToNPCQuest(searchForClues, 'Search Goldenrod City for clues.');
        detectivePikachuQuestLine.addQuest(searchForClues1);

        const aipomAlley = new DefeatTemporaryBattleQuest('Aipom Alley', 'Defeat the Aipoms').withCustomReward(() => ItemList.Mysterious_Vial_Detective_Pikachu.gain(1));
        detectivePikachuQuestLine.addQuest(aipomAlley);

        const searchForClues2 = new DefeatDungeonQuest(1, 0, 'Radio Tower').withDescription('The Aipoms dropped some sort of vial while they were running away. It looks like they were headed towards the Radio Tower. Find it!');
        detectivePikachuQuestLine.addQuest(searchForClues2);

        const searchForClues3 = new TalkToNPCQuest(Informant1, 'Detective Pikachu has an informant who knows more about the mysterious vial. Meet with him in Saffron City.');
        detectivePikachuQuestLine.addQuest(searchForClues3);

        const mimeInterview = new DefeatTemporaryBattleQuest('Mime Interview', 'The informant is proving hard to convince. Time to get physical!');
        detectivePikachuQuestLine.addQuest(mimeInterview);

        const searchForClues4 = new TalkToNPCQuest(Informant2, 'The informant is finally willing to "talk", find out what he has to say.');
        detectivePikachuQuestLine.addQuest(searchForClues4);

        const undergroundFightingRing = new DefeatTemporaryBattleQuest('Underground Fighting Ring', 'Infiltrate the underground fighting ring.');
        detectivePikachuQuestLine.addQuest(undergroundFightingRing);

        const searchForClues5 = new TalkToNPCQuest(HowardClifford1, 'Go to Clifford Industries in Goldenrod City to demand some answers.');
        detectivePikachuQuestLine.addQuest(searchForClues5);

        const searchForClues6 = new TalkToNPCQuest(LucyStevens1, 'Meet up with investigative journalist Lucy Stevens in Hearthome City');
        detectivePikachuQuestLine.addQuest(searchForClues6);

        const searchForClues7 = new DefeatDungeonQuest(1, 0, 'P2 Laboratory').withDescription('Search the research laboratory for clues.');
        detectivePikachuQuestLine.addQuest(searchForClues7);

        const labAmbush = new DefeatTemporaryBattleQuest('Lab Ambush', 'It was an ambush! You have been followed to Nuvema Town, defeat the mysterious attackers and escape!');
        detectivePikachuQuestLine.addQuest(labAmbush);

        const searchForClues8 = new TalkToNPCQuest(Mewtwo1, 'Detective Pikachu is injured. He asks you to get help from his friend near Cerulean Cave');
        detectivePikachuQuestLine.addQuest(searchForClues8);

        const searchForClues9 = new TalkToNPCQuest(HowardClifford2, 'Confront Howard Clifford in Goldenrod City about his involvement with the R vials.');
        detectivePikachuQuestLine.addQuest(searchForClues9);

        const imposterAttack = new DefeatTemporaryBattleQuest('Imposter', 'Defeat Howard\'s bodyguard and escape.');
        detectivePikachuQuestLine.addQuest(imposterAttack);

        const howardConfront = new TalkToNPCQuest(HowardClifford3, 'Give Howard Clifford one last chance to surrender!');
        detectivePikachuQuestLine.addQuest(howardConfront);

        const possessedFight = new DefeatTemporaryBattleQuest('Possessed Mewtwo', 'Defeat Mewtwo to free it from Howard\'s control!');
        detectivePikachuQuestLine.addQuest(possessedFight);

        const searchForClues10 = new TalkToNPCQuest(Mewtwo2, 'Talk to Mewtwo near Cerulean Cave about Detective Pikachu\'s partner.');
        detectivePikachuQuestLine.addQuest(searchForClues10);

        const DetectiveRaichuReward = () => {
            App.game.party.gainPokemonByName('Detective Raichu');
            Notifier.notify({
                title: detectivePikachuQuestLine.name,
                message: 'Detective Pikachu\'s partner has been nursed back to health!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const searchForClues11 = new TalkToNPCQuest(DetectiveRaichu, 'Talk to Detective Raichu').withCustomReward(DetectiveRaichuReward);
        detectivePikachuQuestLine.addQuest(searchForClues11);

        App.game.quests.questLines().push(detectivePikachuQuestLine);
    }

    // Available after defeating Snowbelle City's Gym
    public static createVivillonQuestLine() {
        const vivillonQuestLine = new QuestLine('The Great Vivillon Hunt!', 'Discover the beauty of Vivillon.', new GymBadgeRequirement(BadgeEnums.Iceberg), GameConstants.BulletinBoards.Kalos);

        const createVivillonQuest = (type: PokemonType, vivillon: PokemonNameType, hint: string) => {
            // Capture 100 Water type Pokemon
            const catchType = new CapturePokemonTypesQuest(100, 0, type).withDescription(`Capture or hatch 100 ${PokemonType[type]}-type Pokémon.`);
            vivillonQuestLine.addQuest(catchType);

            // Capture Vivillon in a dungeon
            const vivillonAdd = () => {
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `A Vivillon is hiding somewhere.\n${hint}`,
                    type: NotificationConstants.NotificationOption.info,
                });
            };
            const vivillonRemove = () => {
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `You caught the rare ${vivillon}!`,
                    type: NotificationConstants.NotificationOption.success,
                });
            };
            const catchVivillon = new CaptureSpecificPokemonQuest(vivillon).withCustomReward(vivillonRemove).withOnLoad(vivillonAdd).withDescription(`Find and capture the rare Vivillon!\nHint: ${hint}`);
            vivillonQuestLine.addQuest(catchVivillon);
        };

        createVivillonQuest(PokemonType.Water, 'Vivillon (Marine)', 'It has been spotted at some Lakes.');
        createVivillonQuest(PokemonType.Psychic, 'Vivillon (Modern)', 'It\'s surrounded by strong Pokémon.');
        createVivillonQuest(PokemonType.Poison, 'Vivillon (Jungle)', 'It has been spotted in a swamp.');
        createVivillonQuest(PokemonType.Dark, 'Vivillon (Monsoon)', 'It\'s hiding at a dark place.');
        createVivillonQuest(PokemonType.Steel, 'Vivillon (Tundra)', 'It flew into a factory.');
        createVivillonQuest(PokemonType.Fire, 'Vivillon (Sun)', 'It seems to like hot places.');
        createVivillonQuest(PokemonType.Fighting, 'Vivillon (Archipelago)', 'It\'s sitting on a swaying pillar.');
        createVivillonQuest(PokemonType.Ghost, 'Vivillon (Elegant)', 'It\'s visiting an abandoned and spooky place.');
        createVivillonQuest(PokemonType.Fairy, 'Vivillon (Ocean)', 'It\'s flying around an overgrown place full of dreams.');
        createVivillonQuest(PokemonType.Electric, 'Vivillon (Continental)', 'It\'s currently in a City full of Electric-type Pokémon.');
        createVivillonQuest(PokemonType.Bug, 'Vivillon (River)', 'It hides in a dark Forest.');
        createVivillonQuest(PokemonType.Flying, 'Vivillon (Polar)', 'It\'s high up in the sky.');
        createVivillonQuest(PokemonType.Ground, 'Vivillon (Sandstorm)', 'It got lost in the desert sand.');
        createVivillonQuest(PokemonType.Grass, 'Vivillon (Garden)', 'It only shows up amongst the most beautiful flowers.');
        createVivillonQuest(PokemonType.Rock, 'Vivillon (High Plains)', 'It has been spotted dancing in the moonlight.');
        createVivillonQuest(PokemonType.Dragon, 'Vivillon (Savanna)', 'It\'s surrounded by dragons.');
        createVivillonQuest(PokemonType.Ice, 'Vivillon (Icy Snow)', 'It can be found at a very cold place.');

        // Capture 200 Normal type Pokemon
        const catchNormal = new CapturePokemonTypesQuest(200, 0, PokemonType.Normal).withDescription('Capture or hatch 200 Normal-type Pokémon.');
        vivillonQuestLine.addQuest(catchNormal);

        // Capture Vivillon (Pokéball)
        const viviBallAdd = () => {
            Notifier.notify({
                title: vivillonQuestLine.name,
                message: 'A Vivillon is hiding somewhere.\nOnly the strongest Challengers can reach it.',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const viviBalldone = () => {
            Notifier.notify({
                title: vivillonQuestLine.name,
                message: 'You caught the last rare Vivillon (Poké Ball).\nCongratulations!',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchBall = new CaptureSpecificPokemonQuest('Vivillon (Poké Ball)').withDescription('Find and capture the rare Vivillon!\nHint: Only the strongest Challengers can reach it.').withCustomReward(viviBalldone).withOnLoad(viviBallAdd);
        vivillonQuestLine.addQuest(catchBall);

        // Add quest to quest line
        App.game.quests.questLines().push(vivillonQuestLine);
    }

    // Available post-E4
    public static createAshKetchumQuestLine() {
        const ashKetchumQuestLine = new QuestLine('The New Kid', 'A new kid from your home town is making waves. Show him who the real prodigy of Pallet Town is.', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion), GameConstants.BulletinBoards.Kalos);

        const clearKantoAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Kanto', 'Defeat the kid near Pallet Town.');
        ashKetchumQuestLine.addQuest(clearKantoAsh);

        const clearJohtoAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Johto', 'He\'s not stopping. Find the kid in Johto.');
        ashKetchumQuestLine.addQuest(clearJohtoAsh);

        const clearHoennAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Hoenn', 'He just won\'t learn his lesson. Defeat the kid again in Hoenn.');
        ashKetchumQuestLine.addQuest(clearHoennAsh);

        const clearSinnohAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Sinnoh', 'Who does this kid think he is anyway? Pretending he\'s the main character. He\'s in Sinnoh now.');
        ashKetchumQuestLine.addQuest(clearSinnohAsh);

        const clearUnovaAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Unova', 'The kid is hiding in Unova!');
        ashKetchumQuestLine.addQuest(clearUnovaAsh);

        const AshKetchumReward = () => {
            App.game.party.gainPokemonByName('Ash-Greninja');
            Notifier.notify({
                title: ashKetchumQuestLine.name,
                message: 'You obtained Ash-Greninja!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearKalosAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Kalos', 'Maybe you were too hard on the kid... You should offer him an apology in Kalos.').withCustomReward(AshKetchumReward);
        ashKetchumQuestLine.addQuest(clearKalosAsh);

        App.game.quests.questLines().push(ashKetchumQuestLine);
    }

    // Available post-E4, must have captured Doublade
    public static createPrincessDiancieQuestLine() {
        const princessDiancieQuestLine = new QuestLine('Princess Diancie', 'Princess Diancie has been spotted in Kalos! She\'s searching for something.', new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_Malva), new GymBadgeRequirement(BadgeEnums.Elite_Siebold), new GymBadgeRequirement(BadgeEnums.Elite_Wikstrom), new GymBadgeRequirement(BadgeEnums.Elite_Drasna)]) , GameConstants.BulletinBoards.Kalos);

        const catchFairy = new CapturePokemonTypesQuest(100, 0, PokemonType.Fairy).withDescription('Capture or hatch 100 Fairy-type Pokémon to follow Diancie\'s Fairy Aura.');
        princessDiancieQuestLine.addQuest(catchFairy);

        const fightRiot = new DefeatTemporaryBattleQuest('Riot', 'Defend Diancie from the attacking ninja in Shalour City.');
        princessDiancieQuestLine.addQuest(fightRiot);

        const fightMerilyn = new DefeatTemporaryBattleQuest('Merilyn', 'Diancie has escaped to the shopping mall in Lumiose City, but is under attack again!');
        princessDiancieQuestLine.addQuest(fightMerilyn);

        const diamondDomain = new MineLayersQuest(5, 0).withDescription('Diancie has fled to the Diamond Domain. Dig in the Underground to find it.');
        princessDiancieQuestLine.addQuest(diamondDomain);

        const fightSteels = new DefeatTemporaryBattleQuest('Millis and Argus Steel', 'Millis and Argus Steel let you do the hard work while they set up an ambush in Shalour City.');
        princessDiancieQuestLine.addQuest(fightSteels);

        const bladeForme = new TalkToNPCQuest(ExamineAegislash, 'Millis and Argus Steel fled but their Aegislash stayed behind. Look for it in Shalour City and find out what it wants!');
        princessDiancieQuestLine.addQuest(bladeForme);

        const heartDiamond = new GainGemsQuest(1000, 0, PokemonType.Fairy).withCustomReward(() => ItemList.Heart_Diamond_Diancie.gain(1)).withDescription('Diancie needs help building a Heart Diamond to stabilize the Diamond Domain. Gather some Fairy Gems for her.');
        princessDiancieQuestLine.addQuest(heartDiamond);

        const thanksDiancie = new TalkToNPCQuest(ThanksDiancie, 'Talk to Princess Diancie in Shalour City.');
        princessDiancieQuestLine.addQuest(thanksDiancie);

        const DiancieCatch = new CaptureSpecificPokemonQuest('Diancie').withDescription('Capture Diancie in Reflection Cave.');

        princessDiancieQuestLine.addQuest(DiancieCatch);

        const fightYveltal = new DefeatTemporaryBattleQuest('Rampaging Yveltal', 'A rampaging Yveltal is threatening the Diamond Domain! Help Diancie defeat it!');
        princessDiancieQuestLine.addQuest(fightYveltal);

        App.game.quests.questLines().push(princessDiancieQuestLine);
    }

    public static createClashOfAgesQuestLine() {
        const clashOfAgesQuestLine = new QuestLine('Clash of Ages', 'Hoopa is up to something mischievous...', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion) , GameConstants.BulletinBoards.Kalos);

        const catchHoopa = new CaptureSpecificPokemonQuest('Hoopa').withDescription('Catch Hoopa to learn more.');
        clashOfAgesQuestLine.addQuest(catchHoopa);

        const talkToBaraz1 = new TalkToNPCQuest(Baraz1, 'Talk to Baraz in Kiloude City.');
        clashOfAgesQuestLine.addQuest(talkToBaraz1);

        const hoopaBeatPsychic = new CustomQuest(100, 0, 'Defeat 100 Psychic-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        clashOfAgesQuestLine.addQuest(hoopaBeatPsychic);

        const talkToBaraz2 = new TalkToNPCQuest(Baraz2, 'That didn\'t work. Talk to Baraz in Kiloude City.');
        clashOfAgesQuestLine.addQuest(talkToBaraz2);

        const hoopaCatchPsychic = new CapturePokemonTypesQuest(100, 0, PokemonType.Psychic);
        clashOfAgesQuestLine.addQuest(hoopaCatchPsychic);

        const talkToBaraz3 = new TalkToNPCQuest(Baraz3, 'That didn\'t work either. Talk to Baraz in Kiloude City.');
        clashOfAgesQuestLine.addQuest(talkToBaraz3);

        const hoopaID = PokemonHelper.getPokemonByName('Hoopa').id;
        const catch100Hoopa = new CustomQuest(100, 0, 'Catch 100 Hoopa.', () => 100 * (App.game.statistics.pokemonCaptured[hoopaID]() - App.game.statistics.pokemonHatched[hoopaID]()));
        clashOfAgesQuestLine.addQuest(catch100Hoopa);

        const talkToBaraz4 = new TalkToNPCQuest(Baraz4, 'This is ridiculous. Talk to Baraz in Kiloude City.').withCustomReward(() => ItemList.Prison_Bottle.gain(1));
        clashOfAgesQuestLine.addQuest(talkToBaraz4);

        const clearHoopa1 = new DefeatTemporaryBattleQuest('Hoopa 1', 'Defeat the Unbound Hoopa and its summoned defenders near Kiloude City.');
        clashOfAgesQuestLine.addQuest(clearHoopa1);

        const clearHoopa2 = new DefeatTemporaryBattleQuest('Hoopa 2', 'Defeat the Unbound Hoopa and its summoned defenders near Shalour City.');
        clashOfAgesQuestLine.addQuest(clearHoopa2);

        const clearHoopa3 = new DefeatTemporaryBattleQuest('Hoopa 3', 'Defeat the Unbound Hoopa and its summoned defenders near Lumiose City.');
        clashOfAgesQuestLine.addQuest(clearHoopa3);

        const clearHoopa4 = new DefeatTemporaryBattleQuest('Hoopa 4', 'Defeat the Unbound Hoopa and its summoned defenders near Anistar City.');
        clashOfAgesQuestLine.addQuest(clearHoopa4);

        const clearHoopa5 = new DefeatTemporaryBattleQuest('Hoopa 5', 'Defeat the Unbound Hoopa and its summoned defenders near Laverre City.');
        clashOfAgesQuestLine.addQuest(clearHoopa5);

        const clearHoopa6 = new DefeatTemporaryBattleQuest('Hoopa 6', 'Defeat the Unbound Hoopa near Kiloude City, this time for real.');
        clashOfAgesQuestLine.addQuest(clearHoopa6);

        App.game.quests.questLines().push(clashOfAgesQuestLine);
    }

    public static createUnrivaledPowerQuestLine() {
        const unrivaledPowerQuestLine = new QuestLine('An Unrivaled Power', 'It has been said that Mewtwo can Mega Evolve. Search for clues on how to find its Mega Stones, so you can control this unrivaled power.', new MultiRequirement([new ObtainedPokemonRequirement('Mewtwo'), new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)]), GameConstants.BulletinBoards.Kalos);

        const clearUnrivaledRed = new DefeatTemporaryBattleQuest('Unrivaled Red', 'Red might know something. Fight him at Indigo Plateau Kanto then ask him what he knows.');
        unrivaledPowerQuestLine.addQuest(clearUnrivaledRed);

        const defeatUnrivaledPsychic = new CustomQuest(1500, 0, 'Defeat 1500 Psychic-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        const catchUnrivaledPsychic = new CapturePokemonTypesQuest(600, 0, PokemonType.Psychic);
        const defeatUnrivaledFighting = new CustomQuest(750, 0, 'Defeat 750 Fighting-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Fighting)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        const catchUnrivaledFighting = new CapturePokemonTypesQuest(300, 0, PokemonType.Fighting);
        unrivaledPowerQuestLine.addQuest(new MultipleQuestsQuest([
            defeatUnrivaledPsychic,
            catchUnrivaledPsychic,
            defeatUnrivaledFighting,
            catchUnrivaledFighting,
        ],'.....right. Of course..... Well, you have no leads for now, so may as well defeat and catch some Psychic and Fighting-type Pokémon.'));

        const clearUnrivaledBlue = new DefeatTemporaryBattleQuest('Unrivaled Blue', 'Blue has contacted you, saying he knows something but wants a fight first. He is at Viridian City.');
        unrivaledPowerQuestLine.addQuest(clearUnrivaledBlue);

        const talkToUnrivaledBlue = new TalkToNPCQuest(UnrivaledBlue, 'Talk to Blue in Viridian City.');
        unrivaledPowerQuestLine.addQuest(talkToUnrivaledBlue);

        const clear150CeruleanCave = new DefeatDungeonQuest(150, 0, 'Cerulean Cave').withDescription('Look for Blue\'s old rival in Cerulean Cave');
        unrivaledPowerQuestLine.addQuest(clear150CeruleanCave);

        const talkToUnrivaledGreen1 = new TalkToNPCQuest(UnrivaledGreen1, 'You eventually found a trainer standing where Mewtwo once did in Cerulean Cave. Talk to Green.');
        unrivaledPowerQuestLine.addQuest(talkToUnrivaledGreen1);

        const clearUnrivaledGreen = new DefeatTemporaryBattleQuest('Unrivaled Green', 'It seems Green is irritated that you caught Mewtwo before she could. Defeat her in Cerulean Cave.');
        unrivaledPowerQuestLine.addQuest(clearUnrivaledGreen);

        const MewtwoniteXReward = () => {
            player.gainMegaStone(GameConstants.MegaStoneType.Mewtwonite_X);
            Notifier.notify({
                title: unrivaledPowerQuestLine.name,
                message: 'You received Mewtwonite X from Green!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talkToUnrivaledGreen2 = new TalkToNPCQuest(UnrivaledGreen2, 'Talk to Green in Cerulean Cave.').withCustomReward(MewtwoniteXReward);
        unrivaledPowerQuestLine.addQuest(talkToUnrivaledGreen2);

        const talkToAnomalyMewtwo1 = new TalkToNPCQuest(AnomalyMewtwo1, 'Talk to Anomaly Mewtwo in Cerulean Cave.');
        unrivaledPowerQuestLine.addQuest(talkToAnomalyMewtwo1);

        const clearAnomalyMewtwo1 = new DefeatTemporaryBattleQuest('Anomaly Mewtwo 1', 'Mewtwo wishes to find a place it can live undisturbed. You know of such a place, but it seems unwilling to listen. Defeat Anomaly Mewtwo near Cerulean Cave so you may attempt to talk to it.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo1);

        const clearAnomalyMewtwo2 = new DefeatTemporaryBattleQuest('Anomaly Mewtwo 2', 'It escaped to the west. Defeat Anomaly Mewtwo again.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo2);

        const clearAnomalyMewtwo3 = new DefeatTemporaryBattleQuest('Anomaly Mewtwo 3', 'It changed form and flew off in the direction of the sea. Defeat Anomaly Mewtwo yet again.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo3);

        const clearAnomalyMewtwo4 = new DefeatTemporaryBattleQuest('Anomaly Mewtwo 4', 'It flew off to the peak of a great mountain. Defeat Anomaly Mewtwo yet again.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo4);

        const clearAnomalyMewtwo5 = new DefeatTemporaryBattleQuest('Anomaly Mewtwo 5', 'It flew off to a faraway region to hide in a large city. Defeat Anomaly Mewtwo yet again.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo5);

        const talkToAnomalyMewtwo2 = new TalkToNPCQuest(AnomalyMewtwo2, 'Talk to Anomaly Mewtwo in Pokémon Village.');
        unrivaledPowerQuestLine.addQuest(talkToAnomalyMewtwo2);

        const findGreatTwistedSpoon = new CustomQuest(1, 0, 'Find the Great Twisted Spoon in P2 Lab.', () => player.itemList.Great_Twisted_Spoon());
        const unrivaledPsychicGems = new GainGemsQuest(60000, 0, PokemonType.Psychic);
        const unrivaledFightingGems = new GainGemsQuest(60000, 0, PokemonType.Fighting);
        unrivaledPowerQuestLine.addQuest(new MultipleQuestsQuest([
            findGreatTwistedSpoon,
            unrivaledPsychicGems,
            unrivaledFightingGems,
        ],'Gather the Great Twisted Spoon, Psychic Gems, and Fighting Gems for Mewtwo.'));

        const talkToAnomalyMewtwo3 = new TalkToNPCQuest(AnomalyMewtwo3, 'Talk to Anomaly Mewtwo in Pokémon Village.');
        unrivaledPowerQuestLine.addQuest(talkToAnomalyMewtwo3);

        const clearAnomalyMewtwo6 = new DefeatDungeonBossQuest('Pokémon Village', 'Anomaly Mewtwo').withDescription('Defeat Anomaly Mewtwo in Pokémon Village.');
        unrivaledPowerQuestLine.addQuest(clearAnomalyMewtwo6);

        const MewtwoniteYReward = () => {
            player.gainMegaStone(GameConstants.MegaStoneType.Mewtwonite_Y);
            Notifier.notify({
                title: unrivaledPowerQuestLine.name,
                message: 'You received Mewtwonite Y from Anomaly Mewtwo!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const talkToAnomalyMewtwo4 = new TalkToNPCQuest(AnomalyMewtwo4, 'Talk to Anomaly Mewtwo in Pokémon Village.').withCustomReward(MewtwoniteYReward);
        unrivaledPowerQuestLine.addQuest(talkToAnomalyMewtwo4);

        App.game.quests.questLines().push(unrivaledPowerQuestLine);
    }

    /* Alola QuestLines */

    // Started upon defeating Konikoni City's gym.
    public static createSkullAetherAlolaQuestLine() {
        const skullAetherAlolaQuestLine = new QuestLine('Eater of Light', 'A dangerous Pokémon from another world threatens the Alola region.');

        const clearUltraWormhole = new DefeatTemporaryBattleQuest('Ultra Wormhole', 'A strange creature has appeared in Aether Paradise. Make it go away. Clear the Ultra Wormhole.');
        skullAetherAlolaQuestLine.addQuest(clearUltraWormhole);

        const clearMalieGarden = new DefeatDungeonQuest(1, 0, 'Malie Garden').withDescription('Team Skull are being annoying. Get rid of them. Clear the Malie Garden dungeon.');
        skullAetherAlolaQuestLine.addQuest(clearMalieGarden);

        const clearPoTown = new DefeatDungeonQuest(1, 0, 'Po Town').withDescription('Team Skull have stolen a child\'s Yungoos. Raid their base. Clear the Po Town dungeon.');
        skullAetherAlolaQuestLine.addQuest(clearPoTown);

        const clearAetherFoundation = new DefeatDungeonQuest(1, 0, 'Aether Foundation')
            .withDescription('Aether president Lusamine has recruited Team Skull in her own plan to stop the Eater of Light. Stop her. Clear the Aether Foundation dungeon.');
        skullAetherAlolaQuestLine.addQuest(clearAetherFoundation);

        const UltraMegalopolisReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: skullAetherAlolaQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearUltraMegalopolis = new DefeatTemporaryBattleQuest('Ultra Megalopolis', 'Stop the Eater of Light from absorbing all light in Alola. Clear Ultra Megalopolis at the Altar of the Sunne and Moone.').withCustomReward(UltraMegalopolisReward);
        skullAetherAlolaQuestLine.addQuest(clearUltraMegalopolis);

        App.game.quests.questLines().push(skullAetherAlolaQuestLine);
    }

    // Started upon defeating Ultra Necrozma temp battle.
    public static createMinasTrialAlolaQuestLine() {
        const minasTrialAlolaQuestLine = new QuestLine('Mina\'s Trial', 'Mina has asked you to battle the Trial captains of the other islands to earn access to her Trial site.');

        const clearCaptainMina = new DefeatTemporaryBattleQuest('Captain Mina', 'Defeat Captain Mina in Seafolk Village.').withCustomReward(() => ItemList.Pink_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainMina);

        const clearCaptainIlima = new DefeatTemporaryBattleQuest('Captain Ilima', 'Defeat Captain Ilima in Hau\'oli Cemetery.').withCustomReward(() => ItemList.Orange_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainIlima);

        const clearCaptainMallow = new DefeatTemporaryBattleQuest('Captain Mallow', 'Defeat Captain Mallow in Lush Jungle.').withCustomReward(() => ItemList.Green_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainMallow);

        const clearCaptainLana = new DefeatTemporaryBattleQuest('Captain Lana', 'Defeat Captain Lana in Lush Jungle.').withCustomReward(() => ItemList.Blue_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainLana);

        const clearCaptainKiawe = new DefeatTemporaryBattleQuest('Captain Kiawe', 'Defeat Captain Kiawe in Wela Volcano Park.').withCustomReward(() => ItemList.Red_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainKiawe);

        const clearCaptainSophocles = new DefeatTemporaryBattleQuest('Captain Sophocles', 'Defeat Captain Sophocles in Hokulani Observatory.').withCustomReward(() => ItemList.Yellow_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearCaptainSophocles);

        const clearKahunaNanu = new DefeatTemporaryBattleQuest('Kahuna Nanu', 'Captain Acerola is apparently busy with something at the top of Mount Lanakila. Defeat Kahuna Nanu in Tapu Village instead.').withCustomReward(() => ItemList.Purple_Petal_Mina.gain(1));
        minasTrialAlolaQuestLine.addQuest(clearKahunaNanu);

        const clearMinasHouseboat = new DefeatDungeonQuest(1, 0, 'Mina\'s Houseboat').withDescription('Complete the Trial! Clear Mina\'s Houseboat in Seafolk Village.');
        minasTrialAlolaQuestLine.addQuest(clearMinasHouseboat);

        App.game.quests.questLines().push(minasTrialAlolaQuestLine);
    }

    // Silvally Typings Questline - Available post-E4
    public static createSilvallyTypesQuestLine() {
        const SilvallyTypesQuestLine = new QuestLine('Typing some Memories', 'Help Gladion restore his Silvally\'s memories.', new MultiRequirement([new ObtainedPokemonRequirement('Silvally (Normal)'), new GymBadgeRequirement(BadgeEnums.Champion_Stamp)]) , GameConstants.BulletinBoards.Alola);

        const talkToGladion1 = new TalkToNPCQuest(SilvallyGladion1, 'Talk to Gladion in the Aether Foundation.');
        SilvallyTypesQuestLine.addQuest(talkToGladion1);

        const createMultiTypeCaptureQuest = (types: Array<PokemonType>, description: string) => {
            const quest = new MultipleQuestsQuest(types.map(type => {
                return new CapturePokemonTypesQuest(100, 0, type);
            }), description);
            SilvallyTypesQuestLine.addQuest(quest);
        };

        createMultiTypeCaptureQuest([PokemonType.Fighting, PokemonType.Rock, PokemonType.Dark, PokemonType.Fairy], 'Get some training before looking for Silvally\'s memories. Catch or hatch 100 Fighting, Rock, Dark and Fairy Types');

        const talkToMelemeleLocals = new TalkToNPCQuest(SilvallyHala, 'Talk to important people around Melemele Island.').withCustomReward(() => ItemList.Fighting_Memory_Silvally.gain(1));
        const talkToAkalaLocals = new TalkToNPCQuest(SilvallyOlivia, 'Talk to important people around Akala Island.').withCustomReward(() => ItemList.Rock_Memory_Silvally.gain(1));
        const talkToUlaulaLocals = new TalkToNPCQuest(SilvallyNanu, 'Talk to important people around Ula\'ula Island.').withCustomReward(() => ItemList.Dark_Memory_Silvally.gain(1));
        const talkToPoniLocals = new TalkToNPCQuest(SilvallyMina, 'Talk to important people around Poni Island.').withCustomReward(() => ItemList.Fairy_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talkToMelemeleLocals,
                talkToAkalaLocals,
                talkToUlaulaLocals,
                talkToPoniLocals,
            ], 'Start your search for Silvally\'s memories by asking important people around Alola.'
        ));

        const talkToGladion2 = new TalkToNPCQuest(SilvallyGladion2, 'Talk to Gladion in the Aether Foundation and tell him what you found out about Silvally\'s memories.');
        SilvallyTypesQuestLine.addQuest(talkToGladion2);

        createMultiTypeCaptureQuest([PokemonType.Water, PokemonType.Grass, PokemonType.Fire, PokemonType.Electric, PokemonType.Ground, PokemonType.Ice], 'You probably need to train a little before going looking for more of Silvally memories. Catch or hatch 100 Water, Grass, Fire, Electric, Ground and Ice types.');

        const talkToLanaSilvally = new TalkToNPCQuest(LanaSilvally1, 'Search for Silvally\'s Memory near pools of freshwater. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToLanaSilvally);

        const BuyWaterMemory = new CustomQuest(1, 0, 'Buy the Water Memory from Captain Lana with Dungeon Tokens.', () => player.itemList.Water_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'Thank you so much $playername$! Now I can finally buy that rod I\'ve always wanted!',
                npcDisplayName: 'Captain Lana',
                npcImageName: 'Lana',
            });
        SilvallyTypesQuestLine.addQuest(BuyWaterMemory);

        const talkToMallowSilvally = new TalkToNPCQuest(MallowSilvally1, 'Search for Silvally\'s Memory in overgrown forests. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToMallowSilvally);

        const BuyGrassMemory = new CustomQuest(1, 0, 'Buy the Grass Memory from Captain Mallow with Quest Points.', () => player.itemList.Grass_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'Thank you, $playername$. I\'ll go to the market and buy the new ingredients right now!',
                npcDisplayName: 'Captain Mallow',
                npcImageName: 'Mallow',
            });
        SilvallyTypesQuestLine.addQuest(BuyGrassMemory);

        const talkToKiaweSilvally = new TalkToNPCQuest(KiaweSilvally1, 'Search for Silvally\'s Memory near fiery hotspots. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToKiaweSilvally);

        const BuyFireMemory = new CustomQuest(1, 0, 'Buy the Fire Memory from Captain Kiawe with Battle Points.', () => player.itemList.Fire_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'Thanks, $playername$. I\'ll be going to the market to buy the project supplies this instant.',
                npcDisplayName: 'Captain Kiawe',
                npcImageName: 'Kiawe',
            });
        SilvallyTypesQuestLine.addQuest(BuyFireMemory);

        const talkToSophoclesSilvally = new TalkToNPCQuest(SophoclesSilvally1, 'Search for Silvally\'s Memory in electrical institutions. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToSophoclesSilvally);

        const BuyElectricMemory = new CustomQuest(1, 0, 'Buy the Electric Memory from Captain Sophocles with Pokédollars.', () => player.itemList.Electric_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'Thank you, $playername$! Now I\'ll go buy some new equipment for my laboratory.',
                npcDisplayName: 'Captain Sophocles',
                npcImageName: 'Sophocles',
            });
        SilvallyTypesQuestLine.addQuest(BuyElectricMemory);

        const talkToVeteranSilvally = new TalkToNPCQuest(VeteranSilvally1, 'Search for Silvally\'s Memory near snow-covered peaks. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToVeteranSilvally);

        const BuyIceMemory = new CustomQuest(1, 0, 'Buy the Ice Memory from Veteran Aristo with Diamonds.', () => player.itemList.Ice_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'You\'re the best, kiddo! I\'m sure she\'ll love the ring I\'ll buy her with these diamonds!',
                npcDisplayName: 'Veteran Aristo',
                npcImageName: 'Veteran (male)',
            });
        SilvallyTypesQuestLine.addQuest(BuyIceMemory);

        const talkToHapuSilvally = new TalkToNPCQuest(HapuSilvally1, 'Search for Silvally\'s Memory in isolated ground. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToHapuSilvally);

        const BuyGroundMemory = new CustomQuest(1, 0, 'Buy the Ground Memory from Kahuna Hapu with Farm Points.', () => player.itemList.Ground_Memory_Silvally())
            .withOptionalArgs({
                clearedMessage: 'Wow you\'re pretty good at the farm, $playername$! I\'ll go buy the palm tree seeds right this instant!',
                npcDisplayName: 'Kahuna Hapu',
                npcImageName: 'Hapu',
            });
        SilvallyTypesQuestLine.addQuest(BuyGroundMemory);

        const talkToGladion3 = new TalkToNPCQuest(SilvallyGladion3, 'Go show Gladion those memories you\'ve bought in the Aether Foundation');
        SilvallyTypesQuestLine.addQuest(talkToGladion3);

        createMultiTypeCaptureQuest([PokemonType.Bug, PokemonType.Flying, PokemonType.Poison, PokemonType.Ghost, PokemonType.Psychic, PokemonType.Steel, PokemonType.Dragon], 'Get some training before looking for more of Silvally\'s memories. Catch or hatch 100 Bug, Flying, Poison, Ghost, Psychic, Steel and Dragon types.');

        const talkToBugSilvally = new TalkToNPCQuest(GuzmaSilvally, 'Search for Silvally\'s Memory where pests make their home. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToBugSilvally);

        const BugSilvallyBattle = new DefeatTemporaryBattleQuest('Guzma Bug Memory', 'Defeat Guzma to get the Memory back.').withCustomReward(() => ItemList.Bug_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(BugSilvallyBattle);

        const talkToFlyingSilvally = new TalkToNPCQuest(KahiliSilvally, 'Search for Silvally\'s Memory where the earth opens to the sky. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToFlyingSilvally);

        const FlyingSilvallyBattle = new DefeatTemporaryBattleQuest('Kahili Flying Memory', 'Defeat Kahili to get the Memory back.').withCustomReward(() => ItemList.Flying_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(FlyingSilvallyBattle);

        const talkToPoisonSilvally = new TalkToNPCQuest(PlumeriaSilvally, 'Search for Silvally\'s Memory near an ancient trial. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToPoisonSilvally);

        const PoisonSilvallyBattle = new DefeatTemporaryBattleQuest('Plumeria Poison Memory', 'Defeat Plumeria to get the Memory back.').withCustomReward(() => ItemList.Poison_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(PoisonSilvallyBattle);

        const talkToGhostSilvally = new TalkToNPCQuest(AcerolaSilvally, 'Search for Silvally\'s Memory near an abandoned village. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToGhostSilvally);

        const GhostSilvallyBattle = new DefeatTemporaryBattleQuest('Acerola Ghost Memory', 'Defeat Captain Acerola to get the Memory back.').withCustomReward(() => ItemList.Ghost_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(GhostSilvallyBattle);

        const talkToPsychicSilvally = new TalkToNPCQuest(FabaSilvally, 'Search for Silvally\'s Memory in a modern haven. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToPsychicSilvally);

        const PsychicSilvallyBattle = new DefeatTemporaryBattleQuest('Faba Psychic Memory', 'Defeat Aether Branch Chief Faba to get the Memory back.').withCustomReward(() => ItemList.Psychic_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(PsychicSilvallyBattle);

        const talkToSteelSilvally = new TalkToNPCQuest(MolayneSilvally, 'Search for Silvally\'s Memory near a steel dome. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToSteelSilvally);

        const SteelSilvallyBattle = new DefeatTemporaryBattleQuest('Molayne Steel Memory', 'Defeat Molayne to get the Memory back.').withCustomReward(() => ItemList.Steel_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(SteelSilvallyBattle);

        const talkToDragonSilvally = new TalkToNPCQuest(RyukiSilvally, 'Search for Silvally\'s Memory near a tree. Ask Gladion at Aether Foundation if you\'re lost.');
        SilvallyTypesQuestLine.addQuest(talkToDragonSilvally);

        const DragonSilvallyBattle = new DefeatTemporaryBattleQuest('Ryuki Dragon Memory', 'Defeat Ryuki to get the Memory back.').withCustomReward(() => ItemList.Dragon_Memory_Silvally.gain(1));
        SilvallyTypesQuestLine.addQuest(DragonSilvallyBattle);

        const talkToGladion4 = new TalkToNPCQuest(SilvallyGladion4, 'Go talk to Gladion in the Aether Foundation and tell him you\'ve recovered all the Silvally Memories!');
        SilvallyTypesQuestLine.addQuest(talkToGladion4);

        App.game.quests.questLines().push(SilvallyTypesQuestLine);

    }

    // Ultra Beasts Questline - Available post-E4
    public static createUltraBeastQuestLine() {
        const UltraBeastQuestLine = new QuestLine('Ultra Beast Hunt', 'Track down the mysterious Ultra Beasts', new GymBadgeRequirement(BadgeEnums.Champion_Stamp), GameConstants.BulletinBoards.Alola);

        const talkToLooker = new TalkToNPCQuest(RoadsideMotelLooker1, 'Talk to Looker at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToLooker);

        const AnabelReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Beastball,5,false);
        };

        const AnabelBattle = new DefeatTemporaryBattleQuest('Anabel', 'Defeat Agent Anabel at the Roadside Motel.').withCustomReward(AnabelReward);
        UltraBeastQuestLine.addQuest(AnabelBattle);

        const talkToAnabel1 = new TalkToNPCQuest(RoadsideMotelAnabel1, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel1);

        const talkToLooker2 = new TalkToNPCQuest(RoadsideMotelLooker2, 'Talk to Looker at the Roadside Motel to learn about Beast Balls.');
        UltraBeastQuestLine.addQuest(talkToLooker2);

        const createUltraBeastQuest = (ultrabeast: PokemonNameType, hint: string, numberCaught: number, ultraBeastReward?: (() => void)) => {
            const time = (numberCaught > 0) ?  'times!' : 'time!';
            const validHint = hint ?? '';

            const catchUltraBeast = new CaptureSpecificPokemonQuest(ultrabeast, numberCaught).withDescription(`Capture ${ultrabeast} ${numberCaught} ${time} ${validHint}`).withCustomReward(ultraBeastReward);

            return catchUltraBeast;
        };
        const ultraBeastReward = () => {
            Notifier.notify({
                title: UltraBeastQuestLine.name,
                message: 'An Ultra Beast is hiding somewhere...',
                type: NotificationConstants.NotificationOption.info,
                timeout: 3e1,
            });
        };

        UltraBeastQuestLine.addQuest(createUltraBeastQuest('Nihilego', ' Nihilego has been spotted at Wela Volcano Park and Diglett\'s Tunnel!', 1, ultraBeastReward));

        const talkToAnabel2 = new TalkToNPCQuest(RoadsideMotelAnabel2, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel2);

        UltraBeastQuestLine.addQuest(new MultipleQuestsQuest(
            [
                createUltraBeastQuest('Buzzwole', undefined, 2),
                createUltraBeastQuest('Pheromosa', undefined, 4),
            ], 'Rare Ultra Beasts have been spotted!\nBuzzwole in Melemele Meadow and Pheromosa in Verdant Cavern!').withCustomReward(ultraBeastReward));

        const talkToAnabel3 = new TalkToNPCQuest(RoadsideMotelAnabel3, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel3);

        const MinaBattle = new DefeatTemporaryBattleQuest('Captain Mina UB', 'Defeat Trial Captain Mina at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(MinaBattle);

        const talkToMina1 = new TalkToNPCQuest(RoadsideMotelMina, 'Talk to Captain Mina at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToMina1);

        UltraBeastQuestLine.addQuest(createUltraBeastQuest('Xurkitree', ' Xurkitree has been spotted at Memorial Hill and Lush Jungle!', 2, ultraBeastReward));

        const talkToNanu1 = new TalkToNPCQuest(RoadsideMotelNanu1, 'Talk to Kahuna Nanu at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToNanu1);

        UltraBeastQuestLine.addQuest(new MultipleQuestsQuest(
            [
                createUltraBeastQuest('Kartana', undefined, 4),
                createUltraBeastQuest('Celesteela', undefined, 2),
            ], 'Rare Ultra Beasts have been spotted! Kartana at Malie Garden and Route 17, and Celesteela at Malie Garden and Haina Desert!').withCustomReward(ultraBeastReward));

        const talkToNanu2 = new TalkToNPCQuest(RoadsideMotelNanu2, 'Talk to Kahuna Nanu at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToNanu2);

        const NanuBattle = new DefeatTemporaryBattleQuest('Kahuna Nanu UB', 'Defeat Kahuna Nanu at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(NanuBattle);

        const talkToAnabel4 = new TalkToNPCQuest(RoadsideMotelAnabel4, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel4);

        UltraBeastQuestLine.addQuest(new MultipleQuestsQuest(
            [
                createUltraBeastQuest('Blacephalon', undefined, 5),
                createUltraBeastQuest('Stakataka', undefined, 5),
            ], 'Rare Ultra Beasts have been spotted! Blacephalon and Stakataka are both at Poni Grove!').withCustomReward(ultraBeastReward));

        const talkToAnabel5 = new TalkToNPCQuest(RoadsideMotelAnabel5, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel5);

        const GuzzlordReward = () => {
            Notifier.notify({ message: 'You caught all the Ultra Beasts!', type: NotificationConstants.NotificationOption.success });
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Beastball,50,false);
        };

        const GuzzlordCatch = new CaptureSpecificPokemonQuest(
            'Guzzlord').withDescription('Catch Guzzlord at Resolution Cave.').withCustomReward(GuzzlordReward);

        UltraBeastQuestLine.addQuest(GuzzlordCatch);

        App.game.quests.questLines().push(UltraBeastQuestLine);
    }

    // Available post-E4
    public static createMeltanQuestLine() {
        const meltanQuestLine = new QuestLine('Let\'s Go, Meltan!', 'I need your assistance in learning more about the newly discovered Pokémon that has really sent me and other Pokémon researchers into quite a tizzy.', new GymBadgeRequirement(BadgeEnums.Champion_Stamp), GameConstants.BulletinBoards.Alola, true);

        // Multi-step #0:

        const meltanMine10 = new MineItemsQuest(10, 0);
        const meltanCatch50 = new CapturePokemonsQuest(50, 0);

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanMine10,
            meltanCatch50,
        ],'Step 1 of Let\'s Go, Meltan!'));

        // Multi-step #1:

        const meltanBreed50 = new HatchEggsQuest(50, 0);
        const meltanObtain15kFP = new GainFarmPointsQuest(15000, 0);

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanBreed50,
            meltanObtain15kFP,
        ],'Step 2 of Let\'s Go, Meltan!'));

        // Multi-step #2:

        const meltanCatch5Ditto = new CaptureSpecificPokemonQuest('Ditto', 5, true).withDescription('Catch or hatch 5 Ditto.');
        const meltanDefeatMolayne10 = new DefeatGymQuest(10, 0, 'Elite Molayne');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch5Ditto,
            meltanDefeatMolayne10,
        ],'Step 3 of Let\'s Go, Meltan!'));

        // Multi-step #3:

        const meltanCatch50Steel = new CapturePokemonTypesQuest(50, 0, PokemonType.Steel);
        const meltanCatch50Electric = new CapturePokemonTypesQuest(50, 0, PokemonType.Electric);
        const meltanDefeatOlivia10 = new DefeatGymQuest(10, 0, 'Elite Olivia');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch50Steel,
            meltanCatch50Electric,
            meltanDefeatOlivia10,
        ],'Step 4 of Let\'s Go, Meltan!'));

        // Multi-step #4:

        const meltanCatch5Grimer = new CaptureSpecificPokemonQuest('Alolan Grimer', 5, true).withDescription('Catch or hatch 5 Alolan Grimer.');
        const meltanCatch5Slugma = new CaptureSpecificPokemonQuest('Slugma', 5, true).withDescription('Catch or hatch 5 Slugma.');
        const meltanCatch10Gulpin = new CaptureSpecificPokemonQuest('Gulpin', 10, true).withDescription('Catch or hatch 10 Gulpin.');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch5Grimer,
            meltanCatch5Slugma,
            meltanCatch10Gulpin,
        ],'Step 5 of Let\'s Go, Meltan!'));

        // Multi-step #5:

        const meltanObtain10MB = new BuyPokeballsQuest(10, 0, GameConstants.Pokeball.Masterball);
        meltanQuestLine.addQuest(new MultipleQuestsQuest([meltanObtain10MB],'Step 6 of Let\'s Go, Meltan!'));

        // Multi-step #6:

        const meltanCatch10Magnemite = new CaptureSpecificPokemonQuest('Magnemite', 10, true).withDescription('Catch or hatch 10 Magnemite.');
        const meltanCatch10Exeggcute = new CaptureSpecificPokemonQuest('Exeggcute', 10, true).withDescription('Catch or hatch 10 Exeggcute.');
        const meltanDefeatAcerola10 = new DefeatGymQuest(10, 0, 'Elite Acerola');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch10Magnemite,
            meltanCatch10Exeggcute,
            meltanDefeatAcerola10,
        ],'Step 7 of Let\'s Go, Meltan!'));

        // Multi-step #7:

        const meltanCatch15Drowzee = new CaptureSpecificPokemonQuest('Drowzee', 15, true).withDescription('Catch or hatch 15 Drowzee.');
        const meltanCatch15Cubone = new CaptureSpecificPokemonQuest('Cubone', 15, true).withDescription('Catch or hatch 15 Cubone.');
        const meltanCatch15Scyther = new CaptureSpecificPokemonQuest('Scyther', 15, true).withDescription('Catch or hatch 15 Scyther.');
        const meltanDefeatKahili10 = new DefeatGymQuest(10, 0, 'Elite Kahili');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch15Drowzee,
            meltanCatch15Cubone,
            meltanCatch15Scyther,
            meltanDefeatKahili10,
        ],'Step 8 of Let\'s Go, Meltan!'));

        // Multi-step #8:

        const meltanCatch20Kabuto = new CaptureSpecificPokemonQuest('Kabuto', 20, true).withDescription('Catch or hatch 20 Kabuto.');
        const meltanCatch20Omanyte = new CaptureSpecificPokemonQuest('Omanyte', 20, true).withDescription('Catch or hatch 20 Omanyte.'); // Praise Lord Helix
        const meltanDig30 = new MineLayersQuest(30, 0);

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch20Kabuto,
            meltanCatch20Omanyte,
            meltanDig30,
        ],'Step 9 of Let\'s Go, Meltan!'));

        // Multi-step #9:

        const meltanCatch20Anorith = new CaptureSpecificPokemonQuest('Anorith', 20, true).withDescription('Catch or hatch 20 Anorith.');
        const meltanCatch20Lileep = new CaptureSpecificPokemonQuest('Lileep', 20, true).withDescription('Catch or hatch 20 Lileep.');
        const meltanCatch20Aerodactyl = new CaptureSpecificPokemonQuest('Aerodactyl', 20, true).withDescription('Catch or hatch 20 Aerodactyl.');
        const meltanDefeatHau15 = new DefeatGymQuest(15, 0, 'Champion Hau');

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch20Anorith,
            meltanCatch20Lileep,
            meltanCatch20Aerodactyl,
            meltanDefeatHau15,
        ],'Step 10 of Let\'s Go, Meltan!').withCustomReward(() => App.game.quests.getQuestLine('Defeat Rainbow Rocket').beginQuest(0, undefined, true)));

        // Multi-step #10

        const meltanCatch400Meltan = new CaptureSpecificPokemonQuest('Meltan', 400).withDescription('Catch 400 Meltan in Alola.');
        const meltanRainbowRocket = new DefeatTemporaryBattleQuest('Team Rainbow Leader Giovanni', 'Defeat Team Rainbow Rocket.');

        const meltanGetMelmetal = () => {
            App.game.party.gainPokemonByName('Melmetal');
            Notifier.notify({
                title: meltanQuestLine.name,
                message: 'You found Melmetal!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        meltanQuestLine.addQuest(new MultipleQuestsQuest([
            meltanCatch400Meltan,
            meltanRainbowRocket,
        ],'Let\'s Go, Meltan!').withCustomReward(meltanGetMelmetal));

        App.game.quests.questLines().push(meltanQuestLine);

    }

    // Started after Meltan step 9
    public static createRainbowRocketQuestLine() {
        const rainbowQuestLine = new QuestLine('Defeat Rainbow Rocket', 'Team Rainbow Rocket has stolen the Meltan research! Defeat them to get it back!', new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9));

        const rainbowGrunts = new CustomQuest(2, 0, 'Defeat the Grunts guarding the Aether Foundation takeover.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rainbow Rocket Grunt 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rainbow Rocket Grunt 2')]()
        );
        rainbowQuestLine.addQuest(rainbowGrunts);

        const rainbowFaba = new DefeatTemporaryBattleQuest('Aether Branch Chief Faba', 'Defeat Aether Branch Chief Faba.');
        rainbowQuestLine.addQuest(rainbowFaba);

        const rainbowArchie = new DefeatTemporaryBattleQuest('Team Aqua Leader Archie', 'Defeat Team Aqua Leader Archie.');
        const rainbowMaxie = new DefeatTemporaryBattleQuest('Team Magma Leader Maxie', 'Defeat Team Magma Leader Maxie.');

        rainbowQuestLine.addQuest(new MultipleQuestsQuest([
            rainbowArchie,
            rainbowMaxie,
        ],'Defeat Archie and Maxie.'));

        const rainbowCyrus = new DefeatTemporaryBattleQuest('Team Galactic Leader Cyrus', 'Defeat Team Galactic Leader Cyrus.');
        rainbowQuestLine.addQuest(rainbowCyrus);

        const rainbowLysandre = new DefeatTemporaryBattleQuest('Team Flare Leader Lysandre', 'Defeat Team Flare Leader Lysandre.');
        rainbowQuestLine.addQuest(rainbowLysandre);

        const rainbowGhetsis = new DefeatTemporaryBattleQuest('Team Plasma Leader Ghetsis', 'Defeat Team Plasma Leader Ghetsis.');
        rainbowQuestLine.addQuest(rainbowGhetsis);

        const rainbowGiovanni = new DefeatTemporaryBattleQuest('Team Rainbow Leader Giovanni', 'Defeat Team Rainbow Leader Giovanni.');
        rainbowQuestLine.addQuest(rainbowGiovanni);

        App.game.quests.questLines().push(rainbowQuestLine);

    }

    /* Magikarp Jump QuestLines */

    // Available post-E4
    public static createMagikarpJumpQuestLine() {
        const magikarpJumpQuestLine = new QuestLine('Magikarp Jump', 'Go to Hoppy Town and share their love for Magikarp.', new GymBadgeRequirement(BadgeEnums.Champion_Stamp), GameConstants.BulletinBoards.Alola);

        const talkToMayor = new TalkToNPCQuest(MayorKarp, 'Use the subregion travel to talk to Mayor Karp in Hoppy Town.');
        magikarpJumpQuestLine.addQuest(talkToMayor);

        App.game.quests.questLines().push(magikarpJumpQuestLine);
    }

    // Available upon clearing the Great League
    public static createDrSplashQuestLine() {
        const drSplashQuestLine = new QuestLine('Dr. Splash\'s Research Project', 'Help Dr. Splash unlock the full potential of your Magikarps.', new GymBadgeRequirement(BadgeEnums.Great_League), GameConstants.BulletinBoards.Hoppy);

        const talkToDrSplash1 = new TalkToNPCQuest(DrSplash1, 'Talk to Dr. Splash in Hoppy Town.');
        drSplashQuestLine.addQuest(talkToDrSplash1);

        const farmOran = new HarvestBerriesQuest(129, 0, BerryType.Oran);
        const farmSitrus = new HarvestBerriesQuest(129, 0, BerryType.Sitrus);
        const farmPecha = new HarvestBerriesQuest(129, 0, BerryType.Pecha);
        const farmRindo = new HarvestBerriesQuest(129, 0, BerryType.Rindo);
        const farmWacan = new HarvestBerriesQuest(129, 0, BerryType.Wacan);
        const farmLeppa = new HarvestBerriesQuest(129, 0, BerryType.Leppa);
        const farmRawst = new HarvestBerriesQuest(129, 0, BerryType.Rawst);
        const farmAspear = new HarvestBerriesQuest(129, 0, BerryType.Aspear);
        const farmRazz = new HarvestBerriesQuest(129, 0, BerryType.Razz);
        const farmBluk = new HarvestBerriesQuest(129, 0, BerryType.Bluk);

        drSplashQuestLine.addQuest(new MultipleQuestsQuest([
            farmOran,
            farmSitrus,
            farmPecha,
            farmRindo,
            farmWacan,
            farmLeppa,
            farmRawst,
            farmAspear,
            farmRazz,
            farmBluk,
        ],'Gather berries for Dr. Splash.'));

        const talkToDrSplash2 = new TalkToNPCQuest(DrSplash2, 'Report back to Dr. Splash about your berry research.');
        drSplashQuestLine.addQuest(talkToDrSplash2);

        const sandBag = new GainGemsQuest(5000, 0, PokemonType.Ground);
        const jumpCounter = new CaptureSpecificPokemonQuest('Spoink', 10, true).withDescription('Catch or hatch 10 Spoink.');
        const timber = new GainGemsQuest(5000, 0, PokemonType.Grass);
        const rockCruncher = new GainGemsQuest(5000, 0, PokemonType.Rock);
        const powerGenerator = new CaptureSpecificPokemonQuest('Voltorb', 10, true).withDescription('Catch or hatch 10 Voltorb.');
        const pokeballSmash = new BuyPokeballsQuest(100000, 0, GameConstants.Pokeball.Pokeball);
        const frostCruncher = new GainGemsQuest(5000, 0, PokemonType.Ice);

        drSplashQuestLine.addQuest(new MultipleQuestsQuest([
            sandBag,
            jumpCounter,
            timber,
            rockCruncher,
            powerGenerator,
            pokeballSmash,
            frostCruncher,
        ],'Gather materials for Dr. Splash.'));

        const talkToDrSplash3 = new TalkToNPCQuest(DrSplash3, 'Return to Dr. Splash in Hoppy Town with the training materials.');
        drSplashQuestLine.addQuest(talkToDrSplash3);


        const pushDwebble = new CaptureSpecificPokemonQuest('Dwebble', 10, true).withDescription('Catch or hatch 10 Dwebble.');
        const pushBoldore = new CaptureSpecificPokemonQuest('Boldore', 10, true).withDescription('Catch or hatch 10 Boldore.');
        const pushForretress = new CaptureSpecificPokemonQuest('Forretress', 10, true).withDescription('Catch or hatch 10 Forretress.');
        const pushGolem = new CaptureSpecificPokemonQuest('Golem', 10, true).withDescription('Catch or hatch 10 Golem.');
        const pushSteelix = new CaptureSpecificPokemonQuest('Steelix', 10, true).withDescription('Catch or hatch 10 Steelix.');

        drSplashQuestLine.addQuest(new MultipleQuestsQuest([
            pushDwebble,
            pushBoldore,
            pushForretress,
            pushGolem,
            pushSteelix,
        ],'Catch Pokémon for Dr. Splash\'s training grounds.'));

        const talkToDrSplash4 = new TalkToNPCQuest(DrSplash4, 'Return to Dr. Splash in Hoppy Town with the pushable Pokémon.');
        drSplashQuestLine.addQuest(talkToDrSplash4);

        const tackleMachine = new CustomQuest(5000, 0, 'Defeat 5,000 Pokémon', App.game.statistics.totalPokemonDefeated);
        drSplashQuestLine.addQuest(tackleMachine);

        const SaucyBlueReward = () => {
            App.game.party.gainPokemonByName('Magikarp Saucy Blue');
            Notifier.notify({
                title: drSplashQuestLine.name,
                message: 'Dr. Splash gives you a Saucy Blue Magikarp!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
                sound: NotificationConstants.NotificationSound.General.new_catch,
            });
        };

        const talkToDrSplash5 = new TalkToNPCQuest(DrSplash5, 'Wrap up your research project by talking to Dr. Splash in Hoppy Town.').withCustomReward(SaucyBlueReward);
        drSplashQuestLine.addQuest(talkToDrSplash5);

        App.game.quests.questLines().push(drSplashQuestLine);

    }

    /* Galar QuestLines */

    // Started by defeating both Stow-on-Side gyms.
    public static createDarkestDayQuestLine() {
        const darkestDayQuestLine = new QuestLine('The Darkest Day', 'Stop the return of the Darkest Day!');

        const talkToMural1 = new TalkToNPCQuest(AncientMural1, 'Check out Stow-on-Side\'s mural.');
        darkestDayQuestLine.addQuest(talkToMural1); // 0

        const clearBede3 = new DefeatTemporaryBattleQuest('Bede 3', 'Stop Bede from destroying the mural!');
        darkestDayQuestLine.addQuest(clearBede3);

        const talkToMural2 = new TalkToNPCQuest(AncientMural2, '');
        const talkToSonia1 = new TalkToNPCQuest(StowonSideSonia, 'Talk to Sonia.');
        darkestDayQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talkToMural2,
                talkToSonia1,
            ], 'The mural was destroyed! See what you can learn by inspecting the ruins and speaking to the bystander.')); // Step 2

        const clearHop6 = new DefeatTemporaryBattleQuest('Hop 6', 'Defeat the next gym and catch up with Hop.');
        darkestDayQuestLine.addQuest(clearHop6);

        const clearHop7 = new DefeatTemporaryBattleQuest('Hop 7', 'Continue your Gym Challenge and have a battle with Hop in Circhester.');
        darkestDayQuestLine.addQuest(clearHop7);

        const talkToBath = new TalkToNPCQuest(HerosBath, '');
        const talkToHop1 = new TalkToNPCQuest(CirchesterHop, 'Talk to Hop.');
        const talkToSonia2 = new TalkToNPCQuest(CirchesterSonia, 'Talk to Sonia.');
        darkestDayQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talkToBath,
                talkToHop1,
                talkToSonia2,
            ], 'Learn more about the heroes who stopped The Darkest Day.')); // Step 5

        const clearHammerlockeGym = new DefeatGymQuest(1, 0, 'Hammerlocke').withDescription('Continue your Gym Challenge and gain entry to the Champion Cup.');
        darkestDayQuestLine.addQuest(clearHammerlockeGym);

        const clearTrainerMarnie = new DefeatGymQuest(1, 0, 'Elite Trainer Marnie').withDescription('Defeat Marnie at Wyndon Stadium to reach the quarter-finals of the Champion Cup.');
        darkestDayQuestLine.addQuest(clearTrainerMarnie);

        const clearGymLeaderBede = new DefeatGymQuest(1, 0, 'Elite Gym Leader Bede').withDescription('Defeat Bede to reach the semi-finals of the Champion Cup.');
        darkestDayQuestLine.addQuest(clearGymLeaderBede);

        const clearTrainerHop = new DefeatGymQuest(1, 0, 'Elite Trainer Hop').withDescription('Defeat Hop to reach the final of the Champion Cup!');
        darkestDayQuestLine.addQuest(clearTrainerHop);

        const clearRoseTower = new DefeatDungeonQuest(1, 0, 'Rose Tower').withDescription('Champion Leon was seen heading to Rose Tower. Ascend Rose Tower so you can find him.');
        darkestDayQuestLine.addQuest(clearRoseTower);

        const talktoRoseBroadcast = new TalkToNPCQuest(RoseBroadcast, 'The Championship Match is about to start, but Chairman Rose is broadcasting something to the Stadium? Listen to the broadcast.');
        darkestDayQuestLine.addQuest(talktoRoseBroadcast);

        const talktoHop2 = new TalkToNPCQuest(WyndonHop, 'Talk to Hop in Wyndon Stadium.');
        darkestDayQuestLine.addQuest(talktoHop2);

        const clearSlumberingWeald = new DefeatDungeonQuest(1, 0, 'Slumbering Weald Shrine').withDescription('Chairman Rose has interrupted your fight with Leon and brought about the Darkest Day. Clear Slumbering Weald Shrine.');
        darkestDayQuestLine.addQuest(clearSlumberingWeald);

        const talktoHop3 = new TalkToNPCQuest(SlumberingHop1, 'Talk to Hop in Slumbering Weald Shrine.');
        darkestDayQuestLine.addQuest(talktoHop3);

        const clearEnergyPlant = new DefeatDungeonQuest(1, 0, 'Energy Plant').withDescription('Unfortunately, all you found at the Slumbering Weald was a rusty sword and shield. Go to the Energy Plant in Hammerlocke to put an end to Chairman Rose\'s plans!');
        darkestDayQuestLine.addQuest(clearEnergyPlant);

        const talktoRose = new TalkToNPCQuest(EnergyPlantRose, 'Talk to Chairman Rose in Energy Plant');
        darkestDayQuestLine.addQuest(talktoRose);

        const clearEternatus = new DefeatTemporaryBattleQuest('Eternatus', 'Leon failed to capture Eternatus. Defeat it before it can cause any more damage!');
        darkestDayQuestLine.addQuest(clearEternatus);

        const TheDarkestDayReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: darkestDayQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearTheDarkestDay = new DefeatTemporaryBattleQuest('The Darkest Day', 'Eternatus has ascended to its Eternamax form! Catch it to put an end to the Darkest Day!').withCustomReward(TheDarkestDayReward);
        darkestDayQuestLine.addQuest(clearTheDarkestDay);

        const talktoLeon = new TalkToNPCQuest(Leon, 'After all those interruptions, it\'s finally time for the Championship match! Talk to Leon at Wyndon Stadium.');
        darkestDayQuestLine.addQuest(talktoLeon);

        const clearLeon = new DefeatGymQuest(1, 0, 'Champion Leon').withDescription('Defeat Leon to become the Champion of Galar!');
        darkestDayQuestLine.addQuest(clearLeon);

        App.game.quests.questLines().push(darkestDayQuestLine);
    }

    // Available post-E4
    public static createSwordShieldQuestLine() {
        const swordShieldQuestLine = new QuestLine('Sword and Shield', 'Stop the weapons from making a mess.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Galar);

        const talktoHop4 = new TalkToNPCQuest(SlumberingHop2, 'Talk to Hop in the Slumbering Weald.');
        swordShieldQuestLine.addQuest(talktoHop4);

        const clearHop8 = new DefeatTemporaryBattleQuest('Hop 8', 'Hop wants to fight you one more time at Slumbering Weald Shrine.');
        swordShieldQuestLine.addQuest(clearHop8);

        const talktoSordwardShielbert1 = new TalkToNPCQuest(SordwardShielbert1, 'Talk to Sordward & Shielbert in the Slumbering Weald.');
        swordShieldQuestLine.addQuest(talktoSordwardShielbert1);

        const clearSordward1 = new DefeatTemporaryBattleQuest('Sordward 1', 'Defeat Sordward.');
        const clearShielbert1 = new DefeatTemporaryBattleQuest('Shielbert 1', 'Defeat Shielbert.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSordward1,
                clearShielbert1,
            ], 'A pair with weird hair has taken the Rusted Sword and Rusted Shield. Defeat them to take them back.'));

        const clearRampagingTsareena = new DefeatTemporaryBattleQuest('Rampaging Tsareena', 'Sordward and Shielbert are forcing Pokémon to rampage in Galar\'s Stadiums. First is a Tsareena in Turffield Stadium. Defeat it.');
        swordShieldQuestLine.addQuest(clearRampagingTsareena);

        const clearRampagingGyarados = new DefeatTemporaryBattleQuest('Rampaging Gyarados', 'Sordward and Shielbert have forced a Gyarados to rampage in Hulbury Stadium. Defeat it as well.');
        swordShieldQuestLine.addQuest(clearRampagingGyarados);

        const clearRampagingTorkoal = new DefeatTemporaryBattleQuest('Rampaging Torkoal', 'Sordward and Shielbert have forced a Torkoal to rampage in Motostoke Stadium. Defeat it as well.');
        swordShieldQuestLine.addQuest(clearRampagingTorkoal);

        const talktoSordwardShielbert2 = new TalkToNPCQuest(SordwardShielbert2, 'Talk to Sordward & Shielbert in Wedgehurst.');
        swordShieldQuestLine.addQuest(talktoSordwardShielbert2);

        const clearSordwardandShielbert = new DefeatTemporaryBattleQuest('Sordward & Shielbert', 'Sordward and Shielbert are trying to steal the Wishing Stars at Professor Magnolia\'s Lab in Wedgehurst. Stop them.');
        swordShieldQuestLine.addQuest(clearSordwardandShielbert);

        const clearRampagingConkeldurr = new DefeatTemporaryBattleQuest('Rampaging Conkeldurr', 'Defeat Conkeldurr.');
        const clearRampagingDusknoir = new DefeatTemporaryBattleQuest('Rampaging Dusknoir', 'Defeat Dusknoir.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingConkeldurr,
                clearRampagingDusknoir,
            ], 'Sordward and Shielbert have forced a Conkeldurr and a Dusknoir to rampage in Stow-on-Side Stadium. Defeat them both.'));

        const clearGymLeaderBede2 = new DefeatTemporaryBattleQuest('Gym Leader Bede', 'There were rampaging Pokémon at Ballonlea Stadium, but Bede already defeated them. There are no more rampaging Pokémon for now, and he wants to battle.');
        swordShieldQuestLine.addQuest(clearGymLeaderBede2);

        const clearRampagingGigalith = new DefeatTemporaryBattleQuest('Rampaging Gigalith', 'Defeat Gigalith.');
        const clearRampagingFroslass = new DefeatTemporaryBattleQuest('Rampaging Froslass', 'Defeat Froslass.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingGigalith,
                clearRampagingFroslass,
            ], 'Sordward and Shielbert have forced a Gigalith and a Froslass to rampage in Circhester Stadium. Defeat them both'));

        const clearGymLeaderMarnie = new DefeatTemporaryBattleQuest('Gym Leader Marnie', 'There are no more rampaging Pokémon for now and Marnie wants to battle you in Spikemuth.');
        swordShieldQuestLine.addQuest(clearGymLeaderMarnie);

        const clearRampagingHaxorus = new DefeatTemporaryBattleQuest('Rampaging Haxorus', 'Sordward and Shielbert have forced a Haxorus to rampage in Hammerlocke Stadium. Hopefully this is the last one.');
        swordShieldQuestLine.addQuest(clearRampagingHaxorus);

        const talktoSordwardShielbert3 = new TalkToNPCQuest(SordwardShielbert3, 'Talk to Sordward & Shielbert in the Energy Plant.');
        swordShieldQuestLine.addQuest(talktoSordwardShielbert3);

        const clearSordward2 = new DefeatTemporaryBattleQuest('Sordward 2', 'Defeat Sordward.');
        const clearShielbert2 = new DefeatTemporaryBattleQuest('Shielbert 2', 'Defeat Shielbert.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSordward2,
                clearShielbert2,
            ], 'Sordward and Shielbert are trying to use the Rusted Sword and Shield to make Zacian and Zamazenta go on a rampage in Energy Plant. Stop them.'));

        const talktoSordwardShielbert4 = new TalkToNPCQuest(SordwardShielbert4, 'Talk to Sordward & Shielbert in the Energy Plant.');
        swordShieldQuestLine.addQuest(talktoSordwardShielbert4);

        const clearRampagingZacian = new DefeatTemporaryBattleQuest('Rampaging Zacian', 'Defeat Zacian.');
        const clearRampagingZamazenta = new DefeatTemporaryBattleQuest('Rampaging Zamazenta', 'Defeat Zamazenta.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingZacian,
                clearRampagingZamazenta,
            ], 'Zacian and Zamazenta are rampaging in Energy Plant. Defeat them!'));

        const talktoPiers = new TalkToNPCQuest(Piers, 'Talk to Piers in the Energy Plant.');
        swordShieldQuestLine.addQuest(talktoPiers);

        const catchZacian = new CaptureSpecificPokemonQuest('Zacian (Battle Hero)', 1, true).withDescription('Catch Zacian.');
        const catchZamazenta = new CaptureSpecificPokemonQuest('Zamazenta (Battle Hero)', 1, true).withDescription('Catch Zamazenta.');
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchZacian,
                catchZamazenta,
            ], 'Now that they have calmed down, Zacian and Zamazenta seem to be willing to let you try to catch them!'));

        App.game.quests.questLines().push(swordShieldQuestLine);
    }

    // Available post-E4
    public static createDojoArmorQuestLine() {
        const dojoArmorQuestLine = new QuestLine('The Dojo\'s Armor', 'Obtain the Secret Armor of the Master Dojo.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Armor);

        const talktoMustard1 = new TalkToNPCQuest(Mustard1, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard1);

        const clearMustard = new DefeatTemporaryBattleQuest('Mustard', 'Mustard wants to test your ability at the Master Dojo. Defeat him.');
        dojoArmorQuestLine.addQuest(clearMustard);

        const talktoMustard2 = new TalkToNPCQuest(Mustard2, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard2);

        const catch6GalarianSlowpoke = new CaptureSpecificPokemonQuest('Galarian Slowpoke', 6);
        dojoArmorQuestLine.addQuest(catch6GalarianSlowpoke);

        const talktoMustard3 = new TalkToNPCQuest(Mustard3, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard3);

        const talktoMustard4 = new TalkToNPCQuest(Mustard4, 'It seems Mustard still wants to talk to you? Talk to Mustard again at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard4);

        const talktoKlara1 = new TalkToNPCQuest(Klara1, 'Talk to Klara.');
        const talktoAvery1 = new TalkToNPCQuest(Avery1, 'Talk to Avery.');
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talktoKlara1,
                talktoAvery1,
            ], 'Talk to Klara and Avery in Warm-Up Tunnel.'));

        const clearKlara2 = new DefeatTemporaryBattleQuest('Klara 2', 'Defeat Klara.');
        const clearAvery2 = new DefeatTemporaryBattleQuest('Avery 2', 'Defeat Avery.');
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearKlara2,
                clearAvery2,
            ], 'You, Klara and Avery have happened upon the same Max Mushroom in Warm-Up Tunnel. Defeat them both to win it.').withCustomReward(() => ItemList.Max_Mushroom_IoA.gain(1)));

        const talktoMustard5 = new TalkToNPCQuest(Mustard5, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard5);

        const talktoKlara2 = new TalkToNPCQuest(Klara2, 'Talk to Klara.');
        const talktoAvery2 = new TalkToNPCQuest(Avery2, 'Talk to Avery.');
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                talktoKlara2,
                talktoAvery2,
            ], 'Talk to Klara and Avery in the Master Dojo.'));

        const clearKlara3 = new DefeatTemporaryBattleQuest('Klara 3', 'Defeat Klara.');
        const clearAvery3 = new DefeatTemporaryBattleQuest('Avery 3', 'Defeat Avery');
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearKlara3,
                clearAvery3,
            ], 'For the final trial, you must defeat both Klara and Avery on the Master Dojo Battle Court.'));

        const talktoMustard6 = new TalkToNPCQuest(Mustard6, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard6);

        const catchKubfu = new CaptureSpecificPokemonQuest('Kubfu');
        dojoArmorQuestLine.addQuest(catchKubfu);

        const talktoMustard7 = new TalkToNPCQuest(Mustard7, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard7);

        const defeatDark = new CustomQuest(500, 0, 'Defeat 500 Dark-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Dark)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        const defeatWater = new CustomQuest(500, 0, 'Defeat 500 Water-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Water)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                defeatDark,
                defeatWater,
            ], 'Train Kubfu by defeating Dark and Water-type Pokémon.'));

        const talktoMustard8 = new TalkToNPCQuest(Mustard8, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard8);

        const catchDark = new CapturePokemonTypesQuest(250, 0, PokemonType.Dark);
        const catchWater = new CapturePokemonTypesQuest(250, 0, PokemonType.Water);
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchDark,
                catchWater,
            ], 'Train Kubfu more by catching or hatching Dark and Water-type Pokémon.'));

        const talktoMustard9 = new TalkToNPCQuest(Mustard9, 'Talk to Mustard at the Master Dojo.');
        dojoArmorQuestLine.addQuest(talktoMustard9);

        const clearTowerofDarkness = new DefeatDungeonQuest(1, 0, 'Tower of Darkness').withDescription('Defeat Tower of Darkness.');
        const clearTowerofWaters = new DefeatDungeonQuest(1, 0, 'Tower of Waters').withDescription('Defeat Tower of Waters');
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearTowerofDarkness,
                clearTowerofWaters,
            ], 'Complete Kubfu\'s training in the Tower of Darkness and the Tower of Waters so it can evolve!'));

        const talktoMustard10 = new TalkToNPCQuest(Mustard10, 'Talk to Mustard at one of the Towers of Two Fists.');
        dojoArmorQuestLine.addQuest(talktoMustard10);

        App.game.quests.questLines().push(dojoArmorQuestLine);
    }

    // Available after defeating Ash Ketchum Alola
    public static createJungleSecretsQuestLine() {
        const jungleSecretsQuestLine = new QuestLine('Secrets of the Jungle', 'Discover the secrets of the jungle.', new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), new TemporaryBattleRequirement('Ash Ketchum Alola')]), GameConstants.BulletinBoards.Armor);

        const talktoJungleAsh1 = new TalkToNPCQuest(JungleAsh1, 'Ash Ketchum wants to talk to you at the Master Dojo.');
        jungleSecretsQuestLine.addQuest(talktoJungleAsh1);

        const talktoJungleKoko1 = new TalkToNPCQuest(JungleKoko1, 'Talk to Ash Ketchum\'s friend, Koko, in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko1);

        const catchZarude = new CaptureSpecificPokemonQuest('Zarude').withDescription('Catch the missing Zarude roaming around the Isle of Armor.');
        jungleSecretsQuestLine.addQuest(catchZarude);

        const talktoJungleKoko2 = new TalkToNPCQuest(JungleKoko2, 'Take Zarude back to Koko in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko2);

        const clearZarudeTribe1 = new DefeatTemporaryBattleQuest('Zarude Tribe 1', 'A group of Zarude are attacking you. Defeat them.');
        jungleSecretsQuestLine.addQuest(clearZarudeTribe1);

        const talktoJungleKoko3 = new TalkToNPCQuest(JungleKoko3, 'Talk to Koko in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko3);

        const clearZarudeTribes = new CustomQuest(2, 0, 'Another two groups of Zarude are attacking you. Defeat them as well.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Zarude Tribe 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Zarude Tribe 3')]()
        );
        jungleSecretsQuestLine.addQuest(clearZarudeTribes);

        const talktoJungleKoko4 = new TalkToNPCQuest(JungleKoko4, 'Talk to Koko in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko4);

        const talktoJungleAsh2 = new TalkToNPCQuest(JungleAsh2, 'Talk to Ash Ketchum at the Master Dojo.');
        jungleSecretsQuestLine.addQuest(talktoJungleAsh2);

        const clearGalarAsh = new DefeatTemporaryBattleQuest('Ash Ketchum Galar', 'Defeat Ash Ketchum outside the Master Dojo.');
        jungleSecretsQuestLine.addQuest(clearGalarAsh);

        const talktoJungleKoko5 = new TalkToNPCQuest(JungleKoko5, 'Talk to Koko in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko5);

        const clearZarudeDada = new DefeatTemporaryBattleQuest('Zarude (Dada)', 'A final Zarude wants to challenge you. Defeat Zarude (Dada).');
        jungleSecretsQuestLine.addQuest(clearZarudeDada);

        const talktoJungleAsh3 = new TalkToNPCQuest(JungleAsh3, 'Talk to Ash Ketchum in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleAsh3);

        const catchFloweringCelebi = new CaptureSpecificPokemonQuest('Flowering Celebi').withDescription('Play with Flowering Celebi.');
        jungleSecretsQuestLine.addQuest(catchFloweringCelebi);

        const talktoJungleKoko6 = new TalkToNPCQuest(JungleKoko6, 'Talk to Koko in Glimwood Tangle.');
        jungleSecretsQuestLine.addQuest(talktoJungleKoko6);

        App.game.quests.questLines().push(jungleSecretsQuestLine);
    }

    // Available post-E4
    public static createGalarCrownQuestLine() {
        const galarCrownQuestLine = new QuestLine('The Crown of Galar', 'Help the ancient king of Galar, Calyrex, return to its former glory.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoCrownPeony1 = new TalkToNPCQuest(CrownPeony1, 'Talk to Peony to find out about the ancient king of Galar.');
        galarCrownQuestLine.addQuest(talktoCrownPeony1);

        const clearCalyrex = new DefeatTemporaryBattleQuest('Calyrex', 'A mysterious Pokémon has appeared and challenged you to a battle.');
        galarCrownQuestLine.addQuest(clearCalyrex);

        const talktoCalyrex1 = new TalkToNPCQuest(Calyrex1, 'The Pokémon you just fought has possessed Peony. Talk to it.');
        galarCrownQuestLine.addQuest(talktoCalyrex1);

        const oldCemetery = new DefeatPokemonsQuest(50, 0, 49, GameConstants.Region.galar, 'Old Cemetery');
        const snowslideSlope = new DefeatPokemonsQuest(50, 0, 54, GameConstants.Region.galar, 'Snowslide Slope');
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                oldCemetery,
                snowslideSlope,
            ],
            'Calyrex is going to Old Cemetery and Snowslide Slope to grow a Shaderoot Carrot and an Iceroot Carrot. Protect it from wild Pokémon so it can concentrate.')
            .withCustomReward(() => {
                ItemList.Shaderoot_Carrot_Calyrex.gain(1);
                ItemList.Iceroot_Carrot_Calyrex.gain(1);
            }));

        const talktoCalyrex2 = new TalkToNPCQuest(Calyrex2, 'After growing both carrots, Calyrex has returned to Freezington. Talk to it.');
        galarCrownQuestLine.addQuest(talktoCalyrex2);

        const clearSpectrier = new DefeatTemporaryBattleQuest('Spectrier', 'Defeat Spectrier.');
        const clearGlastrier = new DefeatTemporaryBattleQuest('Glastrier', 'Defeat Glastrier.');
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSpectrier,
                clearGlastrier,
            ], 'Fight Calyrex\'s steeds to get them out of Freezington!'));

        const talktoCalyrex3 = new TalkToNPCQuest(Calyrex3, 'Talk to Calyrex again.');
        galarCrownQuestLine.addQuest(talktoCalyrex3);

        const catchSpectrier = new CaptureSpecificPokemonQuest('Spectrier');
        const catchGlastrier = new CaptureSpecificPokemonQuest('Glastrier');
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchSpectrier,
                catchGlastrier,
            ], 'Spectrier and Glastrier are now roaming the Crown Tundra. Catch them when the opportunity arises!'));

        const UnityReward = () => {
            App.game.keyItems.gainKeyItem(KeyItemType.Reins_of_unity, true);
            $('#npcModal').one('hidden.bs.modal', () => {
                KeyItemController.showGainModal(KeyItemType.Reins_of_unity);
            });
        };

        const talktoCalyrex4 = new TalkToNPCQuest(Calyrex4, 'Now that you have captured both of its steeds, talk to Calyrex at the Crown Shrine.').withCustomReward(UnityReward);
        galarCrownQuestLine.addQuest(talktoCalyrex4);

        const catchCalyrex = new CaptureSpecificPokemonQuest('Calyrex').withDescription('Now that you have found and caught Glastrier and Spectrier, Calyrex wants to challenge you at Crown Shrine. Catch it!');
        galarCrownQuestLine.addQuest(catchCalyrex);

        const talktoCrownPeony2 = new TalkToNPCQuest(CrownPeony2, 'Now that you have captured Calyrex, go report back to Peony!');
        galarCrownQuestLine.addQuest(talktoCrownPeony2);

        App.game.quests.questLines().push(galarCrownQuestLine);
    }

    /* Crown QuestLines */

    // Available post-E4
    public static createDynaTreeBirdsQuestLine() {
        const dynaTreeBirdsQuestLine = new QuestLine('The Birds of the Dyna Tree', 'Find the Legendary birds of the Dyna Tree.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoBirdPeony1 = new TalkToNPCQuest(BirdPeony1, 'Talk to Peony to find out about some legendary bird sightings.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony1);

        const clearDynaTreeHill = new DefeatDungeonQuest(1, 0, 'Dyna Tree Hill').withDescription('Some unknown bird Pokémon have been sighted near Dyna Tree Hill in Ballimere Lake. Explore the area to see for yourself.');
        dynaTreeBirdsQuestLine.addQuest(clearDynaTreeHill);

        const clearDynaTreeBirds = new DefeatTemporaryBattleQuest('Dyna Tree Birds', 'You witnessed 3 powerful looking bird pokemon resembling Articuno, Zapdos, and Moltres fighting over the fruit of the Dyna Tree. Upon noticing you, they attack!');
        dynaTreeBirdsQuestLine.addQuest(clearDynaTreeBirds);

        const talktoBirdPeony2 = new TalkToNPCQuest(BirdPeony2, 'Tell Peony about your encounter with the birds resembling Articuno, Zapdos, and Moltres.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony2);

        const chaseGalarianArticuno = new CustomQuest (3, 0, 'Search for Galarian Articuno in the Crown Tundra.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Articuno 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Articuno 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Articuno 3')]()
        );
        const chaseGalarianZapdos = new CustomQuest (3, 0, 'Search for Galarian Zapdos in the Wild Area of Southern Galar.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Zapdos 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Zapdos 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Zapdos 3')]()
        );
        const chaseGalarianMoltres = new CustomQuest (3, 0, 'Search for Galarian Moltres in the Isle of Armor.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Moltres 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Moltres 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galarian Moltres 3')]()
        );
        dynaTreeBirdsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                chaseGalarianArticuno,
                chaseGalarianZapdos,
                chaseGalarianMoltres,
            ], 'Galarian Articuno, Zapdos, and Moltres have fled to the Crown Tundra, Southern Galar, and the Isle of Armor respectively. Search for them.'));

        const talktoBirdPeony3 = new TalkToNPCQuest(BirdPeony3, 'You defeated Galarian Articuno, Zapdos, and Moltres multiple times each. Ask Peony what to do next.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony3);

        const catchGalarianArticuno = new CaptureSpecificPokemonQuest('Galarian Articuno');
        const catchGalarianZapdos = new CaptureSpecificPokemonQuest('Galarian Zapdos');
        const catchGalarianMoltres = new CaptureSpecificPokemonQuest('Galarian Moltres');
        dynaTreeBirdsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchGalarianArticuno,
                catchGalarianZapdos,
                catchGalarianMoltres,
            ], 'Galarian Articuno, Zapdos, and Moltres are now roaming in the Crown Tundra, Southern Galar, and the Isle of Armor respectively. Catch them when the opportunity arises!'));

        const talktoBirdPeony4 = new TalkToNPCQuest(BirdPeony4, 'Now that you have captured Galarian Articuno, Zapdos, and Moltres, go report back to Peony!');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony4);

        App.game.quests.questLines().push(dynaTreeBirdsQuestLine);
    }

    // Available post-E4
    public static createAncientGolemsQuestLine() {
        const ancientGolemsQuestLine = new QuestLine('The Ancient Golems', 'Discover the ancient Golems in the ruins of the Crown Tundra.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoGolemPeony1 = new TalkToNPCQuest(GolemPeony1, 'Talk to Peony to find out about some ancient ruins.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony1);

        const threePointPass = new DefeatPokemonsQuest(100, 0, 52, GameConstants.Region.galar, 'Peony told you of a peculiar ruin located at Three-Point Pass. Explore the area to find it.');
        ancientGolemsQuestLine.addQuest(threePointPass);

        const talktoGolemPeony2 = new TalkToNPCQuest(GolemPeony2, 'The ruins were locked, go report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony2);

        const clearRockPeakRuins = new DefeatDungeonQuest(10, 0, 'Rock Peak Ruins').withDescription('Clear Rock Peak Ruins 10 times.');
        const clearIcebergRuins = new DefeatDungeonQuest(10, 0, 'Iceberg Ruins').withDescription('Clear Iceberg Ruins 10 times.');
        const clearIronRuins = new DefeatDungeonQuest(10, 0, 'Iron Ruins').withDescription('Clear Iron Ruins 10 times.');
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRockPeakRuins,
                clearIcebergRuins,
                clearIronRuins,
            ], 'Clear Rock Peak Ruins, Iceberg Ruins, and Iron Ruins 10 times each.'));

        const talktoGolemPeony3 = new TalkToNPCQuest(GolemPeony3, 'The ruins are still locked, report to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony3);

        const catchRegirock = new CaptureSpecificPokemonQuest('Regirock');
        const catchRegice = new CaptureSpecificPokemonQuest('Regice');
        const catchRegisteel = new CaptureSpecificPokemonQuest('Registeel');
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRegirock,
                catchRegice,
                catchRegisteel,
            ], 'Catch Regirock, Regice, and Registeel in the Rock Peak Ruins, Iceberg Ruins, and Iron Ruins respectively.'));

        const talktoGolemPeony4 = new TalkToNPCQuest(GolemPeony4, 'You have captured Regirock, Regice, and Registeel, now go report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony4);

        const clearRegigigas = new DefeatTemporaryBattleQuest('Regigigas', 'Defeat Regigigas at Giant\'s Bed!');
        const catchRegigigas = new CaptureSpecificPokemonQuest('Regigigas');
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRegigigas,
                catchRegigigas,
            ], 'After you caught three of the legendary golems it created, Regigigas appeared in Giant\'s Bed. Defeat and catch it!'));

        const talktoGolemPeony5 = new TalkToNPCQuest(GolemPeony5, 'You have captured Regigigas, now go report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony5);

        const catchRegieleki = new CaptureSpecificPokemonQuest('Regieleki');
        const catchRegidrago = new CaptureSpecificPokemonQuest('Regidrago');
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRegieleki,
                catchRegidrago,
            ], 'Now that it has finally unlocked, catch Regieleki and Regidrago in the Split-Decision Ruins!'));

        const talktoGolemPeony6 = new TalkToNPCQuest(GolemPeony6, 'You finally captured Regieleki and Regidrago. Go report back to Peony!');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony6);

        App.game.quests.questLines().push(ancientGolemsQuestLine);
    }


    public static createGigantamaxQuestLine() {
        const gigantamaxQuestLine = new QuestLine('The Lair of Giants', 'Explore the Max Lair and discover the Gigantamax Pokémon.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoPeonia1 = new TalkToNPCQuest(Peonia1, 'Peony\'s daughter, Peonia, wants to talk to you in Freezington.');
        gigantamaxQuestLine.addQuest(talktoPeonia1);

        const clearMaxLair = new DefeatDungeonQuest(1, 0, 'Max Lair').withDescription('Clear Max Lair to encounter a Gigantamax Pokémon.');
        gigantamaxQuestLine.addQuest(clearMaxLair);

        const talktoPeonia2 = new TalkToNPCQuest(Peonia2, 'Report back to Peonia in Max Lair.');
        gigantamaxQuestLine.addQuest(talktoPeonia2);

        gigantamaxQuestLine.addQuest(new CustomQuest(1, undefined, 'Obtain 1 Wishing Piece', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(2, undefined, 'Obtain 2 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(4, undefined, 'Obtain 4 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(6, undefined, 'Obtain 6 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(9, undefined, 'Obtain 9 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(12, undefined, 'Obtain 12 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(16, undefined, 'Obtain 16 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(20, undefined, 'Obtain 20 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(25, undefined, 'Obtain 25 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(30, undefined, 'Obtain 30 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(36, undefined, 'Obtain 36 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(42, undefined, 'Obtain 42 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(49, undefined, 'Obtain 49 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(56, undefined, 'Obtain 56 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(64, undefined, 'Obtain 64 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(72, undefined, 'Obtain 72 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(81, undefined, 'Obtain 81 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(90, undefined, 'Obtain 90 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(100, undefined, 'Obtain 100 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(110, undefined, 'Obtain 110 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(121, undefined, 'Obtain 121 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(132, undefined, 'Obtain 132 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(144, undefined, 'Obtain 144 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(156, undefined, 'Obtain 156 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(169, undefined, 'Obtain 169 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(182, undefined, 'Obtain 182 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(196, undefined, 'Obtain 196 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(210, undefined, 'Obtain 210 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(225, undefined, 'Obtain 225 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));
        gigantamaxQuestLine.addQuest(new CustomQuest(240, undefined, 'Obtain 240 Wishing Pieces', player.itemList.Wishing_Piece).withInitialValue(0));

        const talktoPeonia3 = new TalkToNPCQuest(Peonia3, 'You\'ve finally obtained enough Wishing Pieces to attract every Gigantamax Pokémon to the Max Lair! Tell Peonia about your achievement in Max Lair.');
        gigantamaxQuestLine.addQuest(talktoPeonia3);

        const talktoGigantamaxLeon1 = new TalkToNPCQuest(GigantamaxLeon1, 'It seems something is going on in Hammerlocke! Talk to Leon in Energy Plant.');
        gigantamaxQuestLine.addQuest(talktoGigantamaxLeon1);

        const clearEternamaxEternatus = new DefeatTemporaryBattleQuest('Eternamax Eternatus', 'Eternamax Eternatus has appeared in the Energy Plant yet again! Bring it down once more.');
        gigantamaxQuestLine.addQuest(clearEternamaxEternatus);

        const talktoGigantamaxLeon2 = new TalkToNPCQuest(GigantamaxLeon2, 'You defeated Eternamax Eternatus once more. Talk to Leon in Energy Plant.');
        gigantamaxQuestLine.addQuest(talktoGigantamaxLeon2);

        const talktoPeonia4 = new TalkToNPCQuest(Peonia4, 'Go back to the Max Lair to tell Peonia what happened.');
        gigantamaxQuestLine.addQuest(talktoPeonia4);

        App.game.quests.questLines().push(gigantamaxQuestLine);
    }

    public static createOriginalColorMagearnaQuestLine() {
        const magearnaQuestLine = new QuestLine('A Mystery Gift', 'You have received a Mystery Gift.',
            new MultiRequirement([
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.kanto),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.johto),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.hoenn),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.sinnoh),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.unova),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.kalos),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.alola),
                new CaughtUniqueShinyPokemonsByRegionRequirement(GameConstants.Region.galar),
            ]), GameConstants.BulletinBoards.Galar);

        const mysteryGift = new TalkToNPCQuest(MagearnaMysteryGift, 'Go home and open your Mystery Gift').withCustomReward(() => {
            App.game.party.gainPokemonByName('Magearna (Original Color)');
            Notifier.notify({
                title: magearnaQuestLine.name,
                message: 'You obtained Magearna (Original Color)!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        });
        magearnaQuestLine.addQuest(mysteryGift);

        App.game.quests.questLines().push(magearnaQuestLine);
    }

    /* Hisui QuestLines */

    public static createHisuiForcesQuestLine() {
        const hisuiForcesQuestLine = new QuestLine('Incarnate Forces of Hisui', 'Cogita would like you to catch the Forces of Nature.', new DevelopmentRequirement(), GameConstants.BulletinBoards.Hisui);

        const talktoForcesCogita1 = new TalkToNPCQuest(ForcesCogita1, 'Speak to Cogita in Galaxy Hall.');
        hisuiForcesQuestLine.addQuest(talktoForcesCogita1);

        const chaseTornadus = new CustomQuest (3, 0, 'Pursue Tornadus in the Alabaster Icelands.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Tornadus 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Tornadus 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Tornadus 3')]()
        );
        const captureTornadus = new CaptureSpecificPokemonQuest('Tornadus', 1, true).withDescription('Catch Tornadus in the Alabaster Icelands');
        const chaseThundurus = new CustomQuest (3, 0, 'Pursue Thundurus in the Cobalt Coastlands.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Thundurus 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Thundurus 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Thundurus 3')]()
        );
        const captureThundurus = new CaptureSpecificPokemonQuest('Thundurus', 1, true).withDescription('Catch Thundurus in the Cobalt Coastlands');
        const chaseLandorus = new CustomQuest (3, 0, 'Pursue Landorus in the Obsidian Fieldlands.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Landorus 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Landorus 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Landorus 3')]()
        );
        const captureLandorus = new CaptureSpecificPokemonQuest('Landorus', 1, true).withDescription('Catch Landorus in the Obsidian Fieldlands');
        hisuiForcesQuestLine.addQuest(new MultipleQuestsQuest(
            [
                chaseTornadus,
                captureTornadus,
                chaseThundurus,
                captureThundurus,
                chaseLandorus,
                captureLandorus,
            ], 'Tornadus, Thundurus and Landorus have been sighted in the Alabaster Icelands, Cobalt Coastlands and Obsidian Fieldland respectively. Pursue and capture them.'));

        const talktoForcesCogita2 = new TalkToNPCQuest(ForcesCogita2, 'Speak to Cogita at Ancient Retreat.');
        hisuiForcesQuestLine.addQuest(talktoForcesCogita2);

        const chaseEnamorus = new CustomQuest (3, 0, 'Pursue Enamorus in the Crimson Mirelands.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Enamorus 1')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Enamorus 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Enamorus 3')]()
        );
        hisuiForcesQuestLine.addQuest(chaseEnamorus);

        const captureEnamorus = new CaptureSpecificPokemonQuest('Enamorus', 1, true).withDescription('Catch Enamorus roaming around Hisui.');
        hisuiForcesQuestLine.addQuest(captureEnamorus);

        const talktoForcesCogita3 = new TalkToNPCQuest(ForcesCogita3, 'Speak to Cogita at Ancient Retreat.');
        hisuiForcesQuestLine.addQuest(talktoForcesCogita3);

        App.game.quests.questLines().push(hisuiForcesQuestLine);
    }

    public static createHisuiArceusQuestLine() {
        const hisuiArceusQuestLine = new QuestLine('Arceus: The Deified Pokémon', 'Discover the truth of the Pokémon deity, Arceus.', new DevelopmentRequirement(), GameConstants.BulletinBoards.Hisui);

        App.game.quests.questLines().push(hisuiArceusQuestLine);
    }

    // Paldea Questlines

    public static createPaldeaLegendsQuestLine() {
        const paldeaLegendsQuestLine = new QuestLine('Path of Legends', 'Help Arven search for the Herba Mystica.');

        const clearTrainerArven = new DefeatGymQuest(1, 0, 'Pokémon Trainer Arven').withDescription('Arven wants to test you and himself. Defeat him at Poco Path Lighthouse');
        paldeaLegendsQuestLine.addQuest(clearTrainerArven);

        App.game.quests.questLines().push(paldeaLegendsQuestLine);
    }

    public static createPaldeaVictoryQuestLine() {
        const paldeaVictoryQuestLine = new QuestLine('Victory Road', 'Challenge Paldea\'s Gyms to challenge your new rival, Nemona.');

        const clearChampionNemona = new DefeatGymQuest(1, 0, 'Champion Nemona').withDescription('Finally, it\'s time to fight Nemona as equals! Defeat Champion Nemona in Mesagoza.');
        paldeaVictoryQuestLine.addQuest(clearChampionNemona);

        App.game.quests.questLines().push(paldeaVictoryQuestLine);
    }

    public static createPaldeaStarfallQuestLine() {
        const paldeaStarfallQuestLine = new QuestLine('Starfall Street', 'Help Casseiopia disband Team Star.');

        const clearCasseiopia = new DefeatGymQuest(1, 0, 'Penny of Team Star').withDescription('Penny has revealed herself to be Casseiopia. Defeat her at Naranjuva Academy.');
        paldeaStarfallQuestLine.addQuest(clearCasseiopia);

        App.game.quests.questLines().push(paldeaStarfallQuestLine);
    }

    public static createPaldeaWayHomeQuestLine() {
        const paldeaWayHomeQuestLine = new QuestLine('The Way Home', 'Help Koraidon and Miraidon find their homes in the mysterious Area Zero.', new MultiRequirement([
            new QuestLineCompletedRequirement('Path of Legends'),
            new QuestLineCompletedRequirement('Victory Road'),
            new QuestLineCompletedRequirement('Starfall Street'),
        ]), GameConstants.BulletinBoards.Paldea);

        App.game.quests.questLines().push(paldeaWayHomeQuestLine);
    }

    /* Event QuestLines */

    // From any bulletin board on April 1 (Hoopa Day).
    public static createHoopaDayPikabluQuestLine() {
        const hoopaDayPikabluQuestLine = new QuestLine('How blu mouse?', 'Apparently a strange blue mouse-like Pokémon might be out there somewhere?', new SpecialEventRequirement('Hoopa Day'), GameConstants.BulletinBoards.All);

        const PikabluCatch = new CaptureSpecificPokemonQuest('Marill', 1, false, 5000).withDescription('Catch Pikablu.');

        hoopaDayPikabluQuestLine.addQuest(PikabluCatch);

        App.game.quests.questLines().push(hoopaDayPikabluQuestLine);
    }

    // From any bulletin board between April 8-29 (Easter).
    public static createEasterQuestLine() {
        const easterQuestLine = new QuestLine('Egg Hunt', 'A basket of strange eggs has been spotted, see if you can find it!', new SpecialEventRequirement('Easter'), GameConstants.BulletinBoards.All);

        const defeatTogepiInKanto = new DefeatDungeonBossQuest('Viridian Forest', 'Egg Hunter').withDescription('Some strange eggs have been seen around Kanto. Go look for it! Maybe Erika knows more?');
        easterQuestLine.addQuest(defeatTogepiInKanto);

        const encounterSurpriseTogepiInJohto = new DefeatDungeonBossQuest('Ilex Forest', 'Egg Hunter').withDescription('Seems like this was just an Easter egg after all... But no time to dwell on that. Another report just came in, there have been sightings of some strange eggs in a forest in Johto!');
        easterQuestLine.addQuest(encounterSurpriseTogepiInJohto);

        const encounterTogepiInHoenn = new DefeatDungeonBossQuest('Petalburg Woods', 'Egg Hunter').withDescription('That looked like a Togepi!... well, maybe not. Anyway, there is a big Egg Hunt going on in the woods south of Rustboro in Hoenn; maybe you should take a look?');
        easterQuestLine.addQuest(encounterTogepiInHoenn);

        const talkToEggHunter = new TalkToNPCQuest(EasterEggHunter, 'The eggs ran away! Talk to the egg hunter in Petalburg Woods.');
        easterQuestLine.addQuest(talkToEggHunter);

        App.game.quests.questLines().push(easterQuestLine);
    }

    public static isQuestLineCompleted(name: QuestLineNameType) {
        return App.game.quests.getQuestLine(name)?.state() == QuestLineState.ended;
    }

    public static loadQuestLines() {
        this.createTutorial();
        this.createRocketKantoQuestLine();
        this.createBillsGrandpaQuestLine();
        this.createUndergroundQuestLine();
        this.createBillSeviiQuestLine();
        this.createPersonsofInterestQuestLine();
        this.createRocketJohtoQuestLine();
        this.createJohtoBeastsQuestLine();
        this.createJohtoSuicuneQuestLine();
        this.createlugiaJohtoQuestLine();
        this.createhoohJohtoQuestLine();
        this.createCelebiJohtoQuestLine();
        this.createAquaMagmaHoennQuestLine();
        this.createWeatherTrioQuestLine();
        this.createDeoxysQuestLine();
        this.createEonDuoQuestLine();
        this.createRubySapphireSeviiQuestLine();
        this.createPinkanThemeparkQuestLine();
        this.createRegiTrioQuestLine();
        this.createJirachiQuestLine();
        this.createMetaGroudonQuestLine();
        this.createOrreColosseumQuestLine();
        this.createGalacticSinnohQuestLine();
        this.createManaphyQuestLine();
        this.createGiratinaQuestLine();
        this.createPlasmaUnovaQuestLine();
        this.createGenesectQuestLine();
        this.createOrreXDQuestLine();
        this.createDeltaEpisodeQuestLine();
        this.createPrimalReversionQuestLine();
        this.createDetectivePikachuQuestLine();
        this.createVivillonQuestLine();
        this.createFlareKalosQuestLine();
        this.createPrincessDiancieQuestLine();
        this.createClashOfAgesQuestLine();
        this.createAshKetchumQuestLine();
        this.createUnrivaledPowerQuestLine();
        this.createSkullAetherAlolaQuestLine();
        this.createMinasTrialAlolaQuestLine();
        this.createSilvallyTypesQuestLine();
        this.createUltraBeastQuestLine();
        this.createMagikarpJumpQuestLine();
        this.createDarkestDayQuestLine();
        this.createSwordShieldQuestLine();
        this.createDojoArmorQuestLine();
        this.createJungleSecretsQuestLine();
        this.createGalarCrownQuestLine();
        this.createDynaTreeBirdsQuestLine();
        this.createAncientGolemsQuestLine();
        this.createGigantamaxQuestLine();
        this.createOriginalColorMagearnaQuestLine();
        this.createHisuiForcesQuestLine();
        this.createHisuiArceusQuestLine();
        this.createPaldeaLegendsQuestLine();
        this.createPaldeaVictoryQuestLine();
        this.createPaldeaStarfallQuestLine();
        this.createPaldeaWayHomeQuestLine();
        this.createEasterQuestLine();
        this.createHoopaDayPikabluQuestLine();
        this.createDrSplashQuestLine();
        this.createMeltanQuestLine();
        this.createRainbowRocketQuestLine();
    }
}
