/// <reference path="./LogBookTypes.d.ts"/>
declare class LogBookLog {
    type: LogBookType;
    description: string;
    date: number;
    constructor(type: LogBookType, description: string, date?: number);
}
