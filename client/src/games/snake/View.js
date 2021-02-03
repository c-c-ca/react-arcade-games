import { FOOD_COLOR, TAIL_COLOR, BACKGROUND_COLOR } from './Colors';
import { LEVEL_WIDTH, LEVEL_HEIGHT, MS_PER_CELL, RESOLUTION } from './config';

export default class View {
  constructor() {
    this.canvas = document.getElementById('display');

    // Increase resolution
    this.canvas.style.width = `${this.canvas.width}px`;
    this.canvas.style.height = `${this.canvas.height}px`;
    this.canvas.width *= RESOLUTION;
    this.canvas.height *= RESOLUTION;

    this.cx = this.canvas.getContext('2d');

    // Divide canvas into cells
    this.cellWidth = this.canvas.width / LEVEL_WIDTH;
    this.cellHeight = this.canvas.height / LEVEL_HEIGHT;
  }

  static currentLocation(a, b, time) {
    return (a - b) * ((time % MS_PER_CELL) / MS_PER_CELL) + b;
  }
}

View.prototype.syncState = function (state, prevState, time) {
  this.clearDisplay();
  this.drawSnake(state.snake, prevState.snake, time);
  this.drawFood(state.food);
};

View.prototype.clearDisplay = function () {
  this.cx.fillStyle = BACKGROUND_COLOR;
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

View.prototype.drawSnake = function (snake, prevSnake, time) {
  prevSnake.tail.forEach(({ x, y }, i) => {
    const next = snake.tail[i];
    this.drawCell(
      View.currentLocation(next.x, x, time),
      View.currentLocation(next.y, y, time),
      TAIL_COLOR
    );
  });
};

View.prototype.drawFood = function (food) {
  this.drawCell(food.x, food.y, FOOD_COLOR);
};

View.prototype.drawCell = function (x, y, color) {
  const xCenter = (x + 0.5) * this.cellWidth;
  const yCenter = (y + 0.5) * this.cellHeight;

  this.cx.fillStyle = color;
  this.cx.beginPath();
  this.cx.moveTo(xCenter, yCenter);
  this.cx.ellipse(
    xCenter,
    yCenter,
    this.cellWidth * 0.3,
    this.cellHeight * 0.3,
    0,
    0,
    2 * Math.PI
  );
  this.cx.fill();
};
