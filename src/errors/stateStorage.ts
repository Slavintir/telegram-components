import { UnexpectedError } from '.';

export class StateNotFound extends UnexpectedError {
    constructor(id: string) {
        super('State of component not found', { id });
    }
}
