import { CallbackQuery } from 'node-telegram-bot-api';

import { ButtonComponent } from '../components/button';

import { Command, CommandEndCallback } from '../interfaces/command';

export class VoidCommand implements Command {
    readonly name = 'Void';
    async execute(query: CallbackQuery, end: CommandEndCallback, button: ButtonComponent): Promise<boolean> {
        return end('ok');
    }
}
