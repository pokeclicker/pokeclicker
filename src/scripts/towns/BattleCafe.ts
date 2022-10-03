class BattleCafe extends TownContent {
    constructor() {
        super([new ObtainedPokemonRequirement(pokemonMap.Milcery)]);
    }

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

class BattleCafeSaveObject implements Saveable {
    saveKey = 'BattleCafe';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            spinsLeft: BattleCafeController.spinsLeft(),
        };
    }
    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        BattleCafeController.spinsLeft(json.spinsLeft ?? BattleCafeController.defaultSpins);
    }

}

class BattleCafeController {
    static defaultSpins = 3;
    static selectedSweet = ko.observable<GameConstants.AlcremieSweet>(undefined);
    static spinsLeft = ko.observable<number>(BattleCafeController.defaultSpins);
    static isSpinning = ko.observable<boolean>(false);
    static clockwise = ko.observable<boolean>(false);

    public static spin(clockwise: boolean) {
        if (!BattleCafeController.canSpin()) {
            return;
        }

        BattleCafeController.clockwise(clockwise);
        BattleCafeController.isSpinning(true);
        BattleCafeController.spinsLeft(BattleCafeController.spinsLeft() - 1);
        const spinTime = +$('#battleCafeDuration').val();
        const sweet = BattleCafeController.selectedSweet();
        BattleCafeController.getPrice(sweet).forEach(b => GameHelper.incrementObservable(App.game.farming.berryList[b.berry], b.amount * -1));

        setTimeout(() => {
            BattleCafeController.isSpinning(false);
            BattleCafeController.unlockAlcremie(clockwise, spinTime, sweet);
        },
        spinTime * 1000);
    }

    private static unlockAlcremie(clockwise: boolean, spinTime: number, sweet: GameConstants.AlcremieSweet) {
        let spin: GameConstants.AlcremieSpins;
        const curHour = (new Date()).getHours();
        if (curHour == 18 && !clockwise && spinTime > 10) {
            spin = GameConstants.AlcremieSpins.at7Above10;
        } else if (curHour >= 5 && curHour < 19) { // Is day
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseAbove5;
            }
        } else { // Is night
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseAbove5;
            }
        }
        BattleCafeController.evolutions[sweet][spin].gain(1);
    }

    private static canSpin() {
        if (BattleCafeController.selectedSweet() == undefined) {
            Notifier.notify({
                message: 'No sweet selected.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (BattleCafeController.isSpinning()) {
            Notifier.notify({
                message: 'Already spinning.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (BattleCafeController.spinsLeft() < 1) {
            Notifier.notify({
                message: 'No spins left today.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return BattleCafeController.getPrice(BattleCafeController.selectedSweet()).every(b => {
            if (App.game.farming.berryList[b.berry]() < b.amount) {
                Notifier.notify({
                    message: 'Not enough berries for this sweet.',
                    type: NotificationConstants.NotificationOption.danger,
                });
                return false;
            }
            return true;
        });
    }


    private static getPrice(sweet: GameConstants.AlcremieSweet) : {berry: BerryType, amount: number}[] {
        switch (sweet) {
            case GameConstants.AlcremieSweet['Strawberry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 500},
                    {berry: BerryType.Leppa, amount: 400},
                    {berry: BerryType.Razz, amount: 30},
                ];
            case GameConstants.AlcremieSweet['Love Sweet']:
                return [
                    {berry: BerryType.Roseli, amount: 20},
                    {berry: BerryType.Liechi, amount: 10},
                ];
            case GameConstants.AlcremieSweet['Berry Sweet']:
                return [
                    {berry: BerryType.Yache, amount: 25},
                    {berry: BerryType.Haban, amount: 25},
                    {berry: BerryType.Wiki, amount: 150},
                ];
            case GameConstants.AlcremieSweet['Clover Sweet']:
                return [
                    {berry: BerryType.Wepear, amount: 30},
                    {berry: BerryType.Aguav, amount: 30},
                    {berry: BerryType.Lum, amount: 5},
                ];
            case GameConstants.AlcremieSweet['Flower Sweet']:
                return [
                    {berry: BerryType.Pomeg, amount: 30},
                    {berry: BerryType.Nomel, amount: 30},
                ];
            case GameConstants.AlcremieSweet['Star Sweet']:
                return [
                    {berry: BerryType.Starf, amount: 3},
                    {berry: BerryType.Lansat, amount: 3},
                ];
            case GameConstants.AlcremieSweet['Ribbon Sweet']:
                return [
                    {berry: BerryType.Chople, amount: 20},
                    {berry: BerryType.Haban, amount: 20},
                ];
        }
    }

    private static evolutions: Record<GameConstants.AlcremieSweet, Record<GameConstants.AlcremieSpins, PokemonItem>> = {
        [GameConstants.AlcremieSweet['Strawberry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Strawberry Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Love Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Love Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Love Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Love Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Love Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Love Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Berry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Berry Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Berry Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Berry Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Berry Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Berry Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Clover Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Clover Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Clover Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Clover Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Clover Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Clover Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Flower Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Flower Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Flower Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Flower Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Flower Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Flower Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Star Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Star Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Star Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Star Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Star Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Star Rainbow)', 0),
        },

        [GameConstants.AlcremieSweet['Ribbon Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Vanilla)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Ruby Cream)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Matcha)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Mint)', 0),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Lemon)', 0),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Salted)', 0),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Ruby Swirl)', 0),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Caramel)', 0),
            [GameConstants.AlcremieSpins.at7Above10]: new PokemonItem('Alcremie (Ribbon Rainbow)', 0),
        },

    };
}
