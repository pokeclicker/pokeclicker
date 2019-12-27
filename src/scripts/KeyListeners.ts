$(document).on("keydown", function (e) {
    let keyCode = e.keyCode;

    if (App.game.gameState == GameConstants.GameState.dungeon) {
        if (keyCode == 38 || keyCode == 87) {
            DungeonRunner.map.moveUp();
        } else if (keyCode == 39 || keyCode == 68) {
            DungeonRunner.map.moveRight();
        } else if (keyCode == 37 || keyCode == 65) {
            DungeonRunner.map.moveLeft();
        } else if (keyCode == 40 || keyCode == 83) {
            DungeonRunner.map.moveDown();
        } else if (keyCode == 32) {
            DungeonRunner.openChest();
            DungeonRunner.startBossFight();
        }
        e.preventDefault();
    }

});
