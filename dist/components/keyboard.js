"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardComponent = void 0;
const telegram_service_1 = __importDefault(require("../telegram.service"));
const errors_1 = require("../errors");
const button_1 = require("./button");
const component_1 = require("../interfaces/component");
class KeyboardComponent extends component_1.SmartComponent {
    static async create(state) {
        const { chatId, lang } = state;
        const keyboard = await new KeyboardComponent().setState(Object.assign(Object.assign({}, state), { buttons: [] }));
        const promisesButtons = state.buttons.map(async (listButtons) => {
            const buttons = Promise.all(listButtons.map(b => button_1.ButtonComponent.create(Object.assign(Object.assign({}, b), { lang,
                chatId, parentComponentId: keyboard.componentId }))));
            return buttons;
        });
        const buttons = await Promise.all(promisesButtons);
        return keyboard.updateState(Object.assign(Object.assign({}, keyboard.state), { buttons }));
    }
    async send() {
        const { chatId } = this.state;
        const sentMessage = await telegram_service_1.default.sendMessage(chatId, this.state.description, this.toInlineKeyboardButton());
        const messageId = sentMessage.message_id;
        await Promise.all(this.state.buttons.map(v => v.map(v => v.updateState(Object.assign(Object.assign({}, v.state), { messageId })))));
        await this.updateState(Object.assign(Object.assign({}, this.state), { messageId }));
        return sentMessage;
    }
    async update() {
        const { chatId, messageId } = this.state;
        if (!messageId) {
            throw new errors_1.UnexpectedError('You must send message before update');
        }
        await this.restoreState(this.componentId);
        return telegram_service_1.default.updateInlineKeyboard(chatId, messageId, this.toInlineKeyboardButton());
    }
    async delete() { }
    async restore(state) {
        const promisesButtons = state.buttons.map(async (listButtons) => {
            const buttons = Promise.all(listButtons.map(button => {
                const promiseButton = telegram_service_1.default.factories.component.factory(button.state.componentId);
                return promiseButton;
            }));
            return buttons;
        });
        const buttons = await Promise.all(promisesButtons);
        this.state = Object.assign(Object.assign(Object.assign({}, this.state), state), { buttons });
        return this;
    }
    async updateState(state) {
        await telegram_service_1.default.stateStorage.save(this.componentId, this.name, Object.assign(Object.assign({}, this.state), state));
        this.state = Object.assign(Object.assign({}, this.state), state);
        return this;
    }
    toInlineKeyboardButton() {
        return this.state.buttons.map(buttons => buttons.map(button => button.toInlineKeyboardButton()));
    }
}
exports.KeyboardComponent = KeyboardComponent;
//# sourceMappingURL=keyboard.js.map