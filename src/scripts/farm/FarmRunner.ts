class FarmRunner {
    public static curBerry: Berry = BerryList["Cheri"];

    public static openFarmModal() {
        $('#farmModal').modal('show');
    }

    public static accessToFarm() {
        //TODO implement
        return true;
    }

    public static tick() {
        for (let i = 0; i < 25; i++) {
            player.plotList[i]().timeLeft = Math.max(0, player.plotList[i]().timeLeft - 1);
        }
    }

    public static plantAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.plant(i);
        }
    }

    public static harvestAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.harvest(i);
        }
    }

    public static plant(plotId) {
        if (player.plotList[plotId]().isEmpty()) {
            console.log("planting on " + plotId);
            player.plotList[plotId]().berry(FarmRunner.curBerry);
            player.plotList[plotId]().timeLeft(FarmRunner.curBerry.harvestTime);
        } else {
            console.log("Full");
        }
    }

    public static harvest(plotId) {
        if (player.plotList[plotId]().berry() !== null && player.plotList[plotId]().timeLeft <= 0) {
            FarmRunner.gainPlotExp(plotId);
            player.gainFarmPoints(player.plotList[plotId]().berry().farmValue);
            player.plotList[plotId]().berry = null;
        } else {
            console.log("Not ready");
        }
    }

    public static gainPlotExp(plotId) {
        player.plotList[plotId]().exp += player.plotList[plotId]().berry().farmValue;
    }

    public static gainBerryByName(berryname: string, amount: number = 1) {
        player.berryList()
    }

    public static getImage(plot: Plot) {
        return "assets/images/pokemon/3.png"
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    let seedList = $('#seedList');
    seedList.children().get(0).className += " active"
    seedList.find("li").click(function () {
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
    });
});
