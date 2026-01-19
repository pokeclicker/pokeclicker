import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';

export default interface ContestTrainerOptions {
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}
