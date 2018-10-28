import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

class NavBar extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      name: cookies.get('name') || ''
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }

  handleNameChange(name) {
    const { cookies } = this.props;

    cookies.set('name', name, { path: '/' });
  }

  handleLogin(name) {
    this.setState({name: name });

  }

  handleLogout() {
    // const { cookies } = this.props;
    // cookies.remove("name");
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:8080/logout',
    //   data: {
    //     withCredentials: true
    //   }
    // }).then(res => {
    //   this.setState({name: ""});
    // })
  }

  render() {
    const { name } = this.state;

    let login = "";
    let register = "";

    if({name}){
      login = (
        <NavItem>
          {this.state.name} | <button onClick={this.handleLogout.bind(this)}>Logout</button>
        </NavItem>
      );
    }else {
      login = (
        <NavItem>
          <Login name={name} onChange={this.handleNameChange.bind(this)} login={this.handleLogin}/>
            {this.state.name && <h1>Hello {this.state.name}!</h1>}

      </NavItem>
      );
      register = (
        <NavItem>
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

export default withCookies(NavBar);
