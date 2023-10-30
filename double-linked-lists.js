//Doubly Linked Lists

 class Node {
    constructor(val) {
        this.val  = val;
        this.next = null;
        this.prev = null;
    }
 }
/** LinkedList: chained together nodes. */

class LinkedList {
    constructor (vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

/** _get(idx): return node at idx. */   

    _get(idx) {
        if ( idx >= this.length || idx <0 ) {
            throw new error("Invalid Index")
        }
        let currentNode = this.head;
        if (idx === 0) return currentNode;
        if (idx === this.length - 1) return this.tail;

        for (let i = 1; i <= idx; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }

/** unshift(val): add new value to start of list. */

    unshift(val) {
        let newNode = new Node(val);
        
        if (this.head !== null) {
            this.head.prev = newNode;
            newNode.head = newNode;
        }
        if( this.tail === null) this.tail = newNode;
        this.head = newNode;
        this.length++;
    }

/** pop(): return & remove last item. */

    pop() {
        if (this.length === 0) 
        throw new Error ("Empty List");

        const prevTail = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.length--;
        return prevTail.val;
    }
/** shift(): return & remove first item. */

    shift() {
        const prevHead = this.head;
        if (this.length === 1) {
            (this.tail = null), (this.head = null);
        } else {
            this.head = prevHead.next;
            this.head.prev = null;
        }
        this.length--;
        return prevHead.val;
    }
/** getAt(idx): get val at idx. */
    getAt(idx) {
        let node = this._get(idx);
        return node.val
    }
/** setAt(idx, val): set val at idx to val */
    setAt(idx, val) {
        let node = this._get(idx);
        node.val = val;
    }
/** insertAt(idx, val): add node w/val before idx. */
    insertAt(idx, val) {
        if (idx === 0) {
            this.unshift(val);
        } else if (idx === this.length) {
            this.push(val);
        } else {
            let node = this._get(idx - 1);
            let newNode = new Node(val);
            let nextNode = node.next;

            node.next = newNode;
            newNode.next = nextNode;
            newNode.prev = node;
            nextNode.next = newNode;
            this.length++;
        }
    }
/** removeAt(idx): return & remove item at idx, */
    removeAt(idx) {
        if (idx === 0) return this.pop();
        if (idx === this.length) return this.shift();

        let deletedNode = this._get(idx);
        deletedNode.next.prev = deletedNode.prev;
        deletedNode.prev.next = deletedNode.next;
        this.length--;
        return deletedNode.val
    }    

/** average(): return an average of all values in the list */
    average () {
        if (this.length === 0) return 0;

        let total = this.head.val;
        let current = this.head;

        for (let i = 1; i < this.length; i++) {
            total += current.val;
            current = current.next;
        }
        return total / this.length;
    }

}

module.exports = LinkedList;

