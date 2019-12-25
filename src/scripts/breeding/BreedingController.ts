class BreedingController {
    public static openBreedingModal() {
        if (player.hasKeyItem("Mystery egg")) {
            Game.gameState(GameConstants.GameState.paused);
            $('#breedingModal').modal('show');
        } else {
            Notifier.notify("You do not have access to that location", GameConstants.NotificationOption.warning);
        }
    }
}

document.addEventListener("DOMContentLoaded", function (event) {

    $('#breedingModal').on('hidden.bs.modal', function () {
        if (player.highestRegion() == 0) {
            MapHelper.moveToRoute(5, GameConstants.Region.kanto);
        }
        MapHelper.returnToMap();
    });

});
