import type { Subscribable } from 'knockout';
export interface ArrayEqualsOptions {
    enabled: Subscribable | true;
    inverted?: boolean;
}

export declare module 'knockout' {
    export interface ExtendersOptions {
        numeric: number;
        boolean: true;
        arrayEquals: ArrayEqualsOptions | undefined;
        skippableRateLimit: number;
    }

    export interface BindingHandlers {
        contentEditable;
    }
}

declare global {
    interface SkippableRateLimit {
        evaluateEarly: () => void;
    }
}