export default class MinHeap<
  T extends {
    compare: (another: T) => 1 | 0 | -1;
    equals: (another: T) => boolean;
  }
> {
  private heap: Array<T> = new Array<T>();
  constructor() {}

  public isEmpty() {
    return this.heap.length === 0;
  }

  public getMin = () => {
    return this.heap[0];
  };

  public contains(value: T): [boolean, number] {
    let iterationCount = 0;
    const contains = !!this.heap.find((val) => {
      iterationCount += 1;
      return val.equals(value);
    });
    return [contains, iterationCount];
  }

  public insert = (x: T): number => {
    let iterationCount = 0;

    this.heap.push(x);
    if (this.heap.length > 1) {
      let currentIndex = this.heap.length - 1;

      while (
        currentIndex > 1 &&
        this.heap[Math.floor(currentIndex / 2)].compare(
          this.heap[currentIndex]
        ) === 1
      ) {
        iterationCount += 1;
        this.swapIndex(Math.floor(currentIndex / 2), currentIndex);
        currentIndex = Math.floor(currentIndex / 2);
      }
    }

    return iterationCount;
  };

  public remove = (): number => {
    let iterationCount = 0;

    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.splice(this.heap.length - 1, 1);

    let parent = 0;
    let leftChildIndex = 2 * parent + 1;
    let rightChildIndex = 2 * parent + 2;
    let left =
      leftChildIndex > this.heap.length ? null : this.heap[leftChildIndex];
    let right =
      rightChildIndex > this.heap.length ? null : this.heap[rightChildIndex];
    do {
      iterationCount += 1;
      // no children
      if (!left && !right) {
        return iterationCount;
      }

      // 1 child
      else if (!right && left && this.heap[parent].compare(left) === 1) {
        this.swapIndex(parent, leftChildIndex);
        parent = leftChildIndex;
      }

      // 2 children
      else if (left && right) {
        if (left.compare(right) <= 0 && this.heap[parent].compare(left) === 1) {
          this.swapIndex(parent, leftChildIndex);
          parent = leftChildIndex;
        } else if (
          left.compare(right) === 1 &&
          this.heap[parent].compare(right) === 1
        ) {
          this.swapIndex(parent, rightChildIndex);
          parent = rightChildIndex;
        }
      }

      leftChildIndex = 2 * parent + 1;
      rightChildIndex = 2 * parent + 2;
      left =
        leftChildIndex > this.heap.length ? null : this.heap[leftChildIndex];
      right =
        rightChildIndex > this.heap.length ? null : this.heap[rightChildIndex];
    } while (
      left &&
      right &&
      (this.heap[parent].compare(left) === 1 ||
        this.heap[parent].compare(right) === 1)
    );

    return iterationCount;
  };

  private swapIndex = (a: number, b: number) => {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  };

  get length() {
    return this.heap.length;
  }
}
