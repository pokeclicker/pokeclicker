import { Currency } from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Rand from '../utilities/Rand';
import Amount from '../wallet/Amount';
import Item from './Item';

export default class ChristmasPresent extends Item {

    constructor(public size: number = 1) {
        super('Christmas_present', undefined, undefined, undefined, 'Christmas Present');
    }

    public gain() {
        // Should not be acquired multiple times at once
        super.gain(1);
        const scaling = player.highestRegion();
        const values = {
            [Currency.money]: 50 * 3 ** scaling,
            [Currency.questPoint]: 5 * (1 + scaling) ** 2,
            [Currency.dungeonToken] : 35 * 2 ** scaling,
            [Currency.diamond]: 1 + scaling * 2,
            [Currency.farmPoint]: 15 * (1 + scaling) ** 2,
        };
        const cur = Number(Rand.fromArray(Object.keys(values)));
        const { amount } = App.game.wallet.addAmount(new Amount(Math.round(values[cur] * this.size), cur), false);
        Notifier.notify({
            message: `You opened the gift and received <img src="/assets/images/currency/${Currency[cur]}.svg" height="24px"/> ${amount.toLocaleString('en-US')}.`,
            type: NotificationConstants.NotificationOption.success,
            image: this.image,
        });
    }
    
    get description(): string {
        return 'A lovely Christmas Present.';
    }
}
