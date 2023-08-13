abstract class TownContent {
    public abstract cssClass(): string;
    public abstract text(): string;
    public abstract onclick(): void;
    public tooltip: string = undefined;

    public requirements: (Requirement | OneFromManyRequirement)[];
    public parent: Town;
    public addParent(parent: Town) {
        this.parent = parent;
    }

    public areaStatus() : areaStatus {
        return this.isUnlocked() ? areaStatus.completed : areaStatus.locked;
    }

    public isUnlocked(): boolean {
        return this.requirements.every(requirement => requirement.isCompleted());
    }

    public clears(): number {
        return undefined;
    }

    public isVisible(): boolean {
        if (this.requirements.some(r => r instanceof DevelopmentRequirement || (r instanceof MultiRequirement && r.requirements.some(r2 => r2 instanceof DevelopmentRequirement)))) {
            return this.isUnlocked();
        }
        return true;
    }

    public protectedOnclick(): void {
        if (!this.isVisible()) {
            return;
        }
        const reqsList = [];
        this.requirements?.forEach(requirement => {
            if (!requirement.isCompleted()) {
                reqsList.push(requirement.hint());
            }
        });
        if (reqsList.length) {
            Notifier.notify({
                message: `You don't have access yet.\n<i>${reqsList.join('\n')}</i>`,
                type: NotificationConstants.NotificationOption.warning,
            });
        } else {
            this.onclick();
        }
    }

    constructor(requirements: Requirement[] = []) {
        this.requirements = requirements;
    }
}

class DockTownContent extends TownContent {
    public cssClass() {
        return 'btn btn-info';
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
        return 'btn btn-primary';
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
        return 'btn btn-warning';
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

class MoveToDungeon extends TownContent {

    constructor(private dungeon: Dungeon, private visibleRequirement: Requirement = undefined) {
        super([]);
    }

    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.dungeon.name;
    }
    public isVisible(): boolean {
        return this.visibleRequirement?.isCompleted() ?? true;
    }
    public onclick(): void {
        MapHelper.moveToTown(this.dungeon.name);
    }
    public isUnlocked(): boolean {
        return TownList[this.dungeon.name].isUnlocked();
    }
    public areaStatus(): areaStatus {
        return areaStatus[MapHelper.calculateTownCssClass(this.dungeon.name)];
    }
    public clears() {
        if (!QuestLineHelper.isQuestLineCompleted('Tutorial Quests')) {
            return undefined;
        }
        return App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(this.dungeon.name)]();
    }
}

class MoveToTown extends TownContent {
    constructor(private townName: string, private visibleRequirement: Requirement = undefined, private includeAreaStatus: boolean = true) {
        super([]);
    }

    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.townName;
    }
    public isVisible(): boolean {
        return this.visibleRequirement?.isCompleted() ?? true;
    }
    public onclick(): void {
        MapHelper.moveToTown(this.townName);
    }
    public isUnlocked(): boolean {
        return TownList[this.townName].isUnlocked();
    }

    public areaStatus(): areaStatus {
        if (this.includeAreaStatus) {
            return areaStatus[MapHelper.calculateTownCssClass(this.townName)];
        } else {
            return areaStatus.completed;
        }
    }
}

class WeatherAppTownContent extends TownContent {
    public cssClass() {
        return 'btn btn-secondary';
    }

    public isVisible() {
        return WeatherApp.isUnlocked();
    }

    public onclick(): void {
        WeatherApp.openWeatherAppModal();
    }

    public text() {
        return 'Open the Castform App';
    }
}
