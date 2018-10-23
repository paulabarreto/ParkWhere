import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import "./Login.css";


class NavBar extends Component {

  render() {

    let login = "";
    let register = "";
    if(this.props.username){
      login = (
        <NavItem eventKey={1} href="/">
          {this.props.username} | Logout
        </NavItem>
      );
    }else {
      login = (
          <NavItem eventKey={1} href="/login">
            Login
          </NavItem>
      );
      register = (
          <NavItem eventKey={1} href="/register">
            Register
          </NavItem>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="user_auth">
            {login}  {register}
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
