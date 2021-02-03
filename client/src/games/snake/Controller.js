import { UP, DOWN, LEFT, RIGHT } from './Directions';

export default class Controller {
  constructor(state) {
    this.state = state;
    this.listeners = [];
    this.trackKeys({
      ArrowUp: UP,
      ArrowDown: DOWN,
      ArrowLeft: LEFT,
      ArrowRight: RIGHT,
    });
  }

  trackKeys(keys) {
    Object.entries(keys).forEach(([key, direction]) => {
      window.addEventListener('keydown', event => {
        if (key == event.key) {
          this.listeners.forEach(listener => listener(direction));
          event.preventDefault();
        }
      });
    });
  }

  register(listener) {
    this.listeners.push(listener);
  }
}
