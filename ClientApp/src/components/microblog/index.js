import React, { Component } from 'react';
import { connect } from "react-redux";
import get from 'lodash.get';

import * as microblogActions from './reducer';

import PostForm from './postForm';

class MicroblogWidgetContainer extends Component {
    constructor(props){
        super(props);
        this.props.getListData();
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {
                    isAuthenticated &&
                    <PostForm
                        email={this.props.email}
                        post={this.props.post}
                        isValid={this.props.isPostValid}
                        isLoading={this.props.isLoading}
                        isError={this.props.isError}
                        onChange={this.props.onChange}
                        createNewPost={this.props.createNewPost} />
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        isAuthenticated: get(state, 'auth.isAuthenticated'),
        email: get(state, 'auth.user.name'),
        post: get(state, 'microblog.post'),
        isPostValid: get(state, 'microblog.post.isValid'),
        isLoading: get(state, 'microblog.post.loading'),
        isError: get(state, 'microblog.post.error')
    }
}

const mapDispatch = (dispatch) => {
    return {
        onChange: (path, value) => {
            dispatch(microblogActions.onValueChange(path, value));
        },
        createNewPost: (model) => {
            dispatch(microblogActions.createNewPost(model));
        },
        getListData: ()=> {
            dispatch(microblogActions.getListData());
        }
    }
}

const MicroblogWidget = connect(mapState, mapDispatch)(MicroblogWidgetContainer);
export default MicroblogWidget;