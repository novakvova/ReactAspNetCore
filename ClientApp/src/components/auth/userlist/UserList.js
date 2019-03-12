import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { users } from "../../../actions/userActions";

class UserList extends Component {
  state = {
    userEmail: "",
    Roles: "",
    errors: {},
    done: false,
    isLoading: false
  };

  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>User Name (Email)</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map(user => (
              <tr key={user.userEmail}>
                <td>{user.userEmail}</td>
                <td>{user.Roles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.func.isRequired
};

export default connect(
  null,
  { users }
)(UserList);
