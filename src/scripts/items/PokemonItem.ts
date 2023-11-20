class PokemonItem extends CaughtIndicatingItem {

    type: PokemonNameType;
    private _translatedOrDisplayName: KnockoutObservable<string>;

    constructor(
        pokemon: PokemonNameType,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.questPoint,
        public ignoreEV = false,
        displayName: string = undefined,
        options?: ShopOptions,
        name: string = pokemon) {
        super(name, basePrice, currency, options, undefined, `Add ${pokemon} to your party.`, 'pokemonItem');
        this.type = pokemon;
        this._translatedOrDisplayName = ko.pureComputed(() => displayName ?? PokemonHelper.displayName(pokemon)());
    }

    gain(amt: number) {
        let shiny = false;
        let numShiny = 0;
        const pokemonName = this.type;
        const pokemonID = PokemonHelper.getPokemonByName(pokemonName).id;
        for (let i = 0; i < amt; i++) {
            const shinyBool = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
            if (shinyBool) {
                numShiny++;
            }
            shiny = shiny || shinyBool;

            // Statistics
            if (i < amt - 1) { // -1 because gainPokemonById will add 1 to statistics
                const gender = PokemonFactory.generateGenderById(pokemonID);
                const shadow = GameConstants.ShadowStatus.None;
                PokemonHelper.incrementPokemonStatistics(pokemonID, GameConstants.PokemonStatisticsType.Captured, shinyBool, gender, shadow);
            }
        }

        if (shiny || !App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id)) {
            Notifier.notify({
                message: `${(shiny) ? `✨ You obtained a shiny ${pokemonName}! ✨` : `You obtained ${GameHelper.anOrA(pokemonName)} ${pokemonName}!`}`,
                pokemonImage: PokemonHelper.getImage(pokemonID, shiny),
                type: (shiny ? NotificationConstants.NotificationOption.warning : NotificationConstants.NotificationOption.success),
                setting: NotificationConstants.NotificationSetting.General.new_catch,
                sound: ((!App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id) || (shiny && (!App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true))) ? NotificationConstants.NotificationSound.General.new_catch : null)),
            });
        }
        if (shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true)
                    ? createLogContent.purchasedShinyDupe({ pokemon: pokemonName })
                    : createLogContent.purchasedShiny({ pokemon: pokemonName })
            );
        }

        App.game.party.gainPokemonById(pokemonID, shiny, true);

        const partyPokemon = App.game.party.getPokemon(pokemonID);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, false, GameConstants.ShadowStatus.None, GameConstants.SHOPMON_EP_YIELD * (amt - numShiny), this.ignoreEV);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, true, GameConstants.ShadowStatus.None, GameConstants.SHOPMON_EP_YIELD * numShiny, this.ignoreEV);
    }

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.type);
    }

    getPokerusStatus(): GameConstants.Pokerus {
        return PartyController.getPokerusStatusByName(this.type);
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name.replace(/[^\s\w.()-]/g, '')}.png`;
    }

    get displayName(): string {
        return this._translatedOrDisplayName();
    }
}

ItemList['Pinkan Arbok']  = new PokemonItem('Pinkan Arbok', undefined);
ItemList['Pinkan Oddish']  = new PokemonItem('Pinkan Oddish', undefined);
ItemList['Pinkan Poliwhirl']  = new PokemonItem('Pinkan Poliwhirl', undefined);
ItemList['Pinkan Geodude']  = new PokemonItem('Pinkan Geodude', undefined);
ItemList['Pinkan Dodrio']  = new PokemonItem('Pinkan Dodrio', 50000);
ItemList['Charity Chansey']   = new PokemonItem('Charity Chansey', 5000);
ItemList['Exeggcute (Single)'] = new PokemonItem('Exeggcute (Single)', undefined);
ItemList.Lickitung            = new PokemonItem('Lickitung', 1000);
ItemList['Pinkan Weezing']  = new PokemonItem('Pinkan Weezing', undefined);
ItemList['Pinkan Scyther']  = new PokemonItem('Pinkan Scyther', undefined);
ItemList['Mr. Mime']             = new PokemonItem('Mr. Mime', 1000);
ItemList['Pinkan Electabuzz']  = new PokemonItem('Pinkan Electabuzz', undefined);
ItemList.Jynx                 = new PokemonItem('Jynx', 2000);
ItemList.Magikarp             = new PokemonItem('Magikarp', 50000, Currency.money, true);
ItemList['Magikarp Brown Stripes'] = new PokemonItem('Magikarp Brown Stripes', 100);
ItemList['Magikarp Blue Raindrops'] = new PokemonItem('Magikarp Blue Raindrops', 10000, Currency.diamond);
ItemList['Magikarp Saucy Violet'] = new PokemonItem('Magikarp Saucy Violet', 7500000000, Currency.money);
ItemList['Probably Feebas']   = new PokemonItem('Magikarp (Feebas)', 5999, Currency.battlePoint, false, 'Probably Feebas');
ItemList.Eevee                = new PokemonItem('Eevee', 4000);
ItemList.Porygon              = new PokemonItem('Porygon', 2000);
ItemList.Togepi               = new PokemonItem('Togepi', 15000);
ItemList['Probably Chimecho']  = new PokemonItem('Hoppip (Chimecho)', 1187, Currency.diamond, false, 'Probably Chimecho');
ItemList.Beldum               = new PokemonItem('Beldum', 22500);
ItemList['Grotle (Acorn)']  = new PokemonItem('Grotle (Acorn)', undefined);
ItemList.Combee               = new PokemonItem('Combee', 6750);
ItemList['Burmy (Plant)']     = new PokemonItem('Burmy (Plant)', 6750);
ItemList.Cherubi              = new PokemonItem('Cherubi', 6750);
ItemList.Spiritomb            = new PokemonItem('Spiritomb', 6750);
ItemList.Zorua                = new PokemonItem('Zorua', 50625);
ItemList['Meloetta (Pirouette)'] = new PokemonItem('Meloetta (Pirouette)', 200000);
ItemList['Furfrou (Debutante)']  = new PokemonItem('Furfrou (Debutante)', 5000000000, Currency.money);
ItemList['Furfrou (Diamond)']    = new PokemonItem('Furfrou (Diamond)', 15000, Currency.diamond);
ItemList['Furfrou (Matron)']     = new PokemonItem('Furfrou (Matron)', 1500000, Currency.farmPoint);
ItemList['Furfrou (Dandy)']      = new PokemonItem('Furfrou (Dandy)', 250000);
ItemList['Furfrou (Kabuki)']     = new PokemonItem('Furfrou (Kabuki)', 75000, Currency.battlePoint);
ItemList['Furfrou (Pharaoh)']    = new PokemonItem('Furfrou (Pharaoh)', 300000000, Currency.dungeonToken);
ItemList['Furfrou (Star)']    = new PokemonItem('Furfrou (Star)', 10000);
ItemList['Furfrou (La Reine)']    = new PokemonItem('Furfrou (La Reine)', undefined);
ItemList['Furfrou (Heart)']    = new PokemonItem('Furfrou (Heart)', 15000, Currency.contestToken);
ItemList['Type: Null']           = new PokemonItem('Type: Null', 114000);
ItemList.Poipole              = new PokemonItem('Poipole', 90000);
// Silvally Forms
ItemList['Silvally (Fighting) 1'] = new PokemonItem('Silvally (Fighting)', undefined, undefined, false, 'Silvally (Fighting)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fighting)', true)])}, 'Silvally (Fighting) 1');
ItemList['Silvally (Fighting) 2'] = new PokemonItem('Silvally (Fighting)', undefined, undefined, false, 'Silvally (Fighting)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fighting)') }, 'Silvally (Fighting) 2');
ItemList['Silvally (Rock) 1'] = new PokemonItem('Silvally (Rock)', undefined, undefined, false, 'Silvally (Rock)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Rock)', true)])}, 'Silvally (Rock) 1');
ItemList['Silvally (Rock) 2'] = new PokemonItem('Silvally (Rock)', undefined, undefined, false, 'Silvally (Rock)',
    { visible: new ObtainedPokemonRequirement('Silvally (Rock)') }, 'Silvally (Rock) 2');
ItemList['Silvally (Dark) 1'] = new PokemonItem('Silvally (Dark)', undefined, undefined, false, 'Silvally (Dark)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Dark)', true)])}, 'Silvally (Dark) 1');
ItemList['Silvally (Dark) 2'] = new PokemonItem('Silvally (Dark)', undefined, undefined, false, 'Silvally (Dark)',
    { visible: new ObtainedPokemonRequirement('Silvally (Dark)') }, 'Silvally (Dark) 2');
ItemList['Silvally (Fairy) 1'] = new PokemonItem('Silvally (Fairy)', undefined, undefined, false, 'Silvally (Fairy)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 3, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fairy)', true)])}, 'Silvally (Fairy) 1');
ItemList['Silvally (Fairy) 2'] = new PokemonItem('Silvally (Fairy)', undefined, undefined, false, 'Silvally (Fairy)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fairy)') }, 'Silvally (Fairy) 2');
ItemList['Silvally (Water) 1'] = new PokemonItem('Silvally (Water)', undefined, undefined, false, 'Silvally (Water)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Water)', true)])}, 'Silvally (Water) 1');
ItemList['Silvally (Water) 2'] = new PokemonItem('Silvally (Water)', undefined, undefined, false, 'Silvally (Water)',
    { visible: new ObtainedPokemonRequirement('Silvally (Water)') }, 'Silvally (Water) 2');
ItemList['Silvally (Grass) 1'] = new PokemonItem('Silvally (Grass)', undefined, undefined, false, 'Silvally (Grass)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Grass)', true)])}, 'Silvally (Grass) 1');
ItemList['Silvally (Grass) 2'] = new PokemonItem('Silvally (Grass)', undefined, undefined, false, 'Silvally (Grass)',
    { visible: new ObtainedPokemonRequirement('Silvally (Grass)') }, 'Silvally (Grass) 2');
ItemList['Silvally (Fire) 1'] = new PokemonItem('Silvally (Fire)', undefined, undefined, false, 'Silvally (Fire)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Fire)', true)])}, 'Silvally (Fire) 1');
ItemList['Silvally (Fire) 2'] = new PokemonItem('Silvally (Fire)', undefined, undefined, false, 'Silvally (Fire)',
    { visible: new ObtainedPokemonRequirement('Silvally (Fire)') }, 'Silvally (Fire) 2');
ItemList['Silvally (Electric) 1'] = new PokemonItem('Silvally (Electric)', undefined, undefined, false, 'Silvally (Electric)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Electric)', true)])}, 'Silvally (Electric) 1');
ItemList['Silvally (Electric) 2'] = new PokemonItem('Silvally (Electric)', undefined, undefined, false, 'Silvally (Electric)',
    { visible: new ObtainedPokemonRequirement('Silvally (Electric)') }, 'Silvally (Electric) 2');
ItemList['Silvally (Ice) 1'] = new PokemonItem('Silvally (Ice)', undefined, undefined, false, 'Silvally (Ice)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ice)', true)])}, 'Silvally (Ice) 1');
ItemList['Silvally (Ice) 2'] = new PokemonItem('Silvally (Ice)', undefined, undefined, false, 'Silvally (Ice)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ice)') }, 'Silvally (Ice) 2');
ItemList['Silvally (Ground) 1'] = new PokemonItem('Silvally (Ground)', undefined, undefined, false, 'Silvally (Ground)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 17, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ground)', true)])}, 'Silvally (Ground) 1');
ItemList['Silvally (Ground) 2'] = new PokemonItem('Silvally (Ground)', undefined, undefined, false, 'Silvally (Ground)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ground)') }, 'Silvally (Ground) 2');
ItemList['Silvally (Bug) 1'] = new PokemonItem('Silvally (Bug)', undefined, undefined, false, 'Silvally (Bug)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Bug)', true)])}, 'Silvally (Bug) 1');
ItemList['Silvally (Bug) 2'] = new PokemonItem('Silvally (Bug)', undefined, undefined, false, 'Silvally (Bug)',
    { visible: new ObtainedPokemonRequirement('Silvally (Bug)') }, 'Silvally (Bug) 2');
ItemList['Silvally (Flying) 1'] = new PokemonItem('Silvally (Flying)', undefined, undefined, false, 'Silvally (Flying)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Flying)', true)])}, 'Silvally (Flying) 1');
ItemList['Silvally (Flying) 2'] = new PokemonItem('Silvally (Flying)', undefined, undefined, false, 'Silvally (Flying)',
    { visible: new ObtainedPokemonRequirement('Silvally (Flying)') }, 'Silvally (Flying) 2');
ItemList['Silvally (Poison) 1'] = new PokemonItem('Silvally (Poison)', undefined, undefined, false, 'Silvally (Poison)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Poison)', true)])}, 'Silvally (Poison) 1');
ItemList['Silvally (Poison) 2'] = new PokemonItem('Silvally (Poison)', undefined, undefined, false, 'Silvally (Poison)',
    { visible: new ObtainedPokemonRequirement('Silvally (Poison)') }, 'Silvally (Poison) 2');
ItemList['Silvally (Ghost) 1'] = new PokemonItem('Silvally (Ghost)', undefined, undefined, false, 'Silvally (Ghost)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Ghost)', true)])}, 'Silvally (Ghost) 1');
ItemList['Silvally (Ghost) 2'] = new PokemonItem('Silvally (Ghost)', undefined, undefined, false, 'Silvally (Ghost)',
    { visible: new ObtainedPokemonRequirement('Silvally (Ghost)') }, 'Silvally (Ghost) 2');
ItemList['Silvally (Psychic) 1'] = new PokemonItem('Silvally (Psychic)', undefined, undefined, false, 'Silvally (Psychic)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Psychic)', true)])}, 'Silvally (Psychic) 1');
ItemList['Silvally (Psychic) 2'] = new PokemonItem('Silvally (Psychic)', undefined, undefined, false, 'Silvally (Psychic)',
    { visible: new ObtainedPokemonRequirement('Silvally (Psychic)') }, 'Silvally (Psychic) 2');
ItemList['Silvally (Steel) 1'] = new PokemonItem('Silvally (Steel)', undefined, undefined, false, 'Silvally (Steel)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Steel)', true)])}, 'Silvally (Steel) 1');
ItemList['Silvally (Steel) 2'] = new PokemonItem('Silvally (Steel)', undefined, undefined, false, 'Silvally (Steel)',
    { visible: new ObtainedPokemonRequirement('Silvally (Steel)') }, 'Silvally (Steel) 2');
ItemList['Silvally (Dragon) 1'] = new PokemonItem('Silvally (Dragon)', undefined, undefined, false, 'Silvally (Dragon)',
    { visible: new MultiRequirement([new QuestLineStepCompletedRequirement('Typing some Memories', 33, GameConstants.AchievementOption.more), new ObtainedPokemonRequirement('Silvally (Dragon)', true)])}, 'Silvally (Dragon) 1');
ItemList['Silvally (Dragon) 2'] = new PokemonItem('Silvally (Dragon)', undefined, undefined, false, 'Silvally (Dragon)',
    { visible: new ObtainedPokemonRequirement('Silvally (Dragon)') }, 'Silvally (Dragon) 2');

ItemList.Dracozolt              = new PokemonItem('Dracozolt', 100000);
ItemList.Arctozolt              = new PokemonItem('Arctozolt', 100000);
ItemList.Dracovish              = new PokemonItem('Dracovish', 100000);
ItemList.Arctovish              = new PokemonItem('Arctovish', 100000);
ItemList['Zarude (Dada)']       = new PokemonItem('Zarude (Dada)', 500000);
// Dream orbs
ItemList.Staryu  = new PokemonItem('Staryu', undefined);
ItemList.Igglybuff  = new PokemonItem('Igglybuff', undefined);
ItemList.Shuckle  = new PokemonItem('Shuckle', undefined);
ItemList.Smoochum  = new PokemonItem('Smoochum', undefined);
ItemList.Ralts  = new PokemonItem('Ralts', undefined);
ItemList.Swablu  = new PokemonItem('Swablu', undefined);
ItemList.Drifloon  = new PokemonItem('Drifloon', undefined);
ItemList.Bronzor  = new PokemonItem('Bronzor', undefined);
ItemList.Riolu  = new PokemonItem('Riolu', undefined);
ItemList.Rotom  = new PokemonItem('Rotom', undefined);
ItemList.Munna  = new PokemonItem('Munna', undefined);
ItemList.Sigilyph  = new PokemonItem('Sigilyph', undefined);
ItemList['Tornadus (Therian)']  = new PokemonItem('Tornadus (Therian)', undefined);
ItemList['Thundurus (Therian)']  = new PokemonItem('Thundurus (Therian)', undefined);
ItemList['Landorus (Therian)']  = new PokemonItem('Landorus (Therian)', undefined);
// Contest
ItemList['Dugtrio (Punk)'] = new PokemonItem('Dugtrio (Punk)', 1500, Currency.contestToken);
ItemList['Gengar (Punk)'] = new PokemonItem('Gengar (Punk)', 3000, Currency.contestToken);
ItemList['Goldeen (Diva)'] = new PokemonItem('Goldeen (Diva)', 500, Currency.contestToken);
ItemList['Onix (Rocker)'] = new PokemonItem('Onix (Rocker)', 1000, Currency.contestToken);
ItemList['Tangela (Pom-pom)'] = new PokemonItem('Tangela (Pom-pom)', 400, Currency.contestToken);
ItemList['Weepinbell (Fancy)'] = new PokemonItem('Weepinbell (Fancy)', 700, Currency.contestToken);
ItemList['Sudowoodo (Golden)'] = new PokemonItem('Sudowoodo (Golden)', 2000, Currency.contestToken);
ItemList['Pikachu (Rock Star)'] = new PokemonItem('Pikachu (Rock Star)', 1000, Currency.contestToken);
ItemList['Pikachu (Belle)'] = new PokemonItem('Pikachu (Belle)', 1000, Currency.contestToken);
ItemList['Pikachu (Pop Star)'] = new PokemonItem('Pikachu (Pop Star)', 1000, Currency.contestToken);
ItemList['Pikachu (Ph. D.)'] = new PokemonItem('Pikachu (Ph. D.)', 1000, Currency.contestToken);
ItemList['Pikachu (Libre)'] = new PokemonItem('Pikachu (Libre)', 1000, Currency.contestToken);
