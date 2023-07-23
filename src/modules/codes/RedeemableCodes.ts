import { Saveable } from '../DataStore/common/Saveable';
import BerryType from '../enums/BerryType';
import {
    Currency, MegaStoneType, Pokeball, Region, VitaminType,
} from '../GameConstants';
import { ItemList } from '../items/ItemList';
import KeyItemType from '../enums/KeyItemType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { pokemonMap } from '../pokemons/PokemonList';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import RedeemableCode from './RedeemableCode';
import GameHelper from '../GameHelper';
import Amount from '../wallet/Amount';
import Item from '../items/Item';
import QuestLineState from '../quests/QuestLineState';

export default class RedeemableCodes implements Saveable {
    defaults: Record<string, any>;
    saveKey = 'redeemableCodes';

    codeList: RedeemableCode[];

    constructor() {
        this.codeList = [
            new RedeemableCode('farming-quick-start', -83143881, false, async () => {
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

                return true;
            }),
            new RedeemableCode('shiny-charmer', -318017456, false, async () => {
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

                return true;
            }),
            new RedeemableCode('great-balls', -1761161712, false, async () => {
                // Give the player 10 Great Balls
                App.game.pokeballs.gainPokeballs(Pokeball.Greatball, 10);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 10 Great Balls!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }),
            new RedeemableCode('typed-held-item', -2046503095, false, async () => {
                // Give the player 3 random typed held items
                const items = Object.values(ItemList).filter((i) => i.constructor.name === 'TypeRestrictedAttackBonusHeldItem')
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                items.forEach((i) => i.gain(1));
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 3 random Held Items, that boosts a specific type!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MaxRegionRequirement(Region.johto)),

            new RedeemableCode('eon-ticket', 528036885, false, async () => {
                // Give the player the Eon Ticket
                App.game.keyItems.gainKeyItem(KeyItemType.Eon_ticket, true);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You got an Eon Ticket!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MaxRegionRequirement(Region.hoenn)),

            new RedeemableCode('ampharosite', -512934122, false, async () => {
                // Give the player Mega Ampharos
                player.gainMegaStone(MegaStoneType.Ampharosite);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained an Ampharosite!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
            }, new MultiRequirement([new MaxRegionRequirement(Region.kalos), new ObtainedPokemonRequirement('Ampharos')])),
            new RedeemableCode('refund-vitamins', 1316108150, false, async () => {
                const vitamins = GameHelper.enumStrings(VitaminType).map((name) => ItemList[name]);
                const toRefund = vitamins.map((item) => {
                    const totalUsed = App.game.party.caughtPokemon.reduce(
                        (total, pokemon) => total + pokemon.vitaminsUsed[item.type](), 0,
                    );
                    const totalNotUsed = player.itemList[item.name]();
                    const capPriceAt = Math.ceil(Math.log(100) / Math.log(item.multiplier));

                    let n = 0;
                    if (totalUsed + totalNotUsed > capPriceAt) {
                        n = totalUsed > capPriceAt
                            ? totalNotUsed
                            : totalNotUsed + totalUsed - capPriceAt;
                    }

                    return [item, n];
                }) as [Item, number][];

                const refundAmounts = toRefund.reduce((totals, [item, n]) => {
                    if (totals[item.currency] === undefined) {
                        // eslint-disable-next-line no-param-reassign
                        totals[item.currency] = 0;
                    }
                    const price = Math.round(item.basePrice * (player.itemMultipliers[item.saveName] || 1));
                    // eslint-disable-next-line no-param-reassign
                    totals[item.currency] += n * price;

                    return totals;
                }, {} as Record<Currency, number>);

                const refund = await Notifier.confirm({
                    title: 'Refund Unused Vitamins',
                    message: `<p class='text-center'>This will refund ${
                        toRefund.map(([item, n]) => `${
                            n.toLocaleString('en-US')
                        } ${item.name}`).join(', ')
                    } for a total of ${
                        Object.entries(refundAmounts)
                            .map(([curr, amt]) => `${amt.toLocaleString('en-US')} ${Currency[curr]}`)
                            .join(', ')
                    }.</br></br>You can only do this once.</br>Are you sure?</p>`,
                });

                if (refund) {
                    toRefund.forEach(([item, n]) => {
                        player.loseItem(item.name, n);
                    });

                    Object.entries(refundAmounts).forEach(([curr, amt]) => {
                        const refundAmt = new Amount(amt, Number(curr));
                        App.game.wallet.addAmount(refundAmt, true);
                    });

                    Notifier.notify({
                        title: 'Code Activated!',
                        message: 'All unused vitamins refunded.',
                        type: NotificationConstants.NotificationOption.success,
                        timeout: 1e4,
                    });
                }

                return refund;
            }),
            new RedeemableCode('tutorial-skip', -253994129, false, async () => {
                const quest = App.game.quests.getQuestLine('Tutorial Quests');
                if (quest.state() != QuestLineState.started) {
                    Notifier.notify({
                        title: 'Tutorial Skip',
                        message: 'The Tutorial is already completed.',
                        type: NotificationConstants.NotificationOption.warning,
                        timeout: 1e4,
                    });
                    return false;
                }

                if (quest.curQuest() < 1) {
                    Notifier.notify({
                        title: 'Tutorial Skip',
                        message: 'The first step of the Tutorial must first be completed.',
                        type: NotificationConstants.NotificationOption.warning,
                        timeout: 1e4,
                    });
                    return false;
                }

                while (quest.curQuest() < quest.totalQuests) {
                    quest.curQuestObject().complete();
                }

                return true;
            }),
            new RedeemableCode('Rare Candy', -296173205, false, async () => {
                // Give the player a few Rare Candies
                player.gainItem('Rare_Candy', 10);
                // Notify that the code was activated successfully
                Notifier.notify({
                    title: 'Code activated!',
                    message: 'You gained 10 Rare Candy!',
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 1e4,
                });

                return true;
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
