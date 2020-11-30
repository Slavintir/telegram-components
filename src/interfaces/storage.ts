import { ObjectId } from 'bson';

import { ComponentState } from './component';

export interface StateStorage {
    save(id: ObjectId, componentName: string, state: ComponentState): Promise<boolean>;
    restore<T extends ComponentState>(id: ObjectId): Promise<[string, T]>;
    delete(id: ObjectId): Promise<number>;
}
