import axios from 'axios';
import { setAlert } from './alert';
import {
    PROFILE_ERROR,
    GET_PROFILE,
    GET_PROFILES,
    UPDATE_PROFILE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_REPOS,
} from './types';

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

// Get all profiles
export const getProfiles = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/all');

        dispatch({
            type: GET_PROFILES,
            payload: res.data // profiles
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
};

// Get profile by id
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
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

// Get GitHub Repos
export const getRepos = username => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
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

        // redirect?
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

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // a profile
        });

        dispatch(setAlert('Experience Added', 'success', 3000));

        history.push('/dashboard');

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

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data // a profile
        });

        dispatch(setAlert('Education Added', 'success', 3000));

        history.push('/dashboard');

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

// Delete Experience
export const deleteExperience = (exp_id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`);
        dispatch({
            type: DELETE_EXPERIENCE,
            payload: res.data // a profile
        });

        dispatch(setAlert('Experience Deleted', 'success', 3000));

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

// Delete Education
export const deleteEducation = (ed_id) => async dispatch => {
    try {

        const res = await axios.delete(`/api/profile/education/${ed_id}`);
        dispatch({
            type: DELETE_EDUCATION,
            payload: res.data // a profile
        });

        dispatch(setAlert('Education Deleted', 'success', 3000));

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

// Delete Account and Profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!'));

    try {

        await axios.delete('/api/profile/');
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });

        dispatch(setAlert('Your account has been permanently deleted', 3000));

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