/// <reference path="./GameConstants.d.ts" />

class Update implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'update';

    // Loaded from package.json
    version = '$VERSION';
    saveVersion = '0.0.0';

    updateSteps = {
        '0.4.0': ({ playerData, saveData }) => {
            saveData.update = { version: '0.0.0' };
            // Update the save data as it is no longer a part of player data
            saveData.statistics = {
                ...playerData.statistics || {},
                pokemonCaptured: playerData._caughtAmount || 0,
                pokemonDefeated: playerData._defeatedAmount || 0,
                totalShinyPokemonCaptured: playerData._shinyCatches || 0,
                totalPokemonCaptured: playerData.statistics.pokemonCaptured || 0,
                totalPokemonDefeated: playerData.statistics.pokemonDefeated || 0,
            };
        },

        '0.4.4': ({ saveData }) => {
            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};

            // Rename from the old statistic name
            saveData.statistics = {
                ...saveData.statistics,
                clickAttacks: saveData.statistics.clicks || 0,
                totalDungeonTokens: saveData.statistics.totalTokens || 0,
                undergroundItemsFound:  saveData.statistics.digItems || 0,
                undergroundLayersMined:  saveData.statistics.digDeeper || 0,
            };
        },

        '0.4.15': ({ playerData, saveData }) => {
            playerData._itemList.Lucky_egg = playerData._itemList.xExp;
            delete playerData._itemList.xExp;
            delete localStorage.mine;
        },

        '0.4.17': ({ saveData }) => {
            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};

            // Rename from the old statistic name
            saveData.statistics = {
                ...saveData.statistics,
                totalPokemonHatched: saveData.statistics.hatchedEggs || 0,
            };
        },

        '0.4.18': ({ playerData, saveData }) => {
            // Move quests from player data -> save data
            saveData.quests = {
                xp: Math.floor(playerData._questXP || 0),
                refreshes: playerData.questRefreshes || 0,
                lastRefresh: playerData._lastSeen,
                questList: new Array(10).fill({}).map((q,index) => ({ index, initial: null })),
                questLines: [
                    {
                        state: playerData.tutorialComplete ? 2 : 1,
                        name: 'Tutorial Quests',
                        quest: playerData.tutorialProgress || 0,
                    },
                ],
            };
            // Convert quest the player is currently doing
            (playerData.currentQuests || []).forEach(quest => {
                saveData.quests.questList[quest.index || 0].initial = quest.initial || null;
            });
            // Convert quest the player has completed
            (playerData.completedQuestList || []).forEach((complete, index) => {
                if (complete) {
                    saveData.quests.questList[index].notified = true;
                    saveData.quests.questList[index].claimed = true;
                    saveData.quests.questList[index].initial = 0;
                }
            });
        },

        '0.5.0': ({ playerData }) => {
            // Give the players Soothe Bells in place of Time stones
            playerData._itemList = playerData._itemList || {};
            playerData._itemList.Soothe_bell = playerData._itemList.Time_stone || 0;
            delete playerData._itemList.Time_stone;
        },

        '0.5.2': ({ saveData }) => {
            // Calculate hatched amount (we can't calculate the shiny hatches though)
            const pokemonHatched = {};
            saveData.party.caughtPokemon.forEach(p => pokemonHatched[p.id] = p.attackBonus / 25);
            // Rename from the old statistic name, add our new statistics
            saveData.statistics = {
                ...saveData.statistics,
                totalBerriesHarvested: saveData.statistics.berriesHarvested.reduce((sum, b) => sum + b, 0) || 0,
                totalShardsGained: saveData.statistics.totalShards.reduce((sum, b) => sum + b, 0) || 0,
                shardsGained: saveData.statistics.totalShards || 0,
                pokemonHatched,
            };

            // If the player has the Soul Badge already
            // Not using game constants incase the badge value isn't 5 in the future
            if (saveData.badgeCase[5]) {
                Update.startQuestLine(saveData, 'Mining Expedition');
            }
        },

        '0.5.5': ({ saveData }) => {
            // Correct statistics
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 22, 34); // Petalburg Woods
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 30, 35); // New Mauville
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 56, 50); // Hall of Origin
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 33); // Sealed Chamber
        },

        '0.5.7': ({ saveData }) => {
            // Update shinies
            saveData.party.shinyPokemon.forEach(name => {
                const id = pokemonMap[name].id;
                if (id) {
                    const pokemon = saveData.party.caughtPokemon.find(p => p.id == id);
                    if (pokemon) {
                        pokemon.shiny = true;
                    }
                }
            });
        },

        '0.5.8': ({ playerData, saveData }) => {
            // Hardcoded to allow upgrading from an older save, if we change
            // the Routes class in the future. Values are lowest/highest route
            // index
            const regionRoutes = {
                kanto: [1, 25],
                johto: [26, 48],
                hoenn: [101, 134],
                sinnoh: [201, 230],
            };
            const result = saveData.statistics.routeKills.reduce((acc, nextValue, nextIndex) => {
                const [region] = Object.entries(regionRoutes).find(([, check]) => (
                    // Find the region that contains this index
                    check[0] <= nextIndex && nextIndex <= check[1]
                )) || ['none'];
                // Skip over any statistics for the 'none' region that are also 0, since
                // these are just the gaps in the route numbers
                if (region === 'none' && nextValue === 0) {
                    return acc;
                }

                // Ensure the region has been prepared
                acc[region] = (acc[region] || {});
                // Track the route with its number in the statistics
                acc[region][nextIndex] = nextValue;
                return acc;
            }, {});
            saveData.statistics.routeKills = result;

            // Refund any shards spent on shard upgrades that have no effect
            // Using magic number incase any of these values change in the future
            const invalidUpgrades = {
                0: 3,
                1: 0,
                2: 0,
                4: 0,
                5: 0,
                9: 0,
                11: 0,
                12: 0,
                15: 0,
                16: 0,
                17: 0,
            };
            Object.entries(invalidUpgrades).forEach(([type, effectiveness]) => {
                const index = +type * 4 + effectiveness;
                let level = saveData.shards.shardUpgrades[index];
                // Refund each level of upgrade purchased
                while (level-- > 0) {
                    const cost = (level + 1) * 500;
                    saveData.shards.shardWallet[type] += cost;
                }
            });

            // Give breeding slots based on highest region
            saveData.breeding.queueSlots = 0;
            for (let region = 0; region < playerData.highestRegion; region++) {
                saveData.breeding.queueSlots += Math.max(4, 4 * Math.pow(2, region - 1));
            }
        },

        '0.6.0': ({ saveData }) => {
            // Update the attack bonus percentages
            saveData.party.caughtPokemon = saveData.party.caughtPokemon.map(p => {
                p.attackBonusPercent = p.attackBonus;
                delete p.attackBonus;
                return p;
            });

            // Update Farm data

            // Refund Farm Points for current berries
            for (let i = 0; i < 8; i++) {
                const amount = 100 / i;
                const refundTokens = Math.floor(saveData.farming.berryList[i] / amount);
                saveData.wallet.currencies[4] += refundTokens;
                saveData.farming.berryList[i] = 0;
            }

            // Unlock & Give 5 Cheri berries to start off with
            saveData.farming.unlockedBerries = [true];
            saveData.farming.berryList[0] = 5;

            // Refund Farm Points for plots previously unlocked
            saveData.wallet.currencies[4] += saveData.farming.plotList.map((p, i) => p.isUnlocked ? 10 * Math.floor(Math.pow(i, 2)) : 0).reduce((s, a) => s + a, 0);

            // Reset all plots
            delete saveData.farming.plotList;
        },

        '0.6.1': ({ saveData }) => {
            // Only update if save is from v0.6.0+
            if (this.minUpdateVersion('0.6.0', saveData)) {
                if (saveData.oakItems.purchaseList) {
                    if (saveData.oakItems.purchaseList[OakItemType.Squirtbottle]) {
                        saveData.oakItems[OakItemType[OakItemType.Squirtbottle]].purchased = true;
                    }
                    if (saveData.oakItems.purchaseList[OakItemType.Sprinklotad]) {
                        saveData.oakItems[OakItemType[OakItemType.Sprinklotad]].purchased = true;
                    }
                }
            }
        },

        '0.6.5': ({ playerData, saveData }) => {
            // Only update if save is from v0.6.0+
            if (this.minUpdateVersion('0.6.0', saveData)) {
                // nerf amount of proteins used per Pokemon
                const maxProteins = (playerData.highestRegion + 1) * 5;
                let proteinsToRefund = 0;

                saveData.party.caughtPokemon = saveData.party.caughtPokemon.map(p => {
                    if (!p.proteinsUsed || p.proteinsUsed <= maxProteins) {
                        return p;
                    }
                    proteinsToRefund += p.proteinsUsed - maxProteins;
                    p.proteinsUsed = maxProteins;
                    return p;
                });

                playerData._itemList.Protein += proteinsToRefund || 0;
            }
        },

        '0.7.1': ({ playerData, saveData }) => {
            saveData.breeding.eggList.map((egg) => {
                egg.shinyChance = GameConstants.SHINY_CHANCE_BREEDING - (0.5 * GameConstants.SHINY_CHANCE_BREEDING * Math.min(1, egg.shinySteps / egg.steps));
                return egg;
            });

            // Update underground item IDs
            const itemMap = (id) => {
                if (id <= 7) { // fossils
                    return id + 199;
                } else if (id <= 16) { // Diamond Items
                    return id - 7;
                } else if (id <= 22) { // Evolution Stones
                    return id + 283;
                } else if (id <= 28) { // Diamond Items
                    return id - 13;
                } else { // Shard Plates
                    return id + 71;
                }
            };
            playerData.mineInventory = playerData.mineInventory?.map(i => {
                i.id = itemMap(i.id);
                return i;
            }) || [];
            if (saveData.underground?.mine) {
                // Reset the mine
                delete saveData.underground.mine;
            }
        },

        '0.7.4': ({ playerData, saveData }) => {
            // Clear old quest data
            saveData.quests.questList = [];

            // Update starter selection
            playerData.starter = playerData._starter;

            /*
             * Challenge Modes
             */
            // Create empty challenges object
            saveData.challenges = { list: {} };
            // Disable Click Attacks
            if (saveData.statistics.clickAttacks <= 100) {
                Notifier.notify({
                    title: 'Active Challenge Mode?',
                    message: `Do you want to activate No Click Attack challenge mode?

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableClickAttack.activate();" data-dismiss="toast">Activate</button>`,
                    timeout: GameConstants.HOUR,
                });
            }
            // Disable Battle Items
            Notifier.notify({
                title: 'Active Challenge Mode?',
                message: `Do you want to activate No Battle Item challenge mode?

                <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableBattleItems.activate(); Object.values(player.effectList).forEach(e => e(0));" data-dismiss="toast">Activate</button>`,
                timeout: GameConstants.HOUR,
            });
            // Disable Master Balls
            if (!saveData.statistics.pokeballsUsed[3]) {
                Notifier.notify({
                    title: 'Active Challenge Mode?',
                    message: `Do you want to activate No Masterball challenge mode?

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableMasterballs.activate();" data-dismiss="toast">Activate</button>`,
                    timeout: GameConstants.HOUR,
                });
            }
            // Disable Oak Items
            if (Object.values(saveData.oakItems).every((oi: any) => !oi.exp)) {
                Notifier.notify({
                    title: 'Active Challenge Mode?',
                    message: `Do you want to activate No Oak Item challenge mode?

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableOakItems.activate();" data-dismiss="toast">Activate</button>`,
                    timeout: GameConstants.HOUR,
                });
            }
            // Disable Shards
            if (saveData.shards.shardUpgrades.every((s: number) => !s)) {
                Notifier.notify({
                    title: 'Active Challenge Mode?',
                    message: `Do you want to activate No Shard challenge mode?

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableShards.activate();" data-dismiss="toast">Activate</button>`,
                    timeout: GameConstants.HOUR,
                });
            }
            // Disable Proteins
            if (saveData.party.caughtPokemon.every(p => !p.proteinsUsed)) {
                Notifier.notify({
                    title: 'Active Challenge Mode?',
                    message: `Do you want to activate No Protein challenge mode?

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableVitamins.activate();" data-dismiss="toast">Activate</button>`,
                    timeout: GameConstants.HOUR,
                });
            }

            // Add Solaceon Ruins
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 43);

            // Multi saves profile
            const firstPokemon = saveData.party.caughtPokemon[0];
            saveData.profile = {
                name: 'Trainer',
                pokemon: firstPokemon?.id || 0,
                pokemonShiny: firstPokemon?.shiny || false,
            };
        },

        '0.7.6': ({ playerData, saveData }) => {
            Update.changeHatcheryKey(saveData, 'Lets go Pikachu', 'Let\'s Go Pikachu');
            Update.changeHatcheryKey(saveData, 'Lets go Eevee', 'Let\'s Go Eevee');

            // Check if the Let's Go Pikachu is hidden due to MissingNo (reset breeding status)
            const pikachu = saveData.party.caughtPokemon.find(p => p.id == -8);
            if (pikachu) {
                pikachu.breeding = !!saveData.breeding.eggList.find((e) => e.pokemon == 'Let\'s Go Pikachu')
                    || !!saveData.breeding.queueList.find((p) => p == 'Let\'s Go Pikachu');
            }
            // Check if the Let's Go Eevee is hidden due to MissingNo (reset breeding status)
            const eevee = saveData.party.caughtPokemon.find(p => p.id == -9);
            if (eevee) {
                eevee.breeding = !!saveData.breeding.eggList.find((e) => e.pokemon == 'Let\'s Go Eevee')
                    || !!saveData.breeding.queueList.find((p) => p == 'Let\'s Go Eevee');
            }
        },

        '0.8.1': ({ playerData, saveData }) => {
            // Add Weather Institute
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 29);
            // Add Magma Hideout
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 32);
            // Add Aqua Hideout
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 33);
            // Add Team Plasma Assault
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 72);
            // Add Plasma Frigate
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 74);
        },

        '0.8.3': ({ playerData, saveData }) => {
            // If player has defeated the 8th Kalos gym, start the vivillon quest line
            saveData.badgeCase = saveData.badgeCase || [];
            // Not using game constants incase the value isn't 73 in the future
            if (saveData.badgeCase[73]) { // Iceberg badge
                Update.startQuestLine(saveData, 'The Great Vivillon Hunt!');
            }

            // Add missing key items if the player has the badge
            const badgeToKeyItems = {
                [5]: 'Safari_ticket', //Soul badge
                [8]: 'Shard_case', //Earth badge
            };
            Object.keys(badgeToKeyItems).forEach(badge => {
                const keyItem = badgeToKeyItems[badge];
                if (saveData.badgeCase[badge]) {
                    saveData.keyItems[keyItem] = true;
                }
            });
        },

        '0.8.4': ({ playerData, saveData }) => {
            // Update Pokemon names
            Update.changeHatcheryKey(saveData, 'Vivillon', 'Vivillon (Meadow)');

            // Track Battle Frontier milestones earned
            const milestones = [
                [5, '25 x Pokéball'],
                [10, '100 x Pokéball'],
                [20, '100 x Greatball'],
                [30, '100 x Ultraball'],
                [35, '100 x xClick'],
                [40, '100 x xAttack'],
                [50, '100 x Small Restore'],
                [100, 'Deoxys'],
                [110, '10 x Water Stone'],
                [120, '10 x Leaf Stone'],
                [130, '10 x Thunder Stone'],
                [140, '10 x Fire Stone'],
                [150, '200 x Medium Restore'],
                [151, 'Deoxys (attack)'],
                [160, '100 x Lucky Egg'],
                [170, '100 x Lucky Incense'],
                [180, '100 x Item Magnet'],
                [190, '10 x Mystery Egg'],
                [200, '100 x Large Restore'],
                [210, '40 x Water Stone'],
                [220, '40 x Leaf Stone'],
                [230, '40 x Thunder Stone'],
                [240, '40 x Moon Stone'],
                [250, '6400 x Ultraball'],
                [251, 'Deoxys (defense)'],
                [300, '100 x Linking Cord'],
                [386, 'Deoxys (speed)'],
            ];
            const highestStageCompleted = saveData.statistics?.battleFrontierHighestStageCompleted || 0;
            saveData.battleFrontier = {
                milestones: milestones.filter(([stage]) => stage <= highestStageCompleted),
            };
        },

        '0.8.9': ({ playerData, saveData }) => {
            // Retroactively track proteins obtained
            let proteinsObtained = 0;

            // Only update if save is from v0.6.0+ (when proteins were added)
            if (this.minUpdateVersion('0.6.0', saveData)) {
                saveData.party.caughtPokemon.forEach(p => {
                    proteinsObtained += p.proteinsUsed;
                });

                proteinsObtained += playerData._itemList.Protein;
            }

            saveData.statistics = {
                ...saveData.statistics,
                totalProteinsObtained: proteinsObtained,
            };

            // Only run if save is from v0.8.7 (a forked version which is breaking stuff)
            if (saveData.update?.version == '0.8.7') {
                // Check if the save has the Vivillon quest line, otherwise it's not from the main website
                const questLines = saveData.quests?.questLines?.length || 0;
                if (questLines < 4) {
                    Notifier.notify({
                        title: 'Importing this save will cause errors!',
                        message: 'Please only use saves from the main website https://pokeclicker.com/',
                        type: NotificationConstants.NotificationOption.danger,
                        timeout: GameConstants.DAY,
                    });
                    throw new Error('Importing this save will cause errors');
                }
            }
        },

        '0.8.12': ({ playerData, saveData }) => {
            // Add Team Rockets Hideout
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 19);
            // Add Radio Tower
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 20);
            // Add Victory Road Johto
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 23);

            // If the player has the Fog Badge already
            // Not using game constants incase the badge value isn't 17 in the future
            if (saveData.badgeCase[17]) {
                Update.startQuestLine(saveData, 'Team Rocket Again');
            }

            setTimeout(async () => {
                // Check if player wants to activate the new challenge modes
                if (await Notifier.confirm({ title: 'Regional Attack Debuff (recommended)', message: 'New challenge mode added Regional Attack Debuff.\n\nLowers Pokémon attack based on native region and highest reached region.\n\nThis is the default and recommended way to play, but is now an optional challenge.\n\nPlease choose if you would like this challenge mode to be enabled or disabled (cannot be re-enabled later)', confirm: 'Disable', cancel: 'Enable' })) {
                    App.game.challenges.list.regionalAttackDebuff.disable();
                }
                if (await Notifier.confirm({ title: 'Require Complete Pokédex (recommended)', message: 'New challenge mode added Require Complete Pokédex.\n\nRequires a complete regional pokédex before moving on to the next region.\n\nThis is the default and recommended way to play, but is now an optional challenge.\n\nPlease choose if you would like this challenge mode to be enabled or disabled (cannot be re-enabled later)', confirm: 'Disable' , cancel: 'Enable' })) {
                    App.game.challenges.list.requireCompletePokedex.disable();
                }
            }, GameConstants.SECOND);
        },

        '0.8.14': ({ playerData, saveData }) => {
            // Start Aqua Magma questline if player has Dynamo Badge already
            if (saveData.badgeCase[29]) {
                Update.startQuestLine(saveData, 'Land vs. Water');
            }

            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};

            // Rename from the old statistic name
            saveData.statistics = {
                ...saveData.statistics,
                totalBerriesObtained: saveData.statistics.totalBerriesHarvested || 0,
                pokeballsObtained: saveData.statistics.pokeballsBought || 0,
                berriesObtained:  saveData.statistics.berriesHarvested || 0,

            };
        },

        '0.8.15': ({ playerData, saveData }) => {
            // Start Plasma questline if player has Jet Badge already
            if (saveData.badgeCase[58]) {
                Update.startQuestLine(saveData, 'Quest for the DNA Splicers');
            }
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 2, 1); // Digletts Cave
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 5, 4); // Power Plant
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 31, 28); // Jagged Pass
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 29, 30); // Mt. Chimney
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 32, 34); // New Mauville
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 84, 64); // Pledge Grove
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 78, 79); // Abundant Shrine

            // Shards -> Gems

            //Questlist update
            saveData.quests.questList = saveData.quests.questList?.map(q => {
                if (q.name == 'GainShardsQuest') {
                    q.name = 'GainGemsQuest';
                }
                return q;
            }) || [];

            //Setting gems = shards
            saveData.gems = {
                gemWallet: saveData.shards.shardWallet || [],
                gemCollapsed: saveData.shards.shardCollapsed || [],
                gemUpgrades: saveData.shards.shardUpgrades || [],
            };

            delete saveData.keyItems.Shard_case;

            // Swapping Shard Case for Gem Case
            if (saveData.badgeCase[8]) {
                saveData.keyItems.Gem_case = true;
            }

            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};

            // Rename from the old statistic name
            saveData.statistics = {
                ...saveData.statistics,
                totalGemsGained: saveData.statistics.totalShardsGained || 0,
                gemsGained: saveData.statistics.shardsGained || 0,
            };

            // Challenge update
            saveData.challenges.list.disableGems = saveData.challenges?.list?.disableShards ?? false;
        },

        '0.9.0': ({ playerData, saveData }) => {
            // Migrate event negative ID's to decimals of base form
            const eventIDs = [
                [-1, 25.08],
                [-2, 25.09],
                [-3, 150.1],
                [-4, 143.1],
                [-5, 175.1],
                [-6, 1.2],
                [-7, 25.1],
                [-8, 25.11],
                [-9, 133.1],
                [-10, 1.1],
                [-11, 2.1],
                [-12, 3.1],
                [-13, 4.1],
                [-14, 5.1],
                [-15, 6.1],
                [-16, 7.1],
                [-17, 8.1],
                [-18, 9.1],
            ];

            eventIDs.forEach(([oldID, newID]) => {
                const pokemon = saveData.party.caughtPokemon.find(p => p.id === oldID);
                // If player hasn't caught this mon yet, return.
                if (pokemon == undefined) {
                    return;
                }
                // Update our ID
                pokemon.id = newID;
                if (!saveData.statistics.pokemonHatched) {
                    saveData.statistics.pokemonHatched = {};
                }
                if (!saveData.statistics.shinyPokemonHatched) {
                    saveData.statistics.shinyPokemonHatched = {};
                }
                // Update our statistics
                saveData.statistics.pokemonEncountered[newID] = saveData.statistics.pokemonEncountered[oldID] || 0;
                saveData.statistics.pokemonDefeated[newID] = saveData.statistics.pokemonDefeated[oldID] || 0;
                saveData.statistics.pokemonCaptured[newID] = saveData.statistics.pokemonCaptured[oldID] || 0;
                saveData.statistics.pokemonHatched[newID] = saveData.statistics.pokemonHatched[oldID] || 0;
                saveData.statistics.shinyPokemonEncountered[newID] = saveData.statistics.shinyPokemonEncountered[oldID] || 0;
                saveData.statistics.shinyPokemonDefeated[newID] = saveData.statistics.shinyPokemonDefeated[oldID] || 0;
                saveData.statistics.shinyPokemonCaptured[newID] = saveData.statistics.shinyPokemonCaptured[oldID] || 0;
                saveData.statistics.shinyPokemonHatched[newID] = saveData.statistics.shinyPokemonHatched[oldID] || 0;
                // Delete our old statistics
                delete saveData.statistics.pokemonEncountered[oldID];
                delete saveData.statistics.pokemonDefeated[oldID];
                delete saveData.statistics.pokemonCaptured[oldID];
                delete saveData.statistics.pokemonHatched[oldID];
                delete saveData.statistics.shinyPokemonEncountered[oldID];
                delete saveData.statistics.shinyPokemonDefeated[oldID];
                delete saveData.statistics.shinyPokemonCaptured[oldID];
                delete saveData.statistics.shinyPokemonHatched[oldID];
            });


            playerData.mineInventory = playerData.mineInventory?.map(i => {
                i.sellLocked = false;
                return i;
            }) || [];

            // Start Galactic questline if player has Coal Badge already
            if (saveData.badgeCase[40]) {
                Update.startQuestLine(saveData, 'A New World');
            }

            // Clear Valley Windworks Clears
            saveData.statistics.dungeonsCleared[44] = 0;
            // Add Team Galactic Eterna Building
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 47);
            // Move Lake Verity
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 53, 52);
            // Move Lake Valor
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 52, 54);
            // Add Team Galactic HQ
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 56);
            // Move Spear Pillar
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 57, 59);
            // Add Sendoff Spring
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 60);
        },
        '0.9.4': ({ playerData, saveData }) => {
            // Modifications relating to smaller save file sizes
            const PartyKeyMap = {
                'attackBonusPercent': 0,
                'attackBonusAmount': 1,
                'proteinsUsed': 2,
                'exp': 3,
                'breeding': 4,
                'shiny': 5,
                'category': 6,
                'levelEvolutionTriggered': 7,
            };
            Object.entries(PartyKeyMap).forEach(([oldKey, newKey]) => {
                saveData.party.caughtPokemon.forEach(p => {
                    p[newKey] = p[oldKey];
                    delete p[oldKey];
                });
            });
            saveData.farming.mutations = saveData.farming.mutations.map(m => m.hintsSeen || m.hintSeen);

            // Change Ultra Wormhole to a Temporary Battle
            saveData.statistics.temporaryBattleDefeated = new Array<number>();
            saveData.statistics.temporaryBattleDefeated[0] = saveData.statistics.gymsDefeated[84];
            // Remove the Elite_Nihilego Gym, now a temporary battle instead of a gym
            saveData.statistics.gymsDefeated.splice(84, 1);
            saveData.badgeCase.splice(84, 1);
            // Change Ultra Megalopolis to a Temporary Battle
            saveData.statistics.temporaryBattleDefeated[1] = saveData.statistics.gymsDefeated[88];
            // Remove the Elite_ULtraNecrozma Gym, now a temporary battle instead of a gym
            saveData.statistics.gymsDefeated.splice(88, 1);
            saveData.badgeCase.splice(88, 1);
        },

        '0.9.6': ({ playerData, saveData }) => {
            // Set our last save reminder/download to our current in game time
            // This way we won't get a reminder notification for at least 12 hours
            saveData.saveReminder = {
                lastReminder: saveData.statistics.secondsPlayed,
                lastDownloaded: saveData.statistics.secondsPlayed,
            };

            // Start Mina's Trial questline if player has cleared Ultra Necrozma already
            if (saveData.statistics.temporaryBattleDefeated[1]) {
                Update.startQuestLine(saveData, 'Mina\'s Trial');
            }

            // Add Rocket Game Corner
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 4);
            // Add Silph Co.
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 6);
            // Start Team Rocket Kanto questline if player has Cascade Badge already
            if (saveData.badgeCase[2]) {
                Update.startQuestLine(saveData, 'Team Rocket');
            }

            // Rename Land vs. Water questline, so QuestLineCompletedRequirement will work
            saveData.quests.questLines.forEach(v => {
                if (v.name === 'Land vs Water') {
                    v.name = 'Land vs. Water';
                }
            });

            // Add AZ TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 0);

            //Replace Poison Barb with Rocky Helmet
            saveData.oakItems.Rocky_Helmet = saveData.oakItems.Poison_Barb;
            delete saveData.oakItems.Poison_Barb;

            // Give the players Dowsing Machines in place of Item Magnets
            playerData._itemList.Dowsing_machine = playerData._itemList.Item_magnet;
            playerData.effectList.Dowsing_machine = playerData.effectList.Item_magnet;
            delete playerData._itemList.Item_magnet;
            delete playerData.effectList.Item_magnet;

            // Start pokerus
            setTimeout(async () => {
                // Check if player wants to activate the new challenge modes
                if (!await Notifier.confirm({ title: 'Slow EVs', message: 'New challenge mode added: Slow EVs.\n\nDiminishes the rate at which EVs are gained.\n\nThis is an optional challenge and is NOT the recommended way to play.\n\nPlease choose if you would like this challenge mode to be disabled or enabled.\n\nCan be disabled later. Can NOT be enabled later!', confirm: 'Disable', cancel: 'Enable' })) {
                    App.game.challenges.list.slowEVs.activate();
                }
            }, GameConstants.SECOND);
        },

        '0.9.7': ({ playerData, saveData }) => {
            // Fix people not getting the pokerus
            if (saveData.keyItems.Pokerus_virus) {
                let starter;
                switch (playerData.starter) {
                    case 0:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 1);
                        break;
                    case 1:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 4);
                        break;
                    case 2:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 7);
                        break;
                    case 3:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 25);
                        break;
                }
                starter[8] = true;
            }

            // Add Fighting Dojo TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 0);
        },

        '0.9.8': ({ playerData, saveData, settingsData }) => {
            // Add names to oak item loadouts
            saveData.oakItemLoadouts = saveData.oakItemLoadouts?.map((list, index) => ({ name: `Loadout ${index + 1}`, loadout: list })) || [];

            // Fix pokerus & EVs moved from statistics
            saveData.party.caughtPokemon.forEach(p => {
                // If has pokerus, set to "contagious"
                let status = (p[8]) ? 2 : 0;
                // Get effort points (0 if not infected), Multiply by 100 for finer control
                const effortPoints = status ? saveData.statistics.effortPoints?.[p.id] * 100 || 0 : 0;
                // Set to cured if reached required amount of EVs
                const requiredForCured = saveData.challenges.list.slowEVs ? 500000 : 50000;
                if (effortPoints >= requiredForCured) {
                    status = 3;
                }
                // Update status and EVs
                p[8] = status;
                p[9] = effortPoints;
            });

            // Give the players Linking Cords in place of Trade Stones
            playerData._itemList.Linking_cord = playerData._itemList.Trade_stone || 0;
            delete playerData._itemList.Trade_stone;

            // Start Sevii questline if player has Volcano Badge already
            if (saveData.badgeCase[7]) {
                Update.startQuestLine(saveData, 'Bill\'s Errand');
            }
            // Start Persons of Interest questline if player has Earth Badge already
            if (saveData.badgeCase[8]) {
                Update.startQuestLine(saveData, 'Persons of Interest');
            }

            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};

            // Add new statistic
            saveData.statistics.totalProteinsPurchased = saveData.statistics.totalProteinsObtained || 0;

            // Add Mt. Ember Summit
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 10);

            // Add Berry Forest
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 11);

            // Add Biker Gang Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 1);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 2);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 3);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 4);

            // Add Galactic Boss Cyrus Temporary Battle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 5);

            // Add Ash Ketchum Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 8);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 9);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 10);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 11);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);

            // Update settings
            if (settingsData) {
                // Update our default quest location color
                if (settingsData['--questAtLocation'] === '#34BF45') {
                    settingsData['--questAtLocation'] = '#55ff00';
                }

                // Remove current location color
                delete settingsData['--currentPlace'];

                // Split dungeon loot notifications into two
                settingsData['notification.common_dungeon_item_found'] = settingsData['notification.dungeon_item_found'] ?? true;
                settingsData['notification.common_dungeon_item_found.desktop'] = settingsData['notification.dungeon_item_found.desktop'] ?? false;
                settingsData['notification.rare_dungeon_item_found'] = settingsData['notification.dungeon_item_found'] ?? true;
                settingsData['notification.rare_dungeon_item_found.desktop'] = settingsData['notification.dungeon_item_found.desktop'] ?? false;
                delete settingsData['notification.dungeon_item_found'];
                delete settingsData['notification.dungeon_item_found.desktop'];
            }
        },

        '0.9.9': ({ playerData, saveData }) => {
            // Fix pokemon having Pokérus early (key item not unlocked)
            if (!saveData.keyItems.Pokerus_virus) {
                saveData.party.caughtPokemon.forEach(p => {
                    // Pokérus State
                    p[8] = 0;
                    // Effort Points
                    p[9] = 0;
                });
            }
        },

        '0.9.10': ({ playerData, saveData }) => {
            // Rename statistic
            saveData.statistics.pokeballsPurchased = saveData.statistics.pokeballsBought;

            // Update total proteins obtained to be equal to the total purchased (or whichever is higher)
            saveData.statistics.totalProteinsObtained = Math.max(saveData.statistics.totalProteinsPurchased, saveData.statistics.totalProteinsObtained);

            // If Pokémon doesn't have Pokérus yet, it shouldn't have Effort Points
            saveData.party.caughtPokemon.forEach(p => {
                // Check Pokérus state
                if (!p[8]) {
                    // Reset Effort Points
                    p[9] = 0;
                }
            });

            // Turn Parfum Palace into a town
            saveData.statistics.dungeonsCleared.splice(96, 1);

            // Filter already earned milestones due to item/Pokémon name updates
            const milestones = [
                [5, '25 x Poké Ball'],
                [10, '100 x Poké Ball'],
                [20, '100 x Great Ball'],
                [30, '100 x Ultra Ball'],
                [35, '100 x X Click'],
                [40, '100 x X Attack'],
                [50, '100 x Small Restore'],
                [100, 'Deoxys'],
                [110, '10 x Water Stone'],
                [120, '10 x Leaf Stone'],
                [130, '10 x Thunder Stone'],
                [140, '10 x Fire Stone'],
                [150, '200 x Medium Restore'],
                [151, 'Deoxys (Attack)'],
                [160, '100 x Lucky Egg'],
                [170, '100 x Lucky Incense'],
                [180, '100 x Dowsing Machine'],
                [190, '10 x Mystery Egg'],
                [200, '100 x Large Restore'],
                [210, '40 x Water Stone'],
                [220, '40 x Leaf Stone'],
                [230, '40 x Thunder Stone'],
                [240, '40 x Moon Stone'],
                [250, '6,400 x Ultra Ball'],
                [251, 'Deoxys (Defense)'],
                [300, '100 x Linking Cord'],
                [386, 'Deoxys (Speed)'],
            ];
            const highestStageCompleted = saveData.statistics?.battleFrontierHighestStageCompleted || 0;
            saveData.battleFrontier = {
                milestones: milestones.filter(([stage]) => stage <= highestStageCompleted),
                checkpoint: saveData.battleFrontier.checkpoint,
            };

            // Update Pokemon name changes for hatchery/queue
            const renamePokemon = Update.changeHatcheryKey;
            renamePokemon(saveData, 'Bulbasaur (clone)', 'Bulbasaur (Clone)');
            renamePokemon(saveData, 'Ivysaur (clone)', 'Ivysaur (Clone)');
            renamePokemon(saveData, 'Venusaur (clone)', 'Venusaur (Clone)');
            renamePokemon(saveData, 'Charmander (clone)', 'Charmander (Clone)');
            renamePokemon(saveData, 'Charmeleon (clone)', 'Charmeleon (Clone)');
            renamePokemon(saveData, 'Charizard (clone)', 'Charizard (Clone)');
            renamePokemon(saveData, 'Pikachu (Original cap)', 'Pikachu (Original Cap)');
            renamePokemon(saveData, 'Pikachu (Hoenn cap)', 'Pikachu (Hoenn Cap)');
            renamePokemon(saveData, 'Pikachu (Sinnoh cap)', 'Pikachu (Sinnoh Cap)');
            renamePokemon(saveData, 'Pikachu (Unova cap)', 'Pikachu (Unova Cap)');
            renamePokemon(saveData, 'Pikachu (Kalos cap)', 'Pikachu (Kalos Cap)');
            renamePokemon(saveData, 'Pikachu (Alola cap)', 'Pikachu (Alola Cap)');
            renamePokemon(saveData, 'Pikachu (Partner cap)', 'Pikachu (Partner Cap)');
            renamePokemon(saveData, 'Castform (sunny)', 'Castform (Sunny)');
            renamePokemon(saveData, 'Castform (rainy)', 'Castform (Rainy)');
            renamePokemon(saveData, 'Castform (snowy)', 'Castform (Snowy)');
            renamePokemon(saveData, 'Deoxys (attack)', 'Deoxys (Attack)');
            renamePokemon(saveData, 'Deoxys (defense)', 'Deoxys (Defense)');
            renamePokemon(saveData, 'Deoxys (speed)', 'Deoxys (Speed)');
            renamePokemon(saveData, 'Burmy (plant)', 'Burmy (Plant)');
            renamePokemon(saveData, 'Burmy (sand)', 'Burmy (Sand)');
            renamePokemon(saveData, 'Burmy (trash)', 'Burmy (Trash)');
            renamePokemon(saveData, 'Wormadam (plant)', 'Wormadam (Plant)');
            renamePokemon(saveData, 'Wormadam (sand)', 'Wormadam (Sand)');
            renamePokemon(saveData, 'Wormadam (trash)', 'Wormadam (Trash)');
            renamePokemon(saveData, 'Cherrim (overcast)', 'Cherrim (Overcast)');
            renamePokemon(saveData, 'Cherrim (sunshine)', 'Cherrim (Sunshine)');
            renamePokemon(saveData, 'Shellos (west)', 'Shellos (West)');
            renamePokemon(saveData, 'Shellos (east)', 'Shellos (East)');
            renamePokemon(saveData, 'Gastrodon (west)', 'Gastrodon (West)');
            renamePokemon(saveData, 'Gastrodon (east)', 'Gastrodon (East)');
            renamePokemon(saveData, 'Rotom (heat)', 'Rotom (Heat)');
            renamePokemon(saveData, 'Rotom (wash)', 'Rotom (Wash)');
            renamePokemon(saveData, 'Rotom (frost)', 'Rotom (Frost)');
            renamePokemon(saveData, 'Rotom (fan)', 'Rotom (Fan)');
            renamePokemon(saveData, 'Rotom (mow)', 'Rotom (Mow)');
            renamePokemon(saveData, 'Rotom (discord)', 'Rotom (Discord)');
            renamePokemon(saveData, 'Giratina (altered)', 'Giratina (Altered)');
            renamePokemon(saveData, 'Shaymin (land)', 'Shaymin (Land)');
            renamePokemon(saveData, 'Shaymin (sky)', 'Shaymin (Sky)');
            renamePokemon(saveData, 'Arceus (normal)', 'Arceus (Normal)');
            renamePokemon(saveData, 'Meloetta (aria)', 'Meloetta (Aria)');
            renamePokemon(saveData, 'Meloetta (pirouette)', 'Meloetta (Pirouette)');
            renamePokemon(saveData, 'Ash Greninja', 'Ash-Greninja');
            renamePokemon(saveData, 'Vivillon (Pokéball)', 'Vivillon (Poké Ball)');
            renamePokemon(saveData, 'Oricorio (Pom-pom)', 'Oricorio (Pom-Pom)');
            renamePokemon(saveData, 'Minior (Blue-core)', 'Minior (Blue Core)');
            renamePokemon(saveData, 'Minior (Green-core)', 'Minior (Green Core)');
            renamePokemon(saveData, 'Minior (Indigo-core)', 'Minior (Indigo Core)');
            renamePokemon(saveData, 'Minior (Orange-core)', 'Minior (Orange Core)');
            renamePokemon(saveData, 'Minior (Red-core)', 'Minior (Red Core)');
            renamePokemon(saveData, 'Minior (Violet-core)', 'Minior (Violet Core)');
            renamePokemon(saveData, 'Minior (Yellow-core)', 'Minior (Yellow Core)');

            // Start Galactic questline if player has Coal Badge already
            // Don't start completed questline again if updating from v0.9.8/9 to v0.9.16+
            const aNewWorld = saveData.quests.questLines.find(ql => ql.name == 'A new world');
            if (saveData.badgeCase[40] && !aNewWorld) {
                Update.startQuestLine(saveData, 'A New World');
            }

            // Update mine inventory
            playerData.mineInventory.forEach(i => {
                if (i.valueType == 'Diamond') {
                    // Shards
                    if (i.name.includes('Shard')) {
                        i.valueType = 2;
                    } else { // Diamond items
                        i.valueType = 0;
                    }
                }
                // Fossils
                if (i.valueType == 'Mine Egg') {
                    i.valueType = 3;
                }
                // Gems
                if (i.value == 100) {
                    i.valueType = 1;
                }
            });
        },

        '0.9.11': ({ playerData, saveData }) => {
            // Add Tohjo Falls
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 27);
            // Add Celebi Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 5);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 6);
        },

        '0.9.12': ({ playerData, saveData }) => {
            // Revert player back to Alola if in Galar
            if (playerData._region >= 7) {
                playerData._region = 6;
                playerData._subregion = 0;
                playerData._route = 0;
                playerData._townName = 'Iki Town Outskirts';
            }
        },

        '0.9.13': ({ playerData, saveData }) => {
            // Add sevii4567 temp battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 5);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 6);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 8);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 9);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 10);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 11);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);
            // Pinkan Ash
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 23);
            // Add sevii4567 dungeons
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 14);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 15);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 16);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 17);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 18);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 19);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 20);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 21);
            // Add orange league badges
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 40);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 41);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 42);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 43);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 44);


            // Start Plasma questline if player has Toxic Badge already
            if (saveData.badgeCase[59]) {
                Update.startQuestLine(saveData, 'Quest for the DNA Splicers');
            }
            // Remove Team Plasma Assault dungeon
            saveData.statistics.dungeonsCleared.splice(90, 1);
            // Add Team Plasma Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 16);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 17);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 18);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 19);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 20);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 21);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 22);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 23);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 24);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 25);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 26);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 27);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 28);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 29);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 30);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 31);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 32);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 33);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 34);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 35);
            // Move player out of Team Plasma Assault
            if (playerData._townName == ('Team Plasma Assault')) {
                playerData._townName = ('Opelucid City');
            }
            // Move player out of Plasma Frigate
            if (playerData._townName == ('Plasma Frigate')) {
                playerData._townName = ('Humilau City');
            }
            // Move player out of Giant Chasm
            if (playerData._townName == ('Giant Chasm')) {
                playerData._townName = ('Humilau City');
            }

            // Add Detective Pikachu TemporaryBattles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 36);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 37);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 38);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 39);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 40);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 41);
        },

        '0.9.14': ({ playerData, saveData }) => {
            if (saveData.party.caughtPokemon.filter(p => p.id === 103.02).length) {
                saveData.wallet.currencies[1] += 50000;
            }
        },

        '0.9.15': ({ playerData, saveData, settingsData }) => {
            // Aegislash and Pumpkaboo line renames
            const renamePokemon = Update.changeHatcheryKey;
            renamePokemon(saveData, 'Aegislash', 'Aegislash (Shield)');
            renamePokemon(saveData, 'Pumpkaboo', 'Pumpkaboo (Average)');
            renamePokemon(saveData, 'Gourgeist', 'Gourgeist (Average)');

            // Add Snorlax Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 1);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 2);

            // Add Suicune Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 8);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 9);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 10);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 11);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 13);

            // Pinkan Berry
            saveData.farming.berryList = Update.moveIndex(saveData.farming.berryList, 35);
            saveData.farming.unlockedBerries = Update.moveIndex(saveData.farming.unlockedBerries, 35);
            saveData.farming.mutations = Update.moveIndex(saveData.farming.mutations, 28);
            saveData.farming.plotList.forEach(p => {
                if (p.berry >= 35) {
                    p.berry++;
                }
            });
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 22);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 23);

            // Add Princess Diancie Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 53);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 54);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 55);

            // Replace Pokémon names to IDs
            const eggList = saveData.breeding.eggList;
            const queueList = saveData.breeding.queueList;
            Update.changePokemonNameToId(saveData, eggList);
            Update.changePokemonNameToId(saveData, queueList);

            // Adding more Galar badges
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 109);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 110);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 111);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 112);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 113);
        },

        '0.9.16': ({ playerData, saveData }) => {
            // Pinkan Berry
            saveData.statistics.berriesHarvested = Update.moveIndex(saveData.statistics.berriesHarvested, 35);

            // Rename Pinkan Rocket questline and Sinnoh questline
            saveData.quests.questLines.forEach(v => {
                if (v.name === 'Team Rocket\'s Pinkan Themepark') {
                    v.name = 'Team Rocket\'s Pinkan Theme Park';
                }
            });
            saveData.quests.questLines.forEach(v => {
                if (v.name === 'A new world') {
                    v.name = 'A New World';
                }
            });
        },

        '0.9.17': ({ playerData, saveData, settingsData }) => {
            // Add Sudowoodo Temporary Battle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);

            // Pinkan Berry - Obtained Statistics
            saveData.statistics.berriesObtained = Update.moveIndex(saveData.statistics.berriesObtained, 35);

            // Fix A New World questline for players updating from v0.9.8/9 to v0.9.16+
            const aNewWorld = saveData.quests.questLines.find(ql => ql.name == 'A New World') || {};
            if (aNewWorld.state === 1 && aNewWorld.quest <= 3) {
                saveData.statistics.temporaryBattleDefeated[27] = 0;
            }
        },

        '0.10.0': ({ playerData, saveData, settingsData }) => {
            // Add Kimono Girls Temporary Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 25);

            // Create new Pokemon Gender Statistics if they don't exist
            // Male
            if (!saveData.statistics.malePokemonCaptured) {
                saveData.statistics.malePokemonCaptured = {};
            }
            if (!saveData.statistics.malePokemonDefeated) {
                saveData.statistics.malePokemonDefeated = {};
            }
            if (!saveData.statistics.malePokemonEncountered) {
                saveData.statistics.malePokemonEncountered = {};
            }
            if (!saveData.statistics.malePokemonHatched) {
                saveData.statistics.malePokemonHatched = {};
            }
            // Shiny male
            if (!saveData.statistics.shinyMalePokemonCaptured) {
                saveData.statistics.shinyMalePokemonCaptured = {};
            }
            if (!saveData.statistics.shinyMalePokemonDefeated) {
                saveData.statistics.shinyMalePokemonDefeated = {};
            }
            if (!saveData.statistics.shinyMalePokemonEncountered) {
                saveData.statistics.shinyMalePokemonEncountered = {};
            }
            if (!saveData.statistics.shinyMalePokemonHatched) {
                saveData.statistics.shinyMalePokemonHatched = {};
            }
            // Female
            if (!saveData.statistics.femalePokemonCaptured) {
                saveData.statistics.femalePokemonCaptured = {};
            }
            if (!saveData.statistics.femalePokemonDefeated) {
                saveData.statistics.femalePokemonDefeated = {};
            }
            if (!saveData.statistics.femalePokemonEncountered) {
                saveData.statistics.femalePokemonEncountered = {};
            }
            if (!saveData.statistics.femalePokemonHatched) {
                saveData.statistics.femalePokemonHatched = {};
            }
            // Shiny female
            if (!saveData.statistics.shinyFemalePokemonCaptured) {
                saveData.statistics.shinyFemalePokemonCaptured = {};
            }
            if (!saveData.statistics.shinyFemalePokemonDefeated) {
                saveData.statistics.shinyFemalePokemonDefeated = {};
            }
            if (!saveData.statistics.shinyFemalePokemonEncountered) {
                saveData.statistics.shinyFemalePokemonEncountered = {};
            }
            if (!saveData.statistics.shinyFemalePokemonHatched) {
                saveData.statistics.shinyFemalePokemonHatched = {};
            }

            // Initialize total statistics
            saveData.statistics.totalMalePokemonCaptured = 0;
            saveData.statistics.totalMalePokemonDefeated = 0;
            saveData.statistics.totalMalePokemonEncountered = 0;
            saveData.statistics.totalMalePokemonHatched = 0;

            saveData.statistics.totalShinyMalePokemonCaptured = 0;
            saveData.statistics.totalShinyMalePokemonDefeated = 0;
            saveData.statistics.totalShinyMalePokemonEncountered = 0;
            saveData.statistics.totalShinyMalePokemonHatched = 0;

            saveData.statistics.totalFemalePokemonCaptured = 0;
            saveData.statistics.totalFemalePokemonDefeated = 0;
            saveData.statistics.totalFemalePokemonEncountered = 0;
            saveData.statistics.totalFemalePokemonHatched = 0;

            saveData.statistics.totalShinyFemalePokemonCaptured = 0;
            saveData.statistics.totalShinyFemalePokemonDefeated = 0;
            saveData.statistics.totalShinyFemalePokemonEncountered = 0;
            saveData.statistics.totalShinyFemalePokemonHatched = 0;

            saveData.statistics.totalGenderlessPokemonCaptured = 0;
            saveData.statistics.totalGenderlessPokemonDefeated = 0;
            saveData.statistics.totalGenderlessPokemonEncountered = 0;
            saveData.statistics.totalGenderlessPokemonHatched = 0;

            saveData.statistics.totalShinyGenderlessPokemonCaptured = 0;
            saveData.statistics.totalShinyGenderlessPokemonDefeated = 0;
            saveData.statistics.totalShinyGenderlessPokemonEncountered = 0;
            saveData.statistics.totalShinyGenderlessPokemonHatched = 0;

            // Assign generic Pokemon statistics to the gendered Pokemon ones
            saveData.party.caughtPokemon?.forEach(pokemon => {
                const capturedStatistic = saveData.statistics.pokemonCaptured[pokemon.id] || 0;
                const defeatedStatistic = saveData.statistics.pokemonDefeated[pokemon.id] || 0;
                const encounteredStatistic = saveData.statistics.pokemonEncountered[pokemon.id] || 0;
                const hatchedStatistic = saveData.statistics.pokemonHatched[pokemon.id] || 0;
                const shinyCapturedStatistic = saveData.statistics.shinyPokemonCaptured[pokemon.id] || 0;
                const shinyDefeatedStatistic = saveData.statistics.shinyPokemonDefeated[pokemon.id] || 0;
                const shinyEncounteredStatistic = saveData.statistics.shinyPokemonEncountered[pokemon.id] || 0;
                const shinyHatchedStatistic = saveData.statistics.shinyPokemonHatched[pokemon.id] || 0;

                if (pokemonMap[pokemon.id].gender.type == GameConstants.Genders.MaleFemale) { // No genderless
                    if (pokemonMap[pokemon.id].gender.femaleRatio != 1) { // Anything but female-only
                        saveData.statistics.malePokemonCaptured[pokemon.id] = capturedStatistic;
                        saveData.statistics.malePokemonDefeated[pokemon.id] = defeatedStatistic;
                        saveData.statistics.malePokemonEncountered[pokemon.id] = encounteredStatistic;
                        saveData.statistics.malePokemonHatched[pokemon.id] = hatchedStatistic;

                        saveData.statistics.shinyMalePokemonCaptured[pokemon.id] = shinyCapturedStatistic;
                        saveData.statistics.shinyMalePokemonDefeated[pokemon.id] = shinyDefeatedStatistic;
                        saveData.statistics.shinyMalePokemonEncountered[pokemon.id] = shinyEncounteredStatistic;
                        saveData.statistics.shinyMalePokemonHatched[pokemon.id] = shinyHatchedStatistic;

                        // Assign the generic total ones to the male ones
                        saveData.statistics.totalMalePokemonCaptured += capturedStatistic;
                        saveData.statistics.totalMalePokemonDefeated += defeatedStatistic;
                        saveData.statistics.totalMalePokemonEncountered += encounteredStatistic;
                        saveData.statistics.totalMalePokemonHatched += hatchedStatistic;

                        saveData.statistics.totalShinyMalePokemonCaptured += shinyCapturedStatistic;
                        saveData.statistics.totalShinyMalePokemonDefeated += shinyDefeatedStatistic;
                        saveData.statistics.totalShinyMalePokemonEncountered += shinyEncounteredStatistic;
                        saveData.statistics.totalShinyMalePokemonHatched += shinyHatchedStatistic;
                    } else { // Female-only
                        saveData.statistics.femalePokemonCaptured[pokemon.id] = capturedStatistic;
                        saveData.statistics.femalePokemonDefeated[pokemon.id] = defeatedStatistic;
                        saveData.statistics.femalePokemonEncountered[pokemon.id] = encounteredStatistic;
                        saveData.statistics.femalePokemonHatched[pokemon.id] = hatchedStatistic;

                        saveData.statistics.shinyFemalePokemonCaptured[pokemon.id] = shinyCapturedStatistic;
                        saveData.statistics.shinyFemalePokemonDefeated[pokemon.id] = shinyDefeatedStatistic;
                        saveData.statistics.shinyFemalePokemonEncountered[pokemon.id] = shinyEncounteredStatistic;
                        saveData.statistics.shinyFemalePokemonHatched[pokemon.id] = shinyHatchedStatistic;

                        // Assign the generic total ones to the female ones
                        saveData.statistics.totalFemalePokemonCaptured += capturedStatistic;
                        saveData.statistics.totalFemalePokemonDefeated += defeatedStatistic;
                        saveData.statistics.totalFemalePokemonEncountered += encounteredStatistic;
                        saveData.statistics.totalFemalePokemonHatched += hatchedStatistic;

                        saveData.statistics.totalShinyFemalePokemonCaptured += shinyCapturedStatistic;
                        saveData.statistics.totalShinyFemalePokemonDefeated += shinyDefeatedStatistic;
                        saveData.statistics.totalShinyFemalePokemonEncountered += shinyEncounteredStatistic;
                        saveData.statistics.totalShinyFemalePokemonHatched += shinyHatchedStatistic;
                    }
                } else { // Genderless
                    // Assign the generic total ones to the genderless ones
                    saveData.statistics.totalGenderlessPokemonCaptured += capturedStatistic;
                    saveData.statistics.totalGenderlessPokemonDefeated += defeatedStatistic;
                    saveData.statistics.totalGenderlessPokemonEncountered += encounteredStatistic;
                    saveData.statistics.totalGenderlessPokemonHatched += hatchedStatistic;

                    saveData.statistics.totalShinyGenderlessPokemonCaptured += shinyCapturedStatistic;
                    saveData.statistics.totalShinyGenderlessPokemonDefeated += shinyDefeatedStatistic;
                    saveData.statistics.totalShinyGenderlessPokemonEncountered += shinyEncounteredStatistic;
                    saveData.statistics.totalShinyGenderlessPokemonHatched += shinyHatchedStatistic;
                }
            });
            // Update Region filter from integer to bitfield.
            if (settingsData.breedingRegionFilter == -2) {
                settingsData.breedingRegionFilter = (2 << playerData.highestRegion) - 1;
            } else {
                settingsData.breedingRegionFilter = 1 << settingsData.breedingRegionFilter;
            }
        },

        '0.10.1': ({ playerData, saveData }) => {
            // Brawlers Cave renamed
            if (playerData._townName == 'Brawlers Cave') {
                playerData._townName = 'Brawlers\' Cave';
            }

            // Remove cleared BF milestones from save if corresponding Pokémon is not in party
            if (saveData?.battleFrontier?.milestones?.length) {
                const pokemonRewards = [
                    ['Deoxys', 386],
                    ['Deoxys (Attack)', 386.1],
                    ['Deoxys (Defense)', 386.2],
                    ['Deoxys (Speed)', 386.3],
                    ['Vivillon (Poké Ball)', 666.01],
                ];

                // Find Pokémon rewards that are not in our party
                pokemonRewards
                    .filter(([name, id]) => {
                        return saveData.party.caughtPokemon.filter(p => p.id === id).length < 1;
                    })
                    // And remove any cleared milestones corresponding to missing Pokémon
                    .forEach(([name, id]) => {
                        saveData.battleFrontier.milestones = saveData.battleFrontier.milestones.filter(milestone => milestone[1] !== name);
                    });
            }
        },
        '0.10.2': ({ playerData, saveData }) => {
            // Kecleon Fights
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 15);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 16);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 17);
            // Zero Temporary Battle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 32);

            // Dream Researcher fight
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 53);

            // Korrina fight
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 54);

            // Translations
            saveData.logbook.logs.forEach(
                log => log.content = createLogContent.notTranslated({ text: log.description })
            );

            // Rotate form IDs
            const formIDs = [
                // Vivillon (Poke Ball to before Fancy, Icy Snow to before Polar)
                [666.01, 666.18, 666.17, 666.16, 666.15, 666.14, 666.13, 666.12, 666.11, 666.1, 666.09, 666.08, 666.07],
                // Flabebe line (swap Blue and Orange)
                [669.02, 669.03],
                [670.02, 670.03],
                [671.02, 671.03],
                // ROYGBIV Minior instead of BGIORVY
                [774.01, 774.05],
                [774.02, 774.04],
                [774.03, 774.06, 774.07],
            ];

            formIDs.forEach(list => Update.rotatePokemonIDs(saveData, list));

            // Meltan  Temp Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 85);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 86);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 87);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 88);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 89);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 90);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 91);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 92);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 93);

            // Kanto starter should be saved in regionStarter, unless they update a very old save
            if (!playerData.regionStarters) {
                playerData.regionStarters = [playerData.starter];
            }

            // Rivals Temp Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 0);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 1);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 2);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 3);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 13);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 14);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 16);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 17);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 18);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 26);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 27);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 28);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 29);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 30);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 31);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 32);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 36);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 37);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 51);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 52);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 53);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 54);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 56);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 57);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 58);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 60);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 61);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 63);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 66);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 67);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 68);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 73);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 87);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 88);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 89);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 91);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 92);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 93);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 94);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 95);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 103);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 104);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 105);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 106);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 107);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 108);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 109);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 110);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 122);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 123);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 124);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 125);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 126);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 127);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 128);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 129);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 130);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 131);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 133);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 134);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 135);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 136);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 145);
        },
        '0.10.3': ({ playerData, saveData }) => {
            const johtoBeastQL = saveData.quests.questLines.find((q) => q.name == 'The Legendary Beasts');
            if (johtoBeastQL && johtoBeastQL.state == 1 && johtoBeastQL.quest == 3 && johtoBeastQL.initial instanceof Array) {
                johtoBeastQL.quest = 4;
            }
            // On the Rival fight, but already beat it before the quest
            if (johtoBeastQL && johtoBeastQL.state == 1 && johtoBeastQL.quest == 2 && johtoBeastQL.initial > 0) {
                johtoBeastQL.initial = 0;
            }
        },
        '0.10.4': ({ playerData, saveData }) => {
            // Adding Magikarp Jump badges
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 101);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 102);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 103);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 104);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 105);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 106);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 107);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 108);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 109);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 110);

            // Update starter pokerus status if it wasn't infected after unlocking the key item
            if (saveData.keyItems.Pokerus_virus) {
                let starter;
                switch (playerData.regionStarters[0]) {
                    case 0:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 1);
                        break;
                    case 1:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 4);
                        break;
                    case 2:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 7);
                        break;
                    case 3:
                        starter = saveData.party.caughtPokemon.find(p => p.id == 25);
                        break;
                }
                if (starter && (!starter[8] || starter[8] == 0)) {
                    starter[8] = 2;
                }
            }

        },

        '0.10.5': ({ playerData, saveData, settingsData }) => {
            // Red temporary battle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 28);
            // Magikarp Jump Temp Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 160);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 161);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 162);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 163);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 164);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 165);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 166);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 167);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 168);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 169);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 170);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 171);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 172);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 173);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 174);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 175);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 176);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 177);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 178);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 179);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 180);

            // Rotate form IDs
            const formIDs = [
                // Butterfree (Gigantamax before others)
                [12.01, 12.02, 12.03, 12.04],
                //Pikachu (Put World Cap after Alola Cap, Gigantamax after Partner Cap)
                [25.07, 25.08, 25.09, 25.10, 25.11, 25.12],
                [25.09, 25.10, 25.11, 25.12, 25.13, 25.14],
            ];

            formIDs.forEach(list => Update.rotatePokemonIDs(saveData, list));

            // Move IDs from .x to .0x for consistency
            const consistentIDs = [
                [1.1, 1.01],
                [1.2, 1.02],
                [1.3, 1.03],
                [2.1, 2.01],
                [2.2, 2.02],
                [2.3, 2.03],
                [3.1, 3.03],
                [3.2, 3.04],
                [3.3, 3.05],
                [4.1, 4.01],
                [5.1, 5.01],
                [6.1, 6.04],
                [7.1, 7.01],
                [8.1, 8.01],
                [9.1, 9.03],
                [21.1, 21.01],
                [52.01, 52.02],
                [52.2, 52.03],
                [77.1, 77.01],
                [78.1, 78.01],
                [79.1, 79.01],
                [80.1, 80.02],
                [83.1, 83.01],
                [110.01, 110.02],
                [110.1, 110.01],
                [122.1, 122.01],
                [133.1, 133.02],
                [143.1, 143.02],
                [144.1, 144.01],
                [145.1, 145.01],
                [146.1, 146.01],
                [150.1, 150.03],
                [172.1, 172.01],
                [175.1, 175.01],
                [175.2, 175.02],
                [176.1, 176.01],
                [199.1, 199.01],
                [208.1, 208.02],
                [222.1, 222.01],
                [251.1, 251.02],
                [251.2, 251.01],
                [263.1, 263.01],
                [264.1, 264.01],
                [351.1, 351.01],
                [351.2, 351.02],
                [351.3, 351.03],
                [386.1, 386.01],
                [386.2, 386.02],
                [386.3, 386.03],
                [412.1, 412.01],
                [412.2, 412.02],
                [413.1, 413.01],
                [413.2, 413.02],
                [421.1, 421.01],
                [422.1, 422.01],
                [423.1, 423.01],
                [446.1, 446.01],
                [468.1, 468.01],
                [479.1, 479.01],
                [479.2, 479.02],
                [479.3, 479.03],
                [479.4, 479.04],
                [479.5, 479.05],
                [479.6, 479.06],
                [487.1, 487.01],
                [492.1, 492.01],
                [554.1, 554.01],
                [555.1, 555.01],
                [555.2, 555.02],
                [555.3, 555.03],
                [562.1, 562.01],
                [618.1, 618.01],
                [641.1, 641.01],
                [642.1, 642.01],
                [645.1, 645.01],
                [646.1, 646.01],
                [646.2, 646.02],
                [647.1, 647.01],
                [648.1, 648.01],
                [681.1, 681.01],
                [710.1, 710.01],
                [710.2, 710.02],
                [710.3, 710.03],
                [711.1, 711.01],
                [711.2, 711.02],
                [711.3, 711.03],
                [791.1, 791.01],
                [792.1, 792.01],
                [801.1, 801.01],
                [845.1, 845.01],
                [845.2, 845.02],
                [849.1, 849.01],
                [869.01, -869.01],
                [869.02, -869.02],
                [869.03, -869.03],
                [869.04, -869.04],
                [869.05, -869.05],
                [869.06, -869.06],
                [869.07, -869.07],
                [869.08, -869.08],
                [869.11, -869.11],
                [869.12, -869.12],
                [869.13, -869.13],
                [869.14, -869.14],
                [869.15, -869.15],
                [869.16, -869.16],
                [869.17, -869.17],
                [869.18, -869.18],
                [869.21, -869.21],
                [869.22, -869.22],
                [869.23, -869.23],
                [869.24, -869.24],
                [869.25, -869.25],
                [869.26, -869.26],
                [869.27, -869.27],
                [869.28, -869.28],
                [869.31, -869.31],
                [869.32, -869.32],
                [869.33, -869.33],
                [869.34, -869.34],
                [869.35, -869.35],
                [869.36, -869.36],
                [869.37, -869.37],
                [869.38, -869.38],
                [869.41, -869.41],
                [869.42, -869.42],
                [869.43, -869.43],
                [869.44, -869.44],
                [869.45, -869.45],
                [869.46, -869.46],
                [869.47, -869.47],
                [869.48, -869.48],
                [869.51, -869.51],
                [869.52, -869.52],
                [869.53, -869.53],
                [869.54, -869.54],
                [869.55, -869.55],
                [869.56, -869.56],
                [869.57, -869.57],
                [869.58, -869.58],
                [869.61, -869.61],
                [869.62, -869.62],
                [869.63, -869.63],
                [869.64, -869.64],
                [869.65, -869.65],
                [869.66, -869.66],
                [869.67, -869.67],
                [869.68, -869.68],
                [-869.01, 869.06],
                [-869.02, 869.07],
                [-869.03, 869.04],
                [-869.04, 869.01],
                [-869.05, 869.02],
                [-869.06, 869.08],
                [-869.07, 869.03],
                [-869.08, 869.05],
                [-869.11, 869.16],
                [-869.12, 869.17],
                [-869.13, 869.14],
                [-869.14, 869.11],
                [-869.15, 869.12],
                [-869.16, 869.18],
                [-869.17, 869.13],
                [-869.18, 869.15],
                [-869.21, 869.26],
                [-869.22, 869.27],
                [-869.23, 869.24],
                [-869.24, 869.21],
                [-869.25, 869.22],
                [-869.26, 869.28],
                [-869.27, 869.23],
                [-869.28, 869.25],
                [-869.31, 869.36],
                [-869.32, 869.37],
                [-869.33, 869.34],
                [-869.34, 869.31],
                [-869.35, 869.32],
                [-869.36, 869.38],
                [-869.37, 869.33],
                [-869.38, 869.35],
                [-869.41, 869.46],
                [-869.42, 869.47],
                [-869.43, 869.44],
                [-869.44, 869.41],
                [-869.45, 869.42],
                [-869.46, 869.48],
                [-869.47, 869.43],
                [-869.48, 869.45],
                [-869.51, 869.56],
                [-869.52, 869.57],
                [-869.53, 869.54],
                [-869.54, 869.51],
                [-869.55, 869.52],
                [-869.56, 869.58],
                [-869.57, 869.53],
                [-869.58, 869.55],
                [-869.61, 869.66],
                [-869.62, 869.67],
                [-869.63, 869.64],
                [-869.64, 869.61],
                [-869.65, 869.62],
                [-869.66, 869.68],
                [-869.67, 869.63],
                [-869.68, 869.65],
                [875.1, 875.01],
                [876.1, 876.01],
                [877.1, 877.01],
                [888.1, 888.01],
                [889.1, 889.01],
                [892.1, 892.01],
                [893.1, 893.01],
                [898.1, 898.01],
                [898.2, 898.02],
            ];

            consistentIDs.forEach(([oldID, newID]) => {
                // Update all the Pokemon IDs
                Update.updatePokemonId(saveData, oldID, newID);
            });

            // Update proteins → vitamins
            saveData.challenges.list.disableVitamins = saveData.challenges.list.disableProteins || false;
            saveData.statistics.totalVitaminsObtained = saveData.statistics.totalProteinsObtained || 0;
            saveData.statistics.totalVitaminsPurchased = saveData.statistics.totalProteinsPurchased || 0;
            // Delete our old statistics
            delete saveData.statistics.totalProteinsObtained;
            delete saveData.statistics.totalProteinsPurchased;

            // Update Vitamins used
            saveData.party.caughtPokemon.forEach(p => {
                // Check Proteins used
                if (p[2]) {
                    // Update Proteins used
                    p[2] = {
                        0: p[2],
                    };
                }
            });

            // Update our settings
            settingsData.vitaminSort = settingsData.proteinSort;
            settingsData.vitaminSortDirection = settingsData.proteinSortDirection;
            settingsData.vitaminHideMaxedPokemon = settingsData.proteinHideMaxedPokemon;
            settingsData.vitaminHideShinyPokemon = settingsData.proteinHideShinyPokemon;
            settingsData.vitaminSearchFilter = settingsData.proteinSearchFilter;
            settingsData.vitaminRegionFilter = settingsData.proteinRegionFilter;
            settingsData.vitaminTypeFilter = settingsData.proteinTypeFilter;
            // Delete old settings
            delete settingsData.proteinSort;
            delete settingsData.proteinSortDirection;
            delete settingsData.proteinHideMaxedPokemon;
            delete settingsData.proteinHideShinyPokemon;
            delete settingsData.proteinSearchFilter;
            delete settingsData.proteinRegionFilter;
            delete settingsData.proteinTypeFilter;

            // Fix Galar main story temp battles
            const darkestDayQL = saveData.quests.questLines.find((q) => q.name == 'The Darkest Day');
            if (darkestDayQL?.state < 2) {
                // Fix temp battle indicies based on quest step.
                if (darkestDayQL.quest <= 1) {
                    saveData.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Bede 3')] = 0;
                }
                if (darkestDayQL.quest <= 3) {
                    saveData.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Hop 6')] = 0;
                }
                if (darkestDayQL.quest <= 4) {
                    saveData.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Hop 7')] = 0;
                }
                if (darkestDayQL.quest <= 17) {
                    saveData.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('Eternatus')] = 0;
                }
                if (darkestDayQL.quest <= 18) {
                    saveData.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex('The Darkest Day')] = 0;
                }
            }
            // Suicune Quest autostart for players too far in Legendary Beasts quest
            const johtoBeastsQuestLine = saveData.quests.questLines.find((q) => q.name == 'The Legendary Beasts');
            const johtoSuicuneQuestLine = saveData.quests.questLines.find((q) => q.name == 'Eusine\'s Chase');
            if (johtoBeastsQuestLine?.state == 2 || (johtoBeastsQuestLine?.state == 1 && johtoBeastsQuestLine?.quest >= 4)) {
                if (!johtoSuicuneQuestLine) {
                // add to array
                    saveData.quests.questLines.push({
                        state: 1,
                        name: 'Eusine\'s Chase',
                        quest: 0,
                    });
                } else if (johtoSuicuneQuestLine.state == 0) {
                // activate quest
                    johtoSuicuneQuestLine.state = 1;
                }
            }
            //Red Gyarados
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 22);
        },

        '0.10.6': ({ playerData, saveData }) => {
            // Give the player any missing questline or temporary battle rewards
            Update.giveMissingQuestLineProgressRewardPokemon(saveData, 'Unfinished Business', 8, 172.01);
            Update.giveMissingQuestLineProgressRewardPokemon(saveData, 'Princess Diancie', 6, 681.01);
            Update.giveMissingQuestLineProgressRewardPokemon(saveData, 'A Mystery Gift', 1, 801.01);
            Update.giveMissingTempBattleRewardPokemon(saveData, 123, 25.14); // Ash Ketchum Pinkan
            Update.giveMissingTempBattleRewardPokemon(saveData, 151, 25.08); // Ash Ketchum Alola
            if (saveData.statistics.dungeonsCleared[157] > 0) { // Tower of Waters
                Update.giveMissingPokemon(saveData, 892.01);
            }

            // Set 'Team Plasma Grunt 1' to 0 if quest step not completed
            Update.fixTempBattleState(saveData, 64, 0, 'Quest for the DNA Splicers', 0);
            // Set Cyrus as complete if 'A New World' completed
            Update.fixTempBattleState(saveData, 57, 1, 'A New World', 3);
        },

        '0.10.7': ({ playerData, saveData }) => {
            //JirachiQuest
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 40);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 41);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 42);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 43);
        },

        '0.10.8': ({ playerData, saveData }) => {
            //Grand Duchess Diantha
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 129);
        },

        '0.10.9': ({ playerData, saveData }) => {

            saveData.pokeballs.alreadyCaughtContagiousSelection = saveData.pokeballs.alreadyCaughtSelection;

            //Hex Maniac Aster
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 112);

            //ManaphyQuest
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 65);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 66);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 67);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 68);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 69);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 70);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 71);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 72);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 73);

            //Marquis Grant
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 139);

            //Latios Latias Quest
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 44);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 45);
        },

        '0.10.10': ({ playerData, saveData, settingsData }) => {
            // Bill's Grandpa
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);

            //Mega Manectric/Houndoom
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 144);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 145);

            // Derive Trainer Id from linked Discord Id to preserve Enigma hints
            if (saveData?.discord?.ID) {
                const getDerivedTrainerId = (discordId: number) => {
                    const MULTIPLIER = 9301;
                    const OFFSET = 49297;
                    const MOD = 233280;
                    let val = (discordId * MULTIPLIER + OFFSET) % MOD;
                    val = (val - OFFSET + MOD) % MOD;
                    val = (val * 123901) % MOD;
                    return val;
                };
                const trainerId = getDerivedTrainerId(saveData.discord.ID);
                playerData.trainerId = trainerId.toString().padStart(6, '0');
            }

            // Delta Episode
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 115);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 116);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 117);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 118);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 119);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 120);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 121);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 122);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 123);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 124);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 125);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 126);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 127);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 128);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 129);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 130);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 131);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 132);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 133);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 134);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 135);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 136);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 137);

            // Add Near Space dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 56);

            // Mega Diancie
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 156);

            // If Distortion World has been cleared and no Pokémon in our party has Pokérus, infect the first Pokémon in our party
            if (saveData.statistics.dungeonsCleared[72] && !saveData.party.caughtPokemon.some(pokemon => pokemon[8] > 0)) {
                saveData.party.caughtPokemon[0][8] = 2;
            }

            //Joey
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 31);
        },

        '0.10.11': ({ playerData, saveData, settingsData }) => {
            // Hoenn Stone Shop fight
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 139);

            // Updates Sorting
            if (settingsData.hatcherySort > 5) {
                settingsData.hatcherySort++;
            }
            if (settingsData.partySort > 5) {
                settingsData.partySort++;
            }
            if (settingsData.vitaminSort > 5) {
                settingsData.vitaminSort++;
            }
            if (settingsData.heldItemSort > 5) {
                settingsData.heldItemSort++;
            }
            saveData.breeding.hatcheryHelpers?.forEach(helper => {
                if (helper.sortOption > 5) {
                    helper.sortOption++;
                }
            });

            // Update categories and fix category filters
            const max = saveData.categories.categories.length - 1;
            saveData.categories.categories.forEach((c, id) => {
                c.id = id;
            });
            if (settingsData.pokedexCategoryFilter > max) {
                settingsData.pokedexCategoryFilter = -1;
            }
            if (settingsData.breedingCategoryFilter > max) {
                settingsData.breedingCategoryFilter = -1;
            }

            // Reset Blue 5 to undefeated if he has been defeated before reaching the quest step to battle him
            const teamRocketQuestLine = saveData.quests.questLines.find((q) => q.name == 'Team Rocket');
            if (saveData.statistics.temporaryBattleDefeated[7]
                && (teamRocketQuestLine?.state == 0 || (teamRocketQuestLine?.state == 1 && teamRocketQuestLine?.quest <= 2))
            ) {
                saveData.statistics.temporaryBattleDefeated[7] = 0;
            }

            // Add Phenac City Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 57);

            // Add Pyrite Town Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 58);

            // Add Pyrite Colosseum Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 59);

            // Add Pyrite Blgd dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 60);

            // Add Pyrite Cave dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 61);

            // Add Relic Cave dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 62);

            // Add Mt. Battle Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 63);

            // Add The Under Subway dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 64);

            // Add Cipher Lab Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 65);

            // Add Realgam Tower Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 66);

            // Add Realgam Colosseum Battles dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 67);

            // Add Snagem Hideout dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 68);

            // Add Deep Colosseum dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 69);

            // Add Phenac Stadium dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 70);

            // Add Under Colosseum dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 71);

            // Add Orre Colosseum dungeon
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 72);

            //Team Flare Grunt 1
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 114);

            //Team Flare Grunt 2
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 115);

            //Team Flare Lysandre
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 152);

            //Team Flare Xerosic
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 153);

            //Xerneas
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 154);

            //Yveltal
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 155);

            //Team Flare Boss Lysandre 1
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 156);

            //Storyline AZ
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 166);

            //Team Flare Boss Lysandre 2
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 178);

            // Start Team Flare questline if player has beaten Sycamore 1 already
            if (saveData.statistics.temporaryBattleDefeated[111]) {
                Update.startQuestLine(saveData, 'A Beautiful World');
            }

            // Move pokeball selections onto new filters
            saveData.pokeballFilters = {
                list: [
                    {
                        name: 'Caught',
                        options: { caught: true },
                        ball: saveData.pokeballs?.alreadyCaughtSelection ?? GameConstants.Pokeball.None,
                    },
                    {
                        name: 'Contagious',
                        options: { pokerus: GameConstants.Pokerus.Contagious },
                        ball: saveData.pokeballs?.alreadyCaughtContagiousSelection ?? GameConstants.Pokeball.None,
                    },
                    {
                        name: 'Caught Shiny',
                        options: { shiny: true, caughtShiny: true },
                        ball: saveData.pokeballs?.alreadyCaughtShinySelection ?? GameConstants.Pokeball.Pokeball,
                    },
                    {
                        name: 'New',
                        options: { caught: false },
                        ball: saveData.pokeballs?.notCaughtSelection ?? GameConstants.Pokeball.Pokeball,
                    },
                    {
                        name: 'New Shiny',
                        options: { shiny: true, caughtShiny: false },
                        ball: saveData.pokeballs?.notCaughtShinySelection ?? GameConstants.Pokeball.Pokeball,
                    },
                ],
            };

            // Add Hisui Gyms
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 114);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 115);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 116);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 117);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 118);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 119);

            //Primal Reversion battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 142);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 143);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 144);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 145);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 146);

            // Mega Stones are items now!
            // Give the player the Mega Stone if they own the Mega form or have the mega stone on the base form.
            // Then delete the megaStone property on all caught pokemon.
            const updateMegaStone = (megaStone: string, basePokemonId: number, megaPokemonId: number) => {
                const basePokemon = saveData.party.caughtPokemon.find(p => p.id === basePokemonId);
                const megaPokemon = saveData.party.caughtPokemon.find(p => p.id === megaPokemonId);
                if (megaPokemon || (basePokemon?.[14])) {
                    playerData._itemList[megaStone] = 1;
                }
            };

            updateMegaStone('Abomasite', 460, 460.01); // Abomasnow
            updateMegaStone('Absolite', 359, 359.01); // Absol
            updateMegaStone('Aerodactylite', 142, 142.01); // Aerodactyl
            updateMegaStone('Aggronite', 306, 306.01); // Aggron
            updateMegaStone('Alakazite', 65, 65.01); // Alakazam
            updateMegaStone('Ampharosite', 181, 181.01); // Ampharos
            updateMegaStone('Audinite', 531, 531.01); // Audino
            updateMegaStone('Beedrillite', 15, 15.01); // Beedrill
            updateMegaStone('Cameruptite', 323, 323.01); // Camerupt
            updateMegaStone('Diancite', 719, 719.01); // Diancie
            updateMegaStone('Galladite', 475, 475.01); // Gallade
            updateMegaStone('Garchompite', 445, 445.01); // Garchomp
            updateMegaStone('Gardevoirite', 282, 282.01); // Gardevoir
            updateMegaStone('Gengarite', 94, 94.01); // Gengar
            updateMegaStone('Glalitite', 362, 362.01); // Glalie
            updateMegaStone('Heracronite', 214, 214.01); // Heracross
            updateMegaStone('Houndoominite', 229, 229.01); // Houndoom
            updateMegaStone('Kangaskhanite', 115, 115.01); // Kangaskhan
            updateMegaStone('Latiasite', 380, 380.01); // Latias
            updateMegaStone('Latiosite', 381, 381.01); // Latios
            updateMegaStone('Lopunnite', 428, 428.01); // Lopunny
            updateMegaStone('Lucarionite', 448, 448.01); // Lucario
            updateMegaStone('Manectite', 310, 310.01); // Manectric
            updateMegaStone('Mawilite', 303, 303.01); // Mawile
            updateMegaStone('Metagrossite', 376, 376.01); // Metagross
            updateMegaStone('Meteorite', 384, 384.01); // Rayquaza
            updateMegaStone('Pidgeotite', 18, 18.01); // Pidgeot
            updateMegaStone('Sablenite', 302, 302.01); // Sableye
            updateMegaStone('Salamencite', 373, 373.01); // Salamence
            updateMegaStone('Sharpedonite', 319, 319.01); // Sharpedo
            updateMegaStone('Slowbronite', 80, 80.01); // Slowbro
            updateMegaStone('Steelixite', 208, 208.01); // Steelix
            updateMegaStone('Tyranitarite', 248, 248.01); // Tyranitar

            saveData.party.caughtPokemon.forEach(p => {
                delete p[14]; // megaStone
            });
        },

        '0.10.12': ({ playerData, saveData, settingsData }) => {
            // Rename Unova's Quest for the DNA Splicers questline
            saveData.quests.questLines.forEach(v => {
                if (v.name === 'Quest for the DNA Splicers') {
                    v.name = 'Hollow Truth and Ideals';
                }
            });

            //Colosseum battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 48);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 49);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 50);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 51);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 52);

            //Kalos Stone Salesman battle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 147);

            //Silvally Types
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 215);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 216);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 217);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 218);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 219);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 220);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 221);

            // Adding Orre badges
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 45);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 46);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 47);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 48);

            // Changing MissingResistant to match new default
            if (settingsData['--missingResistant'] === '#ffffff') {
                settingsData['--missingResistant'] = Settings.getSetting('--missingResistant').defaultValue;
            }
        },

        '0.10.13': ({ playerData, saveData, settingsData }) => {
            // Fix up any decoding errors from v0.10.12
            const decodeStringsDeep = (obj) => {
                Object.keys(obj).forEach(key => {
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        decodeStringsDeep(obj[key]);
                    }
                    if (typeof obj[key] === 'string') {
                        try {
                            obj[key] = decodeURI(obj[key]);
                        } catch (e) {
                            console.warn('Unable to decode save file string', obj[key]);
                        }
                    }
                });
            };

            // try and decode our data
            decodeStringsDeep(saveData);
            decodeStringsDeep(playerData);
            decodeStringsDeep(settingsData);

            // Fix up Zero's Ambition questline restarting
            if (saveData.party.caughtPokemon.find(p => p.id === 487)) { // If Giratina Altered caught
                const zeroQuestLine = saveData.quests.questLines.find(q => q.name === 'Zero\'s Ambition');
                if (zeroQuestLine) {
                    zeroQuestLine.state = 2;
                }
            } else if (saveData.statistics.temporaryBattleDefeated[83] >= 1) { // If zero temp battle defeated
                const zeroQuestLine = saveData.quests.questLines.find(q => q.name === 'Zero\'s Ambition');
                if (zeroQuestLine) {
                    zeroQuestLine.state = 1;
                    zeroQuestLine.quest = 14;
                    zeroQuestLine.initial = 0;
                }
            }

            // Fix up Zero's Ambition questline starting early
            const zeroQuestLine = saveData.quests.questLines.find(q => q.name === 'Zero\'s Ambition');
            if (zeroQuestLine && zeroQuestLine.state === 1) {
                // Quest is started, check if the player has the rquirements for starting the quest
                const caughtUxie = saveData.party.caughtPokemon.find(p => p.id === 480);
                const caughtMesprit = saveData.party.caughtPokemon.find(p => p.id === 481);
                const caughtAzelf = saveData.party.caughtPokemon.find(p => p.id === 482);
                const hasSinnohChampionBadge = !!saveData.badgeCase[61];
                // If any of these requirements are not met, reset the questline
                if (!caughtUxie || !caughtMesprit || !caughtAzelf || !hasSinnohChampionBadge) {
                    zeroQuestLine.state = 0;
                    zeroQuestLine.quest = 0;
                    zeroQuestLine.initial = 0;
                }
            }
        },

        '0.10.14': ({ playerData, saveData, settingsData }) => {

            // Hoopa battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 167);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 168);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 169);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 170);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 171);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 172);

            // Add XD dungeons
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 73);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 74);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 75);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 76);

            // Update Mewtwo Strikes Back! event
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 12);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);

            // Add XD Temp Battles

            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 54);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 55);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 56);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 57);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 58);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 59);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 60);

            // Add Mega Mewtwo battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 205);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 206);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 207);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 208);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 209);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 210);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 211);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 212);

            // Max Raids
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 340);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 341);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 342);
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 189);

            // ZCrystals
            const crystalOrder = [
                'Normalium Z',
                'Fightinium Z',
                'Waterium Z',
                'Firium Z',
                'Grassium Z',
                'Rockium Z',
                'Electrium Z',
                'Ghostium Z',
                'Darkinium Z',
                'Dragonium Z',
                'Fairium Z',
                'Groundium Z',
            ];
            const crystalFirstID = 88;
            crystalOrder.forEach((crystalName, rid) => {
                if (!!saveData.badgeCase[crystalFirstID + rid]) {
                    playerData._itemList[crystalName] = 1;
                }
            });

            // Fixing Silvally item amounts
            Object.keys(playerData._itemList).filter(itemName => itemName.includes('Memory_Silvally')).forEach(itemName => playerData._itemList[itemName] = Math.min(1, playerData._itemList[itemName]));

            //Replace Blaze Cassette with Magma Stone
            saveData.oakItems.Magma_Stone = saveData.oakItems.Blaze_Cassette;
            delete saveData.oakItems.Blaze_Cassette;

            // Snover Berry
            saveData.farming.berryList = Update.moveIndex(saveData.farming.berryList, 54);
            saveData.farming.unlockedBerries = Update.moveIndex(saveData.farming.unlockedBerries, 54);
            saveData.farming.mutations = Update.moveIndex(saveData.farming.mutations, 50);
            saveData.statistics.berriesHarvested = Update.moveIndex(saveData.statistics.berriesHarvested, 54);
            saveData.statistics.berriesObtained = Update.moveIndex(saveData.statistics.berriesObtained, 54);
            saveData.farming.plotList.forEach(p => {
                if (p.berry >= 54) {
                    p.berry++;
                }
            });

            // Add milestone for Vivillon (Poké Ball) if the quest is complete.
            const vivillonQuestLine = saveData.quests.questLines.find((q) => q.name == 'The Great Vivillon Hunt!');
            if (saveData.battleFrontier?.milestones && vivillonQuestLine?.state == 2) {
                saveData.battleFrontier.milestones.push([666, 'Vivillon (Poké Ball)']);
            }

            // Add Paldea Gyms
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 120);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 121);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 122);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 123);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 124);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 125);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 126);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 127);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 128);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 129);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 130);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 131);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 132);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 133);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 134);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 135);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 136);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 137);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 138);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 139);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 140);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 141);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 142);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 143);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 144);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 145);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 146);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 147);
            saveData.statistics.gymsDefeated = Update.moveIndex(saveData.statistics.gymsDefeated, 148);

            // Remove Orre Colosseum Dungeon
            saveData.statistics.dungeonsCleared.splice(73, 1);

            // Adding Orre XD badges
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 49);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 50);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 51);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 52);
            saveData.badgeCase = Update.moveIndex(saveData.badgeCase, 53);

            // Reset Red temp battle
            saveData.statistics.temporaryBattleDefeated[31] = 0;

        },
        '0.10.16': ({ playerData, saveData, settingsData }) => {


            // Fix None category color being incomplete
            if (saveData.categories.categories[0].color === '#333') {
                saveData.categories.categories[0].color = '#333333';
            }

            // ClearBattleFrontier → ClearBattleFrontierQuest
            saveData.quests.questList = saveData.quests.questList?.map(q => {
                if (q.name == 'ClearBattleFrontier') {
                    q.name = 'ClearBattleFrontierQuest';
                }
                return q;
            }) || [];

            // Add Genesect Quest Battles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 122);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 123);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 124);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 125);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 126);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 127);

            // Remove erroneous BreedingFilter search setting
            delete settingsData[''];

        },
    };

    constructor() {
        const saveData = this.getSaveData();
        if (saveData) {
            this.fromJSON(saveData.update, true);
        }

        // Start our update check
        this.checkForNewerVersionOnInterval();
    }

    checkForNewerVersionOnInterval() {
        // Lets check every 3 hours for a newer version
        const checkForNewVersionInterval = setInterval(() => {
            try {
                $.ajax({
                    cache: false,
                    url: './package.json',
                    dataType: 'json',
                    success: result => {
                        // If the website version is newer
                        if (this.isNewerVersion(result.version, this.version)) {
                            clearInterval(checkForNewVersionInterval);
                            Notifier.notify({
                                title: `[UPDATE] v${result.version}`,
                                message: 'A newer version of the game is available:\n\n<a class="btn btn-warning btn-block" href="#" onclick="location.reload(true);">Reload Page</a>',
                                timeout: GameConstants.DAY,
                            });
                        }
                    },
                });
            } catch (ಠ_ಠ) {
                console.error('[update] Unable to check for new version', ಠ_ಠ);
            }
        }, GameConstants.HOUR * 3);
    }

    // check if save version is newer or equal to version
    minUpdateVersion(version, saveData): boolean {
        return !this.isOlderVersion(saveData.update?.version, version);
    }

    // potentially newer version > check against version
    isNewerVersion(version, compareVersion): boolean {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === -1;
    }

    // potentially older version < check against version
    isOlderVersion(version, compareVersion): boolean {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === 1;
    }

    getBackupButton(): [HTMLElement, string] {
        const playerData = this.getPlayerData();
        const saveData = this.getSaveData();
        const settingsData = this.getSettingsData();

        // Save the data by stringifying it, so that it isn't mutated during update
        const backupSaveData = JSON.stringify({ player: playerData, save: saveData });

        const button = document.createElement('a');
        try {
            button.href = `data:text/plain;charset=utf-8,${encodeURIComponent(SaveSelector.btoa(backupSaveData))}`;
            button.className = 'btn btn-block btn-warning';
            button.innerText = 'Click to Backup Save!';
            const filename = settingsData.saveFilename || Settings.getSetting('saveFilename').defaultValue;
            const datestr = GameConstants.formatDate(new Date());
            button.setAttribute('download', GameHelper.saveFileName(filename, {'{date}' : datestr, '{version}' : this.saveVersion, '{name}' : saveData.profile.name}, true));
        } catch (e) {
            console.error('Failed to create backup button data:', e);
        }

        return [button, backupSaveData];
    }

    automaticallyDownloadBackup(button, settingsData) {
        // Add to body and click, triggering auto download
        if (!settingsData?.disableAutoDownloadBackupSaveOnUpdate) {
            button.style.display = 'none';
            document.body.appendChild(button);
            button.click();
            document.body.removeChild(button);
        }
        button.style.display = '';
    }

    check() {
        if (this.saveVersion === this.version) {
            return;
        }

        // Check if the save is newer than the current client, don't allow it to load.
        if (this.isNewerVersion(this.saveVersion, this.version)) {
            Notifier.notify({
                title: 'Save version is newer than game version!',
                message: `Please update your game before attempting to load this save..\n\nSave version: ${this.saveVersion}\nGame version: ${this.version}`,
                type: NotificationConstants.NotificationOption.danger,
                timeout: GameConstants.DAY,
            });
            throw new Error(`Save is newer than game version\nSave version: ${this.saveVersion}\nGame version: ${this.version}`);
            return;
        }

        const [backupButton, backupSaveData] = this.getBackupButton();

        // Must modify these object when updating
        const playerData = this.getPlayerData();
        const saveData = this.getSaveData();
        const settingsData = this.getSettingsData();

        if (!playerData || !saveData) {
            return;
        }

        const updateResult = Object.entries(this.updateSteps)
            .filter(([version]) => this.isOlderVersion(this.saveVersion, version))
            .sort(([a], [b]) => this.isNewerVersion(a, b) ? 1 : -1)
            .reduce((beforeUpdate, [version, callback]) => {
                // The parse(stringify(...)) will deep-clone the object so
                // that it isn't mutated, and we can log if something fails
                const updateData = JSON.parse(JSON.stringify(beforeUpdate));
                try {
                    console.info(`Applying update v${version}`);
                    callback(updateData);
                    return updateData;
                } catch (e) {
                    try {
                        localStorage.backupSave = backupSaveData;
                    } catch (e) {}

                    const resetButton = document.createElement('a');
                    resetButton.className = 'btn btn-block btn-danger';
                    resetButton.innerText = 'Reset your save - This is not reversible';
                    resetButton.id = 'failedUpdateResetButton';

                    console.error(`Caught error while applying update v${version}`, e, { beforeUpdate, updateData });
                    Notifier.notify({
                        title: `Failed to update to v${this.version}!`,
                        message: `Please check the console for errors, and report them on our <a class="text-light" href="https://discord.gg/a6DFe4p"><u>Discord</u></a> along with your save file.\n\n${backupButton.outerHTML}\n${resetButton.outerHTML}`,
                        type: NotificationConstants.NotificationOption.primary,
                        timeout: GameConstants.DAY,
                    });

                    // On the next tick, set the reset button click handler
                    setTimeout(() => {
                        document.getElementById('failedUpdateResetButton').onclick = () => {
                            Notifier.confirm({
                                title: 'Reset save',
                                message: 'Are you sure you want to reset your save?\n\nThis cannot be undone, so please make sure you have a backup first!',
                                type: NotificationConstants.NotificationOption.danger,
                                confirm: 'reset',
                            }).then(confirmed => {
                                if (confirmed) {
                                    // Force an autodownload of the backup when resetting the save
                                    this.automaticallyDownloadBackup(backupButton, { disableAutoDownloadBackupSaveOnUpdate: false });
                                    localStorage.removeItem(`player${Save.key}`);
                                    localStorage.removeItem(`save${Save.key}`);
                                    localStorage.removeItem(`settings${Save.key}`);
                                    location.reload();
                                }
                            });
                        };
                    }, 0);

                    // Rethrow the error to prevent the game from corrupting the save
                    throw e;
                }
            }, { playerData, saveData, settingsData });

        try {
            this.automaticallyDownloadBackup(backupButton, settingsData);
            Notifier.notify({
                title: `[v${this.version}] Game has been updated!`,
                message: `Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!\n\n${backupButton.outerHTML}`,
                type: NotificationConstants.NotificationOption.primary,
                timeout: 6e4,
            });
        } catch (err) {
            console.error('Error trying to convert backup save', err);
            Notifier.notify({
                title: `[v${this.version}] Game has been updated!`,
                message: 'Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!\n\n<i>Failed to download old save, Please check the console for errors, and report them on our <a class="text-light" href="https://discord.gg/a6DFe4p"><u>Discord</u></a>.</i>',
                type: NotificationConstants.NotificationOption.primary,
                timeout: 6e4,
            });
            try {
                localStorage.backupSave = backupSaveData;
            } catch (e) {}
            throw err;
        }

        // Update the save data version to our current version
        updateResult.saveData.update.version = this.version;

        this.setPlayerData(updateResult.playerData);
        this.setSaveData(updateResult.saveData);
        this.setSettingsData(updateResult.settingsData);
    }

    // Used for moving dungeons and other stuff
    // Be sure to insert from lowest index to highest index
    // Example to get dungeons new index: GameConstants.getDungeonIndex('Aqua Hideout')
    static moveIndex = (arr, to, from = Infinity, defaultVal = 0) => {
        let temp = arr.splice(from, 1);
        if (!temp.length) {
            temp = [defaultVal];
        }
        const end = arr.splice(to);
        arr = [...arr, ...temp, ...end];
        return arr;
    }

    // If any pokemon names change in the data rename them,
    // note that name isn't used in party.
    static changeHatcheryKey = (saveData, oldName, newName) => {
        if (!saveData.breeding) {
            return;
        }
        // Fixup eggs
        saveData.breeding.eggList?.forEach(egg => {
            if (egg.pokemon == oldName) {
                egg.pokemon = newName;
            }
        });

        // Fixup queue
        saveData.breeding.queueList = saveData.breeding.queueList?.map(p => p == oldName ? newName : p) || [];
    }

    // Swapping or Rotating Pokemon IDs
    static rotatePokemonIDs = (saveData, rotationlist: number[], keepLast = true) => {
        // save some characters
        const s = saveData.statistics;

        const lastID = rotationlist[rotationlist.length - 1];
        Update.changeHatcheryKey(saveData, lastID, 1e9);
        const lastPokemon = saveData.party.caughtPokemon.find(p => p.id === lastID);
        // Store values from last ID to not get overwritten
        const tempIDvalues = {
            // Store our last ID
            storedID: lastID,
            // Store our last ID statistics
            statistics:[
                s.pokemonEncountered[lastID],
                s.pokemonDefeated[lastID],
                s.pokemonCaptured[lastID],
                s.pokemonHatched[lastID],
                s.shinyPokemonEncountered[lastID],
                s.shinyPokemonDefeated[lastID],
                s.shinyPokemonCaptured[lastID],
                s.shinyPokemonHatched[lastID],

                s.malePokemonEncountered[lastID],
                s.malePokemonDefeated[lastID],
                s.malePokemonCaptured[lastID],
                s.malePokemonHatched[lastID],
                s.shinyMalePokemonEncountered[lastID],
                s.shinyMalePokemonDefeated[lastID],
                s.shinyMalePokemonCaptured[lastID],
                s.shinyMalePokemonHatched[lastID],

                s.femalePokemonEncountered[lastID],
                s.femalePokemonDefeated[lastID],
                s.femalePokemonCaptured[lastID],
                s.femalePokemonHatched[lastID],
                s.shinyFemalePokemonEncountered[lastID],
                s.shinyFemalePokemonDefeated[lastID],
                s.shinyFemalePokemonCaptured[lastID],
                s.shinyFemalePokemonHatched[lastID],
            ],
        };

        // Overwrite values of current ID with next ID
        // Loop backwards so when rotating a -> b -> c, we don't overwrite b stats before needing them
        for (let i = rotationlist.length - 1; i > 0; i--) {
            const fromID = rotationlist[i - 1];
            const toID = rotationlist[i];
            Update.changeHatcheryKey(saveData, fromID, toID);

            // Rotate our ID
            const pokemon = saveData.party.caughtPokemon.find(p => p.id === fromID);
            if (pokemon) {
                pokemon.id = toID;
            }

            // Rotate our statistics
            s.pokemonEncountered[toID] = s.pokemonEncountered[fromID];
            s.pokemonDefeated[toID] = s.pokemonDefeated[fromID];
            s.pokemonCaptured[toID] = s.pokemonCaptured[fromID];
            s.pokemonHatched[toID] = s.pokemonHatched[fromID];
            s.shinyPokemonEncountered[toID] = s.shinyPokemonEncountered[fromID];
            s.shinyPokemonDefeated[toID] = s.shinyPokemonDefeated[fromID];
            s.shinyPokemonCaptured[toID] = s.shinyPokemonCaptured[fromID];
            s.shinyPokemonHatched[toID] = s.shinyPokemonHatched[fromID];

            s.malePokemonEncountered[toID] = s.malePokemonEncountered[fromID];
            s.malePokemonDefeated[toID] = s.malePokemonDefeated[fromID];
            s.malePokemonCaptured[toID] = s.malePokemonCaptured[fromID];
            s.malePokemonHatched[toID] = s.malePokemonHatched[fromID];
            s.shinyMalePokemonEncountered[toID] = s.shinyMalePokemonEncountered[fromID];
            s.shinyMalePokemonDefeated[toID] = s.shinyMalePokemonDefeated[fromID];
            s.shinyMalePokemonCaptured[toID] = s.shinyMalePokemonCaptured[fromID];
            s.shinyMalePokemonHatched[toID] = s.shinyMalePokemonHatched[fromID];

            s.femalePokemonEncountered[toID] = s.femalePokemonEncountered[fromID];
            s.femalePokemonDefeated[toID] = s.femalePokemonDefeated[fromID];
            s.femalePokemonCaptured[toID] = s.femalePokemonCaptured[fromID];
            s.femalePokemonHatched[toID] = s.femalePokemonHatched[fromID];
            s.shinyFemalePokemonEncountered[toID] = s.shinyFemalePokemonEncountered[fromID];
            s.shinyFemalePokemonDefeated[toID] = s.shinyFemalePokemonDefeated[fromID];
            s.shinyFemalePokemonCaptured[toID] = s.shinyFemalePokemonCaptured[fromID];
            s.shinyFemalePokemonHatched[toID] = s.shinyFemalePokemonHatched[fromID];
        }

        const firstID = rotationlist[0];
        // Overwrite last values with first ID
        // Rotate our ID
        if (lastPokemon) {
            lastPokemon.id = firstID;
        }
        // Update last ID statistics
        Update.changeHatcheryKey(saveData, 1e9, firstID);
        s.pokemonEncountered[firstID] = tempIDvalues.statistics[0];
        s.pokemonDefeated[firstID] = tempIDvalues.statistics[1];
        s.pokemonCaptured[firstID] = tempIDvalues.statistics[2];
        s.pokemonHatched[firstID] = tempIDvalues.statistics[3];
        s.shinyPokemonEncountered[firstID] = tempIDvalues.statistics[4];
        s.shinyPokemonDefeated[firstID] = tempIDvalues.statistics[5];
        s.shinyPokemonCaptured[firstID] = tempIDvalues.statistics[6];
        s.shinyPokemonHatched[firstID] = tempIDvalues.statistics[7];

        s.malePokemonEncountered[firstID] = tempIDvalues.statistics[8];
        s.malePokemonDefeated[firstID] = tempIDvalues.statistics[9];
        s.malePokemonCaptured[firstID] = tempIDvalues.statistics[10];
        s.malePokemonHatched[firstID] = tempIDvalues.statistics[11];
        s.shinyMalePokemonEncountered[firstID] = tempIDvalues.statistics[12];
        s.shinyMalePokemonDefeated[firstID] = tempIDvalues.statistics[13];
        s.shinyMalePokemonCaptured[firstID] = tempIDvalues.statistics[14];
        s.shinyMalePokemonHatched[firstID] = tempIDvalues.statistics[15];

        s.femalePokemonEncountered[firstID] = tempIDvalues.statistics[16];
        s.femalePokemonDefeated[firstID] = tempIDvalues.statistics[17];
        s.femalePokemonCaptured[firstID] = tempIDvalues.statistics[18];
        s.femalePokemonHatched[firstID] = tempIDvalues.statistics[19];
        s.shinyFemalePokemonEncountered[firstID] = tempIDvalues.statistics[20];
        s.shinyFemalePokemonDefeated[firstID] = tempIDvalues.statistics[21];
        s.shinyFemalePokemonCaptured[firstID] = tempIDvalues.statistics[22];
        s.shinyFemalePokemonHatched[firstID] = tempIDvalues.statistics[23];

        if (!keepLast) {
            delete s.pokemonEncountered[lastID];
            delete s.pokemonDefeated[lastID];
            delete s.pokemonCaptured[lastID];
            delete s.pokemonHatched[lastID];
            delete s.shinyPokemonEncountered[lastID];
            delete s.shinyPokemonDefeated[lastID];
            delete s.shinyPokemonCaptured[lastID];
            delete s.shinyPokemonHatched[lastID];
            delete s.malePokemonEncountered[lastID];
            delete s.malePokemonDefeated[lastID];
            delete s.malePokemonCaptured[lastID];
            delete s.malePokemonHatched[lastID];
            delete s.shinyMalePokemonEncountered[lastID];
            delete s.shinyMalePokemonDefeated[lastID];
            delete s.shinyMalePokemonCaptured[lastID];
            delete s.shinyMalePokemonHatched[lastID];
            delete s.femalePokemonEncountered[lastID];
            delete s.femalePokemonDefeated[lastID];
            delete s.femalePokemonCaptured[lastID];
            delete s.femalePokemonHatched[lastID];
            delete s.shinyFemalePokemonEncountered[lastID];
            delete s.shinyFemalePokemonDefeated[lastID];
            delete s.shinyFemalePokemonCaptured[lastID];
            delete s.shinyFemalePokemonHatched[lastID];
        }
    }

    // Will move from the previous ID to the new ID and delete any old statistics
    static updatePokemonId(saveData, oldID, newID) {
        Update.rotatePokemonIDs(saveData, [newID, oldID], false);
    }

    // Replaces Pokémon names to IDs in the save data
    static changePokemonNameToId(saveData, pokemonArray) {
        pokemonArray?.forEach(pokemonName => {
            const pokemon = PokemonHelper.getPokemonByName(pokemonName);
            Update.changeHatcheryKey(saveData, pokemonName, pokemon.id);
        });
    }

    static startQuestLine = (saveData, questLineName: string) => {
        const questLine = saveData.quests.questLines.find(ql => ql.name == questLineName);
        if (questLine) {
            // Set to started if not yet started, otherwise leave in it's current state
            questLine.state = questLine.state == 0 ? 1 : questLine.state;
        } else {
            // Push the quest, doesn't exist in save data yet
            saveData.quests.questLines.push({ state: 1, name: questLineName, quest: 0 });
        }
    }

    // Use setBattleState as 0 or 1 to manipulate battles to what status they should be based on related questline progress.
    static fixTempBattleState = (saveData, battleIndex: number, setBattleState: number, questLineName: string, questStep: number) => {
        const ql = saveData.quests.questLines.find((q) => q.name === questLineName);
        if (!ql) {
            return;
        }

        if (setBattleState === 1) {
            // set to complete if related questline/step is completed
            if (ql.state === 2 || ql.quest > questStep) {
                saveData.statistics.temporaryBattleDefeated[battleIndex] = 1;
            }
        }

        if (setBattleState === 0) {
            // set to not complete if related questline/step isn't complete
            if (ql.state < 2 && ql.quest <= questStep) {
                saveData.statistics.temporaryBattleDefeated[battleIndex] = 0;
            }
        }
    }

    static giveMissingQuestLineProgressRewardPokemon(saveData, questLineName: string, questStep: number, pokemonId: number) {
        const quest = saveData.quests.questLines.find((q) => q.name == questLineName);
        if (quest?.state == 2 || (quest?.state == 1 && quest?.quest >= questStep)) {
            Update.giveMissingPokemon(saveData, pokemonId);
        }
    }

    static giveMissingTempBattleRewardPokemon(saveData, tempBattleIndex: number, pokemonId: number) {
        if (saveData.statistics.temporaryBattleDefeated[tempBattleIndex] > 0) {
            Update.giveMissingPokemon(saveData, pokemonId);
        }
    }

    static giveMissingPokemon(saveData, pokemonId: number) {
        if (!saveData.party.caughtPokemon.find((p) => p.id == pokemonId)) {
            saveData.party.caughtPokemon.push({ id: pokemonId });
            saveData.statistics.pokemonCaptured[pokemonId] = saveData.statistics.pokemonCaptured[pokemonId] + 1 || 1;
        }
    }

    getPlayerData() {
        let playerData: any;
        try {
            playerData = JSON.parse(localStorage.getItem(`player${Save.key}`));
        } catch (err) {
            console.warn('Error getting player data', err);
        } finally {
            return playerData;
        }
    }

    setPlayerData(playerData: any) {
        try {
            localStorage.setItem(`player${Save.key}`, JSON.stringify(playerData));
        } catch (err) {
            console.error('Error setting player data', err);
        }
    }

    getSaveData() {
        let saveData: any;
        try {
            saveData = JSON.parse(localStorage.getItem(`save${Save.key}`));
        } catch (err) {
            console.warn('Error getting save data', err);
        } finally {
            return saveData;
        }
    }

    setSaveData(saveData: any) {
        try {
            localStorage.setItem(`save${Save.key}`, JSON.stringify(saveData));
        } catch (err) {
            console.error('Error setting save data', err);
        }
    }

    getSettingsData() {
        let settingsData: any;
        try {
            settingsData = JSON.parse(localStorage.getItem(`settings${Save.key}`) || localStorage.settings);
        } catch (err) {
            console.warn('Error getting settings data', err);
        } finally {
            return settingsData || {};
        }
    }

    setSettingsData(settingsData: any) {
        try {
            localStorage.setItem(`settings${Save.key}`, JSON.stringify(settingsData));
        } catch (err) {
            console.error('Error setting settings data', err);
        }
    }

    fromJSON(json, initial = false): void {
        if (!initial) {
            return;
        }
        if (!json) {
            json = { version: '0.0.0' };
        }

        this.saveVersion = json.version || '0.0.0';
        this.check();
    }

    toJSON(): Record<string, any> {
        return {
            version: this.version,
        };
    }

}
