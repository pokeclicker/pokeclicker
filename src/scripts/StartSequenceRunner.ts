class StartSequenceRunner {

    public static start() {
        Game.gameState(GameConstants.GameState.idle);
        $('#startSequenceModal').modal('show');
    }
}
