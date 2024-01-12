export declare module 'knockout' {
    export interface ExtendersOptions {
        numeric: number;
        boolean: true;
        arrayEquals: true;
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