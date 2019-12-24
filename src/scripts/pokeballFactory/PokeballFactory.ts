///<reference path="../upgrades/Upgrade.ts"/>
///<reference path="BallFactoryItem.ts"/>


class PokeballFactory {
    public static saveKey: string = "pokeballfactory";

    public static counter: number = 0;
    public static upgradeList: Array<Upgrade> = [];
    public static productionLine: BallFactoryItem[] = [];

    public static getPokeballTime() {
        return PokeballFactory.BASE_POKEBALL_TIME - this.getUpgrade(PokeballFactory.Upgrades.Pokeball_Time).calculateBonus();
    }

    public static getGreatballTime() {
        return PokeballFactory.BASE_GREATBALL_TIME - this.getUpgrade(PokeballFactory.Upgrades.Greatball_Time).calculateBonus();
    }

    public static getUltraballTime() {
        return PokeballFactory.BASE_ULTRABALL_TIME - this.getUpgrade(PokeballFactory.Upgrades.Ultraball_Time).calculateBonus();
    }

    public static getMasterballTime() {
        return PokeballFactory.BASE_MASTERBALL_TIME - this.getUpgrade(PokeballFactory.Upgrades.Masterball_Time).calculateBonus();
    }

    public static getBallTime(ball: GameConstants.Pokeball){
        switch(ball) {
            case GameConstants.Pokeball.Pokeball:
                return this.getPokeballTime();
            case GameConstants.Pokeball.Greatball:
                return this.getGreatballTime();
            case GameConstants.Pokeball.Ultraball:
                return this.getUltraballTime();
            case GameConstants.Pokeball.Masterball:
                return this.getMasterballTime();
        }
    }

    static getUpgrade(upgrade: PokeballFactory.Upgrades) {
        for (let i = 0; i < this.upgradeList.length; i++) {
            if (this.upgradeList[i].name == upgrade) {
                return this.upgradeList[i];
            }
        }
    }

    static getFactoryItem(name: GameConstants.Pokeball) {
        for (let i = 0; i < this.productionLine.length; i++) {
            if (this.productionLine[i].name == GameConstants.Pokeball[name]) {
                return this.productionLine[i];
            }
        }
    }

    public static setTimeLeft(name: GameConstants.Pokeball, timeLeft: number){
        this.getFactoryItem(name).timeLeft = timeLeft;
    }

    public static initialize() {
        this.productionLine.push(new BallFactoryItem(GameConstants.Pokeball.Pokeball, PokeballFactory.getPokeballTime()));
        this.productionLine.push(new BallFactoryItem(GameConstants.Pokeball.Greatball, PokeballFactory.getGreatballTime()));
        this.productionLine.push(new BallFactoryItem(GameConstants.Pokeball.Ultraball, PokeballFactory.getUltraballTime()));
        this.productionLine.push(new BallFactoryItem(GameConstants.Pokeball.Masterball, PokeballFactory.getMasterballTime()));
    }

    public static tick() {
        this.counter = 0;
        for (let i = 0; i < this.productionLine.length; i++) {
            this.productionLine[i].tick();
            if( this.productionLine[i].timeLeft <= 0){
                this.productionLine[i].gainItem();
                this.productionLine[i].timeLeft = this.getBallTime(this.productionLine[i].type);
            }
        }
    }

    public static canAccess(): boolean{
        return MapHelper.accessToRoute(4, 0) && player.hasKeyItem("Factory key");
    }

    public static load(saveObject: object): void {
        if (!saveObject) {
            console.log("PokeballFactory not loaded.");
            return;
        }

        let upgrades = saveObject['upgrades'];
        for (let item in PokeballFactory.Upgrades) {
            if (isNaN(Number(item))) {
                PokeballFactory.getUpgrade((<any>PokeballFactory.Upgrades)[item]).level = upgrades[item] || 0;
            }
        }
        let productionLine = saveObject['productionLine'];
        for (let i = 0; i < this.productionLine.length; i++) {
            console.log(saveObject);
            console.log(productionLine);
            console.log(this.productionLine[i].name);
            this.productionLine[i].timeLeft = productionLine[this.productionLine[i].name];
        }
    }

    public static save(): object {
        let undergroundSave = {};

        let upgradesSave = {};
        for (let item in PokeballFactory.Upgrades) {
            if (isNaN(Number(item))) {
                upgradesSave[item] = PokeballFactory.getUpgrade((<any>PokeballFactory.Upgrades)[item]).level;
            }
        }
        undergroundSave['upgrades'] = upgradesSave;

        let productionLineSave = {};
        for (let i = 0; i < this.productionLine.length; i++) {
            productionLineSave[this.productionLine[i].name] = this.productionLine[i].timeLeft;
        }
        undergroundSave['productionLine'] = productionLineSave;


        return undergroundSave;
    }


}

namespace PokeballFactory {
    export enum Upgrades {
        Pokeball_Time,
        Greatball_Time,
        Ultraball_Time,
        Masterball_Time,
    }

    export const BASE_POKEBALL_TIME = 10 * 60;
    export const BASE_GREATBALL_TIME = 60 * 60;
    export const BASE_ULTRABALL_TIME = 10 * 60 * 60;
    export const BASE_MASTERBALL_TIME = 24 * 60 * 60;

}
