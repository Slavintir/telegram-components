import { AnswerCallbackQueryOptions, CallbackQuery, Message } from 'node-telegram-bot-api';

export enum EventName {
    CallbackQuery = 'callback_query',
    InlineQuery = 'inline_query',
    PollAnswer = 'poll_answer',
    ChosenInlineResult = 'chosen_inline_result'
}

export type AnswerCallbackQuery = (callbackQueryId: string, options?: Partial<AnswerCallbackQueryOptions>) => Promise<boolean>;

export interface TelegramEventListener {
    readonly eventName: EventName;
    handler(query: CallbackQuery, answerCallbackQuery: AnswerCallbackQuery): Promise<void>
}

export interface TelegramCommandListener {
    readonly commandName: string;
    handler(message: Message, match: RegExpExecArray | null): Promise<void>;
}
