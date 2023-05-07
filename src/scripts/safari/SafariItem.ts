class SafariItem {
    constructor(public item: BagItem, public x: number, public y: number) {
    }
}

type SafariItemWeighed = {
    item: BagItem,
    weight: number,
}

class SafariItemController {
    private static list: Record<GameConstants.Region, Array<SafariItemWeighed>> = {
        [GameConstants.Region.kalos]: [
            {item: {id: 'xAttack', type: ItemType.item}, weight: 1},
            {item: {id: 'xClick', type: ItemType.item}, weight: 1},
        ],
    }

    public static getRandomItem() {
        if (!SafariItemController.list[player.region]) {
            return undefined;
        }
        const list = SafariItemController.list[player.region].filter((i) => BagHandler.isAvailable(i.item));
        return Rand.fromWeightedArray(list.map((i) => i.item), list.map((i) => i.weight));
    }
}
