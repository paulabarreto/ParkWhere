import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
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


  render() {
    const { name } = this.state.name;

    let login = "";
    let register = "";

    if(this.state.name !== ""){
      login = (
        <div className="Login">
          <div>
            {this.state.name}
          </div>
          <div onClick={this.handleLogout}>
            Logout
          </div>
        </div>
      );
    }else {
      login = (
        <div className="Login">
          <Login name={name} login={this.handleLogin}/>
        </div>
      );
      register = (
        <div className="Login">
          <Register login={this.handleLogin}/>
        </div>
      );
    }
    return (
      <Navbar>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <Nav>
            {login} <br/> {register}
          </Nav>
      </Navbar>
    );
  }
}

export default withCookies(NavBar);
