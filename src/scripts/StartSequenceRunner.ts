class StartSequenceRunner {

    public static start() {
        Game.gameState(GameConstants.GameState.idle);
        $('#startSequenceModal').modal('show');

    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    $('#startSequenceModal').on('hidden.bs.modal', function () {
        $('#pickStarterModal').modal('show');

    });

    $('#pickStarterModal').on('hidden.bs.modal', function () {
        Game.gameState(GameConstants.GameState.fighting);

    });
});