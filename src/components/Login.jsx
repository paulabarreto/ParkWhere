import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import {Redirect} from 'react-router';
import axios from 'axios';


import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      redirect: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }



  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.name);
    this.setState({redirect: true});
    axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      data: {
        username: this.state.name,
        withCredentials: true
      }
    }).then(res => {console.log(res.data)})
  }
  //   axios.post("http://localhost:8080/login", {withCredentials: true},
  //     {username: this.state.name}
  //   )
  //   .then(res => {console.log(res)}
  //   )
  // }

  render() {
    if(this.state.redirect){
      return <Redirect to="/" />
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
