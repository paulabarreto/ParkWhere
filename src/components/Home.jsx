import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import ParkingInfo from './ParkingInfo.jsx'


class Home extends Component {
  state = {
    coords: []
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

  render() {
    return (
      <div>
        <Nav />
        <div className='info-map-container'>
          <ParkingInfo />
          <div className='map-container'>
            < Map coords={this.state.coords}/>
          </div>
        </div>
      </div>

    );
  }
}

export default Home;
