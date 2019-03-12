import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";
import { addTagApi } from '../../actions/tagsActions';
import classnames from 'classnames';


class AddTag extends Component {

    state = {
        Name: '',
        errors: {

        },
        done: false
    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }


    handleChange = (e) => {
        console.log("-TargetName-", e.target.name, e.target.value);
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.Name === '') errors.name = "Cant't be empty!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { Name } = this.state;
            console.log("Props: ", this.props)
            console.log("Added_Tag: ", Name);
            this.props.addTagApi({ Name })
                .then(
                    () => this.setState({ done: true }),
                    (err) => this.setState({ errors: err.response.data })
                )
                .then(this.setState({ errors }))
        }
        else {
            this.setState({ errors });
        }

    }

    render() {
        console.log("---this props", this.props);
        const { errors } = this.state;

        return (
            <Row
                style={{
                    paddingTop: 10,
                    alignContent: "center"
                }}>
                <form onSubmit={this.onSubmitForm}>
                    <Col md={2}>
                        <label htmlFor="Name"
                            style={{
                                paddingTop: 8,
                                marginLeft: 50
                            }}
                        >Tag Name</label>
                    </Col>
                    <Col md={8}>
                        <div className={classnames('form-group', { 'has-error': !!errors.name })}>
                            <input type="Name"
                                className="form-control"
                                id="Name"
                                name="Name"
                                value={this.state.Name}
                                onChange={this.handleChange} />
                            {!!errors.name ? <span className="help-block">{errors.name}</span> : ''}
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-warning">Додати<span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>
                    </Col>
                </form>
            </Row>


        );
    }
}
const mapStateToProps = (state) => {
    return {
        tags: state.tags.tags
    };
}
export default connect(mapStateToProps, { addTagApi })(AddTag);