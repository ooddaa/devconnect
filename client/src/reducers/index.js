import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
    alert // if not supplied, chrome redux dev tools wont display state 
});