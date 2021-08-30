///<reference path="Item.ts"/>

class FarmHandItem extends Item {

    constructor(public farmHandName: string, basePrice: number, currency = GameConstants.Currency.farmPoint) {
        super(`FarmHand${farmHandName}`, basePrice, currency, { maxAmount: 1 }, `Farm Hand ${farmHandName}`);
    }

    get farmHand(): FarmHand {
        return FarmHands.list.find(f => f.name == this.farmHandName);
    }

    get description(): string {
        const farmHand = this.farmHand;
        return `Cost: <img alt="Farm Points" src="assets/images/currency/farmPoint.svg" width="20px">&nbsp;${(farmHand?.cost?.amount ?? 0).toLocaleString('en-US')}/hour<br/>
        Work Speed: ${GameConstants.formatTimeFullLetters((farmHand?.workTick ?? GameConstants.MINUTE) / 1000)}<br/>
        Efficiency: ${(farmHand?.efficiency ?? 0).toLocaleString('en-US')}<br/>
        Max Energy: ${(farmHand?.maxEnergy ?? 0).toLocaleString('en-US')}`;
    }

    isAvailable(): boolean {
        const purchased = this.farmHand?.isUnlocked() ?? true;
        return super.isAvailable() && !purchased;
    }

    get image() {
        const trainerID = this.farmHand?.trainerSprite || 0;
        return `assets/images/profile/trainer-${trainerID}.png`;
    }
}

// Battle Frontier
ItemList['FarmHandKerry']   = new FarmHandItem('Kerry', 50000, GameConstants.Currency.farmPoint);
ItemList['FarmHandRiley']   = new FarmHandItem('Riley', 100000, GameConstants.Currency.farmPoint);
ItemList['FarmHandJessie']   = new FarmHandItem('Jessie', 20000, GameConstants.Currency.battlePoint);
