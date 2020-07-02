class Update implements Saveable {
    defaults: object;
    saveKey = 'update';

    version: string = '0.4.0';
    saveVersion: string = '0.0.0';

    constructor() {}

    isOlderVersion(version, compareVersion) {
        return compareVersion.localeCompare(version, undefined, { numeric: true }) === 1;
    }

    check() {
        let playerData;
        try{ playerData = JSON.parse(localStorage.player); }catch(O_o){ playerData = {statistics: {}}; }

        // v0.4.0 - Statistics update
        if (this.isOlderVersion(this.saveVersion, '0.4.0')){
            try{
                const statistics = {
                  ...playerData.statistics,
                  pokemonCaptured: playerData._caughtAmount,
                  pokemonDefeated: playerData._defeatedAmount,
                  totalShinyPokemonCaptured: playerData._shinyCatches,
                  totalPokemonCaptured: playerData.statistics.pokemonCaptured,
                  totalPokemonDefeated: playerData.statistics.pokemonDefeated,
                };

                console.log('statistics', statistics);
                App.game.statistics.fromJSON(statistics);
            }catch(O_o){ console.error(`[update] v0.4.0 - Couldn't update statistics..`); }
        }

        if (this.saveVersion != this.version) {
            Notifier.notify({ title: `[v${this.version}] Game has been updated!`, message: `Check the changelog for details!`, type: GameConstants.NotificationOption.primary, timeout: 6e4 });
        }
    }

    fromJSON(json): void {
        if (!json) return;

        this.saveVersion = json.version || '0.0.0';
    }

    toJSON(): object {
        return {
            version: this.version,
        }
    }

}
