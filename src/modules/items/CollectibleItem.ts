import Item from './Item';
import { ShopOptions } from './types';
import { Currency } from '../GameConstants';
import Requirement from '../requirements/Requirement';

export default class CollectibleItem extends Item {
    constructor(
        name: string,
        displayName : string,
        description : string,
        private activeRequirement?: Requirement,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        super(name, basePrice, currency, { ...options }, displayName, description, 'collectible');
    }

    isActive(): boolean {
        return this.activeRequirement?.isCompleted() ?? true;
    }
}
