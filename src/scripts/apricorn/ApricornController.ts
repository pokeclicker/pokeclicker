class ApricornController {

    public static selectedApricorn: ApricornType = ApricornType.Black;

    public static openApricornModal() {
        if (App.game.apricorn.canAccess()) {
            $('#apricornModal').modal('show');
        } else {
            Notifier.notify({ message: `You need the ${GameConstants.humanifyString(KeyItems.KeyItem[KeyItems.KeyItem.Apricorn_box])} to access this location`, type: GameConstants.NotificationOption.warning });
        }
    }

    public static getImage(index: number) {
        const plot: ApricornPlot = App.game.apricorn.plotList[index];
        if (plot.stage() <= 1) {
            return 'assetplot.stage() s/images/farm/AllTreeSeedIII.png';
        }
        // TODO: Link to Apricorn tree assets
        return `assets/images/farm/${BerryType[plot.apricorn]}Tree${PlotStage[plot.stage()]}III.png`;
    }

    public static getTooltipLabel(index: number) {
        const plot: ApricornPlot = App.game.apricorn.plotList[index];

        const timeStr: string = plot.formattedTimeLeft();

        switch (plot.apricornStage) {
            case PlotStage.Bloom: {
                return `${timeStr} until ready`;
            }
            case PlotStage.Berry: {
                return `${timeStr} until overripe`;
            }
            default: {
                return `${timeStr} until grown`;
            }
        }
    }

}
document.addEventListener('DOMContentLoaded', function (event) {
    $('#apricornModal').on('show.bs.modal', function () {
        const apricornList = $('#apricornList');
        apricornList.children().get(ApricornController.selectedApricorn).className += ' active';
        apricornList.find('li').click(function () {
            $(this).parent().children().removeClass('active');
            $(this).addClass('active');
        });
    });
});

