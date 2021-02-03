import Snake from './Snake';
import { randomInt } from './utils';
import { LEVEL_WIDTH, LEVEL_HEIGHT, INITIAL_DIRECTION } from './config';

// Models the state for the classic 1970's arcade game.
export default class State {
  constructor(food, snake, nextTurn) {
    this.food = food;
    this.snake = snake;
    this.nextTurn = nextTurn;
  }

  // Generates a random coordinate within the boundaries of the level.
  static createFood() {
    return { x: randomInt(0, LEVEL_WIDTH), y: randomInt(0, LEVEL_HEIGHT) };
  }

  // Generates the initial snake.
  static createSnake() {
    return new Snake([
      {
        x: Math.floor(LEVEL_WIDTH / 2),
        y: Math.floor(LEVEL_HEIGHT / 2),
        direction: INITIAL_DIRECTION,
      },
    ]);
  }

  // Generates the initial state.
  static start() {
    return new State(
      State.createFood(),
      State.createSnake(),
      INITIAL_DIRECTION
    );
  }
}

// The specified snake is out of bounds.
State.prototype.outOfBounds = function (snake) {
  const { x, y } = snake.head;
  return x < 0 || x >= LEVEL_WIDTH || y < 0 || y >= LEVEL_HEIGHT;
};

// The game is over.
State.prototype.gameOver = function () {
  return this.outOfBounds(this.snake) || this.snake.isEatingSelf;
};

// Schedule the next move before the snake approaches the next
// position that it can turn.
State.prototype.scheduleNextTurn = function (direction) {
  if (!this.snake.canMove(direction)) return this;

  return new State(this.food, this.snake, direction);
};

// Update the state of the game for the next time step.
State.prototype.update = function () {
  const prevLength = this.snake.length;

  const newState = new State(
    this.food,
    this.snake.update(this.nextTurn, this.food),
    this.nextTurn
  );

  if (newState.gameOver()) return newState;

  const { snake, nextTurn } = newState;
  if (prevLength < snake.length) {
    return new State(State.createFood(), snake, nextTurn);
  }

  return newState;
};
