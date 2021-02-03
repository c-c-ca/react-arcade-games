import State from './State';
import View from './View';
import Controller from './Controller';
import { MS_PER_CELL } from './config';

let display = null;
let controller = new Controller();

function runAnimation(frameFunc) {
  let lastTime = null;
  let updateState = true;
  function frame(time) {
    if (lastTime) {
      let frameTime = time - lastTime;
      updateState = frameTime > MS_PER_CELL;

      if (frameFunc(frameTime, updateState) === false) return;
    }

    if (updateState) lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runGame() {
  if (!display) display = new View();

  let state = State.start();
  controller.register(direction => {
    state = state.updateDirection(direction);
  });

  let prevState = null;
  return new Promise(resolve => {
    runAnimation((time, update) => {
      if (update) {
        prevState = state;
        state = state.update();
      }

      if (prevState != null) {
        display.syncState(state, prevState, time);
      }

      if (state.gameOver()) {
        display.clearDisplay();
        resolve(state.snake.length);
        return false;
      }

      return true;
    });
  });
}

export default { runGame };
