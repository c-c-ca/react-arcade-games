import { combineReducers } from 'redux';
import isPlayingReducer from './isPlayingReducer';

export default combineReducers({
  isPlaying: isPlayingReducer,
});
