import { STORE_FORM_INPUT } from './types';
import uuid from 'uuid';

export const storeFormInput = (input) => dispatch => {
    // rand generate id
    const id = uuid.v4();
    dispatch({
        type: STORE_FORM_INPUT,
        payload: { input, id }
    });
}