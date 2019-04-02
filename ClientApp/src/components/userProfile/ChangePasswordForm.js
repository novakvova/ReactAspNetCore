import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import PropTypes from 'prop-types';


class ChangePasswordForm extends Component {

    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        errors: {
        },
        done: false,
        isLoading: false
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
        this.setState({ done: false});
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        let errors = {};

        if (this.state.oldPassword === '') errors.oldPassword = "Cant't be empty"

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.newPassword)) errors.newPassword = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.oldPassword === this.state.newPassword) errors.newPassword = "Passwords can not match"
        if (this.state.newPassword === '') errors.newPassword = "Cant't be empty"

        if (this.state.confirmNewPassword !== this.state.newPassword) errors.confirmNewPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { oldPassword, newPassword } = this.state;
            const id = this.props.auth.user.id;
            this.setState({ isLoading: true,errors:{} });
            this.props.changePassword({ id, oldPassword, newPassword })
                .then(
                    () => this.setState({ done: true,isLoading: false }),
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false,done:false });
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
            <form onSubmit={this.onSubmitForm}>
                <h1 className="text-center">Change password</h1>

                {!!errors.invalid ?
                    <div className="alert alert-danger">
                        {errors.invalid}
                </div> : ''}

                {this.state.done ?
                    <div className="alert alert-success">
                        Password Changed!
                </div> : ''
                }



                <div className={classnames('form-group', { 'has-error': !!errors.oldPassword })}>
                    <label htmlFor="oldPassword">Password</label>
                    <input type="password"
                        className="form-control"
                        id="oldPassword"
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChange={this.handleChange}
                        autoComplete="true" />
                    {!!errors.oldPassword ? <span className="help-block">{errors.oldPassword}</span> : ''}
                </div>


                <div className={classnames('form-group', { 'has-error': !!errors.newPassword })}>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange} 
                        autoComplete="true"/>
                    {!!errors.newPassword ? <span className="help-block">{errors.newPassword}</span> : ''}
                </div>


                <div className={classnames('form-group', { 'has-error': !!errors.confirmNewPassword })}>
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input type="password"
                        className="form-control"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={this.state.confirmNewPassword}
                        onChange={this.handleChange} 
                        autoComplete="true"/>
                    {!!errors.confirmNewPassword ? <span className="help-block">{errors.confirmNewPassword}</span> : ''}
                </div>

                <div className="form-group">
                    <div className="col-md-4">
                    <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Change</button>
                    </div>

                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

ChangePasswordForm.propTypes =
    {
        changePassword: PropTypes.func.isRequired
    }

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);
