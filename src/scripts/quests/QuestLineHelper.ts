/**
 * Static class used to handle Quest Lines
 */
class QuestLineHelper {

    // Kanto QuestLines
    public static createTutorial() {
        const tutorial = new QuestLine('Tutorial Quests', 'A short set of quests to get you going.');

        //Defeat Starter
        const defeatStarter = new CustomQuest(1, 10,
            'Defeat the Pokémon. Click to deal damage!',
            () => App.game.statistics.totalPokemonDefeated(),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(defeatStarter);

        //Capture 1 pokemon
        const captureOne = new CustomQuest(1, 20,
            'Capture 1 Pokémon. When you defeat a Pokémon, a Poké Ball is thrown and you have a chance to capture it.',
            () => App.game.statistics.totalPokemonCaptured(),
            1 // Initial of 1 so it auto completes if bugged
        );
        tutorial.addQuest(captureOne);

        //Kill 10 on route 2
        const routeTwo = new CustomQuest(10, 20,
            'Defeat 10 Pokémon on Route 2. Click Route 2 on the map to move there and begin fighting.',
            () => App.game.statistics.routeKills[GameConstants.Region.kanto]['2'](),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(routeTwo);

        //Say bye to mom
        const talkToMom = new TalkToNPCQuest(PalletMom1, 'Go back to Pallet Town and say bye to mom.');
        tutorial.addQuest(talkToMom);

        //Buy pokeballs
        const buyPokeballs = new CustomQuest(10, 20,
            'Buy 10 Poké Balls. You can find these in the Viridian City Shop.',
            () => App.game.statistics.pokeballsPurchased[GameConstants.Pokeball.Pokeball](),
            0 // Initial of 0 so it auto completes if bugged
        );
        tutorial.addQuest(buyPokeballs);

        //Learn about catching from old man
        const OldManReward = () => {
            $('#npc-modal').one('hidden.bs.modal', () => {
                Information.show({
                    steps: [
                        {
                            element: document.getElementById('pokeballSelector'),
                            intro: 'Select which Poké Ball types to catch Pokémon with based on their caught/shiny status.<br/><i><sup>Hover over the column titles for more info.</sup></i><br/><br/>Capturing Pokémon gains you <img title="Dungeon Tokens\nGained by capturing Pokémon" src="assets/images/currency/dungeonToken.svg" height="25px"> Dungeon Tokens.<br/><br/>Try now by clicking the "Caught" selector to change it.',
                        },
                    ],
                    exitOnEsc: false,
                    showButtons: false,
                });
                const caughtSelector: HTMLElement = document.querySelector('.pokeball-small.clickable.pokeball-selected');
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
        const talkToOldMan = new TalkToNPCQuest(ViridianCityOldMan2, 'Talk to the Old Man in Viridian City to learn about catching.', OldManReward);
        tutorial.addQuest(talkToOldMan);

        const catch5Pidgey = new CustomQuest(5, 30, 'Use what you\'ve learned to catch 5 Pidgey. Talk to the Old Man again if you need a reminder.', () => App.game.statistics.pokemonCaptured[PokemonHelper.getPokemonByName('Pidgey').id]());
        tutorial.addQuest(catch5Pidgey);

        //Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 50,
            'Buy the Dungeon Ticket from Viridian City Shop.',
            () => +App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket),
            0
        );
        tutorial.addQuest(buyDungeonTicket);

        //Clear Viridian Forest
        const clearViridianForest = new CustomQuest(1, 50,
            'Gather 50 Dungeon Tokens by (re)capturing Pokémon, then clear the Viridian Forest dungeon.',
            () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Viridian Forest')](),
            0
        );
        tutorial.addQuest(clearViridianForest);

        //Defeat Pewter Gym
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
        const pewter = new CustomQuest(1, pewterReward,
            'Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.',
            () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pewter City')](),
            0
        );
        tutorial.addQuest(pewter);

        App.game.quests.questLines().push(tutorial);
    }

    public static createRocketKantoQuestLine() {
        const rocketKantoQuestLine = new QuestLine('Team Rocket', 'Some nasty villains are up to no good.');

        const clearRocketGameCorner = new CustomQuest(1, 0, 'Illegal activity is afoot. Clear the Rocket Game Corner in Celadon City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Rocket Game Corner')]());
        rocketKantoQuestLine.addQuest(clearRocketGameCorner);

        const clearSilphCo = new CustomQuest(1, 0, 'Team Rocket has occupied Silph Co. Clear Silph Co. in Saffron City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Silph Co.')]());
        rocketKantoQuestLine.addQuest(clearSilphCo);

        const ViridianGymReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: rocketKantoQuestLine.name,
                message: 'The President of Silph Co. has rewarded you with a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearViridianGym = new CustomQuest(1, ViridianGymReward, 'If you take down Team Rocket\'s leader one more time they will surely never come back from this! Clear Viridian City Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Viridian City')]());
        rocketKantoQuestLine.addQuest(clearViridianGym);

        App.game.quests.questLines().push(rocketKantoQuestLine);
    }

    public static createUndergroundQuestLine() {
        const undergroundQuestLine = new QuestLine('Mining Expedition', 'Explore the underground!');

        //Buy Explorer Kit (no reward)
        const buyExplorerKit = new CustomQuest(1, () => {}, 'Buy the Explorer Kit from Cinnabar Island Shop.', () => +App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit), 0);
        undergroundQuestLine.addQuest(buyExplorerKit);

        // Mine 5 layers in the Unerground
        const oldAmberReward = () => {
            // Gain an Old Amber
            const oldAmber = UndergroundItems.list.find(item => item.name == 'Old Amber');
            if (!oldAmber) {
                return console.error('Unable to find item Old Amber');
            }
            Underground.gainMineItem(oldAmber.id);
            Notifier.notify({
                title: undergroundQuestLine.name,
                message: 'You have gained an Old Amber fossil!\n<i>You can breed this in the hatchery.</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: GameConstants.MINUTE,
            });
        };
        const mineLayers = new CustomQuest(5, oldAmberReward, 'Mine 5 layers in the Underground.', App.game.statistics.undergroundLayersMined);
        undergroundQuestLine.addQuest(mineLayers);

        App.game.quests.questLines().push(undergroundQuestLine);
    }

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

        const clearCueBallPaxtonTemporaryBattle = new CustomQuest(1, 0, 'Defeat the biker gang\'s leader.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Cue Ball Paxton')]());
        billSeviiQuestLine.addQuest(clearCueBallPaxtonTemporaryBattle);

        const clearBerryForest = new CustomQuest(1, 0, 'Find Lostelle. Clear Berry Forest.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Berry Forest')]());
        billSeviiQuestLine.addQuest(clearBerryForest);

        const talktoGameCornerOwner2 = new TalkToNPCQuest(TwoIslandGameCornerOwner2, 'Lostelle has been found. Return to the Game Corner owner on Two Island.');
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

        const talktoCelio2 = new TalkToNPCQuest(OneIslandCelio2, 'Deliver the meteorite to Celio on One Island.', BillsErrandReward);
        billSeviiQuestLine.addQuest(talktoCelio2);

        App.game.quests.questLines().push(billSeviiQuestLine);
    }

    public static createPersonsofInterestQuestLine() {
        const personsofInterestQuestLine = new QuestLine('Persons of Interest', 'Some people want to talk to you.');

        const talktoBreeder = new TalkToNPCQuest(SaffronBreeder, 'Talk to the Breeder in Saffron City.', 250);
        personsofInterestQuestLine.addQuest(talktoBreeder);

        const talktoGemScientist = new TalkToNPCQuest(PewterScientist, 'Talk to the Gem Scientist in Pewter City.', 250);
        personsofInterestQuestLine.addQuest(talktoGemScientist);

        App.game.quests.questLines().push(personsofInterestQuestLine);
    }

    // Johto QuestLines
    public static createRocketJohtoQuestLine() {
        const rocketJohtoQuestLine = new QuestLine('Team Rocket Again', 'Team Rocket is up to no good again!');

        const clearTeamRocketHideout = new CustomQuest(1, 0, 'Clear the Team Rocket\'s Hideout dungeon in Mahogany Town', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Rocket\'s Hideout')]());
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

        const clearRadioTower = new CustomQuest(1, radioTowerReward, 'Clear the Radio Tower dungeon in Goldenrod City', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Radio Tower')]());
        rocketJohtoQuestLine.addQuest(clearRadioTower);

        App.game.quests.questLines().push(rocketJohtoQuestLine);
    }

    public static createCelebiJohtoQuestLine() {
        const celebiJohtoQuestLine = new QuestLine('Unfinished Business', 'A request from Professor Oak.', new QuestLineCompletedRequirement('Bill\'s Errand'), GameConstants.BulletinBoards.Kanto);

        const talktoProfOak1 = new TalkToNPCQuest(PalletCelebiProfOak1, 'Talk to Professor Oak in Pallet Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak1);

        const talktoProfIvy = new TalkToNPCQuest(CelebiProfIvy, 'Talk to Professor Ivy in her lab in the Sevii Islands.');
        celebiJohtoQuestLine.addQuest(talktoProfIvy);

        const talktoProfOak2 = new TalkToNPCQuest(PalletCelebiProfOak2, 'Deliver the GS Ball to Professor Oak in Pallet Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak2);

        const talktoKurt1 = new TalkToNPCQuest(AzaleaCelebiKurt2, 'Deliver the GS Ball to Kurt in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoKurt1);

        const talktoKurt2 = new TalkToNPCQuest(AzaleaCelebiKurt4, 'Talk to Kurt again after becoming Champion of Johto.');
        celebiJohtoQuestLine.addQuest(talktoKurt2);

        const talktoProfOak3 = new TalkToNPCQuest(AzaleaCelebiOak1, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak3);

        const talktoIlexForestShrine1 = new TalkToNPCQuest(IlexForestShrine1, 'Investigate the shrine in Ilex Forest.');
        celebiJohtoQuestLine.addQuest(talktoIlexForestShrine1);

        const SpikyEaredPichuReward = () => {
            App.game.party.gainPokemonById(172.1);
            Notifier.notify({
                title: celebiJohtoQuestLine.name,
                message: 'You captured the Spiky-eared Pichu!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearSpikyEaredPichu = new CustomQuest(1, SpikyEaredPichuReward, 'Defeat the strange Pichu.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Spiky-eared Pichu')]());
        celebiJohtoQuestLine.addQuest(clearSpikyEaredPichu);

        const talktoProfOak4 = new TalkToNPCQuest(AzaleaCelebiOak2, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak4);

        const talktoTohjoFallsTimeDistortion = new TalkToNPCQuest(TohjoFallsCelebiTimeDistortion, 'Investigate the Time Distortion in Tohjo Falls.');
        celebiJohtoQuestLine.addQuest(talktoTohjoFallsTimeDistortion);

        const clearGiovanni = new CustomQuest(1, 0, 'Defeat Giovanni.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rocket Boss Giovanni')]());
        celebiJohtoQuestLine.addQuest(clearGiovanni);

        const talktoProfOak5 = new TalkToNPCQuest(AzaleaCelebiOak3, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak5);

        const talktoIlexForestShrine2 = new TalkToNPCQuest(IlexForestShrine2, 'Investigate the shrine in Ilex Forest.');
        celebiJohtoQuestLine.addQuest(talktoIlexForestShrine2);

        const CelebiCatch = new CaptureSpecificPokemonQuest(
            'Celebi',
            'Play with the Celebi in Ilex Forest.',
            1,
            false,
            undefined,
            undefined
        );

        celebiJohtoQuestLine.addQuest(CelebiCatch);

        const talktoProfOak6 = new TalkToNPCQuest(AzaleaCelebiOak5, 'Talk to Professor Oak in Azalea Town.');
        celebiJohtoQuestLine.addQuest(talktoProfOak6);

        App.game.quests.questLines().push(celebiJohtoQuestLine);
    }

    // Hoenn QuestLines
    public static createAquaMagmaHoennQuestLine() {
        const aquaMagmaHoennQuestLine = new QuestLine('Land vs. Water', 'Put a stop to the schemes of Team Aqua and Team Magma!');

        const clearMtChimney = new CustomQuest(1, 0, 'Stop Team Magma at Mt. Chimney Crater.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Mt. Chimney Crater')]());
        aquaMagmaHoennQuestLine.addQuest(clearMtChimney);

        const clearWeatherInstitute = new CustomQuest(1, 0, 'Stop Team Aqua at the Weather Institute.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Weather Institute')]());
        aquaMagmaHoennQuestLine.addQuest(clearWeatherInstitute);

        const clearMagmaHideout = new CustomQuest(1, 0, 'Raid the Team Magma hideout.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Magma Hideout')]());
        aquaMagmaHoennQuestLine.addQuest(clearMagmaHideout);

        const clearAquaHideout = new CustomQuest(1, 0, 'Raid the Team Aqua hideout.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Aqua Hideout')]());
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

        const clearSeafloorCavern = new CustomQuest(1, seafloorCavernReward, 'Team Aqua\'s leader Archie escaped from their hideout. Find him in the Seafloor Cavern and put a stop to this once and for all!', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Seafloor Cavern')]());
        aquaMagmaHoennQuestLine.addQuest(clearSeafloorCavern);

        App.game.quests.questLines().push(aquaMagmaHoennQuestLine);
    }

    public static createDeoxysQuestLine() {
        const deoxysQuestLine = new QuestLine('Mystery of Deoxys', 'Discover the mystery of Deoxys.');

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
        const defeatPsychic = new CustomQuest(500, psychicGemReward, 'Defeat 500 Psychic-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonDefeated[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(defeatPsychic);

        // Capture 200 Psychic type Pokemon
        const mindPlateReward = () => {
            const mindPlate = UndergroundItems.list.find(item => item.name == 'Mind Plate');
            if (!mindPlate) {
                return console.error('Unable to find item Mind Plate');
            }
            Underground.gainMineItem(mindPlate.id, 20);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: `You have gained 20 ${mindPlate.name}s!`,
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchPsychic = new CustomQuest(200, mindPlateReward, 'Capture 200 Psychic-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
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
        const reachStage100 = new CustomQuest(100, reachStage100Reward, 'Defeat stage 100 in the Battle Frontier.', App.game.statistics.battleFrontierHighestStageCompleted, 0);
        deoxysQuestLine.addQuest(reachStage100);

        App.game.quests.questLines().push(deoxysQuestLine);
    }

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

        const clearRubyPath = new CustomQuest(1, 0, 'Locate the Ruby. Clear Ruby Path in Mt. Ember.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Ruby Path')]());
        rubySapphireSeviiQuestLine.addQuest(clearRubyPath);

        const talktoRuby = new TalkToNPCQuest(SeviiRuby, 'Take the Ruby in Ruby Path');
        rubySapphireSeviiQuestLine.addQuest(talktoRuby);

        const talktoCelio4 = new TalkToNPCQuest(OneIslandCelio5, 'Return the Ruby to Celio on One Island');
        rubySapphireSeviiQuestLine.addQuest(talktoCelio4);

        const clearIcefallCave = new CustomQuest(1, 0, 'Help Lorelei with Team Rocket Grunts by clearing Icefall Cave on Four Island.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Icefall Cave')]());
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

        const clearSeviiAriana = new CustomQuest(1, 0, 'Defeat Team Rocket Executive Ariana in Rocket Warehouse.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Ariana')]());
        rubySapphireSeviiQuestLine.addQuest(clearSeviiAriana);

        const clearSeviiArcher = new CustomQuest(1, 0, 'Defeat Team Rocket Executive Archer in Rocket Warehouse.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sevii Rocket Archer')]());
        rubySapphireSeviiQuestLine.addQuest(clearSeviiArcher);

        const clearSeviiGideon = new CustomQuest(1, 0, 'Defeat Scientist Gideon to reclaim the Sapphire.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Scientist Gideon')]());
        rubySapphireSeviiQuestLine.addQuest(clearSeviiGideon);

        const talktoCelio5 = new TalkToNPCQuest(OneIslandCelio6, 'Return the Sapphire to Celio on One Island');
        rubySapphireSeviiQuestLine.addQuest(talktoCelio5);

        App.game.quests.questLines().push(rubySapphireSeviiQuestLine);
    }

    public static createPinkanThemeparkQuestLine() {
        const pinkanThemeparkQuestLine = new QuestLine('Pinkan Themepark', 'Help Team Rocket build a Pinkan Themepark.', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion), GameConstants.BulletinBoards.Sevii4567);

        const talktoTeamRocket = new TalkToNPCQuest(ThemeparkTeamRocket1, 'Talk to Team Rocket on Pinkan, to hear about their plans');
        pinkanThemeparkQuestLine.addQuest(talktoTeamRocket);

        const defeatForest = new CustomQuest(10,
            () => App.game.farming.gainBerry(BerryType.Pinkan, 10),
            'Do some research. Defeat 100 Pinkan in the forest.',
            () => App.game.statistics.routeKills[GameConstants.Region.kanto][41]()
        );
        pinkanThemeparkQuestLine.addQuest(defeatForest);

        App.game.quests.questLines().push(pinkanThemeparkQuestLine);
    }

    // Sinnoh QuestLines
    public static createGalacticSinnohQuestLine() {
        const galacticSinnohQuestLine = new QuestLine('A new world', 'End Team Galactic\'s plan to destroy the world and create a new one in its place.');

        const clearValleyWindworks = new CustomQuest(1, 0, 'Team Galactic is stealing energy. Clear Valley Windworks.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Valley Windworks')]());
        galacticSinnohQuestLine.addQuest(clearValleyWindworks);

        const clearTeamGalacticEternaBuilding = new CustomQuest(1, 0, 'Team Galactic is kidnapping Pokémon now. Clear Team Galactic Eterna Building in Eterna City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Galactic Eterna Building')]());
        galacticSinnohQuestLine.addQuest(clearTeamGalacticEternaBuilding);

        const clearPastoriaCityGym = new CustomQuest(1, 0, 'All is quiet. Team Galactic isn\'t doing anything. Guess they learned their lesson. Just keep traveling, I guess. Clear the Pastoria City Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pastoria City')]());
        galacticSinnohQuestLine.addQuest(clearPastoriaCityGym);

        const clearCyrus1TemporaryBattle = new CustomQuest(1, 0, 'The boss of Team Galactic has been spotted in Celestic Town!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Galactic Boss Cyrus')]());
        galacticSinnohQuestLine.addQuest(clearCyrus1TemporaryBattle);

        const clearCanalaveCityGym = new CustomQuest(1, 0, 'Cyrus is gone. Nowhere to be found. Nothing to do but proceed. Adventure awaits! Clear the Canalave City Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Canalave City')]());
        galacticSinnohQuestLine.addQuest(clearCanalaveCityGym);

        const clearLakeValor = new CustomQuest(1, 0, 'A commotion was heard at Lake Valor. You must protect the lake\'s guardian! Clear Lake Valor.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Valor')]());
        galacticSinnohQuestLine.addQuest(clearLakeValor);

        const clearLakeVerity = new CustomQuest(1, 0, 'Lake Valor\'s guardian was taken. Better try again at the next lake. Clear Lake Verity.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Verity')]());
        galacticSinnohQuestLine.addQuest(clearLakeVerity);

        const clearLakeAcuity = new CustomQuest(1, 0, 'Lake Verity\'s guardian was also taken. Only one lake remains. Clear Lake Acuity.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Lake Acuity')]());
        galacticSinnohQuestLine.addQuest(clearLakeAcuity);

        const clearTeamGalacticHQ = new CustomQuest(1, 0, 'You failed to protect any of the lake guardians. They have been taken to Veilstone City. So that\'s what that strange building was... Clear Team Galactic HQ in Veilstone City.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Galactic HQ')]());
        galacticSinnohQuestLine.addQuest(clearTeamGalacticHQ);

        const clearSpearPillar = new CustomQuest(1, 0, 'The lake guardians have been rescued, but Cyrus has used them to forge the Red Chain. He is taking it to the top of Mount Coronet. Follow him! Clear Spear Pillar.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Spear Pillar')]());
        galacticSinnohQuestLine.addQuest(clearSpearPillar);

        const DistortionWorldReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: galacticSinnohQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearDistortionWorld = new CustomQuest(1, DistortionWorldReward, 'Cyrus planned to use the Red Chain to enslave Dialga and Palkia, but he accidentally angered Giratina and has been taken to its realm. A portal has appeared on top of Mount Coronet. Use it to follow Cyrus and end his threat once and for all. Clear Distortion World.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Distortion World')]());
        galacticSinnohQuestLine.addQuest(clearDistortionWorld);

        App.game.quests.questLines().push(galacticSinnohQuestLine);
    }

    // Unova QuestLines
    public static createPlasmaUnovaQuestLine() {
        const plasmaUnovaQuestLine = new QuestLine('Quest for the DNA Splicers', 'Prevent Team Plasma from using these dangerous Splicers.');

        const clearVirbankGrunt = new CustomQuest (1, 0, 'A Team Plasma Grunt in Virbank City would like to steal your Pokémon. Defeat the grunt.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 1')]());
        plasmaUnovaQuestLine.addQuest(clearVirbankGrunt);

        const clearCastliaSewers = new CustomQuest (1, 0, 'Some Team Plasma Grunts were seen entering the Castelia Sewers. Clear Castelia Sewers.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Castelia Sewers')]());
        plasmaUnovaQuestLine.addQuest(clearCastliaSewers);

        const talktoPlasmaGrunt1 = new TalkToNPCQuest(PlasmaGrunt1, 'Investigate the Perfectly Ordinary Frigate.');
        plasmaUnovaQuestLine.addQuest(talktoPlasmaGrunt1);

        const clearNimbasaGym = new CustomQuest (1, 0, 'Seems there\'s nothing suspicious going on in Castelia City. Time to continue your journey. Clear the Nimbasa Gym.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Nimbasa City')]());
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

        const talktoZinzolin = new TalkToNPCQuest(DriftveilZinzolin, 'Talk to Zinzolin.', talktoZinzolinReward);
        plasmaUnovaQuestLine.addQuest(talktoZinzolin);

        const unovaRoute13 = new CustomQuest(10, 0, 'The Frigate is gone. Nothing to do but move forward. Clear route 13.', () => App.game.statistics.routeKills[GameConstants.Region.unova]['13']());
        plasmaUnovaQuestLine.addQuest(unovaRoute13);

        const clearLacunosaGrunt = new CustomQuest (1, 0, 'You have stumbled upon Zinzolin and a Team Plasma Grunt in Lacunosa Town. Defeat the grunt.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 6')]());
        plasmaUnovaQuestLine.addQuest(clearLacunosaGrunt);

        const clearZinzolin1 = new CustomQuest (1, 0, 'Defeat Zinzolin.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Zinzolin 1')]());
        plasmaUnovaQuestLine.addQuest(clearZinzolin1);

        const clearOpelucidGym = new CustomQuest(1, 0, 'Defeat the Opelucid City gym leader to obtain the DNA Splicers before Team Plasma does!', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Opelucid City')]());
        plasmaUnovaQuestLine.addQuest(clearOpelucidGym);

        const clearOpelucidGrunts = new CustomQuest (3, 0, 'Team Plasma has stolen the DNA Splicers and is assaulting the city with an army of grunts and shadows! Defend against the Team Plasma Assault!', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 7')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 8')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Team Plasma Grunt 9')]()
        );
        plasmaUnovaQuestLine.addQuest(clearOpelucidGrunts);

        const clearZinzolin2 = new CustomQuest (1, 0, 'Defeat Zinzolin.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Zinzolin 2')]());
        plasmaUnovaQuestLine.addQuest(clearZinzolin2);

        const clearPlasmaShadow1Reward = () => {
            MapHelper.moveToTown('Opelucid City');
        };

        const clearPlasmaShadow1 = new CustomQuest (1, clearPlasmaShadow1Reward, 'Defeat the Plasma Shadow.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 1')]());
        plasmaUnovaQuestLine.addQuest(clearPlasmaShadow1);

        const clearPlasmaFrigateReward = () => {
            MapHelper.moveToTown('Humilau City');
        };

        const clearPlasmaFrigate = new CustomQuest(1, clearPlasmaFrigateReward, 'Team Plasma has fled the scene with the stolen DNA Splicers. Find and clear out the Plasma Frigate.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Plasma Frigate')]());
        plasmaUnovaQuestLine.addQuest(clearPlasmaFrigate);

        const clearGiantChasm = new CustomQuest(1, 0, 'Team Plasma\'s leader Ghetsis plans on using the DNA Splicers on Kyurem in Giant Chasm. Clear the dungeon to end his evil plans.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Giant Chasm')]());
        plasmaUnovaQuestLine.addQuest(clearGiantChasm);

        const talktoColress = new TalkToNPCQuest(GiantChasmColress, 'Talk to Colress.');
        plasmaUnovaQuestLine.addQuest(talktoColress);

        const clearColress = new CustomQuest (1, 0, 'Defeat Colress.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Colress')]());
        plasmaUnovaQuestLine.addQuest(clearColress);

        const clearPlasmaShadow2 = new CustomQuest (3, 0, 'Defeat the Plasma Shadows.', () =>
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 2')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 3')]() +
            App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Plasma Shadow 4')]()
        );
        plasmaUnovaQuestLine.addQuest(clearPlasmaShadow2);

        const talktoShadowTriad = new TalkToNPCQuest(GiantChasmShadowTriad, 'Talk to the Shadow Triad.');
        plasmaUnovaQuestLine.addQuest(talktoShadowTriad);

        const clearGhetsis1 = new CustomQuest (1, 0, 'Ghetsis has done something to the legendary Dragon-type Pokémon!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ghetsis 1')]());
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

        const clearGhetsis2 = new CustomQuest (1, ghetsisReward, 'Defeat Ghetis one final time!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ghetsis 2')]());
        plasmaUnovaQuestLine.addQuest(clearGhetsis2);

        App.game.quests.questLines().push(plasmaUnovaQuestLine);
    }

    // Kalos QuestLines
    public static createDetectivePikachuQuestLine() {
        const detectivePikachuQuestLine = new QuestLine('Detective Pikachu', 'Detective Pikachu\'s partner has gone missing, and he needs your help!', new MultiRequirement([new ObtainedPokemonRequirement(pokemonMap['Detective Pikachu']), new GymBadgeRequirement(BadgeEnums.Bug)]) , GameConstants.BulletinBoards.Kalos);

        const searchForClues1 = new TalkToNPCQuest(searchForClues, 'Search Goldenrod City for clues.');
        detectivePikachuQuestLine.addQuest(searchForClues1);

        const aipomAlley = new CustomQuest(1, 0, 'Defeat the Aipoms', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Aipom Alley')]());
        detectivePikachuQuestLine.addQuest(aipomAlley);

        const searchForClues2 = new CustomQuest(1, 0, 'The Aipoms dropped some sort of vial while they were running away. It looks like they were headed towards the Radio Tower. Find it!', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Radio Tower')]());
        detectivePikachuQuestLine.addQuest(searchForClues2);

        const searchForClues3 = new TalkToNPCQuest(Informant1, 'Detective Pikachu has an informant who knows more about the mysterious vial. Meet with him in Saffron City.');
        detectivePikachuQuestLine.addQuest(searchForClues3);

        const mimeInterview = new CustomQuest(1, 0, 'The informant is proving hard to convince. Time to get physical!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Mime Interview')]());
        detectivePikachuQuestLine.addQuest(mimeInterview);

        const searchForClues4 = new TalkToNPCQuest(Informant2, 'The informant is finally willing to "talk", find out what he has to say.');
        detectivePikachuQuestLine.addQuest(searchForClues4);

        const undergroundFightingRing = new CustomQuest(1, 0, 'Infiltrate the underground fighting ring.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Underground Fighting Ring')]());
        detectivePikachuQuestLine.addQuest(undergroundFightingRing);

        const searchForClues5 = new TalkToNPCQuest(HowardClifford1, 'Go to Clifford Industries in Goldenrod City to demand some answers.');
        detectivePikachuQuestLine.addQuest(searchForClues5);

        const searchForClues6 = new TalkToNPCQuest(LucyStevens1, 'Meet up with investigative journalist Lucy Stevens in Hearthome City');
        detectivePikachuQuestLine.addQuest(searchForClues6);

        const searchForClues7 = new CustomQuest(1, 0, 'Search the research laboratory for clues.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('P2 Laboratory')]());
        detectivePikachuQuestLine.addQuest(searchForClues7);

        const labAmbush = new CustomQuest(1, 0, 'It was an ambush! You have been followed to Nuvema Town, defeat the mysterious attackers and escape!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Lab Ambush')]());
        detectivePikachuQuestLine.addQuest(labAmbush);

        const searchForClues8 = new TalkToNPCQuest(Mewtwo1, 'Detective Pikachu is injured. He asks you to get help from his friend near Cerulean Cave');
        detectivePikachuQuestLine.addQuest(searchForClues8);

        const searchForClues9 = new TalkToNPCQuest(HowardClifford2, 'Confront Howard Clifford in Goldenrod City about his involvement with the R vials.');
        detectivePikachuQuestLine.addQuest(searchForClues9);

        const imposterAttack = new CustomQuest(1, 0, 'Defeat Howard\'s bodyguard and escape.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Imposter')]());
        detectivePikachuQuestLine.addQuest(imposterAttack);

        const howardConfront = new TalkToNPCQuest(HowardClifford3, 'Give Howard Clifford one last change to surrender!');
        detectivePikachuQuestLine.addQuest(howardConfront);

        const possessedFight = new CustomQuest(1, 0, 'Defeat Mewtwo to free it from Howard\'s control!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Possessed Mewtwo')]());
        detectivePikachuQuestLine.addQuest(possessedFight);

        const searchForClues10 = new TalkToNPCQuest(Mewtwo2, 'Talk to Mewtwo near Cerulean Cave about Detective Pikachu\'s partner.');
        detectivePikachuQuestLine.addQuest(searchForClues10);

        const DetectiveRaichuReward = () => {
            App.game.party.gainPokemonById(26.02);
            Notifier.notify({
                title: detectivePikachuQuestLine.name,
                message: 'Detective Pikachu\'s partner has been nursed back to health!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const searchForClues11 = new TalkToNPCQuest(DetectiveRaichu, 'Talk to Detective Raichu', DetectiveRaichuReward);
        detectivePikachuQuestLine.addQuest(searchForClues11);

        App.game.quests.questLines().push(detectivePikachuQuestLine);
    }

    public static createVivillonQuestLine() {
        const vivillonQuestLine = new QuestLine('The Great Vivillon Hunt!', 'Discover the beauty of Vivillon.', new GymBadgeRequirement(BadgeEnums.Iceberg), GameConstants.BulletinBoards.Kalos);

        const createVivillonQuest = (type: PokemonType, vivillon: PokemonNameType, dungeons: Array<string>, hint: string) => {
            // Capture 100 Water type Pokemon
            const catchType = new CustomQuest(100, undefined, `Capture 100 ${PokemonType[type]} type Pokémon`, () => {
                return pokemonMap.filter(p => p.type.includes(type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
            });
            vivillonQuestLine.addQuest(catchType);

            // Capture Vivillon in a dungeon
            const vivillonAdd = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList.push(new DungeonBossPokemon(vivillon, 93659450, 80));
                });
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `A Vivillon is hiding somewhere.\n${hint}`,
                    type: NotificationConstants.NotificationOption.info,
                });
            };
            const vivillonRemove = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList = dungeonList[dungeon].bossList.filter(boss => boss.name != vivillon);
                });
                Notifier.notify({
                    title: vivillonQuestLine.name,
                    message: `You caught the rare ${vivillon}!`,
                    type: NotificationConstants.NotificationOption.success,
                });
            };
            const catchVivillon = new CaptureSpecificPokemonQuest(
                vivillon,
                `Find and capture the rare Vivillon!\nHint: ${hint}`,
                1,
                false,
                vivillonRemove,
                vivillonAdd);
            vivillonQuestLine.addQuest(catchVivillon);
        };

        createVivillonQuest(PokemonType.Water, 'Vivillon (Marine)', ['Lake Verity', 'Lake Valor', 'Lake Acuity'], 'It has been spotted at some Lakes.');
        createVivillonQuest(PokemonType.Psychic, 'Vivillon (Modern)', ['Cerulean Cave'], 'It\'s surrounded by strong Pokémon.');
        createVivillonQuest(PokemonType.Poison, 'Vivillon (Jungle)', ['Moor of Icirrus'], 'It has been spotted in a swamp.');
        createVivillonQuest(PokemonType.Dark, 'Vivillon (Monsoon)', ['Dark Cave'], 'It\'s hiding at a dark place.');
        createVivillonQuest(PokemonType.Steel, 'Vivillon (Tundra)', ['Poké Ball Factory'], 'It flew into a factory.');
        createVivillonQuest(PokemonType.Fire, 'Vivillon (Sun)', ['Mt. Chimney Crater'], 'It seems to like hot places.');
        createVivillonQuest(PokemonType.Fighting, 'Vivillon (Archipelago)', ['Sprout Tower'], 'It\'s sitting on a swaying pillar.');
        createVivillonQuest(PokemonType.Ghost, 'Vivillon (Elegant)', ['Lost Hotel'], 'It\'s visiting an abandoned and spooky place.');
        createVivillonQuest(PokemonType.Fairy, 'Vivillon (Ocean)', ['Dreamyard'], 'It\'s flying around an overgrown place full of dreams.');
        createVivillonQuest(PokemonType.Electric, 'Vivillon (Continental)', ['New Mauville'], 'It\'s currently in a City full of Electric-type Pokémon.');
        createVivillonQuest(PokemonType.Bug, 'Vivillon (River)', ['Eterna Forest'], 'It hides in a dark Forest.');
        createVivillonQuest(PokemonType.Flying, 'Vivillon (Polar)', ['Sky Pillar'], 'It\'s high up in the sky.');
        createVivillonQuest(PokemonType.Ground, 'Vivillon (Sandstorm)', ['Relic Castle'], 'It got lost in the desert sand.');
        createVivillonQuest(PokemonType.Grass, 'Vivillon (Garden)', ['Flower Paradise'], 'It only shows up amongst the most beautiful flowers.');
        createVivillonQuest(PokemonType.Rock, 'Vivillon (High Plains)', ['Mt. Moon'], 'It has been spotted dancing in the moonlight.');
        createVivillonQuest(PokemonType.Dragon, 'Vivillon (Savanna)', ['Dragonspiral Tower'], 'It\'s surrounded by dragons.');
        createVivillonQuest(PokemonType.Ice, 'Vivillon (Icy Snow)', ['Frost Cavern'], 'It can be found at a very cold place.');

        // Capture 200 Normal type Pokemon
        const catchNormal = new CustomQuest(200, undefined, 'Capture 200 Normal-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Normal)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
        vivillonQuestLine.addQuest(catchNormal);

        // Capture Vivillon (Pokéball)
        const viviBallAdd = () => {
            BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(666, 'Vivillon (Poké Ball)'));
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
        const catchBall = new CaptureSpecificPokemonQuest(
            'Vivillon (Poké Ball)',
            'Find and capture the rare Vivillon!\nHint: Only the strongest Challengers can reach it.',
            1,
            false,
            viviBalldone,
            viviBallAdd);
        vivillonQuestLine.addQuest(catchBall);

        // Add quest to quest line
        App.game.quests.questLines().push(vivillonQuestLine);
    }

    public static createAshKetchumQuestLine() {
        const ashKetchumQuestLine = new QuestLine('The New Kid', 'A new kid from your home town is making waves. Show him who the real prodigy of Pallet Town is.', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion), GameConstants.BulletinBoards.Kalos);

        const clearKantoAsh = new CustomQuest(1, 0, 'Defeat the kid near Pallet Town.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Kanto')]());
        ashKetchumQuestLine.addQuest(clearKantoAsh);

        const clearJohtoAsh = new CustomQuest(1, 0, 'He\'s not stopping. Find the kid in Johto.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Johto')]());
        ashKetchumQuestLine.addQuest(clearJohtoAsh);

        const clearHoennAsh = new CustomQuest(1, 0, 'He just won\'t learn his lesson. Defeat the kid again in Hoenn.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Hoenn')]());
        ashKetchumQuestLine.addQuest(clearHoennAsh);

        const clearSinnohAsh = new CustomQuest(1, 0, 'Who does this kid think he is anyway? Pretending he\'s the main character. He\'s in Sinnoh now.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Sinnoh')]());
        ashKetchumQuestLine.addQuest(clearSinnohAsh);

        const clearUnovaAsh = new CustomQuest(1, 0, 'The kid is hiding in Unova!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Unova')]());
        ashKetchumQuestLine.addQuest(clearUnovaAsh);

        const AshKetchumReward = () => {
            App.game.party.gainPokemonById(658.01);
            Notifier.notify({
                title: ashKetchumQuestLine.name,
                message: 'You obtained Ash-Greninja!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearKalosAsh = new CustomQuest(1, AshKetchumReward, 'Maybe you were too hard on the kid... You should offer him an apology in Kalos.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ash Ketchum Kalos')]());
        ashKetchumQuestLine.addQuest(clearKalosAsh);

        App.game.quests.questLines().push(ashKetchumQuestLine);
    }

    // Alola QuestLines
    public static createSkullAetherAlolaQuestLine() {
        const skullAetherAlolaQuestLine = new QuestLine('Eater of Light', 'A dangerous Pokémon from another world threatens the Alola region.');

        const clearUltraWormhole = new CustomQuest(1, 0, 'A strange creature has appeared in Aether Paradise. Make it go away. Clear the Ultra Wormhole.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ultra Wormhole')]());
        skullAetherAlolaQuestLine.addQuest(clearUltraWormhole);

        const clearMalieGarden = new CustomQuest(1, 0, 'Team Skull are being annoying. Get rid of them. Clear the Malie Garden dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Malie Garden')]());
        skullAetherAlolaQuestLine.addQuest(clearMalieGarden);

        const clearPoTown = new CustomQuest(1, 0, 'Team Skull have stolen a child\'s Yungoos. Raid their base. Clear the Po Town dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Po Town')]());
        skullAetherAlolaQuestLine.addQuest(clearPoTown);

        const clearAetherFoundation = new CustomQuest(1, 0, 'Aether president Lusamine has recruited Team Skull in her own plan to stop the Eater of Light. She\'s an idiot. Stop her. Clear the Aether Foundation dungeon.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Aether Foundation')]());
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

        const clearUltraMegalopolis = new CustomQuest(1, UltraMegalopolisReward, 'Stop the Eater of Light from absorbing all light in Alola. Clear Ultra Megalopolis at the Altar of the Sunne and Moone.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Ultra Megalopolis')]());
        skullAetherAlolaQuestLine.addQuest(clearUltraMegalopolis);

        App.game.quests.questLines().push(skullAetherAlolaQuestLine);
    }

    public static createMinasTrialAlolaQuestLine() {
        const minasTrialAlolaQuestLine = new QuestLine('Mina\'s Trial', 'Mina has asked you to battle the Trial captains of the other islands to earn access to her Trial site.');

        const clearCaptainMina = new CustomQuest(1, 0, 'Defeat Captain Mina in Seafolk Village.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Mina')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainMina);

        const clearCaptainIlima = new CustomQuest(1, 0, 'Defeat Captain Ilima in Hau\'oli Cemetery.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Ilima')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainIlima);

        const clearCaptainMallow = new CustomQuest(1, 0, 'Defeat Captain Mallow in Lush Jungle.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Mallow')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainMallow);

        const clearCaptainLana = new CustomQuest(1, 0, 'Defeat Captain Lana in Lush Jungle.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Lana')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainLana);

        const clearCaptainKiawe = new CustomQuest(1, 0, 'Defeat Captain Kiawe in Wela Volcano Park.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Kiawe')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainKiawe);

        const clearCaptainSophocles = new CustomQuest(1, 0, 'Defeat Captain Sophocles in Hokulani Observatory.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Sophocles')]());
        minasTrialAlolaQuestLine.addQuest(clearCaptainSophocles);

        const clearKahunaNanu = new CustomQuest(1, 0, 'Captain Acerola is apparently busy with something at the top of Mount Lanakila. Defeat Kahuna Nanu in Tapu Village instead.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Kahuna Nanu')]());
        minasTrialAlolaQuestLine.addQuest(clearKahunaNanu);

        const clearMinasHouseboat = new CustomQuest(1, 0, 'Complete the Trial! Clear Mina\'s Houseboat in Seafolk Village.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Mina\'s Houseboat')]());
        minasTrialAlolaQuestLine.addQuest(clearMinasHouseboat);

        App.game.quests.questLines().push(minasTrialAlolaQuestLine);
    }

    public static createUltraBeastQuestLine() {
        const UltraBeastQuestLine = new QuestLine('Ultra Beast Hunt', 'Track down the mysterious Ultra Beasts', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion), GameConstants.BulletinBoards.Alola);

        const talkToLooker = new TalkToNPCQuest(RoadsideMotelLooker1, 'Talk to Looker at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToLooker);

        const AnabelReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Beastball,5,false);
        };

        const AnabelBattle = new CustomQuest(
            1,
            AnabelReward,
            'Defeat Agent Anabel at the Roadside Motel.',
            () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Anabel')](),
            0
        );
        UltraBeastQuestLine.addQuest(AnabelBattle);

        const talkToAnabel1 = new TalkToNPCQuest(RoadsideMotelAnabel1, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel1);

        const talkToLooker2 = new TalkToNPCQuest(RoadsideMotelLooker2, 'Talk to Looker at the Roadside Motel to learn about Beast Balls.');
        UltraBeastQuestLine.addQuest(talkToLooker2);

        const createUltraBeastQuest = (ultrabeast: PokemonNameType, hint: string, numberCaught: number, ultraBeastReward?: (() => void)) => {
            const time = (numberCaught > 0) ?  'times!' : 'time!';
            const validHint = hint ?? '';

            const catchUltraBeast = new CaptureSpecificPokemonQuest(
                ultrabeast,
                `Capture ${ultrabeast} ${numberCaught} ${time} ${validHint}`,
                numberCaught,
                false,
                ultraBeastReward,
                undefined
            );

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
            ], 'Rare Ultra Beasts have been spotted!\nBuzzwole in Melemele Meadow and Pheromosa in Verdant Cavern!', ultraBeastReward));

        const talkToAnabel3 = new TalkToNPCQuest(RoadsideMotelAnabel3, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel3);

        const MinaBattle = new CustomQuest(
            1,
            undefined,
            'Defeat Trial Captain Mina at the Roadside Motel.',
            () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Captain Mina UB')](),
            0
        );
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
            ], 'Rare Ultra Beasts have been spotted! Kartana at Malie Garden and Route 17, and Celesteela at Malie Garden and Haina Desert!', ultraBeastReward));

        const talkToNanu2 = new TalkToNPCQuest(RoadsideMotelNanu2, 'Talk to Kahuna Nanu at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToNanu2);

        const NanuBattle = new CustomQuest(
            1,
            undefined,
            'Defeat Kahuna Nanu at the Roadside Motel.',
            () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Kahuna Nanu UB')](),
            0
        );
        UltraBeastQuestLine.addQuest(NanuBattle);

        const talkToAnabel4 = new TalkToNPCQuest(RoadsideMotelAnabel4, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel4);

        UltraBeastQuestLine.addQuest(new MultipleQuestsQuest(
            [
                createUltraBeastQuest('Blacephalon', undefined, 5),
                createUltraBeastQuest('Stakataka', undefined, 5),
            ], 'Rare Ultra Beasts have been spotted! Blacephalon and Stakataka are both at Poni Grove!', ultraBeastReward));

        const talkToAnabel5 = new TalkToNPCQuest(RoadsideMotelAnabel5, 'Talk to Anabel at the Roadside Motel.');
        UltraBeastQuestLine.addQuest(talkToAnabel5);

        const GuzzlordReward = () => {
            Notifier.notify({ message: 'You caught all the Ultra Beasts!', type: NotificationConstants.NotificationOption.success });
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Beastball,50,false);
        };

        const GuzzlordCatch = new CaptureSpecificPokemonQuest(
            'Guzzlord',
            'Catch Guzzlord at Resolution Cave.',
            1,
            false,
            GuzzlordReward,
            undefined
        );

        UltraBeastQuestLine.addQuest(GuzzlordCatch);

        App.game.quests.questLines().push(UltraBeastQuestLine);
    }

    public static createDarkestDayQuestLine() {
        const darkestDayQuestLine = new QuestLine('The Darkest Day', 'Stop the return of the Darkest Day!');

        const clearHop7 = new CustomQuest(1, 0, 'Learn more about the heroes who stopped the Darkest Day, and have a battle with Hop.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Hop7')]());
        darkestDayQuestLine.addQuest(clearHop7);

        const clearHammerlockeGym = new CustomQuest(1, 0, 'Defeat Raihan to gain the last badge of Galar and gain entry to the Champion Cup.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Hammerlocke')]());
        darkestDayQuestLine.addQuest(clearHammerlockeGym);

        const clearTrainerMarnie = new CustomQuest(1, 0, 'Defeat Marnie to reach the quarter-finals of the Champion Cup.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Trainer Marnie')]());
        darkestDayQuestLine.addQuest(clearTrainerMarnie);

        const clearGymLeaderBede = new CustomQuest(1, 0, 'Defeat Bede to reach the semi-finals of the Champion Cup.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Gym Leader Bede')]());
        darkestDayQuestLine.addQuest(clearGymLeaderBede);

        const clearTrainerHop = new CustomQuest(1, 0, 'Defeat Hop to reach the final of the Champion Cup!', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Trainer Hop')]());
        darkestDayQuestLine.addQuest(clearTrainerHop);

        const clearRoseTower = new CustomQuest(1, 0, 'Champion Leon was seen heading to Rose Tower. Ascend Rose Tower so you can find him.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Rose Tower')]());
        darkestDayQuestLine.addQuest(clearRoseTower);

        const clearEnergyPlant = new CustomQuest(1, 0, 'Chairman Rose has interrupted your fight with Leon and brought about the Darkest Day. Go to the Energy Plant in Hammerlocke to put an end to his plans!', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Energy Plant')]());
        darkestDayQuestLine.addQuest(clearEnergyPlant);

        const clearEternatus = new CustomQuest(1, 0, 'Leon failed to capture Eternatus. Defeat it before it can cause any more damage!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Eternatus')]());
        darkestDayQuestLine.addQuest(clearEternatus);

        const TheDarkestDayReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: darkestDayQuestLine.name,
                message: 'You found a Masterball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearTheDarkestDay = new CustomQuest(1, TheDarkestDayReward, 'Eternatus has ascended to its Eternamax form! Catch it to put an end to the Darkest Day!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('The Darkest Day')]());
        darkestDayQuestLine.addQuest(clearTheDarkestDay);

        App.game.quests.questLines().push(darkestDayQuestLine);
    }

    public static createSwordShieldQuestLine() {
        const swordShieldQuestLine = new QuestLine('Sword and Shield', 'Stop the weapons from making a mess.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Galar);

        const clearHop8 = new CustomQuest(1, 0, 'Hop wants to fight you one more time at Slumbering Weald Shrine.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Hop8')]());
        swordShieldQuestLine.addQuest(clearHop8);

        const clearSordward1 = new CustomQuest(1, 0, 'Defeat Sordward.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sordward1')]());
        const clearShielbert1 = new CustomQuest(1, 0, 'Defeat Shielbert.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Shielbert1')]());
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSordward1,
                clearShielbert1,
            ], 'A pair with weird hair has taken the Rusted Sword and Rusted Shield. Defeat them to take them back.'));

        const clearRampagingTsareena = new CustomQuest(1, 0, 'Sordward and Shielbert are forcing Pokémon to rampage in Galar\'s Stadiums. First is a Tsareena in Turffield Stadium. Defeat it.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Tsareena')]());
        swordShieldQuestLine.addQuest(clearRampagingTsareena);

        const clearRampagingGyarados = new CustomQuest(1, 0, 'Sordward and Shielbert have forced a Gyarados to rampage in Hulbury Stadium. Defeat it as well.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Gyarados')]());
        swordShieldQuestLine.addQuest(clearRampagingGyarados);

        const clearRampagingTorkoal = new CustomQuest(1, 0, 'Sordward and Shielbert have forced a Torkoal to rampage in Motostoke Stadium. Defeat it as well.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Torkoal')]());
        swordShieldQuestLine.addQuest(clearRampagingTorkoal);

        const clearSordwardandShielbert = new CustomQuest(1, 0, 'Sordward and Shielbert are trying to steal the Wishing Stars at Professor Magnolia\'s Lab in Wedgehurst. Stop them.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sordward & Shielbert')]());
        swordShieldQuestLine.addQuest(clearSordwardandShielbert);

        const clearRampagingConkeldurr = new CustomQuest(1, 0, 'Defeat Conkeldurr.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Conkeldurr')]());
        const clearRampagingDusknoir = new CustomQuest(1, 0, 'Defeat Dusknoir.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Dusknoir')]());
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingConkeldurr,
                clearRampagingDusknoir,
            ], 'Sordward and Shielbert have forced a Conkeldurr and a Dusknoir to rampage in Stow-on-Side Stadium. Defeat them both'));

        const clearGymLeaderBede2 = new CustomQuest(1, 0, 'There were rampaging Pokémon at Ballonlea Stadium but Bede already defeated them. There are no more rampaging Pokémon for now, and he wants to battle.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Gym Leader Bede')]());
        swordShieldQuestLine.addQuest(clearGymLeaderBede2);

        const clearRampagingGigalith = new CustomQuest(1, 0, 'Defeat Gigalith.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Gigalith')]());
        const clearRampagingFroslass = new CustomQuest(1, 0, 'Defeat Froslass.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Froslass')]());
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingGigalith,
                clearRampagingFroslass,
            ], 'Sordward and Shielbert have forced a Gigalith and a Froslass to rampage in Circhester Stadium. Defeat them both'));

        const clearGymLeaderMarnie = new CustomQuest(1, 0, 'There are no more rampaging Pokémon for now, and Marnie wants to battle you in Spikemuth.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Gym Leader Marnie')]());
        swordShieldQuestLine.addQuest(clearGymLeaderMarnie);

        const clearRampagingHaxorus = new CustomQuest(1, 0, 'Sordward and Shielbert have forced a Haxorus to rampage in Hammerlocke Stadium. Hopefully this is the last one.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Haxorus')]());
        swordShieldQuestLine.addQuest(clearRampagingHaxorus);

        const clearSordward2 = new CustomQuest(1, 0, 'Defeat Sordward.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Sordward2')]());
        const clearShielbert2 = new CustomQuest(1, 0, 'Defeat Shielbert.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Shielbert2')]());
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSordward2,
                clearShielbert2,
            ], 'Sordward and Shielbert are trying to use the Rusted Sword and Shield to make Zacian and Zamazenta go on a rampage in Energy Plant. Stop them.'));

        const clearRampagingZacian = new CustomQuest(1, 0, 'Defeat Zacian.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Zacian')]());
        const clearRampagingZamazenta = new CustomQuest(1, 0, 'Defeat Zamazenta.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Rampaging Zamazenta')]());
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRampagingZacian,
                clearRampagingZamazenta,
            ], 'Zacian and Zamazenta are rampaging in Energy Plant. Defeat them!'));

        const catchZacian = new CustomQuest(1, 0, 'Catch Zacian.', () => App.game.statistics.pokemonCaptured[pokemonMap['Zacian (Battle Hero)'].id](), 0);
        const catchZamazenta = new CustomQuest(1, 0, 'Catch Zamazenta.', () => App.game.statistics.pokemonCaptured[pokemonMap['Zamazenta (Battle Hero)'].id](), 0);
        swordShieldQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchZacian,
                catchZamazenta,
            ], 'Now that they have calmed down, Zacian and Zamazenta seem to be willing to let you try to catch them!'));

        App.game.quests.questLines().push(swordShieldQuestLine);
    }

    public static createDojoArmorQuestLine() {
        const dojoArmorQuestLine = new QuestLine('The Dojo\'s Armor', 'Obtain the Secret Armor of the Master Dojo.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Armor);

        const clearMustard = new CustomQuest(1, 0, 'Mustard wants to test your ability at the Master Dojo. Defeat him.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Mustard')]());
        dojoArmorQuestLine.addQuest(clearMustard);

        const catch3GalarianSlowpoke = new CaptureSpecificPokemonQuest('Galarian Slowpoke', 'Catch 3 Galarian Slowpoke.', 3, false, 0, undefined);
        dojoArmorQuestLine.addQuest(catch3GalarianSlowpoke);

        const clearKlara2 = new CustomQuest(1, 0, 'Defeat Klara.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Klara2')]());
        const clearAvery2 = new CustomQuest(1, 0, 'Defeat Avery.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Avery2')]());
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearKlara2,
                clearAvery2,
            ], 'You, Klara and Avery have happened upon the same Max Mushroom in Warm-Up Tunnel. Defeat them both to win it.'));

        const KubfuReward = () => {
            App.game.party.gainPokemonById(891);
            Notifier.notify({
                title: dojoArmorQuestLine.name,
                message: 'You obtained Kubfu!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearKlara3 = new CustomQuest(1, 0, 'Defeat Klara.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Klara3')]());
        const clearAvery3 = new CustomQuest(1, 0, 'Defeat Avery', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Avery3')]());
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearKlara3,
                clearAvery3,
            ], 'For the final trial, you must defeat both Klara and Avery at the Master Dojo Battlefield.', KubfuReward));

        const clearTowerofDarkness = new CustomQuest(1, 0, 'Defeat Tower of Darkness.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Tower of Darkness')]());
        const clearTowerofWaters = new CustomQuest(1, 0, 'Defeat Tower of Waters', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Tower of Waters')]());
        dojoArmorQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearTowerofDarkness,
                clearTowerofWaters,
            ], 'Train Kubfu in the Tower of Darkness and the Tower of Waters so it can evolve!'));

        App.game.quests.questLines().push(dojoArmorQuestLine);
    }

    public static createGalarCrownQuestLine() {
        const galarCrownQuestLine = new QuestLine('The Crown of Galar', 'Help the ancient king of Galar, Calyrex, return to its former glory.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoCrownPeony1 = new TalkToNPCQuest(CrownPeony1, 'Talk to Peony to find out about the ancient king of Galar.');
        galarCrownQuestLine.addQuest(talktoCrownPeony1);

        const clearCalyrex = new CustomQuest(1, 0, 'A mysterious Pokémon has appeared and challenged you to a battle.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Calyrex')]());
        galarCrownQuestLine.addQuest(clearCalyrex);

        const talktoCalyrex1 = new TalkToNPCQuest(Calyrex1, 'The Pokémon you just fought has posessed Peony. Talk to it.');
        galarCrownQuestLine.addQuest(talktoCalyrex1);

        const oldCemetery = new CustomQuest(30, 0, 'Old Cemetery.', () => App.game.statistics.routeKills[GameConstants.Region.galar]['49'](), 0);
        const snowslideSlope = new CustomQuest(30, 0, 'Snowslide Slope.', () => App.game.statistics.routeKills[GameConstants.Region.galar]['54'](), 0);
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                oldCemetery,
                snowslideSlope,
            ], 'Calyrex is going to Old Cemetery and Snowslide Slope to grow a Shaderoot Carrot and an Iceroot Carrot. Protect it from wild Pokémon so it can concentrate.'));

        const talktoCalyrex2 = new TalkToNPCQuest(Calyrex2, 'After growing both carrots, Calyrex has returned to Freezington. Talk to it.');
        galarCrownQuestLine.addQuest(talktoCalyrex2);

        const clearSpectrier = new CustomQuest(1, 0, 'Defeat Spectrier.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Spectrier')]());
        const clearGlastrier = new CustomQuest(1, 0, 'Defeat Glastrier.', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Glastrier')]());
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearSpectrier,
                clearGlastrier,
            ], 'Fight Calyrex\'s steeds to get them out of Freezington!'));

        const talktoCalyrex3 = new TalkToNPCQuest(Calyrex3, 'Talk to Calyrex again.');
        galarCrownQuestLine.addQuest(talktoCalyrex3);

        const catchSpectrier = new CaptureSpecificPokemonQuest('Spectrier', 'Catch Spectrier.', 1, false, 0, undefined);
        const catchGlastrier = new CaptureSpecificPokemonQuest('Glastrier', 'Catch Glastrier.', 1, false, 0, undefined);
        galarCrownQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchSpectrier,
                catchGlastrier,
            ], 'Spectrier and Glastrier are now roaming the Crown Tundra. Catch them when the opportunity arises!'));

        const talktoCalyrex4 = new TalkToNPCQuest(Calyrex4, 'Now that you have captured both of its steeds, talk to Calyrex at the Crown Shrine.');
        galarCrownQuestLine.addQuest(talktoCalyrex4);

        const catchCalyrex = new CaptureSpecificPokemonQuest('Calyrex', 'Now that you have found and caught Glastrier and Spectrier, Calyrex wants to challenge you at Crown Shrine. Catch it!', 1, false, 0, undefined);
        galarCrownQuestLine.addQuest(catchCalyrex);

        const talktoCrownPeony2 = new TalkToNPCQuest(CrownPeony2, 'Now that you have captured Calyrex, go report back to Peony!');
        galarCrownQuestLine.addQuest(talktoCrownPeony2);

        App.game.quests.questLines().push(galarCrownQuestLine);
    }

    public static createDynaTreeBirdsQuestLine() {
        const dynaTreeBirdsQuestLine = new QuestLine('The Birds of the Dyna Tree', 'Find the Legendary birds of the Dyna Tree.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoBirdPeony1 = new TalkToNPCQuest(BirdPeony1, 'Talk to Peony to find out about some legendary bird sightings.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony1);

        const clearDynaTreeHill = new CustomQuest(1, 0, 'Some unknown bird Pokémon have been sighted near Dyna Tree Hill in Ballimere Lake. Explore the area to see for yourself.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Dyna Tree Hill')]());
        dynaTreeBirdsQuestLine.addQuest(clearDynaTreeHill);

        const clearDynaTreeBirds = new CustomQuest(1, 0, 'You witnessed 3 powerful looking bird pokemon resembling Articuno, Zapdos and Moltres fighting over the fruit of the Dyna Tree. Upon noticing you, they attack!', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Dyna Tree Birds')]());
        dynaTreeBirdsQuestLine.addQuest(clearDynaTreeBirds);

        const talktoBirdPeony2 = new TalkToNPCQuest(BirdPeony2, 'Tell Peony about your encounter with the birds resembling Articuno, Zapdos and Moltres.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony2);

        const catchGalarianArticuno = new CaptureSpecificPokemonQuest('Galarian Articuno', 'Catch Galarian Articuno.', 1, false, 0, undefined);
        const catchGalarianZapdos = new CaptureSpecificPokemonQuest('Galarian Zapdos', 'Catch Galarian Zapdos.', 1, false, 0, undefined);
        const catchGalarianMoltres = new CaptureSpecificPokemonQuest('Galarian Moltres', 'Catch Galarian Moltres.', 1, false, 0, undefined);
        dynaTreeBirdsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchGalarianArticuno,
                catchGalarianZapdos,
                catchGalarianMoltres,
            ], 'The Galarian forms of Articuno, Zapdos and Moltres are roaming in the Crown Tundra, Southern Galar and the Isle of Armor respectively. Catch them when the opportunity arises!'));

        const talktoBirdPeony3 = new TalkToNPCQuest(BirdPeony3, 'Now that you have captured Galarian Articuno, Zapdos and Moltres, go report back to Peony!.');
        dynaTreeBirdsQuestLine.addQuest(talktoBirdPeony3);

        App.game.quests.questLines().push(dynaTreeBirdsQuestLine);
    }

    public static createAncientGolemsQuestLine() {
        const ancientGolemsQuestLine = new QuestLine('The Ancient Golems', 'Discover the ancient Golems in the ruins of the Crown Tundra.', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion), GameConstants.BulletinBoards.Crown);

        const talktoGolemPeony1 = new TalkToNPCQuest(GolemPeony1, 'Talk to Peony to find out about some ancient ruins.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony1);

        const threePointPass = new CustomQuest(25, 0, 'Peony told you of a peculiar ruin located at Three-Point Pass. Explore the area to find it.', () => App.game.statistics.routeKills[GameConstants.Region.galar]['52'](), 0);
        ancientGolemsQuestLine.addQuest(threePointPass);

        const talktoGolemPeony2 = new TalkToNPCQuest(GolemPeony2, 'The ruins were locked, go report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony2);

        const clearRockPeakRuins = new CustomQuest(10, 0, 'Clear Rock Peak Ruins 10 times.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Rock Peak Ruins')]());
        const clearIcebergRuins = new CustomQuest(10, 0, 'Clear Iceberg Ruins 10 times.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Iceberg Ruins')]());
        const clearIronRuins = new CustomQuest(10, 0, 'Clear Iron Ruins 10 times.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Iron Ruins')]());
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearRockPeakRuins,
                clearIcebergRuins,
                clearIronRuins,
            ], 'Clear Rock Peak Ruins, Iceberg Ruins and Iron ruins 10 times each.'));

        const talktoGolemPeony3 = new TalkToNPCQuest(GolemPeony3, 'The ruins are still locked, report to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony3);

        const catchRegirock = new CaptureSpecificPokemonQuest('Regirock', 'Catch Regirock.', 1, false, 0, undefined);
        const catchRegice = new CaptureSpecificPokemonQuest('Regice', 'Catch Regice.', 1, false, 0, undefined);
        const catchRegisteel = new CaptureSpecificPokemonQuest('Registeel', 'Catch Registeel.', 1, false, 0, undefined);
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRegirock,
                catchRegice,
                catchRegisteel,
            ], 'Catch Regirock, Regice and Registeel in the Rock Peak Ruins, Iceberg Ruins and Iron Ruins respectively'));

        const catchRegieleki = new CaptureSpecificPokemonQuest('Regieleki', 'Catch Regieleki.', 1, false, 0, undefined);
        const catchRegidrago = new CaptureSpecificPokemonQuest('Regidrago', 'Catch Regidrago.', 1, false, 0, undefined);
        ancientGolemsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchRegieleki,
                catchRegidrago,
            ], 'Now that it has finally unlocked, catch Regieleki and Regidrago in the Split-Decision Ruins!'));

        const talktoGolemPeony5 = new TalkToNPCQuest(GolemPeony5, 'Now that you have captured Regieleki and Regidrago, go report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony5);

        const clearRegigigas = new CustomQuest(1, 0, 'Now that you have caught all of the legendary golems it created, Regigigas has appeared in Giants Bed. Defeat it!,', () => App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Regigigas')]());
        ancientGolemsQuestLine.addQuest(clearRegigigas);

        const talktoGolemPeony6 = new TalkToNPCQuest(GolemPeony6, 'Now that you have beaten Regigigas, report back to Peony.');
        ancientGolemsQuestLine.addQuest(talktoGolemPeony6);

        App.game.quests.questLines().push(ancientGolemsQuestLine);
    }

    // Event QuestLines
    public static createFindSurpriseTogepiForEasterQuestLine() {
        const findSurpriseTogepiForEasterQuestLine = new QuestLine('Togepi Egg Hunt', 'A strange Togepi has been spotted, but cannot be found!');

        const surpriseTogepi = pokemonMap['Surprise Togepi'];

        const togepiInKantoSetup = () => {
            dungeonList['Viridian Forest'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Surprise Togepi', 300000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion) }));
            App.game.statistics.pokemonDefeated[surpriseTogepi.id](0);
        };
        const afterDefeatingTogepiInKanto = () => {
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'Seems like this was just an Easter egg after all...',
                image: `assets/images/profile/trainer-${App.game.profile.trainer() || 0}.png`,
                type: NotificationConstants.NotificationOption.info,
                timeout: 3e4,
            });

            dungeonList['Viridian Forest'].bossList = dungeonList['Viridian Forest'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const defeatTogepiInKanto = new CustomQuest(1, afterDefeatingTogepiInKanto, 'A strange Togepi has been seen around Kanto. Go look for it! Maybe Erika knows more.', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 0, togepiInKantoSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(defeatTogepiInKanto);

        const togepiInJohtoSetup = () => {
            dungeonList['Ilex Forest'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Surprise Togepi', 900000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion) }));
        };
        const afterDefeatingTogepiInJohto = () => {
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'I swear that was a Togepi... well, maybe not.',
                image: `assets/images/profile/trainer-${App.game.profile.trainer() || 0}.png`,
                type: NotificationConstants.NotificationOption.info,
                timeout: 3e4,
            });
            dungeonList['Ilex Forest'].bossList = dungeonList['Ilex Forest'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const encounterSurpriseTogepiInJohto = new CustomQuest(1, afterDefeatingTogepiInJohto, 'Another report just came in, stating that they saw a strange egg boarding the ferry to Johto!', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 1, togepiInJohtoSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(encounterSurpriseTogepiInJohto);

        const togepiInHoennSetup = () => {
            dungeonList['Petalburg Woods'].bossList.push(new DungeonTrainer('Egg Hunter', [new GymPokemon('Surprise Togepi', 2700000, 100)], { weight: 1, requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion) }));
        };
        const afterDefeatingTogepiInHoenn = () => {
            App.game.party.gainPokemonById(surpriseTogepi.id);
            Notifier.notify({
                title: findSurpriseTogepiForEasterQuestLine.name,
                message: 'You found the special Togepi!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
            dungeonList['Petalburg Woods'].bossList = dungeonList['Petalburg Woods'].bossList.filter(boss => boss.name != 'Egg Hunter');
        };
        const encounterTogepiInHoenn = new CustomQuest(1, afterDefeatingTogepiInHoenn, 'There is a big Egg Hunt going on in Petalburg Woods right now; maybe you should take a look?', App.game.statistics.pokemonDefeated[surpriseTogepi.id], 2, togepiInHoennSetup);
        findSurpriseTogepiForEasterQuestLine.addQuest(encounterTogepiInHoenn);

        App.game.quests.questLines().push(findSurpriseTogepiForEasterQuestLine);
    }

    public static createHoopaDayPikabluQuestLine() {
        const hoopaDayPikabluQuestLine = new QuestLine('How blu mouse?', 'Apparently a strange blue mouse-like Pokémon might be out there somewhere?');

        const PikabluCatch = new CaptureSpecificPokemonQuest(
            'Marill',
            'Catch Pikablu.',
            1,
            false,
            5000,
            undefined
        );

        hoopaDayPikabluQuestLine.addQuest(PikabluCatch);

        App.game.quests.questLines().push(hoopaDayPikabluQuestLine);
    }

    public static isQuestLineCompleted(name: string) {
        return App.game.quests.getQuestLine(name)?.state() == QuestLineState.ended;
    }


    public static loadQuestLines() {
        this.createTutorial();
        this.createRocketKantoQuestLine();
        this.createUndergroundQuestLine();
        this.createBillSeviiQuestLine();
        this.createPersonsofInterestQuestLine();
        this.createRocketJohtoQuestLine();
        this.createCelebiJohtoQuestLine();
        this.createAquaMagmaHoennQuestLine();
        this.createDeoxysQuestLine();
        this.createRubySapphireSeviiQuestLine();
        this.createPinkanThemeparkQuestLine();
        this.createGalacticSinnohQuestLine();
        this.createPlasmaUnovaQuestLine();
        this.createDetectivePikachuQuestLine();
        this.createVivillonQuestLine();
        this.createAshKetchumQuestLine();
        this.createSkullAetherAlolaQuestLine();
        this.createMinasTrialAlolaQuestLine();
        this.createUltraBeastQuestLine();
        this.createDarkestDayQuestLine();
        this.createSwordShieldQuestLine();
        this.createDojoArmorQuestLine();
        this.createGalarCrownQuestLine();
        this.createDynaTreeBirdsQuestLine();
        this.createAncientGolemsQuestLine();
        this.createFindSurpriseTogepiForEasterQuestLine();
        this.createHoopaDayPikabluQuestLine();
    }
}
