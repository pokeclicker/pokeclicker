import ContestType from '../enums/ContestType';
import ContestTypeHelper from '../types/ContestTypeHelper';

export default class ContestScore {
    static totalScore: KnockoutObservable<number> = ko.observable(0);
    static activeChain: KnockoutObservable<number> = ko.observable(0);
    static encoreBonus: KnockoutObservable<number> = ko.observable(1);

    public static increaseScore(score: number) {
        const addedScore = Math.round((score + ContestScore.activeChain()) * ContestScore.encoreBonus());
        ContestScore.totalScore(ContestScore.totalScore() + Math.max(0, addedScore));
        return;
    }

    public static increaseChain(amount = 1) {
        const currentChain = Math.max(1, ContestScore.activeChain());
        const newChain = currentChain + Math.round(Math.max(0, amount));
        ContestScore.activeChain(newChain);
        ContestScore.increaseScore(0);
        return;
    }

    public static breakChain() {
        ContestScore.activeChain(0);
        return;
    }

    public static calculateMoveScore(movesUsed: ContestType[], contestRunnerType: ContestType, baseNumber = 1) {
        let sum = baseNumber;
        movesUsed.forEach(moveType => {
            const matchup = contestRunnerType === ContestType.Balanced ? 0.5 : ContestTypeHelper.getAppealModifier([moveType], [contestRunnerType]);
            sum += matchup;
        });
        return Math.max(sum, baseNumber);
    }
}
