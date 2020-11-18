import { InlineKeyboardButton } from 'node-telegram-bot-api';
import { v4 as uuid } from 'uuid';

import telegramService from '../telegram.service';

import { UnexpectedError } from '../errors';

import { FoolishComponent, ComponentState } from '../interfaces/component';
import { VoidCommand } from 'src/commands/void';

export interface ButtonState extends ComponentState {
    text: string;
    commandName: string;
    parentComponentId: string;
}

type StateArguments = Omit<ButtonState, 'componentId' | 'commandName'> & { commandName?: string };

export class ButtonComponent extends FoolishComponent<ButtonState> {
    get commandName(): string {
        return this.state.commandName;
    }

    static async create(state: StateArguments): Promise<ButtonComponent> {
        const button = new ButtonComponent();

        return button.setState(state);
    }

    async restore(state: ButtonState): Promise<this> {
        this.state = state;

        return this;
    }

    async setState(state: StateArguments): Promise<this> {
        const componentId = uuid();
        this.state = { ...state, componentId, commandName: VoidCommand.name };
        await telegramService.stateStorage.save(componentId, this.name, this.state);

        return this;
    }

    async updateState(state: Pick<ButtonState, 'messageId' | 'text' | 'commandName'>): Promise<this> {
        this.state = { ...this.state, ...state };
        await telegramService.stateStorage.save(this.state.componentId, this.name, this.state);

        return this;
    }

    async restoreState(componentId: string): Promise<this> {
        const [name, state] = await telegramService.stateStorage.restore(componentId);

        if (this.name !== name) {
            throw new UnexpectedError(`Expended state for ${this.name}, restored state: ${name}`);
        }

        this.state = state as ButtonState;

        return this;
    }

    toInlineKeyboardButton(): InlineKeyboardButton {
        const { text, componentId } = this.state;

        return { text, callback_data: componentId };
    }
}
