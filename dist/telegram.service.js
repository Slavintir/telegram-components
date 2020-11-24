"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const decorators_1 = require("./helpers/decorators");
const directory_1 = require("./helpers/directory");
const commandFactory_1 = require("./factories/commandFactory");
const componentFactory_1 = require("./factories/componentFactory");
class TelegramService {
    async connect(token, storage, options) {
        var _a, _b, _c, _d;
        this.stateStorage = storage;
        this.bot = new telegraf_1.Telegraf(token);
        this.factories = {
            command: ((_a = options === null || options === void 0 ? void 0 : options.factories) === null || _a === void 0 ? void 0 : _a.command) ? (_b = options === null || options === void 0 ? void 0 : options.factories) === null || _b === void 0 ? void 0 : _b.command : new commandFactory_1.BaseCommandFactory(),
            component: ((_c = options === null || options === void 0 ? void 0 : options.factories) === null || _c === void 0 ? void 0 : _c.component) ? (_d = options === null || options === void 0 ? void 0 : options.factories) === null || _d === void 0 ? void 0 : _d.component : new componentFactory_1.BaseComponentFactory(),
        };
        if (options === null || options === void 0 ? void 0 : options.telegramCommandListenersDir) {
            await this.initTelegramCommandListeners(options === null || options === void 0 ? void 0 : options.telegramCommandListenersDir);
        }
        if (options === null || options === void 0 ? void 0 : options.telegramEventListenersDir) {
            await this.initTelegramEventListeners(options === null || options === void 0 ? void 0 : options.telegramEventListenersDir);
        }
        return this.bot.startPolling();
    }
    async sendMessage(chatId, text, buttons) {
        if (!buttons) {
            return this.bot.telegram.sendMessage(chatId, text);
        }
        return this.bot.telegram.sendMessage(chatId, text, { reply_markup: { inline_keyboard: buttons } });
    }
    async updateMessage(chatId, messageId, text, buttons) {
        const extra = telegraf_1.Markup.inlineKeyboard(buttons).extra();
        return this.bot.telegram.editMessageText(chatId, messageId, undefined, text, extra);
    }
    async updateInlineKeyboard(chatId, messageId, buttons) {
        return this.bot.telegram.editMessageReplyMarkup(chatId, messageId, undefined, JSON.stringify({ reply_markup: { inline_keyboard: buttons } }));
    }
    async sendPhoto(chatId, source) {
        return this.bot.telegram.sendPhoto(chatId, { source });
    }
    async updatePhoto(chatId, messageId, source) {
        const t = this.bot.telegram;
        return t.editMessageMedia(chatId, messageId, undefined, { media: { source }, type: 'photo' });
    }
    async initTelegramEventListeners(dir) {
        const paths = await directory_1.DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default)
            .forEach(({ eventName, handler }) => this.bot.on(eventName, async (ctx) => {
            await handler(ctx);
        }));
    }
    async initTelegramCommandListeners(dir) {
        const paths = await directory_1.DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default)
            .forEach(({ commandName, handler }) => this.bot.command(commandName, ctx => handler(ctx)));
    }
}
__decorate([
    decorators_1.Required
], TelegramService.prototype, "bot", void 0);
__decorate([
    decorators_1.Required
], TelegramService.prototype, "stateStorage", void 0);
__decorate([
    decorators_1.Required
], TelegramService.prototype, "factories", void 0);
exports.default = new TelegramService();
//# sourceMappingURL=telegram.service.js.map