import update from "../../helpers/update";
import MicroblogService from "./microblogService";

export const ON_VALUE_CHANGE = "microblog/ON_VALUE_CHANGE";

export const CREATE_POST_STARTED = "microblog/CREATE_POST_STARTED";
export const CREATE_POST_SUCCESS = "microblog/CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "microblog/CREATE_POST_FAILED";

export const GET_LIST_DATA_STARTED = "microblog/GET_LIST_DATA_STARTED";
export const GET_LIST_DATA_SUCCESS = "microblog/GET_LIST_DATA_SUCCESS";
export const GET_LIST_DATA_FAILED = "microblog/GET_LIST_DATA_FAILED";

const initialState = {
    post: {
        form: {
            name: null,
            shortDescription: null,
            description: null
        },
        error: false,
        loading: false,
        isValid: false
    },
    list: []
}

export const microblogReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case ON_VALUE_CHANGE: {
            newState = update.set(state, action.payload.path, action.payload.value);
            break;
        }

        case CREATE_POST_STARTED: {
            newState = update.set(state, 'post.loading', true);
            break;
        }

        case CREATE_POST_SUCCESS: {
            newState = update.set(state, 'post.loading', false);
            newState = update.set(newState, 'post.form', null);
            newState = update(newState, {
                list: {
                    $push: [action.payload.data]
                }
            });
            break;
        }

        case CREATE_POST_FAILED: {
            newState = update.set(state, 'post.loading', false);
            newState = update.set(newState, 'post.error', true);
            break;
        }

        default: {
            return newState;
        }
    }

    return newState;
}

export const onValueChange = (path, value) => {
    return {
        type: ON_VALUE_CHANGE,
        payload: {
            path,
            value
        }
    }
}

export const createNewPost = (model) => {
    return (dispatch) => {
        dispatch(createPostActions.started());

        MicroblogService.createNewPost(model)
            .then((response) => {
                dispatch(createPostActions.success(response));
            })
            .catch(() => {
                dispatch(createPostActions.failed());
            });
    }
}

export const getListData = () => {
    return (dispatch) => {
        dispatch(getListActions.started());

        MicroblogService.getListData()
            .then((response) => {
                dispatch(getListActions.success(response));
            })
            .catch(() => {
                dispatch(getListActions.failed());
            });
    }
}

export const createPostActions = {
    started: () => {
        return {
            type: CREATE_POST_STARTED
        }
    },

    success: (data) => {
        return {
            type: CREATE_POST_SUCCESS,
            payload: data
        }
    },

    failed: (error) => {
        return {
            type: CREATE_POST_FAILED
        }
    }
}

export const getListActions = {
    started: () => {
        return {
            type: GET_LIST_DATA_STARTED
        }
    },

    success: (data) => {
        return {
            type: GET_LIST_DATA_SUCCESS,
            payload: data
        }
    },

    failed: (error) => {
        return {
            type: GET_LIST_DATA_FAILED
        }
    }
}