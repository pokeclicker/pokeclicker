/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/enums/Badges.d.ts" />

class OneTimeBattleRunner {
    public static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.ONETIMEBATTLE_TIME);
    public static timeLeftPercentage: KnockoutObservable<number> = ko.observable(100);

    public static battleObservable: KnockoutObservable<OneTimeBattle> = ko.observable();
    public static running: KnockoutObservable<boolean> = ko.observable(false);

    public static startBattle(
        battle: OneTimeBattle
    ) {
        this.running(false);
        this.battleObservable(battle);
        App.game.gameState = GameConstants.GameState.idle;
        this.timeLeft(GameConstants.ONETIMEBATTLE_TIME);
        this.timeLeftPercentage(100);

        OneTimeBattleBattle.battle = battle;
        OneTimeBattleBattle.totalPokemons(battle.pokemons.length);
        OneTimeBattleBattle.index(0);
        OneTimeBattleBattle.generateNewEnemy();
        App.game.gameState = GameConstants.GameState.oneTimeBattle;
        this.running(true);
        this.resetGif();

        setTimeout(() => {
            this.hideGif();
        }, GameConstants.GYM_COUNTDOWN);
    }

    private static hideGif() {
        $('#oneTimeBattleGoContainer').hide();
    }

    public static resetGif() {
        $('#oneTimeBattleGoContainer').show();
        setTimeout(() => {
            $('#oneTimeBattleGo').attr('src', 'assets/gifs/go.gif');
        }, 0);
    }

    public static tick() {
        if (!this.running()) {
            return;
        }
        if (this.timeLeft() < 0) {
            this.battleLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.ONETIMEBATTLE_TICK);
        this.timeLeftPercentage(Math.floor(this.timeLeft() / GameConstants.ONETIMEBATTLE_TIME * 100));
    }

    public static battleLost() {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: `It appears you are not strong enough to defeat ${OneTimeBattleBattle.battle.name}`,
                type: NotificationConstants.NotificationOption.danger,
            });
            player.town(OneTimeBattleBattle.battle.parent);
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static battleWon(battle: OneTimeBattle) {
        if (this.running()) {
            this.running(false);
            Notifier.notify({
                message: battle.defeatMessage, // TODO: make a popup for the message
                type: NotificationConstants.NotificationOption.success,
            });
            battle.completed = true;
            player.town(battle.parent);
            App.game.gameState = GameConstants.GameState.town;
        }
    }

    public static timeLeftSeconds = ko.pureComputed(() => {
        return (Math.ceil(OneTimeBattleRunner.timeLeft() / 100) / 10).toFixed(1);
    })

}
