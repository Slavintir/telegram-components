import { ObjectId } from 'bson';
import { InlineKeyboardButton } from 'telegraf/typings/markup';

import { UnexpectedError } from '../errors';
import telegramService from '../telegram.service';

import { Required } from '../helpers/decorators';

export interface ComponentState {
    componentId: ObjectId;
    chatId: number;
    messageId?: number;
    lang: string;
}

export abstract class Component<T extends ComponentState> {
    readonly name = this.constructor.name;

    @Required state!: T;

    get componentId(): ObjectId {
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
        this.state = { ...state, componentId: new ObjectId() } as T;
        await telegramService.stateStorage.save(this.componentId, this.name, this.state);

        return this;
    }

    async updateState(state: Partial<Omit<T, 'componentId'>>): Promise<this> {
        this.state = Object.assign(this.state, state);
        await telegramService.stateStorage.save(this.componentId, this.name, this.state);

        return this;
    }

    async restoreState(componentId: ObjectId): Promise<this> {
        const [name, state] = await telegramService.stateStorage.restore(componentId);

        if (this.name === name) {
            return this.restore(state as T);
        }

        throw new UnexpectedError('State can not be restored', { componentId, expected: this.name, received: name });
    }
}

export abstract class SmartComponent<T extends ComponentState> extends Component<T> {
    async abstract send(): Promise<any>;
    async abstract update(): Promise<any>;
    async abstract delete(): Promise<void>;
    async abstract sendMessageByMessageId(messageId: number): Promise<any>;
}

export abstract class FoolishComponent<T extends ComponentState> extends Component<T> {
    abstract toInlineKeyboardButton(): InlineKeyboardButton;
}
