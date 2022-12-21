import ItemType from '../enums/ItemType';

export default interface BagItem {
    type: ItemType,
    id: string | number,
}
