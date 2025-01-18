/* eslint-disable no-underscore-dangle */

import { Observable } from 'knockout';
import {
    Currency, ITEM_PRICE_MULTIPLIER, humanifyString, camelCaseToString, pluralizeString,
} from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Requirement from '../requirements/Requirement';
import Amount from '../wallet/Amount';
import { MultiplierDecreaser, ShopOptions } from './types';

export default class Item {
    saveName: string;
    type: any;

    // Shop Details
    price: Observable<number>;
    multiplier: number;
    multiplierDecrease: boolean;
    multiplierDecreaser: MultiplierDecreaser;

    maxAmount: number;
    _description?: string;
    _displayName: string;
    imageDirectory?: string;
    visible?: Requirement;

    constructor(
        public name: string,
        public basePrice: number = Infinity,
        public currency: Currency = Currency.money,
        {
            saveName = '',
            maxAmount = Number.MAX_SAFE_INTEGER,
            multiplier = ITEM_PRICE_MULTIPLIER,
            multiplierDecrease = true,
            multiplierDecreaser = MultiplierDecreaser.Battle,
            visible = undefined,
        } : ShopOptions = {},
        displayName?: string,
        description?: string,
        imageDirectory?: string,
    ) {
        // Base price needs to be positive, items that can't be purchased via currency should be priced at Infinity
        if (this.basePrice <= 0) {
            this.basePrice = Infinity;
            console.warn(`Item '${name}' created with invalid nonpositive base price, defaulting to Infinity`);
        }
        this.price = ko.observable(this.basePrice);
        // If no custom save name specified, default to item name
        this.saveName = saveName || name || `${name}|${Currency[currency]}`;
        this.maxAmount = maxAmount || Number.MAX_SAFE_INTEGER;
        // Multiplier needs to be 1 at minimum
        this.multiplier = Math.max(1, multiplier || ITEM_PRICE_MULTIPLIER);
        this.multiplierDecrease = this.multiplier > 1 ? multiplierDecrease : false;
        this.multiplierDecreaser = multiplierDecreaser || MultiplierDecreaser.Battle;
        this.visible = visible;

        this._displayName = displayName;
        this._description = description;
        this.imageDirectory = imageDirectory;
    }

    totalPrice(amount: number): number {
        const targetAmount = Math.min(amount, this.maxAmount);

        if (this.multiplier === 1) {
            return Math.max(0, this.basePrice * targetAmount);
        }

        // multiplier should be capped at 100, so work out how many to buy at increasing price and how many at max
        //    (m_start) * (m^k) = 100
        // => k = (2 - log(m_start)) / log(m)
        const mStart = Math.max(player.itemMultipliers[this.saveName] || 1, 1);
        const k = (mStart < 100)
            ? Math.ceil((2 - Math.log10(mStart)) / Math.log10(this.multiplier))
            : 0;
        const incAmount = Math.min(k, targetAmount);

        const incCost = (this.price() * (1 - (this.multiplier ** incAmount))) / (1 - this.multiplier);
        const maxCost = (this.basePrice * 100 * (targetAmount - incAmount));
        const total = incCost + maxCost;

        return Math.max(0, Math.round(total));
    }

    buy(amt: number) {
        if (amt <= 0) {
            return;
        }

        let n = amt;
        const displayName = pluralizeString(this.displayName, n);

        if (n > this.maxAmount) {
            Notifier.notify({
                message: `You can only buy ${this.maxAmount.toLocaleString('en-US')} &times; ${displayName}!`,
                type: NotificationConstants.NotificationOption.danger,
            });
            n = this.maxAmount;
        }

        if (!this.isAvailable() || this.isSoldOut()) {
            Notifier.notify({
                message: `${displayName} is sold out!`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        if (App.game.wallet.loseAmount(new Amount(this.totalPrice(n), this.currency))) {
            this.gain(n);
            this.increasePriceMultiplier(n);
            Notifier.notify({
                message: `You bought ${n.toLocaleString('en-US')} × <img src="${this.image}" height="24px"/> ${displayName}.`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.item_bought,
            });
        } else {
            let curr = camelCaseToString(Currency[this.currency]);
            switch (this.currency) {
                case Currency.money:
                    curr = 'Pokédollars';
                    break;
                default:
                    curr += 's';
                    break;
            }
            Notifier.notify({
                message: `You don't have enough ${curr} to buy ${n.toLocaleString('en-US')} ${displayName}!`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }
    }

    gain(n: number) {
        player.gainItem(this.name, n);
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    use(amount: number = 1, ...rest: any[]): boolean {
        return false;
    }

    checkCanUse(): boolean {
        if (!player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    // By default the item should be visible
    isVisible(): boolean {
        return this.visible?.isCompleted() ?? true;
    }

    // By default it is available if the item is currently visible
    isAvailable(): boolean {
        return this.isVisible();
    }

    // eslint-disable-next-line class-methods-use-this
    isSoldOut(): boolean {
        return false;
    }

    getDescription(): string {
        return this._description;
    }

    increasePriceMultiplier(amount = 1) {
        player.itemMultipliers[this.saveName] = Math.min(100, (player.itemMultipliers[this.saveName] || 1) * (this.multiplier ** amount));
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.saveName]));
    }

    decreasePriceMultiplier(amount = 1, multiplierDecreaser?: MultiplierDecreaser) {
        if (!this.multiplierDecrease) {
            return;
        }
        if (this.multiplierDecreaser !== multiplierDecreaser) {
            return;
        }
        player.itemMultipliers[this.saveName] = Math.max(1, (player.itemMultipliers[this.saveName] || 1) / (this.multiplier ** amount));
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.saveName]));
    }

    // eslint-disable-next-line class-methods-use-this
    init() {
        // Override in specific item class for any item specific initialization needed
    }

    get description() {
        return this._description;
    }

    get displayName() {
        return this._displayName ?? camelCaseToString(humanifyString(this.name));
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name}.png`;
    }
}
