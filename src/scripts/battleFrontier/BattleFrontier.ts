class BattleFrontier {
    constructor() {}

    public static canAccess() {
        const deoxysQuest = App.game.quests.getQuestLine('Mystery of Deoxys');
        return deoxysQuest.state() == QuestLineState.ended || deoxysQuest.curQuest() >= 3;
    }

    public static enter() {
        if (!this.canAccess()) {
            return Notifier.notify({ title: '[Battle Frontier]', message: 'You must progress further in the "Mystery of Deoxys" quest before you can participate', type: GameConstants.NotificationOption.warning });
        }
        App.game.gameState = GameConstants.GameState.battleFrontier;
    }

    public static start() {
        BattleFrontierRunner.start();
    }

    public static leave() {
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }
}
