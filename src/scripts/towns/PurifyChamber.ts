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
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        $('#purifyChamberModal').modal('show');
    }

}

class PurifyChamber implements Saveable {
    public static requirements = new DevelopmentRequirement(); //TODO: when should this unlock? Waiting for story

    public selectedPokemon: KnockoutObservable<PartyPokemon>;

    constructor() {
        this.selectedPokemon = ko.observable(undefined);
    }

    public canPurify() : boolean {
        if (!this.selectedPokemon()) {
            return false;
        }
        if (this.selectedPokemon().shadow != GameConstants.ShadowStatus.Shadow) {
            return false;
        }
        return true;
    }

    public purify() {
        if (!this.canPurify()) {
            return;
        }
        this.selectedPokemon().shadow = GameConstants.ShadowStatus.Purified;
    }

    saveKey = 'PurifyChamber';
    defaults: Record<string, any>;
    toJSON(): Record<string, any> {
        return {
            selectedPokemon : this.selectedPokemon()?.id,
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
            }
        }
    }
}
