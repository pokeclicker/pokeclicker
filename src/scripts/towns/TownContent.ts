abstract class TownContent {
    public abstract cssClass: string;
    public abstract requirements: (Requirement | OneFromManyRequirement)[];
    public abstract text: string;
    public abstract isVisible(): boolean;
    public abstract onclick(): void;
}

class Dock implements TownContent {
    parent: Town;

    constructor(parent: Town) {
        this.parent = parent;
    }

    public text = 'Dock';
    public cssClass = 'btn-info';
    public requirements: [];

    public isVisible() {
        return player.highestRegion() > 0;
    }

    public onclick(): void {
        MapHelper.openShipModal();
    }
}
