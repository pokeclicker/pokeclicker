import {Observable, PureComputed} from 'knockout';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';

export const TRADE_DOWN_AMOUNT = 3;

export class UndergroundTrading {
    private static _selectedTradeFromItem: Observable<UndergroundItem | null> = ko.observable(null);
    private static  _selectedTradeToItem: Observable<UndergroundItem | null> = ko.observable(null);
    private static  _tradeAmount: Observable<number> = ko.observable(0);

    private static  _computedAvailableItemsToTradeList: PureComputed<UndergroundItem[]> = ko.pureComputed<UndergroundItem[]>(() => {
        return UndergroundItems.getUnlockedItems().filter(item => ![UndergroundItemValueType.MegaStone].includes(item.valueType));
    });

    private static  _computedTradeToItemList: PureComputed<UndergroundItem[]> = ko.pureComputed<UndergroundItem[]>(() => {
        if (this._selectedTradeFromItem() == null) {
            return [];
        }

        // TODO : Make Fossils only tradeable when you already have either 1 fossil or the pokemon, need to dig it up once first

        // TODO : Make MegaStones and Pikachu untradeable

        return UndergroundItems.getUnlockedItems().filter(item => this._selectedTradeFromItem().valueType === item.valueType);
    });

    public static trade(): boolean {
        if (this.selectedTradeFromItem == null || this.selectedTradeToItem == null) {
            return false;
        }

        const tradeFromAmount = this.tradeAmount * 3;
        const tradeToAmount = this.tradeAmount;

        if (player.itemList[this.selectedTradeFromItem.itemName]() < tradeFromAmount) {
            return false;
        }

        player.loseItem(this.selectedTradeFromItem.itemName, tradeFromAmount);
        player.gainItem(this.selectedTradeToItem.itemName, tradeToAmount);

        return true;
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
