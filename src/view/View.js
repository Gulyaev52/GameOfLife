import gameLifeTemplate from './game-life-template.pug';
import boardTemplate from './board-template.pug';
import eventEmitter from 'events';

class View extends eventEmitter {
    constructor({ elem }) {
        super();

        this._elem = elem; 
        elem.innerHTML = gameLifeTemplate();
        
        this._setElems();

        this._attachEventHandlers();
    }

    _attachEventHandlers() {
        this._boardElem.addEventListener('click', event => {
            const cellElem = event.target.closest('.cell');

            if (!cellElem)
                return;
            
            this.toggleStateCell(cellElem);
        });

        this._inputHeight.addEventListener('change', this.changeHeight.bind(this));

        this._inputWidth.addEventListener('change', this.changeWidth.bind(this));

        this._buttonClear.addEventListener('click', this.buttonClearHandler.bind(this));

        this._buttonPause.addEventListener('click', this.buttonPauseHandler.bind(this));

        this._buttonStart.addEventListener('click', this.buttonStartHandler.bind(this));
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
        this._boardElem = this._elem.querySelector('.game-life__board');
        this._inputHeight = this._elem.querySelector('.input.input_height');
        this._inputWidth = this._elem.querySelector('.input.input_width');
        this._buttonPause = this._elem.querySelector('.button.button_pause');
        this._buttonStart = this._elem.querySelector('.button.button_start');
        this._buttonClear = this._elem.querySelector('.button.button_clear');
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