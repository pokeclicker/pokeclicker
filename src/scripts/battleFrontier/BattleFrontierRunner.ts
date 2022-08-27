/// <reference path="../../declarations/GameHelper.d.ts" />

class BattleFrontierRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    static stage: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static checkpoint: KnockoutObservable<number> = ko.observable(1); // Start at stage 1
    public static highest: KnockoutObservable<number> = ko.observable(1);
	public static lastEarningsCheckpoint : KnockoutObservable<number> = ko.observable(0);

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

    public static start(useCheckpoint: boolean) {
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
	
	// Do the whole calculation, based on the last defeated stage and the stage that the player once quitted at before.
	public static computeCompleteEarnings() : Record<string, number> {
		const stageBeaten = this.stage() - 1;
		
		const rawBPEarned = this.computeStageBP(stageBeaten);
		const checkPointBPEarned = this.computeStageBP(this.lastEarningsCheckpoint());
		
		const battlePointsEarned = Math.max(0, Math.round(rawBPEarned) - Math.round(checkPointBPEarned));
		const moneyEarned = Math.max(0, (rawBPEarned - checkPointBPEarned) * 100);
		
		return {battlePointsEarned : battlePointsEarned, moneyEarned : moneyEarned};
	}
	
	// Give the player what they should earn. Assignements fix the issue with the display not showing the actual money income.
	public static awardEarnings(earnings : Record<string, number>) {
		earnings.battlePointsEarned = App.game.wallet.gainBattlePoints(earnings.battlePointsEarned).amount;
        earnings.moneyEarned = App.game.wallet.gainMoney(earnings.moneyEarned).amount;
	}
	
	// Old simple run calculation.
	public static computeStageBP(stageBeaten : number) : number {
		const battleMultiplier = Math.max(stageBeaten / 100, 1);
		const battlePointsEarned = battleMultiplier * stageBeaten;
		return battlePointsEarned;
	}
	
	public static updatelastEarningsCheckpoint(stageBeaten : number, value : number) : boolean {
		let changed = false;
		if((changed = stageBeaten > this.lastEarningsCheckpoint()))
			this.lastEarningsCheckpoint(value);
		return changed;
	}

    public static battleLost() {
		const stageBeaten = this.stage() - 1;
        const earnings = this.computeCompleteEarnings();
		if(earnings.battlePointsEarned != 0)
			this.awardEarnings(earnings);

        Notifier.notify({
            title: 'Battle Frontier',
            message: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.` +
			(earnings.battlePointsEarned != 0 ? `\nYou received <img src="./assets/images/currency/battlePoint.svg" height="24px"/> ${earnings.battlePointsEarned.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/money.svg" height="24px"/> ${earnings.moneyEarned.toLocaleString('en-US')}.` : ''),
            strippedMessage: `You managed to beat stage ${stageBeaten.toLocaleString('en-US')}.` +
			(earnings.battlePointsEarned != 0 ? `\nYou received ${earnings.battlePointsEarned.toLocaleString('en-US')} Battle Points.\nYou received ${earnings.moneyEarned.toLocaleString('en-US')} Pokédollars.`: ''),
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.General.battle_frontier,
            sound: NotificationConstants.NotificationSound.General.battle_frontier,
            timeout: 30 * GameConstants.MINUTE,
        });
        App.game.logbook.newLog(LogBookTypes.FRONTIER, `Cleared stage ${stageBeaten.toLocaleString('en-US')} of the Battle Frontier` + (earnings.battlePointsEarned != 0 ? ` and received ${earnings.battlePointsEarned.toLocaleString('en-US')} Battle Points.`: '.'));

        this.checkpoint(1);
		this.updatelastEarningsCheckpoint(stageBeaten, 0);
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
				const stageBeaten = this.stage() - 1;
				const earnings = this.computeCompleteEarnings();
				if(earnings.battlePointsEarned != 0)
					this.awardEarnings(earnings);
                Notifier.notify({
                    title: 'Battle Frontier',
                    message: `Checkpoint set for stage ${this.stage()}.` +
						(earnings.battlePointsEarned != 0 ? `\nYou received <img src="./assets/images/currency/battlePoint.svg" height="24px"/> ${earnings.battlePointsEarned.toLocaleString('en-US')}.\nYou received <img src="./assets/images/currency/money.svg" height="24px"/> ${earnings.moneyEarned.toLocaleString('en-US')}.` : ''),
					strippedMessage : `Checkpoint set for stage ${this.stage()}.` +
						(earnings.battlePointsEarned != 0 ? `\nYou received ${earnings.battlePointsEarned.toLocaleString('en-US')} Battle Points.\nYou received ${earnings.moneyEarned.toLocaleString('en-US')} Pokédollars.`: ''),
                    type: NotificationConstants.NotificationOption.info,
                    timeout: 1 * GameConstants.MINUTE,
                });
				if(earnings.battlePointsEarned != 0)
					App.game.logbook.newLog(LogBookTypes.FRONTIER, `Cleared stage ${stageBeaten.toLocaleString('en-US')} of the Battle Frontier and received ${earnings.battlePointsEarned.toLocaleString('en-US')} Battle Points.`);
				
				this.updatelastEarningsCheckpoint(stageBeaten, stageBeaten);
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
