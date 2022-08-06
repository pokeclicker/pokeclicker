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

        const clearOpelucidGym = new CustomQuest(1, 0, 'Defeat the Opelucid City gym leader to obtain the DNA Splicers', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Opelucid City')]());
        plasmaUnovaQuestLine.addQuest(clearOpelucidGym);

        const clearTeamPlasmaAssault = new CustomQuest(1, 0, 'Zinzolin has stolen the DNA Splicers and is assaulting the city with his army of grunts and shadows! Defend against the Team Plasma Assault in Opelucid City!', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Team Plasma Assault')]());
        plasmaUnovaQuestLine.addQuest(clearTeamPlasmaAssault);

        const clearPlasmaFrigate = new CustomQuest(1, 0, 'Zinzolin has fled the scene with the stolen DNA Splicers. Find and clear out the Plasma Frigate.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Plasma Frigate')]());
        plasmaUnovaQuestLine.addQuest(clearPlasmaFrigate);

        const giantChasmReward = () => {
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Masterball, 1, false);
            Notifier.notify({
                title: plasmaUnovaQuestLine.name,
                message: 'You found a Master Ball!',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };

        const clearGiantChasm = new CustomQuest(1, giantChasmReward, 'Team Plasma\'s leader Ghetsis plans on using the DNA Splicers on Kyurem in Giant Chasm. Clear the dungeon to end his evil plans.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Giant Chasm')]());
        plasmaUnovaQuestLine.addQuest(clearGiantChasm);

        App.game.quests.questLines().push(plasmaUnovaQuestLine);
    }

    // Kalos QuestLines
    public static createVivillonQuestLine() {
        const vivillonQuestLine = new QuestLine('The Great Vivillon Hunt!', 'Discover the beauty of Vivillon.');

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
        const ashKetchumQuestLine = new QuestLine('The New Kid', 'A new kid from your home town is making waves. Show him who the real prodigy of Pallet Town is.');

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

    public static createPrimalsQuestLine() {
        const primalsQuestLine = new QuestLine('The Missing Primals', 'The scientists at the Delta Weather Institute need help.');

        const talkToWeatherScientist1 = new TalkToNPCQuest(WeatherInstituteScientist1, 'Talk to the Weather Scientist at the Delta Weather Institute.');
        primalsQuestLine.addQuest(talkToWeatherScientist1);

        const talkToSootopolisGentleman = new TalkToNPCQuest(DeltaSootopolisGentleman, 'Investigate the disappearance of Kyogre and Groudon in Delta Sootopolis City.');
        primalsQuestLine.addQuest(talkToSootopolisGentleman);

        const talkToWeatherScientist2 = new TalkToNPCQuest(WeatherInstituteScientist2, 'Report your findings to the Delta Weather Institute.');
        primalsQuestLine.addQuest(talkToWeatherScientist2);

        const catchExploud = new CaptureSpecificPokemonQuest(
            'Exploud',
            'Catch Exploud.',
            1,
            false
        );

        const clearCaveofOrigin = new CustomQuest(5, 0, 'Clear Delta Cave of Origin', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Delta Cave of Origin')]());

        primalsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchExploud,
                clearCaveofOrigin,
            ], 'Clear Delta Cave of Origin five times and catch Exploud.'));

        const talkToWeatherScientist3 = new TalkToNPCQuest(WeatherInstituteScientist3, 'Bring Exploud to the Delta Weather Institute.');
        primalsQuestLine.addQuest(talkToWeatherScientist3);

        const CatchCastform = new CaptureSpecificPokemonQuest(
            'Castform',
            'Catch some Castform.',
            5,
            false
        );

        primalsQuestLine.addQuest(CatchCastform);

        const talkToWeatherScientist4 = new TalkToNPCQuest(WeatherInstituteScientist4, 'Bring the Castform to the Delta Weather Institute.');
        primalsQuestLine.addQuest(talkToWeatherScientist4);

        const catchWater = new CustomQuest(100, 0, 'Capture 100 Water-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Water)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });

        const catchGround = new CustomQuest(100, 0, 'Capture 100 Ground-type Pokémon.', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Ground)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });

        primalsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                catchWater,
                catchGround,
            ], 'Catch 100 Water-type and 100 Ground-type Pokémon.'));

        const talkToWeatherScientist5 = new TalkToNPCQuest(WeatherInstituteScientist5, 'Check in at the Delta Weather Institute.');
        primalsQuestLine.addQuest(talkToWeatherScientist5);

        const clearTerraCave = new CustomQuest(1, 0, 'Clear Terra Cave.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Terra Cave')]());

        const clearMarineCave = new CustomQuest(1, 0, 'Clear Marine Cave.', () => App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Marine Cave')]());

        primalsQuestLine.addQuest(new MultipleQuestsQuest(
            [
                clearTerraCave,
                clearMarineCave,
            ], 'Clear Terra Cave and Marine Cave.'));

        App.game.quests.questLines().push(primalsQuestLine);
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
        const UltraBeastQuestLine = new QuestLine('Ultra Beast Hunt', 'Track down the mysterious Ultra Beasts');

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
        this.createAquaMagmaHoennQuestLine();
        this.createDeoxysQuestLine();
        this.createGalacticSinnohQuestLine();
        this.createPlasmaUnovaQuestLine();
        this.createVivillonQuestLine();
        this.createAshKetchumQuestLine();
        this.createPrimalsQuestLine();
        this.createSkullAetherAlolaQuestLine();
        this.createMinasTrialAlolaQuestLine();
        this.createUltraBeastQuestLine();
        this.createFindSurpriseTogepiForEasterQuestLine();
        this.createHoopaDayPikabluQuestLine();
    }
}
