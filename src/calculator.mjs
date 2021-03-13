
const PRECEDENCE = {

}

export default class Calculator {

    /**
     * The Model which represents a Calculator that takes an infix expression, evaluates 
     * that expression and computes a result
     * @param infix {string} an infix math expression e.g. 2+5+4
     */
    constructor(infix){
        this.infix = infix;
        this.postfix = this.convertToPostfix();
    }

    isDigit(str){
        return !(str.search(/\d/g) === -1);
    }

    isOperator(str){
        return !(str.search(/(-|\+|%|x|\*|\/)/g) === -1);
    }

    convertToPostfix(){

    }

    compute(){

    }

    toString(){

    }

}

// Test calculator methods
// const calc = new Calculator("2+3");
// console.log(calc.isDigit("6"));
// console.log(calc.isDigit("900008"));
// console.log(calc.isDigit("+"));
// console.log(calc.isOperator("5"));
// console.log(calc.isOperator("-"));
// console.log(calc.isOperator("/"));



