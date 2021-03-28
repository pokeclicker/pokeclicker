interface IGenericProxy {
    new <T extends object, H extends object>(target: T, handler: ProxyHandler<T>): H
}

const GenericProxy = Proxy as IGenericProxy;

export default GenericProxy;
