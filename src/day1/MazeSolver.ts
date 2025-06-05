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
    seen[curr.y][curr.x] = true;

    if (curr.y === end.y && curr.x === end.x) {
        return true;
    }

    // 2. recurse: pre, recurse, post

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

function solveBFS(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const height = maze.length;
    const width = maze[0].length;

    // Initialize seen matrix
    const seen: boolean[][] = [];
    for (let i = 0; i < height; i++) {
        seen.push(new Array(width).fill(false));
    }

    // Initialize prev matrix to track path
    // Each cell stores the coordinates of its predecessor
    const prev: (Point | null)[][] = [];
    for (let i = 0; i < height; i++) {
        prev.push(new Array(width).fill(null));
    }

    // Mark start as seen
    seen[start.y][start.x] = true;

    // Queue for BFS - now only stores points, not paths
    const queue: Point[] = [start];

    while (queue.length > 0) {
        const curr = queue.shift()!;

        // If we reached the end, reconstruct and return the path
        if (curr.x === end.x && curr.y === end.y) {
            return reconstructPath(prev, start, end);
        }

        // Try all four directions
        for (let i = 0; i < dir.length; i++) {
            const [dx, dy] = dir[i];
            const newX = curr.x + dx;
            const newY = curr.y + dy;

            // Check if valid move
            if (
                newY < 0 ||
                newY >= height ||
                newX < 0 ||
                newX >= width ||
                maze[newY][newX] === wall ||
                seen[newY][newX]
            ) {
                continue;
            }

            const nextPoint = { x: newX, y: newY };
            seen[newY][newX] = true;
            prev[newY][newX] = curr; // Store the previous point

            queue.push(nextPoint);
        }
    }

    // No path found
    return [];
}

// Helper function to reconstruct the path from prev matrix
function reconstructPath(
    prev: (Point | null)[][],
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    let current: Point | null = end;

    // Trace back from end to start
    while (current !== null) {
        path.push(current);

        // Stop if we've reached the start point
        if (current.x === start.x && current.y === start.y) {
            break;
        }

        current = prev[current.y][current.x];
    }

    // Reverse the path to get from start to end
    return path.reverse();
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    // Use BFS to guarantee shortest path
    return solveBFS(maze, wall, start, end);

    /* Original DFS approach:
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
    */
}
