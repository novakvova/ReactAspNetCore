import { GET_TAGS, ADD_TAG, UPDATE_TAG, DELETE_TAG } from '../actions/types';
const initialState = {
  searchSuccess: false,
  dataTotalSize:0,
  tags: []
};

export default (state = initialState, action = {}) => {
  const payload = action.payload;
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
    case UPDATE_TAG :
    return { 
        ...state
    }
    case DELETE_TAG :{
      console.log("Delete Action: ", action.type, action.tag.id);
      return state.tags.filter(item => item.id != action.tag.id);
    }

    default: return state;
  }
}
