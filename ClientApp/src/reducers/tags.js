import { GET_TAGS, ADD_TAG, UPDATE_TAG, DELETE_TAG } from '../actions/types';

const initialState = {
  searchSuccess: false,
  dataTotalSize:0,
  tags: []
};

export default (state = initialState, action = {}) => {
  console.log("Actions: ", action.type, action.tag);
  switch(action.type) {
    case GET_TAGS:
      return {
        tags: action.tags
      };
    case ADD_TAG :
    return { 
        ...state,
        tags: [...state.tags, action.tag]
    }
    default: return state;
  }
}
