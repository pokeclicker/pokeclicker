/**
 * Static class used to handle Quest Lines
 */
class QuestLineHelper {

    public static createTutorial() {
        const tutorial = new QuestLine('Tutorial Quests', 'A short set of quests to get you going');

        //Defeat Starter
        const defeatStarter = new CapturePokemonsQuest(1, 10);
        //Capture pokemon because start sequence resets route 1 kills to 0, making this quest think it is incomplete
        defeatStarter.customDescription = 'Defeat the Pokémon. Click to deal damage';
        tutorial.addQuest(defeatStarter);

        //Capture 1 pokemon
        const captureOne = new CapturePokemonsQuest(1, 20);
        captureOne.customDescription = 'Capture 1 Pokémon. When you defeat a Pokémon, a Pokéball is thrown and you have a chance to capture it.';
        tutorial.addQuest(captureOne);

        //Kill 5 on route 2
        const routeTwo = new DefeatPokemonsQuest(10, 20, 2, GameConstants.Region.kanto);
        routeTwo.customDescription = 'Defeat 10 Pokémon on route 2. Click route 2 on the map to move there and begin fighting.';
        tutorial.addQuest(routeTwo);

        //Buy pokeballs
        const buyPokeballs = new BuyPokeballsQuest(10, 50, GameConstants.Pokeball.Pokeball);
        buyPokeballs.customDescription = 'Buy 10 Pokéballs. You can find these in the Viridian City Shop.';
        tutorial.addQuest(buyPokeballs);

        //Buy Dungeon ticket
        const buyDungeonTicket = new CustomQuest(1, 50, 'Buy the Dungeon ticket from Viridian City Shop.', () => +App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Dungeon_ticket), 0);
        tutorial.addQuest(buyDungeonTicket);

        //Clear Viridian Forest
        const clearViridianForest = new DefeatDungeonQuest(1, 50, 'Viridian Forest');
        clearViridianForest.customDescription = 'Gather 50 Dungeon tokens by (re)capturing Pokémon, then clear the Viridian Forest dungeon.';
        tutorial.addQuest(clearViridianForest);

        //Defeat Pewter Gym
        const pewterReward = () => {
            Notifier.notify({ message: 'Tutorial completed!', type: NotificationConstants.NotificationOption.success });
            Information.show({
                steps: [
                    {
                        element: document.getElementById('questDisplayContainer'),
                        intro: 'Click "List" to see the current quests that can be completed for <img title="Quest points" src="assets/images/currency/questPoint.svg" height="25px"> Quest Points.',
                    },
                    {
                        element: document.getElementById('startMenu'),
                        intro: 'See the badges you\'ve earned in the Badge Case. Badges influence the max level of your Pokémon.',
                    },
                ],
            });
        };
        const pewter = new CustomQuest(1, pewterReward, 'Defeat Pewter City Gym. Click the town on the map to move there, then click the Gym button to start the battle.', () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pewter City')](), 0);
        tutorial.addQuest(pewter);

        App.game.quests.questLines().push(tutorial);
    }

    public static createDeoxysQuestLine() {
        const deoxysQuestLine = new QuestLine('Mystery of Deoxys', 'Discover the mystery of Deoxys');

        // Defeat 50 Pokemon on route 129
        const route129 = new DefeatPokemonsQuest(50, 0, 129, GameConstants.Region.hoenn);
        deoxysQuestLine.addQuest(route129);

        // Defeat 500 Psychic type Pokemon
        const psychicShardReward = () => {
            App.game.shards.gainShards(500, PokemonType.Psychic);
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'You have gained 500 Psychic shards',
                type: NotificationConstants.NotificationOption.success,
            });
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
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: `You have gained 20 ${mindPlate.name}s`,
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchPsychic = new CustomQuest(200, mindPlateReward, 'Capture 200 Psychic type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Psychic)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
        deoxysQuestLine.addQuest(catchPsychic);

        // Reach stage 100 in battle frontier
        const reachStage100Reward = () => {
            Notifier.notify({
                title: deoxysQuestLine.name,
                message: 'Quest line completed!<br/><i>You have uncovered the Mystery of Deoxys</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: 3e4,
            });
        };
        const reachStage100 = new CustomQuest(100, reachStage100Reward, 'Defeat stage 100 in the Battle Frontier', App.game.statistics.battleFrontierHighestStageCompleted, 0);
        deoxysQuestLine.addQuest(reachStage100);

        App.game.quests.questLines().push(deoxysQuestLine);
    }

    public static createUndergroundQuestLine() {
        const undergroundQuestLine = new QuestLine('Mining Expedition', 'Explore the underground');

        //Buy Explorer Kit (no reward)
        const buyExplorerKit = new CustomQuest(1, () => {}, 'Buy the Explorer Kit from Cinnabar Island Shop', () => +App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Explorer_kit), 0);
        undergroundQuestLine.addQuest(buyExplorerKit);

        // Mine 5 layers in the Unerground
        const OldAmberReward = () => {
            // Gain an Old Amber
            const oldAmber = UndergroundItem.list.find(item => item.name == 'Old Amber');
            if (!oldAmber) {
                return console.error('Unable to find item Old Amber');
            }
            Underground.gainMineItem(oldAmber.id);
            Notifier.notify({
                title: undergroundQuestLine.name,
                message: 'You have gained an Old Amber fossil!<br/><i>You can breed this in the hatchery.</i>',
                type: NotificationConstants.NotificationOption.success,
                timeout: GameConstants.MINUTE,
            });
        };
        const mineLayers = new CustomQuest(5, OldAmberReward, 'Mine 5 layers in the Underground', App.game.statistics.undergroundLayersMined);
        undergroundQuestLine.addQuest(mineLayers);

        App.game.quests.questLines().push(undergroundQuestLine);
    }

    public static createVivillonQuestLine() {
        const VivillonQuestLine = new QuestLine('The Great Vivillon Hunt!', 'Discover the beauty of Vivillon');

        const createVivillonQuest = (type: PokemonType, vivillon: PokemonNameType, dungeons: Array<string>, hint: string) => {
            // Capture 100 Water type Pokemon
            const catchType = new CustomQuest(100, undefined, `Capture 100 ${PokemonType[type]} type Pokémon`, () => {
                return pokemonMap.filter(p => p.type.includes(type)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
            });
            VivillonQuestLine.addQuest(catchType);

            // Capture Vivillon in a dungeon
            const vivillonAdd = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList.push(new DungeonBossPokemon(vivillon, 93659450, 80));
                });
                Notifier.notify({
                    title: VivillonQuestLine.name,
                    message: `A Vivillon is hiding somewhere.\n${hint}`,
                    type: NotificationConstants.NotificationOption.info,
                });
            };
            const vivillonRemove = () => {
                dungeons.forEach(dungeon => {
                    dungeonList[dungeon].bossList = dungeonList[dungeon].bossList.filter(boss => boss.name != vivillon);
                });
                Notifier.notify({
                    title: VivillonQuestLine.name,
                    message: `You caught the rare ${vivillon}`,
                    type: NotificationConstants.NotificationOption.success,
                });
            };
            const catchVivillon = new CustomQuest(
                1,
                vivillonRemove,
                `Find and capture the rare Vivillon!\nHint: ${hint}.`,
                App.game.statistics.pokemonCaptured[pokemonMap[vivillon].id],
                undefined,
                vivillonAdd
            );
            VivillonQuestLine.addQuest(catchVivillon);
        };

        createVivillonQuest(PokemonType.Water, 'Vivillon (Marine)', ['Lake Verity', 'Lake Valor', 'Lake Acuity'], 'It has been spotted at some Lakes.');
        createVivillonQuest(PokemonType.Psychic, 'Vivillon (Modern)', ['Cerulean Cave'], 'It\'s surrounded by strong Pokémon.');
        createVivillonQuest(PokemonType.Poison, 'Vivillon (Jungle)', ['Moor of Icirrus'], 'It has been spotted in a swamp.');
        createVivillonQuest(PokemonType.Dark, 'Vivillon (Monsoon)', ['Dark Cave'], 'It\'s hiding at a dark place.');
        createVivillonQuest(PokemonType.Steel, 'Vivillon (Tundra)', ['Pokéball Factory'], 'It flew into a factory.');
        createVivillonQuest(PokemonType.Fire, 'Vivillon (Sun)', ['Mt. Chimney'], 'It seems to like hot places.');
        createVivillonQuest(PokemonType.Fighting, 'Vivillon (Archipelago)', ['Sprout Tower'], 'It\'s sitting on a swaying pillar.');
        createVivillonQuest(PokemonType.Ghost, 'Vivillon (Elegant)', ['Lost Hotel'], 'It\'s visiting an abandoned and spooky place.');
        createVivillonQuest(PokemonType.Fairy, 'Vivillon (Ocean)', ['Dreamyard'], 'It\'s flying around an overgrown place full of dreams.');
        createVivillonQuest(PokemonType.Electric, 'Vivillon (Continental)', ['New Mauville'], 'It\'s currently in a City full of Electric type Pokémon.');
        createVivillonQuest(PokemonType.Bug, 'Vivillon (River)', ['Eterna Forest'], 'It hides in a dark Forest.');
        createVivillonQuest(PokemonType.Flying, 'Vivillon (Polar)', ['Sky Pillar'], 'It\'s high up in the sky.');
        createVivillonQuest(PokemonType.Ground, 'Vivillon (Sandstorm)', ['Relic Castle'], 'It got lost in the desert sand.');
        createVivillonQuest(PokemonType.Grass, 'Vivillon (Garden)', ['Flower Paradise'], 'It only shows up amongst the most beautiful flowers.');
        createVivillonQuest(PokemonType.Rock, 'Vivillon (High Plains)', ['Mt. Moon'], 'It has been spotted dancing in the moonlight.');
        createVivillonQuest(PokemonType.Dragon, 'Vivillon (Savanna)', ['Dragonspiral Tower'], 'It\'s surrounded by dragons.');
        createVivillonQuest(PokemonType.Ice, 'Vivillon (Icy Snow)', ['Frost Cavern'], 'It can be found at a very cold place.');

        // Capture 200 Normal type Pokemon
        const catchNormal = new CustomQuest(200, undefined, 'Capture 200 Normal type Pokémon', () => {
            return pokemonMap.filter(p => p.type.includes(PokemonType.Normal)).map(p => App.game.statistics.pokemonCaptured[p.id]()).reduce((a,b) => a + b, 0);
        });
        VivillonQuestLine.addQuest(catchNormal);

        // Capture Vivillon (Pokéball)
        const ViviBallAdd = () => {
            BattleFrontierMilestones.addMilestone(new BattleFrontierMilestonePokemon(666, 'Vivillon (Pokéball)'));
            Notifier.notify({
                title: VivillonQuestLine.name,
                message: 'A Vivillon is hiding somewhere.\nOnly the strongest Challengers can reach it.',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const ViviBalldone = () => {
            Notifier.notify({
                title: VivillonQuestLine.name,
                message: 'You caught the last rare Vivillon (Pokéball).\nCongratulations!',
                type: NotificationConstants.NotificationOption.success,
            });
        };
        const catchBall = new CustomQuest(
            1,
            ViviBalldone,
            'Find and capture the rare Vivillon!\nHint: Only the strongest Challengers can reach it.',
            App.game.statistics.pokemonCaptured[666.01],
            undefined,
            ViviBallAdd
        );
        VivillonQuestLine.addQuest(catchBall);

        // Add quest to quest line
        App.game.quests.questLines().push(VivillonQuestLine);
    }

    public static createUltraBeastQuestLine() {

        const UltraBeastQuestLine = new QuestLine('Ultra Beast Hunt', 'Track down the mysterious Ultra Beasts');

        const AnabelReward = () => {
            Notifier.notify({ message: 'You Beat Anabel!', type: NotificationConstants.NotificationOption.success });
            App.game.pokeballs.gainPokeballs(GameConstants.Pokeball.Beastball,1);
        };

        const AnabelBattle = new CustomQuest(
            1,
            AnabelReward,
            'Defeat Agent Anabel at the Route 8 Motel.',
            () => App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Agent Anabel')](),
            0
        );

        UltraBeastQuestLine.addQuest(AnabelBattle);

        const createUltraBeastQuest = (ultrabeast: PokemonNameType, dungeons: Array<string>, routes: Array<number>, hint: string, numberCaught: number) => {

            const ultrabeastAdd = () => {
                dungeons.forEach(dungeon => {
                    if (dungeon != undefined) {
                        dungeonList[dungeon].enemyList.push({pokemon: ultrabeast, options: {weight: dungeonList[dungeon].weightList[0] / 10}});
                    }
                });
                routes.forEach(route => {
                    if (route != undefined) {
                        Routes.getRoute(GameConstants.Region.alola, route).pokemon.land.push(ultrabeast);
                    }
                });

                Notifier.notify({
                    title: UltraBeastQuestLine.name,
                    message: `An Ultra Beast is hiding somewhere.\n${hint}`,
                    type: NotificationConstants.NotificationOption.info,
                });
            };

            const catchUltraBeast = new CustomQuest(
                numberCaught,
                undefined,
                `Find and capture the rare Ultra Beast ${numberCaught} times!\nHint: ${hint}.`,
                App.game.statistics.pokemonCaptured[pokemonMap[ultrabeast].id],
                undefined,
                ultrabeastAdd
            );
            UltraBeastQuestLine.addQuest(catchUltraBeast);
        };

        createUltraBeastQuest('Nihilego', ['Wela Volcano Park', 'Diglett\'s Tunnel'], [undefined], 'It has been spotted at Wela Volcano Park and Diglett\'s Tunnel.', 1);
        createUltraBeastQuest('Buzzwole', ['Melemele Meadow'], [undefined], 'It has been spotted at Melemele Meadow.', 2);
        createUltraBeastQuest('Pheromosa', ['Verdant Cavern'], [undefined], 'It has been spotted at Verdant Cavern.', 4);
        createUltraBeastQuest('Xurkitree', ['Memorial Hill', 'Lush Jungle'], [undefined], 'It has been spotted at Memorial Hill and Lush Jungle.', 2);
        createUltraBeastQuest('Kartana', ['Malie Garden'], [17], 'It has been spotted at Malie Garden.', 4);
        createUltraBeastQuest('Celesteela', ['Malie Garden'], [23], 'It has been spotted at Malie Garden and Haina Desert.', 2);
        createUltraBeastQuest('Blacephalon', [undefined], [27], 'It has been spotted at Poni Grove.', 5);
        createUltraBeastQuest('Stakataka', [undefined], [27], 'It has been spotted at Poni Grove.', 5);
        createUltraBeastQuest('Guzzlord', ['Resolution Cave'], [undefined], 'It has been spotted at Resolution Cave.', 1);
        App.game.quests.questLines().push(UltraBeastQuestLine);

    }

    public static isQuestLineCompleted(name: string) {
        return App.game.quests.getQuestLine(name)?.state() == QuestLineState.ended;
    }


    public static loadQuestLines() {
        this.createTutorial();
        this.createDeoxysQuestLine();
        this.createUndergroundQuestLine();
        this.createVivillonQuestLine();
        this.createUltraBeastQuestLine();
    }
}
