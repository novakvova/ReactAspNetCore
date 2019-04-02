import axios from 'axios';
import { SET_CURRENT_USER } from './types';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
  }

  export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}


export function login(data) {
    return dispatch => {
        return axios.post('api/Account/login', data)
        .then(res => {
          loginByJWT(res.data, dispatch);
        });
    }
}

export function socialLogin(data) {
  return dispatch => {
    return axios.post('api/Account/socialLogin', data)
      .then(res => {
        loginByJWT(res.data, dispatch);
      })
  }
}
const loginByJWT = (token, dispatch) => {
  var user=jwt.decode(token);
  localStorage.setItem('jwtToken', token);
  setAuthorizationToken(token);
  dispatch(setCurrentUser(user));
} 

export function register(data) {
    console.log('--data--', data);
    return dispatch => {
        return axios.post('api/Account/Register', data)
            .then(res => {
                //console.log("data register", res);
                loginByJWT(res.data, dispatch);
            });
    }
}

export function changePassword(data) {
    return dispatch => {
    return axios.post('api/Account/ChangePassword', data);
    }
};

export function forgotPassword(data) {
    return dispatch => {
    return axios.post('api/Account/ForgotPassword', data);
    }
};

export function resetPassword(data) {
  return dispatch => {
  return axios.post('api/Account/ResetPassword', data);
  }
};

