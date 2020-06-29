class RedeemableCodeController {
    static enterCode() {
        const code = (<HTMLInputElement>document.getElementById('redeemable-code-input')).value;
        App.game.redeemableCodes.enterCode(code);
    }
}
