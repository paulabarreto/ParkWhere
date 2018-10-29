import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
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
      name: cookies.get('name') || ''
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }

  // geolocate = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var geolocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       var circle = new this.google.maps.Circle({
  //         center: geolocation,
  //         radius: position.coords.accuracy
  //       });
  //       autocomplete.setBounds(circle.getBounds());
  //     });
  //   }
  // }



  render() {
    const { name } = this.state;

    let login = "";
    let register = "";

    if({name}){
      login = (
        <NavItem>
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
