"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentFactory = void 0;
const telegram_service_1 = __importDefault(require("../telegram.service"));
const _1 = require(".");
const errors_1 = require("../errors");
const keyboard_1 = require("../components/keyboard");
const button_1 = require("../components/button");
const component_1 = require("../interfaces/component");
class BaseComponentFactory extends _1.AbstractFactory {
    constructor() {
        super(...arguments);
        this.types = {
            [component_1.ComponentName.Button]: button_1.ButtonComponent,
            [component_1.ComponentName.Keyboard]: keyboard_1.KeyboardComponent,
        };
    }
    async factory(componentId) {
        const [componentName, state] = await telegram_service_1.default.stateStorage.restore(componentId);
        if (Object.prototype.hasOwnProperty.call(this.types, componentName)) {
            return new this.types[componentName]().restore(state);
        }
        throw new errors_1.UnexpectedError('Commands factory can not create object. Command not implemented', { componentName });
    }
}
exports.BaseComponentFactory = BaseComponentFactory;
//# sourceMappingURL=componentFactory.js.map