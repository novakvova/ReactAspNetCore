import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import {Redirect} from 'react-router-dom';  

const validateemail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
}

class RegisterForm extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
        },
        done: false,
        isLoading: false
     }

     setStateByErrors=(name, value) => {
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

    onSubmitForm=(e) => {
        e.preventDefault();

        //validation
        let errors = {};
        if (!validateemail(this.state.email)) errors.email = "Enter valid email"
        if (this.state.email === '') errors.email = "Cant't be empty"
        
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.password === '') errors.password = "Cant't be empty"
        if (this.state.confirmPassword === '') errors.confirmPassword = "Cant't be empty"

        
        if (this.state.confirmPassword !== this.state.password) errors.confirmPassword = "Passwords do not match"

        const isValid=Object.keys(errors).length===0
        if (isValid) {
            const {email, password,confirmPassword} = this.state;
            this.setState({isLoading: true});
            this.props.register({email, password,confirmPassword})
            .then(
                () => this.setState({done: true}),
                (err) => {
                    this.setState( {errors: err.response.data, isLoading:false});
                    console.log(err.response.data);
            }
            );
        }
        else
        {
            this.setState({ errors });
        }
    }

    render() {
        const { errors, isLoading } = this.state;
        console.log('---FormLogin state----', this.state);
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h1>Register</h1>
                {
                    !!errors.invalid ?
                    <div className="alert alert-danger">
                        <strong>Danger!</strong> {errors.invalid}.
                    </div> :''}
                    
                <div className={classnames('form-group', { 'has-error': !!errors.email })}>
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                </div>

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

                <div className="form-group">
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-warning" disabled={isLoading}>Реєстрація<span className="glyphicon glyphicon-send"></span></button>
                    </div>
                </div>

            </form>
        );
        return (
            this.state.done?
            <Redirect to="/"/>:form
         );
    }
}
RegisterForm.propTypes =
{
    register: PropTypes.func.isRequired
}

export default connect(null, { register })(RegisterForm);