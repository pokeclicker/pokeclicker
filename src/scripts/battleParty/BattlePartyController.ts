class BattlePartyController {
    public static openBattlePartyModal() {
        if (App.game.partySlots.canAccess()) {
            $('#battlePartyModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have access to the Party yet.<br/><i></i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
    public static onBattlePartySlotClick(index) {
        if (App.game.partySlots.canAccess()) {
            App.game.partySlots.onSlotClick(index);
        } else {
            Notifier.notify({
                message: 'You do not have access to the Party yet.<br/><i></i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
}
