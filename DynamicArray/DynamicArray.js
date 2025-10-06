class DynamicArray {
	#size = 0;
	#capacity = 0;
	#arr = null;
	#CAP_EXPONENT = 2;

	constructor(cap) {
		if (cap <= 0) return;
		this.#capacity = cap;
		this.#arr = new Uint32Array(cap);
	}

	at(i) {
		if (i > this.#size - 1) throw new Error("index not valid");
		return this.#arr[i];
	}

	set(i, value) {
		if (i > this.#size - 1) throw new Error("index not valid");
		this.#arr[i] = value;
	}

	front() {
		return this.#arr[0];
	}

	back() {
		return this.#arr[this.#size - 1];
	}

	toArray() {
		const arr = [];

		for (let i = 0; i < this.#size; ++i) {
			arr[i] = this.#arr[i];
		}

		return arr;
	}

	pushBack(elem) {
		if (this.#size === this.#capacity) {
			this.resize(this.#capacity * this.#CAP_EXPONENT);
		}
		this.#arr[this.#size++] = elem;
	}

	popBack() {
		this.#size -= 1;
	}

	insert(pos, value) {
		if (this.#size === this.#capacity) {
			this.resize(this.#capacity * this.#CAP_EXPONENT);
		}

		for (let i = this.#size++; i > pos; --i) {
			this.#arr[i] = this.#arr[i - 1];
		}

		this.#arr[pos] = value;
	}

	erase(pos) {
		this.#size -= 1;
		for (let i = pos; i < this.#size; ++i) {
			this.#arr[i] = this.#arr[i + 1];
		}
	}

	resize(new_cap, fill = 0) {
		const tmp = new Uint32Array(new_cap);
		for (let i = 0; i < this.#size; ++i) {
			tmp[i] = this.#arr[i];
		}

		for (let i = this.#size; i < new_cap; ++i) {
			tmp[i] = fill;
		}
		this.#capacity = new_cap;

		this.#arr = tmp;
	}

	swap(i, j) {
		[this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
	}

	[Symbol.iterator]() {
		const collection = this.#arr;
		const collection_length = this.#size;
		let index = 0;

		return {
			next() {
				if (index < collection_length) {
					return {
						value: collection[index++],
						done: false,
					};
				}
				return { value: undefined, done: true };
			},
		};
	}

	values() {
		const collection = this.#arr;
		const collection_length = this.#size;
		let index = 0;

		return {
			[Symbol.iterator]() {
				return this;
			},
			next() {
				if (index < collection_length) {
					return { value: collection[index++], done: false };
				}
				return { value: undefined, done: true };
			},
		};
	}

	keys() {
		const collection_length = this.#size;
		let index = 0;

		return {
			[Symbol.iterator]() {
				return this;
			},
			next() {
				if (index < collection_length) {
					return { value: index++, done: false };
				}
				return { value: undefined, done: true };
			},
		};
	}

	entries() {
		const collection = this.#arr;
		const collection_length = this.#size;
		let index = 0;

		return {
			[Symbol.iterator]() {
				return this;
			},
			next() {
				if (index < collection_length) {
					return { value: [index, collection[index++]], done: false };
				}
				return { value: undefined, done: true };
			},
		};
	}

	forEach(fn) {
		for (let i = 0; i < this.#size; ++i) {
			fn(this.#arr[i]);
		}
	}

	map(fn) {
		const newArr = new DynamicArray(this.#size);

		for (let i = 0; i < this.#size; ++i) {
			newArr.pushBack(fn(this.#arr[i]));
		}

		return newArr;
	}

	filter(fn) {
		const newArr = new DynamicArray(this.#size);

		for (let i = 0; i < this.#size; ++i) {
			if (fn(this.#arr[i])) {
				newArr.pushBack(this.#arr[i]);
			}
		}

		return newArr;
	}

	reduce(fn, init) {
		let acc = init;
		let start = 0;

		if (acc === undefined) {
			if (this.#size === 0)
				throw new Error("Reduce of empty array with no initial value");
			acc = this.#arr[0];
			start = 1;
		}

		for (let i = start; i < this.#size; ++i) {
			acc = fn(acc, this.#arr[i], i);
		}

		return acc;
	}

	some(fn) {
		for (let i = 0; i < this.#size; ++i) {
			if (fn(this.#arr[i], i)) return true;
		}
		return false;
	}

	every(fn) {
		for (let i = 0; i < this.#size; ++i) {
			if (!fn(this.#arr[i], i)) return false;
		}
		return true;
	}

	find(fn) {
		for (let i = 0; i < this.#size; ++i) {
			if (fn(this.#arr[i], i)) return this.#arr[i];
		}
		return undefined;
	}

	findIndex(fn) {
		for (let i = 0; i < this.#size; ++i) {
			if (fn(this.#arr[i], i)) return i;
		}
		return -1;
	}

	includes(value) {
		for (let i = 0; i < this.#size; ++i) {
			if (this.#arr[i] === value) return true;
		}

		return false;
	}
}

export { DynamicArray }