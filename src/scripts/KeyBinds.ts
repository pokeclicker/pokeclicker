$(document).ready(function() {
    $(document).on("keydown", function(e) {
        let keyCode = e.keyCode;
        if (Game.gameState() == GameConstants.GameState.safari) {
            let dir = GameConstants.KeyToDirection[keyCode];
            if (dir) {
                e.preventDefault();
                Safari.move(dir);
            }
            if (keyCode == 32) { // space
                e.preventDefault();
            }
        }
    })

    $(document).on("keyup", function (e) {
        let keyCode = e.keyCode;
        if(Game.gameState() == GameConstants.GameState.safari){
            let dir = GameConstants.KeyToDirection[keyCode];
            if (dir) {
                e.preventDefault();
                Safari.stop(dir);
            } else if (keyCode == 32) { // space
                e.preventDefault();
            }
            
        }
    });

    $("#pokedexModal").on("show.bs.modal", PokedexHelper.updateList)
})