export declare module 'knockout' {
    export interface ExtendersOptions {
        numeric: number;
        boolean: true;
        arrayEquals: true;
        skippableRateLimit: number;
    }
}

declare global {
    interface SkippableRateLimit {
        evaluateEarly: () => void;
    }
}