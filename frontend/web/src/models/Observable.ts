export class Observable<T>  {
    constructor() {
        this.subscriber = [];       
    }
    private objectValue: T | undefined;
    private subscriber: Function[];

    subscribe(sub: Function) {
        this.subscriber.push(sub);
        sub(this.value);
    }

    set value(val: T | undefined) {
        this.objectValue = val;
        this.subscriber.forEach(x => x(this.objectValue));
    }

    get value(): T | undefined {
        return this.objectValue;
    }
}