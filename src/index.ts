import { resolve } from 'path';

import telegramService from './telegram.service';

import { Storage } from './storage';

async function main() {
    const storage = await Storage.connect({
        host: 'us1-content-kodiak-30614.lambda.store',
        port: 30614,
        password: '53d67785ea004aac8dafc2922a1c349c',
    });

    telegramService.connect('862445875:AAH9A3erTB7V68rDM1iYC__pI77izofjMoY', storage, {
        telegramCommandListenersDir: resolve('dist/telegramCommandListeners'),
        telegramEventListenersDir: resolve('dist/telegramEventListeners'),
    });
}

main();
