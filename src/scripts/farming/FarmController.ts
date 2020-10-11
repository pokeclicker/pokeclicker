///<reference path="./MulchType.ts"/>
class FarmController {

    // TODO: Update to allow for selecting berries or mulch

    public static navigateIndex: KnockoutObservable<number> = ko.observable(0);
    public static berryListFiltered: KnockoutObservableArray<BerryType> = ko.observableArray([]);
    public static numberOfTabs: KnockoutObservable<number> = ko.observable(1);

    public static selectedBerry: BerryType = BerryType.Cheri;
    public static selectedMulch: MulchType = MulchType.Boost_Mulch;

    public static initialize() {
        this.berryListFiltered(Array.from(Array(GameConstants.AMOUNT_OF_BERRY_TYPES).keys()));
        this.numberOfTabs(1);
        this.navigateIndex(0);
    }
    
    public static openFarmModal() {
        if (App.game.farming.canAccess()) {
            this.resetPages();
            $('#farmModal').modal('show');
        } else {
            Notifier.notify({
                message: `You need the ${GameConstants.humanifyString(KeyItems.KeyItem[KeyItems.KeyItem.Wailmer_pail])} to access this location`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static getImage(index: number) {
        const plot: Plot = App.game.farming.plotList[index];
        if (plot.stage() <= 1) {
            return 'assets/images/farm/AllTreeSeedIII.png';
        }
        return `assets/images/farm/${BerryType[plot.berry]}Tree${PlotStage[plot.stage()]}III.png`;
    }

    public static getTooltipLabel(index: number) {
        const plot: Plot = App.game.farming.plotList[index];

        return plot.toolTip();
    }

    public static navigateRight() {
        if (FarmController.navigateIndex() < FarmController.numberOfTabs()) {
            FarmController.navigateIndex(FarmController.navigateIndex() + 1);
        }
    }

    public static navigateLeft() {
        if (FarmController.navigateIndex() > 0) {
            FarmController.navigateIndex(FarmController.navigateIndex() - 1);
        }
    }

    public static calculateNumberOfTabs() {
        this.numberOfTabs(Math.floor(App.game.farming.highestUnlockedBerry() / 8));
    }

    public static getBerryListWithIndex() {
        return this.berryListFiltered().slice(this.navigateIndex() * 8, (this.navigateIndex() * 8) + 8);
    }

    public static resetPages() {
        this.calculateNumberOfTabs();
    }

}
document.addEventListener('DOMContentLoaded', function (event) {
    $('#farmModal').on('show.bs.modal', function () {
        const seedList = $('#seedList');
        seedList.children().get(FarmController.selectedBerry).className += ' active';
        seedList.find('li').click(function () {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    });
});

