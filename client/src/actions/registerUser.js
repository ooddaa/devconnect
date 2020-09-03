import { USER_REGISTERED, USER_NOT_REGISTERED } from './types';
import uuid from 'uuid';

export const registerUser = (jwt, name, email) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: USER_REGISTERED,
        payload: { jwt, name, email, id }
    });
};