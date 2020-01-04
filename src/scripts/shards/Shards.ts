class Shards implements Feature {
    name: string = "Shards";
    saveKey: string = "shards";

    defaults = {
        'shardWallet': Array.apply(null, Array<number>(18)).map(() => 0),
        'shardUpgrades': Array.apply(null, Array<number>(18 * 4)).map(() => 0),
    };

    public shardWallet: ArrayOfObservables<number>;
    public shardUpgrades: ArrayOfObservables<number>;

    constructor() {
        this.shardWallet = new ArrayOfObservables(this.defaults.shardWallet);
        this.shardUpgrades = new ArrayOfObservables(this.defaults.shardUpgrades);
    }

    public gainShards(pokemon: BattlePokemon) {
        let typeNum = GameConstants.PokemonType[pokemon.type1];
        this.shardWallet[typeNum] += pokemon.shardReward;
        GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        
        if (pokemon.type2 != GameConstants.PokemonType.None) {
            typeNum = GameConstants.PokemonType[pokemon.type2];
            this.shardWallet[typeNum] += pokemon.shardReward;
            GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        }
    }

    public getShardUpgradeCost(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        let cost = (this.getShardUpgrade(typeNum, effectNum) + 1) * GameConstants.SHARD_UPGRADE_COST;
        return cost;
    }

    public hasMaxUpgrade(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        return this.getShardUpgrade(typeNum, effectNum) >= GameConstants.MAX_SHARD_UPGRADES;
    }

    public canBuyShardUpgrade(
            typeNum: GameConstants.PokemonType, 
            effectNum: GameConstants.TypeEffectiveness
    ): boolean {  
        let lessThanMax = !this.hasMaxUpgrade(typeNum, effectNum);
        let hasEnoughShards = this.shardWallet[typeNum] >= this.getShardUpgradeCost(typeNum, effectNum);
        return lessThanMax && hasEnoughShards;
    }

    public buyShardUpgrade(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ) {
        if (this.canBuyShardUpgrade(typeNum, effectNum)) {
            this.shardWallet[typeNum] -= this.getShardUpgradeCost(typeNum, effectNum);
            this.shardUpgrades[typeNum * 4 + effectNum] ++;
        }
    }

    public getShardUpgrade(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ) {
        return this.shardUpgrades[typeNum * 4 + effectNum];
    }

    initialize() {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Shard_case);
    }

    update(delta: number) {
    }

    toJSON(): object {
        return {
            'shardWallet': this.shardWallet.map(x => x),
            'shardUpgrades': this.shardUpgrades.map(x => x),
        }
    }

    fromJSON(json: object) {
        if (json == null) {
            return
        }

        if (json != null) {
            this.shardWallet = new ArrayOfObservables(json['shardWallet']);
            this.shardUpgrades = new ArrayOfObservables(json['shardUpgrades']);
        }
    }
}