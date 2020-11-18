"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommandFactory = void 0;
const _1 = require(".");
const start_1 = require("../commands/start");
const void_1 = require("../commands/void");
const command_1 = require("../interfaces/command");
class BaseCommandFactory extends _1.AbstractFactory {
    constructor() {
        super(...arguments);
        this.types = {
            [command_1.CommandName.Start]: start_1.StartCommand,
            [command_1.CommandName.Void]: void_1.VoidCommand,
        };
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