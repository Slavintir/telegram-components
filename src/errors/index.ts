export class UnexpectedError extends Error {
    constructor(message: string, data?: object | unknown[]) {
        if (data) {
            super(`${message}. Data: ${UnexpectedError.stringify(data)}`);
        }

        super(message);
    }

    private static stringify(data: object): string;
    private static stringify(data: unknown[]): string;
    private static stringify(data: any): string {
        if (typeof data === 'object') {
            return JSON.stringify(data);
        }

        return `${data}`;
    }
}
