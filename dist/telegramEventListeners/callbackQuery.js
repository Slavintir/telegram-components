"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_service_1 = __importDefault(require("../telegram.service"));
const telegramListener_1 = require("../interfaces/telegramListener");
class CallbackQueryListener {
    constructor() {
        this.eventName = telegramListener_1.EventName.CallbackQuery;
    }
    async handler(query, answerCallbackQuery) {
        if (!query.data) {
            answerCallbackQuery(query.id, { text: 'Ok' });
            return;
        }
        const component = await telegram_service_1.default.factories.component.factory(query.data);
        const command = telegram_service_1.default.factories.command.factory(component.commandName);
        await (command === null || command === void 0 ? void 0 : command.execute(query, (text) => answerCallbackQuery(query.id, { text }), component));
    }
}
exports.default = new CallbackQueryListener();
//# sourceMappingURL=callbackQuery.js.map