import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import ParkingInfo from './ParkingInfo.jsx'
import SubmitInfo from './SubmitInfo.jsx'
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
      },
      withCredentials: true
    })
      .then(res => {
        this.setState({coords:res.data})
        // console.log(res)
        // axios.get("http://localhost:8080/session", {withCredentials: true})
        // .then(console.log)
      })
  }

  render() {
    return (
      <div>
        <Nav username={this.state.username}/>
        <Map coords={this.state.coords}/>
      </div>

    );
  }
}

export default Home;
