import 'assert'
import Life from '../model/Life'

describe('Life', () => { 
    describe('setHeight', () => { 
        let life = null; 

        beforeEach(() => {
            life = new Life(1, 2);
            life.board = [[{ alive: true }, { alive: true }]];
        });

        it('при установке значения высоты в 3, высота board должна быть равна 3', () => {
            life.setHeight(3);

            assert.equal(life.board.length, 3);
        }); 
        
        it('при увеличении высоты состояния ячеек должны оставаться прежними', () => {
            life.setHeight(3);
            const expectedResult = [
                [{ alive: true }, { alive: true }],
                [{ alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }]
            ];

            assert.deepEqual(life.board, expectedResult);
        });
    });

    describe('setWidth', () => {
        let life = null;
        
        beforeEach(() => {
            life = new Life(1, 2);
            life.board = [[{ alive: true }, { alive: false }]];
        });

        it('при установке значения ширины в 4, ширина строки board должна быть равна 4', () => {
            life.setWidth(4);

            assert.equal(life.board[0].length, 4);
        }); 

        it('при увеличении ширины состояния ячеек должны оставаться прежними', () => {
            life.setWidth(4);
            const expectedResult = [
                [{ alive: true }, { alive: false }, { alive: false }, { alive: false }]
            ];

            assert.deepEqual(life.board, expectedResult);
        });
    });

    describe('nextGeneration', () => {
        it('корректно рассчитывает следующие поколения', () => {
            const life = new Life(3, 5);
            const initialBoard = [
                [{ alive: false }, { alive: false }, { alive: false }, { alive: true }, { alive: true }],
                [{ alive: false }, { alive: false }, { alive: true }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: false }, { alive: true }, { alive: true }]
            ];
            life.board = initialBoard;
            
            life.nextGeneration();
            const expectedResultA = [
                [{ alive: false }, { alive: false }, { alive: false }, { alive: true }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: true }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: false }, { alive: true }, { alive: false }]
            ]; 
            assert.deepEqual(life.board, expectedResultA);
            
            life.nextGeneration();
            const expectedResultB = [
                [{ alive: false }, { alive: false }, { alive: false }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: true }, { alive: true }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: false }, { alive: false }, { alive: false }]
            ];
            assert.deepEqual(life.board, expectedResultB);

            life.nextGeneration();
            const expectedResultC = [
                [{ alive: false }, { alive: false }, { alive: false }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: false }, { alive: false }, { alive: false }],
                [{ alive: false }, { alive: false }, { alive: false }, { alive: false }, { alive: false }]
            ];
            assert.deepEqual(life.board, expectedResultC);
        });
    }); 

    describe('getNeighbors', () => {
        describe('для поля размером 4, 4', () => {
            let life = null;

            beforeEach(() => {
                life = new Life(4, 4);
                life.board = [
                    [{ alive: false }, { alive: false }, { alive: false }, { alive: false }],
                    [{ alive: false }, { alive: true }, { alive: true }, { alive: true }],
                    [{ alive: false }, { alive: true }, { alive: false }, { alive: true }],
                    [{ alive: false }, { alive: true }, { alive: true }, { alive: true }]
                ];
            });

            it('для ячейки в позиции 2, 2 возвращает 8 ближайших ячеек', () => {
                const neighbors = life.getNeighbors(2, 2);
                
                const expectedResult = [
                    { alive: true }, { alive: true }, { alive: true }, { alive: true },
                    { alive: true }, { alive: true }, { alive: true }, { alive: true }
                ];

                assert.deepEqual(neighbors, expectedResult);
            });
            it('для ячейки в позиции 0, 0 возвращает 3 ближайшие ячейки', () => {
                const neighbors = life.getNeighbors(0, 0);

                const expectedResult = [
                    { alive: false }, { alive: false }, { alive: true }
                ];

                assert.deepEqual(neighbors, expectedResult);
            }); 
        });
    }); 

    describe('toggleStateCell', () => {
        describe('переключает состояние ячейки', () => {
            let life = null; 

            beforeEach(() => {
                life = new Life(1, 2); 
                life.board = [[{ alive: true }, { alive: false }]];
            })

            it('если у cell свойство alive равно true, то оно должно стать равно false', () => { 
                life.toggleStateCell(0, 0);
                const changedCell = life.getCell(0, 0);

                assert.equal(changedCell.alive, false);
            });

            it('если у cell свойство alive равно false, то оно должно стать равно true', () => { 
                life.toggleStateCell(1, 0);
                const changedCell = life.getCell(1, 0);

                assert.equal(changedCell.alive, true);
            });
        });
    });

});