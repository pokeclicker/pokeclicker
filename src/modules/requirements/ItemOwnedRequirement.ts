import { AchievementOption } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import Requirement from './Requirement';

export default class ItemOwnedRequirement extends Requirement {
    constructor(public itemName: string, amount: number = 1, option: AchievementOption = AchievementOption.more) {
        super(amount, option);
    }

    public getProgress() {
        return player.itemList[this.itemName]();
    }

    public hint(): string {
        const amountHint = this.option === AchievementOption.equal ? this.requiredValue :
            (this.option === AchievementOption.more ? `${this.requiredValue} or more` : `less than ${this.requiredValue}`);
        return `You must own ${amountHint} ${ItemList[this.itemName].displayName}.`;
    }
}
