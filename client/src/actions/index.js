import { GAME_START, GAME_OVER } from './types';
import { snake } from '../games';

export const runGame = () => async dispatch => {
  dispatch(startGame());
  dispatch(endGame(await snake.runGame()));
};

export const startGame = () => ({ type: GAME_START });
export const endGame = payload => ({ type: GAME_OVER, payload });
