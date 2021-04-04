import Stack from "./stack.mjs";
import { createOperatorCache } from "./operator-factory.mjs"; 

DECIMAL_PLACE = 1000000;

export default class Calculator {

    constructor(){
        this._operatorCache = createOperatorCache();
    }

    calculate(expression){
        const postfix = this._convertToPostfix(expression);
        const resultStr = this._eval(postfix);
        // Round up to 6 decimal places
        const result = Math.round((parseFloat(resultStr) + Number.EPSILON) * DECIMAL_PLACE) / DECIMAL_PLACE;
        return result.toString();
    }

    /**
     * 
     * @param infix {string} mathematical expression in infix form
     * @returns {array} a list of tokens (digits, operators) in postfix format
     */
    _convertToPostfix(infix){
        const postfixTokens = [], stack = new Stack(); 
        let token = [], prevChar = null;
        

        for (const char of infix){
            // If char is something other than operator, i.e. number, add to token
            if (!(char in this._operatorCache)) 
                token.push(char);
            
            else{ // If char is operator

                // If minus operator, check if performing as negative sign vs. operator
                if (char === '-' && (prevChar === null || prevChar in this._operatorCache)){
                    token.push(char)
                }

                // Handle normal operator functions
                else{
                    // Add all token aggr so far to postfixTokens and reset token
                    postfixTokens.push(token.join(""));
                    token = []

                    // Push operator onto stack if empty or if currOp has greater than precedence of stackOp
                    if (stack.isEmpty() || this._operatorCache[char].precedence > this._operatorCache[stack.peek()].precedence)
                    stack.push(char);
                
                    else{
                        // While currOp has less  or equal precedence than stackOp, pop stackOp to append to postfix. 
                        //Once you reach a stackOp w/ greater than precedence (or exhausted the stack), push currOp to stack
                        while ((!stack.isEmpty()) && this._operatorCache[char].precedence <= this._operatorCache[stack.peek()].precedence) {
                            postfixTokens.push(stack.pop());
                        }
                        stack.push(char);
                    }

                }
                
            }

            prevChar = char;
        }

        postfixTokens.push(token.join(""));
        // Ensure we exhaust the stack and append to postfix 
        while (!stack.isEmpty()) {
            postfixTokens.push(stack.pop());
        }
        return postfixTokens
        
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
                        result = this._operatorCache[char].apply(parseFloat(op1), parseFloat(op2)); //parseFloat if decimal
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
let result = calc.calculate("-2.56+-3.*4-5");
// let result = calc.calculate("123.2345477");
console.log(`${result}`);
// let result1 = calc._convertToPostfix("2+3*4-5");
// console.log(`${result1}`);