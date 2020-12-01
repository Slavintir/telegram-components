import { ObjectId } from 'bson';
import { Markup } from 'telegraf';

import { InlineKeyboardButton } from 'telegraf/typings/markup';
import telegramService from '../telegram.service';

import { FoolishComponent, ComponentState } from '../interfaces/component';

export interface ButtonState extends ComponentState {
    text: string;
    url: string;
    parentComponentId: ObjectId;
}

type StateArguments = Omit<ButtonState, 'componentId'>;

export class UrlButtonComponent extends FoolishComponent<ButtonState> {
    static async create(state: StateArguments): Promise<UrlButtonComponent> {
        const button = new UrlButtonComponent();

        return button.setState(state);
    }

    async setState(state: StateArguments): Promise<this> {
        const componentId = new ObjectId();
        this.state = { ...state, componentId };
        await telegramService.stateStorage.save(componentId, this.name, this.state);

        return this;
    }

    toInlineKeyboardButton(): InlineKeyboardButton {
        const { text, url } = this.state;

        return Markup.urlButton(text, url);
    }
}
