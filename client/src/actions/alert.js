import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

// State is read-only: The only way to change the state is to emit an action, 
// an object describing what happened.
// https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/

// dispatch === reducer
// actions describe what happened, reducers describe what to do with this information
export const setAlert = (msg, alertType, removeAfter = null) => dispatch => {
    // rand generate id
    const id = uuid.v4();

    // aka dispatch store update
    // aka dispatch the reducer to update store
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    if (removeAfter !== null) {
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            });
        }, removeAfter)
    }
}