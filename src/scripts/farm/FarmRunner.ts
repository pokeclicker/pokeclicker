class FarmRunner {
    public static plotPrice: KnockoutObservable<number> = ko.observable(10);



    public static timeToReduce() {
        // TODO(@Isha) fix when refactoring to feature
        return App.game ? App.game.oakItems.calculateBonus(OakItems.OakItem.Sprayduck): 1;
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

    public static plantAll() {
        for (let i = 0; i < player.plotList.length; i++) {
            FarmRunner.plant(i);
        }
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
