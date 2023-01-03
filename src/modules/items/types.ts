import Requirement from '../requirements/Requirement';

/**
 * Source event for decreasing shop multipliers
 */
export enum MultiplierDecreaser {
    Battle = 0,
    Berry,
}

/**
 * Additional shop options for an item
 */
export interface ShopOptions {
    saveName?: string,
    maxAmount?: number,
    multiplier?: number,
    multiplierDecrease?: boolean,
    multiplierDecreaser?: MultiplierDecreaser,
    visible?: Requirement,
}
