import { CallbackQuery } from 'node-telegram-bot-api';

import { ButtonComponent } from '../components/button';

import { CommandName } from '../interfaces/command';

export type CommandEndCallback = (text: string) => Promise<boolean>;

export interface Command {
    readonly name: CommandName;
    execute(query: CallbackQuery, end: CommandEndCallback, button: ButtonComponent): any;
}
