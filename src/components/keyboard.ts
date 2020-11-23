import { InlineKeyboardButton, Message } from 'telegraf/typings/telegram-types';

import telegramService from '../telegram.service';

import { UnexpectedError } from '../errors';

import { ButtonComponent, ButtonState } from './button';

import { SmartComponent, ComponentState, FoolishComponent } from '../interfaces/component';

export interface KeyboardState extends ComponentState {
    description: string;
    buttons: FoolishComponent<ButtonState>[][];
}

export interface ButtonData {
    text: string;
    commandName: string;
}

export class KeyboardComponent extends SmartComponent<KeyboardState> {
    static async create(state: Omit<KeyboardState, 'componentId' | 'buttons'> & { buttons: ButtonData[][] }): Promise<KeyboardComponent> {
        const { chatId, lang } = state;

        const keyboard = await new KeyboardComponent().setState({ ...state, buttons: [] });
        const promisesButtons = state.buttons.map(async (listButtons) => {
            const buttons = Promise.all(listButtons.map(b => ButtonComponent.create({
                ...b,
                lang,
                chatId,
                parentComponentId: keyboard.componentId,
            })));

            return buttons;
        });

        const buttons = await Promise.all(promisesButtons);

        return keyboard.updateState({ ...keyboard.state, buttons });
    }

    async send(): Promise<Message> {
        const { chatId } = this.state;

        const sentMessage = await telegramService.sendMessage(chatId, this.state.description, this.toInlineKeyboardButton());

        const messageId = sentMessage.message_id;
        await Promise.all(this.state.buttons.map(v => v.map(v => v.updateState({ ...v.state, messageId }))));
        await this.updateState({ ...this.state, messageId });

        return sentMessage;
    }

    async update(): Promise<boolean | Message> {
        const { chatId, messageId } = this.state;

        if (!messageId) {
            throw new UnexpectedError('You must send message before update');
        }

        await this.restoreState(this.componentId);

        return telegramService.updateInlineKeyboard(chatId, messageId, this.toInlineKeyboardButton());
    }

    async delete(): Promise<void> { }

    async restore(state: KeyboardState): Promise<this> {
        const promisesButtons = state.buttons.map(async (listButtons) => {
            const buttons = Promise.all(listButtons.map(button => {
                const promiseButton = telegramService.factories.component.factory(button.state.componentId) as Promise<ButtonComponent>;

                return promiseButton;
            }));

            return buttons;
        });

        const buttons = await Promise.all(promisesButtons);
        this.state = { ...this.state, ...state, buttons };

        return this;
    }

    async updateState(state: Partial<Pick<KeyboardState, 'messageId' | 'buttons' | 'description'>>): Promise<this> {
        await telegramService.stateStorage.save(this.componentId, this.name, { ...this.state, ...state });
        this.state = { ...this.state, ...state };

        return this;
    }

    toInlineKeyboardButton(): InlineKeyboardButton[][] {
        return this.state.buttons.map(buttons => buttons.map(button => button.toInlineKeyboardButton()));
    }
}
