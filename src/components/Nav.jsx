import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { Input, Button, Icon, Select, DatePicker} from 'antd';
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
      dateObject:'',
      searchValue:'',
      name: cookies.get('name') || ''
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }


  render() {
    const { name } = this.state;

    let login = "";
    let register = "";

    if({name}){
      login = (
        <div className="Login">
          {this.state.name} | Logout
        </div>
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
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <Nav>
            {login}  {register}
          </Nav>
      </Navbar>
    );
  }
}

export default withCookies(NavBar);
