import BerryType from '../enums/BerryType';
import GameHelper from '../GameHelper';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import PokeBlock from '../items/PokeBlock';
import FlavorAmount from './FlavorAmount';

export default class BlendingController {

    public static blendingModalTabSelected: KnockoutObservable<string> = ko.observable('blendingView');

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedPokeBlock: KnockoutObservable<Item> = ko.observable(ItemList.PokeBlock_Red);

    static amount: KnockoutObservable<number> = ko.observable(1);

    public static getPokeblockList() {
        return Object.values(ItemList).filter((i) => i instanceof PokeBlock);
    }

    public static amountInput = () => $('#berryBlenderModal').find('input[name="recipeAmount"]');

    public static resetAmount() {
        this.amountInput().val(1).change();
    }

    public static increaseAmount(n: number) {
        const newVal = (parseInt(this.amountInput().val().toString(), 10) || 0) + n;
        this.amountInput().val(newVal > 1 ? newVal : 1).change();
    }

    public static multiplyAmount(n: number) {
        const newVal = (parseInt(this.amountInput().val().toString(), 10) || 0) * n;
        this.amountInput().val(newVal > 1 ? newVal : 1).change();
    }

    public static maxAmount() {
        const item: Item = this.selectedPokeBlock();

        if (!item) {
            return this.amountInput().val(0).change();
        }

        const tooMany = (amt: number) => (item as PokeBlock).flavors.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * amt, flavor.type)),
        );

        const amt = GameHelper.binarySearch(tooMany, 0, Number.MAX_SAFE_INTEGER);

        this.amountInput().val(amt).change();
    }

    public static calculateButtonCss(): string {
        const item: Item = this.selectedPokeBlock();

        if (item && (item as PokeBlock).flavors.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * this.amount(), flavor.type)))
                || this.amount() < 1) {
            return 'btn btn-danger smallButton smallFont';
        } else {
            return 'btn btn-success smallButton smallFont';
        }
    }
}