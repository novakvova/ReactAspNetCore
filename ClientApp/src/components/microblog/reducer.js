import update from "../../helpers/update";

export const ON_VALUE_CHANGE = "microblog/ON_VALUE_CHANGE";

const initialState = {
    post: {
        form: {
            name: null,
            shortDescription: null,
            description: null
        },
        isValid: false
    }
}

export const microblogReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {
        case ON_VALUE_CHANGE: {
            newState = update.set(state, action.payload.path, action.payload.value);
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