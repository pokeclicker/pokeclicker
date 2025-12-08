import { ItemNameType } from '../items/ItemNameType';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';

export default interface ContestItemReward {
    item: ItemNameType,
    amount: KnockoutObservable<number>,
    amountLimit?: number,
    chance?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    displayRequirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}
