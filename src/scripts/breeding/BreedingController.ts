class BreedingController {
    public static openBreedingModal() {
        if (App.game.breeding.canAccess()) {
            App.game.gameState = GameConstants.GameState.paused;
            $('#breedingModal').modal('show');
        } else {
            Notifier.notify('You do not have access to that location', GameConstants.NotificationOption.warning);
        }
    }

    public static getEggImage(egg: Egg): string {
        let eggType = GameConstants.EggType[egg.type].toLowerCase();
        if (eggType == 'pokemon') {
            const dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(egg.pokemon);
            eggType = String(dataPokemon.type1).toLowerCase();
        } else if (eggType == 'fossil') {
            eggType = GameConstants.PokemonToFossil[egg.pokemon];
        }
        return `assets/images/breeding/egg${eggType}.png`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    $('#breedingModal').on('hidden.bs.modal', function () {
        MapHelper.returnToMap();
    });

});
