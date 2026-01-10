class BattleFrontier implements Feature {
    name = 'BattleFrontier';
    saveKey = 'battleFrontier';

    milestones = BattleFrontierMilestones;

    defaults = {};

    constructor() {}

    initialize(): void {}

    update(delta: number): void {}

    canAccess(): boolean {
        return true;
    }

    public enter(): void {
        BattleFrontierBattle.enemyPokemon(null);
        App.game.gameState = GameConstants.GameState.battleFrontier;
    }

    public start(useCheckpoint: boolean): void {
        BattleFrontierRunner.start(useCheckpoint);
    }

    public leave(): void {
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }

    toJSON(): Record<string, any> {
        return {
            milestones: this.milestones.milestoneRewards.map(r => r.toJSON()),
            checkpoint: BattleFrontierRunner.checkpoint(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        json.milestones?.forEach((data, index) => {
            this.milestones.milestoneRewards[index].fromJSON(data);
        });

        BattleFrontierRunner.checkpoint(json.checkpoint);
    }
}
