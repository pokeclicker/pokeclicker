import * as GameConstants from '../GameConstants';
import { ItemList } from '../items/ItemList';
import MegaStoneItem from '../items/MegaStoneItem';
import AchievementRequirement from './AchievementRequirement';

export default class TotalMegaStoneObtainedRequirement extends AchievementRequirement {
    constructor(value: number) {
        super(value, GameConstants.AchievementOption.more, GameConstants.AchievementType['Mega Stone']);
    }

    public getProgress() {
        return Math.min(Object.values(ItemList).filter((i) => i instanceof MegaStoneItem && player.itemList[i.name]()).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Mega Stones need to be obtained.`;
    }
}
