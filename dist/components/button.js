"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonComponent = void 0;
const bson_1 = require("bson");
const telegraf_1 = require("telegraf");
const telegram_service_1 = __importDefault(require("../telegram.service"));
const void_1 = require("../commands/void");
const component_1 = require("../interfaces/component");
class ButtonComponent extends component_1.FoolishComponent {
    get commandName() {
        return this.state.commandName;
    }
    static async create(state) {
        const button = new ButtonComponent();
        return button.setState(state);
    }
    async setState(state) {
        const componentId = new bson_1.ObjectId();
        this.state = Object.assign(Object.assign({}, state), { componentId, commandName: state.commandName || void_1.VoidCommand.name });
        await telegram_service_1.default.stateStorage.save(componentId, this.name, this.state);
        return this;
    }
    toInlineKeyboardButton() {
        const { text, componentId } = this.state;
        return telegraf_1.Markup.callbackButton(text, String(componentId));
    }
}
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.js.map