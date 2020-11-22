interface ItemCost {
    item?: UndergroundItem | Berry | Item,
    type?: PokemonType,
    amount: number
}

class ResearchWithCost extends Research {

    private _costs: ItemCost[];

    private _purchased: KnockoutObservable<boolean>;

    constructor(id: Lab.Research, type: ResearchType, name: string, description: string, points: number, costs: ItemCost[], option?: ResearchOption) {
        super(id, type, name, description, points, option);
        this._costs = costs;

        this._purchased = ko.observable(false);

        this.state = ko.pureComputed(function () {
            if (!this.canResearch()) {
                return ResearchState.Locked;
            } else if (!this._purchased()) {
                return ResearchState.NotPurchased;
            } else if (this._completed()) {
                return ResearchState.Completed;
            } else if (this._progress() === 0) {
                return ResearchState.Ready;
            } else if (this._progress() !== 0) {
                return ResearchState.Researching;
            }
            return ResearchState.Locked;
        }, this);
    }


    purchase(): boolean {
        if (!this.canPurchase) {
            return false;
        }
        this._costs.forEach(itemCost => {
            if (itemCost.item instanceof Item) {
                player.loseItem(itemCost.item.name, itemCost.amount);
            } else if (itemCost.item instanceof UndergroundItem) {
                const itemIndex = player.mineInventoryIndex(itemCost.item.id);
                const amt = player.mineInventory()[itemIndex].amount();
                player.mineInventory()[itemIndex].amount(amt - (itemCost.amount));
            } else if (itemCost.item instanceof Berry) {
                GameHelper.incrementObservable(App.game.farming.berryList[itemCost.item.type], -itemCost.amount);
            } else if (itemCost.type !== undefined) {
                App.game.shards.gainShards(-itemCost.amount, itemCost.type);
            }
        });
        this.purchased = true;
        return true;
    }

    get canPurchase(): boolean {
        return this._costs.every(itemCost => {
            if (itemCost.item instanceof Item) {
                return player.hasItem(itemCost.item.name) >= itemCost.amount;
            } else if (itemCost.item instanceof UndergroundItem) {
                const itemIndex = player.mineInventoryIndex(itemCost.item.id);
                return player.mineInventory()[itemIndex].amount() >= itemCost.amount;
            } else if (itemCost.item instanceof Berry) {
                return App.game.farming.berryList[itemCost.item.type]() >= itemCost.amount;
            } else if (itemCost.type !== undefined) {
                return App.game.shards.shardWallet[itemCost.type]() >= itemCost.amount;
            } else {
                return false;
            }
        });
    }

    /**
     * Returns the tooltip to be displayed for the unlock button.
     * Displays all the items required for unlocking the research
     * TODO: HLXII - Add images?
     */
    get costTooltip(): string {
        return this._costs.map(itemCost => {
            if (itemCost.item instanceof Item) {
                return `${itemCost.item.displayName}: ${itemCost.amount}`;
            } else if (itemCost.item instanceof UndergroundItem) {
                return `${itemCost.item.name}: ${itemCost.amount}`;
            } else if (itemCost.item instanceof Berry) {
                return `${BerryType[itemCost.item.type]} Berries: ${itemCost.amount}`;
            } else if (itemCost.type !== undefined) {
                return `${PokemonType[itemCost.type]} Shards: ${itemCost.amount}`;
            }
        }).join('<br>');
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['purchased'] = this.purchased;
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.purchased = json['purchased'] ?? false;
    }

    get purchased(): boolean {
        return this._purchased();
    }
    set purchased(bool: boolean) {
        this._purchased(bool);
    }

}
