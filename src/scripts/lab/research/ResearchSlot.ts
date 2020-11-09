class ResearchSlot implements Saveable {

    saveKey: string;

    defaults: {
        workers: [],
    }

    public research?: Research
    private _maxWorkers: KnockoutComputed<number>;
    private _workers: KnockoutObservableArray<PokemonNameType>;

    public notification: boolean;

    constructor(research: Research, workers: PokemonNameType[]) {
        this.research = research;
        this._workers = ko.observableArray(workers);

        this.notification = false;

        this._maxWorkers = ko.pureComputed(function() {
            // TODO: HLXII - Update to depend on research. Will also need to determine which slot this is
            return 1;
        });
    }

    update(delta: number): boolean {
        this.research.progress = Math.min(this.research.points, this.research.progress + delta * this.workerRate);

        // Complete research
        if (this.research.progress >= this.research.points && !this.notification) {
            this.notification = true;
            return true;
        }
        return false;
    }

    get workerRate(): number {
        // TODO: HLXII - Find research rate based on workers
        return 10;
    }

    addWorker(pokemon: PartyPokemon): boolean {
        const queueSize = this._workers().length;
        if (queueSize < this._maxWorkers()) {
            pokemon.location = PartyLocation.Research;
            this._workers.push(pokemon.name);
            return true;
        }
        return false;
    }

    removeWorker(index: number): boolean {
        const queueSize = this._workers().length;
        if (queueSize > index) {
            const pokemonName = this._workers.splice(index, 1)[0];
            App.game.party._caughtPokemon().find(p => p.name == pokemonName).location = PartyLocation.Battle;
            return true;
        }
        return false;
    }

    clear() {
        // Emptying workers
        for (let i = this._workers().length - 1;i >= 0;i--) {
            this.removeWorker(i);
        }

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

    get maxWorkers(): number {
        return this._maxWorkers();
    }

    set maxWorkers(value: number) {
        this._maxWorkers(value);
    }

}
