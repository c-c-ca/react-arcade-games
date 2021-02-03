import { UP, DOWN, LEFT, RIGHT } from './Directions';

// Models a two-dimensional snake in the classic 1970's arcade game.
export default class Snake {
  constructor(tail) {
    this.tail = tail;
  }

  // A Snake with the specified head can eat the item at the given position
  static canEat(head, item) {
    return head.x == item.x && head.y == item.y;
  }

  // The head of this Snake.
  get head() {
    return this.tail[0];
  }

  get length() {
    return this.tail.length;
  }

  // The current direction for this Snake.
  get direction() {
    return this.head.direction;
  }

  // The head and one other segment of the tail occupy the same position.
  get isEatingSelf() {
    return this.tail
      .slice(1, this.tail.length)
      .some(segment => Snake.canEat(this.head, segment));
  }

  // This Snake can move in the specified direction.
  canMove(direction) {
    return this.isAPerpendicularTurn(direction) || this.length == 1;
  }

  // The specified direction is perpendicular to the current direction
  // for this Snake.
  isAPerpendicularTurn(direction) {
    return (
      (direction == LEFT || direction == RIGHT) ==
      (this.direction == UP || this.direction == DOWN)
    );
  }

  // Update this Snake according to the specified direction.
  update(direction, food) {
    return new Snake(this.updateTail(direction, food));
  }

  // Update the tail for this snake.
  updateTail(direction, food) {
    const newHead = this.updateHead(direction);

    if (!Snake.canEat(newHead, food)) this.tail.pop();

    return [newHead, ...this.tail];
  }

  // Position the head of this Snake according to the specified direction.
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
    return { x, y, direction };
  }
}
