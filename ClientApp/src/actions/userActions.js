import axios from "axios";
import { GET_USERS_LIST } from "./types";
//import jwt from 'jsonwebtoken';
//import setAuthorizationToken from '../utils/setAuthorizationToken';

export function GetUsersList() {
  return {
    type: GET_USERS_LIST
  };
}

export function users(data) {
  return dispatch => {
    return axios.get("api/User", data).then(res => {
      var listusers = res.data;
      console.log("listusers", listusers);
      //var user=jwt.decode(token);
      //console.log('-----user login------', user);
      //localStorage.setItem('jwtToken', token);
      //setAuthorizationToken(token);
      //dispatch(setCurrentUser(user));
    });
  };
}
