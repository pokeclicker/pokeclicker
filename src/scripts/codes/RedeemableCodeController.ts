class RedeemableCodeController {
    static enterCode() {
        const el = document.getElementById('redeemable-code-input') as HTMLInputElement;;
        const code = el.value;
        el.value = '';
        App.game.redeemableCodes.enterCode(code);
    }
}
