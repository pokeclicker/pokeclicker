import Requirement from './Requirement';
import * as GameConstants from '../GameConstants';
import OakItemType from '../enums/OakItemType';

export default class OakItemLevelRequirement extends Requirement {
    private _oakItemType;

    constructor(oakItemType: OakItemType, level: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(level, option);
        this._oakItemType = oakItemType;
    }

    getProgress(): number {
        return Math.min(App.game.oakItems.itemList[this._oakItemType].level, this.requiredValue);
    }

    hint(): string {
        return `${GameConstants.humanifyString(OakItemType[this._oakItemType])} level ${this.requiredValue}`;
    }
}
