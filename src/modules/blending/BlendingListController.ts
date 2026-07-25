import { PureComputed } from 'knockout';
import BerryType from '../enums/BerryType';
import { BerryList } from '../farming/BerryList';
import BlendingController from './BlendingController';

export default class BlendingListController {
    public static sortOption: KnockoutObservable<string> = ko.observable('None');
    public static sortFactor: KnockoutObservable<number> = ko.observable(1);

    public static updateBlendingSorting(newSortOption: string, flavorButton = false) {
        if (BlendingListController.sortOption() === newSortOption && BlendingListController.sortFactor() === -1 && !flavorButton) {
            BlendingListController.sortOption('None');
            BlendingListController.sortFactor(1);
        } else if (BlendingListController.sortOption() === newSortOption) {
            if (flavorButton) {
                BlendingListController.sortFactor();
            } else {
                BlendingListController.sortFactor(BlendingListController.sortFactor() / -1);
            }
        } else {
            BlendingListController.sortOption(newSortOption);
            if (flavorButton) {
                BlendingListController.sortFactor(-1);
            } else {
                BlendingListController.sortFactor(1);
            }
        }
    }

    public static getFlavorSum(b: BerryType) {
        const fls: number[] = [];
        const flts = BlendingController.blendingListFlavorFilters().length ? BlendingController.blendingListFlavorFilters() : [0, 1, 2, 3, 4];
        BerryList[b].flavors.filter(flavor => flts.includes(flavor.type)).forEach(flavor => fls.push(flavor.value));
        return fls.reduce((partialSum, a) => partialSum + a, 0);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static sortedBlendingList: PureComputed<Array<BerryType>> = ko.pureComputed(() => {
        const sortOption = BlendingListController.sortOption();
        const direction = BlendingListController.sortFactor();
        return FarmController.getUnlockedBerryList().sort((a: BerryType, b: BerryType) => {
            let result = 0;
            switch (sortOption) {
                case 'Berry':
                    result = BerryList[a].type > BerryList[b].type ? direction : -direction;
                    break;
                case 'Amount':
                    result = (App.game.farming.berryInventory[a]() - App.game.farming.berryInventory[b]()) * direction;
                    break;
                case 'Flavor':
                    result = (BlendingListController.getFlavorSum(a) - BlendingListController.getFlavorSum(b)) * direction;
                    break;
                case 'Smooth':
                    result = BerryList[a].smoothness > BerryList[b].smoothness ? direction : -direction;
                    break;
                case 'None':
                default:
                    result = a - b;
                    break;
            }
            if (result == 0) {
                return a - b;
            }
            return result;
        });
    });
}
