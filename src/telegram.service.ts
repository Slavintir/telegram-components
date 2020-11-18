import TelegramBot, { SendMessageOptions, Message, InlineKeyboardMarkup } from 'node-telegram-bot-api';

import { Required } from './decorators';

import { BaseCommandFactory } from './factories/commandFactory';
import { BaseComponentFactory } from './factories/componentFactory';

import { StateStorage } from './interfaces/storage';
import { TelegramOptions } from './interfaces/telegram';
import { DirectoryHelper } from './helpers/directory';
import { TelegramCommandListener, TelegramEventListener } from './interfaces/telegramListener';

class TelegramService {
    @Required private bot!: TelegramBot;
    @Required stateStorage!: StateStorage;

    @Required factories!: {
        command: BaseCommandFactory,
        component: BaseComponentFactory,
    }

    async connect(token: string, storage: StateStorage, options?: TelegramOptions) {
        this.stateStorage = storage;
        this.bot = new TelegramBot(token, { polling: true });

        this.factories = {
            command: options?.factories?.command ? options?.factories?.command : new BaseCommandFactory(),
            component: options?.factories?.component ? options?.factories?.component : new BaseComponentFactory(),
        };

        if (options?.telegramCommandListenersDir) {
            await this.initTelegramCommandListeners(options?.telegramCommandListenersDir);
        }

        if (options?.telegramEventListenersDir) {
            await this.initTelegramEventListeners(options?.telegramEventListenersDir);
        }

        console.info('Successfully connected to telegram');
    }

    async sendMessage(chatId: string | number, text: string, options?: SendMessageOptions): Promise<Message> {
        return this.bot.sendMessage(chatId, text, options);
    }

    async updateInlineKeyboard(chatId: string | number, messageId: number, replyMarkup: InlineKeyboardMarkup): Promise<boolean | Message> {
        return this.bot.editMessageReplyMarkup(replyMarkup, { message_id: messageId, chat_id: chatId });
    }

    private async initTelegramEventListeners(dir: string): Promise<void> {
        const paths = await DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default as TelegramEventListener)
            .forEach(({ eventName, handler }) => this.bot.on(eventName as any, async (query) => {
                const answerCallbackQuery = this.bot.answerCallbackQuery.bind(this.bot);
                await handler(query, answerCallbackQuery);
            }));
    }

    private async initTelegramCommandListeners(dir: string): Promise<void> {
        const paths = await DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default as TelegramCommandListener)
            .forEach(({ commandName, handler }) => this.bot.onText(new RegExp(`/${commandName}`), (msg, match) => handler(msg, match)));
    }
}

export default new TelegramService();
