"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureComponent = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const telegram_service_1 = __importDefault(require("../telegram.service"));
const errors_1 = require("../errors");
const component_1 = require("../interfaces/component");
class PictureComponent extends component_1.SmartComponent {
    async send() {
        const { chatId, url } = this.state;
        const response = await node_fetch_1.default(url);
        if (response.ok) {
            const sentMessage = await telegram_service_1.default.sendPhoto(chatId, response.body);
            await this.setState(Object.assign(Object.assign({}, this.state), { messageId: sentMessage.message_id }));
            return sentMessage;
        }
        return null;
    }
    async update() {
        await this.restoreState(this.componentId);
        const { chatId, messageId, url } = this.state;
        if (!messageId) {
            throw new errors_1.UnexpectedError('You must send message before update');
        }
        const response = await node_fetch_1.default(url);
        if (response.ok) {
            return telegram_service_1.default.updatePhoto(chatId, messageId, response.body);
        }
        return false;
    }
    async sendMessageByMessageId(messageId) {
        const { chatId, url } = this.state;
        const response = await node_fetch_1.default(url);
        if (response.ok) {
            const sentMessage = await telegram_service_1.default.updatePhoto(chatId, messageId, response.body);
            await this.setState(Object.assign(Object.assign({}, this.state), { messageId }));
            return sentMessage;
        }
        return false;
    }
    async delete() {
        throw new Error('Method not implemented.');
    }
    static async create(state) {
        const button = new PictureComponent();
        return button.setState(state);
    }
    async updateState(state) {
        this.state = Object.assign(Object.assign({}, this.state), state);
        await telegram_service_1.default.stateStorage.save(this.state.componentId, this.name, this.state);
        return this;
    }
    async restoreState(componentId) {
        const [name, state] = await telegram_service_1.default.stateStorage.restore(componentId);
        if (this.name !== name) {
            throw new errors_1.UnexpectedError(`Expended state for ${this.name}, restored state: ${name}`);
        }
        this.state = state;
        return this;
    }
}
exports.PictureComponent = PictureComponent;
//# sourceMappingURL=picture.js.map