import getUniqueId from '../utilities/uniqueId';
import { LogBookType } from './LogBookTypes';

// unique id for use in React key

export default class LogBookLog {
    constructor(
        public type: LogBookType = {
            display: 'dark',
            label: 'OTHER',
        },
        public description: string = 'Unknown entry',
        public date: number = Date.now(),
        public id = getUniqueId(),
    ) {}
}
