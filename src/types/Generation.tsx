import Cell from './Cell';

type Generation = {
    n: number,
    rowsLength: number,
    columnsLength: number,
    grid: Array<Array<Cell>>,
};

const countNeighbors = (generation: Generation, x: number, y: number): number => {
    var neighbors = 0;

    const coords = [
        [-1, -1], [+0, -1], [+1, -1],
        [-1, +0],           [+1, +0],
        [-1, +1], [+0, +1], [+1, +1],
    ];

    for (var i  = 0; i < coords.length; i++) {
        const [dx, dy] = coords[i];
        const cell = generation.grid?.[y+dy]?.[x+dx];

        (cell === Cell.Alive) && neighbors++;
    }

    return neighbors;
};

const cloneGeneration = (generation: Generation): Generation => {
    return JSON.parse(JSON.stringify(generation));
};

const getNextGeneration = (generation: Generation): Generation => {
    const next: Generation = cloneGeneration(generation);
    next.n++;

    generation.grid.forEach((row, y) => {
        next.grid[y] = [];
        row.forEach((cell, x) => {
            const neighbors = countNeighbors(generation, x, y);

            if (cell === Cell.Alive) {
                //Any live cell with fewer than two live neighbours dies.
                // Any live cell with more than three live neighbours dies.
                if (neighbors < 2 || neighbors > 3) next.grid[y][x] = Cell.Dead;

                //Any live cell with two or three live neighbours lives on to the next generation.
                else next.grid[y][x] = Cell.Alive;
            } else {
                //Any dead cell with exactly three live neighbours becomes a live cell.
                if (neighbors === 3) next.grid[y][x] = Cell.Alive;
                else next.grid[y][x] = Cell.Dead;
            }
        });
    });

    return next;
};

const toggleCell = (generation: Generation, x: number, y: number): Generation => {
    const newGeneration = cloneGeneration(generation);
    newGeneration.grid[y][x] = newGeneration.grid[y][x] === Cell.Alive ? Cell.Dead : Cell.Alive;
    return newGeneration;
};

export default Generation;
export { getNextGeneration, toggleCell };