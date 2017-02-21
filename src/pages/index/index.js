import './index.styl';
import 'theme/global.styl';

import Controller from 'controller/Controller';
import View from 'view/View';
import Life from 'model/Life';

const HEIGHT = 25;
const WIDTH = 50;

const life = new Life(HEIGHT, WIDTH);
const view = new View({ 
    elem: document.querySelector('.container-game-of-life')
});
const controller = new Controller(view, life);