import Cell from './Cell'

class Life {
    constructor(height=10, width=10) {
        this.height = height;
        this.width = width;
        this.board = this._createBoard(height, width); 
    }

    nextGeneration() {   
        this.board = this.board.map((row, y) => ( 
            row.map((cell, x) => {  
                const newCell = new Cell(cell.alive); 
                const numAliveNeighbors = this.countAliveNeighbors(x, y); 

                if (cell.alive) {
                    if (numAliveNeighbors != 2 && numAliveNeighbors != 3) { 
                        newCell.alive = false;
                    }
                }
                else if (numAliveNeighbors == 3) { 
                    newCell.alive = true;
                } 
                console.log(newCell.alive);
                return newCell;
            })
        )); 
    }

    clearBoard() {
        this.board = this._createBoard(this.height, this.width);
    }

    countAliveNeighbors(x, y) { 
        return this.getAliveNeighbors(this.getNeighbors(x, y)).length;
    }

    getAliveNeighbors(neighbors) {
        const isAliveCell = cell => cell.alive;
        
        return neighbors.filter(isAliveCell);
    }

    getNeighbors(x, y) {
        const getCoordNeighborCell = (xCell, yCell) => ( 
            ([xDirection, yDirection]) => [xCell + xDirection, yCell + yDirection]
        );

        const directions = [
            [-1, 0], [1, 0],
            [0, -1], [0, 1],
            [1, 1],  [-1, 1],
            [1, -1], [-1, -1]
        ];  

        const neighbors = directions
            .map(getCoordNeighborCell(x, y)) 
            .map((coordNeighbors) => this.getCell(...coordNeighbors))
            .filter(Boolean);

        return neighbors;
    }

    setHeight(height) {
        this._resize(height, this.width);
    }

    setWidth(width) {
        this._resize(this.height, width);
    }

    getCell(x, y) {   
        if (this._posCellInBoard(x, y))
            return this.board[y][x];
    }

    toggleStateCell(x, y) {
        const cell = this.getCell(x, y); 
        cell.alive = !cell.alive;
    }

    toString() {
        const ALIVE = '1';
        const DEAD = '0';

        return this.board.map((row) => (
            row.map(cell => cell.alive ? ALIVE : DEAD).join(' '))
        ).join('\n');
    }

    _createBoard(height, width) {  
        const board = new Array(height)
            .fill(null)
            .map(_ => new Array(width).fill(null).map(_ => new Cell()));
            
        return board;
    }

    _resize(height, width) {
        const newBoard = this._createBoard(height, width)
            .map((row, y) => (
                row.map((cell, x) => this.getCell(x, y) || cell))
            );
        
        this.board = newBoard;
    }

    _posCellInBoard(x, y) {
        const xPosInBoard = x >= 0 && x < this.width;
        const yPosInBoard = y >= 0 && y < this.height;
        return xPosInBoard && yPosInBoard;
    }
} 

 
if (!Array.prototype.fill) {
  Array.prototype.fill = function(value) {

    // Шаги 1-2.
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    var O = Object(this);

    // Шаги 3-5.
    var len = O.length >>> 0;

    // Шаги 6-7.
    var start = arguments[1];
    var relativeStart = start >> 0;

    // Шаг 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Шаги 9-10.
    var end = arguments[2];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Шаг 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Шаг 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Шаг 13.
    return O;
  };
}

export default Life;