/// <reference path="../../declarations/blending/BlendingController.d.ts"/>

class BlendingListController {

    // For the berry list in the blending modal

    public static sortOption: KnockoutObservable<string> = ko.observable('None');
    public static sortFactor: KnockoutObservable<number> = ko.observable(1);

    public static updateBlendingSorting(newSortOption: string, flavorButton: boolean = false) {
        if (BlendingListController.sortOption() === newSortOption && BlendingListController.sortFactor() === -1 && !flavorButton) {
            BlendingListController.sortOption('None');
            BlendingListController.sortFactor(1);
        } else if (BlendingListController.sortOption() === newSortOption) {
            flavorButton ? BlendingListController.sortFactor() : BlendingListController.sortFactor(BlendingListController.sortFactor() / -1);
        } else {
            BlendingListController.sortOption(newSortOption);
            flavorButton ? BlendingListController.sortFactor(-1) : BlendingListController.sortFactor(1);
        }
    }

    public static getFlavorSum(b: BerryType) {
        const fls: number[] = [];
        const flts = BlendingController.blendingListFlavorFilters().length ? BlendingController.blendingListFlavorFilters() : [0, 1, 2, 3, 4];
        App.game.farming.berryData[b].flavors.filter(flavor => flts.includes(flavor.type)).forEach(flavor => fls.push(flavor.value));
        return fls.reduce((partialSum, a) => partialSum + a, 0);
    }

    public static sortedBlendingList: KnockoutComputed<Array<BerryType>> = ko.pureComputed(() => {
        const sortOption = BlendingListController.sortOption();
        const direction = BlendingListController.sortFactor();
        return FarmController.getUnlockedBerryList().sort((a: BerryType, b: BerryType) => {
            let result = 0;
            switch (sortOption) {
                case 'Berry':
                    result = App.game.farming.berryData[a].type > App.game.farming.berryData[b].type ? direction : -direction;
                    break;
                case 'Amount':
                    result = (App.game.farming.berryList[a]() - App.game.farming.berryList[b]()) * direction;
                    break;
                case 'Flavor':
                    result = (BlendingListController.getFlavorSum(a) - BlendingListController.getFlavorSum(b)) * direction;
                    break;
                case 'Smooth':
                    result = App.game.farming.berryData[a].smoothness > App.game.farming.berryData[b].smoothness ? direction : -direction;
                    break;
                case 'None':
                default:
                    a - b;
                    break;
            }
            if (result == 0) {
                return a - b;
            }
            return result;
        });
    });
}
