class BattlePartyController {
    public static openBattlePartyModal() {
        if (App.game.partySlots.canAccess()) {
            $('#battlePartyModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have access to the Party yet.<br/><i></i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
    public static onBattlePartySlotClick(index) {
        if (App.game.partySlots.canAccess()) {
            App.game.partySlots.onSlotClick(index);
        } else {
            Notifier.notify({
                message: 'You do not have access to the Party yet.<br/><i></i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }
    public static visible(partyPokemon: PartyPokemon) {
        if (AbilityList.findPokemonAbilities(partyPokemon.name)) {
            return true;
        } else {
            return false;
        }
    }
    public static getPossibleList() {
        return App.game.party.caughtPokemon.filter((e: PartyPokemon) => AbilityList.findPokemonAbilities(e.name));
    }

    public static displayValue = ko.observable('attack');
    public static getDisplayValue(pokemon: PartyPokemon): string {
        const pokemonData = pokemonMap[pokemon.name];
        switch (this.displayValue()) {
            case 'attack': return `Attack: ${pokemon.attack.toLocaleString('en-US')}`;
            case 'baseAttack': return `Base Attack: ${pokemon.baseAttack.toLocaleString('en-US')}`;
            case 'dexId': return `#${pokemon.id <= 0 ? '???' : Math.floor(pokemon.id).toString().padStart(3,'0')}`;
        }
    }
}
