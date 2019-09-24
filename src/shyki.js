const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        const new_Node = new Node(data, null, null)
        if (!this.length) {
            this._head = new_Node; this._tail = new_Node;
            new_Node.next = null; new_Node.prev = null;
            this.length += 1;
        }
        else {
            const prev_tail = this._tail;
            prev_tail.next = new_Node;
            new_Node.prev = prev_tail;
            this.length += 1;
            this._tail = new_Node;
        }
        
    }

    head() { return this._head ? this._head.data : null }

    tail() { return this._tail ? this._tail.data : null }

    travel(index) {
        const next = (node) => node.next
        let node = this._head ? this._head : null;
        if (!node) return 'List is empty';
        for (let i=0; i<index; i++) {
            node = next(node) ? next(node) : 'Out of range'
        }
        return node
    }

    at(index) {
        if (index > this.length -1) return 'Index out of range'
        return this.travel(index).data;
    }

    insertAt(index, data) {
        if (index - 1 > this.length ) return 'Out of range'
        const prev = this.travel(index - 1) ? this.travel(index -1 ) : null ;
        const next = this.travel(index) ? this.travel(index) : null;
        const newNode = new Node(data, prev, next);
        prev ? prev.next = newNode : this._head = newNode; 
        next ? next.prev = newNode : this._tail = newNode;
        this.length += 1;
    }

    isEmpty() { return this.length === 0 }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    deleteAt(index) {

        if (index - 1 > this.length ) return 'Out of range';
        const node = this.travel(index);
        const prev = node.prev ? node.prev : null;
        const next = node.next ? node.next : null;
        prev ? prev.next = next : this._head = next;
        next ? next.prev = prev : this._tail = prev;      
        this.length -= 1;  
       
    }

    reverse() {
        const data_list = []
        const len = this.length;
        for (let i = 0; i < len; i++ ) {
            data_list.push(this.at(i))
        }
        const reverse = data_list.reverse()
        this.clear();
        for (let i = 0; i < len; i++ ) {
            this.append(reverse[i])
        }
    }

    indexOf(data) {
        for (let i = 0; i < this.length; i++) {
            if (this.at(i) === data) {
                return i
            }
        }
        return -1
    }
}

const list = new LinkedList;
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.append(6);

list.reverse();
console.log(list.at(0))

console.log(list.at(1))

console.log(list.at(2))

console.log(list.at(3))

console.log(list.at(4))

console.log(list.at(5))

