import React, { Component } from 'react';
import { Col, Row, Panel } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { LinkContainer } from "react-router-bootstrap";

class LoginPage extends Component {
    render() {
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <Panel>
                        <LoginForm />
                        <div className="text-center">
                            <LinkContainer to="/forgotpassword">
                                <a>Forgot Password?</a>
                            </LinkContainer>
                        </div>
                        <br></br>
                        <div className="text-center">Don't have account?
                            <LinkContainer to="/register">
                                <a> Sign up here</a>
                            </LinkContainer>
                        </div>
                    </Panel>
                </Col>
            </Row>

        );
    }
}
export default LoginPage;