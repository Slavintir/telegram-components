import { Context } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/telegram-types';

import { ButtonComponent } from '../components/button';

import { Command } from '../interfaces/command';

export class VoidCommand extends Command {
    async execute(ctx: Context, query: CallbackQuery, button: ButtonComponent): Promise<boolean> {
        return ctx.answerCbQuery('ok');
    }
}
