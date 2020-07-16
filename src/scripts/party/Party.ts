///<reference path="CaughtStatus.ts"/>
class Party implements Feature {
    name = 'Pokemon Party';
    saveKey = 'party';

    _caughtPokemon: KnockoutObservableArray<PartyPokemon>;
    shinyPokemon: ObservableArrayProxy<number>;


    defaults = {
        caughtPokemon: [],
        shinyPokemon: [],
    };

    hasMaxLevelPokemon: KnockoutComputed<boolean>;


    constructor() {
        this._caughtPokemon = ko.observableArray([]);
        this.shinyPokemon = new ObservableArrayProxy(this.defaults.shinyPokemon);


        this.hasMaxLevelPokemon = ko.pureComputed(() => {
            for (let i = 0; i < this.caughtPokemon.length; i++) {
                if (this.caughtPokemon[i].level === 100) {
                    return true;
                }
            }
            return false;
        }).extend({rateLimit: 1000});

    }

    gainPokemonById(id: number, shiny = false, suppressNotification = false) {
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id), shiny, suppressNotification);
    }

    gainPokemon(pokemon: PartyPokemon, shiny = false, suppressNotification = false) {
        GameHelper.incrementObservable(App.game.statistics.pokemonCaptured[pokemon.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonCaptured);

        if (shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonCaptured[pokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonCaptured);
            // Add all shiny catches to the log book
            App.game.logbook.newLog(LogBookTypes.CAUGHT, `You have captured a shiny ${pokemon.name}!`);
            // Already caught (shiny)
            if (this.alreadyCaughtPokemon(pokemon.id, true)) {
                return;
            }
            // Notify if not already caught
            Notifier.notify({ message: `✨ You have captured a shiny ${pokemon.name}! ✨`, type: GameConstants.NotificationOption.warning });
            // Add to caught shiny list
            this.shinyPokemon.push(pokemon.id);
        }

        // Already caught (non shiny)
        if (this.alreadyCaughtPokemon(pokemon.id, false)) {
            return;
        }

        if (!suppressNotification) {
            Notifier.notify({ message: `You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.name}!`, type: GameConstants.NotificationOption.success });
        }

        App.game.logbook.newLog(LogBookTypes.CAUGHT, `You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.name}!`);
        this._caughtPokemon.push(pokemon);

        // Trigger sorting update of PokemonList UI
        PartyController.getSortedList()();
    }

    public gainExp(exp = 0, level = 1, trainer = false) {
        App.game.oakItems.use(OakItems.OakItem.Exp_Share);
        const trainerBonus = trainer ? 1.5 : 1;
        const oakItemBonus = App.game.oakItems.calculateBonus(OakItems.OakItem.Exp_Share);
        let expTotal = Math.floor(exp * level * trainerBonus * oakItemBonus * (1 + AchievementHandler.achievementBonus()) / 9);

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.xExp)()) {
            expTotal *= 1.5;
        }

        const maxLevel = (App.game.badgeCase.badgeCount() + 2) * 10;
        for (const pokemon of this.caughtPokemon) {
            if (pokemon.level < maxLevel) {
                pokemon.gainExp(expTotal);
            }
        }
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public calculatePokemonAttack(type1: PokemonType = PokemonType.None, type2: PokemonType = PokemonType.None): number {
        let attack = 0;
        for (const pokemon of this.caughtPokemon) {
            let multiplier = 1;
            const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
            if (nativeRegion != player.region && nativeRegion != Infinity) {
                // Pokemon only retain 20% of their total damage in other regions.
                multiplier = 0.2;
            }
            if (!pokemon.breeding) {
                if (Battle.enemyPokemon() == null || type1 == PokemonType.None) {
                    attack += pokemon.attack * multiplier;
                } else {
                    const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                    attack += pokemon.attack * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, Battle.enemyPokemon().type1, Battle.enemyPokemon().type2) * multiplier;
                }
            }
        }

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.xAttack)()) {
            attack *= 1.5;
        }

        return Math.round(attack);
    }

    public pokemonAttackObservable(type1: PokemonType = PokemonType.None, type2: PokemonType = PokemonType.None): KnockoutComputed<number> {
        return ko.pureComputed(() => {
            return App.game.party.calculatePokemonAttack(type1, type2);
        }).extend({rateLimit: 1000});
    }

    public getPokemon(id: number) {
        for (let i = 0; i < this.caughtPokemon.length; i++) {
            if (this.caughtPokemon[i].id === id) {
                return this.caughtPokemon[i];
            }
        }
    }

    alreadyCaughtPokemonByName(name: string, shiny = false) {
        return this.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(name).id, shiny);
    }

    alreadyCaughtPokemon(id: number, shiny = false) {
        const pokemon = this.caughtPokemon.find(p => p.id == id);
        if (pokemon) {
            return (!shiny || this.shinyPokemon.includes(id));
        }
        return false;
    }

    calculateClickAttack(): number {
        // Base power
        // Shiny pokemon help with a 50% boost
        let clickAttack = Math.pow(this.caughtPokemon.length + (this.shinyPokemon.length / 2) + 1, 1.4);

        clickAttack *= App.game.oakItems.calculateBonus(OakItems.OakItem.Poison_Barb);

        // Apply battle item bonus
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.xClick)()) {
            clickAttack *= 1.5;
        }

        return Math.floor(clickAttack);
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const caughtPokemonSave = json['caughtPokemon'];
        for (let i = 0; i < caughtPokemonSave.length; i++) {
            const partyPokemon = PokemonFactory.generatePartyPokemon(caughtPokemonSave[i].id);
            partyPokemon.fromJSON(caughtPokemonSave[i]);
            this._caughtPokemon.push(partyPokemon);
        }

        this.shinyPokemon = new ObservableArrayProxy<number>(json['shinyPokemon'] ?? this.defaults.shinyPokemon);
    }

    initialize(): void {
    }

    toJSON(): Record<string, any> {
        return {
            caughtPokemon: this._caughtPokemon().map(x => x.toJSON()),
            shinyPokemon: this.shinyPokemon.map(x => x),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    get caughtPokemon() {
        return this._caughtPokemon();
    }

    set caughtPokemon(pokemon: PartyPokemon[]) {
        this._caughtPokemon(pokemon);
    }

}
