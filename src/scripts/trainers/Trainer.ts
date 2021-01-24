
class Trainer {

    public name: string;

    constructor(
        public trainerClass: string,
        public team: GymPokemon[],
        name?: string,
        public subTrainerClass?: string
    ) {
        this.name = name ? `${trainerClass} ${name}` : trainerClass;
    }

    get image(): string {
        const imageName = this.subTrainerClass ? `${this.trainerClass} ${this.subTrainerClass}` : this.trainerClass;
        return `assets/images/trainers/${imageName}.png`;
    }

}
