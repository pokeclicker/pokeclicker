
class Trainer {

    constructor(
        public name: string,
        public team: GymPokemon[]
    ) { }

    get image(): string {
        return `assets/images/trainers/${this.name}.png`;
    }

}
