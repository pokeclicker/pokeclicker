class BattlePartyController {

    public static openBattlePartyModal() {
        if (App.game.battleParty.canAccess()) {
            $('#battlePartyModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have access to the Day Care yet.<br/><i>Clear route 5 first</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }


}
