///<reference path="../trainers/Trainer.ts"/>

class DungeonTrainer extends Trainer {

    constructor(
        trainerClass: string,
        team: GymPokemon[],
        public options?: EnemyOptions,
        name?: string,
        subTrainerClass?: string) {
        super(trainerClass, team, name, subTrainerClass);
    }

}
