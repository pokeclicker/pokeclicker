class PokeballFactoryController {

    public static openFactoryModal() {
        if (PokeballFactory.canAccess()) {
            Game.gameState(GameConstants.GameState.paused);
            $('#pokeballFactoryModal').modal('show');
        } else {
            Notifier.notify("You need the <b>Factory Key</b> to enter the Pokéball Factory", GameConstants.NotificationOption.warning);
        }
    }

}
