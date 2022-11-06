import CaughtStatus from '../enums/CaughtStatus';
import Item from './Item';

export default abstract class CaughtIndicatingItem extends Item {
    abstract getCaughtStatus(): CaughtStatus;
}
