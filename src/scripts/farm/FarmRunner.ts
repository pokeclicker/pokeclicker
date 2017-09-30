class FarmRunner {
    public static curBerry: Berry = BerryList["Cheri"];
    public static counter: number = 0;

    public static openFarmModal() {
        if (FarmRunner.accessToFarm()) {
            $('#farmModal').modal('show');
        } else {
            Notifier.notify("You don't have access to this location yet", GameConstants.NotificationOption.warning);
        }
    }

    public static accessToFarm() {
        //TODO implement
        return true;
    }

    public static tick() {
        this.counter = 0;
        for (let i = 0; i < 25; i++) {
            player.plotList[i]().timeLeft(Math.max(0, player.plotList[i]().timeLeft() - 1));
            player.plotList[i]().formattedTimeLeft(GameConstants.formatTime(player.plotList[i]().timeLeft()));
        }

    }

    public static getPlot(plotId: number) {
        return player.plotList[plotId]();
    }

    public static plantAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.plant(i);
        }
    }

    public static harvestAll() {
        console.log("Harvesting all");
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.harvest(i);
        }
    }

    public static isEmpty(plotId) {
        return ko.computed(function () {
            return this.getPlot(plotId).berry() == null;
        }, this);
    }

    public static plant(plotId) {
        let plot = this.getPlot(plotId);
        if (!plot.isEmpty()) {
            console.log("Full");
            return;
        }

        if (!plot.isUnlocked()) {
            console.log("Locked");
            return;
        }
        console.log("planting on " + plotId);
        plot.berry(FarmRunner.curBerry);
        plot.timeLeft(FarmRunner.curBerry.harvestTime);

    }

    public static harvest(plotId) {
        console.log("Harvesting plot: " + plotId);
        let plot = this.getPlot(plotId);
        if (plot.berry() !== null && plot.timeLeft() <= 0) {

            FarmRunner.gainPlotExp(plotId);
            player.gainFarmPoints(plot.berry().farmValue);
            console.log("Got: " + GameConstants.BerryType[plot.berry().type]);
            plot.berry(null);

        } else {
            console.log("Not ready");
        }
    }

    public static gainPlotExp(plotId) {
        this.getPlot(plotId).exp += this.getPlot(plotId).berry().farmValue;
    }

    public static gainBerryByName(berryname: string, amount: number = 1) {
        player.berryList(player.berryList()[GameConstants.BerryType[berryname]] + amount);
    }

    public static getImage(plot: Plot) {
        if (plot.getStage() <= 1) {
            return "assets/images/farm/AllTreeSeedIII.png"
        }
        return "assets/images/farm/" + GameConstants.BerryType[plot.berry().type] + "Tree" + GameConstants.PlotStage[plot.getStage()] + "III.png";
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    $('#farmModal').on('show.bs.modal', function () {
        let seedList = $('#seedList');
        seedList.children().get(FarmRunner.curBerry.type).className += " active";
        seedList.find("li").click(function () {
            $(this).parent().children().removeClass("active");
            $(this).addClass("active");
        });
    });
});