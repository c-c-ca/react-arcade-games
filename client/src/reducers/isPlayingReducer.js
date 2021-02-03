import { GAME_START, GAME_OVER } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case GAME_START:
      return true;
    case GAME_OVER:
      console.log(action.payload);
      return false;
    default:
      return state;
  }
};
