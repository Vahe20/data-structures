# DeQue

`DeQue` is a custom double-ended queue (deque) implementation in JavaScript using a "bucket" block structure for efficient insertion and deletion from both ends.  

---

## Table of Contents

- [Class Overview](#class-overview)  
- [Constructor](#constructor)  
- [Methods](#methods)  
- [Examples](#examples)  

---

## class-overview

* bucketSize – number of blocks in the deque.
* blockSize – number of slots per block.
* size – number of elements currently in the deque.
* map – internal 2D array storing elements.
* headBlock / headIndex – pointers for the front of the deque.
* tailBlock / tailIndex – pointers for the back of the deque.

## Constructor

```js
    new DeQue(iterable = [], initialBucketSize = 4, initialBlockSize = 8)
```
* iterable – optional array of elements to initialize the deque.
* Initializes the internal map structure and pointers.


## methods

### pushBack(value)

* Adds value to the back of the deque.
```js
    dq.pushBack(5);
```

### pushFront(value)

* Adds value to the front of the deque.
```js
    dq.pushFront(0);
```

### popBack()

* Removes and returns the element from the back of the deque.
* Returns null if the deque is empty.
```js
    const last = dq.popBack();
```

### popFront()

* Removes and returns the element from the front of the deque.
* Returns null if the deque is empty.
```js
    const first = dq.popFront();
```

### at(index)

* Returns the element at the given index.
* Throws an error if the index is out of bounds.
```js
    const el = dq.at(2);
```

### size()

* return this size.

```js
    const size = dq.size();
```

### visualize()

* Prints all elements of the deque in order to the console.
```js
    dq.visualize(); // [0, 1, 2, 3] 
```


## Examples

```js 
import { DeQue } from './DeQue.js';

const dq = new DeQue([1, 2, 3]);

dq.pushFront(0);  // [0, 1, 2, 3]
dq.pushBack(4);   // [0, 1, 2, 3, 4]

dq.popFront();    // returns 0, deque: [1, 2, 3, 4]
dq.popBack();     // returns 4, deque: [1, 2, 3]

console.log(dq.at(1)); // 2

dq.print(); // [1, 2, 3]
```