class BattlePokemon implements EnemyPokemonInterface {

    health: KnockoutObservable<number>;
    maxHealth: KnockoutObservable<number>;
    healthPercentage: KnockoutObservable<number>;

    /**
     * In case you want to manually create a Pokémon instead of generating it from the route number
     * @param name Pokémon name
     * @param id Pokémon
     * @param type1 First type of the Pokémon
     * @param type2 Second type of the Pokémon
     * @param maxHealth max health that the Pokémon can have
     * @param level level is 2 times the current route
     * @param catchRate base chance of catching this Pokémon
     * @param exp base exp reward for defeating this Pokémon
     * @param money exp base exp reward for defeating this Pokémon
     * @param shiny
     * @param [heldItem] item to gain on defeat of this pokemon
     */

    constructor(
        public name: string,
        public id: number,
        public type1: PokemonType = PokemonType.None,
        public type2: PokemonType = PokemonType.None,
        maxHealth: number,
        public level: number,
        public catchRate: number,
        public exp: number,
        public money: number,
        public shiny: boolean,
        public shardReward = 1,
        public heldItem?: string
    ) {
        this.health = ko.observable(maxHealth);
        this.maxHealth = ko.observable(maxHealth);
        this.healthPercentage = ko.observable(100);
    }

    public isAlive(): boolean {
        return this.health() > 0;
    }

    /**
     * Lost health without
     * @param damage
     */
    public damage(damage: number): void {
        this.health(Math.max(0, this.health() - damage));
        this.healthPercentage(Math.floor(this.health() / this.maxHealth() * 100));
    }

    public defeat(trainer = false): void {
        GameHelper.incrementObservable(App.game.statistics.pokemonDefeated[this.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonDefeated);
        if (this.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonDefeated[this.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonDefeated);
        }

        if (this.money) {
            App.game.wallet.gainMoney(this.money);
        }

        if (this.heldItem && ItemList[this.heldItem]) {
            const item = ItemList[this.heldItem];
            const name = GameConstants.humanifyString(item.name());
            item.gain(1);
            const msg = `${this.name} dropped ${GameHelper.anOrA(name)} ${name}!`;
            Notifier.notify({ message: `The enemy ${msg}`, type: GameConstants.NotificationOption.success, setting: GameConstants.NotificationSetting.dropped_item });
            App.game.logbook.newLog(LogBookTypes.FOUND, `An enemy ${msg}`);
        }
        App.game.party.gainExp(this.exp, this.level, trainer);
        App.game.shards.gainShards(this.shardReward, this.type1);
        App.game.shards.gainShards(this.shardReward, this.type2);
    }
}


