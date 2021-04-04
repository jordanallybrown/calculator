const KEYS = [
    'C', '+/-', '%', '/', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0', '.', 'backspace', '='
];

const OPERATORS = ['/', '*', '-', '+', '%'];

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
        console.log('The current console list is:');
        console.log(this.outputParser.displayExpression());
    }


    _createKeys(){

        const fragment = document.createDocumentFragment();
        let keyElement;

        KEYS.forEach(key => {
            // special handling for backspace icon
            if(key === 'backspace'){
                // embed the icon element within button to keep grid sizing consistent btw buttons
                keyElement = this.createElement("button");
                const iconElement = this.createElement("i", "backspace", "material-icons");
                keyElement.appendChild(iconElement);
                keyElement.addEventListener('click', () => {
                    this.outputParser.backspace();
                    this.updateConsole();
                });
                
            }

            else{
                // create keyElement, which is a button element for key 
                keyElement = this.createElement("button", key);
                
                // add a click event listener to keyElement to update console expression according to type
                switch (key) {
                    case 'C':
                        keyElement.addEventListener('click', () => {
                            this.outputParser.clear();
                            this.updateConsole();
                        });
                        break;
                    case '.':
                        keyElement.addEventListener('click', () => {
                            this.outputParser.appendDecimal(key);
                            this.updateConsole();
                        });
                        break;
                    case '+/-':
                        keyElement.addEventListener('click', () => {
                            this.outputParser.appendMinus(key);
                            this.updateConsole();
                        });
                        break;
                    case '=':
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        keyElement.addEventListener('click', () => {
                            this.outputParser.appendOperator(key);
                            this.updateConsole();
                        });
                        break;
                    default:
                        keyElement.addEventListener('click', () => {
                            this.outputParser.appendOperand(key);
                            this.updateConsole();
                        });
                        break;

                    
                }

            }


            fragment.appendChild(keyElement);

        });

        return fragment;
                
    }

}

class _Digit {

    constructor(value){
        this._value = value;
        this._isNegative = false;
    }

    hasDecimal(){
        return !(this._value.search('.') === -1)
    }

    get isNegative(){
        return this._isNegative;
    }

    toggleSign(){
        this._isNegative = !this._isNegative;
    }

}

class _OutputParser {
    constructor(){
        this._expression = [];
        this._result = "";
    }

    displayExpression(){
        return this._expression;
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

    getPreviousChar(){
        if(this._expression.length > 0){
            return this._expression[this._expression.length - 1];
        }
            
        else{
            return null;
        }
        
    }

    updatePreviousChar(char){
        return this._expression[this._expression.length - 1] = char;
    }

    _isDigit(char){
        return !(char.search(/\d/g) === -1);
    }


    //TODO: Have to handle negatives at some point, not sure how this is working atm

    appendMinus(input){
        let prev = this.getPreviousChar();
        

        if( prev !== null && !(OPERATORS.includes(prev)) ){ 
            // Check if minus sign has already been applied
            const isNegative = prev.includes('-');

            if(isNegative){ // remove the negative sign, should always be first index
                prev = prev.replace('-', '');
            }
            else { // add in the negative sign at the beginning of the string
                prev = '-' + prev;
            }
            this.updatePreviousChar(prev);
        } 

    }

    appendOperator(input){
        // console.log('We need to append operand');
        const prev = this.getPreviousChar();

        // If the console is blank or previous char was an operator, do not add, else add it to separate string
        if( !(OPERATORS.includes(prev) || prev === null)){ 
            this._expression.push(input);
        } 

    }

    appendOperand(input){
        // console.log('We need to append operand');
        const prev = this.getPreviousChar();
       
        // The console is blank, the previous char was an operator, just add to expression list
        if(OPERATORS.includes(prev) || prev === null){ 
            this._expression.push(input);
        } 
        else { // The previous char was an operand or decimal, so we need to aggregate with the previous
            this.updatePreviousChar(prev + input);
        }  
    }

    appendDecimal(input){
        
        const prev = this.getPreviousChar()
       
        // The console is blank, the previous char was an operator, just add to expression list
        if(OPERATORS.includes(prev) || prev === null){ 
            this._expression.push(input);
            
        } 
        else { // The previous char was an operand or decimal, so we need to aggregate with the previous
            // Ensure that a decimal is not already present, if it is don't aggregate
            if(!prev.includes('.')){ // no decimals
                this.updatePreviousChar(prev + input);
            }
            
        }  
    }

    clear(){
        this._expression = [];
    }

    pop(){
        this._expression.pop();
    }

    backspace(){
        let prev = this.getPreviousChar();

        // Ensure there are items to delete
        if(prev.length > 1){ // An operand that has multiple chars

            prev = prev.slice(0, prev.length-1); // remove the last char only
            this.updatePreviousChar(prev);
        }
        else{ // if char is just one length, simply remove it
            this._expression.pop();
        }
    }



}

// once all of the DOM has loaded on the page
window.addEventListener('DOMContentLoaded', function() {
    const view = new View();

});