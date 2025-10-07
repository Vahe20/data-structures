class Node {
	constructor(data, next = null, prev = null) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
}

class LinkedList {
	#head = null;
	#tail = null;
	#size = 0;

	constructor(iterables = []) {
		for (const item of iterables) {
			this.push_back(item);
		}
	}

	// helper

	#merge(left, right, compareFn) {
		let head = new Node(-1);
		let current = head;

		while (left && right) {
			if (
				compareFn
					? compareFn(left.data, right.data) <= 0
					: left.data - right.data <= 0
			) {
				current.next = left;
				left.prev = current;
				left = left.next;
			} else {
				current.next = right;
				right.prev = current;
				right = right.next;
			}
			current = current.next;
		}

		current.next = left || right;
		if (current.next) current.next.prev = current;

		return head.next;
	}

	#merge_sort(head, compareFn) {
		if (!head || !head.next) return head;

		let slow = head;
		let fast = head.next;

		while (fast && fast.next) {
			slow = slow.next;
			fast = fast.next.next;
		}

		let mid = slow.next;
		slow.next = null;

		let left = this.#merge_sort(head, compareFn);
		let right = this.#merge_sort(mid, compareFn);

		let sortedHead = this.#merge(left, right, compareFn);
		sortedHead.prev = null;
		return sortedHead;
	}

	// interface

	size() {
		return this.#size;
	}

	isEmpty() {
		return this.#size === 0;
	}

	clear() {
		this.#head = null;
		this.#tail = null;
		this.#size = 0;
	}

	push_front(value) {
		const newNode = new Node(value);

		if (this.#head === null) {
			this.#head = newNode;
			this.#tail = newNode;
		} else {
			newNode.next = this.#head;
			this.#head.prev = newNode;
			this.#head = newNode;
		}

		this.#size++;
	}

	push_back(value) {
		const newNode = new Node(value);

		if (this.#head === null) {
			this.#head = newNode;
			this.#tail = newNode;
		} else {
			newNode.prev = this.#tail;
			this.#tail.next = newNode;
			this.#tail = newNode;
		}

		this.#size++;
	}

	pop_front() {
		if (this.#head === null) return null;

		if (this.#head === this.#tail) {
			this.#head = null;
			this.#tail = null;
		} else {
			this.#head = this.#head.next;
			this.#head.prev = null;
		}

		this.#size--;
	}

	pop_back() {
		if (this.#head === null) return null;

		if (this.#head === this.#tail) {
			this.#head = null;
			this.#tail = null;
		} else {
			this.#tail = this.#tail.prev;
			this.#tail.next = null;
		}

		this.#size--;
	}

	front() {
		return this.#head.data;
	}

	back() {
		return this.#tail.data;
	}

	at(index) {
		if (index < 0 || index >= this.#size) return null;

		let current = this.#head;

		for (let i = 0; i < index; ++i) {
			current = current.next;
		}

		return current.data;
	}

	insert(index, value) {
		if (index < 0 || index > this.#size) return false;

		if (index === 0) {
			this.push_front(value);
			return true;
		}

		if (index === this.#size) {
			this.push_back(value);
			return true;
		}

		let current = this.#head;

		for (let i = 0; i < index; ++i) {
			current = current.next;
		}

		const prev = current.prev;
		const newNode = new Node(value, current, prev);

		prev.next = newNode;
		current.prev = newNode;

		this.#size++;
		return true;
	}

	erase(index) {
		if (index < 0 || index >= this.#size) return false;

		if (index === 0) {
			this.pop_front();
			return true;
		}

		if (index === this.#size - 1) {
			this.pop_back();
			return true;
		}

		let current = this.#head;

		for (let i = 0; i < index; ++i) {
			current = current.next;
		}

		const prev = current.prev;
		const next = current.next;

		prev.next = next;
		next.prev = prev;

		this.#size--;
		return true;
	}

	remove(value, equals = Object.is) {
		if (this.#size === 0) return false;

		if (equals(this.#head.data, value)) {
			this.#head = this.#head.next;

			if (this.#head !== null) {
				this.#head.prev = null;
			} else {
				this.#tail = null;
			}

			this.#size--;
			return true;
		}

		let current = this.#head;

		for (let i = 0; i < this.#size; ++i) {
			if (equals(value, current.data)) {
				this.erase(i);
				return true;
			}

			current = current.next;
		}

		return false;
	}

	reverse() {
		let current = this.#head;
		let tmp = null;

		while (current) {
			tmp = current.prev;
			current.prev = current.next;
			current.next = tmp;
			current = current.prev;
		}

		if (tmp !== null) {
			this.#tail = this.#head;
			this.#head = tmp.prev;
		}
	}

	sort(compareFn) {
		this.#head = this.#merge_sort(this.#head, compareFn);

		let current = this.#head;
		this.#tail = null;
		while (current) {
			if (!current.next) this.#tail = current;
			current = current.next;
		}
	}

	visualize() {
		let current = this.#head;
		let result = "";
		while (current) {
			result += " < " + current.data + " > ";
			current = current.next;
		}
		console.log(result + "null");
	}
}

export { LinkedList, Node };
