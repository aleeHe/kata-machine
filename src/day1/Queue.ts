type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node: Node<T> = { value: item };

        this.length += 1;

        if (!this.head || !this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) return undefined;

        this.length -= 1;

        const head = this.head;
        this.head = this.head.next;

        head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
