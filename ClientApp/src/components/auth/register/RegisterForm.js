import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../../../actions/authActions";
import { Redirect } from 'react-router-dom';
import defaultPath from './default-user.png'
import './inputDes.css'
import { Row } from 'react-bootstrap'
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

const validateemail = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(String(email).toLowerCase())
}
//const defaultPath = "D:/Study/React/WebBlog/ClientApp//src//components/auth/register/default-user.png"
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            errors: {
            },
            done: false,
            isLoading: false,
            isLoadingPhoto: false,
            src: '',
            imageBase64: defaultPath,
            firstName: '',
            middleName: '',
            lastName: '',
            dateOfBirth: ''
        };
        this.cropImage = this.cropImage.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    changeInput(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
        this.setState({ isLoadingPhoto: true });
    }
    cropImage() {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            imageBase64: this.cropper.getCroppedCanvas().toDataURL()
        });
        this.setState({ isLoadingPhoto: false });
        this.setState({ src: '' });
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

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.password)) errors.password = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.password === '') errors.password = "Cant't be empty"
        if (this.state.confirmPassword === '') errors.confirmPassword = "Cant't be empty"


        if (this.state.confirmPassword !== this.state.password) errors.confirmPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { email, password, confirmPassword, imageBase64,
                firstName, middleName, lastName, dateOfBirth} = this.state;
            this.setState({ isLoading: true });
            // const firstName='Anna',  middleName='Romanivna', lastName='Veiccho', dateOfBirth='2/3/1999';
            this.props.register({ email, password, confirmPassword, imageBase64,
                firstName,  middleName, lastName, dateOfBirth})
                .then(
                    () => this.setState({ done: true }),
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
        const form = (
            <form onSubmit={this.onSubmitForm}>
                <h1 className="text-center">Register</h1>
                {
                    !!errors.invalid ?
                        <div className="alert alert-danger">
                            <strong>Danger!</strong> {errors.invalid}.
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
                <div className={classnames('form-group', { 'has-error': !!errors.firstName })}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange} />
                    {!!errors.firstName ? <span className="help-block">{errors.firstName}</span> : ''}
                </div>
                <div className={classnames('form-group', { 'has-error': !!errors.middleName })}>
                    <label htmlFor="middleName">Middle Name</label>
                    <input type="text"
                        className="form-control"
                        id="middleName"
                        name="middleName"
                        value={this.state.middleName}
                        onChange={this.handleChange} />
                    {!!errors.middleName ? <span className="help-block">{errors.middleName}</span> : ''}
                </div>
                <div className={classnames('form-group', { 'has-error': !!errors.lastName })}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange} />
                    {!!errors.lastName ? <span className="help-block">{errors.lastName}</span> : ''}
                </div>
                <div className={classnames('form-group', { 'has-error': !!errors.dateOfBirth })}>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type="Date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={this.state.dateOfBirth}
                        onChange={this.handleChange} />
                    {!!errors.dateOfBirth ? <span className="help-block">{errors.dateOfBirth}</span> : ''}
                </div>
                <div className='container'>
                <Row>
                    <div className={classnames('form-group', { 'has-error': !!errors.image })}>
                        <label id="labelForInput" htmlFor="inputFile">
                            {
                                !this.state.isLoadingPhoto ?
                                    <img
                                        src={this.state.imageBase64}
                                        className="img-circle"
                                        id="image"
                                        name="image"
                                        width="250"
                                    /> : 
                                   <p></p>
                            }
                            {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                            <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                        </label>
                    </div>

                    <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                        <Cropper
                            style={{ height: 400, width: 400, overflow: 'hidden' }}
                            aspectRatio={1/1}
                            preview=".img-preview"
                            guides={false}
                            src={this.state.src}
                            ref={cropper => { this.cropper = cropper; }}
                        />
                        <p></p>
                        <button type="button" onClick={this.cropImage} className="btn btn-primary">Crop Image</button>
                    </div>
                </Row>
                </div>
                <div className="form-group">
                    {/* <div className="col-md-4"> */}
                    <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Register</button>
                    {/* </div> */}
                </div>

            </form>
        );
        return (
            this.state.done ?
                <Redirect to="/" /> : form
        );
    }
}
    
RegisterForm.propTypes =
    {
        register: PropTypes.func.isRequired
    }

export default connect(null, { register })(RegisterForm);