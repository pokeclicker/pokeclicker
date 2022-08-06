/* eslint-disable class-methods-use-this */
import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import KeyItemType from '../enums/KeyItemType';
import PokemonType from '../enums/PokemonType';
import {
    GEM_UPGRADE_COST,
    MAX_GEM_UPGRADES,
    TypeEffectiveness,
    TypeEffectivenessValue,
} from '../GameConstants';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import TypeHelper from '../types/TypeHelper';

export default class Gems implements Feature {
    public static readonly nTypes: number = GameHelper.enumLength(PokemonType) - 1;
    public static readonly nEffects: number = GameHelper.enumLength(TypeEffectiveness);

    name = 'Gems';
    saveKey = 'gems';

    defaults = {
        gemWallet: Array<number>(Gems.nTypes).fill(0),
        gemUpgrades: Array<number>(Gems.nTypes * Gems.nEffects).fill(0),
        gemCollapsed: Array<boolean>(Gems.nTypes).fill(false),
    };

    public gemWallet: Array<KnockoutObservable<number>>;
    public gemUpgrades: Array<KnockoutObservable<number>>;
    public gemCollapsed: Array<boolean>;

    public validUpgrades = {};

    constructor() {
        this.gemWallet = this.defaults.gemWallet.map((v) => ko.observable(v));
        this.gemUpgrades = this.defaults.gemUpgrades.map((v) => ko.observable(v));
        this.gemCollapsed = this.defaults.gemCollapsed;
        GameHelper.enumNumbers(PokemonType).forEach((type) => {
            this.validUpgrades[type] = {};
            this.validUpgrades[type][TypeEffectiveness.Immune] = !!TypeHelper.typeMatrix[type]?.includes(TypeEffectivenessValue.Immune);
            this.validUpgrades[type][TypeEffectiveness.NotVery] = !!TypeHelper.typeMatrix[type]?.includes(TypeEffectivenessValue.NotVery);
            this.validUpgrades[type][TypeEffectiveness.Neutral] = !!TypeHelper.typeMatrix[type]?.includes(TypeEffectivenessValue.Neutral);
            this.validUpgrades[type][TypeEffectiveness.Very] = !!TypeHelper.typeMatrix[type]?.includes(TypeEffectivenessValue.Very);
        });
    }

    public static image(type: number): string {
        return `assets/images/gems/${PokemonType[type]} Gem.png`;
    }

    public gainGems(amt: number, typeNum: PokemonType) {
        if (!this.canAccess()) {
            return;
        }

        if (typeNum === PokemonType.None) {
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
        effectNum: TypeEffectiveness,
    ): number {
        const cost = (this.getGemUpgrade(typeNum, effectNum) + 1) * GEM_UPGRADE_COST;
        return cost;
    }

    public hasMaxUpgrade(
        typeNum: PokemonType,
        effectNum: TypeEffectiveness,
    ): boolean {
        return this.getGemUpgrade(typeNum, effectNum) >= MAX_GEM_UPGRADES;
    }

    public canBuyGemUpgrade(
        typeNum: PokemonType,
        effectNum: TypeEffectiveness,
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
        effectNum: TypeEffectiveness,
    ): void {
        if (this.canBuyGemUpgrade(typeNum, effectNum)) {
            this.gainGems(-this.getGemUpgradeCost(typeNum, effectNum), typeNum);
            GameHelper.incrementObservable(this.gemUpgrades[typeNum * Gems.nEffects + effectNum]);
        }
    }

    public isValidUpgrade(
        typeNum: PokemonType,
        effectNum: TypeEffectiveness,
    ): boolean {
        return !!this.validUpgrades[typeNum]?.[effectNum];
    }

    public getGemUpgrade(
        typeNum: PokemonType,
        effectNum: TypeEffectiveness,
    ): number {
        return this.gemUpgrades[typeNum * Gems.nEffects + effectNum]();
    }

    initialize() {}

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Gem_case);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(delta: number) {}

    toJSON(): Record<string, any> {
        return {
            gemWallet: GameHelper.filterArrayEnd(this.gemWallet.map(ko.unwrap)),
            gemUpgrades: GameHelper.filterArrayEnd(this.gemUpgrades.map(ko.unwrap)),
            gemCollapsed: GameHelper.filterArrayEnd(this.gemCollapsed),
        };
    }

    fromJSON(json: Record<string, any>) {
        if (json != null) {
            json.gemWallet.forEach((v, i) => {
                this.gemWallet[i](v);
            });
            json.gemUpgrades.forEach((v, i) => {
                this.gemUpgrades[i](v);
            });
            json.gemCollapsed?.forEach((v, i) => {
                this.gemCollapsed[i] = v;
            });
        }
    }

    public openGemModal() {
        if (this.canAccess()) {
            $('#gemModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have the Gem Case.\n<i>Requires the Earth Badge.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}
