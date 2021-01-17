///<reference path="../trainers/Trainer.ts"/>

class DungeonTrainer extends Trainer {

    constructor(
        name: string,
        team: GymPokemon[],
        public reward: number,
        public options?: EnemyOptions) {
        super(name, team);
    }

}
