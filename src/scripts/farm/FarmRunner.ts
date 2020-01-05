class FarmRunner {
    public static curBerry: Berry = BerryList['Cheri'];
    public static counter = 0;
    public static plotPrice: KnockoutObservable<number> = ko.observable(10);

    public static openFarmModal() {
        if (FarmRunner.accessToFarm()) {
            this.plotPrice(this.computePlotPrice());
            App.game.gameState = GameConstants.GameState.paused;
            $('#farmModal').modal('show');
        } else {
            Notifier.notify("You don't have access to this location yet", GameConstants.NotificationOption.warning);
        }
    }

    public static accessToFarm() {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
    }

    public static timeToReduce(){
        // TODO(@Isha) fix when refactoring to feature
        return App.game ? App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck): 1
    }

    public static tick() {
        this.counter = 0;
        const timeToReduce = App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck);
        for (let i = 0; i < player.plotList.length; i++) {
            player.plotList[i]().timeLeft(Math.max(0, player.plotList[i]().timeLeft() - timeToReduce));
        }
    }

    public static computePlotPrice(): number {
        if (this.allPlotsUnlocked()) {
            return Infinity;
        }
        let i = 0;
        while (player.plotList[i]().isUnlocked()) {
            i++;
        }
        return 10 * Math.floor(Math.pow(i, 1.6));
    }

    public static unlockPlot() {
        if (this.canBuyPlot()) {
            player.unlockPlot();
            App.game.wallet.loseAmount(new Amount(this.plotPrice(), GameConstants.Currency.farmPoint));
            this.plotPrice(this.computePlotPrice());
        }
    }

    public static allPlotsUnlocked() {
        return player.plotList[player.plotList.length - 1]().isUnlocked();
    }

    public static canBuyPlot() {
        return !this.allPlotsUnlocked() && App.game.wallet.hasAmount(new Amount(this.plotPrice(), GameConstants.Currency.farmPoint));
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
            Notifier.notify(`You earned ${total} money from the harvest!`, GameConstants.NotificationOption.success)
        }
    }

    public static isEmpty(plotId) {
        return ko.computed(function () {
            return this.getPlot(plotId).berry() == null;
        }, this);
    }

    public static hasBerry(type: GameConstants.BerryType) {
        return player.berryList[type]() > 0;
    }

    public static removeBerry(type: GameConstants.BerryType, amount = 1) {
        player.berryList[type](player.berryList[type]() - amount);
    }

    public static plant(plotId) {
        const plot = this.getPlot(plotId);
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
        const plot = this.getPlot(plotId);
        if (plot.berry() !== null && plot.timeLeft() <= 0) {
            App.game.wallet.gainFarmPoints(plot.berry().farmValue);
            FarmRunner.gainBerryById(plot.berry().type, GameConstants.randomIntBetween(2, 3));
            const money = plot.berry().moneyValue;
            App.game.wallet.gainMoney(money);
            if(!all){
                Notifier.notify(`You earned ${money} money from the harvest!`, GameConstants.NotificationOption.success)
            }
            plot.berry(null);
            App.game.oakItems.use(OakItems.OakItem.Sprayduck);
            return money;
        }
        return 0;
    }

    public static gainBerryByName(berryName: string, amount = 1) {
        player.berryList[GameConstants.BerryType[berryName]](player.berryList[GameConstants.BerryType[berryName]]() + amount);
    }

    public static gainBerryById(berryId: number, amount = 1) {
        player.berryList[berryId](player.berryList[berryId]() + amount);
        GameHelper.incrementObservable(player.statistics.berriesHarvested[berryId], amount);
    }

    public static getTooltipLabel(plotId) {
        const plot = this.getPlot(plotId);

        if (plot.timeLeft() > 0) {
            return plot.formattedTimeLeft();
        }

        return 'Ready'
    }

    public static getImage(plot: Plot) {
        if (plot.getStage() <= 1) {
            return 'assets/images/farm/AllTreeSeedIII.png'
        }
        return 'assets/images/farm/' + GameConstants.BerryType[plot.berry().type] + 'Tree' + GameConstants.PlotStage[plot.getStage()] + 'III.png';
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    $('#farmModal').on('show.bs.modal', function () {
        const seedList = $('#seedList');
        seedList.children().get(FarmRunner.curBerry.type).className += ' active';
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
