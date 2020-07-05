class Update implements Saveable {
    defaults: object;
    saveKey = 'update';

    version = '0.4.5';
    saveVersion = '0.0.0';

    constructor() {}

    isOlderVersion(version, compareVersion) {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === 1;
    }

    check() {
        // Must modify these object when updating
        const playerData = this.getPlayerData();
        const saveData = this.getSaveData();

        // v0.4.0 - Statistics update
        if (this.isOlderVersion(this.saveVersion, '0.4.0')) {
            try {
                // update the save data as it is no longer a part of player data
                saveData.statistics = {
                    ...playerData.statistics || {},
                    pokemonCaptured: playerData._caughtAmount || 0,
                    pokemonDefeated: playerData._defeatedAmount || 0,
                    totalShinyPokemonCaptured: playerData._shinyCatches || 0,
                    totalPokemonCaptured: playerData.statistics.pokemonCaptured || 0,
                    totalPokemonDefeated: playerData.statistics.pokemonDefeated || 0,
                };

                // Loading the new data
                App.game.statistics.fromJSON(saveData.statistics);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.0 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        // v0.4.4 - Statistics update 2
        if (this.isOlderVersion(this.saveVersion, '0.4.4')) {
            try {
                // Just incase statistics is not set
                saveData.statistics = saveData.statistics || {};

                // update the save data as it is no longer a part of player data
                saveData.statistics = {
                    ...saveData.statistics,
                    clickAttacks: saveData.statistics.clicks || 0,
                    totalDungeonTokens: saveData.statistics.totalTokens || 0,
                    undergroundItemsFound:  saveData.statistics.digItems || 0,
                    undergroundLayersMined:  saveData.statistics.digDeeper || 0,
                };

                // Loading the new data
                App.game.statistics.fromJSON(saveData.statistics);
            } catch (ಠ_ಠ) {
                console.error('[update] v0.4.4 - Couldn\'t update statistics..', ಠ_ಠ);
            }
        }

        if (this.saveVersion != this.version) {
            Notifier.notify({ title: `[v${this.version}] Game has been updated!`, message: 'Check the <a class="text-light" href="#changelogModal" data-toggle="modal"><u>changelog</u></a> for details!', type: GameConstants.NotificationOption.primary, timeout: 6e4 });
        }
    }

    getPlayerData() {
        let playerData: any;
        try {
            playerData = JSON.parse(localStorage.player);
        } catch (err) {
            console.error('Error getting player data', err);
        } finally {
            return playerData || {};
        }
    }

    getSaveData() {
        let saveData: any;
        try {
            saveData = JSON.parse(localStorage.save);
        } catch (err) {
            console.error('Error getting save data', err);
        } finally {
            return saveData || {};
        }
    }

    fromJSON(json): void {
        if (!json) {
            return;
        }

        this.saveVersion = json.version || '0.0.0';
    }

    toJSON(): object {
        return {
            version: this.version,
        };
    }

}
