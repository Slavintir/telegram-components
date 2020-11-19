import { Context } from 'telegraf';
import { UpdateType } from 'telegraf/typings/telegram-types';

export type EventName = UpdateType

export interface TelegramEventListener {
    readonly eventName: EventName;
    handler(ctx: Context): Promise<void>
}

export interface TelegramCommandListener {
    readonly commandName: string;
    handler(ctx: Context): Promise<void>;
}
