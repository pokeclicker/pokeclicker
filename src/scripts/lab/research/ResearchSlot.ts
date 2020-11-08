class ResearchSlot implements Saveable {

    saveKey: string;

    defaults: {
        workers: [],
    }

    public research?: Research
    private _workers: KnockoutObservableArray<PokemonNameType>;

    constructor(research: Research, workers: PokemonNameType[]) {
        this.research = research;
        this._workers = ko.observableArray(workers);
    }

    update() {
        // Handle updating research progress
    }

    addWorker(pokemon: PartyPokemon) {
        // TODO: HLXII -  Handle adding worker
    }

    removeWorker(pokemon: PartyPokemon) {
        // TODO: HLXII - Handle removing worker
    }

    clear() {
        // Emptying workers
        // TODO: HLXII - Empty workers

        // Resetting research
        this.research.inProgress = false;
        this.research.progress = 0;
    }

    toJSON(): Record<string, any> {
        return {
            research: this.research?.id,
            workers: this.workers,
        };
    }
    fromJSON(json: Record<string, any>): void {
        this.research = App.game.lab.researchList.find(res => res.id === json['research']);
        this._workers(json['workers']);
    }

    get workers(): PokemonNameType[] {
        return this._workers();
    }

}
