import { Message } from 'node-telegram-bot-api';

import { KeyboardComponent } from '../components/keyboard';

import { CommandName } from '../interfaces/command';
import { TelegramCommandListener } from '../interfaces/telegramListener';

class StartCommandListeners implements TelegramCommandListener {
    commandName = CommandName.Start;

    async handler(message: Message, match: RegExpExecArray | null): Promise<void> {
        const [commandName] = match ?? [];
        const { chat: { id } } = message;

        const keyboard = await KeyboardComponent.create({
            chatId: id,
            description: 'Keyboard',
            buttons: [[{ commandName, text: 'Prev' }, { commandName, text: 'Next' }]],
        });

        keyboard.send();
    }
}

export default new StartCommandListeners();
