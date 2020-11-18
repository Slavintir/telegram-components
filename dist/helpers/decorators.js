"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Required = void 0;
function Required(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        get() {
            throw new Error(`${target.constructor.name}'s property '${propertyKey}' is required`);
        },
        set(value) {
            Object.defineProperty(target, propertyKey, {
                value,
                writable: true,
                configurable: true,
                enumerable: true,
            });
        },
        configurable: true,
    });
}
exports.Required = Required;
//# sourceMappingURL=decorators.js.map