import axios from 'axios';
import { SET_CURRENT_USER } from './types';

export function login(data) {
    return dispatch => {
        return axios.post('api/Account/login', data)
        .then(res => {
            console.log("data login", res.data);
            // const {token, user}=res.data;
            // console.log('--get token serve--',token);
            // localStorage.setItem('jwtToken', token);
            // localStorage.setItem('user', JSON.stringify(user));
            // setAuthorizationToken(token);
            // dispatch(setCurrentUser(user));
        });
    }
}

export function register(data) {
    console.log('--data--', data);
    return dispatch => {
        return axios.post('api/Account/Register', data)
            .then(res => {
                console.log("data register", res);
            });
    }
}