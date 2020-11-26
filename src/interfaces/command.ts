import { Context } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/telegram-types';

import { ButtonComponent } from '../components/button';

export type CommandEndCallback = (text: string) => Promise<boolean>;

export abstract class Command {
    readonly name = this.constructor.name;
    abstract execute(ctx: Context, query: CallbackQuery, button: ButtonComponent, params?: object): any;
}
