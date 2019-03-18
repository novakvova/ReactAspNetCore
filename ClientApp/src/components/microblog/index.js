import React, { Component } from 'react';
import { connect } from "react-redux";
import get from 'lodash.get';

import * as microblogActions from './reducer';

import PostForm from './postForm';

class MicroblogWidgetContainer extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {
                    isAuthenticated &&
                    <PostForm isValid={this.props.isPostValid} post={this.props.post} onChange={this.props.onChange} />
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        isAuthenticated: get(state, 'auth.isAuthenticated'),
        post: get(state, 'microblog.post'),
        isPostValid: get(state, 'microblog.post.isValid')
    }
}

const mapDispatch = (dispatch) => {
    return {
        onChange: (path, value) => {
            dispatch(microblogActions.onValueChange(path, value));
        }
    }
}

const MicroblogWidget = connect(mapState, mapDispatch)(MicroblogWidgetContainer);
export default MicroblogWidget;