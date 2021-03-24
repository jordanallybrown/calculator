import Stack from "./stack.mjs";
import { createOperatorCache } from "./operator-factory.mjs"; 

export default class Calculator {

    constructor(){
        this._operatorCache = createOperatorCache();
    }

    eval(expression){
        const postfix = this._convertToPostfix(expression);
        return this._eval(postfix);
    }

    /**
     * 
     * @param infix {string} mathematical expression in infix form
     * @returns {string} postfix version of the infix expression
     */
    _convertToPostfix(infix){
        const postfix = [], stack = new Stack(); 

        for (const char of infix){
            // If char is something other than operator, i.e. number, add to resulting postfix
            if (!(char in this._operatorCache)) 
                postfix.push(char);
            
            else{ // If char is operator

                // Push operator onto stack if empty or if currOp has greater than precedence of stackOp
                if (stack.isEmpty() || this._operatorCache[char].precedence > this._operatorCache[stack.peek()].precedence)
                    stack.push(char);
                
                else{
                    // While currOp has less  or equal precedence than stackOp, pop stackOp to append to postfix. 
                    //Once you reach a stackOp w/ greater than precedence (or exhausted the stack), push currOp to stack
                    while ((!stack.isEmpty()) && this._operatorCache[char].precedence <= this._operatorCache[stack.peek()].precedence) {
                        postfix.push(stack.pop());
                    }
                    stack.push(char);
                }
            }
        }

        // Ensure we exhaust the stack and append to postfix 
        while (!stack.isEmpty()) {
            postfix.push(stack.pop());
        }

        return postfix.join("");

    }


    /**
     * Evaluates the postfix expression by calculating the result
     * @param postfix {string} math expression in postfix form
     * @returns {string} operand result represented as a string
     */
    _eval(postfix){
        let op1, op2, result;
        const stack = new Stack();
        for (const char of postfix){
            // push operands onto the stack
            if (!(char in this._operatorCache)) 
                stack.push(char);
            
            else{ // is an operator

                switch(this._operatorCache[char].operands){
                    case 2:
                        op2 = stack.pop(); // gotcha, must respect order of operatations, since not all are commutative
                        op1 = stack.pop();
                        result = this._operatorCache[char].apply(parseInt(op1), parseInt(op2)); //parseFloat if decimal
                        stack.push(result.toString()); // keep types in stack consistent
                        break;
                    default: 
                        return 'Not supported operator'; // need to throw exception here
                }
            }
        }

        return stack.pop();
    }


}


// const postfixconverter = new _PostFixConverter("2+3*4-5")
// console.log(postfixconverter.postfix);

const calc = new Calculator();
let result = calc.eval("2+3*4-5");
console.log(`${result}`);