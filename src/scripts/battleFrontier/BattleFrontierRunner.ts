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
        if (!BattleFrontierRunner.started()) {
            return;
        }
        if (BattleFrontierRunner.timeLeft() < 0) {
            BattleFrontierRunner.battleLost();
        }
        BattleFrontierRunner.timeLeft(BattleFrontierRunner.timeLeft() - GameConstants.GYM_TICK);
        BattleFrontierRunner.timeLeftPercentage(Math.floor(BattleFrontierRunner.timeLeft() / GameConstants.GYM_TIME * 100));
    }

    public static async start(useCheckpoint: boolean) {
        if (!useCheckpoint && BattleFrontierRunner.hasCheckpoint()) {
            if (!await Notifier.confirm({
                title: 'Restart Battle Frontier?',
                message: 'Current progress will be lost and you will restart from the first stage.',
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'OK',
            })) {
                return;
            }
        }

        BattleFrontierRunner.started(true);
        BattleFrontierRunner.stage(useCheckpoint ? BattleFrontierRunner.checkpoint() : 1);
        BattleFrontierRunner.highest(useCheckpoint ? BattleFrontierRunner.highest() : App.game.statistics.battleFrontierHighestStageCompleted());
        BattleFrontierBattle.pokemonIndex(0);
        BattleFrontierBattle.generateNewEnemy();
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);
        App.game.gameState = GameConstants.GameState.battleFrontier;
    }

    public static nextStage() {
        // Gain any rewards we should have earned for defeating this stage
        BattleFrontierMilestones.gainReward(BattleFrontierRunner.computedDifficultyStage());
        if (App.game.statistics.battleFrontierHighestStageCompleted() < BattleFrontierRunner.computedDifficultyStage()) {
            // Update our highest stage
            App.game.statistics.battleFrontierHighestStageCompleted(BattleFrontierRunner.computedDifficultyStage());
        }
        // Move on to the next stage
        GameHelper.incrementObservable(BattleFrontierRunner.stage);
        GameHelper.incrementObservable(App.game.statistics.battleFrontierTotalStagesCompleted);
        BattleFrontierRunner.timeLeft(GameConstants.GYM_TIME);
        BattleFrontierRunner.timeLeftPercentage(100);

        BattleFrontierRunner.checkpoint(BattleFrontierRunner.stage());
    }

    public static end() {
        BattleFrontierBattle.enemyPokemon(null);
        BattleFrontierRunner.stage(1);
        BattleFrontierRunner.started(false);
    }

    public static battleLost() {
        // Current stage - 1 as the player didn't beat the current stage
        const stageBeaten = BattleFrontierRunner.stage() - 1;
        const stageBeatenDifficulty = BattleFrontierRunner.difficultyStage(stageBeaten, BattleFrontierRunner.highest());
        // Give Battle Points and Money based on how far the user got
        let battlePointsEarned = this.calculateFullBP(stageBeaten, BattleFrontierRunner.highest());
        let moneyEarned = battlePointsEarned * 100;

        // Award battle points and dollars and retrieve their computed values
        battlePointsEarned = App.game.wallet.gainBattlePoints(battlePointsEarned).amount;
        moneyEarned = App.game.wallet.gainMoney(moneyEarned, true).amount;

        Notifier.notify({
            title: 'Battle Frontier',
            message: `You managed to beat stage ${stageBeatenDifficulty.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/battlePoint.svg" height="24px"/> ${battlePointsEarned.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/money.svg" height="24px"/> ${moneyEarned.toLocaleString('en-US')}.`,
            strippedMessage: `You managed to beat stage ${stageBeatenDifficulty.toLocaleString('en-US')}.\nYou received ${battlePointsEarned.toLocaleString('en-US')} Battle Points.\nYou received ${moneyEarned.toLocaleString('en-US')} Pokédollars.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.General.battle_frontier,
            sound: NotificationConstants.NotificationSound.General.battle_frontier,
            timeout: 30 * GameConstants.MINUTE,
        });
        App.game.logbook.newLog(
            LogBookTypes.FRONTIER,
            createLogContent.gainBattleFrontierPoints({
                stage: stageBeatenDifficulty.toLocaleString('en-US'),
                points: battlePointsEarned.toLocaleString('en-US'),
            })
        );

        BattleFrontierRunner.checkpoint(1);

        BattleFrontierRunner.end();
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
                    message: `Checkpoint set for stage ${BattleFrontierRunner.computedDifficultyStage()}.`,
                    type: NotificationConstants.NotificationOption.info,
                    timeout: 1 * GameConstants.MINUTE,
                });

                BattleFrontierRunner.end();
            }
        });
    }

    public static difficultyStage(stage: number, previousHighestStage: number): number {
        if (previousHighestStage < 1000) {
            return stage;
        }
        const bonusStage = Math.max(stage - 1000, 0);
        const valueStage = Math.min(1000, stage) / 1000 * previousHighestStage;
        return Math.floor(valueStage + bonusStage);
    }

    public static calculateFullBP(stage: number, previousHighestStage: number): number {
        // We want to reward people improving their record, punish people leaving too soon.
        const modifier = 2 * Math.min((stage / Math.min(1000, previousHighestStage)) ** 2, 4);
        if (previousHighestStage < 1000) {
            return modifier * BattleFrontierRunner.calculateBP(stage);
        }
        const multiplier = 1000 / previousHighestStage;
        const bonusStage = BattleFrontierRunner.difficultyStage(Math.max(stage, 1000), previousHighestStage);
        const valueStage = BattleFrontierRunner.difficultyStage(Math.min(1000, stage), previousHighestStage);
        const bonusStageBP = BattleFrontierRunner.calculateBP(bonusStage) - BattleFrontierRunner.calculateBP(previousHighestStage);
        const valueStageBP = Math.round(BattleFrontierRunner.calculateBP(valueStage) * multiplier);
        return modifier * (bonusStageBP + valueStageBP);
    }

    public static calculateBP(stage: number): number {
        return Math.max(stage, Math.round(stage ** 2 / 100));
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

    public static computedDifficultyStage = ko.computed(() => {
        return BattleFrontierRunner.difficultyStage(BattleFrontierRunner.stage(), BattleFrontierRunner.highest());
    })

    public static computedPreviousDifficultyStage = ko.computed(() => {
        return BattleFrontierRunner.difficultyStage(BattleFrontierRunner.stage() - 1, BattleFrontierRunner.highest());
    })

    public static computedDifficultyCheckpoint = ko.computed(() => {
        return BattleFrontierRunner.difficultyStage(BattleFrontierRunner.checkpoint(), BattleFrontierRunner.highest());
    })
}
