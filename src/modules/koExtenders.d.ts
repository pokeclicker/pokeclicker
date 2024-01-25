import { Subscribable } from 'knockout';

export declare module 'knockout' {
    export interface ExtendersOptions {
        numeric: number;
        boolean: true;
        arrayEquals: true;
        skippableRateLimit: number;
    }
}

export declare global {
    interface SkippableRateLimit extends Subscribable<unknown> {
        evaluateEarly: () => void;
    }
}

export { };