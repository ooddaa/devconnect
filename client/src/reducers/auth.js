import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    USER_LOG_IN_SUCCESS,
    USER_LOG_IN_FAIL,
    USER_LOG_OUT,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'), // bad if we dispatch loadUser from another action (like loginUser)
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, { payload, type }) {

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOG_IN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case USER_LOG_IN_FAIL:
        case USER_LOG_OUT:
            localStorage.removeItem('token');
            return {
                // ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }

}