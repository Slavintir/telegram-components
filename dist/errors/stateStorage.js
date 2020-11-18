"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNotFound = void 0;
const _1 = require(".");
class StateNotFound extends _1.UnexpectedError {
    constructor(id) {
        super('State of component not found', { id });
    }
}
exports.StateNotFound = StateNotFound;
//# sourceMappingURL=stateStorage.js.map