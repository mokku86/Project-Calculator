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
const body = d.querySelector('body');

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
function onNumb (value) {
    if(input.textContent.length > 11) return;
    if(result.textContent) clearAll();

    insertNumb(value);
}
function insertNumb (value) {
    //special treatment for zero
    if(value == "0") {
        console.log('zero clicked');
        //if input in empty or with decimal, add 0
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
    input.textContent += value;
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
function chainOperator (obj) {
    entry2 = e2.textContent = Number(input.textContent);
    input.textContent = ''
    entry1 = e1.textContent = operation[operator]();
    operator = obj.name;
    entry2 = e2.textContent = null;
    op.textContent = obj.symbol;
}
function operatorWithResult (obj) {
    //turn prev result to entry1
    entry1 = e1.textContent = Number(result.textContent);

    result.textContent = '';
    operator = obj.name;
    op.textContent = obj.symbol;
    entry2 = null;
    e2.textContent = eq.textContent = '';
}
function onOperator(obj) {
    //with result
    if(result.textContent) return operatorWithResult(obj);

    //nothing happen if entry1 is null
    if(!input.textContent) return;

    //if operator and input are not empty
    //calculate the result and assign it to entry1 and update new operator
    if(operator && input.textContent) return chainOperator(obj);  
    
    insertOperator(obj);
}
function insertOperator (obj) {
    entry1 = e1.textContent = Number(input.textContent);
    operator = obj.name;
    op.textContent = obj.symbol;
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
    btn.addEventListener('click', e => {
        const obj = {
            name : e.dataset.operator,
            symbol : e.dataset.symbol,
        }
        onOperator(obj)
    });
});

btnEqual.addEventListener('click', equal);




//
numbs.forEach(numb => {
    numb.addEventListener('click', e => {
        const value = e.target.dataset.value;
        onNumb(value);
    });
});

clear.addEventListener('click', clearAll);
clearE.addEventListener('click', clearEntry);
backspace.addEventListener('click', backspaceFn);
decimal.addEventListener('click', onDecimal);

const allowedKey = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', 'Enter', 'backspace'];
body.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    //console.log(key);
    
    if(allowedKey.includes(key)){
        console.log(key);
        if(key === 'enter' || key === '=') return equal();
        if(key === 'backspace') return backspaceFn();

        if(Number.isInteger(Number(key))){
            return onNumb(key); 
        }

        const obj = {
            name : '',
            symbol : '',
        }
        if(key == '+'){
            obj.name = 'add';
            obj.symbol = '+';
            onOperator(obj)
        }else if(key == '-'){
            obj.name = 'subtract';
            obj.symbol = '-';
            onOperator(obj)
        }else if(key == '*'){
            obj.name = 'multiply';
            obj.symbol = '*';
            onOperator(obj)
        }else{
            obj.name = 'divide';
            obj.symbol = '/';
            onOperator(obj)
        }
    }
    
});