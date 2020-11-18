import { Command } from '../interfaces/command';
import { VoidCommand } from '../commands/void';

import { AbstractFactory, FactoryTypes } from '../interfaces/factory';

export class BaseCommandFactory extends AbstractFactory {
    protected types: FactoryTypes = {
        [VoidCommand.name]: VoidCommand,
    };

    constructor(types: FactoryTypes = { }) {
        super();
        this.types = { ...this.types, ...types };
    }

    factory<T extends Command>(commandName: string): T | null {
        if (Object.prototype.hasOwnProperty.call(this.types, commandName)) {
            return new this.types[commandName]();
        }

        return null;
    }
}
