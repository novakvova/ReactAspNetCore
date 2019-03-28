import React, { Component } from 'react';
import { connect } from "react-redux";
import get from 'lodash.get';

import * as microblogActions from './microblog/reducer';

import MicroblogItem from './microblog/item';

import { Col, Row } from 'react-bootstrap';
import CategoriesPanel from './CategoriesPanel';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getListData();
  }

  render() {
    const { isListLoading, isListError } = this.props;

    return (
      <Row>
        <Col sm={3} md={2}>
        </Col>
        <Col sm={6} md={8}>
          <div>
            {
              !isListLoading && !isListError &&
              this.props.list.map(item => {
                return <MicroblogItem
                  {...item} />
              })
            }
          </div>
        </Col>
        <Col sm={3} md={2}>
          <CategoriesPanel />
        </Col>
      </Row>

    )
  }
}

const mapState = (state) => {
  return {
    // isAuthenticated: get(state, 'auth.isAuthenticated'),
    // email: get(state, 'auth.user.name'),
    // post: get(state, 'microblog.post'),
    // isPostValid: get(state, 'microblog.post.isValid'),
    // isPostLoading: get(state, 'microblog.post.loading'),
    // isPostError: get(state, 'microblog.post.error'),
    list: get(state, 'microblog.list.data'),
    isListLoading: get(state, 'microblog.list.loading'),
    isListError: get(state, 'microblog.list.error')
  }
}

const mapDispatch = (dispatch) => {
  return {
    // onChange: (path, value) => {
    //   dispatch(microblogActions.onValueChange(path, value));
    // },
    // createNewPost: (model) => {
    //   dispatch(microblogActions.createNewPost(model));
    // },
    getListData: () => {
      dispatch(microblogActions.getListData());
    }
  }
}

const Home = connect(mapState, mapDispatch)(HomeContainer);
export default Home;
