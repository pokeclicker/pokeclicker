/**
 * Created by dennis on 26-06-17.
 */
class CaughtPokemon {
    name: string;
    evolved: boolean;
    attackBonus: number;
    exp: number;

    constructor(name: string, evolved: boolean, attackBonus: number, exp: number) {
        this.name = name;
        this.evolved = evolved;
        this.attackBonus = attackBonus;
        this.exp = exp;
    }

    public calculateLevel: KnockoutComputed<number> = ko.computed(function () {
        let level;
        console.log('name = ' + this.name);
        switch (PokemonHelper.getPokemonByName(this.name).levelType) {
            case GameConstants.LevelType.slow:
                level = Math.pow(this.exp * 4 / 5, 1 / 3);
                break;
            case GameConstants.LevelType.mediumslow:
                let y;
                for (let x = 1; x <= 100; x++) {
                    y = 6 / 5 * Math.pow(x, 3) - 15 * Math.pow(x, 2) + 100 * x - 140;
                    if (this.exp >= y) {
                        level = x
                    } else {
                        break;
                    }
                }
                break;
            case GameConstants.LevelType.mediumfast:
                level = Math.pow(this.exp, 1 / 3);
                break;
            case GameConstants.LevelType.fast:
                level = Math.pow(this.exp * 5 / 4, 1 / 3);
                break;
            default:
                level = Math.pow(30 * this.exp, 0.475) / (6 * Math.sqrt(5));
                break;
        }
        level = Math.min(level, (Player.gymBadges.length + 2) * 10);
        return Math.max(1, Math.min(100, Math.floor(level)));
    });
}