import fetch from 'node-fetch';
import { MessagePhoto } from 'telegraf/typings/telegram-types';

import telegramService from '../telegram.service';

import { UnexpectedError } from '../errors';

import { ComponentState, SmartComponent } from '../interfaces/component';

export interface PictureState extends ComponentState {
    url: string;
    parentComponentId?: string;
}

type StateArguments = Omit<PictureState, 'componentId'>;

export class PictureComponent extends SmartComponent<PictureState> {
    async send(): Promise<MessagePhoto | null> {
        const { chatId, url } = this.state;
        const response = await fetch(url);

        if (response.ok) {
            const sentMessage = await telegramService.sendPhoto(chatId, response.body);
            await this.updateState({ ...this.state, messageId: sentMessage.message_id });

            return sentMessage;
        }

        return null;
    }

    async update(): Promise<boolean | MessagePhoto> {
        await this.restoreState(this.componentId);
        const { chatId, messageId, url } = this.state;

        if (!messageId) {
            throw new UnexpectedError('You must send message before update');
        }

        const response = await fetch(url);

        if (response.ok) {
            return telegramService.updatePhoto(chatId, messageId, response.body);
        }

        return false;
    }

    async delete(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    static async create(state: StateArguments): Promise<PictureComponent> {
        const button = new PictureComponent();

        return button.setState(state);
    }

    async updateState(state: Pick<PictureState, 'messageId' | 'url'>): Promise<this> {
        this.state = { ...this.state, ...state };
        await telegramService.stateStorage.save(this.state.componentId, this.name, this.state);

        return this;
    }

    async restoreState(componentId: string): Promise<this> {
        const [name, state] = await telegramService.stateStorage.restore(componentId);

        if (this.name !== name) {
            throw new UnexpectedError(`Expended state for ${this.name}, restored state: ${name}`);
        }

        this.state = state as PictureState;

        return this;
    }
}
