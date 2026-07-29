import Trainer from '../battles/Trainer';
import ContestPokemon from './ContestPokemon';
import ContestTrainerOptions from '../interfaces/ContestTrainerOptions';

export default class ContestTrainer extends Trainer {
    constructor(
        name: string,
        trainerClass: string,
        team: ContestPokemon[],
        subTrainerClass?: string,
        public options?: ContestTrainerOptions,
    ) {
        super(trainerClass, team, name, subTrainerClass);
    }

    public getTeam() {
        return super.getTeam() as ContestPokemon[];
    }
}
