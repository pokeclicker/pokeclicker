///<reference path="../GameConstants.ts"/>
///<reference path="FactoryItem.ts"/>
///<reference path="../Main.ts"/>

class BallFactoryItem extends FactoryItem {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, timeLeft: number) {
        super(GameConstants.Pokeball[type], timeLeft, 1);
        this.type = type;
    }

    public tick() {
        this.timeLeft -= 1;
    }

    public gainItem() {
        player.gainPokeballs(this.type, this.gain)
    }

}