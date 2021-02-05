import axios from 'axios';
import history from '../history';
import { FETCH_USER, GAME_START, GAME_OVER } from './types';
import { snake } from '../games';

export const fetchUser = () => async dispatch => {
  const user = (await axios.get('/api/current_user')).data;
  dispatch({
    type: FETCH_USER,
    payload: user,
  });
  if (user && !user.username) {
    history.push('/profile');
  }
};

export const runGame = () => async dispatch => {
  dispatch(startGame());
  dispatch(endGame(await snake.runGame()));
};

export const startGame = () => ({ type: GAME_START });

export const endGame = score => dispatch => {
  dispatch({ type: GAME_OVER });
  dispatch(updateTopScore(score));
};

export const updateTopScore = score => async dispatch =>
  dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/play-stats', { score })).data,
  });

export const setUsername = username => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: (await axios.post('/api/username', { username })).data,
  });
  history.push('/');
};
