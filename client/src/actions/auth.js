import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR } from './types';
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
        console.log(res.data);
        const { token } = res.data;
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { token }
        })

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