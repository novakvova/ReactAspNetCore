import axios from 'axios';
import { GET_TAGS } from './types';
import { ADD_TAG } from './types';
import { DELETE_TAG } from './types';
import { UPDATE_TAG } from './types';

export function getCurrentTags(data) {
    return {
      type: GET_TAGS,
      tags: data.tags,
      searchSuccess:  data.searchSuccess,
      dataTotalSize:  data.dataTotalSize
    };
  }
  export function addTag(tag) {
    return {
      type: ADD_TAG,
      tag
    };
  }
  export function deleteTag(tag) {
    return {
      type: DELETE_TAG,
      tag
    };
  }
  export function updateTag(tag) {
    return {
      type: UPDATE_TAG,
      tag
    };
  }

export function getTagsApi() {
    return dispatch => {
        return axios.get('api/Tags')
            .then(res => {
                console.log("LocalStorage Tags: ", res.data)
                dispatch(getCurrentTags(res.data));
            }
        )
    }
}
export function addTagApi(tag) {
    return dispatch => {
        return axios.post('api/Tags', tag)
            .then(res => {
                console.log("LocalStorage Tags: ", res.data)
                dispatch(addTag(res.data));
            }
        )
    }
}