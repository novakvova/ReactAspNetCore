import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/Categories';
import { Col, Row } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';  


class EditCategory extends Component {
  state = {
    category: {
      name: ""
    },
    isLoading:true,
    redirect:false
  }
  componentWillMount() {
      this.props.requestCategories();
      if(!this.props.isLoading&&this.props.categories.length!=0)
      {
        const category = this.props.categories.find(item => item.id == this.props.match.params.id);
        this.setState({category,isLoading:false});
      }
  }

  componentWillReceiveProps()
  {
    if(!this.props.isLoading&&this.props.categories.length!=0)
    {
      const category = this.props.categories.find(item => item.id == this.props.match.params.id);
      this.setState({category,isLoading:false});
    }
  }


  handleEdit = (e) => {
    e.preventDefault();
    const name = this.getName.value;
    const id=this.state.category.id;
    const data = {
      name,
      id
    }
    this.props.editCategory(id, data);
    this.setState({redirect: true});
  }

  renderContext() {
    return (
      this.state.redirect ?
      <Redirect to="/admin" /> :
      <Row>
        <p></p>
        <form onSubmit={this.handleEdit}>
          <Col md={4}>
            <input className="form-control" required type="text" ref={(input) => this.getName = input}
              defaultValue={this.state.category.name} onChange={this.onChange} placeholder="Enter category name" /><br /><br />
          </Col>
          <Col md={2}>
            <button className="btn btn-primary mb-2">Edit</button>
          </Col>
        </form>
      </Row>
    );
  }

  render() {
    return (this.state.isLoading ? <span>Loading...</span> : this.renderContext());
  }
}
export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch))
  (EditCategory);