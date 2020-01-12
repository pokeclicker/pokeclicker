class RedeemableCodes implements Saveable {
    defaults: object;
    saveKey = 'redeemable-codes';

    codeList: RedeemableCode[];


    constructor() {
        this.codeList = [
            new RedeemableCode('test-code', 1818694934, false, function () {
                App.game.wallet.gainMoney(100);
            }),
        ];
    }

    enterCode(code: string) {
        const hash = this.hash(code);

        const redeemableCode = this.codeList.find(code => {
            return code.hash === hash;
        });

        if (!redeemableCode) {
            Notifier.notify(`Invalid code ${code}`, GameConstants.NotificationOption.danger);
            return;
        }

        redeemableCode.redeem();
    }

    /**
     * Insecure hash, but should keep some of the nosy people out.
     * @param text
     */
    hash(text: string): number {
        let hash = 0, i, chr;
        if (text.length === 0) {
            return hash;
        }

        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }


    fromJSON(json: string[]): void {
        json.forEach(name => {
            this.codeList.find(code => {
                return code.name === name;
            }).isRedeemed = true;
        });
    }

    toJSON(): object {
        return this.codeList.reduce(function (res: string[], code: RedeemableCode) {
            if (code.isRedeemed) {
                res.push(code.name);
            }
            return res;
        }, []);
    }

}
