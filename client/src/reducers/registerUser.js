import { USER_REGISTERED } from '../actions/types';

export default function (state = [], action) /* : Object[] */ {
    const { payload, type } = action
    switch (type) {
        case USER_REGISTERED:
            return [...state, payload];
        default:
            return state;
    }
}