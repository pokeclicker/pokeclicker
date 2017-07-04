class DungeonTile {
    isVisible: boolean;
    hasPlayer: boolean;
    type: GameConstants.DungeonTile;


    constructor(type: GameConstants.DungeonTile) {
        this.isVisible = false;
        this.hasPlayer = false;
        this.type = type;
    }

    public calculateCssClass(): KnockoutComputed<string> {
        return ko.computed(function () {
            if (!this.isVisible) {
                return "tile tile-invisible";
            }
            if (this.hasPlayer) {
                return "tile tile-player";
            }
            return "tile tile-" + this.type;
        });
    }
}