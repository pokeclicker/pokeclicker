class DungeonTile {
    isVisible: boolean;
    isVisited: boolean;
    hasPlayer: boolean;
    type: KnockoutObservable<GameConstants.DungeonTile>;
    cssClass: KnockoutObservable<string>;

    constructor(type: GameConstants.DungeonTile) {
        this.isVisible = false;
        this.isVisited = false;
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
        // Base tile class
        const css = ['tile'];
        // If player visited tile add the class
        if (this.isVisited) {
            css.push('tile-visited');
        }
        // Add the tile type class
        css .push(`tile-${GameConstants.DungeonTile[this.type()]}`);
        // Join all the classes
        this.cssClass(css.join(' '));
    }
}
