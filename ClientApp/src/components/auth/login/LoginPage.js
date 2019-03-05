import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import LoginForm from './LoginForm';

class LoginPage extends Component {
    render() {
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <LoginForm />
                </Col>
            </Row>
        );
    }
}
export default LoginPage;