"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const telegram_service_1 = __importDefault(require("./telegram.service"));
const storage_1 = require("./storage");
async function main() {
    const storage = await storage_1.Storage.connect({
        host: 'us1-content-kodiak-30614.lambda.store',
        port: 30614,
        password: '53d67785ea004aac8dafc2922a1c349c',
    });
    telegram_service_1.default.connect('862445875:AAH9A3erTB7V68rDM1iYC__pI77izofjMoY', storage, {
        telegramCommandListenersDir: path_1.resolve('dist/telegramCommandListeners'),
        telegramEventListenersDir: path_1.resolve('dist/telegramEventListeners'),
    });
}
main();
//# sourceMappingURL=index.js.map