"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidCommand = void 0;
class VoidCommand {
    constructor() {
        this.name = 'Void';
    }
    async execute(query, end, button) {
        return end('ok');
    }
}
exports.VoidCommand = VoidCommand;
//# sourceMappingURL=void.js.map