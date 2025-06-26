class PurifyChamberTownContent extends TownContent {
    constructor() {
        super([PurifyChamber.requirements]);
    }
    public cssClass(): string {
        return 'btn btn-info';
    }
    public text(): string {
        return 'Purify Chamber';
    }
    public onclick(): void {
        PurifyChamber.openPurifyChamberModal();
    }

    public isUnlocked(): boolean {
        return PurifyChamber.requirements.isCompleted();
    }

    public areaStatus(): areaStatus[] {
        if (!this.isUnlocked()) {
            return [areaStatus.locked];
        }
        const canPurify = App.game.purifyChamber.currentFlow() >= App.game.purifyChamber.flowNeeded() && App.game.party.caughtPokemon.some(p => p.shadow == GameConstants.ShadowStatus.Shadow);
        return [canPurify ? areaStatus.incomplete : areaStatus.completed];
    }

}

class PurifyChamber implements Saveable {
    public static requirements = new QuestLineStepCompletedRequirement('Shadows in the Desert', 17);

    public selectedPokemon: KnockoutObservable<PartyPokemon>;
    public currentFlow: KnockoutObservable<number>;
    public flowNeeded: KnockoutComputed<number>;
    private notified = false;

    private static shortcutRequirement = new MultiRequirement([
        new ShadowPokemonRequirement(1, GameConstants.ShadowStatus.Purified),
        new ShadowPokemonRequirement(131, GameConstants.ShadowStatus.Purified, GameConstants.AchievementOption.less),
    ]);
    public static shortcutVisible = ko.pureComputed((): boolean => {
        return PurifyChamber.shortcutRequirement.isCompleted();
    });

    constructor() {
        this.selectedPokemon = ko.observable(undefined);
        this.currentFlow = ko.observable(0);
        this.flowNeeded = ko.pureComputed(() => {
            const purifiedPokemon = App.game.party.caughtPokemon.filter((p) => p.shadow == GameConstants.ShadowStatus.Purified).length;
            const flow = 15 * purifiedPokemon * purifiedPokemon +
                15 * purifiedPokemon +
                1500 * Math.exp(0.1 * purifiedPokemon);
            return Math.round(flow);
        });
    }

    public canPurify() : boolean {
        if (!this.selectedPokemon()) {
            return false;
        }
        if (this.selectedPokemon().shadow != GameConstants.ShadowStatus.Shadow) {
            return false;
        }
        if (this.currentFlow() < this.flowNeeded()) {
            return false;
        }
        return true;
    }

    public purify() {
        if (!this.canPurify()) {
            return;
        }
        this.selectedPokemon().shadow = GameConstants.ShadowStatus.Purified;
        this.currentFlow(0);
        this.notified = false;
    }

    public gainFlow(exp: number) {
        if (!PurifyChamber.requirements.isCompleted() || !App.game.party.hasShadowPokemon()) {
            return;
        }
        const newFlow = Math.round(this.currentFlow() + exp / 1000);
        this.currentFlow(Math.min(newFlow, this.flowNeeded()));

        if (!this.notified && this.currentFlow() >= this.flowNeeded()) {
            this.notified = true;
            Notifier.notify({
                title: 'Purify Chamber',
                message: 'Maximum Flow has accumulated at the Purify Chamber in Orre!',
                type: NotificationConstants.NotificationOption.primary,
                sound: NotificationConstants.NotificationSound.General.max_flow,
                timeout: 15 * GameConstants.MINUTE,
            });
        }
    }

    public static openPurifyChamberModal() {
        if (PurifyChamber.requirements.isCompleted()) {
            $('#purifyChamberModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You need to progress in the Shadows in the Desert quest line to unlock this feature.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    saveKey = 'PurifyChamber';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            selectedPokemon: this.selectedPokemon()?.id,
            currentFlow: this.currentFlow(),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json) {
            if (json.selectedPokemon) {
                let selectedPokemon = App.game.party.getPokemon(json.selectedPokemon);
                if (selectedPokemon.shadow != GameConstants.ShadowStatus.Shadow) {
                    selectedPokemon = undefined;
                }
                this.selectedPokemon(selectedPokemon);

                this.currentFlow(json.currentFlow ?? 0);
            }
        }
    }
}
