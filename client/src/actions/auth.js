import axios from 'axios';
import uuid from 'uuid';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    USER_LOG_IN_SUCCESS,
    USER_LOG_IN_FAIL,
    USER_LOG_OUT,
    CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User 
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data // == user
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        // console.log(res.data);
        const { token } = res.data;
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { token }
        })
        dispatch(loadUser())

    } catch (error) {
        const { errors } = error.response.data;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const loginUser = ({ password, email }) => async dispatch => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ email, password });
    const sessionId = uuid.v4();
    try {
        const res = await axios.post('/api/auth', body, config);

        const { token } = res.data;

        dispatch({
            type: USER_LOG_IN_SUCCESS,
            payload: { token, sessionId }
        })
        dispatch(loadUser())

    } catch (error) {
        const { errors } = error.response.data;
        console.log(error)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)));
        }
        dispatch({
            type: USER_LOG_IN_FAIL
        })
    }
}

// Logout User
export const logoutUser = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: USER_LOG_OUT });
}