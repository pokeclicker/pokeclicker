class Shards implements Feature {
    name = 'Shards';
    saveKey = 'shards';

    public static readonly nTypes: number =
        GameHelper.enumLength(PokemonType) - 1;
    public static readonly nEffects: number =
        GameHelper.enumLength(GameConstants.TypeEffectiveness);

    defaults = {
        'shardWallet': Array<number>(Shards.nTypes).fill(0),
        'shardUpgrades': Array<number>(Shards.nTypes * Shards.nEffects).fill(0),
    };

    public shardWallet: ArrayOfObservables<number>;
    public shardUpgrades: ArrayOfObservables<number>;

    constructor() {
        this.shardWallet = new ArrayOfObservables(this.defaults.shardWallet);
        this.shardUpgrades = new ArrayOfObservables(this.defaults.shardUpgrades);
    }

    public gainShards(amt: number, typeNum: PokemonType) {
        if (!this.canAccess()) {
            return;
        }

        if (typeNum == PokemonType.None) {
            return;
        }
        this.shardWallet[typeNum] += amt;
        if (amt > 0) {
            GameHelper.incrementObservable(App.game.statistics.totalShardsGained, amt);
            GameHelper.incrementObservable(App.game.statistics.shardsGained[typeNum], amt);
        }
    }

    public getShardUpgradeCost(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        const cost = (this.getShardUpgrade(typeNum, effectNum) + 1) * Shards.SHARD_UPGRADE_COST;
        return cost;
    }

    public hasMaxUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        return this.getShardUpgrade(typeNum, effectNum) >= Shards.MAX_SHARD_UPGRADES;
    }

    public canBuyShardUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        const lessThanMax = !this.hasMaxUpgrade(typeNum, effectNum);
        const hasEnoughShards = this.shardWallet[typeNum] >= this.getShardUpgradeCost(typeNum, effectNum);
        return lessThanMax && hasEnoughShards;
    }

    public buyShardUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ) {
        if (this.canBuyShardUpgrade(typeNum, effectNum)) {
            this.gainShards(-this.getShardUpgradeCost(typeNum, effectNum), typeNum);
            this.shardUpgrades[typeNum * Shards.nEffects + effectNum] ++;
        }
    }

    public getShardUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        return this.shardUpgrades[typeNum * Shards.nEffects + effectNum];
    }

    initialize() {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Shard_case);
    }

    update(delta: number) {
    }

    toJSON(): Record<string, any> {
        return {
            'shardWallet': this.shardWallet.map(x => x),
            'shardUpgrades': this.shardUpgrades.map(x => x),
        };
    }

    fromJSON(json: Record<string, any>) {
        if (json != null) {
            this.shardWallet = new ArrayOfObservables(json['shardWallet']);
            this.shardUpgrades = new ArrayOfObservables(json['shardUpgrades']);
        }
    }

    public openShardModal() {
        if (this.canAccess()) {
            $('#shardModal').modal('show');
        } else {
            Notifier.notify({ message: 'You do not have the Shard Case', type: GameConstants.NotificationOption.warning });
        }
    }
}

namespace Shards {
    export const SHARD_UPGRADE_COST = 500;
    export const SHARD_UPGRADE_STEP = 0.1;
    export const MAX_SHARD_UPGRADES = 10;
}
