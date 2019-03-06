import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { usersactionCreators } from "../store/UsersList";

class UsersListFetchData extends Component {
  componentWillMount() {
    this.props.requestUsersList();
  }

  componentWillReceiveProps() {
    this.props.requestWeatherForecasts();
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {renderUsersTable(this.props)}
      </div>
    );
  }
}

function renderUsersTable(props) {
  return (
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
  );
}

export default connect(
  state => state.users,
  dispatch => bindActionCreators(usersactionCreators, dispatch)
)(UsersListFetchData);
