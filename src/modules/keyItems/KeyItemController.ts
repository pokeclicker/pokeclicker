import {
    Observable as KnockoutObservable,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';
import * as DisplayObservables from '../utilities/DisplayObservables';

export default class KeyItemController {
    private static inspectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static selectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static latestGainedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);

    static showGainModal(item: KeyItemType) {
        // Short delay to let other modals start opening
        setTimeout(() => {
            // Wait to show the gain modal until modals associated with giving key items are closed
            const conflictingModals = ['npcModal', 'receiveBadgeModal', 'temporaryBattleWonModal'];
            const openModal = conflictingModals.find(modal => DisplayObservables.modalState[modal] !== 'hidden');
            if (openModal) {
                $(`#${openModal}`).one('hidden.bs.modal', () => KeyItemController.showGainModal(item));
                return;
            }

            this.latestGainedItem(item);
            $('.modal').modal('hide');
            $('#keyItemModal').modal({
                backdrop: 'static',
                keyboard: false,
            });
        }, 10);
    }

    public static hover(item: KeyItemType) {
        this.inspectedItem(item);
    }

    public static hoverRelease() {
        this.selectedItem(this.inspectedItem());
    }
}
