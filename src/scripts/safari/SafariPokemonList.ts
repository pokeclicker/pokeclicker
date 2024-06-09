type OverworldSpriteType = 'base' | 'self' | PokemonNameType;

class SafariEncounter {
    public requirement: Requirement;
    constructor(
        public name: PokemonNameType,
        public weight: number,
        public environments: SafariEnvironments[] = [SafariEnvironments.Grass],
        requirement?: true | Requirement, // True is used to simplify Friend Safari Pokémon generation
        public hide = true, // Hide from the list
        public sprite : OverworldSpriteType = 'base'
    ) {
        this.requirement = requirement === true ? new ObtainedPokemonRequirement(this.name) : requirement;
    }

    public isAvailable(): boolean {
        return this.requirement?.isCompleted() ?? true;
    }
}

class SafariPokemonList {
    public static list: Record<GameConstants.Region, KnockoutObservable<Array<SafariEncounter>>> = {
        [GameConstants.Region.kanto]: ko.observableArray(),
        [GameConstants.Region.johto]: ko.observableArray(),
        [GameConstants.Region.sinnoh]: ko.observableArray(),
        [GameConstants.Region.kalos]: ko.observableArray(),
        [GameConstants.Region.alola]: ko.observableArray(),
    };

    public static generateSafariLists() {
        this.generateKantoSafariList();
        this.generateJohtoSafariList();
        this.generateSinnohSafariList();
        this.generateAlolaSafariList();

        // Always generate Kalos Safari last
        this.generateKalosSafariList();
    }

    private static generateKantoSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Nidoran(F)', 15),
            new SafariEncounter('Nidorina', 10),
            new SafariEncounter('Nidoran(M)', 25),
            new SafariEncounter('Nidorino', 10),
            new SafariEncounter('Exeggcute', 20),
            new SafariEncounter('Paras', 5),
            new SafariEncounter('Parasect', 15),
            new SafariEncounter('Rhyhorn', 10),
            new SafariEncounter('Chansey', 4),
            new SafariEncounter('Scyther', 4),
            new SafariEncounter('Pinsir', 4),
            new SafariEncounter('Kangaskhan', 15),
            new SafariEncounter('Tauros', 10),
            new SafariEncounter('Cubone', 10),
            new SafariEncounter('Marowak', 5),
            new SafariEncounter('Tangela', 4),
            // Water
            new SafariEncounter('Magikarp', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Psyduck', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Slowpoke', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Poliwag', 15, [SafariEnvironments.Water]),
            new SafariEncounter('Goldeen', 15, [SafariEnvironments.Water]),
            new SafariEncounter('Seaking', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Dratini', 10, [SafariEnvironments.Water], true, false),
            new SafariEncounter('Dragonair', 4, [SafariEnvironments.Water], true, false),
        ];

        SafariPokemonList.list[GameConstants.Region.kanto](pokemon);
    }

    public static generateJohtoSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        // Unlocks new mons after being caught
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Caterpie', 5),
            new SafariEncounter('Metapod', 2),
            new SafariEncounter('Butterfree', 1),
            new SafariEncounter('Weedle', 5),
            new SafariEncounter('Kakuna', 2),
            new SafariEncounter('Beedrill', 1),
            new SafariEncounter('Venonat', 3),
            new SafariEncounter('Ledyba', 3),
            new SafariEncounter('Spinarak', 3),
            new SafariEncounter('Paras', 3),
            new SafariEncounter('Scyther', 3),
            new SafariEncounter('Pinsir', 2),
            new SafariEncounter('Pineco', 3),
            new SafariEncounter('Shuckle', 2),
            new SafariEncounter('Wurmple', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Silcoon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Beautifly', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Cascoon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dustox', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Masquerain', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Nincada', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Kricketot', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Kricketune', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Combee', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Vespiquen', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Yanmega', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Sewaddle', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Swadloon', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Leavanny', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Venipede', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Whirlipede', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Scolipede', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dwebble', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Durant', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Scatterbug', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Spewpa', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Grubbin', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Charjabug', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Vikavolt', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Cutiefly', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Blipbug', 5, [SafariEnvironments.Grass], true),
            new SafariEncounter('Dottler', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Orbeetle', 1, [SafariEnvironments.Grass], true),
            new SafariEncounter('Sizzlipede', 2, [SafariEnvironments.Grass], true),
            new SafariEncounter('Snom', 2, [SafariEnvironments.Grass], true),

            // Water
            new SafariEncounter('Yanma', 1, [SafariEnvironments.Water]),
            new SafariEncounter('Surskit', 5, [SafariEnvironments.Water], true),
            new SafariEncounter('Dewpider', 5, [SafariEnvironments.Water], true),
            new SafariEncounter('Araquanid', 1, [SafariEnvironments.Water], true),
            new SafariEncounter('Wimpod', 1, [SafariEnvironments.Water], true),
            new SafariEncounter('Golisopod', 1, [SafariEnvironments.Water], true),
        ];

        SafariPokemonList.list[GameConstants.Region.johto](pokemon);
    }

    private static generateSinnohSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Tangela', 20),
            new SafariEncounter('Paras', 10),
            new SafariEncounter('Exeggcute', 10),
            new SafariEncounter('Kangaskhan', 10),
            new SafariEncounter('Hoothoot', 15),
            new SafariEncounter('Noctowl', 10),
            new SafariEncounter('Yanma', 25),
            new SafariEncounter('Shroomish', 10),
            new SafariEncounter('Gulpin', 10),
            new SafariEncounter('Kecleon', 10),
            new SafariEncounter('Tropius', 15),
            new SafariEncounter('Bibarel', 20),
            new SafariEncounter('Skorupi', 10),
            new SafariEncounter('Drapion', 5),
            new SafariEncounter('Croagunk', 10),
            new SafariEncounter('Toxicroak', 5),
            new SafariEncounter('Carnivine', 10),
            // Water
            new SafariEncounter('Magikarp', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Gyarados', 10, [SafariEnvironments.Water]),
            new SafariEncounter('Wooper', 20, [SafariEnvironments.Water]),
            new SafariEncounter('Quagsire', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Barboach', 10, [SafariEnvironments.Water]),
            new SafariEncounter('Whiscash', 5, [SafariEnvironments.Water]),
            new SafariEncounter('Carvanha', 10, [SafariEnvironments.Water]),
        ];

        SafariPokemonList.list[GameConstants.Region.sinnoh](pokemon);
    }

    public static generateKalosSafariList() {
        // Obtain the list of non-EVable pokemon and shuffle it
        // There may not be an evenly divisible number of pokemon so repeat list 5 times
        const friendSafariPokemon = pokemonList
            .filter((p) => PokemonLocations.isObtainableAndNotEvable(p.name)
                && PokemonHelper.calcNativeRegion(p.name) <= GameConstants.MAX_AVAILABLE_REGION)
            .map((p) => p.name);

        SeededRand.seed(+player.trainerId);
        const shuffledPokemon = new Array(GameConstants.FRIEND_SAFARI_POKEMON)
            .fill(SeededRand.shuffleArray(friendSafariPokemon)).flat();

        // Rotation is fixed, use the current date to determine where in the list to select the 5 pokemon
        const batchCount = Math.ceil(shuffledPokemon.length / GameConstants.FRIEND_SAFARI_POKEMON);
        const now = new Date();
        const startIndex = (Math.floor((now.getTime() - now.getTimezoneOffset() * 60 * 1000) / (24 * 60 * 60 * 1000)) % batchCount) * GameConstants.FRIEND_SAFARI_POKEMON;
        const endIndex = startIndex + GameConstants.FRIEND_SAFARI_POKEMON;

        const pokemon: SafariEncounter[] = shuffledPokemon.slice(startIndex, endIndex).map((p) => {
            return new SafariEncounter(p, 10, SafariPokemonList.getEnvironmentByPokemonType(p), true, false);
        });

        pokemon.push(new SafariEncounter('Shuckle', 2));
        pokemon.push(new SafariEncounter('Stunfisk', 2));
        pokemon.push(new SafariEncounter('Magmar', 2));
        pokemon.push(new SafariEncounter('Maractus', 2));
        pokemon.push(new SafariEncounter('Klefki', 2));
        pokemon.push(new SafariEncounter('Breloom', 2));
        pokemon.push(new SafariEncounter('Woobat', 2));
        pokemon.push(new SafariEncounter('Golurk', 2));
        pokemon.push(new SafariEncounter('Marowak', 2));
        // Water
        pokemon.push(new SafariEncounter('Lapras', 2, [SafariEnvironments.Water]));

        SafariPokemonList.list[GameConstants.Region.kalos](pokemon);
    }

    private static generateAlolaSafariList() {
        // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
        // Filler
        const pokemon : SafariEncounter[] = [
            // Grass
            new SafariEncounter('Pidgeotto', 2.7),
            // Water
            new SafariEncounter('Magikarp', 0.7, [SafariEnvironments.Water]),
            new SafariEncounter('Magikarp Skelly', 2, [SafariEnvironments.Water], new GymBadgeRequirement(BadgeEnums.Quick_League), false, 'self'),
            new SafariEncounter('Magikarp Calico (White, Orange)', 2, [SafariEnvironments.Water], new TemporaryBattleRequirement('Magikarp Jump Karpen'), false, 'self'),
            new SafariEncounter('Magikarp Pink Dapples', 2, [SafariEnvironments.Water], new GymBadgeRequirement(BadgeEnums.Fast_League), false, 'self'),
            new SafariEncounter('Magikarp Grey Diamonds', 2, [SafariEnvironments.Water], new TemporaryBattleRequirement('Magikarp Jump Karpress 3'), false, 'self'),
            new SafariEncounter('Magikarp Purple Bubbles', 2, [SafariEnvironments.Water], new GymBadgeRequirement(BadgeEnums.Heal_League), false, 'self'),
            new SafariEncounter('Magikarp Purple Patches', 2, [SafariEnvironments.Water], new TemporaryBattleRequirement('Magikarp Jump Karpella 3'), false, 'self'),
            new SafariEncounter('Magikarp Brown Tiger', 2, [SafariEnvironments.Water], new GymBadgeRequirement(BadgeEnums.Ultra_League), false, 'self'),
            new SafariEncounter('Magikarp Orange Forehead', 2, [SafariEnvironments.Water], new GymBadgeRequirement(BadgeEnums.E4_League), false, 'self'),
            new SafariEncounter('Magikarp Black Mask', 2, [SafariEnvironments.Water], new TemporaryBattleRequirement('Magikarp Jump Tykarp 2'), false, 'self'),
            new SafariEncounter('Magikarp Saucy Blue', 2, [SafariEnvironments.Water], new QuestLineCompletedRequirement('Dr. Splash\'s Research Project'), false, 'self'),
            // Both, meme encounter
            new SafariEncounter('Ditto (Transforming)', 0.3, [SafariEnvironments.Water, SafariEnvironments.Grass],
                new CaughtUniquePokemonByFilterRequirement((p: PartyPokemon) => Math.floor(p.id) === pokemonMap.Magikarp.id, 'Catch more Magikarp species.', 6),
                false,
                'Magikarp'
            ),
        ];

        SafariPokemonList.list[GameConstants.Region.alola](pokemon);
    }

    // Get SafariEnvironment according to the Pokemon types
    public static getEnvironmentByPokemonType(p: PokemonNameType) {
        const pokemon = PokemonHelper.getPokemonByName(p);
        const safariEnvironments = [];
        // If Pokemon is water-type, add the water environment
        if (pokemon.type1 === PokemonType.Water || pokemon.type2 === PokemonType.Water) {
            safariEnvironments.push(SafariEnvironments.Water);
        }
        const pureWater = pokemon.type1 === PokemonType.Water && pokemon.type2 === PokemonType.None;
        const waterIce = pokemon.type1 === PokemonType.Water && pokemon.type2 === PokemonType.Ice;
        const iceWater = pokemon.type1 === PokemonType.Ice && pokemon.type2 === PokemonType.Water;
        // If Pokemon is not pure water, water/ice or ice/water, add the grass environment
        if (!(pureWater || waterIce || iceWater)) {
            safariEnvironments.push(SafariEnvironments.Grass);
        }
        return safariEnvironments;
    }

    public static getDisplayList(region = player.region): EncounterInfo[] {
        const encounters = [];

        if (!SafariPokemonList.list[region]) {
            return encounters;
        }

        const list = SafariPokemonList.list[region]();
        list.forEach(e => {
            if (e.hide && !e.isAvailable()) {
                return;
            }
            const pokemon = PokemonHelper.getPokemonByName(e.name);
            const partyPokemon = App.game.party.getPokemonByName(e.name);
            const eData = {
                image: PokemonHelper.getImage(pokemon.id, undefined, undefined, GameConstants.ShadowStatus.None),
                pkrsImage: partyPokemon?.pokerus > GameConstants.Pokerus.Uninfected ? `assets/images/breeding/pokerus/${GameConstants.Pokerus[partyPokemon.pokerus]}.png` : '',
                EVs: partyPokemon?.pokerus >= GameConstants.Pokerus.Contagious ? `EVs: ${partyPokemon.evs().toLocaleString('en-US')}` : '',
                shiny:  partyPokemon?.shiny || false,
                hide: false, // We already filter out hidden Pokémon
                uncaught: !partyPokemon,
                lock: !e.isAvailable(),
                lockMessage: e.isAvailable() ? '' : e.requirement.hint(),
            };
            encounters.push(eData);
        });

        return encounters;
    }
}
