class FarmController {

    public static selectedBerry: BerryType = BerryType.Cheri;

    public static openFarmModal() {
        if (App.game.farming.canAccess()) {
            $('#farmModal').modal('show');
        } else {
            Notifier.notify({ message: `You need the ${GameConstants.humanifyString(KeyItems.KeyItem[KeyItems.KeyItem.Wailmer_pail])} to access this location`, type: GameConstants.NotificationOption.warning });
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

        if (plot.timeLeft > 0) {
            return plot.formattedTimeLeft();
        }

        return 'Ready';
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

    $('#farmModal').on('hidden.bs.modal', function () {
        if (player.route() == 14) {
            App.game.gameState = GameConstants.GameState.fighting;
        } else {
            MapHelper.moveToRoute(14, GameConstants.Region.kanto);
        }
    });
});

