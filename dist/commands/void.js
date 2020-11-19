"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidCommand = void 0;
const command_1 = require("../interfaces/command");
class VoidCommand extends command_1.Command {
    async execute(ctx, query, button) {
        return ctx.answerCbQuery('ok');
    }
}
exports.VoidCommand = VoidCommand;
//# sourceMappingURL=void.js.map