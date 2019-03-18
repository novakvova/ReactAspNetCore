import React, { Component } from 'react';
import { connect } from "react-redux";
import get from 'lodash.get';

import PostForm from './postForm';

class MicroblogWidgetContainer extends Component {
    render() {
        const { isAuthenticated } = this.props;
        return (
            <div>
                {
                    isAuthenticated &&
                    <PostForm />
                }
                MicroblogWidget
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        isAuthenticated: get(state, 'auth.isAuthenticated')
    }
}

const MicroblogWidget = connect(mapState)(MicroblogWidgetContainer);
export default MicroblogWidget;