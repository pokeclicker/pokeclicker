import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import Requirement from '../requirements/Requirement';

export default class RedeemableCode {
    constructor(public name: string, public hash: number, public isRedeemed: boolean, private rewardFunction: () => void, private requirement: Requirement = undefined) {
    }

    redeem() {
        if (this.isRedeemed) {
            Notifier.notify({
                message: 'You have already redeemed this code.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        if (this.requirement && !this.requirement.isCompleted()) {
            Notifier.notify({
                message: 'Cannot redeem this code yet.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        // If nothing returned, assume it was redeemed fine
        if (this.rewardFunction() === undefined) {
            this.isRedeemed = true;
        }
    }
}
