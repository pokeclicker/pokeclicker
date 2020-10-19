class Update implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'update';

    // Loaded from package.json
    version = '$VERSION';
    saveVersion = '0.0.0';

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

    // potentially newer version, check against version
    isNewerVersion(version, compareVersion) {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === -1;
    }

    // potentially older version, check against version
    isOlderVersion(version, compareVersion) {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === 1;
    }

    check() {
        // Must modify these object when updating
        const playerData = this.getPlayerData();
        const saveData = this.getSaveData();
        const settingsData = this.getSettingsData();
        const backupSaveData = {player: playerData, save: saveData};
        if (!playerData || !saveData || !settingsData) {
            return;
        }

        if (this.isOlderVersion(this.saveVersion, '0.4.0')) {
            try {
                // Update the save data as it is no longer a part of player data
                saveData.statistics = {
                    ...playerData.statistics || {},
                    pokemonCaptured: playerData._caughtAmount || 0,
                    pokemonDefeated: playerData._defeatedAmount || 0,
                    totalShinyPokemonCaptured: playerData._shinyCatches || 0,
                    totalPokemonCaptured: playerData.statistics.pokemonCaptured || 0,
                    totalPokemonDefeated: playerData.statistics.pokemonDefeated || 0,
                };

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.0 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.4.4')) {
            try {
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

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.4 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.4.15')) {
            try {
                playerData._itemList.Lucky_egg = playerData._itemList.xExp;
                delete playerData._itemList.xExp;
                delete localStorage.mine;

                // Update save data
                this.setPlayerData(playerData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.15 - Couldn\'t update..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.4.17')) {
            try {
                // Just incase statistics is not set
                saveData.statistics = saveData.statistics || {};

                // Rename from the old statistic name
                saveData.statistics = {
                    ...saveData.statistics,
                    totalPokemonHatched: saveData.statistics.hatchedEggs || 0,
                };

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.17 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.4.18')) {
            try {
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

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.18 - Couldn\'t update quests data..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.0')) {
            try {
                // Give the players Soothe Bells in place of Time stones
                playerData._itemList = playerData._itemList || {};
                playerData._itemList.Soothe_bell = playerData._itemList.Time_stone || 0;
                console.debug('items', playerData._itemList);
                delete playerData._itemList.Time_stone;

                // Update player data
                this.setPlayerData(playerData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.0 - Couldn\'t update item list data..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.1')) {
            try {
                // Items removed from the Underground, if the player has these items in their current layer, reset their mine
                const mineData = JSON.parse(localStorage.mine);
                if (mineData.rewardNumbers.some(id => id >= 46)) {
                    delete localStorage.mine;
                }
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.1 - Couldn\'t reset player mine..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.2')) {
            try {
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

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.2 - Couldn\'t update player statistics..', ಠ_ಠ);
            }
            try {
                // If the player has the Soul Badge already
                // Not using game constants incase the badge value isn't 5 in the future
                if (saveData.badgeCase[5]) {
                    saveData.quests.questLines.push({state: 1, name: 'Mining Expedition', quest: 0});
                }

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.2 - Couldn\'t start Aerodactyl Quest line..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.5')) {
            try {
                //Correct statistics
                saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 22, 34); // Petalburg Woods
                saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 30, 35); // New Mauville
                saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 56, 50); // Hall of Origin
                saveData.statistics.dungeonsCleared = Update.moveIndex(saveData.statistics.dungeonsCleared, 33); // Sealed Chamber

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.5 - Couldn\'t update player statistics..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.7')) {
            try {
                //Update shinies
                saveData.party.shinyPokemon.forEach(name => {
                    const id = pokemonMap[name].id;
                    if (id) {
                        const pokemon = saveData.party.caughtPokemon.find(p => p.id == id);
                        if (pokemon) {
                            pokemon.shiny = true;
                        }
                    }
                });

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.7 - Couldn\'t update player shinies..', ಠ_ಠ);
            }
        }

        if (this.isOlderVersion(this.saveVersion, '0.5.8')) {
            try {
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
                // Update save data
                this.setSaveData(saveData);
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
                this.setPlayerData(playerData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.8 - Couldn\'t update player statistics..', ಠ_ಠ);
            }
        }

        //TODO: HLXII Update to add this when we release the berry overhaul
        if (this.isOlderVersion(this.saveVersion, '0.6.0')) {
            try {
                //Update farms
                saveData.farming.unlockedBerries = Array<boolean>(GameConstants.AMOUNT_OF_BERRY_TYPES).fill(false);
                saveData.farming.mulchList = Array<number>(GameConstants.AMOUNT_OF_MULCHES).fill(0);
                // Updating unlocked status
                for (let i = 0;i < 8;i++) {
                    if (saveData.farming.berryList[i]) {
                        saveData.farming.unlockedBerries[i] = true;
                    }
                }

                // Plots won't be updated, as the berries currently don't have much value anyways

                // Update save data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.5.8 - Couldn\'t update player plots..', ಠ_ಠ);
            }
        }

        // Notify the player that the game has updated!
        if (this.saveVersion != this.version && this.saveVersion != '0.0.0') {
            try {
                const button = document.createElement('a');
                button.className = 'btn btn-block btn-danger';
                button.innerText = 'Click to Backup Save!';
                button.href = `data:text/plain;charset=utf-8,${encodeURIComponent(btoa(JSON.stringify(backupSaveData)))}`;
                button.setAttribute('download', `[v${this.saveVersion}] Poke Clicker Backup Save.txt`);

                // Add to body and click, triggering auto download
                if (!settingsData.disableAutoDownloadBackupSaveOnUpdate) {
                    button.style.display = 'none';
                    document.body.appendChild(button);
                    button.click();
                    document.body.removeChild(button);
                }
                button.style.display = '';

                Notifier.notify({
                    title: `[v${this.version}] Game has been updated!`,
                    message: `Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!<br/><br/>${button.outerHTML}`,
                    type: NotificationConstants.NotificationOption.primary,
                    timeout: 6e4,
                });
            } catch (err) {
                console.error('Error trying to convert backup save', err);
                Notifier.notify({
                    title: `[v${this.version}] Game has been updated!`,
                    message: 'Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!<br/><br/><i>Failed to download old save, Please check the console for errors, and report them on our Discord.</i>',
                    type: NotificationConstants.NotificationOption.primary,
                    timeout: 6e4,
                });
                try {
                    localStorage.backupSave = JSON.stringify(backupSaveData);
                } catch (e) {}
            }
        }
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
