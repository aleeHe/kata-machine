const dir = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // 1. base cases: wall, out of bound, end, seen
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (
        curr.y < 0 ||
        curr.y >= maze.length ||
        curr.x < 0 ||
        curr.x >= maze[0].length
    ) {
        return false;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    path.push(curr);

    if (curr.y === end.y && curr.x === end.x) {
        return true;
    }

    // 2. recurse: pre, recurse, post

    seen[curr.y][curr.x] = true;

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];
        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
