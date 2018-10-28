import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { Input, Button, Icon, Select, DatePicker} from 'antd';
import 'antd/dist/antd.css';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      dateObject:'',
      searchValue:''
    }
  }

  handleLogin = username => {
    this.setState({username: username})
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onDateChange = (date) => {
    this.onChange('dateObject',date)
  }

  onInputChange = (input) => {
    this.onChange('searchValue', input.target.value);
  }

  onSearchClick = () => {
    this.props.handleSearch(this.state.searchValue,this.state.dateObject)
  }

  emitEmpty = () => {
    this.searchInput.focus();
    this.setState({ searchValue: '' });
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

    const suffix = this.state.searchValue ? <Icon type="close" onClick={this.emitEmpty} /> : null;
    return (
      <Navbar>
          <Navbar.Brand>
            ParkWhere
          </Navbar.Brand>
          <Icon type="search" theme="outlined" />
          <div className='search' >
            <Input
              placeholder="address"
              style={{ width: 200 }}
              suffix={suffix}
              value={this.state.searchValue}
              onChange={this.onInputChange}
              ref={node => this.searchInput = node}
            />
            <DatePicker
              showTime
              format="YYYY-MM-DD h:mm:ss a"
              placeholder="Select date and time"
              onChange={this.onDateChange}
            />
            <Button onClick={this.onSearchClick}>Search</Button>
          </div>
          <Nav>
            {login}  {register}
          </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
