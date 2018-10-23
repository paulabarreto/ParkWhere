import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import "./Login.css";
import Login from "./Login.jsx"


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
