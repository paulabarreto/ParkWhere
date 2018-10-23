import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import ParkingInfo from './ParkingInfo.jsx'
class Home extends Component {
  state = {
    coords: [],
    username: this.props.username,
    show:false,
    isInfoOpen: false
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
        console.log(this.state);

        // axios.get("http://localhost:8080/session", {withCredentials: true})
        // .then(console.log)
      })
  }

  handleShow = key => {
    this.setState({ [key]: true });
  }

  handleClose = key => {
   this.setState({ [key]: false });
 }
  setCoords = (coord1,coord2) => {
    this.setState({coords:[coord1,coord2]})
  }

  render() {
  const onButton = () => {
    this.handleShow('isInfoOpen')
  }
  const onSubmit = (e) => {
    console.log(e.target)
  }
    return (
      <div>

        <button onClick={onButton}>
          Launch demo modal
        </button>
        <Nav username={this.state.username}/>
        <ParkingInfo classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'} onInfoShow={this.handleShow} onInfoHide={this.handleClose} getCoords={this.state.coords} onSubmit={onSubmit}/>

        <div className='map-container'>
          <Map coords={this.state.coords} onInfoShow={this.handleShow} onInfoHide={this.handleClose } setCoords={this.setCoords}/>
        </div>
      </div>
    );
  }
}

export default Home;
