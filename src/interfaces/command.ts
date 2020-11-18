import { CallbackQuery } from 'node-telegram-bot-api';

import { ButtonComponent } from '../components/button';

export type CommandEndCallback = (text: string) => Promise<boolean>;

export abstract class Command {
    readonly name = this.constructor.name;
    abstract execute(query: CallbackQuery, end: CommandEndCallback, button: ButtonComponent): any;
}
