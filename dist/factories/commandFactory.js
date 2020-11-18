"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommandFactory = void 0;
const void_1 = require("../commands/void");
const factory_1 = require("../interfaces/factory");
class BaseCommandFactory extends factory_1.AbstractFactory {
    constructor(types = {}) {
        super();
        this.types = {
            [void_1.VoidCommand.name]: void_1.VoidCommand,
        };
        this.types = Object.assign(Object.assign({}, this.types), types);
    }
    factory(commandName) {
        if (Object.prototype.hasOwnProperty.call(this.types, commandName)) {
            return new this.types[commandName]();
        }
        return null;
    }
}
exports.BaseCommandFactory = BaseCommandFactory;
//# sourceMappingURL=commandFactory.js.map