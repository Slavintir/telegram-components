import { ObjectId } from 'bson';

import telegramService from '../telegram.service';

import { KeyboardComponent } from '../components/keyboard';
import { ButtonComponent } from '../components/button';
import { PictureComponent } from '../components/picture';

import { UnexpectedError } from '../errors';

import { AbstractFactory, FactoryTypes } from '../interfaces/factory';
import { Component } from '../interfaces/component';

export class BaseComponentFactory extends AbstractFactory {
    protected types: FactoryTypes = {
        [ButtonComponent.name]: ButtonComponent,
        [KeyboardComponent.name]: KeyboardComponent,
        [PictureComponent.name]: PictureComponent,
    };

    constructor(types: FactoryTypes = { }) {
        super();
        this.types = { ...this.types, ...types };
    }

    async factory<T extends Component<any>>(componentId: ObjectId): Promise<T> {
        const [componentName, state] = await telegramService.stateStorage.restore(componentId);

        if (Object.prototype.hasOwnProperty.call(this.types, componentName)) {
            return new this.types[componentName]().restore(state as any);
        }

        throw new UnexpectedError('Component state not found', { componentId });
    }
}
