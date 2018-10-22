import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import Model from './Model.jsx'


class Home extends Component {
  state = {
    coords: [],
    username: this.props.username
  }
  componentDidMount() {

    axios.get("http://localhost:8080/",{
      params: {
        ID: 12345
      }
    })
      .then(res => {
        this.setState({coords:res.data})
        //console.log(this.state)
      })
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
   this.setState({ show: false });
 }

  render() {
    return (
      <div>
        <button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Launch demo modal
        </button>
        <Nav username={this.state.username}/>
        < Map coords={this.state.coords}/>
        <Model show={this.state.show} onHide={this.handleClose}/>
      </div>

    );
  }
}

export default Home;
