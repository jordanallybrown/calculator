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
    constructor(operator, precedence){
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
    constructor(operator, precedence){
        this._operator = operator;
        this._precedence = precedence;
    }

    toString(){
        return this._operator;
    }
}


/**
 * Create subclasses from Binary and Unary operators since functionality is shared 
 * with only difference being the symbol and computation in apply. Pass in operands
 * in apply method so that the class can be reusable and different operands can 
 * be passed in each time.
 */

class Addition extends BinaryOperator {
    constructor(){
        super('+', PRECEDENCE['+']);
    }

    apply(operand1, operand2){
        return operand1 + operand2;
    }
}

class Subtraction extends BinaryOperator {
    constructor(){
        super('-', PRECEDENCE['-']);
    }

    apply(operand1, operand2){
        return operand1 - operand2;
    }
}

class Division extends BinaryOperator {
    constructor(){
        super('/', PRECEDENCE['/']);
    }

    apply(operand1, operand2){
        return operand1 / operand2;
    }
}

class Multiplication extends BinaryOperator {
    constructor(){
        super('*', PRECEDENCE['*']);
    }

    apply(operand1, operand2){
        return operand1 * operand2;
    }
}

class Modulus extends BinaryOperator {
    constructor(){
        super('%', PRECEDENCE['%']);
    }

    apply(operand1, operand2){
        return operand1 % operand2;
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
function createOperator(type) {
    return new registeredOperatorFactories[type]();
}

/**
 * Factory function to create an operator cache that contains the operator classes
 * @returns {object} maps operator symbols to corresponding Operator objects that are registered
 */
function createOperatorCache(){
    const cache = {};
    for (const op in registeredOperatorFactories){
        cache[op] = new registeredOperatorFactories[op]();
    }
    return cache;
}


// const add = createOperator("+");
// console.log(add);
// console.log(`${add}`);
// console.log(add.apply(2, 3));

const cache = createOperatorCache();
const add = cache['+'];
console.log(add);
console.log(add.apply(2, 3));
