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
    username: this.props.username,
    show:false
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
        <button onClick={this.handleShow}>
          Launch demo modal
        </button>
        <Nav username={this.state.username}/>
        <div className='map-info-container'>
          <ParkingInfo />
          <div className='map-container'>
            < Map coords={this.state.coords} showSubmitInfo={this.handleShow} submitInfoState={this.state.show}/>
          </div>
        </div>

        <Model show={this.state.show} onHide={this.handleClose}/>
        <SubmitInfo show={this.state.show} onHide={this.handleClose}/>
      </div>

    );
  }
}

export default Home;
