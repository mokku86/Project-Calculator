let entry1 = null;
let entry2 = null;
let operator = null;
let operation = {
    add, 
    subtract,
    multiply,
    divide,
}

const d = document;
const e1 = d.querySelector('.e1');
const e2 = d.querySelector('.e2');
const op = d.querySelector('.op');
const eq = d.querySelector('.eq');
const input = d.querySelector('.input');
const result = d.querySelector('.result');
const numbs = d.querySelectorAll('.numb');
const operators = d.querySelectorAll('.btn-operator');
const btnEqual = d.querySelector('#btn-equal');
const clearE = d.querySelector('#btn-clearEntry');
const clear = d.querySelector('#btn-clear');
const backspace = d.querySelector('#btn-backspace');
const decimal = d.querySelector('#btn-decimal');

function add () {
    let result = (entry1 + entry2).toFixed(2);
    console.log(result);
    return (result * 10) / 10;
}
function subtract () {
    let result = (entry1 - entry2).toFixed(2);
    return (result * 10) / 10;
}
function multiply () {
    let result = (entry1 * entry2).toFixed(2);
    return (result * 10) / 10;
}
function divide () {
    let result = (entry1 / entry2).toFixed(2);
    return (result * 10) / 10;
}
function clearEntry () {
    input.textContent = '';
}
function clearAll() {
    input.textContent = result.textContent = e1.textContent = e2.textContent = op.textContent = eq.textContent = '';
    entry1 = entry2 = operator = null;
}
function backspaceFn () {
    input.textContent = input.textContent.slice(0, -1);
}
function chainOperator (e) {
    console.log('chain operator');
    entry2 = e2.textContent = Number(input.textContent);
    input.textContent = ''
    entry1 = e1.textContent = operation[operator]();
    operator = e.target.dataset.operator;
    entry2 = e2.textContent = null;
    op.textContent = e.target.dataset.symbol;
}
function operatorWithResult (e) {
    entry1 = e1.textContent = Number(result.textContent);

    result.textContent = '';
    operator = e.target.dataset.operator;
    op.textContent = e.target.dataset.symbol;
    entry2 = null;
    e2.textContent = eq.textContent = '';
}
function onOperator(e) {
    //with result
    if(result.textContent) return operatorWithResult(e);

    //nothing happen if entry1 is null
    if(!input.textContent) return console.log('nothing happen');

    //if operator and input are not empty
    //calculate the result and assign it to entry1 and update new operator
    if(operator && input.textContent) return chainOperator(e);

    console.log('first time');
    entry1 = e1.textContent = Number(input.textContent);
    operator = e.target.dataset.operator;
    op.textContent = e.target.dataset.symbol;
    input.textContent = '';
}

function equal() {
    if (!operator || !input.textContent) return;

    if(!entry2){
        entry2 = Number(input.textContent);
    }
    console.log('entry1 = '+entry1);
    console.log('operator = '+operator);
    console.log('entry2 = '+entry2);

    e2.textContent = entry2;
    eq.textContent = "=";
    input.textContent = '';
    
    return result.textContent = operation[operator]();
}

function hasDecimal () {
    if(input.textContent.indexOf('.') < 0) {
        return false;
    }else{
        return true;
    }
}

function onDecimal () {
    if(hasDecimal(Number(input.textContent))) return;
    input.textContent += ".";
}



operators.forEach(btn => {
    btn.addEventListener('click', onOperator);
});

btnEqual.addEventListener('click', equal);




//
numbs.forEach(numb => {
    numb.addEventListener('click', e => {
        if(result.textContent) clearAll();
        if(input.textContent.length > 11) return;

        //special treatment for zero
        if(numb.dataset.value == "0") {
            console.log('zero clicked');
            //if input in empty, add 0 or with decimal
            if(input.textContent == '') {
                return input.textContent += '0';
            }

            if(hasDecimal(Number(input.textContent))){
                console.log('input has decimal');
                return input.textContent += '0';
            }

            //if input already have 0, do nothing
            if(Number(input.textContent) == 0) {
                return;
            }
        }

        const value = e.target.dataset.value;
        input.textContent += value;
    });
});

clear.addEventListener('click', clearAll);
clearE.addEventListener('click', clearEntry);
backspace.addEventListener('click', backspaceFn);
decimal.addEventListener('click', onDecimal);