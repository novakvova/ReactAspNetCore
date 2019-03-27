import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router";

export default function (ComposedComponent, roles = '',redirect=true) {
  class Authenticate extends React.Component {

    state = {
      redirect: false,
      roles: roles,
      needToRedirect:redirect
    };
    componentWillMount() {
      console.log(this);
      if (this.state.roles !== '')
        if (this.props.roles !== this.state.roles)
          this.setState({ redirect: true })
      if (!this.props.isAuthenticated) {
        // this.props.addFlashMessage({
        //   type: 'error',
        //   text: 'You need to login to access this page'
        // });
        this.setState({ redirect: true })
      }
    }

    componentWillUpdate(nextProps) {
      if (this.state.roles !== '')
        if (this.props.roles !== this.state.roles)
          this.setState({ redirect: true })
      if (!nextProps.isAuthenticated) {
        this.setState({ redirect: true });
      }
    }

    render() {
      return (
        this.state.redirect ? this.state.needToRedirect?
          <Redirect to="/login" /> : '':
          <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    roles: PropTypes.string.isRequired
  }


  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      roles: state.auth.user.roles
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}