import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { editCategory } from "../../../actions/categoriesActions";
import PropTypes from 'prop-types';

class EditCategory extends Component {

  handleEdit = (e) => {
    e.preventDefault();

    const name = this.getName.value;
    if (this.props.category.name !== name) {
      const id = this.props.category.id;
      const data = {
        name,
        id
      }
      this.props.editCategory(id, data);
    }
    this.props.handlerEdited();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleEdit}>
          <Col sm={7}>
            <input className="form-control" required type="text" ref={(input) => this.getName = input}
              defaultValue={this.props.category.name} onChange={this.onChange} placeholder="Enter category name" />
          </Col>
          <Col sm={2}>
            <button className="btn btn-primary mb-2">Save</button>
          </Col>
        </form>
      </div>
    );
  }
}


EditCategory.propTypes =
    {
      editCategory: PropTypes.func.isRequired
    }

export default connect(null, { editCategory })(EditCategory);
