import { DeQue } from "./DeQue.js";

const dq = new DeQue();

// Test pushBack
dq.pushBack(1);
dq.pushBack(2);
dq.pushBack(3);
console.log(dq.size === 3, "pushBack: size should be 3");
console.log(dq.at(0) === 1, "pushBack: first element should be 1");
console.log(dq.at(2) === 3, "pushBack: third element should be 3");

// Test pushFront
dq.pushFront(0);
console.log(dq.size === 4, "pushFront: size should be 4");
console.log(dq.at(0) === 0, "pushFront: first element should be 0");

// Test popBack
dq.popBack();
console.log(dq.size === 3, "popBack: size should be 3");
console.log(dq.at(2) === 2, "popBack: last element should be 2");

// Test popFront
dq.popFront();
console.log(dq.size === 2, "popFront: size should be 2");
console.log(dq.at(0) === 1, "popFront: first element should be 1");

// Test at with invalid index
let errorCaught = false;
try {
	dq.at(10);
} catch (e) {
	errorCaught = true;
}
console.log(errorCaught, "at: should throw an error for invalid index");

// Test print (visual)
dq.print(); // should output [1, 2]
