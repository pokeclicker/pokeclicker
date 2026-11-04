/// <reference path="./BerryMasterShop.ts"/>

type ForecastDeal = {
    costs: DealCost[],
    profits: DealProfit[],
};

type ForecastDay = {
    date: Date,
    deals: ForecastDeal[],
};

type UpcomingDay = {
    date: Date,
    deals: Partial<Record<GameConstants.BerryTraderLocations, BerryDeal[]>>,
};

class DailyDealForecast {
    public static dateRange = 7;
    public static selectedShop: KnockoutObservable<BerryMasterShop> = ko.observable(undefined);
    private static allShops: BerryMasterShop[] = undefined;

    private static getAllShops(): BerryMasterShop[] {
        if (!DailyDealForecast.allShops) {
            DailyDealForecast.allShops = Object.values(TownList)
                .flatMap((town) => town.content)
                .filter((content): content is BerryMasterShop => content instanceof BerryMasterShop);
        }
        return DailyDealForecast.allShops;
    }

    public static shopList: KnockoutComputed<BerryMasterShop[]> = ko.pureComputed(() => {
        return DailyDealForecast.getAllShops().filter((shop) => shop.isUnlocked() && shop.parent.isUnlocked());
    });

    // Every shop's deals, kept separate from the forecast so switching shops doesn't regenerate the whole week
    private static upcomingDeals: KnockoutComputed<UpcomingDay[]> = ko.pureComputed(() => {
        // Generating future deals reseeds the RNG, so set it back after
        const seededRandState = SeededRand.state;
        try {
            const date = new Date(GameHelper.tomorrow());
            const days: UpcomingDay[] = [];
            for (let i = 0; i < DailyDealForecast.dateRange; i++) {
                days.push({ date: new Date(date), deals: BerryDeal.getDealsByDate(date) });
                date.setDate(date.getDate() + 1);
            }
            return days;
        } finally {
            SeededRand.state = seededRandState;
        }
    });

    public static forecast: KnockoutComputed<ForecastDay[]> = ko.pureComputed(() => {
        const shop = DailyDealForecast.selectedShop();
        if (!shop) {
            return [];
        }

        return DailyDealForecast.upcomingDeals().map((day) => ({
            date: day.date,
            deals: DailyDealForecast.toForecastDeals(day.deals[shop.location]),
        }));
    });

    // Reshaped into what traderCostProfitItemTemplate expects
    private static toForecastDeals(deals: BerryDeal[]): ForecastDeal[] {
        return deals.map((deal) => ({
            costs: deal.berries.map((berry) => ({
                type: DealCostOrProfitType.Berry,
                berryType: berry.berryType,
                amount: berry.amount,
            })),
            profits: [
                {
                    type: DealCostOrProfitType.Item,
                    item: deal.item.itemType,
                    amount: deal.item.amount,
                },
            ],
        }));
    }

    public static open(shop: BerryMasterShop) {
        DailyDealForecast.selectedShop(shop);
        $('#dailyDealForecastModal').modal('show');
    }
}
