abstract class TownContent {
    public abstract cssClass(): string;
    public abstract text(): string;
    public abstract isVisible(): boolean;
    public abstract onclick(): void;
    public tooltip: string = undefined;

    public requirements: (Requirement | OneFromManyRequirement)[];
    public parent: Town;
    public addParent(parent: Town) {
        this.parent = parent;
    }

    public areaStatus() {
        return areaStatus.completed;
    }

    public isUnlocked(): boolean {
        return this.requirements.every(requirement => requirement.isCompleted());
    }

    public clears(): number {
        return undefined;
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
                message: `You don't have access yet.\n${reqsList.join('\n')}`,
                type: NotificationConstants.NotificationOption.warning,
            });
        } else {
            this.onclick();
        }
    }

    constructor(requirements: (Requirement | OneFromManyRequirement)[] = []) {
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
    dungeon: Dungeon;
    constructor(dungeon: Dungeon) {
        super([]);
        this.dungeon = dungeon;
    }

    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.dungeon.name;
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        MapHelper.moveToTown(this.dungeon.name);
    }
    public isUnlocked(): boolean {
        return TownList[this.dungeon.name].isUnlocked();
    }
    public areaStatus(): areaStatus {
        const dungeonAccess = MapHelper.calculateTownCssClass(this.dungeon.name);
        switch (dungeonAccess) {
            // if dungeon completed or locked, ignore it
            case 'completed':
            case 'locked':
                return areaStatus.completed;
            // Return the dungeons state
            default:
                return areaStatus[dungeonAccess];
        }
    }
    public clears() {
        if (!QuestLineHelper.isQuestLineCompleted('Tutorial Quests')) {
            return undefined;
        }
        return App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(this.dungeon.name)]();
    }
}
