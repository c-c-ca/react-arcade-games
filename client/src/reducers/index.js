import { combineReducers } from 'redux';
import authReducer from './authReducer';
import isPlayingReducer from './isPlayingReducer';

export default combineReducers({
  auth: authReducer,
  isPlaying: isPlayingReducer,
});
