class DungeonTile {
    isVisible: boolean;
    hasPlayer: boolean;
    type: KnockoutObservable<GameConstants.DungeonTile>;
    cssClass: KnockoutObservable<string>;

    constructor(type: GameConstants.DungeonTile) {
        this.isVisible = false;
        this.hasPlayer = false;
        this.type = ko.observable(type);
        this.cssClass = ko.observable('');
        this.calculateCssClass();
    }

    public calculateCssClass() {
        if (!this.isVisible) {
            this.cssClass('tile tile-invisible');
            return;
        }
        if (this.hasPlayer) {
            this.cssClass('tile tile-player');
            return;
        }
        this.cssClass(`tile tile-${GameConstants.DungeonTile[this.type()]}`);
    }
}
