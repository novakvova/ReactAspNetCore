import React, { Component } from "react";
import PropTypes from "prop-types";

class UserCard extends Component {
  state = {};
  render() {
    console.log("--user in props--", this.props);
    const { user } = this.props;

    return (
      <div className="item col-xs-4 col-lg-4">
        <div className="thumbnail">
          <div className="caption">
            <h4 className="group inner list-group-item-heading">
              {user.userEmail}
            </h4>
            <p className="group inner list-group-item-text">roles</p>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};
export default UserCard;
