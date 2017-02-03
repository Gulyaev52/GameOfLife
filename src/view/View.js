import gameLifeTemplate from '../components/game-life/game-life.pug';
import boardTemplate from '../components/board/board.pug';
import eventEmitter from 'events';
import {qs, on, delegate} from '../helpers';

class View extends eventEmitter {
    constructor({ elem }) {
        super();

        this._elem = elem; 
        elem.innerHTML = gameLifeTemplate();
        
        this._setElems();

        this._attachEventHandlers();
    }

    _attachEventHandlers() {
        delegate(this._boardElem, '.cell', 'click', ({ target }) => {
            this.toggleStateCell(target);
        });

        on(this._inputHeight, 'change', this.changeHeight.bind(this));

        on(this._inputWidth, 'change', this.changeWidth.bind(this));

        on(this._buttonClear, 'click', this.buttonClearHandler.bind(this));

        on(this._buttonPause, 'click', this.buttonPauseHandler.bind(this));

        on(this._buttonStart, 'click', this.buttonStartHandler.bind(this));
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

        const cellPosition = this._getCellPosition(cellElem);
        
        this.emit('changeCell', ...cellPosition);
    }

    changeHeight() { 
        this.changeSize(this._inputHeight, 'changeHeight');
    }

    changeWidth() {
        this.changeSize(this._inputWidth, 'changeWidth');
    }

    changeSize(input, eventName) {
        const newSize = parseInt(input.value);

        this.emit(eventName, newSize);
    }

    buttonClearHandler() {
        this.emit('clearBoard');
    }

    buttonStartHandler() {
        this.emit('start');
    }

    buttonPauseHandler() {
        this.emit('pause');
    }

    _setElems() {
        this._boardElem = qs('.game-life__board', this._el);
        this._inputHeight = qs('.input.input_height', this._elem);
        this._inputWidth = qs('.input.input_width', this._elem);
        this._buttonPause = qs('.button.button_pause', this._elem);
        this._buttonStart = qs('.button.button_start', this._elem);
        this._buttonClear = qs('.button.button_clear', this._elem);
    }

    _getCellPosition(cellElem) {   
        const td = cellElem.closest('td');
        const tr = td.closest('tr');

        const x = td.cellIndex;
        const y = tr.rowIndex;

        return [x, y];
    }
}

export default View;