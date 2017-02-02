import View from '../view/View';
import sinon from 'sinon';
import asset from 'assert';

describe('View', () => {
    const view = new View({ elem: document.body });

    describe('проверка наличия элементов', () => {
        it('наличие game-life', () => {
            const gameLife = document.querySelector('.game-life');

            assert.isNotNull(gameLife);
        });

        it('наличие доски', () => {
            const gameLife = document.querySelector('.game-life__board');

            assert.isNotNull(gameLife);
        });

        it('наличие input для ввода высоты', () => {
            const inputHeight = document.querySelector('.input.input_height');

            assert.isNotNull(inputHeight);
        });

        it('наличине input для ввода ширины', () => {
            const inputWidth = document.querySelector('.input.input_width');

            assert.isNotNull(inputWidth);
        });

        it('наличине button для очистки доски', () => {
            const buttonClear = document.querySelector('.button.button_clear');

            assert.isNotNull(buttonClear);
        });

        it('наличие button для паузы', () => {
            const buttonPause = document.querySelector('.button.button_pause');

            assert.isNotNull(buttonPause);
        });

        it('наличие button для возобновления игры', () => {
            const buttonStart = document.querySelector('.button.button_start');

            assert.isNotNull(buttonStart);
        });
    });

    describe('draw', () => { 
        let board = null;

        beforeEach(() => { 
            board = [
                [{ alive: false }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: true }, { alive: true }],
                [{ alive: false }, { alive: false }, { alive: false }]
            ];
        }); 

        it('если высота board равна 3 - количество строк должно быть 3', () => {
            view.draw(board);

            const actualHeight = document.querySelectorAll('.board__row').length;
            const expectedHeight = 3;

            assert.equal(actualHeight, expectedHeight);
        });

        it('если ширина board равна 3 - в каждой строке должно быть по 3 клетки', () => {
            view.draw(board);

            const actualResult = Array
                .from(document.querySelectorAll('.board__row'))
                .map(row => row.querySelectorAll('.cell').length);

            const expectedResult = [3, 3, 3];

            assert.deepEqual(actualResult, expectedResult);
        });

        it('Корректное отображение состояния клеток', () => {
            view.draw(board);
            
            const actualResult = Array
                .from(document.querySelectorAll('.board__row')) 
                .map(row => Array.from(row.querySelectorAll('.cell'))
                                 .map(cell => cell.classList.contains('cell_alive')));

            const expectedResult = board
                .map(row => row.map(cell => cell.alive));

            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('toggleStateCell', () => { 
        let cellElem = null;

        beforeEach(() => {
            cellElem = document.createElement('div');
            cellElem.classList.add('cell');
        });

        it('изменяет класс элемента с alive на dead', () => {  
            cellElem.classList.add('cell_alive');

            view.toggleStateCell(cellElem);

            asset.equal(cellElem.classList.contains('cell_dead'), true);
        });

        it('изменяет класс элемента с dead на alive', () => { 
            cellElem.classList.add('cell_dead');

            view.toggleStateCell(cellElem);

            asset.equal(cellElem.classList.contains('cell_alive'), true);
        });

        it('вызывает событие changeCell', () => {
            cellElem.classList.add('cell_alive');

            const callback = sinon.spy();
            view.on('changeCell', callback);

            view.toggleStateCell(cellElem, 4, 4);

            assert(callback.called); //!!!!!!!
        });

        it('возвращает позицию изменённой ячейки', () => {
            const table = document.createElement('table');
            table.innerHTML = `
                <tr>
                    <td class='cell cell_alive'></td><td class='cell cell_dead'></td>
                </tr> 
            `; 
            assert.equal(true, false);
        });
    });
});



if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}