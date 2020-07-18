class RedeemableCodes implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'redeemableCodes';

    codeList: RedeemableCode[];

    constructor() {
        this.codeList = [
            new RedeemableCode('farming-quick-start', -83143881, false, function () {
                // Give the player 10k farming points, 100 Cheri berries
                App.game.wallet.gainFarmPoints(10000);
                App.game.farming.gainBerry(BerryType.Cheri, 100);
                // Notify that the code was activated successfully
                Notifier.notify({ title:'Code activated!', message: 'You gained 10,000 farmpoints and 100 Cheri berries', type: GameConstants.NotificationOption.success, timeout: 1e4 });
            }),
            new RedeemableCode('shiny-charmer', -318017456, false, function () {
                // Select a random Pokemon to give the player as a shiny
                const pokemon = pokemonMap.random(GameConstants.TotalPokemonsPerRegion[player.highestRegion()]);
                App.game.party.gainPokemon(pokemon, true, true);
                // Notify that the code was activated successfully
                Notifier.notify({ title:'Code activated!', message: `✨ You found a shiny ${pokemon.name}! ✨`, type: GameConstants.NotificationOption.success, timeout: 1e4 });
            }),
            new RedeemableCode('complete-kanto', 750807787, false, function () {
                // Complete all routes
                for (let route = GameConstants.RegionRoute[GameConstants.Region.kanto][0]; route <= GameConstants.RegionRoute[GameConstants.Region.kanto][1]; route++) {
                    GameHelper.incrementObservable(App.game.statistics.routeKills[route], 10);
                }
                // Complete all gyms
                GameConstants.KantoGyms.forEach(gym => {
                    GameHelper.incrementObservable(App.game.statistics.gymsDefeated[Statistics.getGymIndex(gym)]);
                    // Give badge
                    if (!App.game.badgeCase.hasBadge(gymList[gym].badgeReward)) {
                        App.game.badgeCase.gainBadge(gymList[gym].badgeReward);
                    }
                });
                // Complete all dungeons
                GameConstants.KantoDungeons.forEach(dungeon => {
                    GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeon)]);
                });
                // Catch all Pokemon
                for (let id = 1; id <= GameConstants.TotalPokemonsPerRegion[GameConstants.Region.kanto]; id++) {
                    App.game.party.gainPokemonById(id, false, true);
                }
                // Notify that the code was activated successfully
                Notifier.notify({ title:'Code activated!', message: 'You have unlocked all of the Kanto region', type: GameConstants.NotificationOption.success, timeout: 1e4 });
            }),
            new RedeemableCode('complete-johto', 171396746, false, function () {
                // Complete all routes
                for (let route = GameConstants.RegionRoute[GameConstants.Region.johto][0]; route <= GameConstants.RegionRoute[GameConstants.Region.johto][1]; route++) {
                    GameHelper.incrementObservable(App.game.statistics.routeKills[route], 10);
                }
                // Complete all gyms
                GameConstants.JohtoGyms.forEach(gym => {
                    GameHelper.incrementObservable(App.game.statistics.gymsDefeated[Statistics.getGymIndex(gym)]);
                    // Give badge
                    if (!App.game.badgeCase.hasBadge(gymList[gym].badgeReward)) {
                        App.game.badgeCase.gainBadge(gymList[gym].badgeReward);
                    }
                });
                // Complete all dungeons
                GameConstants.JohtoDungeons.forEach(dungeon => {
                    GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeon)]);
                });
                // Catch all Pokemon
                for (let id = GameConstants.TotalPokemonsPerRegion[GameConstants.Region.kanto] + 1; id <= GameConstants.TotalPokemonsPerRegion[GameConstants.Region.johto]; id++) {
                    App.game.party.gainPokemonById(id, false, true);
                }
                // Notify that the code was activated successfully
                Notifier.notify({ title:'Code activated!', message: 'You have unlocked all of the Johto region', type: GameConstants.NotificationOption.success, timeout: 1e4 });
            }),
            new RedeemableCode('complete-hoenn', -1257697040, false, function () {
                // Complete all routes
                for (let route = GameConstants.RegionRoute[GameConstants.Region.hoenn][0]; route <= GameConstants.RegionRoute[GameConstants.Region.hoenn][1]; route++) {
                    GameHelper.incrementObservable(App.game.statistics.routeKills[route], 10);
                }
                // Complete all gyms
                GameConstants.HoennGyms.forEach(gym => {
                    GameHelper.incrementObservable(App.game.statistics.gymsDefeated[Statistics.getGymIndex(gym)]);
                    // Give badge
                    if (!App.game.badgeCase.hasBadge(gymList[gym].badgeReward)) {
                        App.game.badgeCase.gainBadge(gymList[gym].badgeReward);
                    }
                });
                // Complete all dungeons
                GameConstants.HoennDungeons.forEach(dungeon => {
                    GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(dungeon)]);
                });
                // Catch all Pokemon
                for (let id = GameConstants.TotalPokemonsPerRegion[GameConstants.Region.johto] + 1; id <= GameConstants.TotalPokemonsPerRegion[GameConstants.Region.hoenn]; id++) {
                    App.game.party.gainPokemonById(id, false, true);
                }
                // Notify that the code was activated successfully
                Notifier.notify({ title:'Code activated!', message: 'You have unlocked all of the Hoenn region', type: GameConstants.NotificationOption.success, timeout: 1e4 });
            }),
        ];
    }

    enterCode(code: string) {
        const hash = this.hash(code);

        const redeemableCode = this.codeList.find(code => {
            return code.hash === hash;
        });

        if (!redeemableCode) {
            Notifier.notify({ message: `Invalid code ${code}`, type: GameConstants.NotificationOption.danger });
            return;
        }

        redeemableCode.redeem();
    }

    /**
     * Insecure hash, but should keep some of the nosy people out.
     * @param text
     */
    hash(text: string): number {
        let hash = 0, i, chr;
        if (text.length === 0) {
            return hash;
        }

        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }


    fromJSON(json: string[]): void {
        if (json == null) {
            return;
        }

        json.forEach(name => {
            const foundCode = this.codeList.find(code => {
                return code.name === name;
            });

            if (foundCode) {
                foundCode.isRedeemed = true;
            }
        });
    }

    toJSON(): Record<string, any> {
        return this.codeList.reduce(function (res: string[], code: RedeemableCode) {
            if (code.isRedeemed) {
                res.push(code.name);
            }
            return res;
        }, []);
    }

}
