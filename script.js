let rows = 20;
let cols = 20;
let grid = createRandomGrid(rows, cols);

const gridContainer = document.getElementById('grid');
const clearButton = document.getElementById('clearButton');
const randomButton = document.getElementById('randomButton');
const generationElement = document.getElementById('generation');

clearButton.addEventListener('click', clearGrid);
randomButton.addEventListener('click', addRandomCells);

function createRandomGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random() > 0.5));
}

function renderGrid(grid) {
    gridContainer.style.setProperty('--rows', rows);
    gridContainer.style.setProperty('--cols', cols);
    gridContainer.innerHTML = '';
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElem = document.createElement('div');
            cellElem.classList.add('cell');
            cellElem.dataset.row = i;
            cellElem.dataset.col = j;
            if (cell) cellElem.classList.add('alive');
            gridContainer.appendChild(cellElem);
        });
    });
}

function clearGrid() {
    grid = createEmptyGrid(rows, cols);
    renderGrid(grid);
    generation = 0;
    updateGeneration();
}

function addRandomCells() {
    grid.forEach((row, i) => {
        row.forEach((_, j) => {
            if (Math.random() > 0.5) grid[i][j] = true;
        });
    });
    renderGrid(grid);
}

function updateGeneration() {
    generationElement.textContent = parseInt(generationElement.textContent) + 1;
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const neighborRow = row + i;
            const neighborCol = col + j;
            if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
                if (grid[neighborRow][neighborCol]) count++;
            }
        }
    }
    return count;
}

function nextGeneration() {
    const newGrid = createEmptyGrid(rows, cols);
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const neighbors = countNeighbors(i, j);
            if (cell) {
                if (neighbors < 2 || neighbors > 3) newGrid[i][j] = false;
                else newGrid[i][j] = true;
            } else {
                if (neighbors === 3) newGrid[i][j] = true;
            }
        });
    });
    grid = newGrid;
    renderGrid(grid);
    updateGeneration();
}

function createEmptyGrid(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
}

let generation = 0;
renderGrid(grid);
setInterval(nextGeneration, 1000);
