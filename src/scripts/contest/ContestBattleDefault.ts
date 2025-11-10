///<reference path="../contest/ContestBattlePokemon.ts"/>
///<reference path="../contest/ContestRunner.ts"/>
///<reference path="../contest/ContestHelper.ts"/>
///<reference path="../../declarations/enums/ContestOpponentStatus.d.ts"/>

class ContestBattleDefault {
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
        if (ContestBattle.frenzyMode()) {
            ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
            ContestBattle.defeatContestPokemon();
            return;
        }

        // Determine timing press
        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        const visual = Math.max(...pk.contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestRunner.type()] * 2));
        if (ContestBattle.beat() + visual >= 2) {
            ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
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

    public static enemyTypes(index: number) {
        return ContestBattle.pokemons()[index].contestTypes;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Jammed) {
            return ('🖤').repeat(5);
        }
        if (ContestBattle.pokemons().indexOf(pokemon) != ContestBattle.selectedEnemy()) {
            return new Array(5).fill('🤍').join('');
        }
        if (ContestBattle.frenzyMode()) {
            return new Array(5).fill(ContestHelper.getContestEmoji(ContestRunner.type())).join('');
        }
        const visual = ContestBattle.beat() + Math.max(...ContestBattle.pokemons()[ContestBattle.pokemons().indexOf(pokemon)].contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestRunner.type()] * 2));
        return ContestBattle.healthDisplayBeat(visual, ContestHelper.getContestEmoji(ContestRunner.type()), '🖤', '🤍');
    }
}
