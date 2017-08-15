class FarmRunner {
    public static curBerry: Berry;

    public static openFarmModal() {
        $('#farmModal').modal('show');
    }

    public static accessToFarm() {
        //TODO implement
        return true;
    }

    public static tick() {
        for (let i = 0; i < 25; i++) {
            player.plotList[i].timeLeft = Math.max(0, player.plotList[i].timeLeft - 1);
        }
    }

    public static plantAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.plant(i, FarmRunner.curBerry);
        }
    }

    public static harvestAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.harvest(i);
        }
    }

    public static plant(plotId, berry: Berry) {
        if (player.plotList[plotId].berry == null) {
            player.plotList[plotId].berry = berry;
            player.plotList[plotId].timeLeft = berry.harvestTime;
        } else {
            console.log("Full");
        }
    }

    public static harvest(plotId) {
        if (player.plotList[plotId].berry !== null && player.plotList[plotId].timeLeft <= 0) {
            FarmRunner.gainPlotExp(plotId);
            player.gainFarmPoints(player.plotList[plotId].berry.farmValue);
            player.plotList[plotId].berry = null;
        } else {
            console.log("Not ready");
        }
    }

    public static gainPlotExp(plotId) {
        player.plotList[plotId].exp += player.plotList[plotId].berry.farmValue;
    }

    public static gainBerryByName(berryname: string, amount: number = 1) {
        player.berryList()
    }

}
