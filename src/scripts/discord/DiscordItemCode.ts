class DiscordItemCode extends DiscordCode {
    constructor(itemName: ItemNameType, description, amount = 1) {
        const item = ItemList[itemName];
        const claimFunction = () => {
            player.gainItem(itemName, amount);
            // Notify that the code was activated successfully
            Notifier.notify({
                message: `You obtained ${item.displayName}!`,
                type: NotificationConstants.NotificationOption.success,
                timeout: 1e4,
            });
            return true;
        };
        super(item.displayName, item.image, item.basePrice, description, claimFunction);
    }
}
