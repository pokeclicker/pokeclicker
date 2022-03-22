/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Saveable.d.ts" />
/// <reference path="../../declarations/codes/RedeemableCode.d.ts" />

class RedeemableCodes implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'redeemableCodes';

    codeList: RedeemableCode[];

    constructor() {
        this.codeList = [
            new RedeemableCode('farming-quick-start', -83143881, false, () => {
                // Give the player 10k farming points, 100 Cheri berries
                App.game.wallet.gainFarmPoints(10000);
                App.game.farming.gainBerry(BerryType.Cheri, 100, false);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title:'Code activated!',
                    message: 'You gained 10,000 farmpoints and 100 Cheri berries',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });
            }),
            new RedeemableCode('shiny-charmer', -318017456, false, () => {
                // Select a random Pokemon to give the player as a shiny
                const pokemon = pokemonMap.randomRegion(player.highestRegion());
                // Floor the ID, only give base/main Pokemon forms
                App.game.party.gainPokemonById(Math.floor(pokemon.id), true, true);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title:'Code activated!',
                    message: `✨ You found a shiny ${pokemon.name}! ✨`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });
            }),
            new RedeemableCode('complete-kanto', 750807787, false, () => {
                // Complete all routes
                Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => {
                    GameHelper.incrementObservable(App.game.statistics.routeKills[route.region][route.number], 10);
                });
                // Complete all gyms
                GameConstants.KantoGyms.forEach(gym => {
                    GameHelper.incrementObservable(App.game.statistics.gymsDefeated[GameConstants.getGymIndex(gym)]);
                    // Give badge
                    if (!App.game.badgeCase.hasBadge(gymList[gym].badgeReward)) {
                        App.game.badgeCase.gainBadge(gymList[gym].badgeReward);
                    }
                });
                // Complete all dungeons
                GameConstants.KantoDungeons.forEach(dungeon => {
                    GameHelper.incrementObservable(App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(dungeon)]);
                });
                // Catch all Pokemon
                for (let id = 1; id <= GameConstants.MaxIDPerRegion[GameConstants.Region.kanto]; id++) {
                    App.game.party.gainPokemonById(id, false, true);
                }
                // Notify that the code was activated successfully
                Notifier.notify({
                    title:'Code activated!',
                    message: 'You have unlocked all of the Kanto region',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });
            }),
        ];
    }

    isDiscordCode(code: string): boolean {
        return /^\w{4}-\w{4}-\w{4}$/.test(code);
    }

    enterCode(code: string) {
        // If this is a Discord code, send it to the Discord class to check
        if (App.game.discord.enabled && this.isDiscordCode(code)) {
            return App.game.discord.enterCode(code);
        }

        const hash = this.hash(code);

        const redeemableCode = this.codeList.find(c => {
            return c.hash === hash;
        });

        if (!redeemableCode) {
            return Notifier.notify({
                message: `Invalid code ${code}`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        if (redeemableCode) {
            redeemableCode.redeem();
        }
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
        return this.codeList.reduce((res: string[], code: RedeemableCode) => {
            if (code.isRedeemed) {
                res.push(code.name);
            }
            return res;
        }, []);
    }

}
