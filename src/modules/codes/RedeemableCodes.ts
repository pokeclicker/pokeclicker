import { Saveable } from '../DataStore/common/Saveable';
import BerryType from '../enums/BerryType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import RedeemableCode from './RedeemableCode';

export default class RedeemableCodes implements Saveable {
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
                    title: 'Code activated!',
                    message: 'You gained 10,000 Farm Points and 100 Cheri Berries!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });
            }),
            new RedeemableCode('shiny-charmer', -318017456, false, () => {
                // Select a random Pokemon to give the player as a shiny
                const pokemon = pokemonMap.randomRegion(player.highestRegion());
                // Floor the ID, only give base/main Pokemon forms
                const idToUse = Math.floor(pokemon.id);
                App.game.party.gainPokemonById(idToUse, true, true);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: `✨ You found a shiny ${pokemonMap[idToUse].name}! ✨`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });
            }),
        ];
    }

    // eslint-disable-next-line class-methods-use-this
    isDiscordCode(code: string): boolean {
        return /^\w{4}-\w{4}-\w{4}$/.test(code);
    }

    enterCode(code: string): void {
        // If this is a Discord code, send it to the Discord class to check
        if (App.game.discord.enabled && this.isDiscordCode(code)) {
            App.game.discord.enterCode(code);
            return;
        }

        const hash = this.hash(code);

        const redeemableCode = this.codeList.find((c) => c.hash === hash);

        if (!redeemableCode) {
            Notifier.notify({
                message: `Invalid code ${code}`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        redeemableCode.redeem();
    }

    /**
     * Insecure hash, but should keep some of the nosy people out.
     * @param text
     */
    // eslint-disable-next-line class-methods-use-this
    hash(text: string): number {
        let hash = 0;
        let i = 0;
        let chr = 0;
        if (text.length === 0) {
            return hash;
        }

        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            // eslint-disable-next-line no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // eslint-disable-next-line no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    fromJSON(json: string[]): void {
        if (json == null) {
            return;
        }

        json.forEach((name) => {
            const foundCode = this.codeList.find((code) => code.name === name);

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
