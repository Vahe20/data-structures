class DeQue {
	#bucketSize = 0;
	#blockSize = 0;
	#map = null;
	#size = 0;

	constructor(iterable = [], initialBucketSize = 4, initialBlockSize = 8) {
		this.#bucketSize = initialBucketSize;
		this.#blockSize = initialBlockSize;

		this.#map = Array.from({ length: this.#bucketSize }, () =>
			Array(this.#blockSize).fill(null)
		);

		const mid = Math.floor(this.#bucketSize / 2);

		this.headBlock = mid;
		this.headIndex = 0;

		this.tailBlock = mid;
		this.tailIndex = -1;

		for (let el of iterable) this.pushBack(el);
	}

	//helper

	#copy_pos(block, index) {
		return { block, index };
	}

	#write(pos, value) {
		this.#map[pos.block][pos.index] = value;
	}

	#read(pos) {
		return this.#map[pos.block][pos.index];
	}

	#resize() {
		const oldMap = this.#map;
		const oldSize = this.#bucketSize;

		this.#bucketSize *= 2;
		const newMap = Array.from({ length: this.#bucketSize }, () =>
			Array(this.#blockSize).fill(null)
		);

		const offset = Math.floor(this.#bucketSize / 4);

		for (let i = 0; i < oldSize; i++) {
			newMap[i + offset] = oldMap[i];
		}

		this.headBlock += offset;
		this.tailBlock += offset;
		this.#map = newMap;

		return offset;
	}

	#inc(pos) {
		if (pos.index + 1 > this.#blockSize - 1) {
			pos.index = 0;
			if (pos.block + 1 > this.#bucketSize - 1) {
				const offset = this.#resize();
				pos.block += offset;
			}
			++pos.block;
		} else {
			++pos.index;
		}
	}

	#dec(pos) {
		if (pos.index - 1 < 0) {
			pos.index = this.#blockSize - 1;
			if (pos.block - 1 < 0) {
				const offset = this.#resize();
				pos.block += offset;
			}
			--pos.block;
		} else {
			--pos.index;
		}
	}

	//interface

	pushBack(value) {
		const pos = this.#copy_pos(this.tailBlock, this.tailIndex);

		this.#inc(pos);
		this.#write(pos, value);

		this.tailBlock = pos.block;
		this.tailIndex = pos.index;

		++this.#size;
	}

	pushFront(value) {
		const pos = this.#copy_pos(this.headBlock, this.headIndex);

		this.#dec(pos);
		this.#write(pos, value);

		this.headBlock = pos.block;
		this.headIndex = pos.index;

		++this.#size;
	}

	popBack() {
		if (this.#size === 0) return null;

		const pos = this.#copy_pos(this.tailBlock, this.tailIndex);

		const value = this.#read(pos);
		this.#write(pos, null);

		this.#dec(pos);
		this.tailBlock = pos.block;
		this.tailIndex = pos.index;

		--this.#size;
		return value;
	}

	popFront() {
		if (this.#size === 0) return null;

		const pos = this.#copy_pos(this.headBlock, this.headIndex);

		const value = this.#read(pos);

		this.#write(pos, null);

		this.#inc(pos);
		this.headBlock = pos.block;
		this.headIndex = pos.index;

		--this.#size;
		return value;
	}

	at(index) {
		if (index < 0 || index >= this.#size) throw new Error("index not valid");

		const pos = this.#copy_pos(this.headBlock, this.headIndex);

		for (let i = 0; i < index; ++i)
			this.#inc(pos);

		return this.#read(pos);
	}

	front() {
		if (this.#size === 0) return null;
		return this.#map[this.headBlock][this.headIndex];
	}

	back() {
		if (this.#size === 0) return null;
		return this.#map[this.tailBlock][this.tailIndex];
	}

	size() {
		return this.#size;
	}

	visualize() {
		for (let i = 0; i < this.#map.length; ++i) {
			const bucket = this.#map[i];
			if (!bucket) continue;

			const display = bucket
				.map(elem => (elem === null ? "." : elem))
				.join(" ");
			console.log(`Bucket_${i}: [ ${display}]`);
		}
	}

	*[Symbol.iterator]() {
		const pos = this.#copy_pos(this.headBlock, this.headIndex);
		for (let i = 0; i < this.#size; ++i) {
			yield this.#read(pos);
			this.#inc(pos);
		}
	}
}

export { DeQue };
