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

const LinkedList = (function(){
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
})();
    
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

//Hash Map Practice: