import ItemType from '../enums/ItemType';
import Requirement from '../requirements/Requirement';

export default interface BagItem {
    type: ItemType,
    id: string | number,
    requirement?: Requirement,
}
