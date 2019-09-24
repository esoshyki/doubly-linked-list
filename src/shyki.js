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
        return this
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
        return this.travel(index).data;
    }

    insertAt(index, data) {
        if (index - 1 > this.length ) return 'Out of range'
        const prev = this.travel(index - 1);
        const next = this.travel(index);
        const newNode = new Node(data, prev, next);
        prev.next = newNode; next.prev = newNode; this.length += 1;
        return this
    }

    isEmpty() { return this.length === 0 }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this
    }

    deleteAt(index) {
        if (index - 1 > this.length ) return 'Out of range';
        const node = this.travel(index);
        const prev = node.prev;
        const next = node.next;
        prev ? prev.next = next : this._head = next;
        next? next.prev = prev : this._tail = prev;        
        return this
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
        return this
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

list.append(4).reverse().deleteAt(0).clear().insertAt(0, 3);
