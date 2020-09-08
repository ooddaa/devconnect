import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_ERROR, GET_PROFILE } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me'); // req will have user.id

        dispatch({
            type: GET_PROFILE,
            payload: res.data // a profile
        })
    } catch (error) {
        // console.log
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data // a profile
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success', 3000));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (error) {
        const { errors } = error.response.data;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};