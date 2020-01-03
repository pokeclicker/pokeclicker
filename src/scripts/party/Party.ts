class Party implements Feature {
    name: string = "Pokemon Party";
    saveKey: string = "party";


    defaults: object = {
        caughtPokemon: [],
        shinyPokemon: [],
    };

    caughtPokemon: ObservableArrayProxy<PartyPokemon>;
    shinyPokemon: ObservableArrayProxy<number>;

    constructor() {
    }

    gainPokemonById(id: number, shiny: boolean = false) {
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id), shiny);
    }

    gainPokemon(pokemon: PartyPokemon, shiny: boolean = false) {
        // Already have it shiny
        if (this.alreadyCaughtPokemon(pokemon.id, true)) {
            return;
        }

        if (shiny) {
            this.shinyPokemon.push(pokemon.id);
            Notifier.notify(`✨ You have captured a shiny ${pokemon.name}! ✨`, GameConstants.NotificationOption.warning);
        }

        if (this.alreadyCaughtPokemon(pokemon.id, false)) {
            return;
        }
        Notifier.notify(`You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.name}!`, GameConstants.NotificationOption.success);
        player.caughtAmount[pokemon.id](player.caughtAmount[pokemon.id]() + 1);
        GameHelper.incrementObservable(player.statistics.pokemonCaptured);
        this.caughtPokemon.push(pokemon);

    }

    public gainExp(exp: number = 0, level: number = 1, trainer: boolean = false) {
        App.game.oakItems.use(OakItems.OakItem.Exp_Share);
        let trainerBonus = trainer ? 1.5 : 1;
        let oakItemBonus = App.game.oakItems.calculateBonus(OakItems.OakItem.Exp_Share);
        let expTotal = Math.floor(exp * level * trainerBonus * oakItemBonus * (1 + AchievementHandler.achievementBonus()) / 9);

        if(EffectEngineRunner.isActive(GameConstants.BattleItemType.xExp)()){
            expTotal *= 1.5;
        }

        for (let pokemon of this.caughtPokemon) {
            if (pokemon.levelObservable() < (App.game.badgeCase.badgeCount() + 2) * 10) {
                pokemon.exp += expTotal;
            }
        }
    }

    alreadyCaughtPokemon(id: number, shiny: boolean = false) {
        for (let i = 0; i < this.caughtPokemon.length; i++) {
            if (this.caughtPokemon[i].id === id) {
                return (!shiny || this.shinyPokemon.includes(id));
            }
        }
        return false;
    }

    calculateClickAttack(): number {
        // Base power
        let clickAttack = Math.pow(this.caughtPokemon.length + 1, 1.4);

        // TODO(@Isha) fix when refactoring to party
        if (App.game != undefined) {
            clickAttack *= App.game.oakItems.calculateBonus(OakItems.OakItem.Poison_Barb);
        }

        // Apply battle item bonus
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.xClick)()) {
            clickAttack *= 1.5;
        }

        return Math.floor(clickAttack);
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
    }

    initialize(): void {
    }

    toJSON(): object {
        return undefined;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

}
