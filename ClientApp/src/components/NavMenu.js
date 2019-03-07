import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Glyphicon, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavMenu.css";

class NavMenu extends Component {
  state = {  }
  render() { 
    const props=this.props;
    const {isAuthenticated, user} = this.props.auth;
        console.log(isAuthenticated);

        const userLinks = (
          <LinkContainer to={"/login"}>
            <NavItem>
             <Glyphicon glyph="th-list" /> {user.name} Logout
            </NavItem>
          </LinkContainer>
        );

        const guestLinks = (
          <LinkContainer to={"/login"}>
            <NavItem>
              <Glyphicon glyph="th-list" /> Login Form
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
            {isAuthenticated ? userLinks : guestLinks}
            <LinkContainer to={"/users"}>
              <NavItem>
                <Glyphicon glyph="th-list" /> Users
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
      auth: state.auth
  };
}
 
export default connect(mapStateToProps, null)(NavMenu);
