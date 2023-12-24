import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import { StoneType } from '../GameConstants';
import { ItemList } from '../items/ItemList';

export default class UndergroundItem {
    public space: Array<Array<any>>;
    public type?: number;
    private weight: number;
    private customWeight?: () => number;
    sellLocked: KnockoutObservable<boolean>;

    constructor(
        public id: number,
        public itemName: string,
        space: Array<Array<number>>,
        public value = 1,
        public valueType = UndergroundItemValueType.Diamond,
        public requirement?: Requirement,
        weight?: (() => number) | number,
    ) {
        // Map out our item sizing
        this.space = space.map((r, y) => r.map((v, x) => ({
            sizeX: r.length,
            sizeY: space.length,
            x,
            y,
            value: v ? this.id : 0,
            rotations: 0,
        })));
        this.weight = typeof weight === 'number' ? weight : 1;
        this.customWeight = typeof weight === 'function' ? weight : undefined;
        this.sellLocked = ko.observable(false);
    }

    public isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }
    
    public isSellable(): boolean {
        return [UndergroundItemValueType.Fossil, UndergroundItemValueType.Diamond, UndergroundItemValueType.Gem].includes(this.valueType);
    }

    public hasSellValue(): boolean {
        return [UndergroundItemValueType.Diamond, UndergroundItemValueType.Gem].includes(this.valueType);
    }

    public toggleSellLock() {
        this.sellLocked(!this.sellLocked());
    }

    get displayName() {
        return this.name;
    }

    get name() {
        return ItemList[this.itemName].displayName;
    }

    get image() {
        switch (this.valueType) {
            case UndergroundItemValueType.EvolutionItem:
                return `assets/images/items/evolution/${StoneType[this.type]}.png`;
            case UndergroundItemValueType.Fossil:
                return `assets/images/breeding/${this.name}.png`;
            case UndergroundItemValueType.MegaStone:
                return `assets/images/megaStone/${this.name}.png`;
            default:
                return `assets/images/items/underground/${this.name}.png`;
        }
    }

    get undergroundImage() {
        return `assets/images/underground/${this.name}.png`;
    }

    public getWeight(): number {
        if (this.customWeight !== undefined) {
            return this.customWeight();
        }
        return this.weight;
    }
}
