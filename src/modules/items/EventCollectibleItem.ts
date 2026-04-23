import { ShopOptions } from './types';
import { Currency } from '../GameConstants';
import CollectibleItem from './CollectibleItem';
import { SpecialEventTitleType } from '../specialEvents/SpecialEventTitleType';
import SpecialEventRequirement from '../requirements/SpecialEventRequirement';

export default class EventCollectibleItem extends CollectibleItem {
    constructor(
        name: string,
        displayName : string,
        description : string,
        eventName : SpecialEventTitleType,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        const req = new SpecialEventRequirement(eventName);
        super(name, displayName, description, req, basePrice, currency, options);
    }

}
