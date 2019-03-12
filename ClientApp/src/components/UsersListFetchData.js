import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { usersactionCreators } from "../store/UsersList";

class UsersListFetchData extends Component {
  componentWillMount() {
    const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
    this.props.requestUsersList(startIndex);
  }

  componentWillReceiveProps(nextProps) {
    const startIndex = parseInt(nextProps.match.params.startIndex, 10) || 0;
    this.props.requestUsersList(startIndex);
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {renderUsersTable(this.props)}
        {renderPagination(this.props)}
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
function renderPagination(props) {
  const prevStartIndex = (props.startIndex || 0) - 5;
  const nextStartIndex = (props.startIndex || 0) + 5;

  return (
    <p className="clearfix text-center">
      <Link
        className="btn btn-default pull-left"
        to={`/fetchdata/${prevStartIndex}`}
      >
        Previous
      </Link>
      <Link
        className="btn btn-default pull-right"
        to={`/fetchdata/${nextStartIndex}`}
      >
        Next
      </Link>
      {props.isLoading ? <span>Loading...</span> : []}
    </p>
  );
}
export default connect(null, { login })(LoginForm);
export default connect(
  state => state.users,
  dispatch => bindActionCreators(usersactionCreators, dispatch)
)(UsersListFetchData);
