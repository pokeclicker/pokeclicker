class Shards implements Feature {
    name: string = "Shards";
    saveKey: string = "shards";

    public static readonly nTypes: number = 
        GameHelper.enumLength(GameConstants.PokemonType) - 1;
    public static readonly nEffects: number = 
        GameHelper.enumLength(GameConstants.TypeEffectiveness);

    defaults = {
        'shardWallet': Array.apply(null, Array<number>(Shards.nTypes)).map(() => 0),
        'shardUpgrades': Array.apply(null, Array<number>(
            Shards.nTypes * Shards.nEffects)).map(() => 0),
    };

    public shardWallet: ArrayOfObservables<number>;
    public shardUpgrades: ArrayOfObservables<number>;

    constructor() {
        this.shardWallet = new ArrayOfObservables(this.defaults.shardWallet);
        this.shardUpgrades = new ArrayOfObservables(this.defaults.shardUpgrades);
    }

    public gainShards(amt: number, typeNum: GameConstants.PokemonType) {
        this.shardWallet[typeNum] += amt;
        if (amt > 0) {
            GameHelper.incrementObservable(
                player.statistics.totalShards[typeNum], amt);
        }
        console.log(amt, GameConstants.PokemonType[typeNum])
    }

    public getShardUpgradeCost(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        let cost = (this.getShardUpgrade(typeNum, effectNum) + 1) * Shards.SHARD_UPGRADE_COST;
        return cost;
    }

    public hasMaxUpgrade(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        return this.getShardUpgrade(typeNum, effectNum) >= Shards.MAX_SHARD_UPGRADES;
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
            this.gainShards(-this.getShardUpgradeCost(typeNum, effectNum), typeNum);
            this.shardUpgrades[typeNum * Shards.nEffects + effectNum] ++;
        }
    }

    public getShardUpgrade(
        typeNum: GameConstants.PokemonType, 
        effectNum: GameConstants.TypeEffectiveness
    ) {
        return this.shardUpgrades[typeNum * Shards.nEffects + effectNum];
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
        if (json != null) {
            this.shardWallet = new ArrayOfObservables(json['shardWallet']);
            this.shardUpgrades = new ArrayOfObservables(json['shardUpgrades']);
        }
    }
}

namespace Shards {
    export const SHARD_UPGRADE_COST = 500;
    export const SHARD_UPGRADE_STEP = 0.1;
    export const MAX_SHARD_UPGRADES = 10;
}