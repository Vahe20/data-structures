import { LinkedList } from "./LinkedList.js";

const list = new LinkedList([10, 20, 30]);

// Add elements
list.push_back(40);
list.push_front(5);

// Insert at index
list.insert(2, 15); // insert 15 at index 2

// Access elements
console.log(list.front()); // 5
console.log(list.back()); // 40
console.log(list.at(2)); // 15

// Remove elements
list.remove(20); // remove value 20
list.pop_front(); // remove first element
list.pop_back(); // remove last element

list.print()

// Reverse the list
list.reverse();

// Sort the list
list.sort((a, b) => a - b); // ascending numeric sort

// Print list
list.print(); // < 10 > < 15 > < 30 > null

// Check size
console.log(list.size()); // 3
