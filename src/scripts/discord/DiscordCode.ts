class DiscordCode {
    public claimed = false;

    // Image, Price and Description fields are not currently used on the website,
    // the data is there so the Discord bot and website can share the same dataset
    constructor(
        public name: string,
        public image: string,
        public price: number,
        public description: string,
        private claimFunction = () => true
    ) {}

    claim() {
        if (this.claimed) {
            Notifier.notify({
                title: `[Discord Code] ${this.name}`,
                message: 'Already claimed!',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        if (this.claimFunction()) {
            this.claimed = true;
            Notifier.notify({
                title: `[Discord Code] ${this.name}`,
                message: 'Successfully claimed!',
                type: NotificationConstants.NotificationOption.success,
            });
        }
    }

    toJSON() {
        return {
            name: this.name,
            image: this.image,
            price: this.price,
            description: this.description,
            claimed: this.claimed,
        };
    }
}
