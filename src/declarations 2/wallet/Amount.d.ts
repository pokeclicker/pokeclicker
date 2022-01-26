/// <reference path="../GameConstants.d.ts"/>
declare class Amount {
    amount: number;
    currency: Currency;
    constructor(amount: number, currency: Currency);
    toString(): string;
}
