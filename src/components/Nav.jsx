import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { Input, Button, Icon, DatePicker} from 'antd';
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

export default withCookies(NavBar);
