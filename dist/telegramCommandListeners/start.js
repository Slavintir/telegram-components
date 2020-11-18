"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = require("../components/keyboard");
const command_1 = require("../interfaces/command");
class StartCommandListeners {
    constructor() {
        this.commandName = command_1.CommandName.Start;
    }
    async handler(message, match) {
        const [commandName] = match !== null && match !== void 0 ? match : [];
        const { chat: { id } } = message;
        const keyboard = await keyboard_1.KeyboardComponent.create({
            chatId: id,
            description: 'Keyboard',
            buttons: [[{ commandName, text: 'Prev' }, { commandName, text: 'Next' }]],
        });
        keyboard.send();
    }
}
exports.default = new StartCommandListeners();
//# sourceMappingURL=start.js.map