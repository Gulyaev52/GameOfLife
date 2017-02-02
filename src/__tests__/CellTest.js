import assert from 'assert';
import Cell from '../model/Cell';

describe('Cell', () => { 
    it('При создании cell свойство alive равно false', () => {
        const cell = new Cell();

        assert.equal(cell.alive, false);
    });
});

//можно же обойтись и без этого класса