'use strict'
const Chance = require('chance');
const chance = new Chance();
  
function leftPad(str, length) {
    str = str == null ? '' : String(str)
    length = ~~length
    pad = ''
    padLength = length - str.length
    
    while (padLength--) {
        pad += '0'
    }
    
    return pad + str
}

function sliceNumber(number){
    
    let ret = [];
    
    if (number < 100){
        var x = String(number).charAt(0);
        var y = String(number).charAt(1);
    }else{
        var x = String(number).charAt(0);
        x += String(number).charAt(1);
        var y = String(number).charAt(2);
    }

    ret.push(parseInt(x),parseInt(y));

    return ret
}

function randomIntInc(low, high, quantity) {
    return chance.unique(chance.integer, quantity, {min:low, max:high})
}

module.exports = function sortRandomPosition (quantity, x, y, array) {

    let setX = new Array(quantity);
    let setY = new Array(quantity);
    
    setX = randomIntInc(0, x -1 , quantity);

    setY = randomIntInc(0, y -1 , quantity);

    for(let i = 0; i < quantity; i++){
        const x = setX[0];
        const y = setY[0];
        array[i] = { x:x,y:y };
        setX.shift();
        setY.shift();
    }

    return array;

};