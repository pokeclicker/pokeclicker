
interface ItemOptions {
    description?: string,
    displayName?: string,
    imageDirectory?: string,
}

class Item {

    description?: string;
    _displayName: string;
    imageDirectory?: string;

    constructor(
        public name: string,
        options?: ItemOptions
    ) {
        this._displayName = options?.displayName ?? name;
        this.description = options?.description;
        this.imageDirectory = options?.imageDirectory;
    }

    get amount(): KnockoutObservable<number> {
        return App.game.items.itemList[this.name].amount;
    }

    get unlocked(): KnockoutObservable<boolean> {
        return App.game.items.itemList[this.name].unlocked;
    }

    gain(amount: number) {
        GameHelper.incrementObservable(this.amount, amount);
    }

    use(): boolean {
        return false;
    }

    get displayName() {
        return GameConstants.humanifyString(this._displayName);
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${decodeURI(this.name)}.png`;
    }

}

const ItemList: { [name: string]: Item } = {};
