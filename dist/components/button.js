"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonComponent = void 0;
const uuid_1 = require("uuid");
const telegram_service_1 = __importDefault(require("../telegram.service"));
const errors_1 = require("../errors");
const component_1 = require("../interfaces/component");
class ButtonComponent extends component_1.FoolishComponent {
    constructor() {
        super(...arguments);
        this.name = 'Button';
    }
    get commandName() {
        return this.state.commandName;
    }
    static async create(state) {
        const button = new ButtonComponent();
        return button.setState(state);
    }
    async restore(state) {
        this.state = state;
        return this;
    }
    async setState(state) {
        const componentId = uuid_1.v4();
        this.state = Object.assign(Object.assign({}, state), { componentId, commandName: 'Void' });
        await telegram_service_1.default.stateStorage.save(componentId, this.name, this.state);
        return this;
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
    toInlineKeyboardButton() {
        const { text, componentId } = this.state;
        return { text, callback_data: componentId };
    }
}
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.js.map