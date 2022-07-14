
class Trainer {

    public name: string;
    private team: GymPokemon[];

    constructor(
        public trainerClass: string,
        team: GymPokemon[],
        name?: string,
        public subTrainerClass?: string
    ) {
        this.name = name ? `${trainerClass} ${name}` : trainerClass;
        this.team = team;
    }

    get image(): string {
        const imageName = this.subTrainerClass ? `${this.trainerClass} ${this.subTrainerClass}` : this.trainerClass;
        return `assets/images/trainers/${imageName}.png`;
    }

    public getTeam() {
        return this.team.filter((p) => p.requirements.every((r => r.isCompleted())));
    }

}
