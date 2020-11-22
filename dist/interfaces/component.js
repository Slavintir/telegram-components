"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoolishComponent = exports.SmartComponent = exports.Component = void 0;
const uuid_1 = require("uuid");
const errors_1 = require("../errors");
const telegram_service_1 = __importDefault(require("../telegram.service"));
const decorators_1 = require("../helpers/decorators");
class Component {
    constructor() {
        this.name = this.constructor.name;
    }
    get componentId() {
        return this.state.componentId;
    }
    get lang() {
        return this.state.lang;
    }
    async restore(state) {
        this.state = state;
        return this;
    }
    async setState(state) {
        this.state = Object.assign(Object.assign({}, state), { componentId: uuid_1.v4() });
        await telegram_service_1.default.stateStorage.save(this.componentId, this.name, this.state);
        return this;
    }
    async updateState(state) {
        this.state = Object.assign(Object.assign({}, this.state), { state });
        await telegram_service_1.default.stateStorage.save(this.componentId, this.name, this.state);
        return this;
    }
    async restoreState(componentId) {
        const [name, state] = await telegram_service_1.default.stateStorage.restore(componentId);
        if (this.name === name) {
            return this.restore(state);
        }
        throw new errors_1.UnexpectedError('State can not be restored', { componentId, expected: this.name, received: name });
    }
}
__decorate([
    decorators_1.Required
], Component.prototype, "state", void 0);
exports.Component = Component;
class SmartComponent extends Component {
}
exports.SmartComponent = SmartComponent;
class FoolishComponent extends Component {
}
exports.FoolishComponent = FoolishComponent;
//# sourceMappingURL=component.js.map