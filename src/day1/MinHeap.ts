export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;

        this.heapifyUp(this.length);

        this.length += 1;
    }

    delete(): number {
        if (this.length === 0) return -1;

        const out = this.data[0];
        this.length -= 1;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        // const last = this.data.pop() as number;
        const last = this.data[this.length];
        this.data[0] = last;

        this.heapifyDown(0);

        return out;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) return;

        const parentIndex = this.getParentIndex(idx);
        const parentValue = this.data[parentIndex];

        if (this.data[idx] < parentValue) {
            this.data[parentIndex] = this.data[idx];
            this.data[idx] = parentValue;

            this.heapifyUp(parentIndex);
        }
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;

        const leftIndex = this.getLeftIndex(idx);
        const rightIndex = this.getRightIndex(idx);

        if (leftIndex >= this.length) return;

        const leftValue = this.data[leftIndex];
        const rightValue = this.data[rightIndex];
        const currValue = this.data[idx];

        if (leftValue < rightValue && leftValue < currValue) {
            this.data[leftIndex] = currValue;
            this.data[idx] = leftValue;

            this.heapifyDown(leftIndex);
        } else if (rightValue < leftValue && rightValue < currValue) {
            this.data[rightIndex] = currValue;
            this.data[idx] = rightValue;

            this.heapifyDown(rightIndex);
        }
    }

    private getParentIndex(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftIndex(idx: number): number {
        return idx * 2 + 1;
    }

    private getRightIndex(idx: number): number {
        return idx * 2 + 2;
    }
}
