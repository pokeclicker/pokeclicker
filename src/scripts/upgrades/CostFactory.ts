///<reference path="../GameConstants.ts"/>
///<reference path="Cost.ts"/>

abstract class CostFactory {

    static createArray(amounts: number[], currency: GameConstants.Currency): Cost[] {
        let array = [];
        for (let i = 0; i < amounts.length; i++) {
            array.push(new Cost(amounts[i], currency));
        }
        return array;
    }
}
