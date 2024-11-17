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
            // Todo: OneFromMany requirement(Max region or Contest won)
            new BlendingRecipe('PokeBlock_Cool', [3200, 0, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Beautiful', [0, 3200, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Cute', [0, 0, 3200, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Smart', [0, 0, 0, 3200, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Tough', [0, 0, 0, 0, 3200], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Balanced', [2400, 2400, 2400, 2400, 2400], new MaxRegionRequirement(Region.kalos)),
        ],
        [BlendingRecipeType.Alcremie_Sweet]: [
        ],
    };

    public static getBlendingRecipeSet(type: BlendingRecipeType) {
        if (Object.values(BlendingRecipes.blendingRecipeList[type]).some(r => r.isUnlocked())) {
            return Object.values(BlendingRecipes.blendingRecipeList[type]).filter(r => r.isUnlocked());
        } else {
            return;
        }
    }
    
    public static getFullBlendingRecipeList(): BlendingRecipe[] {
        let recipes = [];
        GameHelper.enumNumbers(Object.keys(BlendingRecipes.blendingRecipeList)).flatMap(key => {
            recipes = recipes.concat(BlendingRecipes.getBlendingRecipeSet(key));
        });
        return recipes;
    }
}

