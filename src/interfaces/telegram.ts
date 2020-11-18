import { BaseCommandFactory } from '../factories/commandFactory';
import { BaseComponentFactory } from '../factories/componentFactory';

export interface TelegramOptions {
    telegramEventListenersDir?: string;
    telegramCommandListenersDir?: string;
    factories?: {
        command?: BaseCommandFactory,
        component?: BaseComponentFactory,
    }
}
