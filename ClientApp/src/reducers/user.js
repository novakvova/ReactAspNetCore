import { SET_USERS } from "../actions/types";

const initialState = {
  list: []
};

export default function users(state = initialState, action = {}) {
  let newState = state;
  switch (action.type) {
    case SET_USERS:
      newState = {
        ...state,
        list: action.users
      };
      break;
    default:
      return state;
  }
  return newState;
}
