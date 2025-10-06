# DynamicArray (JS) — Assignment Description
## Overview
  Implement a DynamicArray class in JavaScript, similar to C++'s  vector . The array will be backed by a
  typed buffer ( Uint32Array ) with explicit  size  and  capacity . The class should provide both vector-
  like functionality and modern JS features (map, filter, reduce, iteration).

## Internal Representation
* Buffer: Uint32Array  used internally.
* size: Number of valid stored elements.
* capacity: Total allocated slots in the buffer.
* Growth policy: When adding beyond capacity, allocate a new buffer (double the capacity) and copy old elements.
* Type restriction: Only unsigned 32-bit integers ( 0 ... 2^32−1 ).

## Core Functionality
### Construction
* new DynamicArray()  → empty.
* new DynamicArray(initialCapacity)  → with reserved capacity.
* DynamicArray.from(iterable)  → build from iterable.
  
### Capacity & Size
* size()  → current number of elements.
* capacity()  → allocated buffer size.
* empty()  → true if size is 0.
* reserve(n)  → grow buffer to at least  n .
* shrinkToFit()  → shrink buffer to current size.
*clear()  → reset size to 0.
  
### Element Access
* at(i)  → value at index  i  (with bounds check).
* set(i, value)  → assign value at index  i .
* front() ,  back()  → first/last element.
* toArray()  → export as normal JS array

### Modifiers
* pushBack(value)  → append.
* popBack()  → remove last element.
* insert(pos, value)  → insert at index (shift right).
* erase(pos)  → remove at index (shift left).
* resize(n, fill=0)  → change size, filling new slots with default value.
* swap(i, j)  → swap two elements

## Traversal & Iteration
* [Symbol.iterator]()  → allows  for..of .
* values()  → iterator of values.
* keys()  → iterator of indices.
* entries()  → iterator of  [index, value]  pairs.
* forEach(fn)  → apply function to each element

## Higher-Order Methods
#### (operate over logical  size , not full capacity)
* map(fn)  → returns new DynamicArray.
* filter(fn)  → returns new DynamicArray with selected elements.
* reduce(fn, init?)  → reduce to single value.
* some(fn) ,  every(fn)  → boolean checks.
* find(fn) ,  findIndex(fn)  → search functions.
* includes(value)  → boolean check.

## Complexity

| Method               | Time                     |
| ------------------- | ------------------------- |
| `pushBack`          | Amortized **O(1)**        |
| `popBack`           | **O(1)**                  |
| `insert/erase`      | **O(n)**                  |
| `reserve`           | **O(n)** (copy)           |
| `shrinkToFit`       | **O(n)**                  |
| `map/filter/reduce` | **O(n)**                  |

## Edge Cases to Handle
* Push/insert until multiple resizes happen.
* Insert/erase at front, middle, and back.
* Empty array operations (pop, front, back).
* Type errors if inserting invalid numbers.
* Iteration should only show  size  elements (not spare capacity).

## Example Usage
```js
  const da = new DynamicArray(2);
  da.pushBack(10);
  da.pushBack(20);
  da.pushBack(30); // triggers resize
  da.insert(1, 99); // [10, 99, 20, 30]
  da.erase(2); // [10, 99, 30]
  console.log([...da]); // [10, 99, 30]
  const squares = da.map(x => x * x);
  console.log(squares.toArray()); // [100, 9801, 900]
  const sum = da.reduce((acc, x) => acc + x, 0);
  console.log(sum); // 139
```
  

## Deliverables
* DynamicArray.js  — implementation
* DynamicArray.test.js  — test cases
* README.md  — notes on design, growth policy, complexities, edge cases
