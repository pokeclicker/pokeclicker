/// <reference path="../../declarations/utilities/getArrayOfObservables.d.ts"/>

class Shards implements Feature {
    name = 'Shards';
    saveKey = 'shards';

    public static readonly nTypes: number =
        GameHelper.enumLength(PokemonType) - 1;
    public static readonly nEffects: number =
        GameHelper.enumLength(GameConstants.TypeEffectiveness);
        
    private static readonly invalidUpgrades: Map<PokemonType, Set<GameConstants.TypeEffectiveness>> =
        
        new Map([
            // Immune
            [PokemonType.Fire, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Water, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Grass, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Ice, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Flying, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Bug, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Rock, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Dark, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Steel, new Set([GameConstants.TypeEffectiveness.Immune])],
            [PokemonType.Fairy, new Set([GameConstants.TypeEffectiveness.Immune])],
            // Super Effective
            [PokemonType.Normal, new Set([GameConstants.TypeEffectiveness.Very])],
        ]);

    defaults = {
        'shardWallet': Array<number>(Shards.nTypes).fill(0),
        'shardUpgrades': Array<number>(Shards.nTypes * Shards.nEffects).fill(0),
    };

    public shardWallet: Array<number>;
    public shardUpgrades: Array<number>;

    constructor() {
        this.shardWallet = getArrayOfObservables(this.defaults.shardWallet);
        this.shardUpgrades = getArrayOfObservables(this.defaults.shardUpgrades);
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
    
    private refundShardUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ) {
        while (this.shardUpgrades[typeNum * Shards.nEffects + effectNum] > 0) {
            this.shardUpgrades[typeNum * Shards.nEffects + effectNum]--;
            this.gainShards(this.getShardUpgradeCost(typeNum, effectNum), typeNum);
        }
    }
    
    public isInvalidUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ) {
        return Shards.invalidUpgrades.has(typeNum) && Shards.invalidUpgrades.get(typeNum).has(effectNum);
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
            this.shardWallet = getArrayOfObservables(json['shardWallet']);
            this.shardUpgrades = getArrayOfObservables(json['shardUpgrades']);
            // Refund invalid upgrades
            for (let t = 0; t < Shards.nTypes; t += 1) {
                for (let effect = 0; effect < Shards.nEffects; effect += 1) {
                    if (this.isInvalidUpgrade(t, effect)) {
                        this.refundShardUpgrade(t, effect);
                    }
                }
            }
        }
    }

    public openShardModal() {
        if (this.canAccess()) {
            $('#shardModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have the Shard Case',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}

namespace Shards {
    export const SHARD_UPGRADE_COST = 500;
    export const SHARD_UPGRADE_STEP = 0.1;
    export const MAX_SHARD_UPGRADES = 10;
}
