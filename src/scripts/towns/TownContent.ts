abstract class TownContent {
    public abstract cssClass: string;
    public abstract text(): string;
    public abstract isVisible(): boolean;
    public abstract onclick(): void;

    public requirements: (Requirement | OneFromManyRequirement)[];
    protected parent: Town;
    addParent(parent: Town) {
        this.parent = parent;
    }

    constructor(requirements: (Requirement | OneFromManyRequirement)[] = []) {
        this.requirements = requirements;
    }
}

class DockTownContent extends TownContent {
    public cssClass = 'btn-info';

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

class BattleFrontierTownContent extends TownContent {
    public cssClass = 'btn-primary';

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

class NextRegionTownContent extends TownContent {
    public cssClass = 'btn-warning';

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
