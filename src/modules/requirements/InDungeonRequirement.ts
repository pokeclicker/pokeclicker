import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class InDungeonRequirement extends Requirement {
    constructor(public dungeon: string, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(DungeonRunner.dungeon.name === this.dungeon);
    }

    public hint(): string {
        return `You must be in the ${
            this.dungeon
        } dugeon`;
    }
}
