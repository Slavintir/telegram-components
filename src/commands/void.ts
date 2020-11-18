import { CallbackQuery } from 'node-telegram-bot-api';

import telegramService from '../telegram.service';

import { KeyboardComponent } from '../components/keyboard';
import { Command, CommandEndCallback } from '.';
import { ButtonComponent } from '../components/button';
import { CommandName } from '../interfaces/command';

export class VoidCommand implements Command {
    readonly name: CommandName = CommandName.Void;
    async execute(query: CallbackQuery, end: CommandEndCallback, button: ButtonComponent): Promise<boolean> {
        const keyboard = await telegramService.factories.component.factory(button.state.parentComponentId) as KeyboardComponent;
        await button.updateState({ ...button.state, text: 'Unselect' });
        await keyboard.update();

        return end(button.name);
    }
}
