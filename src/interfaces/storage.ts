import { ComponentState } from './component';

export interface StateStorage {
    save(id: string, componentName: string, state: ComponentState): Promise<boolean>;
    restore<T extends ComponentState>(id: string): Promise<[string, T]>;
    delete(id: string): Promise<number>;
}
