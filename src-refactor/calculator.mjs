import Stack from "./stack.mjs";
import createOperator from "./operator-factory.mjs"; 

export default class Calculator {

    constructor(expression){
        this._expression = expression;

    }
}

/**
 * Takes an infix expression and converts to postfix
 */
class _PostFixConverter {
    constructor(infix){
        this._postfix = this._convertToPostfix(infix);
    }

    get postfix(){
        return this._postfix;
    }

    _convertToPostfix(infix){

    }

    toString(){

    }
}

/**
 * Reduces the postfix expression to one operand by performing the expressions operations
 * Calculates the mathematical result of a postfix expression
 */
class _PostFixEvaluator {
    constructor(postfix){
        this._result = this._evaluate(postfix);
        this._createOperator;
    }

    get result(){
        return this._result;
    }

    _evaluate(postfix){

    }

    toString(){

    }
}

