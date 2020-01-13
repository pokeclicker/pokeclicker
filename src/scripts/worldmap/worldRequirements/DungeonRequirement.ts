class DungeonRequirement implements WorldRequirement {
    // TODO(@Isha) change to enum during dungeon refactor
    dungeon: string;

    constructor(dungeon: string) {
        this.dungeon = dungeon;
    }

    isCompleted(): boolean {
        return player.statistics.dungeonsCleared[Statistics.getDungeonIndex(this.dungeon)]() > 0;
    }

    lockedReason(): string {
        return `You need to clear the ${this.dungeon} Dungeon before you can access this location.`;
    }
}