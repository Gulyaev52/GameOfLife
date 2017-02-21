class Controller {
    constructor(view, gameLife) {
        this._view = view;
        this._gameLife = gameLife;
        this._timerId = null;

        this._view.on('start', this.play.bind(this));
        this._view.on('pause', this.pause.bind(this));
        this._view.on('clearBoard', this.clearBoard.bind(this));
        this._view.on('changeCell', this.toggleStateCell.bind(this));
        this._view.on('changeHeight', this.setHeight.bind(this));
        this._view.on('changeWidth', this.setWidth.bind(this));

        this._drawBoard();
    }

    toggleStateCell(x, y) {
        this._gameLife.toggleStateCell(x, y);
    }

    setHeight(height) {
        this._gameLife.setHeight(height);
        this._drawBoard();
    }

    setWidth(width) {
        this._gameLife.setWidth(width);
        this._drawBoard();       
    }

    play() {  
        this._timerId = setInterval(() => {  
            this._gameLife.nextGeneration();
            this._drawBoard();
        }, 500);
    } 

    pause() {
        clearInterval(this._timerId);
    }

    clearBoard() {
        this._gameLife.clearBoard();
        this.pause();
        this._drawBoard();
    }

    _drawBoard() {
        const board = this._gameLife.board;
        console.log(this._gameLife.toString(), '\n\n');
        this._view.draw(board);
    }
}

export default Controller;