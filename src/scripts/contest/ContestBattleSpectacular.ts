///<reference path="../contest/ContestBattlePokemon.ts"/>
///<reference path="../contest/ContestRunner.ts"/>
///<reference path="../contest/ContestHelper.ts"/>
///<reference path="../contest/ContestScore.ts"/>
///<reference path="../contest/ContestBattleDefault.ts"/>
///<reference path="../../declarations/enums/ContestOpponentStatus.d.ts"/>

class ContestBattleSpectacular {
    static spotlightFormation: KnockoutObservable<number> = ko.observable(0);
    static activeSpectacularType: KnockoutObservable<number> = ko.observable(0);

    public static tick() {
        if (ContestBattle.frenzyMode()) {
            ContestBattleDefault.changeBeat();
            return;
        }
        // Cycle through affected pokemon
        if (ContestBattle.counter >= 600) {
            if (ContestBattleSpectacular.spotlightFormation() + 1 < ContestBattleSpectacular.moveRange(ContestBattle.selectedEnemy()).length) {
                ContestBattleSpectacular.spotlightFormation(ContestBattleSpectacular.spotlightFormation() + 1);
            } else {
                ContestBattleSpectacular.spotlightFormation(0);
            }
            ContestBattle.counter = 0;
        }
    }

    // Controls
    // Spacebar
    public static contestAction() {
        if (ContestBattle.frenzyMode()) {
            ContestBattleSpectacular.judgeBeat();
            return;
        }
    
        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        pk.rally(1);

        // Bonus for complete rally
        if (pk.isRallied()) {
            pk.status(ContestOpponentStatus.Spectacle);
            pk.usableMoves.every(m => m.pp(1));
            return;
        }

        // Penalty for incomplete rally
        pk.usableMoves.every(m => m.pp(0));
        ContestScore.breakChain();
        pk.status(ContestOpponentStatus.Jammed);
        ContestBattle.moveToNextTrainer();
        return;
    }

    // Directional keys
    public static useContestMove(direction: number) {
        const moves = ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves;
        const move = moves[direction];

        if (ContestBattle.frenzyMode()) {
            // Reset pp to make moves available if switching selection
            moves.forEach(m => m.pp(1));
            // Choose all moves of the selected move's type
            const talentMoves = moves.filter(m => m.moveType === move.moveType);
            talentMoves.forEach(m => m.pp(0));
            // Apply only chosen moves to array
            const newMoves = talentMoves.flatMap(t => t.moveType);
            ContestBattle.moveArray.splice(ContestBattle.selectedEnemy(), 1, newMoves);
            return;
        }

        // Add move to move array
        ContestBattle.useContestMove(direction);

        // Penlaty
        if (moves.every(m => m.pp() <= 0)) {
            // Apply jammed status now, to make it easier to overwrite a few lines down
            ContestBattle.pokemons()[ContestBattle.selectedEnemy()].status(ContestOpponentStatus.Jammed);
        }

        // Define effectiveness
        const matchup = ContestBattleSpectacular.activeSpectacularType() === ContestType.Balanced ? 1 : ContestTypeHelper.getAppealModifier([move.moveType], [ContestBattleSpectacular.activeSpectacularType()]);
        // Score
        ContestScore.increaseChain(Math.min(10, ContestRunner.rank() + 1), matchup * 2);
        ContestScore.increaseScore(ContestScore.calculateMoveScore([move.moveType], ContestRunner.type()));
        // Use move
        ContestBattle.pokemons().filter(p => ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p))).forEach(p => {
            const supportAppeal = matchup > 0 ? matchup : -0.5;
            // don't lower support if rallied
            if (!p.isRallied()) {
                p.rally(2 * supportAppeal);
            }
            if (p.isRallied()) {
                // move to next party pokemon, or give Spectacle rewards
                ContestBattle.defeatContestPokemon(ContestBattle.pokemons().indexOf(p), false);
                // Apply status after defeat, reverts back from Spectacle status too
                p.status(ContestOpponentStatus.Appealed);
            }
        })

        // Spectacular Balanced gimmick, type relay
        if (ContestRunner.type() === ContestType.Balanced) {
            ContestBattleSpectacular.activeSpectacularType(move.moveType);
        }

        // Safely move on to next trainer independent of Pokemon defeat
        ContestBattle.moveToNextTrainer();
        return;
    }

    // Gimmicks
    // Frenzy
    public static judgeBeat() {
        // default success
        ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());

        // bonus success
        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        const visual = Math.max(...pk.contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestRunner.type()] * 2));
        if (ContestBattle.beat() + visual >= 2) {
            pk.status(ContestOpponentStatus.Spectacle);
        }

        // save move type before defeating pokemon
        const spectacularMove = ContestBattle.moveArray()[ContestBattle.selectedEnemy()][0] ?? ContestBattleSpectacular.activeSpectacularType();

        // the usual
        ContestBattle.defeatContestPokemon();
        ContestBattle.beat(0);
        ContestBattle.counter = 0;

        // apply type relay gimmick after frenzy time reward
        if (ContestRunner.type() === ContestType.Balanced) {
            ContestBattleSpectacular.activeSpectacularType(spectacularMove);
        }

        return;
    }

    public static addFrenzyTime() {
        const multiplier = ContestScore.calculateMoveScore(ContestBattle.moveArray()[ContestBattle.selectedEnemy()], ContestBattleSpectacular.activeSpectacularType(), 0);
        const time = Math.min(10 * GameConstants.SECOND, ContestRunner.frenzyTime() + multiplier * GameConstants.SECOND);
        ContestRunner.frenzyTime(time);
    }

    // Spectacle status Trainer rewards
    public static spectacularReward() {
        const opponentIndex = ContestBattle.selectedEnemy();
        // Roll for trainer item rewards
        ContestBattle.trainers()[opponentIndex].options?.itemReward?.forEach(i => ContestBattle.addContestItemReward(i, true));
        // Frenzy Time
        ContestBattleSpectacular.addFrenzyTime();
        // Score bonus
        ContestScore.increaseScore(10);
        // Berry bonus
        ContestBattle.addContestBerryReward(ContestBattle.trainers()[opponentIndex].options?.rankedBerryReward?.rank ?? ContestRunner.rank(), ContestBattle.trainers()[opponentIndex].options?.rankedBerryReward?.amount ?? 2, true);
    }

    public static moveRange(performerIndex: number): number[][] {
        const choreos = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1],
            [1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
        ];
        const activeFormations = choreos.filter((f) => f[performerIndex] > 0);
        return activeFormations;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Spectacle) {
            return ('⭐').repeat(5);
        }

        if (ContestBattle.frenzyMode()) {
            if (ContestBattle.pokemons().indexOf(pokemon) != ContestBattle.selectedEnemy()) {
                return new Array(5).fill('🔹').join('');
            }
            const visual = ContestBattle.beat() + Math.max(...ContestBattle.pokemons()[ContestBattle.pokemons().indexOf(pokemon)].contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestBattleSpectacular.activeSpectacularType()] * 2));
            return ContestBattle.healthDisplayBeat(visual, '⭐', ContestHelper.getContestEmoji(ContestBattleSpectacular.activeSpectacularType()), '🔹');
        }

        let heart = '🤍';
        if (oppStatus === ContestOpponentStatus.Jammed) {
            heart = '🖤';
            if (ContestBattle.prepareNextTrainerBatch()) {
                return (heart).repeat(5);
            }
        }
        return new Array(ContestHelper.getContestEmoji(ContestBattleSpectacular.activeSpectacularType()).repeat(pokemon.support())).concat(heart.repeat(5 - pokemon.support())).join('');
    }
}
