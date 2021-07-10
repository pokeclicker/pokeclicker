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
    gainMoney(base: number): Amount;
    gainDungeonTokens(base: number): Amount;
    gainQuestPoints(base: number): Amount;
    gainDiamonds(base: number): Amount;
    gainFarmPoints(base: number): Amount;
    gainBattlePoints(base: number): Amount;
    calcBonus(amount: Amount): number;
    addAmount(amount: Amount): Amount;
    hasAmount(amount: Amount): boolean;
    loseAmount(amount: Amount): void;
    initialize(): void;
    canAccess(): boolean;
    fromJSON(json: Record<string, any>): void;
    toJSON(): Record<string, any>;
    update(): void;
}
