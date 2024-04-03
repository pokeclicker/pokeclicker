/**
 * Contest class
 */
class Contest {
    public onclick(): void {
        ContestRunner.startContest(this);
    }

    constructor(
        public rank: ContestRank,
        public contestType: ContestType,
        public moneyReward: number = 0,
        public pokemons: PartyPokemon[] = App.game.party.caughtPokemon.filter((p) => {
            const pk = PokemonHelper.getPokemonById(p.id);
            return [pk.contestType1, pk.contestType2, pk.contestType3].find(c => c === contestType || c === ContestType.Balanced) !== -1;
        }),
        public rewardFunction = () => {}, // TODO: ribbons
        public trainers: ContestTrainer[] = ContestOpponents[rank]
    ) {
    }

    public getTrainerList() {
        return this.trainers.filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }
}
