class BattleCafe extends TownContent {
    constructor() {
        super([new ObtainedPokemonRequirement('Milcery')]);
    }

    public cssClass() {
        return 'btn btn-info';
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
        BattleCafeController.spinsLeft(json.spinsLeft ?? BattleCafeController.baseDailySpins);
    }

}

class BattleCafeController {
    static selectedSweet = ko.observable<GameConstants.AlcremieSweet>(undefined);
    static baseDailySpins = 3;
    static spinsLeft = ko.observable<number>(BattleCafeController.baseDailySpins);
    static isSpinning = ko.observable<boolean>(false);
    static clockwise = ko.observable<boolean>(false);

    static spinsPerDay() : number {
        // Give additional spins for each sweet type completed, shiny, and resistant
        let spins = this.baseDailySpins;
        const sweetStatus = GameHelper.enumStrings(GameConstants.AlcremieSweet)
            .map((s) => ({
                caught: BattleCafeController.getCaughtStatus(GameConstants.AlcremieSweet[s])(),
                pokerus: BattleCafeController.getPokerusStatus(GameConstants.AlcremieSweet[s])(),
            }));
        // Caught
        spins += sweetStatus.filter((s) => s.caught >= CaughtStatus.Caught).length;
        // Caught Shiny
        spins += sweetStatus.filter((s) => s.caught == CaughtStatus.CaughtShiny).length;
        // Resistant
        spins += sweetStatus.filter((s) => s.pokerus == GameConstants.Pokerus.Resistant).length;
        return spins;
    }

    public static spin(clockwise: boolean) {
        if (!BattleCafeController.canSpin()) {
            return;
        }

        BattleCafeController.clockwise(clockwise);
        BattleCafeController.isSpinning(true);
        const spinTime = +$('#battleCafeDuration').val();
        const sweet = BattleCafeController.selectedSweet();


        setTimeout(() => {
            BattleCafeController.isSpinning(false);
            BattleCafeController.unlockAlcremie(clockwise, spinTime, sweet);
            BattleCafeController.spinsLeft(BattleCafeController.spinsLeft() - 1);
            BattleCafeController.getPrice(sweet).forEach(b => GameHelper.incrementObservable(App.game.farming.berryList[b.berry], b.amount * -1));
        },
        spinTime * 1000);
    }

    private static unlockAlcremie(clockwise: boolean, spinTime: number, sweet: GameConstants.AlcremieSweet) {
        let spin: GameConstants.AlcremieSpins;
        if (spinTime == 3600) {
            (new PokemonItem('Milcery (Cheesy)', 0)).gain(1);
            return;
        }
        if (DayCycle.currentDayCyclePart() === DayCyclePart.Dusk && !clockwise && spinTime > 10) {
            spin = GameConstants.AlcremieSpins.at5Above10;
        } else if ([DayCyclePart.Night, DayCyclePart.Dawn].includes(DayCycle.currentDayCyclePart())) {
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.nightCounterclockwiseAbove5;
            }
        } else { // Is day
            if (clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseBelow5;
            } else if (clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayClockwiseAbove5;
            } else if (!clockwise && spinTime < 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseBelow5;
            } else if (!clockwise && spinTime >= 5) {
                spin = GameConstants.AlcremieSpins.dayCounterclockwiseAbove5;
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
        if (+$('#battleCafeDuration').val() > 20 && +$('#battleCafeDuration').val() != 3600) {
            Notifier.notify({
                message: 'Can\'t spin for more than 20 seconds, unless...',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (+$('#battleCafeDuration').val() < 1) {
            Notifier.notify({
                message: 'It only counts as spinning, if you spin for some time...',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!BattleCafeController.canBuySweet(BattleCafeController.selectedSweet())()) {
            Notifier.notify({
                message: 'Not enough berries for this sweet.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    public static canBuySweet(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            return BattleCafeController.getPrice(sweet).every(b => {
                if (App.game.farming.berryList[b.berry]() < b.amount) {
                    return false;
                }
                return true;
            });
        });
    }

    public static getCaughtStatus(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<CaughtStatus> {
        return ko.pureComputed(() => {
            return Math.min(...Object.values(BattleCafeController.evolutions[sweet]).map((pokemon: PokemonItem) => pokemon.getCaughtStatus()));
        });
    }

    public static getPokerusStatus(sweet: GameConstants.AlcremieSweet) : KnockoutComputed<GameConstants.Pokerus> {
        return ko.pureComputed(() => {
            return Math.min(...Object.values(BattleCafeController.evolutions[sweet]).map((pokemon: PokemonItem) => pokemon.getPokerusStatus()));
        });
    }


    private static getPrice(sweet: GameConstants.AlcremieSweet) : {berry: BerryType, amount: number}[] {
        switch (sweet) {
            // should be easy to do, without touching the farm
            case GameConstants.AlcremieSweet['Strawberry Sweet']:
                return [
                    {berry: BerryType.Cheri, amount: 500},
                    {berry: BerryType.Leppa, amount: 500},
                    {berry: BerryType.Razz, amount: 50},
                ];
            // max gen 2
            case GameConstants.AlcremieSweet['Clover Sweet']:
                return [
                    {berry: BerryType.Wepear, amount: 1000},
                    {berry: BerryType.Aguav, amount: 2000},
                    {berry: BerryType.Lum, amount: 10},
                ];
            // max gen 3
            case GameConstants.AlcremieSweet['Star Sweet']:
                return [
                    {berry: BerryType.Pinap, amount: 2000},
                    {berry: BerryType.Grepa, amount: 100},
                    {berry: BerryType.Nomel, amount: 50},
                ];
            // max gen 4
            case GameConstants.AlcremieSweet['Berry Sweet']:
                return [
                    {berry: BerryType.Passho, amount: 1000},
                    {berry: BerryType.Yache, amount: 75},
                    {berry: BerryType.Coba, amount: 150},
                ];
            // max gen 4
            case GameConstants.AlcremieSweet['Ribbon Sweet']:
                return [
                    {berry: BerryType.Bluk, amount: 3000},
                    {berry: BerryType.Pamtre, amount: 50},
                    {berry: BerryType.Payapa, amount: 100},
                ];
            // max gen 5
            case GameConstants.AlcremieSweet['Flower Sweet']:
                return [
                    {berry: BerryType.Figy, amount: 15000},
                    {berry: BerryType.Iapapa, amount: 20000},
                    {berry: BerryType.Liechi, amount: 3},
                ];
            // max gen 5
            case GameConstants.AlcremieSweet['Love Sweet']:
                return [
                    {berry: BerryType.Haban, amount: 200},
                    {berry: BerryType.Roseli, amount: 700},
                    {berry: BerryType.Lansat, amount: 5},
                ];

        }
    }

    public static calcMaxSpins(sweet: GameConstants.AlcremieSweet): number {
        const maxSpins = BattleCafeController.getPrice(sweet)
            .map((cost) => Math.floor(App.game.farming.berryList[cost.berry]() / cost.amount));
        return Math.min(...maxSpins);
    }

    public static evolutions: Record<GameConstants.AlcremieSweet, Record<Exclude<GameConstants.AlcremieSpins, GameConstants.AlcremieSpins.Any3600>, PokemonItem>> = {
        [GameConstants.AlcremieSweet['Strawberry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Strawberry Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Strawberry Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Strawberry Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Love Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Love Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Love Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Love Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Love Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Love Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Love Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Love Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Berry Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Berry Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Berry Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Berry Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Berry Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Berry Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Berry Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Berry Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Clover Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Clover Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Clover Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Clover Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Clover Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Clover Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Clover Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Clover Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Flower Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Flower Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Flower Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Flower Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Flower Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Flower Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Flower Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Flower Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Star Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Star Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Star Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Star Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Star Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Star Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Star Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Star Rainbow)'),
        },

        [GameConstants.AlcremieSweet['Ribbon Sweet']]: {
            [GameConstants.AlcremieSpins.dayClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Vanilla)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Ruby Cream)'),
            [GameConstants.AlcremieSpins.nightClockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Matcha)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Mint)'),
            [GameConstants.AlcremieSpins.nightClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Lemon)'),
            [GameConstants.AlcremieSpins.nightCounterclockwiseBelow5]: new PokemonItem('Alcremie (Ribbon Salted)'),
            [GameConstants.AlcremieSpins.dayCounterclockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Ruby Swirl)'),
            [GameConstants.AlcremieSpins.dayClockwiseAbove5]: new PokemonItem('Alcremie (Ribbon Caramel)'),
            [GameConstants.AlcremieSpins.at5Above10]: new PokemonItem('Alcremie (Ribbon Rainbow)'),
        },

    };
}
