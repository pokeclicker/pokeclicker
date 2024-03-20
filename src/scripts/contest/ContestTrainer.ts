///<reference path="../trainers/Trainer.ts"/>

class ContestTrainer extends Trainer {

    constructor(
        name: string,
        trainerClass: string,
        team: GymPokemon[],
        subTrainerClass?: string,
        public options?: EnemyOptions) {
        super(trainerClass, team, name, subTrainerClass);
    }

}
