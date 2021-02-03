import { UP, DOWN, LEFT, RIGHT } from './Directions';

export default class Snake {
  constructor(tail, length) {
    this.tail = tail;
    this.length = length;
  }

  get head() {
    return this.tail[0];
  }

  get isEatingSelf() {
    return this.tail
      .slice(1, this.tail.length)
      .some(({ x, y }) => this.head.x == x && this.head.y == y);
  }

  canEat(food) {
    return this.tail[0].x == food.x && this.tail[0].y == food.y;
  }

  eat() {
    return new Snake(this.tail, this.length + 1);
  }

  update(direction) {
    return new Snake(this.updateTail(direction), this.length);
  }

  updateTail(direction) {
    return [this.updateHead(direction), ...this.tail.slice(0, this.length - 1)];
  }

  updateHead(direction) {
    let { x, y } = this.head;
    switch (direction) {
      case UP:
        y--;
        break;
      case DOWN:
        y++;
        break;
      case LEFT:
        x--;
        break;
      case RIGHT:
        x++;
        break;
    }
    return { x, y };
  }
}
