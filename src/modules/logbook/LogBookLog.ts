import { LogBookType } from './LogBookTypes';

export default class LogBookLog {
    constructor(
        public type: LogBookType = {
            display: 'dark',
            label: 'OTHER',
        },
        public description: string = 'Unknown entry',
        public date: number = Date.now(),
    ) {}
}
