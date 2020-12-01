"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlButtonComponent = void 0;
const bson_1 = require("bson");
const telegraf_1 = require("telegraf");
const telegram_service_1 = __importDefault(require("../telegram.service"));
const component_1 = require("../interfaces/component");
class UrlButtonComponent extends component_1.FoolishComponent {
    static async create(state) {
        const button = new UrlButtonComponent();
        return button.setState(state);
    }
    async setState(state) {
        const componentId = new bson_1.ObjectId();
        this.state = Object.assign(Object.assign({}, state), { componentId });
        await telegram_service_1.default.stateStorage.save(componentId, this.name, this.state);
        return this;
    }
    toInlineKeyboardButton() {
        const { text, url } = this.state;
        return telegraf_1.Markup.urlButton(text, url);
    }
}
exports.UrlButtonComponent = UrlButtonComponent;
//# sourceMappingURL=urlButton.js.map