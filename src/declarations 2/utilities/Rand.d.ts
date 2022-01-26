/// <reference path="./SeededRand.d.ts"/>
declare class Rand extends SeededRand {
    static next(): number;
}
