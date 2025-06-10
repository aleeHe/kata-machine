function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi) return; // Base case: if section has 0 or 1 element, it's already sorted

    const pivotIdx = partition(arr, lo, hi);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]; // Choose last element as pivot
    let idx = lo - 1; // This tracks where to place the next small element

    // Go through each element (except the pivot)
    for (let i = lo; i < hi; i++) {
        if (arr[i] <= pivot) {
            // If current element is smaller than pivot
            idx += 1; // Move our "small elements" boundary
            // Swap current element with the element at idx
            const tmp = arr[idx];
            arr[idx] = arr[i];
            arr[i] = tmp;
        }
    }

    // Put pivot in its correct position
    idx += 1;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    return idx; // Return pivot's final position
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
