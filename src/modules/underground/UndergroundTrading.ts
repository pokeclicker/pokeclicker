import { Observable, PureComputed } from 'knockout';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';

export const TRADE_DOWN_AMOUNT = 3;

export class UndergroundTrading {
    private static _selectedTradeFromItem: Observable<UndergroundItem | null> = ko.observable(null);
    private static  _selectedTradeToItem: Observable<UndergroundItem | null> = ko.observable(null);
    private static  _tradeAmount: Observable<number> = ko.observable(1);

    private static  _computedAvailableItemsToTradeList: PureComputed<UndergroundItem[]> = ko.pureComputed<UndergroundItem[]>(() => {
        return UndergroundItems.getUnlockedItems().filter(item => ![UndergroundItemValueType.Diamond, UndergroundItemValueType.MegaStone].includes(item.valueType));
    });

    private static  _computedTradeToItemList: PureComputed<UndergroundItem[]> = ko.pureComputed<UndergroundItem[]>(() => {
        if (this._selectedTradeFromItem() == null) {
            return [];
        }

        // TODO : Make Fossils only tradeable when you already have either 1 fossil or the pokemon, need to dig it up once first

        return this._computedAvailableItemsToTradeList().filter(item => {
            if (this._selectedTradeFromItem().id === item.id)
                return false;

            if (this._selectedTradeFromItem().valueType !== item.valueType)
                return false;

            return true;
        });
    });

    public static trade(): boolean {
        if (this.selectedTradeFromItem == null || this.selectedTradeToItem == null) {
            return false;
        }

        const tradeFromAmount = this.tradeAmount * TRADE_DOWN_AMOUNT;
        const tradeToAmount = this.tradeAmount;

        if (player.itemList[this.selectedTradeFromItem.itemName]() < tradeFromAmount) {
            return false;
        }

        player.loseItem(this.selectedTradeFromItem.itemName, tradeFromAmount);
        player.gainItem(this.selectedTradeToItem.itemName, tradeToAmount);

        return true;
    }

    static get canTrade(): boolean {
        return this.selectedTradeFromItem && this.tradeToItemList.includes(this.selectedTradeToItem) && this.tradeFromAmount <= player.itemList[this.selectedTradeFromItem.itemName]();
    }

    static get selectedTradeFromItem(): UndergroundItem | null {
        return this._selectedTradeFromItem();
    }

    static set selectedTradeFromItem(item: UndergroundItem | null) {
        this._selectedTradeFromItem(item);
    }

    static get selectedTradeToItem(): UndergroundItem | null {
        return this._selectedTradeToItem();
    }

    static set selectedTradeToItem(item: UndergroundItem | null) {
        this._selectedTradeToItem(item);
    }

    static get tradeFromAmount(): number {
        return this._tradeAmount() * TRADE_DOWN_AMOUNT;
    }

    static set tradeFromAmount(value: number) {
        this._tradeAmount(Math.floor(value / TRADE_DOWN_AMOUNT));
    }

    static get tradeAmount(): number {
        return this._tradeAmount();
    }

    static set tradeAmount(value: number) {
        this._tradeAmount(value);
    }

    static get availableItemsToTrade(): Array<UndergroundItem> {
        return this._computedAvailableItemsToTradeList();
    }

    static get tradeToItemList(): Array<UndergroundItem> {
        return this._computedTradeToItemList();
    }
}
