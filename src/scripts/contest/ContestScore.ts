///<reference path="../contest/ContestBattlePokemon.ts"/>
///<reference path="../contest/ContestBattleDance.ts"/>
///<reference path="../contest/ContestTrainer.ts"/>
///<reference path="../contest/ContestRunner.ts"/>
///<reference path="../contest/ContestHelper.ts"/>

class ContestScore {
    static totalScore: KnockoutObservable<number> = ko.observable(0);
    static activeChain: KnockoutObservable<number> = ko.observable(1);

    public static increaseScore(score: number) {
        const addedScore = Math.round(score * ContestScore.activeChain());
        ContestScore.totalScore(ContestScore.totalScore() + addedScore);
        return;
    }

    public static increaseChain(multiplierCap: number, amount = 1) {
        const currentChain = Math.max(1, ContestScore.activeChain()) * 10;
        const cap = multiplierCap * 10;
        const newChain = Math.min(cap, currentChain + Math.round(amount));
        ContestScore.activeChain(Math.max(1, newChain / 10));
        return;
    }

    public static breakChain() {
        ContestScore.activeChain(1);
        return;
    }

    public static calculateMoveScore(contestTypes: ContestType[], contestRunnerType: ContestType, baseNumber = 1) {
        let sum = baseNumber;
        contestTypes.forEach(moveType => {
            const matchup = contestRunnerType === ContestType.Balanced ? 0.5 : ContestTypeHelper.getAppealModifier([moveType], [contestRunnerType]);
            sum += matchup;
        });
        return Math.max(sum, baseNumber);
    }
}
