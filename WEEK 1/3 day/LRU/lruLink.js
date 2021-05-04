class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.maxSize = 2;
        this.cache = {};
    }

    put(key,value){
        let newNode

        // if the key not present in cache
        if (this.cache[key] === undefined) newNode = new Node(key, value);

        //if we have an empty list
        if(this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
            this.size++;
            this.cache[key] = newNode;
            return this;
        }

        if (this.size === this.maxSize) {
            //remove from cache
            delete this.cache[this.tail.key]

            //set new tail
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.size--;
        }

        //add an item to the head
        this.head.prev = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    
        //add to cache
        this.cache[key] = newNode; 
        return this;
    }
}
let cache = new LRUCache();
cache.put(1,'a');
cache.put(2,'s');
cache.put(3,'dd');
cache.put(4,'a');
cache.put(5,'g');
cache.put(6,'w');
console.log(cache.size);