// For helper functions that may be needed across all files
class GameHelper {
    private static readonly MS_IN_MIN = 1000 * 60;
    private static readonly MS_IN_HOUR = GameHelper.MS_IN_MIN * 60;
    public static counter = 0;
    public static currentTime: KnockoutObservable<Date> = ko.observable(new Date());
    public static tomorrow: Date = GameHelper.getTomorrow();
    public static msUntilTomorrow: KnockoutComputed<number> = ko.computed(function () {
        return Number(GameHelper.tomorrow) - Number(GameHelper.currentTime());
    });
    public static formattedTimeUntilTomorrow: KnockoutComputed<string> = ko.computed(function () {
        let milliseconds = GameHelper.msUntilTomorrow();
        let hours = Math.floor(milliseconds / GameHelper.MS_IN_HOUR);
        milliseconds -= hours * GameHelper.MS_IN_HOUR;
        let minutes = Math.floor(milliseconds / GameHelper.MS_IN_MIN);
        return `${hours}:${GameHelper.twoDigitNumber(minutes)}`;
    });

    public static formattedLetterTimeUntilTomorrow: KnockoutComputed<string> = ko.computed(function () {
        let milliseconds = GameHelper.msUntilTomorrow();
        let hours = Math.floor(milliseconds / GameHelper.MS_IN_HOUR);
        milliseconds -= hours * GameHelper.MS_IN_HOUR;
        let minutes = Math.floor(milliseconds / GameHelper.MS_IN_MIN);
        return `${hours}h${GameHelper.twoDigitNumber(minutes)}m`;
    });

    public static incrementObservable(obs: KnockoutObservable<number>, amt: number = 1) {
        obs(obs() + amt);
    }

    public static enumLength(enumerable): number {
        return Object.keys(enumerable).length / 2;
    }

    public static updateTime() {
        let now = new Date();
        if (now.getDate() == GameHelper.tomorrow.getDate()) {
            GameHelper.tomorrow = GameHelper.getTomorrow();
        }
        GameHelper.currentTime(new Date());
    }

    private static getTomorrow() {
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);
        tomorrow.setMilliseconds(0);
        return tomorrow;
    }

    private static twoDigitNumber(n: number): string {
        // For use in clocks / showing time
        // Turns 4 into 04, does nothing to 23, turns 173 into 73
        return (`0${n}`).slice(-2);
    }

    public static formatAmount(n: number): string {
      if (n >= 1e9){
        return Math.floor(n / 1e9) + "b";
      } else if (n >= 1e6){
        return Math.floor(n / 1e6) + "m";
      } else if (n >= 1e3){
        return Math.floor(n / 1e3) + "k";
      }
      return n;
    }

    public static getIndexFromDistribution(a: number[]) {
        let rand = Math.random();
        for (let i = 0; i < a.length; i++) {
            if (rand <= a[i]) {
                return i;
            }
        }
    }

    public static getRegion(id): GameConstants.Region {
        if (id <= GameConstants.AMOUNT_OF_POKEMONS_GEN1) return GameConstants.Region.kanto;
        if (id <= GameConstants.AMOUNT_OF_POKEMONS_GEN2) return GameConstants.Region.johto;
        return GameConstants.Region.hoenn;
    }

    public static createArray(start: number, max: number, step: number) {
        let array = [];
        for (let i = start; i <= max; i += step) {
            array.push(i);
        }
        return array;
    }

    public static anOrA(name: string): string {
      return ['a', 'e', 'i', 'o', 'u'].includes(name[0].toLowerCase()) ? 'an' : 'a';
    }
}
