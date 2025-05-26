import {
    Observable as KnockoutObservable,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';
import * as ModalScheduler from '../utilities/ModalScheduler';

export default class KeyItemController {
    private static inspectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static selectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static latestGainedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);

    static showGainModal(item: KeyItemType) {
        // Wait to show the gain modal until modals associated with giving key items are closed
        ModalScheduler.withModalsClosed({
            modalSelectors: ['#npcModal', '#receiveBadgeModal', '#temporaryBattleWonModal', '#pickStarterModal', '#keyItemModal', '.notification-modal'],
            callback: () => {
                this.latestGainedItem(item);
                $('#keyItemModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                });
            },
        });
    }

    public static hover(item: KeyItemType) {
        this.inspectedItem(item);
    }

    public static hoverRelease() {
        this.selectedItem(this.inspectedItem());
    }
}
