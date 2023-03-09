class SafariItem {
    x = 0;
    y = 0;
    item : Item

    constructor(itemName : string, x : number, y : number) {
        this.item = ItemList[itemName];
        this.x = x;
        this.y = y;
    }
}
