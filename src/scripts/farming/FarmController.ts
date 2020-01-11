class FarmController {

    public static selectedBerry: BerryType = BerryType.Cheri;

    public static openFarmModal() {
        if (App.game.farming.canAccess()) {
            $('#farmModal').modal('show');
        } else {
            Notifier.notify(`You need the ${GameConstants.humanifyString(KeyItems.KeyItem[KeyItems.KeyItem.Wailmer_pail])} to access this location`, GameConstants.NotificationOption.warning);
        }
    }

    public static getImage(index: number) {
        const plot: Plot = App.game.farming.plotList[index];
        if (plot.stage() <= 1) {
            return 'assets/images/farm/AllTreeSeedIII.png';
        }
        return `assets/images/farm/${BerryType[plot.berry]}Tree${GameConstants.PlotStage[plot.stage()]}III.png`;
    }

    public static getTooltipLabel(index: number) {
        const plot: Plot = App.game.farming.plotList[index];

        if (plot.timeLeft > 0) {
            return plot.formattedTimeLeft();
        }

        return 'Ready';
    }

}
