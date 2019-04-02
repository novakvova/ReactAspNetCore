import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login, socialLogin } from "../../../actions/authActions";

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class LoginForm extends Component {

  constructor(props)	
  {	
    super(props);	
    this.signUp=this.signUp.bind(this);	
  }	
  signUp(res, type){	
    let postData;	
    console.log(res);
    if(type === 'google')	
    {	
      postData = {Email: res.profileObj.email, Name: res.profileObj.name};	
    }	
    if(type == 'facebook')	
    {	
      postData = {Email: res.email, Name: res.name};	
    }	
    console.log(postData);	
    this.props.socialLogin(postData)	
      .then(	
        () => this.setState({ done: true }),	
        (err) => this.setState({ errors: err.response.data, isLoading: false })	
      );	
  }

  state = {
    email: '',
    password: '',
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
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    if (this.state.email === '') errors.email = "Cant't be empty!"
    if (this.state.password === '') errors.password = "Cant't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const { email, password } = this.state;
      this.setState({ isLoading: true });
      this.props.login({ Email: email, Password: password })
        .then(
          () => this.setState({ done: true }),
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }
    else {
      this.setState({ errors });
    }

  }

  render() {
    const { errors, isLoading } = this.state;

    const responseGoogle = (response) => {
      this.signUp(response, 'google');
    }

    const responseFacebook = (response) => {
      this.signUp(response, 'facebook')
    }

    const form = (
      <React.Fragment>
        <form onSubmit={this.onSubmitForm}>
          <h1 className="text-center">Login</h1>

          {!!errors.invalid ?
            <div className="alert alert-danger">
              {errors.invalid}.
                    </div> : ''}

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

          <div className="form-group">
            <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Login</button>
          </div>
        </form>
        <div className="text-center">
        <GoogleLogin
          clientId="899074839145-kufiqt6f3l179vdd22sgca8urr9k8lmc.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}/>
        <p></p>
        <FacebookLogin
          appId="2527437730617232"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook} 
          />
          </div>
      </React.Fragment>
    );

    return (
      this.state.done ?
        <Redirect to="/" /> :
        form
    );
  }
}

LoginForm.propTypes =
  {
    login: PropTypes.func.isRequired,
    socialLogin: PropTypes.func.isRequired
  }

export default connect(null, { login, socialLogin })(LoginForm);