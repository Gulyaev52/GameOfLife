import gameLifeTemplate from './game-life-template.pug';
import boardTemplate from './board-template.pug';
import eventEmitter from 'events';

class View extends eventEmitter {
    constructor({ elem }) {
        super();

        this._elem = elem; 
        elem.innerHTML = gameLifeTemplate();
        
        this._setElems();
    }

    draw(board) { 
        this._boardElem.innerHTML = boardTemplate({ board });
    }

    toggleStateCell(cellElem, x, y) {
        if (cellElem.classList.contains('cell_alive')) {
            cellElem.classList.remove('cell_alive');
            cellElem.classList.add('cell_dead');
        }
        else {
            cellElem.classList.remove('cell_dead');
            cellElem.classList.add('cell_alive');
        }

        // const cellPosition = this._getCellPosition(cellElem);
        
        this.emit('changeCell', x, y);
    }

    _setElems() {
        this._boardElem = this._elem.querySelector('.game-life__board');
        this._inputHeight = this._elem.querySelector('.input.input_height');
        this._inputWidth = this._elem.querySelector('.input.input_width');
        this._buttonPause = this._elem.querySelector('.button.button_pause');
        this._buttonStart = this._elem.querySelector('.button.button_start');
        this._buttonClear = this._elem.querySelector('.button.button_clear');
    }

    _getCellPosition(cell) { 
        const row = cell.parentNode;

        const x = cell.cellIndex;
        const y = row.rowIndex;

        return [x, y];
    }
}

export default View;