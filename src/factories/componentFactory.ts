import telegramService from '../telegram.service';

import { AbstractFactory } from '.';

import { UnexpectedError } from '../errors';

import { KeyboardComponent } from '../components/keyboard';
import { ButtonComponent } from '../components/button';

import { ComponentName } from '../interfaces/component';

export class BaseComponentFactory extends AbstractFactory {
    protected types = {
        [ComponentName.Button]: ButtonComponent,
        [ComponentName.Keyboard]: KeyboardComponent,
    };

    async factory(componentId: string) {
        const [componentName, state] = await telegramService.stateStorage.restore(componentId);

        if (Object.prototype.hasOwnProperty.call(this.types, componentName)) {
            return new this.types[componentName as ComponentName]().restore(state as any);
        }

        throw new UnexpectedError('Commands factory can not create object. Command not implemented', { componentName });
    }
}
