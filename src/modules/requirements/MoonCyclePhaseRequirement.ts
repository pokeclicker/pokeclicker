import { AchievementOption, camelCaseToString } from '../GameConstants';
import Requirement from './Requirement';
import MoonCyclePhase from '../moonCycle/MoonCyclePhase';
import MoonCycle from '../moonCycle/MoonCycle';

export default class MoonCyclePhaseRequirement extends Requirement {
    constructor(public moonCyclePhases: MoonCyclePhase[], option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress(): number {
        return Number(this.moonCyclePhases.includes(MoonCycle.currentMoonCyclePhase()));
    }

    public hint(): string {
        return `The moon phase must be ${camelCaseToString(this.moonCyclePhases.map((moonCyclePhase) => MoonCyclePhase[moonCyclePhase]).join(' or '))}`;
    }
}
