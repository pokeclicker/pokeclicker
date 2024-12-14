import type { Computed } from 'knockout';
import BerryType from '../enums/BerryType';
import GameHelper from '../GameHelper';
import BlendingRecipe from './BlendingRecipe';
import BlendingRecipes from './BlendingRecipes';
import FlavorAmount from './FlavorAmount';
import FlavorType from '../enums/FlavorType';
import BooleanStringKeys from '../interfaces/BooleanStringKeys';
import BlendingRecipeType from '../enums/BlendingRecipeType';
import { ItemList } from '../items/ItemList';

export default class BlendingController {
    public static shortcutVisible: Computed<boolean> = ko.pureComputed(() => {
        return App.game.blending.canAccess();
    });

    public static blendingModalTabSelected: KnockoutObservable<string> = ko.observable('blendingView');

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedRecipeList: KnockoutObservableArray<BlendingRecipe> = ko.observableArray([]);

    public static spicyFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static dryFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static sweetFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static bitterFilter: KnockoutObservable<boolean> = ko.observable(false);
    public static sourFilter: KnockoutObservable<boolean> = ko.observable(false);

    static flavorKeys: BooleanStringKeys = {
        [FlavorType[FlavorType.Spicy]]: BlendingController.spicyFilter,
        [FlavorType[FlavorType.Dry]]: BlendingController.dryFilter,
        [FlavorType[FlavorType.Sweet]]: BlendingController.sweetFilter,
        [FlavorType[FlavorType.Bitter]]: BlendingController.bitterFilter,
        [FlavorType[FlavorType.Sour]]: BlendingController.sourFilter,
    };

    static amounts: Array<KnockoutObservable<number>>;

    public static recipeIndex(recipe: BlendingRecipe) {
        return BlendingRecipes.getFullBlendingRecipeList(false).indexOf(recipe);
    }

    public static amountInputElement(recipe: BlendingRecipe) {
        return $(`#recipeAmount-${recipe.item}`);
    }

    public static resetAmount(recipe: BlendingRecipe) {
        BlendingController.amountInputElement(recipe).val(1).change();
    }

    public static increaseAmount(recipe: BlendingRecipe, n: number) {
        const curVal = parseInt(BlendingController.amountInputElement(recipe).val().toString(), 10);
        const newVal = (curVal || 0) + n;
        BlendingController.amountInputElement(recipe).val(newVal > 1 ? newVal : 1).change();
    }

    public static multiplyAmount(recipe: BlendingRecipe, n: number) {
        const curVal = parseInt(BlendingController.amountInputElement(recipe).val().toString(), 10);
        const newVal = (curVal || 0) * n;
        BlendingController.amountInputElement(recipe).val(newVal > 1 ? newVal : 1).change();
    }

    public static maxAmount(recipe: BlendingRecipe) {
        if (!recipe) {
            return BlendingController.amountInputElement(recipe).val(0).change();
        }

        const tooMany = (amt: number) => (recipe).flavorPrice.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * amt, flavor.type)),
        );

        const amt = GameHelper.binarySearch(tooMany, 0, Number.MAX_SAFE_INTEGER);

        BlendingController.amountInputElement(recipe).val(amt).change();
    }

    public static calculateButtonCss(recipe: BlendingRecipe) {
        const curVal = BlendingController.amounts[BlendingController.recipeIndex(recipe)]();
        if (recipe && (recipe).flavorPrice.some((flavor) =>
            !App.game.blending.hasAmount(new FlavorAmount(flavor.value * curVal, flavor.type)))
                || curVal < 1) {
            return false;
        } else {
            return true;
        }
    }

    public static spriteMini(recipe: BlendingRecipe) {
        return recipe.sprite ? `assets/images/blending/${recipe.item}_mini.png` : ItemList[recipe.item].image;
    }

    public static scrollIntoView(recipe: BlendingRecipe) {
        const id = 'recipecard-' + recipe.item;
        return document.getElementById(id).scrollIntoView();
    }

    public static inSelectedList(type?: BlendingRecipeType) {
        const recipeTypes = [];

        const selectedList = BlendingController.selectedRecipeList();
        selectedList.forEach(br => recipeTypes.push(BlendingRecipes.getBlendingRecipeType(br)));
        const typeList = [...new Set(recipeTypes)];

        if (type) {
            return typeList.includes(type);
        } else {
            const fullList = BlendingRecipes.getFullBlendingRecipeList();
            return selectedList.length === fullList.length;
        }
    }

    public static activeCss(recipeType: string) {
        const dropdownId = 'dropdown-' + recipeType;
        const listId = 'recipeList-' + recipeType;
        let active = document.getElementById(listId).classList.contains('show');
        if (active) {
            document.getElementById(dropdownId).classList.remove('active');
        } else {
            document.getElementById(dropdownId).classList.add('active');
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
        const status = BlendingController.flavorKeys[flavor]();
        return BlendingController.flavorKeys[flavor](!status);
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
