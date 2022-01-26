interface IGenericProxy {
    new <T extends object, H extends object>(target: T, handler: ProxyHandler<T>): H;
}
declare const GenericProxy: IGenericProxy;
