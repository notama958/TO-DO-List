// main reducer
import { combineReducers } from 'redux';
import alert from './alert';
import list from './list';
export default combineReducers({ alert, list });
