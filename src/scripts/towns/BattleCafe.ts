class BattleCafe extends TownContent {
    public cssClass() {
        return 'btn btn-info';
    }
    public isVisible() {
        return true;
    }

    public onclick(): void {
        $('#battleCafe').modal('show');
    }

    public text() {
        return 'Battle Café';
    }
}

declare enum AlcremieSweet {
    'Strawberry Sweet',
    'Love Sweet',
    'Berry Sweet',
    'Clover Sweet',
    'Flower Sweet',
    'Star Sweet',
    'Ribbon Sweet'
}
declare enum AlcremieSpins {
    dayClockwiseBelow5,
    dayCounterclockwiseBelow5,
    nightClockwiseBelow5,
    nightCounterclockwiseAbove5,
    nightClockwiseAbove5,
    nightCounterclockwiseBelow5,
    dayClockwiseAbove5,
    dayCounterclockwiseAbove5,
    at7Above10
}

class BattleCafeController {
    static selectedSweet = ko.observable<AlcremieSweet>(undefined);

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


    private static getPrice(sweet: AlcremieSweet) : {berry: BerryType, amount: number}[] {
        // TODO: fix prices
        switch (sweet) {
            case AlcremieSweet['Strawberry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Love Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Berry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Clover Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Flower Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Star Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
            case AlcremieSweet['Ribbon Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 3},
                    {berry: BerryType.Chesto, amount: 3},
                ];
        }
    }

    private static buildEvolutions() : {[sweet: string] : {[spin: string]: PokemonItem}} {
        const evolutions = {};
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]] = {};
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Vanilla)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Ruby Cream)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Matcha)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Mint)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Lemon)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Strawberry Salted)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Ruby Swirl)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Strawberry Caramel)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Strawberry Sweet']]][AlcremieSpins[AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Strawberry Rainbow)', 0);

        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]] = {};
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.dayClockwiseBelow5]] = new PokemonItem('Alcremie (Love Vanilla)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.dayCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Love Ruby Cream)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.nightClockwiseBelow5]] = new PokemonItem('Alcremie (Love Matcha)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.nightCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Love Mint)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.nightClockwiseAbove5]] = new PokemonItem('Alcremie (Love Lemon)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.nightCounterclockwiseBelow5]] = new PokemonItem('Alcremie (Love Salted)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.dayClockwiseAbove5]] = new PokemonItem('Alcremie (Love Ruby Swirl)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.dayCounterclockwiseAbove5]] = new PokemonItem('Alcremie (Love Caramel)', 0);
        evolutions[AlcremieSweet[AlcremieSweet['Love Sweet']]][AlcremieSpins[AlcremieSpins.at7Above10]] = new PokemonItem('Alcremie (Love Rainbow)', 0);

        return evolutions;
    }
}
