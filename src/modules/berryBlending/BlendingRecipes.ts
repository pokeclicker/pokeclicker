import BlendingRecipeType from '../enums/BlendingRecipeType';
import { Region } from '../GameConstants';
import GameHelper from '../GameHelper';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import BlendingRecipe from './BlendingRecipe';

export default class BlendingRecipes {
    public static blendingRecipeList: Record<BlendingRecipeType, BlendingRecipe[]> = {
        [BlendingRecipeType.Contest_Appeal]: [
            new BlendingRecipe('PokeBlock_Red', [40, 0, 0, 0, 0]),
            new BlendingRecipe('PokeBlock_Blue', [0, 40, 0, 0, 0]),
            new BlendingRecipe('PokeBlock_Pink', [0, 0, 40, 0, 0]),
            new BlendingRecipe('PokeBlock_Green', [0, 0, 0, 40, 0]),
            new BlendingRecipe('PokeBlock_Yellow', [0, 0, 0, 0, 40]),
            new BlendingRecipe('PokeBlock_White', [10, 10, 10, 10, 10]),
        ],
        [BlendingRecipeType.Contest_Type]: [
            // Todo: proper requirements
            new BlendingRecipe('PokeBlock_Purple', [80, 80, 0, 0, 0]),
            new BlendingRecipe('PokeBlock_Indigo', [0, 80, 80, 0, 0]),
            new BlendingRecipe('PokeBlock_Brown', [0, 0, 80, 80, 0]),
            new BlendingRecipe('PokeBlock_Olive', [0, 0, 0, 80, 80]),
            new BlendingRecipe('PokeBlock_Orange', [80, 0, 0, 0, 80]),
            new BlendingRecipe('PokeBlock_Black', [5, 5, 5, 5, 5]),
            new BlendingRecipe('PokeBlock_Cool', [3200, 0, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Beautiful', [0, 3200, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Cute', [0, 0, 3200, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Smart', [0, 0, 0, 3200, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Tough', [0, 0, 0, 0, 3200], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Balanced', [2400, 2400, 2400, 2400, 2400], new MaxRegionRequirement(Region.kalos)),
        ],
        [BlendingRecipeType.Alcremie_Sweet]: [
        ],
        // Keep Event recipes at bottom. Add new recipes anywhere above
        [BlendingRecipeType.Event]: [
        ],
    };

    public static recipeSet(type: BlendingRecipeType): BlendingRecipe[] {
        return Object.values(BlendingRecipes.blendingRecipeList[type]);
    }

    public static isUnlocked(type: BlendingRecipeType): boolean {
        return BlendingRecipes.getBlendingRecipeSet(type).some(r => r.isUnlocked());
    }

    public static getBlendingRecipeSet(type: BlendingRecipeType, filter: boolean = true): BlendingRecipe[] {
        const recipes = BlendingRecipes.recipeSet(type);
        if (filter) {
            return recipes.filter(r => r.isUnlocked());
        } else {
            return recipes;
        }
    }
    
    public static getFullBlendingRecipeList(filter: boolean = true): BlendingRecipe[] {
        let recipes = [];
        GameHelper.enumNumbers(BlendingRecipeType).flatMap(key => {
            if (BlendingRecipes.isUnlocked(key) || !filter) {
                recipes = recipes.concat(BlendingRecipes.getBlendingRecipeSet(key, filter));
            }
        });
        return recipes;
    }

    public static getBlendingRecipeType(recipe: BlendingRecipe) {
        return BlendingRecipeType[(Object.keys(BlendingRecipes.blendingRecipeList).filter((v)=>BlendingRecipes.blendingRecipeList[v].includes(recipe)))[0]];
    }

    public static getRecipeCompletion() {
        const total = BlendingRecipes.getFullBlendingRecipeList(false).length - BlendingRecipes.getBlendingRecipeSet(BlendingRecipeType.Event, false).length;
        const have = BlendingRecipes.getFullBlendingRecipeList().length - BlendingRecipes.getBlendingRecipeSet(BlendingRecipeType.Event).length;
        return `${have} out of ${total}`;
    }
}

