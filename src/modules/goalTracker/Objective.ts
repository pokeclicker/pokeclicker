import { MINUTE } from '../GameConstants';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { ObjectiveConfig, objectiveOptions } from './ObjectiveOptions';
import { ObjectiveOption, ObjectiveType } from './objectives/ObjectiveTypes';
import { TrackingMode } from './TrackingMode';

export default class Objective {
    private _type = ko.observable<ObjectiveType | undefined>(undefined);
    private _config = ko.observable<ObjectiveConfig | undefined>(undefined);
    private _targetAmount = ko.observable(0).extend({ numeric: 0 });
    private _trackingMode = ko.observable<TrackingMode>(TrackingMode.Total);
    private _accumulatedProgress = ko.observable<number>(0).extend({ numeric: 0 });
    private _resetCount = ko.observable<number>(0);
    private _lastSourceKey: string = '';
    private _lastGoalKey: string = '';
    private _lastRawValue: number = 0;
    private _notifiedComplete: boolean = false;

    public uuid: string;
    private _trackerSub: KnockoutSubscription;

    private get activeOption(): ObjectiveOption<any> | undefined {
        return objectiveOptions[this.type] as ObjectiveOption<any> | undefined;
    }

    private getRawProgress = ko.pureComputed(() => {
        if (!this.activeOption) return 0;
        return this.activeOption.getProgress(this.config) ?? 0;
    });

    public getProgress = ko.pureComputed(() => {
        if (!this.isConfigured()) return 0;
        return this.trackingMode === TrackingMode.Gain ? this.accumulatedProgress : this.getRawProgress();
    });

    public getOptions = ko.pureComputed(() => {
        if (!this.activeOption) return [];
        return this.activeOption.options.filter(opt => {
            return opt.visible ? opt.visible(this.config) : true;
        });
    });

    public isConfigured = ko.pureComputed(() => {
        if (!this.config) {
            return false;
        }
        return Object.values(this.config).every(obs => obs() !== undefined);
    });

    private isComplete = ko.pureComputed(() => {
        return this.hasGoal && this.isConfigured()
            && this.targetAmount > 0 && this.getProgress() >= this.targetAmount;
    });

    // Everything the objective needs to watch: what it tracks, what counts as done, and where it stands.
    // Only Gain reads getRawProgress here, so the other modes leave it asleep
    private _tracker = ko.pureComputed(() => ({
        sourceKey: this.sourceKey(),
        goalKey: this.goalKey(),
        configured: this.isConfigured(),
        raw: this.trackingMode === TrackingMode.Gain ? this.getRawProgress() : 0,
        complete: this.isComplete(),
    }));

    constructor() {
        this.uuid = GameHelper.randomUUID();

        this._trackerSub = this._tracker.subscribe(({ sourceKey, goalKey, configured, raw, complete }) => {
            const sourceChanged = sourceKey !== this._lastSourceKey;
            const goalChanged = goalKey !== this._lastGoalKey;
            this._lastSourceKey = sourceKey;
            this._lastGoalKey = goalKey;

            if (sourceChanged || goalChanged) {
                if (sourceChanged) {
                    this.accumulatedProgress = 0;
                }
                this._lastRawValue = raw;
                this._notifiedComplete = complete;
                return;
            }

            if (configured && this.trackingMode === TrackingMode.Gain) {
                const diff = raw - this._lastRawValue;
                if (diff > 0) {
                    this.accumulatedProgress = this.accumulatedProgress + diff;
                }
            }

            this._lastRawValue = raw;

            if (!complete) {
                this._notifiedComplete = false;
                return;
            }

            if (this._notifiedComplete) {
                return;
            }

            this._notifiedComplete = true;
            Notifier.notify({
                title: 'Goal Tracker',
                message: `Your "${this.displayName}" objective is complete!`,
                type: NotificationConstants.NotificationOption.primary,
                sound: NotificationConstants.NotificationSound.General.goal_objective_complete,
                setting: NotificationConstants.NotificationSetting.General.goal_objective_complete,
                timeout: 5 * MINUTE,
            });
        });
    }

    private sourceKey(): string {
        const config = this.config ? Object.values(this.config).map(obs => obs()) : [];
        return [this.type, this._resetCount(), ...config].join('|');
    }

    private goalKey(): string {
        return [this.targetAmount, this.trackingMode].join('|');
    }

    public dispose(): void {
        this._trackerSub?.dispose();
    }

    public resetAccumulatedProgress() {
        this._resetCount(this._resetCount() + 1);
    }

    public progressText(): string {
        const progress = this.getProgress().toLocaleString('en-US');
        if (!this.hasGoal) return progress;
        return `${progress} / ${this.targetAmount.toLocaleString('en-US')}`;
    }

    public progressPercent(): number {
        if (!this.hasGoal) return 0;
        if (this.targetAmount <= 0) return 0;
        return Math.floor((this.getProgress() / this.targetAmount) * 100) / 100;
    }

    get displayName(): string {
        return this.activeOption?.getDisplayName?.(this.config) ?? 'Unconfigured Objective';
    }

    get type(): ObjectiveType {
        return this._type();
    }

    set type(value: ObjectiveType) {
        this._type(value);
        this.config = objectiveOptions[value]?.createConfig();
        this.targetAmount = 0;
        this.resetAccumulatedProgress();
    }

    get config(): ObjectiveConfig | undefined {
        return this._config();
    }

    set config(value: ObjectiveConfig | undefined) {
        this._config(value);
    }

    get targetAmount(): number {
        return this._targetAmount();
    }

    set targetAmount(value: number) {
        this._targetAmount(value);
    }

    get trackingMode(): TrackingMode {
        return this._trackingMode();
    }

    set trackingMode(value: TrackingMode) {
        this._trackingMode(value);
    }

    get hasGoal(): boolean {
        return this.trackingMode !== TrackingMode.Display;
    }

    get accumulatedProgress(): number {
        return this._accumulatedProgress();
    }

    set accumulatedProgress(value: number) {
        this._accumulatedProgress(value);
    }

    toJSON(): Record<string, any> {
        const config = {};
        if (this.config) {
            for (const key of Object.keys(this.config)) {
                config[key] = this.config[key]();
            }
        }
        return {
            type: this.type,
            config: config,
            targetAmount: this.targetAmount,
            trackingMode: this.trackingMode,
            accumulatedProgress: this.accumulatedProgress,
            lastRawValue: this._lastRawValue,
            notifiedComplete: this._notifiedComplete,
        };
    }


    fromJSON(json: Record<string, any>): void {
        if (!json) return;

        this._targetAmount(json.targetAmount ?? 0);

        const config = objectiveOptions[json.type]?.createConfig();
        if (config && json.config) {
            for (const key of Object.keys(config)) {
                if (json.config[key] !== undefined) {
                    config[key](json.config[key]);
                }
            }
        }

        this._lastRawValue = json.lastRawValue ?? 0;
        this._notifiedComplete = json.notifiedComplete ?? false;
        this._trackingMode(json.trackingMode ?? TrackingMode.Total);
        this._accumulatedProgress(json.accumulatedProgress ?? 0);
        this._config(config);
        this._type(json.type);
        this._lastSourceKey = this.sourceKey();
        this._lastGoalKey = this.goalKey();
    }
}
