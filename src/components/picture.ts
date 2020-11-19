import { v4 as uuid } from 'uuid';

import telegramService from '../telegram.service';

import { UnexpectedError } from '../errors';

import { ComponentState, Component } from '../interfaces/component';

export interface PictureState extends ComponentState {
    parentComponentId?: string;
}

type StateArguments = Omit<PictureState, 'componentId'>;

export class PictureComponent extends Component<PictureState> {
    static async create(state: StateArguments): Promise<PictureComponent> {
        const button = new PictureComponent();

        return button.setState(state);
    }

    async restore(state: PictureState): Promise<this> {
        this.state = state;

        return this;
    }

    async setState(state: StateArguments): Promise<this> {
        const componentId = uuid();
        this.state = { ...state, componentId };
        await telegramService.stateStorage.save(componentId, this.name, this.state);

        return this;
    }

    async updateState(state: Pick<PictureState, 'messageId'>): Promise<this> {
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
