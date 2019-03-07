import axios from 'axios';
const GET = 'GET_TAGS';
const RECIVE = 'RECIVE_TAGS';

const initialState = { 
  Tags: [], 
  isLoading: false
 };


export const TagsAction =
  axios.get(`api/Tags`)
      .then(res => {
        
        const Tags = res.data;
        console.log("Tags", Tags)   
        this.setState(Tags)

      })


export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === GET) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === RECIVE) {
    return {
      ...state,
      tags: action.tags,
      isLoading: false
    };
  }

  return state;
};
