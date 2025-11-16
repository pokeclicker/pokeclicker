///<reference path="../contest/ContestBattlePokemon.ts"/>
///<reference path="../contest/ContestRunner.ts"/>
///<reference path="../contest/ContestHelper.ts"/>
///<reference path="../contest/ContestBattleDanceCombos.ts"/>
///<reference path="../../declarations/enums/ContestOpponentStatus.d.ts"/>

class ContestBattleDance {
    public static tick() {
        if (!ContestBattle.frenzyMode()) {
            if (ContestBattle.counter >= Math.max(1500 - 250 * ((ContestRunner.rank() - 1) % 4), 700)) {
                ContestBattle.pokemons().filter(p => ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p))).forEach(p => {
                    if (p.status() === ContestOpponentStatus.Dancing) {
                        p.danceHearts() >= 1 ? p.danceHearts(p.danceHearts() - 1) : p.status(ContestOpponentStatus.Jammed);
                    }
                    if (p.isRallied() && p.danceHearts() > 0) {
                        p.status(ContestOpponentStatus.Dancing);
                    }
                    if (p.status() === ContestOpponentStatus.Appealed) {
                        p.status(ContestOpponentStatus.Dancing);
                    }
                });

                // Change dance beat
                const typeValues = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough];
                ContestBattle.counter = 0;
                ContestBattle.crotchetValue(typeValues[(ContestBattle.crotchetValue() + 1) % 5]);
            }

            return;
        }
    }

    // Controls
    // Spacebar
    public static judgeBeat() {
        if (ContestBattle.frenzyMode()) {
            ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
            // Default to random pose
            if (isNaN(ContestBattle.finishingPose()[ContestBattle.selectedEnemy()])) {
                ContestBattle.finishingPose.splice(ContestBattle.selectedEnemy(), 1, Rand.fromArray(GameHelper.enumNumbers(Direction)));
            }
            // Apply Dancing status to show dance hearts
            ContestBattle.pokemons()[ContestBattle.selectedEnemy()].status(ContestOpponentStatus.Dancing);
            ContestBattle.defeatContestPokemon();
            return;
        }

        // Restore dance hearts for worn-out pokemon
        ContestBattle.pokemons().filter(p =>
            !p.danceHearts() && p.status() === ContestOpponentStatus.Dancing && ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p))
        ).forEach(p => p.danceHearts(1 + ContestTypeHelper.getAppealModifier([ContestBattle.crotchetValue()], [ContestRunner.type()]) * 2));
        return;
    }

    // Directional keys
    public static dance(direction: number) {
        if (ContestBattle.frenzyMode()) {
            ContestBattleDance.frenzyDance(direction);
            return;
        }

        const dancers = ContestBattle.pokemons().filter(p => ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p)) && p.dance()[0] === direction);

        if (dancers.length <= 0) {
            ContestScore.breakChain();
        }

        dancers.forEach(p => {
            // Use crotchet as move value
            ContestBattle.moveArray()[ContestBattle.pokemons().indexOf(p)].push(ContestBattle.crotchetValue());

            // Gather dance hearts
            p.danceHearts(p.danceHearts() + 2 * ContestTypeHelper.getAppealModifier([ContestBattle.crotchetValue()], [ContestRunner.type()]));

            if (p.dance().length) {
                // Go to next dance move
                const dancing = p.dance();
                dancing.shift();
                p.dance(dancing);

                // Rally when dance completed
                if (!p.dance().length) {
                    ContestBattle.rallyPokemon(ContestBattle.pokemons().indexOf(p));
                }
            }

            ContestBattle.defeatContestPokemon(ContestBattle.pokemons().indexOf(p), false);
        });

        if (ContestBattle.pokemons().every(p => !p.dance().length)) {
            // Replace Dancing with Appealed status for visual feedback
            ContestBattle.pokemons().filter(p => p.status() != ContestOpponentStatus.Jammed).forEach(p => p.status(ContestOpponentStatus.Appealed));
            ContestBattle.resetTrainers();
        }
    }

    public static frenzyDance(direction: number) {
        ContestBattle.useContestMove(direction);

        ContestBattle.finishingPose.splice(ContestBattle.selectedEnemy(), 1, direction);

        // Give or take dance hearts
        const move = ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves[direction];
        const matchup = ContestTypeHelper.getAppealModifier([move.moveType], [ContestRunner.type()]);
        const p = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        if (matchup >= 1) {
            ContestBattle.pokemons().filter(p => p.contestTypes.includes(move.moveType)).forEach(p => p.danceHearts(p.danceHearts() + 1));
        }
        if (matchup > 0) {
            p.danceHearts(p.danceHearts() + 1);
        }
        if (matchup <= 0) {
            p.danceHearts(p.danceHearts() - 1);
            ContestBattle.pokemons().forEach(p => p.danceHearts(p.danceHearts() - 1));
        }
        return;
    }

    public static danceHeartScoreBonus() {
        let sum = 0;
        ContestBattle.pokemons().forEach(p => sum += p.danceHearts());

        sum *= (10 + ContestBattleDanceCombos.poseBonus(ContestRunner.type(), ContestBattle.finishingPose())) / 10;

        return sum;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const dancing: string[] = new Array();
        pokemon.dance().forEach(d => dancing.push(ContestHelper.getArrowEmoji(d)));

        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Jammed) {
            return new Array(5).fill('🖤').join('');
        }
        if (pokemon.dance().length && !ContestBattle.frenzyMode()) {
            return dancing.join('');
        }

        if (pokemon.danceHearts() <= 5 && pokemon.danceHearts() > 0) {
            return new Array(pokemon.danceHearts()).fill('💗').join('');
        }
        if (pokemon.danceHearts() > 5) {
            return `×${pokemon.danceHearts()}💗`;
        }
        if (pokemon.danceHearts() < 0) {
            return `×${Math.abs(pokemon.danceHearts())}🖤`;
        }
        return new Array(1 + ContestTypeHelper.getAppealModifier([ContestBattle.crotchetValue()], [ContestRunner.type()]) * 2).fill('🤍').join('');
    }

    public static getDancingCss(pokemon: ContestBattlePokemon) {
        if (ContestBattle.frenzyMode()) {
            return `walk${Direction[ContestBattle.finishingPose()[ContestBattle.pokemons().indexOf(pokemon)] ?? Direction.Down]}`;
        }

        if (pokemon.status() != ContestOpponentStatus.Waiting || !ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(pokemon))) {
            return 'walkDown';
        }

        if (pokemon.dance().length) {
            return `walk${Direction[pokemon.dance()[0]]}`;
        }
    }
}
