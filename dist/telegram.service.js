"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const decorators_1 = require("./decorators");
const commandFactory_1 = require("./factories/commandFactory");
const componentFactory_1 = require("./factories/componentFactory");
const directory_1 = require("./helpers/directory");
class TelegramService {
    async connect(token, storage, options) {
        var _a, _b, _c, _d;
        this.stateStorage = storage;
        this.bot = new node_telegram_bot_api_1.default(token, { polling: true });
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
        console.info('Successfully connected to telegram');
    }
    async sendMessage(chatId, text, options) {
        return this.bot.sendMessage(chatId, text, options);
    }
    async updateInlineKeyboard(chatId, messageId, replyMarkup) {
        return this.bot.editMessageReplyMarkup(replyMarkup, { message_id: messageId, chat_id: chatId });
    }
    async initTelegramEventListeners(dir) {
        const paths = await directory_1.DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default)
            .forEach(({ eventName, handler }) => this.bot.on(eventName, async (query) => {
            const answerCallbackQuery = this.bot.answerCallbackQuery.bind(this.bot);
            await handler(query, answerCallbackQuery);
        }));
    }
    async initTelegramCommandListeners(dir) {
        const paths = await directory_1.DirectoryHelper.recursiveReadDir(dir, ['.js']);
        paths.map(path => require(path).default)
            .forEach(({ commandName, handler }) => this.bot.onText(new RegExp(`/${commandName}`), (msg, match) => handler(msg, match)));
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