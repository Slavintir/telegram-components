"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidCommand = void 0;
const command_1 = require("../interfaces/command");
class VoidCommand extends command_1.Command {
    async execute(query, end, button) {
        return end('ok');
    }
}
exports.VoidCommand = VoidCommand;
//# sourceMappingURL=void.js.map