export default class Stack {

    /**
     * Represents a Stack (LIFO) that uses a Singly LinkedList as it's underlying data structure
     */
    constructor(){
        this._head = null;
    }

    init(array){
        if(array.length > 0){
            let node = new _Node(array[0]);
            this._head = node;
            for(let i = 1; i < array.length; i++){
                node.next = new _Node(array[i]);
                node = node.next;
            }
        }   
    }

    isEmpty(){
        return this._head === null;
    }
    
    /**
     * Adds the data to the beginning of the list, this allows for Last-In-First-Out because
     * the later item gets placed at the beginning of the list.
     * @param data {generic object} that will be used as the data on the Node
     */
    addFirst(data){
        let node = new _Node(data);
        if(this.isEmpty()){
            this._head = node;
        }
        else{
            node.next = this._head;
            this._head = node;
        }
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

    display(sep=" "){ // prints in the reverse order, arg to either do unshift (r) or push, name it display
        const nodes = [];
        let trav = this._head;
        while(trav !== null){
            nodes.unshift(trav.data);
            trav = trav.next;
        }
        return nodes.join(sep);
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