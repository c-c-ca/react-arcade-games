import { FOOD_COLOR, TAIL_COLOR, BACKGROUND_COLOR } from './Colors';
import { LEVEL_WIDTH, LEVEL_HEIGHT, MS_PER_CELL, RESOLUTION } from './config';
import { UP, DOWN, LEFT, RIGHT } from './Directions';

// The game display.
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

  // Determine location on the canvas for each tail segment.
  static currentLocation(x, y, direction, time) {
    let frac = 1 - (time % MS_PER_CELL) / MS_PER_CELL;

    switch (direction) {
      case UP:
        y += frac;
        break;
      case DOWN:
        y -= frac;
        break;
      case LEFT:
        x += frac;
        break;
      case RIGHT:
        x -= frac;
        break;
    }

    return { x, y };
  }
}

// Update the display according to the current state and time.
View.prototype.syncState = function (state, time) {
  this.clearDisplay();
  this.drawSnake(state.snake, time);
  this.drawFood(state.food);
};

// Clear the display.
View.prototype.clearDisplay = function () {
  this.cx.fillStyle = BACKGROUND_COLOR;
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

// Draw the Snake to the screen.
View.prototype.drawSnake = function (snake, time) {
  snake.tail.forEach(({ x, y, direction }) => {
    const location = View.currentLocation(x, y, direction, time);
    this.drawCell(location.x, location.y, TAIL_COLOR);
  });
};

// Draw the food to the screen.
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
