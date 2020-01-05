///<reference path="CaughtStatus.ts"/>
class Party implements Feature {
    name = 'Pokemon Party';
    saveKey = 'party';

    caughtPokemon: ObservableArrayProxy<PartyPokemon>;
    shinyPokemon: ObservableArrayProxy<number>;


    defaults = {
        caughtPokemon: [],
        shinyPokemon: [],
    };


    constructor() {
        this.caughtPokemon = new ObservableArrayProxy(this.defaults.caughtPokemon);
        this.shinyPokemon = new ObservableArrayProxy(this.defaults.shinyPokemon);
    }

    gainPokemonById(id: number, shiny = false) {
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id), shiny);
    }

    gainPokemon(pokemon: PartyPokemon, shiny = false) {
        player.caughtAmount[pokemon.id](player.caughtAmount[pokemon.id]() + 1);
        GameHelper.incrementObservable(player.statistics.pokemonCaptured);

        if (shiny) {
            player.shinyCatches++;
        }
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
        this.caughtPokemon.push(pokemon);

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
            if (pokemon.levelObservable() < maxLevel) {
                pokemon.exp += expTotal;
            }
            pokemon.checkForLevelEvolution();
        }
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public calculatePokemonAttack(type1: GameConstants.PokemonType = GameConstants.PokemonType.None, type2: GameConstants.PokemonType = GameConstants.PokemonType.None): number {
        let attack = 0;
        for (const pokemon of this.caughtPokemon) {
            let multiplier = 1;
            if (player.region !== GameHelper.getRegion(pokemon.id)) {
                // Pokemon only retain 20% of their total damage in other regions.
                multiplier = 0.2
            }
            if (!pokemon.breeding) {
                if (Battle.enemyPokemon() == null || type1 == GameConstants.PokemonType.None) {
                    attack += pokemon.attack() * multiplier;
                } else {
                    const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                    attack += pokemon.attack() * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, Battle.enemyPokemon().type1, Battle.enemyPokemon().type2) * multiplier;
                }
            }
        }

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.xAttack)()) {
            attack *= 1.5;
        }

        return Math.round(attack);
    }

    public getPokemon(id: number) {
        for (let i = 0; i < this.caughtPokemon.length; i++) {
            if (this.caughtPokemon[i].id === id) {
                return this.caughtPokemon[i];
            }
        }
    }

    public hasMaxLevelPokemon(): boolean {
        for (let i = 0; i < this.caughtPokemon.length; i++) {
            if (this.caughtPokemon[i].levelObservable() === 100) {
                return true;
            }
        }
        return false;
    }

    alreadyCaughtPokemonByName(name: string, shiny = false) {
        return this.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(name).id, shiny);
    }

    alreadyCaughtPokemon(id: number, shiny = false) {
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
        if (json == null) {
            return
        }

        const caughtPokemonSave = json['caughtPokemon'];
        for (let i = 0; i < caughtPokemonSave.length; i++) {
            const partyPokemon = PokemonFactory.generatePartyPokemon(caughtPokemonSave[i].id);
            partyPokemon.fromJSON(caughtPokemonSave[i]);
            this.caughtPokemon.push(partyPokemon)
        }

        this.shinyPokemon = new ObservableArrayProxy<number>(json['shinyPokemon'] ?? this.defaults.shinyPokemon);
    }

    initialize(): void {
    }

    toJSON(): object {
        return {
            caughtPokemon: this.caughtPokemon.map(x => x.toJSON()),
            shinyPokemon: this.shinyPokemon.map(x => x),
        }
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

}
