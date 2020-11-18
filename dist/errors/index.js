"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
class UnexpectedError extends Error {
    constructor(message, data) {
        if (data) {
            super(`${message}. Data: ${UnexpectedError.stringify(data)}`);
        }
        super(message);
    }
    static stringify(data) {
        if (typeof data === 'object') {
            return JSON.stringify(data);
        }
        return `${data}`;
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=index.js.map