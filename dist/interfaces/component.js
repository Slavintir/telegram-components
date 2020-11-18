"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoolishComponent = exports.SmartComponent = exports.Component = void 0;
const decorators_1 = require("../helpers/decorators");
class Component {
    constructor() {
        this.name = this.constructor.name;
    }
    get componentId() {
        return this.state.componentId;
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