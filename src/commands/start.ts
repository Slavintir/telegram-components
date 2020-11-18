import { CallbackQuery } from 'node-telegram-bot-api';

import { Command, CommandEndCallback } from '.';

import { CommandName } from '../interfaces/command';

export class StartCommand implements Command {
    readonly name: CommandName = CommandName.Start;

    async execute(query: CallbackQuery, end: CommandEndCallback): Promise<void> {

    }
}
