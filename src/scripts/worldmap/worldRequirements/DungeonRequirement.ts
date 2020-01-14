class DungeonRequirement implements WorldRequirement {
    name: DungeonName;

    constructor(name: DungeonName) {
        this.name = name;
    }

    isCompleted(): boolean {
        return player.statistics.dungeonsCleared[(this.name)]() > 0;
    }

    lockedReason(): string {
        return `You need to clear the ${DungeonName[this.name]} Dungeon before you can access this location.`;
    }
}