import '../koExtenders';
import { getDungeonIndex, VitaminType } from '../GameConstants';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';

export default class VitaminController {
    public static currentlySelected = ko.observable(VitaminType.Protein).extend({ numeric: 0 });
    public static add = ko.observable(true).extend({ boolean: null });
    public static multiplier = ['×1', '×5', '×10', 'Max'];
    public static multiplierIndex = ko.observable(0);

    public static shortcutVisible = ko.pureComputed((): boolean => {
        return App.game.statistics.dungeonsCleared[getDungeonIndex('Victory Road')]() > 0 && App.game.challenges.list.disableVitamins.active() === false;
    });

    public static incrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + 1) % this.multiplier.length);
    }

    public static decrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + this.multiplier.length - 1) % this.multiplier.length);
    }

    public static getMultiplier() {
        return Number(this.multiplier[this.multiplierIndex()].replace(/\D/g, '')) || Infinity;
    }

    public static getImage(vitaminType) {
        const vitaminName = VitaminType[vitaminType ?? this.currentlySelected()];
        return `assets/images/items/vitamin/${vitaminName}.png`;
    }

    public static openVitaminExpandedModal() {
        if (VitaminController.shortcutVisible()) {
            $('#pokemonVitaminExpandedModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need to defeat Victory Road to unlock this feature.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}
