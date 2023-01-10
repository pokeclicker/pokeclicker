/// <reference path="../../declarations/GameHelper.d.ts" />

class BattlePokemon implements EnemyPokemonInterface {

    health: KnockoutObservable<number>;
    maxHealth: KnockoutObservable<number>;
    healthPercentage: KnockoutObservable<number>;
    _displayName: KnockoutObservable<string>;

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
     * @param reward currency reward for defeating this Pokémon
     * @param shiny is a shiny variant
     * @param gender Pokémon gender
     * @param [heldItem] item to possibly gain for defeating this Pokémon
     */

    constructor(
        public name: PokemonNameType,
        public id: number,
        public type1: PokemonType = PokemonType.None,
        public type2: PokemonType = PokemonType.None,
        maxHealth: number,
        public level: number,
        public catchRate: number,
        public exp: number,
        public reward: Amount = new Amount(0, GameConstants.Currency.money),
        public shiny: boolean,
        public gemReward = 1,
        public gender: number,
        public heldItem?: BagItem,
        public ep?: number
    ) {
        this.health = ko.observable(maxHealth);
        this.maxHealth = ko.observable(maxHealth);
        this.healthPercentage = ko.observable(100);
        this._displayName = PokemonHelper.displayName(name);
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
        PokemonHelper.incrementPokemonStatistics(this.id, GameConstants.PokemonStatisticsType.Defeated, this.shiny, this.gender);

        if (this.reward.amount > 0) {
            App.game.wallet.addAmount(this.reward);
        }

        if (this.heldItem) {
            const name = BagHandler.displayName(this.heldItem);
            BagHandler.gainItem(this.heldItem);
            const msg = `${this.displayName} dropped ${GameHelper.anOrA(name)} ${name}!`;
            Notifier.notify({
                message: `The enemy ${msg} <img src="${BagHandler.image(this.heldItem)}" height="24px"/>`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dropped_item,
            });
            App.game.logbook.newLog(
                LogBookTypes.FOUND,
                createLogContent.enemyDrop({ pokemon: this.name, item: name })
            );
        }
        App.game.party.gainExp(this.exp, this.level, trainer);
        App.game.gems.gainGems(this.gemReward, this.type1);
        App.game.gems.gainGems(this.gemReward, this.type2);
    }

    get displayName(): string {
        return this._displayName();
    }
}
