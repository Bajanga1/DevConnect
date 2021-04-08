import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    console.log('get Current Profile');
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        console.log('error from getCurrentProfile' + err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

/// Create or update a profile  
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headrers: {
                'Content-Type': 'applictation/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headrers: {
                'Content-Type': 'applictation/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added', 'success'));

        
            history.push('/dashboard');
       
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headrers: {
                'Content-Type': 'applictation/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education added', 'success'));

        
            history.push('/dashboard');
       
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}
