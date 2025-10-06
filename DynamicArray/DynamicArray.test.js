import { DynamicArray } from "./DynamicArray.js";

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
