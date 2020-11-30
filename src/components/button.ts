import { ObjectId } from 'bson';
import { Markup } from 'telegraf';

import { InlineKeyboardButton } from 'telegraf/typings/markup';
import telegramService from '../telegram.service';

import { VoidCommand } from '../commands/void';

import { FoolishComponent, ComponentState } from '../interfaces/component';

export interface ButtonState extends ComponentState {
    text: string;
    commandName: string;
    commandParams?: object;
    parentComponentId: ObjectId;
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

    async setState(state: StateArguments): Promise<this> {
        const componentId = new ObjectId();
        this.state = { ...state, componentId, commandName: state.commandName || VoidCommand.name };
        await telegramService.stateStorage.save(componentId, this.name, this.state);

        return this;
    }

    toInlineKeyboardButton(): InlineKeyboardButton {
        const { text, componentId } = this.state;

        return Markup.callbackButton(text, String(componentId));
    }
}
