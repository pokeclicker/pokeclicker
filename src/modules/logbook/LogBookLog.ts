import { LogBookType } from './LogBookTypes';

export default class LogBookLog {
    public type: LogBookType;
    public description: string;
    public date: number;

    constructor(type: LogBookType, description: string, date: number = Date.now()) {
        this.date = date;
        this.type = type;
        this.description = description;
    }
}
