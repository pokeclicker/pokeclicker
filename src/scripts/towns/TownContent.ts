abstract class TownContent {
    public abstract cssClass: string;
    public abstract requirements: (Requirement | OneFromManyRequirement)[];
    public abstract text(): string;
    public abstract isVisible(): boolean;
    public abstract onclick(): void;
}

class DockTownContent implements TownContent {
    parent: Town;

    constructor(parent: Town) {
        this.parent = parent;
    }
    public cssClass = 'btn-info';
    public requirements: [];

    public isVisible() {
        return player.highestRegion() > 0;
    }

    public onclick(): void {
        MapHelper.openShipModal();
    }

    public text() {
        return 'Dock';
    }
}

class BattleFrontierTownContent implements TownContent {
    public cssClass = 'btn-primary';
    public requirements: [];

    public isVisible() {
        return true;
    }

    public onclick(): void {
        App.game.battleFrontier.enter();
    }

    public text() {
        return 'Enter Battle Frontier';
    }
}

class NextRegionTownContent implements TownContent {
    public cssClass = 'btn-warning';
    public requirements: [];

    public isVisible() {
        return MapHelper.ableToTravel();
    }

    public onclick(): void {
        $('#nextRegionModal').modal('show');
    }

    public text() {
        return `Travel to ${GameConstants.camelCaseToString(GameConstants.Region[player.highestRegion() + 1])}`;
    }
}
