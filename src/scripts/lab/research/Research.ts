interface ResearchOption {
    requirements?: (Requirement | MultiRequirement | OneFromManyRequirement)[],
    workerFilter?: WorkerFilter;
}
class Research implements Saveable {

    saveKey: string;
    defaults = {
        progress: 0,
        inProgress: false,
        completed: false,
    };

    public id: Researches.Research;
    public type: ResearchType;
    public name: string;
    private _description: string;
    public points: number;

    private _requirements?: (Requirement | MultiRequirement | OneFromManyRequirement)[];
    private _workerFilter?: WorkerFilter;

    private _progress: KnockoutObservable<number>
    private _inProgress: KnockoutObservable<boolean>
    private _completed: KnockoutObservable<boolean>;

    state: KnockoutComputed<ResearchState>;

    constructor(id: Researches.Research, type: ResearchType, name: string, description: string, points: number, option?: ResearchOption) {
        this.id = id;
        this.type = type;
        this.name = name;
        this._description = description;
        this.points = points;
        this._requirements = option?.requirements;
        this._workerFilter = option?.workerFilter;

        this._progress = ko.observable(this.defaults.progress);
        this._inProgress = ko.observable(this.defaults.inProgress);
        this._completed = ko.observable(this.defaults.completed);

        this.state = ko.pureComputed(function () {
            if (!this.canResearch()) {
                return ResearchState.Locked;
            } else if (this._progress() >= this.points) {
                return ResearchState.Completed;
            } else if (!this._inProgress()) {
                return ResearchState.Ready;
            } else if (this._inProgress()) {
                return ResearchState.Researching;
            }
            return ResearchState.Locked;
        }, this);
    }

    /**
     * Determines whether this research is unlocked yet
     */
    canResearch() {
        if (this._requirements) {
            return this._requirements.every(requirement => requirement.isCompleted());
        }
        return true;
    }

    availableWorkerList() {
        // TODO: HLXII - Filter available pokemon by workerFilter
    }

    toJSON(): Record<string, any> {
        const json = {
            completed: this.completed,
            inProgress: this.inProgress,
            progress: this.progress,
        };
        return json;
    }
    fromJSON(json: Record<string, any>): void {
        this.completed = json['completed'] ?? this.defaults.completed;
        this.inProgress = json['inProgress'] ?? this.defaults.inProgress;
        this.progress = json['progress'] ?? this.defaults.progress;
    }


    get completed() {
        return this._completed();
    }

    set completed(bool: boolean) {
        this._completed(bool);
    }

    get inProgress() {
        return this._inProgress();
    }

    set inProgress(bool: boolean) {
        this._inProgress(bool);
    }

    get progress() {
        return this._progress();
    }

    set progress(value: number) {
        this._progress(value);
    }

    get workerFilter() {
        return this._workerFilter;
    }

    get description(): string {
        if (this._description) {
            return this._description;
        }
        return '';
    }

    get hint(): string {
        if (!this._requirements) {
            return '';
        }
        return this._requirements.map(req => req.hint()).join(' and ');
    }

}
