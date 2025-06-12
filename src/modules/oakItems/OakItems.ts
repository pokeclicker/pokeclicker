import { PureComputed } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import OakItemType from '../enums/OakItemType';
import { AchievementOption, Currency } from '../GameConstants';
import GameHelper from '../GameHelper';
import Multiplier, { GetMultiplierFunction } from '../multiplier/Multiplier';
import MultiplierType from '../multiplier/MultiplierType';
import AmountFactory from '../wallet/AmountFactory';
import OakItem from './OakItem';
import CaughtPokemonRequirement from '../requirements/CaughtPokemonRequirement';
import ItemOwnedRequirement from '../requirements/ItemOwnedRequirement';
import Requirement from '../requirements/Requirement';

export default class OakItems implements Feature {
    name = 'Oak Items';
    saveKey = 'oakItems';

    itemList: OakItem[];
    unlockRequirements: Requirement[];

    defaults: Record<string, any>;

    public selectedOakItem: KnockoutObservable<number> = ko.observable(-1);
    public maxLevelOakItems: PureComputed<OakItem[]>;

    constructor(unlockRequirements: Requirement[], private multiplier: Multiplier) {
        this.itemList = [
            new OakItem({
                name: OakItemType.Magic_Ball,
                displayName: 'Magic Ball',
                description: 'Boosts your chance to successfully catch Pokémon',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(20),
                experienceList: [0, 250, 500, 1250, 2500, 5000],
                bonusList: [0.05, 0.06, 0.07, 0.08, 0.09, 0.10],
                inactiveBonus: 0,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `+${bonus.toLocaleString('en-US', { style: 'percent' })}`,
            }),
            new OakItem({
                name: OakItemType.Amulet_Coin,
                displayName: 'Amulet Coin',
                description: 'Increases the amount of Pokédollars earned from battles',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(30),
                experienceList: [0, 500, 1000, 2500, 5000, 10000],
                bonusList: [1.25, 1.30, 1.35, 1.40, 1.45, 1.50],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Rocky_Helmet,
                displayName: 'Rocky Helmet',
                description: 'Increases the damage dealt by your clicks',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(40),
                experienceList: [0, 500, 1000, 2500, 5000, 10000],
                bonusList: [1.25, 1.30, 1.35, 1.40, 1.45, 1.50],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Exp_Share,
                displayName: 'EXP Share',
                description: 'Grants more experience from every battle',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(50),
                experienceList: [0, 500, 1000, 2500, 5000, 10000],
                bonusList: [1.15, 1.18, 1.21, 1.24, 1.27, 1.30],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Sprayduck,
                displayName: 'Sprayduck',
                description: 'Speeds up berry growth and withering',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(60),
                experienceList: [0, 500, 1000, 2500, 5000, 10000],
                bonusList: [1.25, 1.30, 1.35, 1.40, 1.45, 1.50],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Shiny_Charm,
                displayName: 'Shiny Charm',
                description: 'Increases your odds of finding Shiny Pokémon, from all sources',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(70),
                experienceList: [0, 5, 10, 20, 35, 65],
                bonusList: [1.50, 1.60, 1.70, 1.80, 1.90, 2.00],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Magma_Stone,
                displayName: 'Magma Stone',
                description: 'Helps Pokémon Eggs hatch more quickly',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(80),
                experienceList: [0, 50, 100, 250, 500, 1000],
                bonusList: [1.50, 1.60, 1.70, 1.80, 1.90, 2.00],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Cell_Battery,
                displayName: 'Cell Battery',
                description: 'Reduce the charges needed to discharge',
                maxLevel: 5,
                unlockRequirement: new CaughtPokemonRequirement(90),
                experienceList: [0, 5, 10, 30, 60, 150],
                bonusList: [-5, -10, -15, -20, -25, -30],
                inactiveBonus: 0,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `${bonus.toLocaleString('en-US')} Charges`,
            }),
            new OakItem({
                name: OakItemType.Squirtbottle,
                displayName: 'Squirtbottle',
                description: 'Increases the chance for berries to mutate',
                maxLevel: 5,
                unlockRequirement: new ItemOwnedRequirement('Squirtbottle', 1, AchievementOption.equal),
                overrideHint: 'Purchase from the Berry Master in Goldenrod City, Johto',
                experienceList: [0, 50, 100, 250, 500, 1000],
                bonusList: [1.25, 1.50, 1.75, 2.00, 2.25, 2.50],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 2000, 5000, 10000, 20000, 50000], Currency.farmPoint),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Sprinklotad,
                displayName: 'Sprinklotad',
                description: 'Extends the effect duration of Mulch',
                maxLevel: 5,
                unlockRequirement: new ItemOwnedRequirement('Sprinklotad', 1, AchievementOption.equal),
                overrideHint: 'Purchase from the Berry Master in Mauville City, Hoenn',
                experienceList: [0, 500, 1000, 2500, 5000, 10000],
                bonusList: [1.25, 1.40, 1.55, 1.70, 1.85, 2.00],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 2000, 5000, 10000, 20000, 50000], Currency.farmPoint),
                bonusFormat: bonus => `×${bonus.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            }),
            new OakItem({
                name: OakItemType.Explosive_Charge,
                displayName: 'Explosive Charge',
                description: 'Expands the reach of the Bomb tool, allowing it to hit more tiles at once',
                maxLevel: 5,
                unlockRequirement: new ItemOwnedRequirement('Explosive_Charge', 1, AchievementOption.equal),
                overrideHint: 'Purchase from the shop on Cinnabar Island, Kanto',
                experienceList: [0, 10, 20, 50, 100, 200],
                bonusList: [1, 2, 3, 6, 8, 10],
                inactiveBonus: 0,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `+${bonus.toLocaleString('en-US')} tiles`,
            }),
            new OakItem({
                name: OakItemType.Treasure_Scanner,
                displayName: 'Treasure Scanner',
                description: 'Grants a chance to multiply the rewards found while mining',
                maxLevel: 5,
                unlockRequirement: new ItemOwnedRequirement('Treasure_Scanner', 1, AchievementOption.equal),
                overrideHint: 'Purchase from the shop on Cinnabar Island, Kanto',
                experienceList: [0, 20, 40, 100, 200, 400],
                bonusList: [0.04, 0.08, 0.12, 0.16, 0.20, 0.24],
                inactiveBonus: 1,
                upgradeCostList: AmountFactory.createArray([0, 50000, 100000, 250000, 500000, 1000000], Currency.money),
                bonusFormat: bonus => `${bonus.toLocaleString('en-US', { style: 'percent' })}`,
            }),
        ];
        this.maxLevelOakItems = ko.pureComputed(() => this.itemList.filter(value => value.isMaxLevel()));
        this.unlockRequirements = unlockRequirements;
    }

    // eslint-disable-next-line class-methods-use-this
    canAccess(): boolean {
        return this.unlockRequirements.some(value => value.isCompleted());
    }

    initialize() {
        this.addMultiplier('clickAttack', OakItemType.Rocky_Helmet);
        this.addMultiplier('exp', OakItemType.Exp_Share);
        this.addMultiplier('money', OakItemType.Amulet_Coin);
        this.addMultiplier('shiny', OakItemType.Shiny_Charm);
        this.addMultiplier('eggStep', OakItemType.Magma_Stone);
    }

    calculateBonus(item: OakItemType, useItem = false): number {
        const oakItem = this.itemList[item];
        if (oakItem === undefined) {
            console.error('Could not find oakItem', item, 'This could have unintended consequences');
            return 1;
        }

        if (useItem) {
            oakItem.use();
        }

        return oakItem.calculateBonus();
    }

    isUnlocked(item: OakItemType) {
        if (this.itemList[item] === undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked();
    }

    use(item: OakItemType, scale = 1) {
        if (!this.isUnlocked(item)) {
            return;
        }
        this.itemList[item].use(undefined, scale);
    }

    maxActiveCount() {
        return this.unlockRequirements.filter(value => value.isCompleted()).length;
    }

    activeCount() {
        let count = 0;
        for (let i = 0; i < this.itemList.length; i += 1) {
            if (this.itemList[i].isActive) {
                count += 1;
            }
        }
        return count;
    }

    hasAvailableSlot(): boolean {
        return this.activeCount() < this.maxActiveCount();
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        // Loading OakItems
        GameHelper.enumStrings(OakItemType).forEach((oakItem) => {
            if (json[oakItem] !== undefined) {
                this.itemList[OakItemType[oakItem]].fromJSON(json[oakItem]);
            }
        });
    }

    toJSON(): Record<string, any> {
        const save = {};
        for (let i = 0; i < this.itemList.length; i += 1) {
            save[OakItemType[this.itemList[i].name]] = this.itemList[i].toJSON();
        }

        return save;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    update(delta: number): void {
        // This method intentionally left blank
    }

    isActive(item: OakItemType) {
        if (this.itemList[item] === undefined) {
            return false;
        }
        return this.itemList[item].isActive;
    }

    activate(item: OakItemType) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }
        if (!this.isUnlocked(item)) {
            return;
        }
        if (this.maxActiveCount() === 0) {
            return;
        }
        if (this.maxActiveCount() === 1) {
            this.deactivateAll();
            this.itemList[item].isActive = true;
        }
        if (this.activeCount() < this.maxActiveCount()) {
            this.itemList[item].isActive = true;
        }
    }

    deactivateAll() {
        for (let i = 0; i < this.itemList.length; i += 1) {
            this.itemList[i].isActive = false;
        }
    }

    deactivate(item: OakItemType) {
        this.itemList[item].isActive = false;
    }

    private addMultiplier(type: keyof typeof MultiplierType, item: OakItemType) {
        this.multiplier.addBonus(type, this.createMultiplierFunction(item), this.itemList[item].displayName);
    }

    private createMultiplierFunction(item: OakItemType): GetMultiplierFunction {
        return (useBonus: boolean) => this.calculateBonus(item, useBonus);
    }
}
