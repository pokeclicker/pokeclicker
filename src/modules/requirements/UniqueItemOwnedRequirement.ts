import { AchievementOption } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import ItemOwnedRequirement from './ItemOwnedRequirement';

export default class UniqueItemOwnedRequirement extends ItemOwnedRequirement {
    constructor(public itemName: string, private obtainText?: string) {
        super(itemName, 1, AchievementOption.more);
    }

    public hint(): string {
        return `You must ${this.obtainText ?? 'obtain'} ${ItemList[this.itemName].displayName} first.`;
    }
}
