"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseComponentFactory = void 0;
const telegram_service_1 = __importDefault(require("../telegram.service"));
const keyboard_1 = require("../components/keyboard");
const button_1 = require("../components/button");
const picture_1 = require("../components/picture");
const errors_1 = require("../errors");
const factory_1 = require("../interfaces/factory");
class BaseComponentFactory extends factory_1.AbstractFactory {
    constructor(types = {}) {
        super();
        this.types = {
            [button_1.ButtonComponent.name]: button_1.ButtonComponent,
            [keyboard_1.KeyboardComponent.name]: keyboard_1.KeyboardComponent,
            [picture_1.PictureComponent.name]: picture_1.PictureComponent,
        };
        this.types = Object.assign(Object.assign({}, this.types), types);
    }
    async factory(componentId) {
        const [componentName, state] = await telegram_service_1.default.stateStorage.restore(componentId);
        if (Object.prototype.hasOwnProperty.call(this.types, componentName)) {
            return new this.types[componentName]().restore(state);
        }
        throw new errors_1.UnexpectedError('Component state not found', { componentId });
    }
}
exports.BaseComponentFactory = BaseComponentFactory;
//# sourceMappingURL=componentFactory.js.map