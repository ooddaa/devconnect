import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [
    // {
    //  // payload
    //     id: 1,
    //     msg: 'please log in',
    //     alertType: 'success'
    // }
];

export default function (state = initialState, action) {
    // evaluate type
    const { payload, type } = action
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload); // payload.id?
        default:
            return state;
    }
}