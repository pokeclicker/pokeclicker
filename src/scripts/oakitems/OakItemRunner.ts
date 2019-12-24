class OakItemRunner {

    public static oakItemList: KnockoutObservable<OakItem>[];
    // public static blankOakItem: OakItem = new OakItem(" ", Number.MAX_VALUE, "", 0, 0, 0);
    public static inspectedItem: KnockoutObservable<OakItem>;
    public static selectedItem: KnockoutObservable<OakItem>;

    public static initialize() {
        OakItemRunner.oakItemList = [];

        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Magic_Ball, 20, "Gives a bonus to your catchrate", 5, 1, 2)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Amulet_Coin, 30, "Gain more coins from battling", 25, 5, 1)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Poison_Barb, 40, "Clicks do more damage", 25, 5, 3)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Exp_Share, 50, "Gain more exp from battling", 15, 3, 1)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Sprayduck, 60, "Makes your berries grow faster", 25, 5, 3)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Shiny_Charm, 70, "Encounter more shinies", 50, 100, 150)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Blaze_Cassette, 80, "Hatch eggs faster", 50, 10, 10)));

        // TODO implement use!
        // TODO implement functionality
        OakItemRunner.oakItemList.push(ko.observable(new OakItem(GameConstants.OakItem.Cell_Battery, 90, "More passive mining energy regen", 25, 5, 50)));

        // OakItemRunner.oakItemList must preserve the ordering of items in GameConstants.OakItem enum
        if (!OakItemRunner.oakItemList.every((f, i)=>f().id==i)) {
            throw new Error("Oak items are out of order!")
        }

        let item: OakItem = OakItemRunner.getOakItemObject(GameConstants.OakItem.Magic_Ball);
        OakItemRunner.inspectedItem = ko.observable(item);
        OakItemRunner.selectedItem = ko.observable(item);
    }

    public static loadOakItems() {
        let oakItems = JSON.parse(JSON.stringify(player._oakItemsEquipped))
        for (let i = 0; i < oakItems.length; i++) {
            OakItemRunner.activateOakItem(OakItemRunner.getOakItemObject(oakItems[i]).id);
        }
        for(let i = 0; i<OakItemRunner.oakItemList.length; i++){
            OakItemRunner.oakItemList[i]().calculateLevel();
        }
    }

    public static hover(id: GameConstants.OakItem) {
        OakItemRunner.inspectedItem(OakItemRunner.getOakItemObject(id));
    }

    public static hoverRelease() {
        OakItemRunner.inspectedItem(OakItemRunner.selectedItem());
    }

    public static click(id: GameConstants.OakItem) {
        let item: OakItem = OakItemRunner.getOakItemObject(id);
        OakItemRunner.selectedItem(item);
        if(item.isUnlocked()) {
            OakItemRunner.activateOakItem(item.id);
        }
    }

    public static use(id: GameConstants.OakItem) {
        OakItemRunner.getOakItemObject(id).use();
    }

    public static canUpgradeExp(id: GameConstants.OakItem): boolean {
        return OakItemRunner.getOakItemObject(id).canUpgradeExp();
    }

    public static calculateBonus(id: GameConstants.OakItem): number {
        return OakItemRunner.getOakItemObject(id).calculateBonus()();
    }

    public static getOakItemObject(id: GameConstants.OakItem): OakItem {
        return OakItemRunner.oakItemList[id]();
    }

    public static setOakItemsEquipped() {
        player._oakItemsEquipped = [];
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            let oakObj = OakItemRunner.oakItemList[i]();
            if (oakObj.isActive()) {
                player._oakItemsEquipped.push(oakObj.id);
            }
        }
    }

    public static activateOakItem(id: GameConstants.OakItem) {
        if (player.calculateOakItemSlots()() == 1) {
            OakItemRunner.deactivateAllOakItems();
            OakItemRunner.getOakItemObject(id).isActive(true);
        }
        else {
            if (OakItemRunner.getOakItemObject(id).isActive()) {
                OakItemRunner.getOakItemObject(id).isActive(false);

            } else {
                if (OakItemRunner.getTotalActiveOakItems() < player.calculateOakItemSlots()()) {
                    OakItemRunner.getOakItemObject(id).isActive(true);
                } else {
                    Notifier.notify("You can only have " + player.calculateOakItemSlots()() + " Oak items active at the same time", GameConstants.NotificationOption.warning);
                }
            }
        }
        OakItemRunner.setOakItemsEquipped();
    }

    public static getTotalActiveOakItems() {
        let count = 0;
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            if (OakItemRunner.oakItemList[i]().isActive()) {
                count++;
            }
        }
        return count;
    }

    public static deactivateAllOakItems() {
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            OakItemRunner.oakItemList[i]().isActive(false);
        }
        player.oakItemsEquipped = [];
    }

    public static isActive(id: GameConstants.OakItem): boolean {
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            if (OakItemRunner.oakItemList[i]().id == id) {
                return OakItemRunner.oakItemList[i]().isActive();
            }
        }
    }

    public static isUnlocked(id: GameConstants.OakItem): boolean {
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            if (OakItemRunner.oakItemList[i]().id == id) {
                return OakItemRunner.oakItemList[i]().isUnlocked();
            }
        }
    }
}
