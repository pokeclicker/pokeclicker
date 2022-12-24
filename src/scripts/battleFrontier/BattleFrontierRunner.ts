/// <reference path="../../declarations/GameHelper.d.ts" />

class BattleFrontierRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    static stage: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static checkpoint: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static highest: KnockoutObservable<number> = ko.observable(1);

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

    public static async start(useCheckpoint: boolean) {
        if (!useCheckpoint && this.hasCheckpoint()) {
            if (!await Notifier.confirm({
                title: 'Restart Battle Frontier?',
                message: 'Current progress will be lost and you will restart from the first stage.',
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'OK',
            })) {
                return;
            }
        }

        this.started(true);
        this.stage(useCheckpoint ? this.checkpoint() : 1);
        this.highest(App.game.statistics.battleFrontierHighestStageCompleted());
        BattleFrontierBattle.pokemonIndex(0);
        BattleFrontierBattle.generateNewEnemy();
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);
        App.game.gameState = GameConstants.GameState.battleFrontier;
    }

    public static nextStage() {
        // Gain any rewards we should have earned for defeating this stage
        BattleFrontierMilestones.gainReward(this.stage());
        if (App.game.statistics.battleFrontierHighestStageCompleted() < this.stage()) {
            // Update our highest stage
            App.game.statistics.battleFrontierHighestStageCompleted(this.stage());
        }
        // Move on to the next stage
        GameHelper.incrementObservable(this.stage);
        GameHelper.incrementObservable(App.game.statistics.battleFrontierTotalStagesCompleted);
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);

        this.checkpoint(this.stage());
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
        let battlePointsEarned = Math.round(stageBeaten * battleMultiplier);
        let moneyEarned = stageBeaten * 100 * battleMultiplier;

        // Award battle points and dollars and retrieve their computed values
        battlePointsEarned = App.game.wallet.gainBattlePoints(battlePointsEarned).amount;
        moneyEarned = App.game.wallet.gainMoney(moneyEarned, true).amount;

        Notifier.notify({
            title: 'Battle Frontier',
            message: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/battlePoint.svg" height="24px"/> ${battlePointsEarned.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/money.svg" height="24px"/> ${moneyEarned.toLocaleString('en-US')}.`,
            strippedMessage: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.\nYou received ${battlePointsEarned.toLocaleString('en-US')} Battle Points.\nYou received ${moneyEarned.toLocaleString('en-US')} Pokédollars.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.General.battle_frontier,
            sound: NotificationConstants.NotificationSound.General.battle_frontier,
            timeout: 30 * GameConstants.MINUTE,
        });
        App.game.logbook.newLog(
            LogBookTypes.FRONTIER,
            createLogContent.gainBattleFrontierPoints({
                stage: stageBeaten.toLocaleString('en-US'),
                points: battlePointsEarned.toLocaleString('en-US'),
            })
        );

        this.checkpoint(1);

        this.end();
    }
    public static battleQuit() {
        Notifier.confirm({
            title: 'Battle Frontier',
            message: 'Are you sure you want to leave?\n\nYou can always return later and start off where you left.',
            type: NotificationConstants.NotificationOption.danger,
            confirm: 'Leave',
        }).then(confirmed => {
            if (confirmed) {
                // Don't give any points, user quit the challenge
                Notifier.notify({
                    title: 'Battle Frontier',
                    message: `Checkpoint set for stage ${this.stage()}.`,
                    type: NotificationConstants.NotificationOption.info,
                    timeout: 1 * GameConstants.MINUTE,
                });

                this.end();
            }
        });
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(BattleFrontierRunner.timeLeft() / 100) / 10).toFixed(1);
    })

    public static pokemonLeftImages = ko.pureComputed(() => {
        let str = '';
        for (let i = 0; i < 3; i++) {
            str += `<img class="pokeball-smallest" src="assets/images/pokeball/Pokeball.svg"${BattleFrontierBattle.pokemonIndex() > i ? ' style="filter: saturate(0);"' : ''}>`;
        }
        return str;
    })

    public static hasCheckpoint = ko.computed(() => {
        return BattleFrontierRunner.checkpoint() > 1;
    })
}
