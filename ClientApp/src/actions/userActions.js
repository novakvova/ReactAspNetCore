import axios from "axios";
import { SET_USERS } from "./types";
//import jwt from 'jsonwebtoken';
//import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}

export function getUsers() {
  return dispatch => {
    return axios.get("api/User/list").then(res => {
      console.log("LocalStorage Users: ", res.data);
      dispatch(setUsers(res.data));
    });
  };
}

export function getUserProfile(data) {
  return dispatch => {
    return axios.post("api/User/user",data);
  };
}