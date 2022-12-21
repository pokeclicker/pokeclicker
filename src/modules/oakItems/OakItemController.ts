import {
    Observable as KnockoutObservable,
} from 'knockout';
import OakItemType from '../enums/OakItemType';

export default class OakItemController {
    private static inspectedItemKO: KnockoutObservable<OakItemType> = ko.observable(OakItemType.Magic_Ball);
    private static selectedItemKO: KnockoutObservable<OakItemType> = ko.observable(OakItemType.Magic_Ball);

    public static click(item: OakItemType) {
        this.selectedItem = item;

        if (App.game.oakItems.isActive(item)) {
            App.game.oakItems.deactivate(item);
            return;
        }

        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        App.game.oakItems.activate(item);
    }

    public static hover(item: OakItemType) {
        this.inspectedItem = item;
    }

    public static hoverRelease() {
        this.inspectedItem = this.selectedItem;
    }

    static get inspectedItem() {
        return this.inspectedItemKO();
    }

    static set inspectedItem(item: OakItemType) {
        this.inspectedItemKO(item);
    }

    static get selectedItem() {
        return this.selectedItemKO();
    }

    static set selectedItem(item: OakItemType) {
        this.selectedItemKO(item);
    }
}
