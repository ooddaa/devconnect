import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [
    // {
    //  // payload
    //     id: 1,
    //     msg: 'please log in',
    //     alertType: 'success'
    // }
];

// it's called a reducer, it's really a state-updater.
// where is it used? it's imported in ./index.js
// it's used to set up Redux store in ./store.js
// this is connect(null, { setAlert })(Register) ?
export default function (state = initialState, action) /* : Object[] */ {
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