import { Feature } from '../DataStore/common/Feature';
import { getDungeonIndex } from '../GameConstants';
import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';
import SaveSelector from '../SaveSelector';
import Goal from './Goal';
import Objective from './Objective';
import { objectiveOptions } from './ObjectiveOptions';
import { ObjectiveType } from './objectives/ObjectiveTypes';

export default class GoalTracker implements Feature {
    name = 'Goal Tracker';
    saveKey = 'goalTracker';
    defaults = {};

    public goals: KnockoutObservableArray<Goal> = ko.observableArray([]);
    public selectedObjective: KnockoutObservable<Objective | undefined> = ko.observable<Objective>(undefined);

    initialize(): void {}

    canAccess(): boolean {
        return App.game.statistics.dungeonsCleared[getDungeonIndex('Victory Road Johto')]() > 0;
    }

    createGoal() {
        this.goals.unshift(new Goal());
    }

    async deleteGoal(goal: Goal) {
        if (await Notifier.confirm({
            title: 'Delete goal',
            message: 'Are you sure you want to delete this goal and all of its objectives?',
            type: NotificationOption.danger,
            confirm: 'Delete',
        })) {
            goal.dispose();
            this.goals.remove(goal);
        }
    }

    static getObjectiveTypeLabel(type: ObjectiveType) {
        return objectiveOptions[type]?.label ?? ObjectiveType[type];
    }

    exportGoal(goal: Goal) {
        const json = JSON.stringify(goal.toJSON());
        navigator.clipboard.writeText(SaveSelector.btoa(json));
        Notifier.notify({
            title: 'Goal exported',
            message: 'The code for this goal has been saved to your clipboard.',
            type: NotificationOption.info,
        });
    }

    async importGoal() {
        const input = await Notifier.prompt({
            title: 'Import Goal',
            message: 'Enter the exported goal code below:',
            type: NotificationOption.primary,
            timeout: 0,
        });

        if (input?.trim().length) {
            try {
                const json = JSON.parse(SaveSelector.atob(input));
                const goal = new Goal();
                goal.fromJSON(json);
                goal.objectives().forEach(obj => obj.resetAccumulatedProgress());
                this.goals.unshift(goal);

                Notifier.notify({
                    title: 'Goal imported!',
                    message: `The "<strong>${goal.name}</strong>" goal has been imported!`,
                    type: NotificationOption.success,
                });
            } catch (e) {
                console.error(e);
                Notifier.notify({
                    title: 'Import Error',
                    message: 'Failed to import goal.',
                    type: NotificationOption.danger,
                });
            }
        }
    }

    toJSON(): Record<string, any> {
        return {
            goals: this.goals().map(goal => goal.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        this.goals().forEach(goal => goal.dispose());

        const goals = [];
        json.goals?.forEach((goalJson) => {
            const goal = new Goal();
            goal.fromJSON(goalJson);
            goals.push(goal);
        });

        this.goals(goals);
    }
}
