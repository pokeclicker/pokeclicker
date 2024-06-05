import TreasureItem from './TreasureItem';
import EggType from '../breeding/EggType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import HatchableItem from '../interfaces/HatchableItem';

export default class FossilItem extends TreasureItem implements HatchableItem {

    constructor(id: string, displayName: string) {
        super(id, UndergroundItemValueType.Fossil, displayName);
    }

    use(): boolean {
    	return this.addToHatchery();
    }

    addToHatchery(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }
        
        const success = App.game.breeding.addItemToHatchery(this.name, EggType.Fossil);

        if (success) {
            player.loseItem(this.name, 1);
        }
        return success;
    }

}