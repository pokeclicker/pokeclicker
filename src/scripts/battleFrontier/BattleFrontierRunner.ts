class BattleFrontierRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    static stage: KnockoutObservable<number> = ko.observable(1); // Start at stage 1

    public static counter = 0;

    public static started = ko.observable(false);

    constructor() {}

    public static tick() {
        if (!this.started()) {
            return;
        }
        if (this.timeLeft() < 0) {
            this.battleLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.GYM_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.GYM_TIME * 100));
    }

    public static start() {
        this.started(true);
        this.stage(1);
        BattleFrontierBattle.pokemonIndex(0);
        BattleFrontierBattle.generateNewEnemy();
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);
        App.game.gameState = GameConstants.GameState.battleFrontier;
    }

    public static nextStage() {
        if (App.game.statistics.battleFrontierHighestStageCompleted() < this.stage()) {
            // Gain any rewards we should have earned for defeating this stage
            BattleFrontierMilestones.gainReward(this.stage());
            // Update our highest stage
            App.game.statistics.battleFrontierHighestStageCompleted(this.stage());
        }
        // Move on to the next stage
        GameHelper.incrementObservable(this.stage);
        GameHelper.incrementObservable(App.game.statistics.battleFrontierTotalStagesCompleted);
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);
        
    }

    public static end() {
        BattleFrontierBattle.enemyPokemon(null);
        this.stage(1);
        this.started(false);
    }

    public static battleLost() {
        // Current stage - 1 as the player didn't beat the current stage
        const stageBeaten = this.stage() - 1;
        // Give Battle Points and Money based on how far the user got
        const battleMultiplier = Math.max(stageBeaten / 100, 1);
        const battlePointsEarned = Math.round(stageBeaten * battleMultiplier);
        const moneyEarned = stageBeaten * 100 * battleMultiplier;

        Notifier.notify({ title: 'Battle Frontier', message: `You managed to beat stage ${stageBeaten}.<br/>You received ${battlePointsEarned} BP`, type: GameConstants.NotificationOption.success, timeout: 5 * GameConstants.MINUTE });

        // Award battle points
        App.game.wallet.gainBattlePoints(battlePointsEarned);
        App.game.wallet.gainMoney(moneyEarned);
        const reward = BattleFrontierMilestones.nextMileStone();

        this.end();
    }
    public static battleQuit() {
        if (!confirm('Are you sure you want to leave?\n\nYou will not receive any Battle Points for the stages already completed.')) {
            return;
        }
        // Don't give any points, user quit the challenge
        Notifier.notify({ title: 'Battle Frontier', message: `You made it to stage ${this.stage()}`, type: GameConstants.NotificationOption.info, timeout: 5 * GameConstants.MINUTE });

        this.end();
    }

    public static timeLeftSeconds = ko.pureComputed(function () {
        return (Math.ceil(BattleFrontierRunner.timeLeft() / 10) / 10).toFixed(1);
    })

    public static pokemonLeftImages = ko.pureComputed(function () {
        let str = '';
        for (let i = 0; i < 3; i++) {
            str += `<img class="pokeball-smallest" src="assets/images/pokeball/Pokeball-small.png"${BattleFrontierBattle.pokemonIndex() > i ? ' style="filter: saturate(0);"' : ''}>`;
        }
        return str;
    })
}
