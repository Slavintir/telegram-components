import { AbstractFactory } from './factories';

export class CombineFactories {
    constructor(private factories: AbstractFactory[]) { }

    factory(...params: any): any | null {
        return this.factories.find(f => f.factory(...params))?.factory(...params) ?? null;
    }
}
