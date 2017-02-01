import assert from 'assert';
import Cell from '../model/Cell';

describe('Cell', () => {
    it('По умолчанию у Cell свойство alive должно быть false', () => {
        const cell = new Cell();

        assert.isFalse(cell.alive);
    });

    it('setAlive', () => { 
        const cell = new Cell();

        cell.setAlive();
        
        assert.isTrue(cell.alive);
    })
});