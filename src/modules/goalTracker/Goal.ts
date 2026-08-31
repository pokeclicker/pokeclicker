import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';
import Objective from './Objective';
import GameHelper from '../GameHelper';
import SaveSelector from '../SaveSelector';

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

    exportObjective(objective: Objective) {
        const json = JSON.stringify(objective.toJSON());
        navigator.clipboard.writeText(SaveSelector.btoa(json));
        Notifier.notify({
            title: 'Objective exported',
            message: 'The code for this objective has been saved to your clipboard.',
            type: NotificationOption.info,
        });
    }

    async importObjective() {
        const input = await Notifier.prompt({
            title: 'Import Objective',
            message: 'Enter the exported objective code below:',
            type: NotificationOption.primary,
            timeout: 0,
        });

        if (input?.trim().length) {
            try {
                const json = JSON.parse(SaveSelector.atob(input));
                const objective = new Objective();
                objective.fromJSON(json);
                objective.resetAccumulatedProgress();
                this.objectives.push(objective);

                Notifier.notify({
                    title: 'Objective imported!',
                    message: `The "<strong>${objective.displayName}</strong>" objective has been imported!`,
                    type: NotificationOption.success,
                });
            } catch (e) {
                console.error(e);
                Notifier.notify({
                    title: 'Import Error',
                    message: 'Failed to import objective.',
                    type: NotificationOption.danger,
                });
            }
        }
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
        this.name = json.name;
        this.dispose();
        const objectives = [];
        json.objectives?.forEach((objectiveJson) => {
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
