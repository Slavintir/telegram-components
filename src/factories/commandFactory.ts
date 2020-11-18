import { AbstractFactory } from '.';

import { StartCommand } from '../commands/start';
import { VoidCommand } from '../commands/void';

import { CommandName } from '../interfaces/command';

export class BaseCommandFactory extends AbstractFactory {
    protected types = {
        [CommandName.Start]: StartCommand,
        [CommandName.Void]: VoidCommand,
    };

    factory(commandName: CommandName) {
        if (Object.prototype.hasOwnProperty.call(this.types, commandName)) {
            return new this.types[commandName]();
        }

        return null;
    }
}
