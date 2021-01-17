///<reference path="../trainers/Trainer.ts"/>

class DungeonTrainer extends Trainer {

    constructor(
        name: string,
        team: GymPokemon[],
        public reward: number,
        public weight = 1) {
        super(name, team);
    }

}
