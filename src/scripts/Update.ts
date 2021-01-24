/// <reference path="./GameConstants.d.ts" />

class Update implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'update';

    // Loaded from package.json
    version = '$VERSION';
    saveVersion = '0.0.0';

    updateSteps = {
        '0.4.0': ({ playerData, saveData }) => {
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

            // Migrate the achievements so we don't spam players with notifications
            const renamedAchievements = Object.entries(playerData.achievementsCompleted)
                .map(([name, isCompleted]) => {
                    const matchRoute = name.match(/^Route (\d+) (?:traveler|explorer|conqueror)/);
                    // If the name doesn't match a route, return the old key-value pair
                    if (matchRoute === null) {
                        return [name, isCompleted];
                    }
                    const routeNumber = matchRoute ? Number(matchRoute[1]) : null;
                    if (Number.isNaN(routeNumber)) {
                        console.trace('[Update] Could not map region into achievement name:', name);
                        return [name, isCompleted];
                    }
                    // Look up the region for the route, and rename the achievement
                    const [region] = Object.entries(regionRoutes).find(([, check]) => (
                        // Find the region that contains this index
                        check[0] <= routeNumber && routeNumber <= check[1]
                    )) || ['none'];
                    if (region === 'none') {
                        console.trace('[Update] Could not map region into achievement name:', name);
                        return [name, isCompleted];
                    }
                    return [`${GameConstants.camelCaseToString(region)} ${name}`, isCompleted];
                });
            playerData.achievementsCompleted = Object.fromEntries(renamedAchievements);

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
                    if (saveData.oakItems.purchaseList[OakItems.OakItem.Squirtbottle]) {
                        saveData.oakItems[OakItems.OakItem[OakItems.OakItem.Squirtbottle]]['purchased'] = true;
                    }
                    if (saveData.oakItems.purchaseList[OakItems.OakItem.Sprinklotad]) {
                        saveData.oakItems[OakItems.OakItem[OakItems.OakItem.Sprinklotad]]['purchased'] = true;
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
            delete saveData.quests.questList;

            // Move itemMultipliers to new ShopEntries system
            // Only moving non-decreasing multipliers, as the rest don't matter that much
            if (!saveData.hasOwnProperty('shopEntries')) {
                saveData.shopEntries = {};
            }
            console.log('testing', playerData);
            saveData.shopEntries['Masterball D'] = { currentMultiplier: playerData._itemMultipliers['Masterball|diamond'] };
            saveData.shopEntries['Masterball BP'] = { currentMultiplier: playerData._itemMultipliers['Masterball|battlePoint'] };
            saveData.shopEntries['Masterball DT'] = { currentMultiplier: playerData._itemMultipliers['Masterball|dungeonToken'] };
            saveData.shopEntries['Masterball FP'] = { currentMultiplier: playerData._itemMultipliers['Masterball|farmPoint'] };
            saveData.shopEntries['Masterball'] = { currentMultiplier: playerData._itemMultipliers['Masterball|money'] };
            saveData.shopEntries['Masterball QP'] = { currentMultiplier: playerData._itemMultipliers['Masterball|questPoint'] };
            saveData.shopEntries['Protein'] = { currentMultiplier: playerData._itemMultipliers['Protein|money'] };
            // Handling maxAmount entries
            if (saveData.keyItems['Dungeon_ticket']) {
                saveData.shopEntries['Dungeon Ticket'] = { amountPurchased: 1 };
            }
            if (saveData.keyItems['Explorer_kit']) {
                saveData.shopEntries['Explorer Kit'] = { amountPurchased: 1 };
            }
            if (saveData.oakItems['Squirtbottle'] && saveData.oakItems['Squirtbottle'].purchased) {
                saveData.shopEntries['Squirtbottle'] = { amountPurchased: 1 };
            }
            if (saveData.oakItems['Sprinklotad'] && saveData.oakItems['Sprinklotad'].purchased) {
                saveData.shopEntries['Sprinklotad'] = { amountPurchased: 1 };
            }
            if (saveData.oakItems['Treasure_Scanner'] && saveData.oakItems['Treasure_Scanner'].purchased) {
                saveData.shopEntries['Treasure Scanner'] = { amountPurchased: 1 };
            }
            if (saveData.oakItems['Explosive_Charge'] && saveData.oakItems['Explosive_Charge'].purchased) {
                saveData.shopEntries['Explosive Charge'] = { amountPurchased: 1 };
            }
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
                                message: 'A newer version of the game is available:<br/><br/><a class="btn btn-warning btn-block" href="#" onclick="location.reload(true);">Reload Page</a>',
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
        return !this.isOlderVersion(saveData.update.version, version);
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
        button.className = 'btn btn-block btn-warning';
        button.innerText = 'Click to Backup Save!';
        button.href = `data:text/plain;charset=utf-8,${encodeURIComponent(btoa(backupSaveData))}`;
        button.setAttribute('download', `[v${this.saveVersion}] Poke Clicker Backup Save.txt`);

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
        if (this.saveVersion === this.version || this.saveVersion === '0.0.0') {
            return;
        }

        const [backupButton, backupSaveData] = this.getBackupButton();

        // Must modify these object when updating
        const playerData = this.getPlayerData();
        const saveData = this.getSaveData();
        const settingsData = this.getSettingsData();

        if (!playerData || !saveData || !settingsData) {
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
                        message: `Please check the console for errors, and report them on our <a class="text-light" href="https://discord.gg/a6DFe4p"><u>Discord</u></a> along with your save file.<br /><br />${backupButton.outerHTML}<br />${resetButton.outerHTML}`,
                        type: NotificationConstants.NotificationOption.primary,
                        timeout: GameConstants.DAY,
                    });

                    // On the next tick, set the reset button click handler
                    setTimeout(() => {
                        document.getElementById('failedUpdateResetButton').onclick = () => {
                            if (window.confirm('Are you sure you want to reset your save? This cannot be undone, so please make sure you have a backup first!')) {
                                // Force an autodownload of the backup when resetting the save
                                this.automaticallyDownloadBackup(backupButton, { disableAutoDownloadBackupSaveOnUpdate: false });
                                localStorage.removeItem('player');
                                localStorage.removeItem('save');
                                localStorage.removeItem('settings');
                                location.reload();
                            }
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
                message: `Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!<br/><br/>${backupButton.outerHTML}`,
                type: NotificationConstants.NotificationOption.primary,
                timeout: 6e4,
            });
        } catch (err) {
            console.error('Error trying to convert backup save', err);
            Notifier.notify({
                title: `[v${this.version}] Game has been updated!`,
                message: 'Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!<br/><br/><i>Failed to download old save, Please check the console for errors, and report them on our <a class="text-light" href="https://discord.gg/a6DFe4p"><u>Discord</u></a>.</i>',
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

    getPlayerData() {
        let playerData: any;
        try {
            playerData = JSON.parse(localStorage.player);
        } catch (err) {
            console.warn('Error getting player data', err);
        } finally {
            return playerData;
        }
    }

    setPlayerData(playerData: any) {
        try {
            localStorage.player = JSON.stringify(playerData);
        } catch (err) {
            console.error('Error setting player data', err);
        }
    }

    getSaveData() {
        let saveData: any;
        try {
            saveData = JSON.parse(localStorage.save);
        } catch (err) {
            console.warn('Error getting save data', err);
        } finally {
            return saveData;
        }
    }

    setSaveData(saveData: any) {
        try {
            localStorage.save = JSON.stringify(saveData);
        } catch (err) {
            console.error('Error setting save data', err);
        }
    }

    getSettingsData() {
        let settingsData: any;
        try {
            settingsData = JSON.parse(localStorage.settings);
        } catch (err) {
            console.warn('Error getting settings data', err);
        } finally {
            return settingsData;
        }
    }

    setSettingsData(settingsData: any) {
        try {
            localStorage.settings = JSON.stringify(settingsData);
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
