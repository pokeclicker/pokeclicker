import { Currency, Region } from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import Amount from '../wallet/Amount';
import EventCollectibleItem from './EventCollectibleItem';
import ItemType from '../enums/ItemType';

export default class ChristmasPresent extends EventCollectibleItem {

    constructor(public size: number = 1) {
        super('Christmas_present', 'Christmas Present', 'A lovely Christmas present you opened.', 'Merry Christmas!');
    }

    public gain(amount = 1) {
        super.gain(amount);
        const scaling = player.highestRegion();
        const values: Partial<Record<Currency, number>> = {
            [Currency.money]: 50 * 3 ** scaling,
            [Currency.questPoint]: 5 * (1 + scaling) ** 2,
            [Currency.dungeonToken] : 35 * 2 ** scaling,
            [Currency.diamond]: 5 * (1 + scaling) ** 2,
            [Currency.farmPoint]: 15 * (1 + scaling) ** 2,
        };
        if (scaling >= Region.hoenn) {
            values[Currency.battlePoint] = (1 + scaling) ** 2;
        }

        const rewards: Partial<Record<Currency, number>> = {};
        let charcoal = 0;
        for (let i = 0; i < amount; i += 1) {
            const currency = Number(Rand.fromArray(Object.keys(values))) as Currency;
            rewards[currency] = (rewards[currency] ?? 0) + Math.round(values[currency] * this.size);
            if (scaling >= Region.johto && Rand.chance(100)) {
                charcoal++;
            }
        }

        const rewardMessages = Object.entries(rewards).map(([currency, value]) => {
            const cur = Number(currency) as Currency;
            const gained = App.game.wallet.addAmount(new Amount(value, cur), false).amount;
            return `<img src="assets/images/currency/${Currency[cur]}.svg" height="24px"/> ${gained.toLocaleString('en-US')}`;
        });
        if (charcoal) {
            const charcoalItem = { type: ItemType.item, id: 'Charcoal' };
            BagHandler.gainItem(charcoalItem, charcoal);
            rewardMessages.push(`<img src="${BagHandler.image(charcoalItem)}" height="24px"/> ${charcoal.toLocaleString('en-US')} Charcoal`);
        }

        Notifier.notify({
            message: `You opened ${amount.toLocaleString('en-US')} ${amount === 1 ? 'gift' : 'gifts'} and received ${rewardMessages.join(', ')}.`,
            type: NotificationConstants.NotificationOption.success,
            image: this.image,
            setting: NotificationConstants.NotificationSetting.Items.dropped_item,
        });
    }
}
