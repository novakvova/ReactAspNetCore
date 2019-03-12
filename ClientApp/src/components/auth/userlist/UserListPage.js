import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import UserList from "./UserList";

class UserListPage extends Component {
  render() {
    return (
      <Row>
        <Col md={4} mdOffset={4}>
          <UserList />
        </Col>
      </Row>
    );
  }
}
export default UserListPage;
