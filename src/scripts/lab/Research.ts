interface ResearchOption {
    unlockReq: () => boolean,
    workerFilter: (pokemon: PartyPokemon) => boolean,
}


class Research implements Saveable {

    saveKey: string;
    defaults = {
        researched: false,
    };

    public id: Researches.Research;
    public name: string;

    private _unlockReq?: () => boolean;
    private _workerFilter?: (pokemon: PartyPokemon) => boolean;

    private _researched: KnockoutObservable<boolean>;

    constructor(id: Researches.Research, name: string, option?: ResearchOption) {
        this.id = id;
        this.name = name;
        this._unlockReq = option?.unlockReq;
        this._workerFilter = option?.workerFilter;

        this._researched = ko.observable(false);
    }

    /**
     * Determines whether this research is unlocked yet
     */
    canResearch() {
        if (this._unlockReq) {
            return this._unlockReq();
        }
        return true;
    }

    availableWorkerList() {
        // TODO: HLXII - Filter available pokemon by workerFilter
    }

    toJSON(): Record<string, any> {
        const json = {};
        json['researched'] = this.researched;
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        this.researched = json['researched'] ?? this.defaults.researched;
    }


    get researched() {
        return this._researched();
    }

    set researched(bool: boolean) {
        this._researched(bool);
    }

}
