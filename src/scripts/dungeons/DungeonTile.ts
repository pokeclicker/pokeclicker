class DungeonTile {
    isVisible: boolean;
    hasPlayer: boolean;
    type: GameConstants.DungeonTile;


    constructor(type: GameConstants.DungeonTile) {
        this.isVisible = false;
        this.hasPlayer = false;
        this.type = type;
    }

    public calculateCssClass() {
        return ko.computed(function () {
            if (!this.isVisible) {
                return "tile-invisible";
            }
            if (this.hasPlayer) {
                return "tile-player";
            }
            return "tile-" + this.type;
        });
    }
}