import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [
    // {
    //  // payload
    //     id: 1,
    //     msg: 'please log in',
    //     alertType: 'success'
    // }
];

// Changes are made with pure functions: To specify how the state 
// tree is transformed by actions, you write pure reducers.
// https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/

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