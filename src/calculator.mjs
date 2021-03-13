
import Stack from "./stack.mjs";

export default class Calculator {

    /**
     * The Model which represents a Calculator that takes an infix expression, evaluates 
     * that expression and computes a result
     * @param infix {string} an infix math expression e.g. 2+5+4
     */
    constructor(infix){
        this.infix = infix;
        this.stack = new Stack();
        this.postfix = this.convertToPostfix();
    }

    isDigit(str){
        return !(str.search(/\d/g) === -1);
    }

    isOperator(str){
        return !(str.search(/(-|\+|%|x|\*|\/)/g) === -1);
    }

    isUnary(char){
        return !(str.search(/(!)/g) === -1);
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
    convertToPostfix(){
        // the resulting postfix (more efficient to store in array than build string)
        const postfix = []; 

        for (let char of this.infix){
            // If char is a number, append to postfix
            if (this.isDigit(char)){
                postfix.push(char);
            }
            // If char is an operator ... 
            else if (this.isOperator(char)){

                // Push operator onto stack if empty or if currOp has greater than precedence of stackOp
                if (this.stack.isEmpty() || this.precedence(char) > this.precedence(this.stack.peek())) { 
                    this.stack.push(char);
                }
                
                // While currOp has less  or equal precedence than stackOp, pop stackOp to append to postfix. 
                //Once you reach a stackOp w/ greater than precedence (or exhausted the stack), push currOp to stack
                else {
                    while ((!this.stack.isEmpty()) && this.precedence(char) <= this.precedence(this.stack.peek())) {
                        postfix.push(this.stack.pop());
                    }
                    this.stack.push(char);
                }
            }
        }

        // Ensure we exhaust the stack and append to postfix (not sure if I need this step here)
        while (!this.stack.isEmpty()) {
            postfix.push(this.stack.pop());
        }

        return postfix.join("");
    }

    _eval(operator, ...operands){
        if(operands.length == 2){ // greater than 1 ? 
            let op1 = parseInt(operands[0]);
            let op2 = parseInt(operands[1]);
            let result;
            switch (operator){
                case '+':
                    result = op1 + op2;
                    break;
                case '-':
                    result = op1 - op2;
                    break;
                case '/':
                    result = op1 / op2;
                    break;
                case '%':
                    result = op1 % op2;
                    break;
                case 'x':
                case '*':
                    result = op1 * op2;
                    break;
                default:
                    result = 0;
                    break;
            }

            return result.toString();
        }

        // for now I don't have unary, but might in enhancements
    }

   /**
    * Calculates the result of the postfix expresssion
    * @returns {string} string representation of the result of the postfix expression evaluated
    */
    compute(){
        let op1, op2, result;
        for (let char of this.postfix){
            if (this.isDigit(char)){ // push operands on the stack
                this.stack.push(char);
            }
            else { // is an operator

                // add first operand from stack to list of operands

                // if operator is not unary, assume binary and add another operand for evaluation
                // if(!this.isUnary(char)){
                    // a gotcha here, since we need to respect order of operations since not all operations are Commutative (e.g. /,-)
                op2 = this.stack.pop();
                op1 = this.stack.pop();
                // }

                // Evaluate the operands to reduce to a result and push this result to stack
                result = this._eval(char, op1, op2); // the spread operator takes care of converting these into an array
                this.stack.push(result);
            }
        }
        // Should have only 1 value left which is result of expression
        return this.stack.pop();
    }

    toString(){
        return this.postfix;
    }

}

// Test calculator methods
let a = "2+3*4-5";
let b = "2+3-5+6";
let c = "2+3";
const calc = new Calculator(a);
console.log(calc.compute());
// for (let m of "hello"){
//     console.log(m);
// }


// console.log(calc.isDigit("6"));
// console.log(calc.isDigit("900008"));
// console.log(calc.isDigit("+"));
// console.log(calc.isOperator("5"));
// console.log(calc.isOperator("-"));
// console.log(calc.isOperator("/"));



