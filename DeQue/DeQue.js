class DeQue {
	burgerCap = 4;
	arrCap = 8;
	size = 0;

	constructor(iterable = []) {
		this.burger = Array.from({ length: this.burgerCap }, () =>
			Array(this.arrCap).fill(null)
		);

		this.leftBlock = Math.floor(this.burgerCap / 2);
		this.leftIndex = 0;

		this.rightBlock = Math.floor(this.burgerCap / 2);
		this.rightIndex = -1;

		for (let el of iterable) this.pushBack(el);
	}

	pushBack(value) {
		if (this.rightIndex + 1 >= this.arrCap - 1) {
			this.rightBlock++;
			this.rightIndex = 0;
		} else {
			this.rightIndex++;
		}

		this.burger[this.rightBlock][this.rightIndex] = value;
		this.size++;
	}

	pushFront(value) {
		if (this.leftIndex - 1 < 0) {
			this.leftBlock--;
			this.leftIndex = this.arrCap - 1;
		} else {
			this.leftIndex--;
		}

		this.burger[this.leftBlock][this.leftIndex] = value;
		this.size++;
	}

	popBack() {
		if (this.size === 0) return null;

		const value = this.burger[this.rightBlock][this.rightIndex];
		this.burger[this.rightBlock][this.rightIndex] = null;

		if (this.rightIndex === 0) {
			this.rightBlock--;
			this.rightIndex = this.arrCap - 1;
		} else {
			this.rightIndex--;
		}

		this.size--;
		return value;
	}

	popFront() {
		if (this.size === 0) return null;

		const value = this.burger[this.leftBlock][this.leftIndex];
		this.burger[this.leftBlock][this.leftIndex] = null;

		if (this.leftIndex === this.arrCap - 1) {
			this.leftBlock++;
			this.leftIndex = 0;
		} else {
			this.leftIndex++;
		}

		this.size--;
		return value;
	}

	at(index) {
		if (index < 0 || index >= this.size) throw new Error("index not valid");

		let tmp = 0;
		
		for (let i = this.leftBlock; i < this.burgerCap; ++i) {
			for (
				let j = i === this.leftBlock ? this.leftIndex : 0;
				j < this.arrCap;
				++j
			) {
				if (tmp === index) return this.burger[i][j];
				tmp++;
			}
		}
	}

	print() {
		if (this.size === 0) {
			return;
		}

		let output = [];

		for (let i = 0; i < this.burgerCap; ++i) {
			for (let j = 0; j < this.arrCap; ++j) {
				const value = this.burger[i][j];
				if (value !== null && value !== undefined) {
					output.push(value);
				}
			}
		}

		console.log("[" + output.join(", ") + "]");
	}
}

export { DeQue };