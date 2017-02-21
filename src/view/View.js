import gameLifeTemplate from '../components/game-life/game-life';
import boardTemplate from '../components/board/board';
import eventEmitter from 'events';
import {qs, on, delegate} from '../helpers';

class View extends eventEmitter {
    constructor({ elem }) {
        super();

        this._elem = elem; 
        elem.innerHTML = gameLifeTemplate();
        this._findElems();
        this._attachEventHandlers();
    }

    draw(board) { 
        this._boardElem.innerHTML = boardTemplate({ board });
    }

    toggleStateCell(cellElem) { 
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
        this._changeSize(this._inputHeight, 'changeHeight');
    }

    changeWidth() {
        this._changeSize(this._inputWidth, 'changeWidth');
    }

    _changeSize(input, eventName) {
        const newSize = parseInt(input.value);

        this.emit(eventName, newSize);
    } 

    _findElems() {
        this._boardElem = qs('.game-life__board', this._el);
        this._inputHeight = qs('.input.input_height', this._elem);
        this._inputWidth = qs('.input.input_width', this._elem);
        this._buttonPause = qs('.button.button_pause', this._elem);
        this._buttonStart = qs('.button.button_start', this._elem);
        this._buttonClear = qs('.button.button_clear', this._elem);
    }

    _attachEventHandlers() {
        delegate(this._boardElem, '.cell', 'click', ({ target }) => { 
            this.toggleStateCell(target);
        }); 
        
        on(this._inputHeight, 'change', this.changeHeight.bind(this));

        on(this._inputWidth, 'change', this.changeWidth.bind(this));

        on(this._buttonClear, 'click', () => this.emit('clearBoard')); 

        on(this._buttonPause, 'click', () => this.emit('pause'));

        on(this._buttonStart, 'click', () => this.emit('start'));
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