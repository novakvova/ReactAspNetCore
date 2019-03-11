import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
    state = {  }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-offset-4">
                    <RegisterForm />
                </div>
            </div>
        );
    }
}
 
export default RegisterPage;