export { createOperator as default };

const PRECEDENCE = {
    '*': 70,
    '/': 70,
    '%': 70,
    '+': 60,
    '-': 60
}
/**
 * Use the Factory Design Pattern to create operators from base operator classes. JS has no 
 * concept of abstract classes, so there are base classes (Binary and Unary) which we can 
 * then create subclasses (operators e.g. addition, subtraction) to register for our 
 * factory creation function. 
 */

/**
 * Represents an operator that can apply operations to exactly 2 operands
 */
class BinaryOperator {
    constructor(operand1, operand2, operator, precedence){
        this._operand1 = operand1;
        this._operand2 = operand2;
        this._operator = operator;
        this._precedence = precedence;
    }

    toString(){
        return this._operator;
    }
}

/**
 * Represents an operator that can apply operations to exactly 1 operand
 */
class UnaryOperator {
    constructor(operand, operator, precedence){
        this._operand = operand;
        this._operator = operator;
        this._precedence = precedence;
    }

    toString(){
        return this._operator;
    }
}


/**
 * Create subclasses from Binary and Unary operators since functionality is shared 
 * with only difference being the symbol and computation in apply
 */

class Addition extends BinaryOperator {
    constructor(props){
        super(props.operand1, props.operand2, '+', PRECEDENCE['+']);
    }

    apply(){
        return this._operand1 + this._operand2;
    }
}

class Subtraction extends BinaryOperator {
    constructor(props){
        super(props.operand1, props.operand2, '-', PRECEDENCE['-']);
    }

    apply(){
        return this._operand1 - this._operand2;
    }
}

class Division extends BinaryOperator {
    constructor(props){
        super(props.operand1, props.operand2, '/', PRECEDENCE['/']);
    }

    apply(){
        return this._operand1 / this._operand2;
    }
}

class Multiplication extends BinaryOperator {
    constructor(props){
        super(props.operand1, props.operand2, '*', PRECEDENCE['*']);
    }

    apply(){
        return this._operand1 * this._operand2;
    }
}

class Modulus extends BinaryOperator {
    constructor(props){
        super(props.operand1, props.operand2, '%', PRECEDENCE['%']);
    }

    apply(){
        return this._operand1 % this._operand2;
    }
}

/**
 * Register the operators so that they can be extended further if more
 * operations are added later
 */
let registeredOperatorFactories = {
    '+' : Addition,
    '-' : Subtraction,
    '/' : Division,
    '*' : Multiplication,
    '%' : Modulus
};


/**
 * Factory function to create an operator class based on symbol
 * @param type {string} operator symbol
 * @param props {dict} contains keys operand1 and/or operand2 mapping to numbers
 * @returns {Operator}
 */
function createOperator(type, props) {
    return new registeredOperatorFactories[type](props);
}


const add = createOperator("+", {operand1:1, operand2:2});
console.log(add);
console.log(`${add}`);
console.log(add.apply());