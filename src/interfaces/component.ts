import { v4 as uuid } from 'uuid';
import { InlineKeyboardButton } from 'telegraf/typings/telegram-types';

import { UnexpectedError } from '../errors';
import telegramService from '../telegram.service';

import { Required } from '../helpers/decorators';

export interface ComponentState {
    componentId: string;
    chatId: number;
    messageId?: number;
    lang: string;
}

export abstract class Component<T extends ComponentState> {
    readonly name = this.constructor.name;

    @Required state!: T;

    get componentId(): string {
        return this.state.componentId;
    }

    get lang(): string {
        return this.state.lang;
    }

    async restore(state: T): Promise<this> {
        this.state = state;

        return this;
    }

    async setState(state: Omit<T, 'componentId'>): Promise<this> {
        this.state = { ...state, componentId: uuid() } as T;
        await telegramService.stateStorage.save(this.componentId, this.name, this.state);

        return this;
    }

    async updateState(state: Partial<Omit<T, 'componentId'>>): Promise<this> {
        this.state = { ...this.state, state };
        await telegramService.stateStorage.save(this.componentId, this.name, this.state);

        return this;
    }

    async restoreState(componentId: string): Promise<this> {
        const [name, state] = await telegramService.stateStorage.restore(componentId);

        if (this.name === name) {
            return this.restore(state as T);
        }

        throw new UnexpectedError('State can not be restored', { componentId, expected: this.name, received: name });
    }
}

export abstract class SmartComponent<T extends ComponentState> extends Component<T> {
    async abstract send(): Promise<any>;
    async abstract delete(): Promise<void>;
}

export abstract class FoolishComponent<T extends ComponentState> extends Component<T> {
    abstract toInlineKeyboardButton(): InlineKeyboardButton;
}
