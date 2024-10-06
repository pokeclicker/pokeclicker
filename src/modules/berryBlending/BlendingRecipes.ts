import BlendingRecipeType from '../enums/BlendingRecipeType';
import { Region } from '../GameConstants';
import GameHelper from '../GameHelper';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import BlendingRecipe from './BlendingRecipe';

export default class BlendingRecipes {
    public static blendingRecipeList: Record<BlendingRecipeType, BlendingRecipe[]> = {
        [BlendingRecipeType.Pokeblocks]: [
            new BlendingRecipe('PokeBlock_Red', [40, 0, 0, 0, 0]),
            new BlendingRecipe('PokeBlock_Blue', [0, 40, 0, 0, 0]),
            new BlendingRecipe('PokeBlock_Pink', [0, 0, 40, 0, 0]),
            new BlendingRecipe('PokeBlock_Green', [0, 0, 0, 40, 0]),
            new BlendingRecipe('PokeBlock_Yellow', [0, 0, 0, 0, 40]),
            // Todo: OneFromMany requirement(Max region or Contest won)
            new BlendingRecipe('PokeBlock_Red_Plus', [3200, 0, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Blue_Plus', [0, 3200, 0, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Pink_Plus', [0, 0, 3200, 0, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Green_Plus', [0, 0, 0, 3200, 0], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Yellow_Plus', [0, 0, 0, 0, 3200], new MaxRegionRequirement(Region.kalos)),
            new BlendingRecipe('PokeBlock_Rainbow', [2400, 2400, 2400, 2400, 2400], new MaxRegionRequirement(Region.kalos)),
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

