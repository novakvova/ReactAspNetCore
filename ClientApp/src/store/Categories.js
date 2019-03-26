import axios from 'axios';

const requestCategoriesType = 'REQUEST_CATEGORIES';
const receiveCategoriesType = 'RECEIVE_CATEGORIES';
const editCategoryType = 'EDIT_CATEGORY';
const deleteCategoryType = 'DELETE_CATEGORY';
const addCategoryType = 'ADD_CATEGORY';

const initialState = { categories: [], isLoading: false };

export const actionCreators = {

  requestCategories: () => async (dispatch, getState) => {
    if (getState().categories.categories.length != 0) {
      // Don't issue a duplicate request (we already have or are loading the requested data)
      return;
    }

    dispatch({ type: requestCategoriesType });

    const url = `api/Category`;
    const response = await fetch(url);
    const categories = await response.json();


    dispatch({ type: receiveCategoriesType, categories });
  },

  addCategory: (category) => {
    return dispatch => {
      return axios.post('api/Category', category)
        .then(res => {
          var category = res.data;
          dispatch({ type: addCategoryType, category });
        }
        )
    }
  },

  editCategory: (id, category) => {
    return dispatch => {
      return axios.put('api/Category/' + id, category)
        .then(res => {
          var category = res.data;
          dispatch({ type: editCategoryType, category });
        }
        )
    }
  },

  deleteCategory: (id) => {
    return dispatch => {
      return axios.delete('api/Category/' + id)
        .then(res => {
          var categoryId = res.data;
          dispatch({ type: deleteCategoryType, categoryId });
        }
        )
    }
  }

};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestCategoriesType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveCategoriesType) {
    return {
      ...state,
      categories: action.categories,
      isLoading: false
    };
  }

  if (action.type === addCategoryType) {
    return {
      ...state,
      categories: [...state.categories, action.category]
    };
  }

  if (action.type === editCategoryType) {
    console.log(state);
    console.log(action);
    return {
      ...state,
      categories: state.categories.map(item => {
        if (item.id == action.category.id) return action.category;
        return item;
      })
    };
  }



  if (action.type === deleteCategoryType) {

    return {
      ...state,
      categories: state.categories.filter(item => item.id != action.categoryId)
    };
  }

  return state;
};


