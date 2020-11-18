"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const command_1 = require("../interfaces/command");
class StartCommand {
    constructor() {
        this.name = command_1.CommandName.Start;
    }
    async execute(query, end) {
    }
}
exports.StartCommand = StartCommand;
//# sourceMappingURL=start.js.map