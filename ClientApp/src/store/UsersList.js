const requestUsersListType = "REQUEST_USERSLIST";
const receiveUsersListType = "RECEIVE_USERSLIST";
const initialState = { users: [], isLoading: false };

export const usersactionCreators = {
  requestUsersListType: startIndex => async (dispatch, getState) => {
    if (startIndex === getState().users.startIndex) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestUsersListType, startIndex });
    const url = `api/User?startIndex=${startIndex}`;
    const response = await fetch(url);
    const users = await response.json();

    dispatch({ type: receiveUsersListType, startIndex, users });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestUsersListType) {
    return {
      ...state,
      startIndex: action.startIndex,
      isLoading: true
    };
  }
  if (action.type === receiveUsersListType) {
    return {
      ...state,
      startIndex: action.startIndex,
      users: action.users,
      isLoading: false
    };
  }
  return state;
};
