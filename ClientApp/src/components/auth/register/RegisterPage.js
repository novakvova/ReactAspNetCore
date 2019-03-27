import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import { Col, Row,Panel } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

class RegisterPage extends Component {
    state = {}
    render() {
        return (
            <Row>
                <Col md={4} mdOffset={4}>
                    <Panel>
                        <RegisterForm />
                        <br></br>
                        <div className="text-center">Already have an account?
                            <LinkContainer to="/login">
                                <a> Login here</a>
                            </LinkContainer>
                        </div>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default RegisterPage;