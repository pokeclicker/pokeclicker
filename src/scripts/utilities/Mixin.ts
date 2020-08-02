type Constructor<T> = new (...args: any[]) => T;

type ConstructorImplementing<T, K extends keyof T> =
    Constructor< Pick<T, K> & T>