///<reference path="../shop/ShopHandler.ts"/>

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

    gain(n: number) {
        player.gainItem(this.name, n);
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
