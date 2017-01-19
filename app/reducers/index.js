import { combineReducers } from 'redux';
import todos from './todos';
import timers from './timers';

export default combineReducers({
  todos,
  timers
});
