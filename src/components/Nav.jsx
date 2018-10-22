import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class NavBar extends Component {

  render() {

    let login = "";
    if(this.props.username){
      login = (
        <NavItem eventKey={1} href="/">
          Logout
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
          <NavItem eventKey={2} href="#">
            {this.props.username}
          </NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
