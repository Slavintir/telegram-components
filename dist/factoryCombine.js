"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombineFactories = void 0;
class CombineFactories {
    constructor(factories) {
        this.factories = factories;
    }
    factory(...params) {
        var _a, _b;
        return (_b = (_a = this.factories.find(f => f.factory(...params))) === null || _a === void 0 ? void 0 : _a.factory(...params)) !== null && _b !== void 0 ? _b : null;
    }
}
exports.CombineFactories = CombineFactories;
//# sourceMappingURL=factoryCombine.js.map