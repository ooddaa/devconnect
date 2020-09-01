import { STORE_FORM_INPUT } from '../actions/types';

export default function (state = [], action) /* : Object[] */ {
    // evaluate type
    const { payload, type } = action
    switch (type) {
        case STORE_FORM_INPUT:
            return [...state, payload];
        default:
            return state;
    }
}