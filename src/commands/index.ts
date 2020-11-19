import { Context } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/telegram-types';
import { ButtonComponent } from '../components/button';

export type CommandEndCallback = (text: string) => Promise<boolean>;

export interface Command {
    readonly name: string;
    execute(ctx: Context, query: CallbackQuery, button: ButtonComponent): any;
}
