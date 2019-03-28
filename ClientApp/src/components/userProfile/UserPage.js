import React, { Component } from 'react';
import ChangePasswordForm from "./ChangePasswordForm"
import { Panel, Row, Col } from "react-bootstrap";
import UserProfile from './UserProfile';

class UserPage extends Component {

    render() {
        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <Panel>
                        <Col md={6}>
                            <Panel>
                                {/* <UserProfile></UserProfile> */}
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel>
                                <ChangePasswordForm></ChangePasswordForm>
                            </Panel>
                        </Col>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

export default (UserPage);
