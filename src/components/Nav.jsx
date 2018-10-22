import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavBar extends Component {

  render() {

    let login = "";
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
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            {login}
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
