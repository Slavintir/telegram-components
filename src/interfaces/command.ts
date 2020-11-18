import { CallbackQuery } from 'node-telegram-bot-api';

import { ButtonComponent } from '../components/button';

export type CommandEndCallback = (text: string) => Promise<boolean>;

export interface Command {
    readonly name: string;
    execute(query: CallbackQuery, end: CommandEndCallback, button: ButtonComponent): any;
}
