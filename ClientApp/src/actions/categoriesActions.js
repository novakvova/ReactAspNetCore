import axios from 'axios';
import {receiveCategoriesType,addCategoryType,editCategoryType,deleteCategoryType} from './types';

export function requestCategories() {

    return dispatch => {
    axios.get('api/Category')
        .then(res => {
            var categories = res.data;
            dispatch({ type: receiveCategoriesType, categories });
        })
    }
}

export function addCategory(category) {
    return dispatch => {
        return axios.post('api/Category', category)
            .then(res => {
                var category = res.data;
                dispatch({ type: addCategoryType, category });
            })
    }
}

export function editCategory(id, category) {
    return dispatch => {
        return axios.put('api/Category/' + id, category)
            .then(res => {
                var category = res.data;
                dispatch({ type: editCategoryType, category });
            })
    }
}

export function deleteCategory(id) {
    return dispatch => {
        return axios.delete('api/Category/' + id)
            .then(res => {
                var categoryId = res.data;
                dispatch({ type: deleteCategoryType, categoryId });
            })
    }
}