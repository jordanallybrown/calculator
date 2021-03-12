
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

    convertToPostfix(){
        
    }

    compute(){

    }

    toString(){

    }
    

}

