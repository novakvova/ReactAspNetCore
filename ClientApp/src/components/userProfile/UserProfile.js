import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Redirect } from "react-router";
 import { getUserProfile } from "../../actions/userActions";

class UserProfile extends Component {

    state = {
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        email: '',
        userImage: '',
        errors: {
        },
        done: false
    }

    componentDidMount()
    {
        const id = this.props.auth.user.id;
        this.props.getUserProfile({ id})
        .then( res=>{
            this.setState(res.data)
        }
        );
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

        if (this.state.oldPassword === '') errors.oldPassword = "Cant't be empty"

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/.test(this.state.newPassword)) errors.newPassword = "Password must be at least 6 characters and contain digits, upper and lower case"
        if (this.state.oldPassword == this.state.newPassword) errors.newPassword = "Passwords can not match"
        if (this.state.newPassword === '') errors.newPassword = "Cant't be empty"

        if (this.state.confirmNewPassword !== this.state.newPassword) errors.confirmNewPassword = "Passwords do not match"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { oldPassword, newPassword } = this.state;
            const id = this.props.auth.user.id;
            this.setState({ isLoading: true });
            this.props.getUserProfile({ id})
                .then(
                    (res) => this.setState({ done: true }),
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
            <form onSubmit={this.onSubmitForm}>
                <h1 className="text-center">Profile</h1>

                {/* {!!errors.invalid ?
                    <div className="alert alert-danger">
                        <strong>Danger!</strong> {errors.invalid}.
                </div> : ''}

                {this.state.done ?
                    <div className="alert alert-success">
                        <strong>Danger!</strong> {errors.invalid}.
                </div> : ''
                } */}

                <div align="center"> 
                <img alt="User Pic" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" id="profile-image1" className="img-circle" width="100" />
                    <input id="profile-image-upload" className="hidden" type="file" />
                    <div>click here to change profile image</div>
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.firstName })}>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChange} />
                    {!!errors.firstName ? <span className="help-block">{errors.firstName}</span> : ''}
                </div>


                <div className={classnames('form-group', { 'has-error': !!errors.middleName })}>
                    <label htmlFor="middleName">Middle Name:</label>
                    <input type="text"
                        className="form-control"
                        id="middleName"
                        name="middleName"
                        value={this.state.middleName}
                        onChange={this.handleChange} />
                    {!!errors.middleName ? <span className="help-block">{errors.middleName}</span> : ''}
                </div>


                <div className={classnames('form-group', { 'has-error': !!errors.lastName })}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleChange} />
                    {!!errors.lastName ? <span className="help-block">{errors.lastName}</span> : ''}
                </div>


                <div className={classnames('form-group', { 'has-error': !!errors.dateOfBirth })}>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="text"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={this.state.dateOfBirth}
                        onChange={this.handleChange} />
                    {!!errors.dateOfBirth ? <span className="help-block">{errors.dateOfBirth}</span> : ''}
                </div>

                <div className={classnames('form-group', { 'has-error': !!errors.email })}>
                    <label htmlFor="email">Email:</label>
                    <input type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                    {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                </div>

                <div className="form-group">
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-info btn-block" disabled={isLoading}>Save</button>
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

export default connect(mapStateToProps, { getUserProfile })(UserProfile);


// <Row>
//                                     <Col md={2}>
//                                         <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" width='100'></img>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col md={4}>
//                                         <Row>First Name: </Row>
//                                         <Row>Middle Name: </Row>
//                                         <Row>Last Name: </Row>
//                                         <Row>Date Of Birth: </Row>
//                                     </Col>
//                                     <Col md={2}>
//                                         <Row>Prasad </Row>
//                                         <Row>Shankar </Row>
//                                         <Row>Huddedar </Row>
//                                         <Row>11 Jun 1998 </Row>
//                                     </Col>
//                                 </Row>

//                                 <br></br>
//                                 <div className="col-md-4">
//                                     <button type="submit" className="btn btn-info btn-block" >Edit Profile</button>
//                                 </div>
