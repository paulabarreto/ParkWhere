import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      search:''
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
  onSearchChange = (e) => {
    this.setState({search: e.target.value})
  }
  onKeyPress = e => {
    if (e.key === 'Enter' ){
      this.props.handleSearchPlace(e.target.value)
      e.target.value = '';
    }
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
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <NavItem className='glyphicon glyphicon-search'/>
          <div className='search' >
            <input type="text" 
              placeholder="Search"
              value={this.state.search}
              onChange={this.onSearchChange}
              onKeyPress={this.onKeyPress}
            />
            <button>Search</button>
          </div>
          <Nav>
            {login}  {register}
          </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
