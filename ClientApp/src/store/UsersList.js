const requestUsersListType = "REQUEST_USERSLIST";
const receiveUsersListType = "RECEIVE_USERSLIST";
const initialState = { users: [], isLoading: false };

export const usersactionCreators = {
  requestUsersListType: async dispatch => {
    dispatch({ type: requestUsersListType });
    const url = `api/User`;
    const response = await fetch(url);
    const users = await response.json();

    dispatch({ type: receiveUsersListType, users });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestUsersListType) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === receiveUsersListType) {
    return {
      ...state,
      users: action.users,
      isLoading: false
    };
  }
  return state;
};
