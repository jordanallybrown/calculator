const KEYS = [
    'C', '+/-', '%', '/', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0', '.', 'b', '='
];


export default class View {

    constructor(){

        // Get the root element
        this.calculatorGrid = this.getElement('#calculator-grid');

        // Initialize all divs and button tags for calculator
        this.console = this.createElement('div', '', 'console');
        this.consoleExpression = this.createElement('div', '', 'expression');
        this.consoleResult = this.createElement('div', '', 'result');
        this.console.append(this.consoleExpression, this.consoleResult);

        // Initialize an output parser to capture the current state of the console
        this.outputParser = new _OutputParser();
        
        // Add all console divs and button keys to calculator grid
        this.calculatorGrid.append(this.console, this._createKeys());
        
    }

    createElement(tag, textContent="", className=""){
        const element = document.createElement(tag);
        if (textContent) element.textContent = textContent;
        if (className) element.classList.add(className);
        return element;
    }

    getElement(selector){
        const element = document.querySelector(selector);
        return element;
    }

    updateConsole(){ // updates both the expression and the result
        // console.log(this.outputParser.expression);
        this.consoleExpression.textContent = this.outputParser.expression;
    }


    _createKeys(){

        const fragment = document.createDocumentFragment();

        KEYS.forEach(key => {
            // create keyElement, which is a button element for key 
            const keyElement = this.createElement("button", key);
            
            // add a click event listener to keyElement to update console expression according to type
            switch (key) {
                case 'C':
                    keyElement.addEventListener('click', () => {
                        this.outputParser.clear();
                        this.updateConsole();
                    });
                    break;
                case 'b':
                    keyElement.addEventListener('click', () => {
                        this.outputParser.pop();
                        this.updateConsole();
                    });
                    break;
                case '+/-':
                case '.':
                case '=':
                default:
                    keyElement.addEventListener('click', () => {
                        this.outputParser.append(key);
                        this.updateConsole();
                    });
                    break;
                
            }

            fragment.appendChild(keyElement);

        });

        return fragment;
                
    }

}

class _OutputParser {
    constructor(){
        this._expression = [];
        this._result = "";
    }

    get expression() {
        return this._expression.join("");
    }
    get result(){
        return this._result;
    }
    set result(operand){
        this._result = operand;
    }

    _isDigit(char){
        return !(char.search(/\d/g) === -1);
    }

    append(input){
        if (this._isDigit(input)){
            this._expression.push(input);
        }
        else{ // input is an operator
            if (this._expression.length > 0){ // Only push operator if list is not empty
                let prevInput = this._expression[this._expression.length - 1];
                if (this._isDigit(prevInput)){ // If prev is digit, push operator
                    this._expression.push(input);
                }
                else { // If prev is operator, replace the prev operator w/ new operator
                    this._expression.pop();
                    this._expression.push(input);

                }
            }

        }
    }

    clear(){
        this._expression = [];
    }

    pop(){
        this._expression.pop();
    }



}

// once all of the DOM has loaded on the page
window.addEventListener('DOMContentLoaded', function() {
    const view = new View();

});