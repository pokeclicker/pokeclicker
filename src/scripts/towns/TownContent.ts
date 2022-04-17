abstract class TownContent {
    public abstract cssClass(): KnockoutComputed<string>;
    public abstract text(): string;
    public abstract isVisible(): boolean;
    public abstract onclick(): void;
    public tooltip: string = undefined;

    public requirements: (Requirement | OneFromManyRequirement)[];
    protected parent: Town;
    public addParent(parent: Town) {
        this.parent = parent;
    }

    public areaStatus() {
        return areaStatus.completed;
    }

    public isUnlocked(): boolean {
        return this.requirements.every(requirement => requirement.isCompleted());
    }

    constructor(requirements: (Requirement | OneFromManyRequirement)[] = []) {
        this.requirements = requirements;
    }
}

class DockTownContent extends TownContent {
    public cssClass() {
        return ko.pureComputed(() => {
            return 'btn btn-info';
        });
    }

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
    public cssClass() {
        return ko.pureComputed(() => {
            return 'btn btn-primary';
        });
    }

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
    public cssClass() {
        return ko.pureComputed(() => {
            return 'btn btn-warning';
        });
    }

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
