import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserList from "./UserList";
import { getUsers } from "../../../actions/userActions";
import { Redirect } from "react-router";

import { Col, Row } from "react-bootstrap";

class UserListPage extends Component {
  state = { redirect: false, loading: true };
  componentDidMount() {
    this.props.getUsers().then(
      () => {
        this.setState({ loading: false });
      },
      err => {
        if (typeof err.response == "undefined")
          console.log("err.response", err);
        else if (err.response.status == 401) {
          this.setState({ redirect: true });
        }
      }
    );
  }
  render() {
    console.log("--props UserListPage---", this.props);
    const { loading } = this.state;
    const page = loading ? (
      <span>Loading ...</span>
    ) : (
      <div>
        <h1>Users</h1>
        <UserList users={this.props.users} />
      </div>
    );
    return this.state.redirect ? <Redirect to="/login" /> : page;
  }
}
UserListPage.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  return { users: state.userlist.list };
}
export default connect(
  mapStateToProps,
  { getUsers }
)(UserListPage);
