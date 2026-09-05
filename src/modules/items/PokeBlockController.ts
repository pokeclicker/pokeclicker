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
// import Settings from '../settings';
import ContestTypeHelper from '../types/ContestTypeHelper';

export default class PokeBlockController {
    public static currentlySelected = ko.observable(0).extend({ numeric: 0 });
    public static currentlySelectedName = ko.computed(() => `PokeBlock_${PokeBlockColor[PokeBlockController.currentlySelected()]}`);
    public static multiplier = ['×1', '×5', '×10', '×50', '×100', 'Max'];
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

        const pokemonImage = document.getElementById('pokeblockMon-' + `${pokemon.id}`);
        pokemonImage.style.animation = 'bounce 1s ease';
        pokemonImage.addEventListener('animationend', function () {
            pokemonImage.style.removeProperty('animation');
        });

        // Increase stats
        amount = Math.min(amount, player.itemList[itemName]());
        // if (Settings.getSetting('stopPokeblockAtMaxAppeal').observableValue() && pokeblock.exp > 0) {
        //     amount = Math.min(amount, Math.ceil((ContestHelper.maxPokeblockFullness() - pokemon.pokeblockFullness) / pokeblock.exp));
        // }
        PokeBlockController.increasePartyPokemonContestStats(pokemon, pokeblock, amount);

        GameHelper.incrementObservable(player.itemList[itemName], -amount);
        Notifier.notify({
            message : `You used ${amount} ${ItemList[itemName].displayName}(s)`,
            type : NotificationConstants.NotificationOption.success,
            image : ItemList[itemName].image,
        });
    }

    public static increasePartyPokemonContestStats(pokemon: TmpPartyPokemonType, pokeblock: PokeBlock, amount: number) {
        const defaultPokemonConditions = pokemonMap[pokemon.name].contestTypes;
        const primaryConditions = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough];
        
        let boostedConditions = pokeblock.contestType ?? defaultPokemonConditions;
        if (pokeblock.type === PokeBlockColor.White || pokeblock.type === PokeBlockColor.Rainbow) {
            // we concat it with the pokemon to give Balanced appeal to those who have it as a default type
            boostedConditions = [...new Set(primaryConditions.concat(defaultPokemonConditions))];
        }
        if (pokeblock.type === PokeBlockColor.Gray) {
            boostedConditions = GameHelper.enumNumbers(ContestType).filter(ct => ContestTypeHelper.getAppealModifier(defaultPokemonConditions, [ct]) > 0);
        }
        if (pokeblock.type === PokeBlockColor.Silver || pokeblock.type === PokeBlockColor.Gold) {
            boostedConditions = GameHelper.enumNumbers(ContestType);
        }

        // reverse the array for notifications to be in order from top to bottom
        boostedConditions.reverse().forEach(ct => {
            const initialAppeal = pokemon.contestStats[ct]();

            let effectiveness = ContestTypeHelper.getAppealModifier([ct], defaultPokemonConditions);
            // black gives constant value
            if (pokeblock.type === PokeBlockColor.Black) {
                effectiveness = 0.5;
            }
            // emulate striped pokeblock "flavors"
            if (pokeblock.type >= PokeBlockColor.Purple && pokeblock.type <= PokeBlockColor.Orange) {
                effectiveness = ContestTypeHelper.getAppealModifier(boostedConditions, defaultPokemonConditions);
            }
            // rainbow gives better boost than white
            if (pokeblock.type === PokeBlockColor.Rainbow) {
                effectiveness = Math.max(ContestTypeHelper.getAppealModifier(defaultPokemonConditions, [ct]), +defaultPokemonConditions.includes(ContestType.Balanced));
            }
            // typed pokeblocks have constant values
            if (pokeblock.type >= PokeBlockColor.Cool && pokeblock.type <= PokeBlockColor.Balanced) {
                effectiveness = 0.5;
            }
            const appealBonus = Math.ceil(pokeblock.value * (75 + 50 * effectiveness) / 100);

            // Appeal
            const addedAppeal = PokeBlockController.increaseAppeal(initialAppeal, pokemon.pokeblockFullness, appealBonus, pokeblock.exp, amount, pokeblock.ignoreDebuff);
            pokemon.contestStats[ct](addedAppeal);

            Notifier.notify({
                message : `+${(addedAppeal - initialAppeal)} ${ContestType[ct]}`,
                type : NotificationConstants.NotificationOption.info,
                image : pokeblock.image,
            });
        });

        Notifier.notify({
            message : `${pokemon.displayName}\'s appeal went up!`,
            type : NotificationConstants.NotificationOption.success,
            pokemonImage : getPokemonImage(pokemon.id),
        });

        // Pokeblock fullness
        const initialExp = pokemon.pokeblockFullness;
        pokemon.pokeblockFullness = Math.min(ContestHelper.maxPokeblockFullness(), initialExp + pokeblock.exp * amount);

        if (initialExp < ContestHelper.maxPokeblockFullness() && pokemon.pokeblockFullness >= ContestHelper.maxPokeblockFullness()) {
            Notifier.notify({
                message : `${pokemon.displayName} is full! Pokéblocks will only add half the Appeal until its fullness is reduced.`,
                type : NotificationConstants.NotificationOption.warning,
                pokemonImage : getPokemonImage(pokemon.id),
            });
        }

        // todo: add sheen, which will be based off of fullness. poffins will give extra sheen

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
                    const newExpCapped = Math.min(ContestHelper.maxPokeblockFullness(), newExpTotal);

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
                    exp = Math.min(ContestHelper.maxPokeblockFullness(), exp + pokeblockExp * blocksUsed);
                    amountUsed -= blocksUsed;
                } else {
                    // no debuffs
                    appeal += pokeblockApp * amountUsed;
                    exp = Math.min(ContestHelper.maxPokeblockFullness(), exp + pokeblockExp * amountUsed);
                    amountUsed = 0;
                }
            }
        }

        return appeal;
    }

    public static pokeblockJiggle(id: number) {
        const img = document.getElementById('pokeblock-' + `${id}`);
        img.style.animation = 'gelatine 0.5s';
        img.addEventListener('animationend', function () {
            img.style.removeProperty('animation');
        });
    }
}
