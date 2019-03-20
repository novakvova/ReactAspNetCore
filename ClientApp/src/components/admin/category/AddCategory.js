import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../store/Categories';
import { Col, Row } from 'react-bootstrap';

class AddCategory extends Component {
    state = {
        errors: ''
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.getName.value;
        const data = {
            name: name
        }
        this.props.addCategory(data).then(
            () => { this.setState({ errors: '' }); },
            (err) => {
                this.setState({ errors: err.response.data.error });
            }
        );
        this.getName.value = '';
    }
    render() {
        return (
            <Row>
                <p></p>
                <form onSubmit={this.handleSubmit}>
                    <Col md={4}>
                        {
                            !!this.state.errors ?
                                <div className="alert alert-danger">
                                    <strong>Error!</strong> {this.state.errors}
                                </div> : ''}
                        <input className="form-control" required type="text" ref={(input) => this.getName = input}
                            placeholder="Enter category name" />
                        <p></p>
                        <button className="btn btn-primary mb-2" >Add</button>

                    </Col>
                </form>
            </Row>
        );
    }
}
export default connect(
    state => state.categories,
    dispatch => bindActionCreators(actionCreators, dispatch))
    (AddCategory);