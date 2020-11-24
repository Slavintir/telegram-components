import { Context, Telegraf } from 'telegraf';
import { InlineKeyboardButton, MessagePhoto } from 'telegraf/typings/telegram-types';

import { Required } from './helpers/decorators';
import { DirectoryHelper } from './helpers/directory';

import { BaseCommandFactory } from './factories/commandFactory';
import { BaseComponentFactory } from './factories/componentFactory';

import { StateStorage } from './interfaces/storage';
import { TelegramOptions } from './interfaces/telegram';
import { TelegramCommandListener, TelegramEventListener } from './interfaces/telegramListener';

class TelegramService {
    @Required private bot!: Telegraf<Context>;
    @Required stateStorage!: StateStorage;

    @Required factories!: {
        command: BaseCommandFactory,
        component: BaseComponentFactory,
    }

    async connect(token: string, storage: StateStorage, options?: TelegramOptions) {
        this.stateStorage = storage;
        this.bot = new Telegraf<Context>(token);

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

        return this.bot.startPolling();
    }

    async sendMessage(chatId: string | number, text: string, buttons?: InlineKeyboardButton[][]) {
        if (!buttons) {
            return this.bot.telegram.sendMessage(chatId, text);
        }

        return this.bot.telegram.sendMessage(chatId, text, { reply_markup: { inline_keyboard: buttons } });
    }

    async updateMessage(chatId: string | number, messageId: number, text: string, buttons: InlineKeyboardButton[][]) {
        return this.bot.telegram.editMessageText(chatId, messageId, undefined, text, { reply_markup: { inline_keyboard: buttons } });
    }

    async updateInlineKeyboard(chatId: string | number, messageId: number, buttons: InlineKeyboardButton[][]) {
        return this.bot.telegram.editMessageReplyMarkup(chatId, messageId, undefined, JSON.stringify(buttons));
    }

    async sendPhoto(chatId: string | number, source: NodeJS.ReadableStream) {
        return this.bot.telegram.sendPhoto(chatId, { source });
    }

    async updatePhoto(chatId: string | number, messageId: number, source: NodeJS.ReadableStream): Promise<boolean | MessagePhoto> {
        const t = this.bot.telegram as any;

        return t.editMessageMedia(chatId, messageId, undefined, { media: { source }, type: 'photo' });
    }

    private async initTelegramEventListeners(dir: string): Promise<void> {
        const paths = await DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default as TelegramEventListener)
            .forEach(({ eventName, handler }) => this.bot.on(eventName, async (ctx) => {
                await handler(ctx);
            }));
    }

    private async initTelegramCommandListeners(dir: string): Promise<void> {
        const paths = await DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default as TelegramCommandListener)
            .forEach(({ commandName, handler }) => this.bot.command(commandName, ctx => handler(ctx)));
    }
}

export default new TelegramService();
