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

export function login(data) {
    return dispatch => {
        return axios.post('api/Account/login', data)
        .then(res => {
            var token=res.data;
            //console.log("data login", token);
            var user=jwt.decode(token);
            //console.log('-----user login------', user);
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(user));
        });
    }
}