class LabController {

    public static selectedResearchSlot: KnockoutObservable<number> = ko.observable(0);

    public static openLabModal() {
        if (App.game.lab.canAccess()) {
            $('#labModal').modal('show');
        } else {
            // TODO: HLXII - Update with access requirements
            /*
            Notifier.notify({
                message: `You need the ${GameConstants.humanifyString(KeyItems.KeyItem[KeyItems.KeyItem.Wailmer_pail])} to access this location`,
                type: NotificationConstants.NotificationOption.warning,
            });
            */
        }
    }

    public static visible(partyPokemon: PartyPokemon) {
        return ko.pureComputed(() => {
            // Only working Pokemon
            if (partyPokemon.location !== PartyLocation.Battle) {
                return false;
            }

            const research = App.game.lab.currentResearch()[LabController.selectedResearchSlot()];
            if (research?.research?.workerFilter && !research?.research?.workerFilter?.filter(partyPokemon)) {
                return false;
            }

            return BreedingController.applyFilter(partyPokemon);
        });
    }

    public static handleClick(partyPokemon: PartyPokemon) {
        const research = App.game.lab.currentResearch()[LabController.selectedResearchSlot()];
        if (!research) {
            return;
        }
        if (research.workers.length === research?.maxWorkers) {
            return;
        }
        research.addWorker(partyPokemon);

        // Check if close Modal
        if (research.workers.length === research.maxWorkers) {
            $('#partyListModal').modal('hide');
        }
    }

    public static openResearchListModal() {
        if (ResearchHandler.researchList.length === 0) {
            ResearchHandler.researchList = App.game.lab.researchList.map(research => research.id);
            ResearchHandler.filterResearchList();
        }
        $('#researchListModal').modal('show');
    }

    public static openPartyListModal(index: number) {
        LabController.selectedResearchSlot(index);
        $('#partyListModal').modal('show');
    }
}

