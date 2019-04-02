import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string'



class ResestPasswordPage extends Component {
    state = {
        password:'',
        confirmPassword:'',
        userId:'',
        code:'',
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

    componentWillMount()
    {      
        const values = queryString.parse(this.props.location.search);
        this.setState({userId:values.userId,code:values.code});
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.password === '') errors.password = "Cant't be empty"
        if (this.state.confirmPassword === '') errors.confirmPassword = "Cant't be empty"


        if (this.state.confirmPassword !== this.state.password) errors.confirmPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { code,userId,password,confirmPassword } = this.state;

            this.setState({ isLoading: true });

            this.props.resetPassword({userId,code,password,confirmPassword})
                .then(
                    () => this.setState({ done: true}),
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
        const { errors, isLoading } = this.state;
        return (
            this.state.done ?
                <Redirect to="/" /> : 
            <Row>
                <Col md={4} mdOffset={4}>
                    <Panel>
                        <div className="text-center mb-4">
                            <h4>Reset password</h4>
                            <p>Enter your new password.</p>
                        </div>
                        <form onSubmit={this.onSubmitForm}>
                            {!!errors.invalid ?
                                <div className="alert alert-danger">
                                    {errors.invalid}.
                            </div> : ''}

                            <div className={classnames('form-group', { 'has-error': !!errors.password })}>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                            </div>

                            <div className={classnames('form-group', { 'has-error': !!errors.confirmPassword })}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange} />
                                {!!errors.confirmPassword ? <span className="help-block">{errors.confirmPassword}</span> : ''}
                            </div>

                            <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Reset Password</button>
                        </form>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

ResestPasswordPage.propTypes =
    {
        resetPassword: PropTypes.func.isRequired
    }

export default connect(null, { resetPassword })(ResestPasswordPage);