
import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import 'antd/dist/antd.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class NavBar extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      username: "",
      name: cookies.get('name') || ''
    }
  }

  handleLogin = name => {
    this.setState({name: name})
    const { cookies } = this.props;
    cookies.set('name', name, { path: '/' });
  }

  handleLogout = () => {
    this.props.cookies.remove("name");
    this.setState({name: ""});

  }

  handleNameChange(name) {

  }


  render() {
    const { name } = this.state.name;

    let login = "";
    let register = "";

    if(this.state.name !== ""){
      login = (
        <Nav>
          <NavItem pullRight eventKey={1}>
            {this.state.name}
          </NavItem>
          <NavItem>
            <Navbar.Link pullRight onClick={this.handleLogout}>
              Logout
            </Navbar.Link>
          </NavItem>
        </Nav>
      );
    }else {
      login = (
        <Nav>
          <NavItem>
            <Navbar.Link pullRight>
              <Login name={name} onChange={this.handleNameChange.bind(this)} login={this.handleLogin}/>
            </Navbar.Link>
          </NavItem>
          <NavItem>
            <Navbar.Link pullRight>
              <Register login={this.handleLogin}/>
            </Navbar.Link>
          </NavItem>
        </Nav>
      );
    }
    return (
      <Navbar className="nav-bar">
        <Navbar.Header>
          <Navbar.Brand>
             <a href="http://localhost:3000">ParkWhere</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          {login}
      </Navbar>
    );
  }
}

export default withCookies(NavBar);
