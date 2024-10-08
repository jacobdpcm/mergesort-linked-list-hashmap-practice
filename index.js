//Merge Sort Practice:

function mergeSort(array){
    if(array.length === 1) return array;
    else {
    //build left and right halves
    let left = []
    let right = []
    let sortedArray = []
    if(array.length%2 === 0){
        left = array.slice(0, array.length/2);
        right = array.slice(array.length/2, array.length)
    } else {
        left = array.slice(0, (array.length-1)/2)
        right = array.slice((array.length-1)/2, array.length)
    }

    //start recursion
    left = mergeSort(left);
    right = mergeSort(right);
    while(left.length>0 && right.length>0){
        if(left[0] <= right[0]){
        sortedArray = sortedArray.concat(left.shift())
        } else {
        sortedArray = sortedArray.concat(right.shift())
        }
    }
    //Once either array has nothing just concat the rest
    sortedArray = sortedArray.concat(left);
    sortedArray = sortedArray.concat(right);
    
    return sortedArray;
    }
}

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------


//Linked List Practice:

function newNode(nodeValue = null){
    let value = nodeValue;
    let nextNode = null;

    return {value, nextNode}
}

function newList(){
    let head = null;
    let tail = null;
    let size = 0;

    const append = (value) => {
    const node = newNode(value);
    if(tail === null){
        head = node;
        tail = node;
    } else {
        tail.nextNode = node;
        tail = node;
    }
    size++;
    }

    const prepend = (value) => {
    const node = newNode(value);
    if(head === null){
        head = node;
        tail = node;
    } else {
        node.nextNode = head;
        head = node;
    }
    size++;
    }

    const at = (index) => {
    if(index < 0 || index >= size){
        console.log('index not found')
    } else {
        currentNode = head;
        for(let i = 0; i < index; i++){
        currentNode = currentNode.nextNode;
        }
        return currentNode;
    }
    }

    const pop = () => {
    if(head === null){
        return;
    } else if(size === 1){
        head = null;
        tail = null;  
        size--;        
    } else {
        let currentNode = head;
        let penult = size - 1;
        for(let i=1; i<penult; i++){
        currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = null;
        tail = currentNode;
        size--;          
    }
    }

    const contains = (value) => {
    currentNode = head;
    if(currentNode.value === value) return true;
    while(currentNode.nextNode !== null){
        currentNode = currentNode.nextNode;
        if(currentNode.value === value) return true;
    }
    
    return false //if value not found
    }

    const find = (value) => {
    currentNode = head;
    let index = null;
    for(let i=0; i<size; i++){
        if(currentNode.value === value) return i;
        else currentNode = currentNode.nextNode;
    }
    return null;
    }

    const toString = () => {
    if(head === null) return '';
    listString = '';
    currentNode = head;
    for(let i=0; i<size; i++){
        listString = listString + '( ' + currentNode.value + ' )' + ' -> ';
        currentNode = currentNode.nextNode;
    }
    listString = listString + 'null';
    return listString;
    }

    const getHead = () => {return head};
    const getTail = () => {return tail};
    const getSize = () => {return size};
    
    return {append, prepend, getSize, getHead, getTail, at, pop, contains, find, toString}
};
    
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

//Hash Map Practice:

function HashMap(){
    let buckets = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]; //16 initial buckets
    let totalBuckets = 16;
    let size = 0;
    const loadFactor = .75;
    let fullBuckets = 0;

    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for(let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
        }
        return hashCode;
    }

    const growBuckets = () => {
        const allEntries = entries();
        totalBuckets *= 2;
        buckets = new Array(totalBuckets).fill(null).map(()=>{return [];});
        fullBuckets = 0;
        size = 0;
        //Add all of the entries to the new hashmap hereeeeeeeeeeeeeeeeeeeeee:
        allEntries.forEach(entry => {
            set(entry[0], entry[1]);
        })
    }

    const set = (key, value) => {
        const index = hash(key);
        const bucket = buckets[index];
        //update value:
        for(let i=0;i<bucket.length; i++){
            if(bucket[i][0] === key){
                bucket[i][1] = value;
                return;
            }
        }
        //or create new one:
        if(bucket.length === 0) fullBuckets++; //Filling a new bucket
        bucket.push([key, value]);
        size++;

        if(fullBuckets >= (totalBuckets*loadFactor)){growBuckets()}
    }

    const get = (key) => {
        const index = hash(key);
        const bucket = buckets[index];
        for(let i=0; i<bucket.length; i++){
            if(bucket[i][0] === key) return bucket[i][1];
        }
        return null;
    }

    const has = (key) => {
        const index = hash(key);
        const bucket = buckets[index];
        for(let i=0; i<bucket.length; i++){
            if(bucket[i][0] === key) return true;
        }
        return false;
    }

    const remove = (key) => {
        const index = hash(key);
        const bucket = buckets[index];
        for(let i=0; i<bucket.length; i++){
            if(bucket[i][0] === key) {
                bucket.splice(i, 1);
                size--;
                if(bucket.length === 0) fullBuckets--;
                return true;
            }
        }
        return false;
    }

    const length = () => {
        let keyTotal = 0;
        buckets.forEach(bucket => {keyTotal += bucket.length});
        return keyTotal;
    }

    const clear = () => {
        buckets = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
        size = 0;
        totalBuckets = 16;
        size = 0;
        fullBuckets = 0;
    }

    const keys = () => {
        let array = [];
        buckets.forEach(bucket => {
            for(let i=0; i<bucket.length; i++){
                array.push(bucket[i][0]);
            }
        })
        return array;
    }

    const values = () => {
        let array = [];
        buckets.forEach(bucket => {
            for(let i=0; i<bucket.length; i++){
                array.push(bucket[i][1]);
            }
        })
        return array;
    }

    const entries = () => {
        let array = [];
        buckets.forEach(bucket => {
            for(let i=0; i<bucket.length; i++){
                array.push(bucket[i]);
            }
        })
        return array;
    }

    const getBuckets = () => {
        return buckets;
    }

    const getFullBuckets = () => {
        return fullBuckets;
    }

    return {set, get, has, remove, length, clear, keys, values, entries, getBuckets, getFullBuckets}
};

const test = HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('b', 'golden');




