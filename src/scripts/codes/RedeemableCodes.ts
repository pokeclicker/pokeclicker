class RedeemableCodes implements Saveable {
    defaults: object;
    saveKey = 'redeemableCodes';

    codeList: RedeemableCode[];

    constructor() {
        this.codeList = [
            new RedeemableCode('farming-quickstart', -83143881, false, function () {
                App.game.wallet.gainFarmPoints(10000);
                App.game.farming.gainBerry(BerryType.Cheri, 100);
                Notifier.notify({ message: 'You gain 10000 farmpoints and 100 Cheri berries', type: GameConstants.NotificationOption.success });
            }),
            new RedeemableCode('good-luck', 1538489764, false, function () {
                Notifier.notify({ message: 'Congrats, you did it. Although you probably already read this text so it can\'t feel very satisfying can it?', type: GameConstants.NotificationOption.success });
            }),
            new RedeemableCode('route-unlock-kanto', -889017321, false, function () {
                for (let i = 1; i <= 25; i++) {
                    App.game.statistics.routeKills[i](10);
                }
                Notifier.notify({ message: 'You have unlocked all routes in Kanto', type: GameConstants.NotificationOption.success });
            }),
            new RedeemableCode('route-unlock-johto-2', -891649982, false, function () {
                for (let i = 26; i <= 46; i++) {
                    App.game.statistics.routeKills[i](10);
                }
                Notifier.notify({ message: 'You have unlocked all routes in Johto', type: GameConstants.NotificationOption.success });
            }),
        ];
    }

    enterCode(code: string) {
        const hash = this.hash(code);

        const redeemableCode = this.codeList.find(code => {
            return code.hash === hash;
        });

        if (!redeemableCode) {
            Notifier.notify({ message: `Invalid code ${code}`, type: GameConstants.NotificationOption.danger });
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
        if (json == null) {
            return;
        }

        json.forEach(name => {
            const foundCode = this.codeList.find(code => {
                return code.name === name;
            });

            if (foundCode) {
                foundCode.isRedeemed = true;
            }
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
