import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";

const validateemail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

class ForgotPasswordPage extends Component {
    state = {
        email: '',
        errors: {
        },
        done: false,
        isLoading: false,
        serverAnswer: ''
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
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};
        if (!validateemail(this.state.email)) errors.email = "Enter valid email"
        if (this.state.email === '') errors.email = "Cant't be empty"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { email } = this.state;
            this.setState({ isLoading: true });
            this.props.forgotPassword({ email })
                .then(
                    (res) => this.setState({ done: true, serverAnswer: res }),
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false });
                    }
                );
        }
        else {
            this.setState({ errors });
        }
    }
    render() {
        const { errors, isLoading, serverAnswer } = this.state;
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <Panel>
                        <div className="text-center mb-4">
                            <h4>Forgot your password?</h4>
                            <p>Enter your email address and we will send you instructions on how to reset your password.</p>
                        </div>
                        <form onSubmit={this.onSubmitForm}>
                            {!!errors.invalid ?
                                <div className="alert alert-danger">
                                    {errors.invalid}.
                            </div> : ''}

                            {!!serverAnswer ?
                                <div className="alert alert-success">
                                    {serverAnswer}
                                </div> : ''}

                            <div className={classnames('form-group', { 'has-error': !!errors.email })}>
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                                {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                            </div>

                            <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Reset Password</button>
                        </form>
                        <br></br>
                        <div className="text-center">
                            <LinkContainer to="/register">
                                <a>Register an Account</a>
                            </LinkContainer>
                        </div>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

ForgotPasswordPage.propTypes =
    {
        forgotPassword: PropTypes.func.isRequired
    }

export default connect(null, { forgotPassword })(ForgotPasswordPage);