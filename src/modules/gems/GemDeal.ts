import type Item from '../items/Item';
import type PokemonType from '../enums/PokemonType';

export type GemCost = {
    gemType: PokemonType,
    amount: number,
};

export default class GemDeal {
    public gems: GemCost[];
    public item: { itemType: Item, amount: number };

    constructor(gemCosts: GemCost[], item: Item, itemAmount: number) {
        this.gems = gemCosts;
        this.item = { itemType: item, amount: itemAmount };
    }

    public isVisible(): boolean {
        return this.item.itemType.isVisible();
    }
}