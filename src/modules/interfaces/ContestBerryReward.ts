import BerryType from '../enums/BerryType';
import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';

export default interface ContestBerryReward {
    berry: BerryType,
    amount: KnockoutObservable<number>,
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}
