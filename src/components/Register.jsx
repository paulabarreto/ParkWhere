import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Modal} from "react-bootstrap";

//import {Redirect} from 'react-router';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      redirect: false,
      show: false
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit = event => {
    // event.preventDefault();
    this.props.login(this.state.name);
    this.setState({show: false});
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
    // if(this.state.redirect){
    //   return <Redirect to="/" />
    // }
    return (
      <div className="Login">
        <div onClick={this.handleShow}>
          Register
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                onClick={this.handleSubmit}
              >
                Register
              </Button>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
        </Modal>
      </div>

    );
  }
}