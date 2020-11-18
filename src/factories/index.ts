export abstract class AbstractFactory {
    protected abstract types: { [key in string]: any };

    abstract factory(...params: any[]): any | null;
}
