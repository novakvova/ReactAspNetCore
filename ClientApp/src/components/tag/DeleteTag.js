import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { deleteTagApi } from '../../actions/tagsActions';

class DeleteTag extends Component {

    
    onSubmitForm = (e) => {
        e.preventDefault();
        const item = this.props.tag
            console.log("Props: ", this.props)
            this.props.deleteTagApi({item})
                            .then(
                    () => this.setState({ done: true }),
                    (err) => console.log("Error: " , err) )               
                // .then(this.setState({ errors }))

    }

    render() {
        return (
                <form onSubmit={this.onSubmitForm}>
                     <Col md={2}>
                        <div className="form-group">
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-warning">Delete<span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>
                    </Col>
                </form>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags
    };
  }
export default connect(mapStateToProps, { deleteTagApi })(DeleteTag);