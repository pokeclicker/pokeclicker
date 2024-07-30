import { AchievementOption } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import Requirement from './Requirement';

export default class ItemOwnedRequirement extends Requirement {
    constructor(public itemName: string, amount: number = 1, option: AchievementOption = AchievementOption.more) {
        super(amount, option);
    }

    public getProgress() {
        return Math.min(player.itemList[this.itemName](), this.requiredValue);
    }

    public hint(): string {
        const hintText = this.option === AchievementOption.equal ? this.requiredValue :
            (this.option === AchievementOption.more ? `${this.requiredValue} or more` : `less than ${this.requiredValue}`);
        return `You must own ${hintText} of ${ItemList[this.itemName].displayName}.`;
    }
}
