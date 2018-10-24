import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }

  render() {

    let login = "";
    let register = "";
    if(this.state.username){
      login = (
        <NavItem eventKey={1} href="/">
          {this.state.username} | Logout
        </NavItem>
      );
    }else {
      login = (
        <NavItem eventKey={1}>
          <Login login={this.handleLogin}/>
        </NavItem>
      );
      register = (
        <NavItem eventKey={1}>
          <Register login={this.handleLogin}/>
        </NavItem>
      );
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <Nav>
            {login}  {register}
          </Nav>
        </Navbar.Header>

      </Navbar>
    );
  }
}

export default NavBar;
