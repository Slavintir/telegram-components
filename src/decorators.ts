export function Required(target: { [prop: string]: any }, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        get() {
            throw new Error(`${target.constructor.name}'s property '${propertyKey}' is required`);
        },
        set(value) {
            Object.defineProperty(
                target,
                propertyKey,
                {
                    value,
                    writable: true,
                    configurable: true,
                    enumerable: true,
                },
            );
        },
        configurable: true,
    });
}
