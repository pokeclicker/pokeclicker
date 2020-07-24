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
    }

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

        // v0.4.0
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

        // v0.4.4
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

                // Loading the new data
                this.setSaveData(saveData);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.4 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        // v0.4.16
        if (this.isOlderVersion(this.saveVersion, '0.4.15')) {
            delete localStorage.mine;
        }

        // Notify the player that the game has updated!
        if (this.saveVersion != this.version && this.saveVersion != '0.0.0') {
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

            Notifier.notify({ title: `[v${this.version}] Game has been updated!`, message: `Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!<br/><br/>${button.outerHTML}`, type: GameConstants.NotificationOption.primary, timeout: 6e4 });
        }
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
