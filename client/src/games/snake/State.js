import Snake from './Snake';
import { randomInt } from './utils';
import { UP, DOWN, LEFT, RIGHT } from './Directions';
import { LEVEL_WIDTH, LEVEL_HEIGHT } from './config';

export default class State {
  constructor(food, snake, direction = UP) {
    this.food = food;
    this.snake = snake;
    this.direction = direction;
  }

  static createFood() {
    return { x: randomInt(0, LEVEL_WIDTH), y: randomInt(0, LEVEL_HEIGHT) };
  }

  static createSnake() {
    return new Snake(
      [{ x: Math.floor(LEVEL_WIDTH / 2), y: Math.floor(LEVEL_HEIGHT / 2) }],
      1,
      UP
    );
  }

  static start() {
    return new State(State.createFood(), State.createSnake());
  }
}

State.prototype.outOfBounds = function (snake) {
  const { x, y } = snake.head;
  return x < 0 || x >= LEVEL_WIDTH || y < 0 || y >= LEVEL_HEIGHT;
};

State.prototype.gameOver = function () {
  return this.outOfBounds(this.snake) || this.snake.isEatingSelf;
};

State.prototype.legalMove = function (direction) {
  return (
    (direction == LEFT || direction == RIGHT) ==
    (this.direction == UP || this.direction == DOWN)
  );
};

State.prototype.updateDirection = function (direction) {
  return new State(
    this.food,
    this.snake,
    this.legalMove(direction) || this.snake.length == 1
      ? direction
      : this.direction
  );
};

State.prototype.update = function () {
  const newState = new State(
    this.food,
    this.snake.update(this.direction),
    this.direction
  );

  if (newState.gameOver()) return newState;

  const { snake, food, direction } = newState;
  if (snake.canEat(food)) {
    return new State(State.createFood(), snake.eat(), direction);
  }

  return newState;
};
