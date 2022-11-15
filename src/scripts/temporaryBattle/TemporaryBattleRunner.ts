/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/enums/Badges.d.ts" />

class TemporaryBattleRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.TEMP_BATTLE_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);
    public static timeBonus: KnockoutObservable<number> = ko.observable(1);

    public static battleObservable: KnockoutObservable<TemporaryBattle> = ko.observable();
    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static startBattle(
        battle: TemporaryBattle
    ) {
        this.running(false);
        this.battleObservable(battle);
        App.game.gameState = GameConstants.GameState.idle;
        DungeonRunner.timeBonus(FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute));
        this.timeLeft(GameConstants.TEMP_BATTLE_TIME * this.timeBonus());
        this.timeLeftPercentage(100);

        player.route(0);
        Battle.route = 0;
        Battle.catching(!(battle.optionalArgs.isTrainerBattle ?? true));
        TemporaryBattleBattle.battle = battle;
        TemporaryBattleBattle.totalPokemons(battle.getPokemonList().length);
        TemporaryBattleBattle.index(0);
        TemporaryBattleBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.temporaryBattle;
        this.running(true);
        this.resetGif();

        setTimeout(() => {
            this.hideGif();
        }, GameConstants.GYM_COUNTDOWN);
    }

    private static hideGif() {
        $('#temporaryBattleGoContainer').hide();
    }

    public static resetGif() {
        if (!Settings.getSetting('showGymGoAnimation').value) {
            return;
        }
        $('#temporaryBattleGoContainer').show();
        setTimeout(() => {
            $('#temporaryBattleGo').attr('src', 'assets/gifs/go.gif');
        }, 0);
    }

    public static tick() {
        if (!this.running()) {
            return;
        }
        if (this.timeLeft() < 0) {
            this.battleLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.TEMP_BATTLE_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / (GameConstants.TEMP_BATTLE_TIME * FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute)) * 100));

        const currentFluteBonus = FluteEffectRunner.getFluteMultiplier(GameConstants.FluteItemType.Time_Flute);
        if (currentFluteBonus != this.timeBonus()) {
            if (currentFluteBonus > this.timeBonus()) {
                if (this.timeBonus() === 1) {
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                } else {
                    this.timeLeft(this.timeLeft() / this.timeBonus());
                    this.timeBonus(currentFluteBonus);
                    this.timeLeft(this.timeLeft() * this.timeBonus());
                }
            } else {
                this.timeLeft(this.timeLeft() / this.timeBonus());
                this.timeBonus(currentFluteBonus);
            }
        }
    }

    public static battleLost() {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: `It appears you are not strong enough to defeat ${TemporaryBattleBattle.battle.getDisplayName()}.`,
                type: NotificationConstants.NotificationOption.danger,
            });
            player.town(TemporaryBattleBattle.battle.getTown());
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static battleWon(battle: TemporaryBattle) {
        if (this.running()) {
            this.running(false);
            if (App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(battle.name)]() == 0) {
                battle.optionalArgs.firstTimeRewardFunction?.();
                if (battle.defeatMessage) {
                    $('#temporaryBattleWonModal').modal('show');
                }
            }
            battle.optionalArgs.rewardFunction?.();
            GameHelper.incrementObservable(App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(battle.name)]);
            player.town(battle.getTown());
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(TemporaryBattleRunner.timeLeft() / 100) / 10).toFixed(1);
    })

}
