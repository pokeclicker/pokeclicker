import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class ChallengeRequirement extends Requirement {
    public challenge: string;
    public enabled: boolean; // true if needs the challenge to be enabled, false otherwise

    constructor(challenge: string, enabled: boolean = true, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.challenge = challenge;
        this.enabled = enabled;
    }

    public getProgress(): number {
        // Check both challenge lists
        return +(App.game.challenges.list[this.challenge]?.active() === this.enabled || App.game.challenges.listSpecial[this.challenge]?.active() === this.enabled);
    }

    public hint(): string {
        return `Requires the ${App.game.challenges.list[this.challenge]?.type || App.game.challenges.listSpecial[this.challenge]?.type} Challenge to be ${this.enabled ? 'enabled' : 'disabled'}.`;
    }
}
