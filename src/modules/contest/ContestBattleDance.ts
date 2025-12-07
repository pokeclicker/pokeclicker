import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestType from '../enums/ContestType';
import Direction from '../enums/Direction';
import GameHelper from '../GameHelper';
import ContestTypeHelper from '../types/ContestTypeHelper';
import Rand from '../utilities/Rand';
import ContestBattle from './ContestBattle';
import ContestBattleDanceCombos from './ContestBattleDanceCombos';
import ContestBattlePokemon from './ContestBattlePokemon';
import ContestHelper from './ContestHelper';
import ContestRunner from './ContestRunner';
import ContestScore from './ContestScore';

export default class ContestBattleDance {
    public static tick() {
        if (!ContestRunner.frenzyMode()) {
            if (ContestBattle.counter >= Math.max(1500 - 250 * ((ContestRunner.rank() - 1) % 4), 700)) {
                ContestBattle.pokemons().filter(p => ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p))).forEach((p: ContestBattlePokemon) => {
                    if (p.status() === ContestOpponentStatus.Dancing) {
                        if (p.danceHearts() >= 1) {
                            p.danceHearts(p.danceHearts() - 1);
                        } else {
                            if (p.status() != ContestOpponentStatus.Jammed) {
                                ContestScore.breakChain();
                            }
                            p.status(ContestOpponentStatus.Jammed);
                        }
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
        if (ContestRunner.frenzyMode()) {
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
            p.status() === ContestOpponentStatus.Dancing && ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p)),
        ).forEach(p => {
            const matchup = 1 + ContestTypeHelper.getAppealModifier([ContestBattle.crotchetValue()], [ContestRunner.type()]) * 2;
            if (p.danceHearts() <= 0) {
                ContestScore.increaseChain(matchup);
            }
            p.danceHearts(Math.min(3, p.danceHearts() + matchup));
        });
        return;
    }

    // Directional keys
    public static dance(direction: number) {
        if (ContestRunner.frenzyMode()) {
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

            ContestScore.increaseChain();
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
            ContestBattle.pokemons().filter(pk => pk.contestTypes.includes(move.moveType)).forEach(pk => pk.danceHearts(p.danceHearts() + 1));
        }
        if (matchup > 0) {
            p.danceHearts(p.danceHearts() + 1);
        }
        if (matchup <= 0) {
            p.danceHearts(p.danceHearts() - 1);
            ContestBattle.pokemons().forEach(pk => pk.danceHearts(p.danceHearts() - 1));
        }
        return;
    }

    public static frenzyHeartsTotal() {
        let sum = 0;
        ContestBattle.pokemons().forEach(p => { sum += p.danceHearts(); });
        return sum;
    }

    public static danceHeartScoreBonus() {
        let sum = ContestBattleDance.frenzyHeartsTotal();
        sum *= (10 + ContestBattleDanceCombos.poseBonus(ContestRunner.type(), ContestBattle.finishingPose())) / 10;
        return sum;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const dancing: string[] = [];
        pokemon.dance().forEach(d => dancing.push(ContestHelper.getArrowEmoji(d)));

        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Jammed) {
            return new Array(5).fill('🖤').join('');
        }
        if (pokemon.dance().length && !ContestRunner.frenzyMode()) {
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
        if (ContestRunner.frenzyMode()) {
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
