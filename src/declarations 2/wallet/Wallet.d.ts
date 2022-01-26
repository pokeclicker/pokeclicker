/// <reference path="knockout.d.ts"/>
/// <reference path="../DataStore/common/Feature.d.ts"/>
/// <reference path="../multiplier/Multiplier.d.ts"/>
/// <reference path="./Amount.d.ts"/>
declare class Wallet implements Feature {
    private multiplier;
    name: string;
    saveKey: string;
    currencies: Array<KnockoutObservable<number>>;
    defaults: {
        currencies: any[];
    };
    constructor(multiplier: Multiplier);
    gainMoney(base: number, ignoreBonus?: boolean): Amount;
    gainDungeonTokens(base: number, ignoreBonus?: boolean): Amount;
    gainQuestPoints(base: number, ignoreBonus?: boolean): Amount;
    gainDiamonds(base: number, ignoreBonus?: boolean): Amount;
    gainFarmPoints(base: number, ignoreBonus?: boolean): Amount;
    gainBattlePoints(base: number, ignoreBonus?: boolean): Amount;
    calcBonus(amount: Amount): number;
    addAmount(amount: Amount, ignoreBonus?: boolean): Amount;
    hasAmount(amount: Amount): boolean;
    loseAmount(amount: Amount): boolean;
    initialize(): void;
    canAccess(): boolean;
    fromJSON(json: Record<string, any>): void;
    toJSON(): Record<string, any>;
    update(): void;
}
