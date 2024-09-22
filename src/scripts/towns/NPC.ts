type NPCOptionalArgument = {
    requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    image?: string,
    saveKey?: string,
    mentionsPokemon?: PokemonNameType[] | (() => PokemonNameType[]);
};

class NPC {
    public talkedTo = ko.observable<boolean>(false); // Used for custom quests
    public saveKey = 0;

    constructor(
        public name: string,
        public dialog: string[],
        public options: NPCOptionalArgument = {},
        public type: NPCType = NPCType.Default
    ) {
        if (this.options.saveKey) {
            this.saveKey = GameHelper.hash(this.options.saveKey);
        }
    }

    get dialogHTML(): string {
        return this.dialog.map(line => `<p>${TextMerger.mergeText(line)}</p>`).join('\n');
    }

    public isVisible() {
        return this.options.requirement?.isCompleted() ?? true;
    }

    public talkToNPC() {
        this.setTalkedTo();

        if (this.options.mentionsPokemon) {
            this.markPokemonSeen();
        }
    }

    public setTalkedTo() {
        this.talkedTo(true);
        if (this.saveKey && !this.hasTalkedTo()) {
            GameHelper.incrementObservable(App.game.statistics.npcTalkedTo[this.saveKey]);
        }
    }

    public hasTalkedTo(): boolean {
        return this.saveKey ? App.game.statistics.npcTalkedTo[this.saveKey]() > 0 : false;
    }

    private markPokemonSeen(): void {
        if (!this.options.mentionsPokemon) {
            return;
        }
        const speciesMentioned = typeof this.options.mentionsPokemon === 'function' ? this.options.mentionsPokemon() : this.options.mentionsPokemon;
        speciesMentioned.forEach((name) => {
            const id = pokemonMap[name].id;
            if (id > 0 && !PokedexHelper.pokemonDiscovered(id)) {
                App.game.statistics.pokemonDiscovered[id](1);
            }
        });
    }
}
