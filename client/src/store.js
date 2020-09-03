import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
// actions that reach the store must be plain objects, 
// and actions must have a type field that is not undefined.
// https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;