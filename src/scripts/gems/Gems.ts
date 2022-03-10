/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Gems implements Feature {
    name = 'Gems';
    saveKey = 'gems';

    public static readonly nTypes: number =
        GameHelper.enumLength(PokemonType) - 1;
    public static readonly nEffects: number =
        GameHelper.enumLength(GameConstants.TypeEffectiveness);
    defaults = {
        'gemWallet': Array<number>(Gems.nTypes).fill(0),
        'gemUpgrades': Array<number>(Gems.nTypes * Gems.nEffects).fill(0),
        'gemCollapsed': Array<boolean>(Gems.nTypes).fill(false),
    };

    public gemWallet: Array<KnockoutObservable<number>>;
    public gemUpgrades: Array<KnockoutObservable<number>>;
    public gemCollapsed: Array<boolean>;

    public validUpgrades = {};

    constructor() {
        this.gemWallet = this.defaults.gemWallet.map((v) => ko.observable(v));
        this.gemUpgrades = this.defaults.gemUpgrades.map((v) => ko.observable(v));
        this.gemCollapsed = this.defaults.gemCollapsed;
        GameHelper.enumNumbers(PokemonType).map(type => {
            this.validUpgrades[type] = {};
            this.validUpgrades[type][GameConstants.TypeEffectiveness.Immune] = !!TypeHelper.typeMatrix[type]?.includes(GameConstants.TypeEffectivenessValue.Immune);
            this.validUpgrades[type][GameConstants.TypeEffectiveness.NotVery] = !!TypeHelper.typeMatrix[type]?.includes(GameConstants.TypeEffectivenessValue.NotVery);
            this.validUpgrades[type][GameConstants.TypeEffectiveness.Normal] = !!TypeHelper.typeMatrix[type]?.includes(GameConstants.TypeEffectivenessValue.Normal);
            this.validUpgrades[type][GameConstants.TypeEffectiveness.Very] = !!TypeHelper.typeMatrix[type]?.includes(GameConstants.TypeEffectivenessValue.Very);
        });
    }

    public gainGems(amt: number, typeNum: PokemonType) {
        if (!this.canAccess()) {
            return;
        }

        if (typeNum == PokemonType.None) {
            return;
        }

        GameHelper.incrementObservable(this.gemWallet[typeNum], amt);

        if (amt > 0) {
            GameHelper.incrementObservable(App.game.statistics.totalGemsGained, amt);
            GameHelper.incrementObservable(App.game.statistics.gemsGained[typeNum], amt);
        }
    }

    public getGemUpgradeCost(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        const cost = (this.getGemUpgrade(typeNum, effectNum) + 1) * Gems.GEM_UPGRADE_COST;
        return cost;
    }

    public hasMaxUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        return this.getGemUpgrade(typeNum, effectNum) >= Gems.MAX_GEM_UPGRADES;
    }

    public canBuyGemUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        if (App.game.challenges.list.disableGems.active()) {
            return false;
        }
        const lessThanMax = !this.hasMaxUpgrade(typeNum, effectNum);
        const hasEnoughGems = this.gemWallet[typeNum]() >= this.getGemUpgradeCost(typeNum, effectNum);
        return lessThanMax && hasEnoughGems;
    }

    public buyGemUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): void {
        if (this.canBuyGemUpgrade(typeNum, effectNum)) {
            this.gainGems(-this.getGemUpgradeCost(typeNum, effectNum), typeNum);
            GameHelper.incrementObservable(this.gemUpgrades[typeNum * Gems.nEffects + effectNum]);
        }
    }

    public isValidUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): boolean {
        return !!this.validUpgrades[typeNum]?.[effectNum];
    }

    public getGemUpgrade(
        typeNum: PokemonType,
        effectNum: GameConstants.TypeEffectiveness
    ): number {
        return this.gemUpgrades[typeNum * Gems.nEffects + effectNum]();
    }

    initialize() {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Gem_case);
    }

    update(delta: number) {
    }

    toJSON(): Record<string, any> {
        return {
            'gemWallet': this.gemWallet.map(ko.unwrap),
            'gemUpgrades': this.gemUpgrades.map(ko.unwrap),
            'gemCollapsed': this.gemCollapsed,
        };
    }

    fromJSON(json: Record<string, any>) {
        if (json != null) {
            json['gemWallet'].forEach((v, i) => {
                this.gemWallet[i](v);
            });
            json['gemUpgrades'].forEach((v, i) => {
                this.gemUpgrades[i](v);
            });
            json['gemCollapsed']?.forEach((v, i) => {
                this.gemCollapsed[i] = v;
            });
        }
    }

    public static image(type: number): string {
        return `assets/images/gems/${PokemonType[type]} Gem.png`;
    }

    public openGemModal() {
        if (this.canAccess()) {
            $('#gemModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have the Gem Case',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}

namespace Gems {
    export const GEM_UPGRADE_COST = 500;
    export const GEM_UPGRADE_STEP = 0.1;
    export const MAX_GEM_UPGRADES = 10;
}
