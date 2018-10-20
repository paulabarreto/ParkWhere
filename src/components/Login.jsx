import React, { Component } from 'react';
// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
        <FieldGroup
          id="formControlsEmail"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />
      </form>
    );
  }
}

export default Login;
