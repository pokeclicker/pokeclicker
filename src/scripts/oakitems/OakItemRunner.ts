class OakItemRunner {

    public static oakItemList: KnockoutObservable<OakItem>[];
    public static blankOakItem: OakItem = new OakItem(" ", Number.MAX_VALUE, "", 0, 0, 0);
    public static inspectedItem: KnockoutObservable<OakItem> = ko.observable(new OakItem("Magic Ball", 30, "Gives a bonus to your catchrate", 5, 1, 2))
    public static selectedItem:  KnockoutObservable<OakItem> = ko.observable(new OakItem("Magic Ball", 30, "Gives a bonus to your catchrate", 5, 1, 2))
    public static initialize() {
        OakItemRunner.oakItemList = [];

        // TODO implement their functionality!
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Magic Ball", 30, "Gives a bonus to your catchrate", 5, 1, 100)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Amulet Coin", 40, "Gain more coins from battling", 25, 5, 1)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Poison Barb", 50, "Clicks do more damage", 25, 5, 3)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Exp Share", 60, "Gain more exp from battling", 15, 3, 1)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Plant Grower", 70, "Makes your berries grow faster", 25, 5, 1)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Shiny Charm", 80, "Encounter more shinies", 50, 100, 150)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Blaze Cassette", 90, "Hatch eggs faster", 50, 10, 10)));
        OakItemRunner.oakItemList.push(ko.observable(new OakItem("Cell Battery", 100, "Regenerate more mining energy", 25, 5, 4)));
        let item: OakItem = OakItemRunner.getOakItemByName("Magic Ball");
        OakItemRunner.selectedItem(item);
    }

    public static hover(name:string){
        OakItemRunner.inspectedItem(OakItemRunner.getOakItemByName(name));
    }

    public static hoverRelease(){
        OakItemRunner.inspectedItem(OakItemRunner.selectedItem());
    }

    public static click(name:string){
        let item: OakItem = OakItemRunner.getOakItemByName(name);
        OakItemRunner.selectedItem(item);
        OakItemRunner.activateOakItem(item.id);
    }

    public static use(name:string){
        OakItemRunner.getOakItemByName(name).use();
    }

    public static getOakItemByName(name:string): OakItem{
        for(let i = 0 ; i<OakItemRunner.oakItemList.length; i++){
            if(OakItemRunner.oakItemList[i]().name() == name){
                return OakItemRunner.oakItemList[i]();
            }
        }
    }

    public static activateOakItem(id) {
        if (player.calculateOakItemSlots()() == 1) {
            OakItemRunner.deactivateAllOakItems();
            OakItemRunner.oakItemList[id]().isActive(true);
        }
        else {
            if (OakItemRunner.oakItemList[id]().isActive()) {
                OakItemRunner.oakItemList[id]().isActive(false);

            } else {
                if (OakItemRunner.getTotalActiveOakItems() < player.calculateOakItemSlots()()) {
                    OakItemRunner.oakItemList[id]().isActive(true);
                } else {
                    console.log("You can only have " + player.calculateOakItemSlots()() + " Oak items active at the same time");
                }
            }
        }
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

    public static isActive(oakItemName) :boolean{
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            if (OakItemRunner.oakItemList[i]().name() == oakItemName) {
                return OakItemRunner.oakItemList[i]().isActive();
            }
        }
    }

    public static isUnlocked(oakItemName) :boolean{
        for (let i = 0; i < OakItemRunner.oakItemList.length; i++) {
            if (OakItemRunner.oakItemList[i]().name() == oakItemName) {
                return OakItemRunner.oakItemList[i]().isUnlocked();
            }
        }
    }
}