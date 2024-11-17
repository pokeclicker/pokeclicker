import type { Computed } from 'knockout';
import BerryType from '../enums/BerryType';
import GameHelper from '../GameHelper';
import BlendingRecipe from './BlendingRecipe';
import BlendingRecipes from './BlendingRecipes';
import FlavorAmount from './FlavorAmount';
import FlavorType from '../enums/FlavorType';
import BooleanStringKeys from '../interfaces/BooleanStringKeys';

export default class BlendingController {
    public static shortcutVisible: Computed<boolean> = ko.pureComputed(() => {
        return App.game.blending.canAccess();
    });

    public static blendingModalTabSelected: KnockoutObservable<string> = ko.observable('blendingView');

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedRecipe: KnockoutObservable<BlendingRecipe> = ko.observable(BlendingRecipes.blendingRecipeList[0][0]);
    public static selectedRecipeList: KnockoutObservableArray<BlendingRecipe> = ko.observableArray(BlendingRecipes.getFullBlendingRecipeList());

    public static spicyFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static dryFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static sweetFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static bitterFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static sourFilter: KnockoutObservable<boolean> = ko.observable(false);

    static flavorKeys: BooleanStringKeys = {
        [FlavorType[FlavorType.Spicy]]: this.spicyFilter,
        [FlavorType[FlavorType.Dry]]: this.dryFilter,
        [FlavorType[FlavorType.Sweet]]: this.sweetFilter,
        [FlavorType[FlavorType.Bitter]]: this.bitterFilter,
        [FlavorType[FlavorType.Sour]]: this.sourFilter,
    };

    static amount: KnockoutObservable<number> = ko.observable(1);

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
        const recipe: BlendingRecipe = this.selectedRecipe();

        if (!recipe) {
            return this.amountInput().val(0).change();
        }

        const tooMany = (amt: number) => (recipe as BlendingRecipe).flavorPrice.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * amt, flavor.type)),
        );

        const amt = GameHelper.binarySearch(tooMany, 0, Number.MAX_SAFE_INTEGER);

        this.amountInput().val(amt).change();
    }

    public static calculateSelectionCss(recipe: BlendingRecipe): boolean {
        if (recipe && (recipe as BlendingRecipe).flavorPrice.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * this.amount(), flavor.type)))
                || this.amount() < 1) {
            return true;
        }
    }

    public static calculateButtonCss(): string {
        const recipe: BlendingRecipe = this.selectedRecipe();

        if (recipe && (recipe as BlendingRecipe).flavorPrice.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * this.amount(), flavor.type)))
                || this.amount() < 1) {
            return 'btn btn-danger smallButton smallFont';
        } else {
            return 'btn btn-success smallButton smallFont';
        }
    }

    public static berrySpin() {
        let berryImage = document.getElementById('blendBerry');
        berryImage.style.animation = `spin ${25 / App.game.farming.berryData[BlendingController.selectedBerry()].smoothness}s linear`;
        berryImage.addEventListener('animationend', function () {
            berryImage.style.removeProperty('animation');
        });
    }

    public static blendingListFlavorFilters(): number[] {
        const flavors = GameHelper.enumNumbers(FlavorType);
        return flavors.filter(v => BlendingController.flavorKeys[FlavorType[v]]());
    }

    public static toggleFlavor(flavorEnum: number) {
        const flavor = FlavorType[flavorEnum];
        const status = this.flavorKeys[flavor]();
        return this.flavorKeys[flavor](!status);
    }

    public static calculateTableBerryCss(berry: BerryType): string {
        if (!App.game.blending.machines.some(m => m.blendSlots.some(s => s.berry === berry))) {
            return 'btn-secondary align-middle';
        } else {
            return 'btn-primary align-middle';
        }
    }

    public static calculateTableRowCss(berry: BerryType): string {
        return (BlendingController.selectedBerry() === berry) || App.game.blending.machines.some(m => m.blendSlots.some(s => s.berry === berry)) ? 'background-color: rgba(128, 128, 128, 0.4)' : '';
    }
}
