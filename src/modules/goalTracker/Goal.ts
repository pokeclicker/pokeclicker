import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';
import Objective from './Objective';
import GameHelper from '../GameHelper';
import { exportCode, importCode } from './ImportExport';
import { isKnownObjectiveType } from './ObjectiveOptions';

export default class Goal {
    private _name: KnockoutObservable<string>;
    public objectives: KnockoutObservableArray<Objective> = ko.observableArray([]);

    public uuid: string;

    constructor(
        name: string = 'New Goal',
    ) {
        this._name = ko.observable(name);

        this.uuid = GameHelper.randomUUID();
    }

    dispose() {
        if (this.objectives().includes(App.game.goalTracker.selectedObjective())) {
            App.game.goalTracker.selectedObjective(undefined);
        }
        this.objectives().forEach(obj => obj.dispose());
    }

    createObjective() {
        const objective = new Objective();
        this.objectives.push(objective);
        App.game.goalTracker.selectedObjective(objective);
        $('#goalTrackerObjectiveModal').modal('show');
    }

    duplicateObjective(objective: Objective) {
        const json = objective.toJSON();
        const newObjective = new Objective();
        newObjective.fromJSON(json);
        newObjective.resetAccumulatedProgress();
        this.objectives.push(newObjective);
    }

    async deleteObjective(objective: Objective) {
        if (await Notifier.confirm({
            title: 'Delete objective',
            message: `Are you sure you want to delete "${objective.displayName}"?`,
            type: NotificationOption.danger,
            confirm: 'Delete',
        })) {
            objective.dispose();
            this.objectives.remove(objective);
            if (App.game.goalTracker.selectedObjective() === objective) {
                App.game.goalTracker.selectedObjective(undefined);
            }
        }
    }

    async exportObjective(objective: Objective) {
        await exportCode('Objective', objective.toJSON());
    }

    async importObjective() {
        const json = await importCode('Objective', (data) => isKnownObjectiveType(data?.type));
        if (!json) {
            return;
        }

        const objective = new Objective();
        objective.fromJSON(json);
        objective.resetAccumulatedProgress();
        this.objectives.push(objective);

        Notifier.notify({
            title: 'Objective imported!',
            message: `The "<strong>${objective.displayName}</strong>" objective has been imported!`,
            type: NotificationOption.success,
        });
    }

    get name(): string {
        return this._name();
    }

    set name(value: string) {
        this._name(value);
    }

    toJSON(): Record<string, any> {
        return {
            name: this.name,
            objectives: this.objectives().filter(obj => obj.type !== undefined).map(obj => obj.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        this.name = json.name ?? 'New Goal';
        this.dispose();
        const objectives = [];
        json.objectives?.forEach((objectiveJson) => {
            if (!isKnownObjectiveType(objectiveJson?.type)) {
                return;
            }
            try {
                const objective = new Objective();
                objective.fromJSON(objectiveJson);
                objectives.push(objective);
            } catch (e) {
                console.warn('Failed to load objective, skipping:', e);
            }
        });

        this.objectives(objectives);
    }
}
