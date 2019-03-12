import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import "./NavMenu.css";


class NavMenu extends Component {
    state = {}

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
  render() { 
    const props=this.props;
    const {isAuthenticated, user} = this.props.auth;
        console.log(isAuthenticated);

        const userLinks = (
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    {user.name} &nbsp;
                  <a href="#" onClick={this.logout.bind(this)}><Glyphicon glyph="log-out" /> Logout</a>
                </Navbar.Text>
            </Navbar.Collapse>
        );

        const guestLinks = (
          <LinkContainer to={"/login"}>
            <NavItem>
              <Glyphicon glyph="th-list" /> Login
            </NavItem>
          </LinkContainer>
        );
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>WebSiteCore</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={"/"} exact>
              <NavItem>
                <Glyphicon glyph="home" /> Home
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/counter"}>
              <NavItem>
                <Glyphicon glyph="education" /> Counter
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/fetchdata"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Fetch data
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/users"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Users
              </NavItem>
            </LinkContainer>
            <LinkContainer to={"/tags"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Tags
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/register'}>
              <NavItem>
                 <Glyphicon glyph='th-list' /> Register Form
              </NavItem>
            </LinkContainer>
            {isAuthenticated ? userLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavMenu.propTypes =
{
    logout: PropTypes.func.isRequired
}

const mapStateToProps=(state)=>{
  return {
      auth: state.auth
  };
}
 
export default connect(mapStateToProps, { logout })(NavMenu);

