import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import "./NavMenu.css";
import { withRouter } from 'react-router-dom';
class NavMenu extends Component {
  state = {}

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const logoutLink = (
      <NavItem onClick={this.logout.bind(this)}>
        <Glyphicon glyph="log-out" />Logout
    </NavItem>
    );

    const userLinks = (
      <Link to='/user' className="navbar-user">
        {user.name}
      </Link> 
    );

    const loginLinks = (
      <LinkContainer to={"/login"} activeClassName="">
        <NavItem>
          Login
            </NavItem>
      </LinkContainer>
    );
    return (
      <Navbar fluid fixed="top" inverse>
        <Navbar.Brand>
          <Link to={"/"}>SimpleBlog</Link>
        </Navbar.Brand>
        {isAuthenticated ?userLinks:''}
        <Nav className="navbar-right">
          <NavDropdown title={
            <div style={{ display: 'inline-block' }}>
              <Glyphicon glyph="list" />
            </div>
          } id="basic-nav-dropdown">
            {/* <NavLink to={"/"} className=''>
                <NavItem> 
                  <Glyphicon glyph="home" /> Home
              </NavItem>
              </NavLink> */}
            {/* <NavLink to={"/counter"}>
              <NavItem>
                <Glyphicon glyph="education" /> Counter
              </NavItem>
            </NavLink>
            <NavLink to={"/fetchdata"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Fetch data
              </NavItem>
            </NavLink> */}
            {/* <LinkContainer to={"/users"} activeClassName=''>
              <NavItem>
                <Glyphicon glyph="th-list" /> Users
              </NavItem>
            </LinkContainer> */}
            {/* <LinkContainer to={"/tags"} activeClassName=''>
              <NavItem>
                <Glyphicon glyph="th-list" /> Tags
              </NavItem>
            </LinkContainer> */}
            {/* <NavLink to={'/register'}className=''>
                <NavItem>
                  <Glyphicon glyph='th-list' /> Register Form
              </NavItem>
              </NavLink> */}
            {isAuthenticated ? <LinkContainer to={'/microblog'} activeClassName=''>
              <NavItem>
                <Glyphicon glyph='plus' /> Microblog
                 </NavItem>
            </LinkContainer> : ''}
            {isAuthenticated ? <LinkContainer to={'/user'} activeClassName=''>
              <NavItem>
                <Glyphicon glyph='user' /> Profile
              </NavItem>
            </LinkContainer> : ''}
            {isAuthenticated&&user.roles==='Admin' ? <LinkContainer to={'/admin'} activeClassName=''>
              <NavItem>
                <Glyphicon glyph='cog' /> Admin
              </NavItem>
            </LinkContainer> : ''}
            {isAuthenticated ? logoutLink : loginLinks}
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

NavMenu.propTypes =
  {
    logout: PropTypes.func.isRequired
  }

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavMenu));

