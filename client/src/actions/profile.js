import api from '../utils/api';
import { setAlert } from './alert';

import {GET_PROFILE, PROFILE_ERROR} from './types';

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
            payload: {msg:err.response.statusText, status: err.response.status}
        });
    }
}