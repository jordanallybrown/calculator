const KEYS = [
    'C', '+/-', '%', '/', 
    '7', '8', '9', 'x', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0', '.', 'b', '='
]

export default class View {

    constructor(){

        // Get the root element
        this.calculatorGrid = this.getElement('#calculator-grid');

        // Initialize all divs and button tags for calculator
        this.console = this.createElement('div', '', 'console');
        this.consoleExpression = this.createElement('div', '', 'expression');
        this.consoleResult = this.createElement('div', '', 'result');
        this.console.append(this.consoleExpression, this.consoleResult);
        

        this.calculatorGrid.append(this.console, this._createKeys());

        // captures the state of the console
        this.properties = {
            expression: [],
            result: ""
        };
    }

    updateConsole(){

    }

    displayOutput(){

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

    _createKeys(){

        const fragment = document.createDocumentFragment();

        KEYS.forEach(key => {
            // create keyElement, which is a button element for key 
            const keyElement = this.createElement("button", key);
            
            // add a click event listener to keyElement to update console expression according to type
            switch (key) {
                case 'C':
                    keyElement.addEventListener('click', () => {
                        this.properties.expression = [];
                        console.log(this.properties.expression);
                    });
                    break;
                case 'b':
                    keyElement.addEventListener('click', () => {
                        this.properties.expression.pop();
                        console.log(this.properties.expression);
                    });
                    break;
                case '+/-':
                case '.':
                case '=':
                default:
                    keyElement.addEventListener('click', () => {
                        this.properties.expression.push(key);
                        console.log(this.properties.expression);
                    });
                    break;
                
            }

            fragment.appendChild(keyElement);

        });

        return fragment;
                
    }




}

// once all of the DOM has loaded on the page
window.addEventListener('DOMContentLoaded', function() {
    const view = new View();

});