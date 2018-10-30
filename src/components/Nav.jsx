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
        <div>
          <div>
            {this.state.name}
          </div>
          <Button onClick={this.handleLogout}>
            Logout
          </Button>
        </div>
      );
    }else {
      login = (
        <div className="Login">
          <Login name={name} login={this.handleLogin}/>
        </div>
      );
      register = (
        <Button>
          <Register login={this.handleLogin}/>
        </Button>
      );
    }
    return (
      <Navbar>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <div className="login">
            {login} {register}
          </div>
      </Navbar>
    );
  }
}

export default withCookies(NavBar);
