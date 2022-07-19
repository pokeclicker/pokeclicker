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

            // If player has defeated the Hoenn Champion, start the deoxys quest line
            saveData.badgeCase = saveData.badgeCase || [];
            // Not using game constants incase the value isn't 39 in the future
            if (saveData.badgeCase[39]) {
                saveData.quests.questLines.push({state: 1, name: 'Mystery of Deoxys', quest: 0});
            }
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
                saveData.quests.questLines.push({state: 1, name: 'Mining Expedition', quest: 0});
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
            // Award Deoxys forms for completed Battle Frontier milestones
            const maxBattleFrontierStage = saveData.statistics.battleFrontierHighestStageCompleted;
            if (maxBattleFrontierStage >= 151) {
                Update.addPokemonToSaveData(saveData, 386.1); // Deoxys (attack)
            }
            if (maxBattleFrontierStage >= 251) {
                Update.addPokemonToSaveData(saveData, 386.2); // Deoxys (defense)
            }
            if (maxBattleFrontierStage >= 386) {
                Update.addPokemonToSaveData(saveData, 386.3); // Deoxys (speed)
            }

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

                    <button class="btn btn-block btn-danger" onclick="App.game.challenges.list.disableProteins.activate();" data-dismiss="toast">Activate</button>`,
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
            Update.renamePokemonInSaveData(saveData, 'Lets go Pikachu', 'Let\'s Go Pikachu');
            Update.renamePokemonInSaveData(saveData, 'Lets go Eevee', 'Let\'s Go Eevee');

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
                saveData.quests.questLines.push({state: 1, name: 'The Great Vivillon Hunt!', quest: 0});
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
            Update.renamePokemonInSaveData(saveData, 'Vivillon', 'Vivillon (Meadow)');

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
                saveData.quests.questLines.push({state: 1, name: 'Team Rocket Again', quest: 0});
            }

            setTimeout(async () => {
                // Check if player wants to activate the new challenge modes
                if (!await Notifier.confirm({ title: 'Regional Attack Debuff (recommended)', message: 'New challenge mode added Regional Attack Debuff.\n\nLowers Pokémon attack based on native region and highest reached region.\n\nThis is the default and recommended way to play, but is now an optional challenge.\n\nPlease choose if you would like this challenge mode to be enabled or disabled (cannot be re-enabled later)', confirm: 'enable', cancel: 'disable' })) {
                    App.game.challenges.list.regionalAttackDebuff.disable();
                }
                if (!await Notifier.confirm({ title: 'Require Complete Pokédex (recommended)', message: 'New challenge mode added Require Complete Pokédex.\n\nRequires a complete regional pokédex before moving on to the next region.\n\nThis is the default and recommended way to play, but is now an optional challenge.\n\nPlease choose if you would like this challenge mode to be enabled or disabled (cannot be re-enabled later)', confirm: 'enable', cancel: 'disable' })) {
                    App.game.challenges.list.requireCompletePokedex.disable();
                }
            }, GameConstants.SECOND);
        },

        '0.8.14': ({ playerData, saveData }) => {
            // Start Aqua Magma questline if player has Dynamo Badge already
            if (saveData.badgeCase[29]) {
                saveData.quests.questLines.push({state: 1, name: 'Land vs. Water', quest: 0});
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
                saveData.quests.questLines.push({state: 1, name: 'Quest for the DNA Splicers', quest: 0});
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
                saveData.quests.questLines.push({state: 1, name: 'A new world', quest: 0});
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
                saveData.quests.questLines.push({state: 1, name: 'Mina\'s Trial', quest: 0});
            }

            // Add Rocket Game Corner
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 4);
            // Add Silph Co.
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 6);
            // Start Team Rocket Kanto questline if player has Cascade Badge already
            if (saveData.badgeCase[2]) {
                saveData.quests.questLines.push({state: 1, name: 'Team Rocket', quest: 0});
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
            saveData.oakItemLoadouts = saveData.oakItemLoadouts?.map((list, index) => ({ name: `Loadout ${index + 1}`, loadout: list })) || [];

            // Fix pokerus
            saveData.party.caughtPokemon.forEach(p => {
                let status = (p[8]) ? 2 : 0;
                const requiredForCured = saveData.challenges.list.slowEVs ? 5000 : 500;
                if (saveData.statistics.effortPoints?.[p.id] >= requiredForCured) {
                    status = 3;
                }
                p[8] = status;
            });

            // Give the players Linking Cords in place of Trade Stones
            playerData._itemList.Linking_cord = playerData._itemList.Trade_stone;
            delete playerData._itemList.Trade_stone;

            // Fix quest default color
            if (settingsData) {
                if (settingsData && settingsData['--questAtLocation'] && settingsData['--questAtLocation'] === '#34BF45') {
                    settingsData['--questAtLocation'] = '#55ff00';
                }
                delete settingsData['--currentPlace'];
            }

            // Add total proteins obtained
            // Just incase statistics is not set
            saveData.statistics = saveData.statistics || {};
            // Set new statistic
            saveData.statistics = {
                ...saveData.statistics,
                totalProteinsPurchased: saveData.statistics.totalProteinsObtained || 0,
            };

            // Split dungeon loot notification into two
            if (settingsData) {
                settingsData['notification.common_dungeon_item_found'] = settingsData['notification.dungeon_item_found'] ?? true;
                settingsData['notification.common_dungeon_item_found.desktop'] = settingsData['notification.dungeon_item_found.desktop'] ?? false;
                settingsData['notification.rare_dungeon_item_found'] = settingsData['notification.dungeon_item_found'] ?? true;
                settingsData['notification.rare_dungeon_item_found.desktop'] = settingsData['notification.dungeon_item_found.desktop'] ?? false;
                delete settingsData['notification.dungeon_item_found'];
                delete settingsData['notification.dungeon_item_found.desktop'];
            }

            // Moved EVs from statistics
            saveData.party.caughtPokemon.forEach(p => {
                p[9] = saveData.statistics.effortPoints?.[p.id] * 100 || 0;
            });

            // Add Galactic Boss Cyrus TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 1);

            // Start Sevii questline if player has Volcano Badge already
            if (saveData.badgeCase[7]) {
                saveData.quests.questLines.push({state: 1, name: 'Bill\'s Errand', quest: 0});
            }
            // Add Mt. Ember Summit
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 10);
            // Add Berry Forest
            saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 11);
            // Add Biker Gang TemporaryBattles
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 1);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 2);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 3);
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 4);

            // Start Persons of Interest questline if player has Earth Badge already
            if (saveData.badgeCase[8]) {
                saveData.quests.questLines.push({state: 1, name: 'Persons of Interest', quest: 0});
            }
            // Start Ash questline if the player has beaten Kalos champion
            if (saveData.badgeCase[78]) {
                saveData.quests.questLines.push({state: 1, name: 'The New Kid', quest: 0});
            }
            // Add Ash Ketchum Kanto TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 7);
            // Add Ash Ketchum Johto TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 8);
            // Add Ash Ketchum Hoenn TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 9);
            // Add Ash Ketchum Sinnoh TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 10);
            // Add Ash Ketchum Unova TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 11);
            // Add Ash Ketchum Kalos TemporaryBattle
            saveData.statistics.temporaryBattleDefeated = Update.moveIndex(saveData.statistics.temporaryBattleDefeated, 12);
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

        // Save the data by stringifying it, so that it isn't mutated during update
        const backupSaveData = JSON.stringify({ player: playerData, save: saveData });

        const button = document.createElement('a');
        try {
            button.href = `data:text/plain;charset=utf-8,${encodeURIComponent(btoa(backupSaveData))}`;
            button.className = 'btn btn-block btn-warning';
            button.innerText = 'Click to Backup Save!';
            button.setAttribute('download', `[v${this.saveVersion}] Poke Clicker Backup Save.txt`);
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

    static addPokemonToSaveData = (saveData, pokemonId) => {
        if (saveData.party.caughtPokemon.filter(p => p.id === pokemonId).length > 0) {
            return;
        }

        const pokemon: PartyPokemon = PokemonFactory.generatePartyPokemon(pokemonId, false);
        saveData.statistics.pokemonCaptured[pokemonId] = 1;
        saveData.statistics.totalPokemonCaptured++;
        saveData.logbook.logs.unshift({
            date: Date.now(),
            description: `You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.name}!`,
            type: {
                display: 'success',
                label: 'CAUGHT',
            },
        });
        saveData.party.caughtPokemon.push(pokemon);
    }

    // If any pokemon names change in the data rename them,
    // note that name isn't used in party.
    static renamePokemonInSaveData = (saveData, oldName, newName) => {
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
