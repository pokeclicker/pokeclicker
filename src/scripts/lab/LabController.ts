class LabController {

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

    public static openResearchListModal() {
        if (ResearchHandler.researchList.length === 0) {
            ResearchHandler.researchList = App.game.lab.researchList.map(research => research.id);
            ResearchHandler.filterResearchList();
        }
        $('#researchListModal').modal('show');
    }
}

