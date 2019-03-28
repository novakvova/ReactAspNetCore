import {receiveCategoriesType,addCategoryType,editCategoryType,deleteCategoryType} from '../actions/types';
const initialState = { categories: []};

export default (state=initialState, action={}) => {
    state = state || initialState;
  
  
    if (action.type === receiveCategoriesType) {
      return {
        ...state,
        categories: action.categories
      };
    }
  
    if (action.type === addCategoryType) {
      return {
        ...state,
        categories: [...state.categories, action.category]
      };
    }
  
    if (action.type === editCategoryType) {
      return {
        ...state,
        categories: state.categories.map(item => {
          if (item.id === action.category.id) return action.category;
          return item;
        })
      };
    }
  
    if (action.type === deleteCategoryType) {
  
      return {
        ...state,
        categories: state.categories.filter(item => item.id !== action.categoryId)
      };
    }
  
    return state;
  };