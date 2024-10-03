/// <reference path="../../declarations/GameHelper.d.ts" />

class BattleFrontierRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    static stage: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static checkpoint: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static highest: KnockoutObservable<number> = ko.observable(1);
    public static battleBackground: KnockoutObservable<GameConstants.BattleBackground> = ko.observable('Default');
    public static readonly STAGES_PER_FLOOR = 10;
    public static readonly MONEY_TO_BATTLE_POINTS_RATIO = 100;

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

        if (!useCheckpoint) {
            BattleFrontierRunner.battleBackground('Default');
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
        if (this.stage() % this.STAGES_PER_FLOOR == 0) {
            // Calculate rewards
            const stageBattlePoints = this.calculateBattlePointsForStage(this.stage());
            const previouslyEarnedBattlePoints = this.calculateBattlePointsForStage(this.stage() - this.STAGES_PER_FLOOR);
            const battlePointsEarned = stageBattlePoints - previouslyEarnedBattlePoints;
            const moneyEarned = battlePointsEarned * this.MONEY_TO_BATTLE_POINTS_RATIO;

            // Award battle points and dollars
            App.game.wallet.gainBattlePoints(battlePointsEarned);
            App.game.wallet.gainMoney(moneyEarned, true);

            Notifier.notify({
                title: 'Battle Frontier',
                message: `You beat stage ${this.stage().toLocaleString('en-US')}!\nYou earned <img src="./assets/images/currency/battlePoint.svg" height="24px"/>&nbsp;${battlePointsEarned.toLocaleString('en-US')} and <img src="./assets/images/currency/money.svg" height="24px"/>&nbsp;${moneyEarned.toLocaleString('en-US')}.`,
                strippedMessage: `You beat stage ${this.stage().toLocaleString('en-US')}!\nYou earned ${battlePointsEarned.toLocaleString('en-US')} Battle Points and ${moneyEarned.toLocaleString('en-US')} Pokédollars.`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.General.battle_frontier,
                sound: NotificationConstants.NotificationSound.General.battle_frontier,
                timeout: GameConstants.SECOND * this.STAGES_PER_FLOOR,
            });

            // Change background
            const currentBackground = BattleFrontierRunner.battleBackground();
            const backgrounds = Object.keys(GameConstants.BattleBackgrounds).filter((key) => key !== currentBackground);
            BattleFrontierRunner.battleBackground(Rand.fromArray(backgrounds) as GameConstants.BattleBackground);
        }
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
        const lastRewardStage = Math.floor(stageBeaten / this.STAGES_PER_FLOOR) * this.STAGES_PER_FLOOR;
        const totalBattlePointsEarned = this.calculateBattlePointsForStage(lastRewardStage);
        const totalMoneyEarned = this.MONEY_TO_BATTLE_POINTS_RATIO * totalBattlePointsEarned;

        Notifier.notify({
            title: 'Battle Frontier',
            message: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.\nYou received a total of <img src="./assets/images/currency/battlePoint.svg" height="24px"/> ${totalBattlePointsEarned.toLocaleString('en-US')}.\nYou received a total of <img src="./assets/images/currency/money.svg" height="24px"/> ${totalMoneyEarned.toLocaleString('en-US')}.`,
            strippedMessage: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.\nYou received a total of ${totalBattlePointsEarned.toLocaleString('en-US')} Battle Points.\nYou received a total of ${totalMoneyEarned.toLocaleString('en-US')} Pokédollars.`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.General.battle_frontier,
            sound: NotificationConstants.NotificationSound.General.battle_frontier,
            timeout: 5 * GameConstants.MINUTE,
        });
        App.game.logbook.newLog(
            LogBookTypes.FRONTIER,
            createLogContent.gainBattleFrontierPoints({
                stage: stageBeaten.toLocaleString('en-US'),
                points: totalBattlePointsEarned.toLocaleString('en-US'),
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

    public static calculateBattlePointsForStage(stage: number): number {
        const battleMultiplier = Math.max(stage / 100, 1);
        return Math.round(stage * battleMultiplier);
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
