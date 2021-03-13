
import Stack from "./stack.mjs";

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

    precedence(char){

        switch (char) {
            case '*':
            case 'x':
            case '/':
            case '%':
                return 2;
            default: // +, -
                return 1;
        }
    }

    /**
     * Converts the user's infix expression to postfix format
     * @returns {string} postfix version of the infix expression
     */
    convertToPostfix(infix){
        // the resulting postfix (more efficient to store in array than build string)
        const postfix = []; 
        const stack = new Stack();
        let char;
        for (char of infix){
            // If char is a number, append to postfix
            if (this.isDigit(char)){
                postfix.push(char);
            }
            // If char is an operator ... 
            else if (this.isOperator(char)){

                // Push operator onto stack if empty or if currOp has greater than or equal precedence of stackOp
                if (stack.isEmpty() || this.precedence(char) >= this.precedence(stack.peek())) { 
                    stack.push(char);
                }
                
                // While currOp has less precedence than stackOp, pop stackOp to append to postfix. Once you reach
                // a stackOp w/ greater than/equal precedence (or exhausted the stack), push currOp to stack
                else {
                    while ((!stack.isEmpty()) && this.precedence(char) < this.precedence(stack.peek())) {
                        postfix.push(stack.pop());
                    }
                    stack.push(char);
                }
            }
        }

        // Ensure we exhaust the stack and append to postfix (not sure if I need this step here)
        while (!stack.isEmpty()) {
            postfix.push(stack.pop());
        }

        return postfix.join("");
    }

    compute(){

    }

    toString(){

    }

}

// Test calculator methods
const calc = new Calculator("2+3");
console.log(calc.convertToPostfix("2+3"));



// console.log(calc.isDigit("6"));
// console.log(calc.isDigit("900008"));
// console.log(calc.isDigit("+"));
// console.log(calc.isOperator("5"));
// console.log(calc.isOperator("-"));
// console.log(calc.isOperator("/"));



