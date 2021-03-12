export default class Stack {

    /**
     * Represents a Stack (LIFO) that uses a Singly LinkedList as it's underlying data structure
     */
    constructor(){
        this._head = null;
    }

    isEmpty(){
        return this._head === null;
    }
    
    /**
     * Pushes the data to the beginning of the stack, this allows for Last-In-First-Out because
     * the later item gets placed at the beginning of the stack.
     * @param data {generic object} that will be used as the data on the Node
     */
    push(data){
        let node = new _Node(data);
        if(this.isEmpty()){
            this._head = node;
        }
        else{
            node.next = this._head;
            this._head = node;
        }
    }

    /**
     * Pops the item at the head of the stack (this will be the last item that was pushed)
     * @returns {generic object} data that was on the popped Node
     */
    pop(){
        let data = this._head.data;
        this._head = this._head.next;
        return data;
    }

    toString(){
        const nodes = [];
        let trav = this._head;
        while(trav !== null){
            nodes.push(trav.data);
            trav = trav.next;
        }
        return nodes.join(" -> ");
    }

    // * indicates a generator function
    * iterator(){
        let trav = this._head;
        while(trav !== null){
            yield trav.data;
            trav = trav.next;
        }
    }
}

class _Node {

    /**
     * Represents a Node (building blocks of a LinkedList) that holds a reference to the
     * next Node and data (generic obj)
     * @param data 
     */
    constructor(data){
        this._data = data;
        this._next = null;
    }
    get data(){
        return this._data;
    }
    set data(data){
        return this._data = data;
    }
    get next(){
        return this._next;
    }
    set next(node){
        return this._next = node;
    }
}


// Test methods on Stack
// let stack = new Stack();
// stack.push("1");
// stack.push("2");
// stack.push("3");
// console.log(`${stack}`);
// let data = stack.pop();
// console.log(`pop ${data} off the stack`);
// console.log(`${stack}`);
// data = stack.pop();
// console.log(`pop ${data} off the stack`);
// console.log(`${stack}`);
// data = stack.pop();
// console.log(`pop ${data} off the stack`);
// console.log(`${stack}`);