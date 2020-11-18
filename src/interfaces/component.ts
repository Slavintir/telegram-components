import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { Required } from '../helpers/decorators';

export interface ComponentState {
    componentId: string;
    chatId: number;
    messageId?: number;
}

export abstract class Component<T extends ComponentState> {
    abstract readonly name: string;

    @Required state!: T;

    get componentId(): string {
        return this.state.componentId;
    }

    abstract async restore(state: T): Promise<this>;

    async abstract setState(state: T): Promise<this>;
    async abstract updateState(state: T): Promise<this>;
    async abstract restoreState(componentId: string): Promise<this>;
}

export abstract class SmartComponent<T extends ComponentState> extends Component<T> {
    async abstract send(): Promise<any>;
    async abstract delete(): Promise<void>;
}

export abstract class FoolishComponent<T extends ComponentState> extends Component<T> {
    abstract toInlineKeyboardButton(): InlineKeyboardButton;
}
