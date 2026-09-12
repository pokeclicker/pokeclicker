import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import KeyItemType from '../enums/KeyItemType';

export default class ObtainedKeyItemRequirement extends Requirement {
    constructor(public keyItem: KeyItemType, obtained = true) {
        super(1, obtained ? AchievementOption.more : AchievementOption.less);
    }

    public getProgress() {
        return +App.game.keyItems.hasKeyItem(this.keyItem);
    }

    public hint(): string {
        return this.option === AchievementOption.more
            ? `${KeyItemType[this.keyItem]} needs to be obtained.`
            : `${KeyItemType[this.keyItem]} cannot be obtained yet.`;
    }
}
