import '../koExtenders';
import { PokeBlockColor } from '../GameConstants';
import { ItemList } from './ItemList';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import ContestHelper from '../contest/ContestHelper';
import { TmpPartyPokemonType } from '../TemporaryScriptTypes';
import PokeBlock from './PokeBlock';
import { getImage as getPokemonImage } from '../pokemons/PokemonHelper';
import ContestType from '../enums/ContestType';
import GameHelper from '../GameHelper';
import ContestRank from '../enums/ContestRank';
import Settings from '../settings';

export default class PokeBlockController {
    public static currentlySelected = ko.observable(0).extend({ numeric: 0 });
    public static currentlySelectedName = ko.computed(() => `PokeBlock_${PokeBlockColor[PokeBlockController.currentlySelected()]}`);
    public static multiplier = ['×1', '×5', '×10', '×50', '×100', '×200', '×500', 'Max'];
    public static multiplierIndex = ko.observable(0);

    public static incrementMultiplier() {
        PokeBlockController.multiplierIndex((PokeBlockController.multiplierIndex() + 1) % PokeBlockController.multiplier.length);
    }

    public static decrementMultiplier() {
        PokeBlockController.multiplierIndex((PokeBlockController.multiplierIndex() + PokeBlockController.multiplier.length - 1) % PokeBlockController.multiplier.length);
    }

    public static getMultiplier() {
        return Number(PokeBlockController.multiplier[PokeBlockController.multiplierIndex()].replace(/\D/g, '')) || Infinity;
    }

    public static getImage(blockColor) {
        const color = PokeBlockColor[blockColor ?? PokeBlockController.currentlySelected()];
        return `assets/images/items/pokeblock/PokeBlock_${color}.png`;
    }

    public static usePokeblock(pokemon: TmpPartyPokemonType, type: PokeBlockColor, amount: number): void {
        const itemName = `PokeBlock_${PokeBlockColor[type]}`;
        const pokeblock = ItemList[itemName] as PokeBlock;
        if (!player.itemList[itemName]()) {
            return Notifier.notify({
                message : `You do not have any more ${pokeblock.displayName}s`,
                type : NotificationConstants.NotificationOption.danger,
            });
        }

        // Add types
        let blockType = pokeblock.contestType ?? [];
        if (type === PokeBlockColor.White) {
            if (pokemon.currentContestTypes.length < 1 && pokemonMap[pokemon.name].contestTypes.includes(ContestType.Balanced)) {
                blockType = [ContestType.Balanced];
            }
        }
        if (type === PokeBlockColor.Rainbow) {
            blockType = pokemonMap[pokemon.name].contestTypes;
        }
        const addedTypes = blockType.filter(t => !pokemon.currentContestTypes.includes(t));

        if (addedTypes.length) {
            // Apply the new contest types in order
            const newTypes = pokemon.currentContestTypes.concat(blockType);
            pokemon.currentContestTypes = newTypes.sort();
            Notifier.notify({
                message : `${pokemon.displayName} became ${addedTypes.map(t => ContestType[t]).join(' and ')}!`,
                type : NotificationConstants.NotificationOption.success,
                pokemonImage : getPokemonImage(pokemon.id),
            });
        }

        // Increase stats
        amount = Math.min(amount, player.itemList[itemName]());
        if (type === PokeBlockColor.Black || (Settings.getSetting('stopPokeblockAtMaxAppeal').observableValue() && pokeblock.exp > 0)) {
            amount = Math.min(amount, Math.ceil((ContestHelper.maxSheen() - pokemon.contestExp) / pokeblock.exp));
        }
        PokeBlockController.increasePartyPokemonContestStats(pokemon, pokeblock, amount);

        GameHelper.incrementObservable(player.itemList[itemName], -amount);
        Notifier.notify({
            message : `You used ${amount} ${ItemList[itemName].displayName}(s)`,
            type : NotificationConstants.NotificationOption.success,
            image : ItemList[itemName].image,
        });
    }

    public static increasePartyPokemonContestStats(pokemon: TmpPartyPokemonType, pokeblock: PokeBlock, amount: number) {
        const initialAppeal = pokemon.contestAppeal;
        const initialExp = pokemon.contestExp;

        // Appeal
        pokemon.contestAppeal = PokeBlockController.increaseAppeal(pokemon.contestAppeal, pokemon.contestExp, pokeblock.value, pokeblock.exp, amount, pokeblock.ignoreDebuff);

        Notifier.notify({
            message : `${pokemon.displayName} gained ${(pokemon.contestAppeal - initialAppeal)} appeal point(s)`,
            type : NotificationConstants.NotificationOption.success,
            pokemonImage : getPokemonImage(pokemon.id),
        });

        // Sheen
        pokemon.contestExp = Math.min(ContestHelper.maxSheen(), pokemon.contestExp + pokeblock.exp * amount);

        if (initialExp < ContestHelper.maxSheen() && pokemon.contestExp >= ContestHelper.maxSheen()) {
            Notifier.notify({
                message : `${pokemon.displayName}\'s Sheen is maxed out! Pokéblocks will only add half the usual Appeal point until its reduced.`,
                type : NotificationConstants.NotificationOption.warning,
                pokemonImage : getPokemonImage(pokemon.id),
            });
        }

        return;
    }

    public static increaseAppeal(initialAppeal: number, initialExp: number, pokeblockApp: number, pokeblockExp: number, amount: number, ignoreDebuff = false) {
        // Determine start of `for` loop
        const rankBracket = 10 - Object.values(ContestHelper.rankAppeal).reverse().findIndex(i => i <= Math.min(initialAppeal, ContestHelper.rankAppeal[ContestRank['Brilliant Shining']]));

        // Establish variables
        let appeal = initialAppeal;
        let exp = initialExp;
        let amountUsed = amount;

        // Appeal
        for (let i = rankBracket; i <= ContestRank['Brilliant Shining']; i++) {
            if (amountUsed > 0 && pokeblockApp > 0) {
                if (!Boolean(ignoreDebuff)) {
                    // Step 1: Organize sheen debuffs
                    const oldExp = exp;
                    const newExpTotal = exp + pokeblockExp * amountUsed;
                    const newExpCapped = Math.min(ContestHelper.maxSheen(), newExpTotal);

                    const nonDebuffedDiff = Math.max(newExpCapped - oldExp, 0);
                    let nonDebuffedBlocks = Math.ceil(nonDebuffedDiff / pokeblockExp);

                    const debuffedDiff = Math.max(newExpTotal - newExpCapped, 0);
                    // if it's not a clean division, there's overlap with nonDebuffedBlocks, so subtract 1
                    let debuffedBlocks = Math.ceil(debuffedDiff / pokeblockExp) - Math.min(debuffedDiff % pokeblockExp, 1);

                    // Step 2: Organize appeal additions
                    const rankDebuff = Math.max(10 - i, 1) / 10;
                    let appealAdded = 0;
                    let appealAddedSheenDebuff = 0;
                    // don't forget to account for rank cap
                    if (i < ContestRank['Brilliant Shining']) {
                        // Appeal
                        const rankIncrement = ContestHelper.rankAppeal[i + 1] - ContestHelper.rankAppeal[i];
                        appealAdded = Math.min(rankIncrement, Math.ceil(pokeblockApp * rankDebuff) * nonDebuffedBlocks);
                        appealAddedSheenDebuff = Math.min(rankIncrement - appealAdded, Math.ceil(pokeblockApp * rankDebuff / 2) * debuffedBlocks);
                        // Blocks
                        nonDebuffedBlocks = Math.ceil(appealAdded / pokeblockApp);
                        debuffedBlocks = Math.ceil(appealAddedSheenDebuff / pokeblockApp);
                    } else {
                        appealAdded = Math.ceil(pokeblockApp * rankDebuff) * nonDebuffedBlocks;
                        appealAddedSheenDebuff = Math.ceil(pokeblockApp * rankDebuff / 2) * debuffedBlocks;
                    }
                    const totalAddedAppeal = appealAdded + appealAddedSheenDebuff;
                    const blocksUsed = nonDebuffedBlocks + debuffedBlocks;

                    // Step 3: Update variables
                    appeal += totalAddedAppeal;
                    exp = Math.min(ContestHelper.maxSheen(), exp + pokeblockExp * blocksUsed);
                    amountUsed -= blocksUsed;
                } else {
                    // no debuffs
                    appeal += pokeblockApp * amountUsed;
                    exp = Math.min(ContestHelper.maxSheen(), exp + pokeblockExp * amountUsed);
                    amountUsed = 0;
                }
            }
        }

        return appeal;
    }
}
