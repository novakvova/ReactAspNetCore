import React, { Component } from 'react';
import { connect } from "react-redux";
import get from 'lodash.get';

import * as microblogActions from './reducer';

import PostForm from './postForm';
import MicroblogItem from './item';

class MicroblogWidgetContainer extends Component {
    constructor(props) {
        super(props);
        this.props.getListData();
    }

    render() {
        const { isAuthenticated, isListLoading, isListError } = this.props;
        
        return (
            <div>
                {
                    isAuthenticated &&
                    <PostForm
                        email={this.props.email}
                        post={this.props.post}
                        isValid={this.props.isPostValid}
                        isLoading={this.props.isPostLoading}
                        isError={this.props.isPostError}
                        onChange={this.props.onChange}
                        createNewPost={this.props.createNewPost} />
                }
                {
                    !isListLoading && !isListError &&
                    this.props.list.map(item => {
                        return <MicroblogItem
                            {...item} />
                    })
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
        isPostLoading: get(state, 'microblog.post.loading'),
        isPostError: get(state, 'microblog.post.error'),
        list: get(state, 'microblog.list.data'),
        isListLoading: get(state, 'microblog.list.loading'),
        isListError: get(state, 'microblog.list.error')
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
        getListData: () => {
            dispatch(microblogActions.getListData());
        }
    }
}

const MicroblogWidget = connect(mapState, mapDispatch)(MicroblogWidgetContainer);
export default MicroblogWidget;