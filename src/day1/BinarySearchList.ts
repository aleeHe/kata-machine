export default function bs_list(haystack: number[], needle: number): boolean {
    let lowIndex = 0;
    let highIndex = haystack.length;

    do {
        let midIndex = Math.floor(lowIndex + (highIndex - lowIndex) / 2);
        let midValue = haystack[midIndex];

        if (needle === midValue) {
            return true;
        } else if (needle > midValue) {
            lowIndex = midIndex + 1;
        } else {
            highIndex = midIndex;
        }
    } while (lowIndex < highIndex);

    return false;
}
