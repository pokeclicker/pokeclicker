class FarmRunner {
    public static curBerry: Berry = BerryList["Cheri"];
    public static counter: number = 0;
    public static plotPrice: KnockoutObservable<number> = ko.observable(10);

    public static openFarmModal() {
        if (FarmRunner.accessToFarm()) {
            this.plotPrice(this.computePlotPrice());
            $('#farmModal').modal('show');
        } else {
            Notifier.notify("You don't have access to this location yet", GameConstants.NotificationOption.warning);
        }
    }

    public static accessToFarm() {
        return MapHelper.accessToRoute(14, 0) && player.hasKeyItem("Wailmer pail");
    }

    public static tick() {
        this.counter = 0;
        for (let i = 0; i < 25; i++) {
            player.plotList[i]().timeLeft(Math.max(0, player.plotList[i]().timeLeft() - 1));
        }

    }

    public static computePlotPrice(): number {
        let i = 0;
        while (player.plotList[i]().isUnlocked()) {
            i++;
        }
        return 10 * Math.floor(Math.pow(i, 1.6));
    }

    public static unlockPlot() {
        if (this.canBuyPlot()) {
            player.unlockPlot();
            player.farmPoints(player.farmPoints() - this.plotPrice());
            this.plotPrice(this.computePlotPrice());
        }
    }

    public static canBuyPlot() {
        return player.farmPoints() >= this.plotPrice();
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
        let total = 0;
        for (let i = 0; i < player.plotList.length; i++) {
            total += FarmRunner.harvest(i, true);
        }
        if (total > 0 ){
            Notifier.notify(`You earn ${total} money from the harvest!`, GameConstants.NotificationOption.success)
        }
    }

    public static isEmpty(plotId) {
        return ko.computed(function () {
            return this.getPlot(plotId).berry() == null;
        }, this);
    }

    public static hasBerry(type: GameConstants.BerryType, amount: number = 1) {
        return (player.berryList[type]() - amount) >= 0;
    }

    public static removeBerry(type: GameConstants.BerryType, amount: number = 1) {
        player.berryList[type](player.berryList[type]() - amount);
    }

    public static plant(plotId) {
        let plot = this.getPlot(plotId);
        if (!plot.isEmpty()) {
            return;
        }

        if (!plot.isUnlocked()) {
            return;
        }

        if (!this.hasBerry(FarmRunner.curBerry.type)) {
            return;
        }
        FarmRunner.removeBerry(FarmRunner.curBerry.type);
        plot.berry(FarmRunner.curBerry);
        plot.timeLeft(FarmRunner.curBerry.harvestTime);

    }

    public static harvest(plotId, all = false) {
        let plot = this.getPlot(plotId);
        if (plot.berry() !== null && plot.timeLeft() <= 0) {
            player.gainFarmPoints(plot.berry().farmValue);
            FarmRunner.gainBerryById(plot.berry().type, GameConstants.randomIntBetween(2, 3));
            let money = plot.berry().moneyValue;
            player.gainMoney(money);
            if(!all){
                Notifier.notify(`You earn ${money} money from the harvest!`, GameConstants.NotificationOption.success)
            }
            plot.berry(null);
            OakItemRunner.use("Sprayduck");
            return money;
        }
        return 0;
    }

    public static gainBerryByName(berryName: string, amount: number = 1) {
        player.berryList[GameConstants.BerryType[berryName]](player.berryList[GameConstants.BerryType[berryName]]() + amount);
    }

    public static gainBerryById(berryType: number, amount: number = 1) {
        player.berryList[berryType](player.berryList[berryType]() + amount);
    }

    public static getTooltipLabel(plotId) {
        let plot = this.getPlot(plotId);

        if (plot.timeLeft() > 0) {
            return plot.formattedTimeLeft();
        }

        return "Ready"
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