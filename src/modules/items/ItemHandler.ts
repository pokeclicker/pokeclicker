import { Observable } from 'knockout';
import { ItemList } from './ItemList';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import { StoneType } from '../GameConstants';

export default class ItemHandler {
    public static stoneSelected: Observable<string> = ko.observable(StoneType[0]);
    public static pokemonSelected: Observable<PokemonNameType> = ko.observable('Gloom'); // TODO: import {} when PartyController module, ko.observable(getPokemonsWithEvolution(0)[0].name);
    public static amountSelected: Observable<number> = ko.observable(1);
    static amount: Observable<number> = ko.observable(1);
    // public static amountToUse = 1;

    public static useItem(name: string, amount = 1): boolean {
        if (!ItemList[name].checkCanUse()) {
            return false;
        }

        // Only allow the player to use the amount they have maximum
        const amountToUse = Math.min(player.itemList[name](), amount);

        player.itemList[name](player.itemList[name]() - amountToUse);

        // run the function
        const result = ItemList[name].use(amountToUse);
        // If the function returned nothing assume it went fine
        return result ?? true;
    }

    public static hasItem(name: string): boolean {
        return player.itemList[name] ? !!player.itemList[name]() : false;
    }

    public static resetAmount() {
        const input = $('input[name="amountOfStones"]');
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        const input = $('input[name="amountOfItems"]');
        const newVal = (parseInt(input.val().toString(), 10) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }

    public static useStones() {
        if (!ItemHandler.pokemonSelected()) {
            return Notifier.notify({
                message: 'No Pokémon selected.',
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        const partyPokemon = App.game.party.getPokemonByName(ItemHandler.pokemonSelected());
        if (partyPokemon.breeding && App.game.challenges.list.realEvolutions.active()) {
            // If the real evolution challenge is active, we prevent using stones on Pokémon in the hatchery to prevent exploits
            return Notifier.notify({
                message: 'You can\'t use an evolution item on a Pokémon if it\'s in the hatchery...',
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        const amountTotal = Math.min(ItemHandler.amountSelected(), player.itemList[ItemHandler.stoneSelected()]());

        if (!amountTotal) {
            return Notifier.notify({
                // TODO: PMX - Update plural system to handle all cases
                message: `You don't have any ${ItemList[ItemHandler.stoneSelected()].displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        if (!App.game.party.getPokemonByName(ItemHandler.pokemonSelected()).canUseStone(StoneType[ItemHandler.stoneSelected()])) {
            return Notifier.notify({
                message: `${ItemHandler.pokemonSelected()} isn't possible to evolve right now...<br>Check the lock icons next to the pokeballs for more details.`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        let amountUsed = 0;
        for (let i = 0; i < amountTotal; i++) {
            player.itemList[ItemHandler.stoneSelected()](player.itemList[ItemHandler.stoneSelected()]() - 1);
            amountUsed++;
            if ((ItemList[ItemHandler.stoneSelected()]).use(1, ItemHandler.pokemonSelected()) || !App.game.party.getPokemonByName(this.pokemonSelected())) {
                // Stop when a shiny is encountered or the base is removed from the party in Real Evo.
                break;
            }
        }
        const multiple = amountUsed === 1 ? '' : 's';
        const stoneUsed = ItemList[ItemHandler.stoneSelected()];
        return Notifier.notify({
            // TODO: PMX - Update plural system to handle all cases
            message: `You used ${amountUsed.toLocaleString('en-US')} × <img src="${stoneUsed.image}" height="24px"/> ${stoneUsed.displayName}${multiple} on ${ItemHandler.pokemonSelected()}.`,
            type: NotificationConstants.NotificationOption.success,
        });
    }

    public static initilizeEvoStones() {
        // Set our unlock regions
        Object.values(ItemList).forEach((item) => item.init());
    }
}
