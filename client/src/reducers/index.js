import { combineReducers } from 'redux';
import alert from './alert';
import storeFormInput from './storeFormInput';
import auth from './auth';
import profile from './profile';
import post from './post';

// is it how Redux matches [action]:reducer ?
// nope
export default combineReducers({
    alert, // if not supplied, chrome redux dev tools wont display state 
    storeFormInput,
    auth,
    profile,
    post
});