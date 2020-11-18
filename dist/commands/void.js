"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidCommand = void 0;
const telegram_service_1 = __importDefault(require("../telegram.service"));
const command_1 = require("../interfaces/command");
class VoidCommand {
    constructor() {
        this.name = command_1.CommandName.Void;
    }
    async execute(query, end, button) {
        const keyboard = await telegram_service_1.default.factories.component.factory(button.state.parentComponentId);
        await button.updateState(Object.assign(Object.assign({}, button.state), { text: 'Unselect' }));
        await keyboard.update();
        return end(button.name);
    }
}
exports.VoidCommand = VoidCommand;
//# sourceMappingURL=void.js.map