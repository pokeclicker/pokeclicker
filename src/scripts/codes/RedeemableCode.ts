class RedeemableCode {
    name: string;
    hash: number;
    isRedeemed: boolean;
    private readonly rewardFunction: () => void;


    constructor(name: string, hash: number, isRedeemed: boolean, rewardFunction: () => void) {
        this.name = name;
        this.hash = hash;
        this.isRedeemed = isRedeemed;
        this.rewardFunction = rewardFunction;
    }

    redeem() {
        if (this.isRedeemed) {
            Notifier.notify({ message: 'You have already redeemed this code', type: GameConstants.NotificationOption.danger });
            return;
        }
        this.isRedeemed = true;
        this.rewardFunction();
    }
}
