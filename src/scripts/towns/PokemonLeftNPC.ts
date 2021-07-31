class PokemonLeftNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public region: GameConstants.Region
    ) {
        super(name, dialog);
    }

    get dialogHTML(): string {

        const caughtPokemonCount = new Set(App.game.party.caughtPokemon.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) <= this.region).map(p => Math.floor(p.id))).size;
        const remainingPokemon = GameConstants.TotalPokemonsPerRegion[this.region] - caughtPokemonCount;

        const championBadge = new Map<GameConstants.Region, BadgeEnums>();
        championBadge.set(GameConstants.Region.kanto, BadgeEnums.Elite_KantoChampion);
        championBadge.set(GameConstants.Region.johto, BadgeEnums.Elite_JohtoChampion);
        championBadge.set(GameConstants.Region.hoenn, BadgeEnums.Elite_HoennChampion);
        championBadge.set(GameConstants.Region.sinnoh, BadgeEnums.Elite_SinnohChampion);
        championBadge.set(GameConstants.Region.unova, BadgeEnums.Elite_UnovaChampion);
        championBadge.set(GameConstants.Region.kalos, BadgeEnums.Elite_KalosChampion);
        championBadge.set(GameConstants.Region.alola, BadgeEnums.Elite_AlolaChampion);
        championBadge.set(GameConstants.Region.galar, BadgeEnums.Elite_GalarChampion);

        if (App.game.badgeCase.hasBadge(championBadge.get(this.region))) {
            if (remainingPokemon == 0) {
                return 'You\'ve done it, you\'ve caught all Pokémon in this region! Congratulations!';
            } else {
                return `You still have ${remainingPokemon} left to catch in this region! Keep up the good work!`;
            }
        } else {
            return 'The first step to catching all the Pokémon is becoming the Champion of the Elite Four!';
        }
    }
}
