class BattleCafe extends TownContent {
    public cssClass() {
        return 'btn btn-info';
    }
    public isVisible() {
        return true;
    }

    public onclick(): void {
        $('#battleCafeModal').modal('show');
    }

    public text() {
        return 'Battle Café';
    }
}

class BattleCafeController {
    static selectedSweet = ko.observable<GameConstants.AlcremieSweet>(undefined);

    public static spin() {
        if (!BattleCafeController.canSpin()) {
            Notifier.notify({
                message: 'Can\'t spin',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }
    }

    private static canSpin() {
        if (!BattleCafeController.selectedSweet()) {
            return false;
        }
        return BattleCafeController.getPrice(BattleCafeController.selectedSweet()).every(b => {
            if (App.game.farming.berryList[b.berry]() < b.amount) {
                return false;
            }
            return true;
        });
    }


    private static getPrice(sweet: GameConstants.AlcremieSweet) : {berry: BerryType, amount: number}[] {
        // TODO: fix prices
        switch (sweet) {
            case GameConstants.AlcremieSweet['Strawberry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Love Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Berry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Clover Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Flower Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Star Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Ribbon Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
        }
    }

    private static buildEvolutions() : {[sweet: string] : {[spin: string]: PokemonItem}} {
        const evolutions = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Strawberry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Strawberry Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Love Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Love Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Love Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Love Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Love Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Love Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Love Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Love Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Love Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Love Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Berry Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Berry Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Berry Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Berry Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Berry Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Berry Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Berry Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Berry Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Berry Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Berry Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Clover Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Clover Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Clover Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Clover Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Clover Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Clover Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Clover Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Clover Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Clover Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Clover Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Flower Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Flower Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Flower Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Flower Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Flower Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Flower Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Flower Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Flower Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Flower Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Flower Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Star Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Star Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Star Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Star Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Star Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Star Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Star Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Star Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Star Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Star Rainbow)', 0);

        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]] = {};
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Ribbon Vanilla)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Ribbon Ruby Cream)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Ribbon Matcha)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Ribbon Mint)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Ribbon Lemon)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Ribbon Salted)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Ribbon Ruby Swirl)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Ribbon Caramel)', 0);
        evolutions[GameConstants.AlcremieSweet[GameConstants.AlcremieSweet['Ribbon Sweet']]][GameConstants.AlcremieSpins[GameConstants.AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Ribbon Rainbow)', 0);

        return evolutions;
    }
}
