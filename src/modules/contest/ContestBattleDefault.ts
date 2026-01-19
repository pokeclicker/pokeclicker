import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestTypeHelper from '../types/ContestTypeHelper';
import ContestBattle from './ContestBattle';
import ContestRunner from './ContestRunner';
import ContestScore from './ContestScore';

export default class ContestBattleDefault {
    public static tick() {
        return ContestBattleDefault.changeBeat();
    }

    public static changeBeat() {
        if (ContestBattle.counter >= Math.max(200, 700 - 100 * ContestRunner.rank())) {
            if (ContestBattle.beat() >= 2) {
                ContestBattle.beat(0);
            } else {
                ContestBattle.beat(ContestBattle.beat() + 1);
            }
            ContestBattle.counter = 0;
        }
    }

    public static judgeBeat() {
        if (ContestRunner.frenzyMode()) {
            ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
            ContestScore.increaseChain();
            ContestBattle.defeatContestPokemon();
            return;
        }

        // Determine timing press
        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        const visual = Math.max(...pk.contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestRunner.type()] * 2));
        if (ContestBattle.beat() + visual >= 2) {
            ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
            ContestScore.increaseChain();
        } else {
            ContestScore.breakChain();
            pk.status(ContestOpponentStatus.Jammed);
        }

        // Defeat pokemon
        ContestBattle.defeatContestPokemon();
        ContestBattle.beat(0);
        ContestBattle.counter = 0;
        return;
    }
}
