import { CallbackQuery } from 'node-telegram-bot-api';

import { ButtonComponent } from '../components/button';

import telegramService from '../telegram.service';

import { EventName, TelegramEventListener, AnswerCallbackQuery } from '../interfaces/telegramListener';

class CallbackQueryListener implements TelegramEventListener {
    eventName = EventName.CallbackQuery;

    async handler(query: CallbackQuery, answerCallbackQuery: AnswerCallbackQuery): Promise<void> {
        if (!query.data) {
            answerCallbackQuery(query.id, { text: 'Ok' });

            return;
        }

        const component = await telegramService.factories.component.factory(query.data) as ButtonComponent;
        const command = telegramService.factories.command.factory(component.commandName);
        await command?.execute(query, (text) => answerCallbackQuery(query.id, { text }), component);
    }
}

export default new CallbackQueryListener();
