import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

// dispatch === reducer?
// 
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