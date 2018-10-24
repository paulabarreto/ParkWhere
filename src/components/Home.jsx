import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import AddParkingInfo from './AddParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
class Home extends Component {
  state = {
    coords: [],
    username: this.props.username,
    isInfoOpen: false,
    isAddInfoOpen: false,
    parking_id:''
  }
  componentDidMount() {

    axios.get("http://localhost:8080/parking_info",{
      withCredentials: true
    })
      .then(res => {
        this.setState(prevState => ({...prevState, coords:res.data}))
        console.log(res.data)
      })
  }

  handleShow = key => {
    this.setState(prevState => ({...prevState, [key]: true}));
  }

  handleClose = key => {
    this.setState(prevState => ({...prevState, [key]: false}));
 }
  setCoords = (coord1,coord2) => {
    this.setState(prevState => ({...prevState, coords:[coord1,coord2]}))
  }
  
  render() {
    const testbutton =()=>{
      this.setState({ isInfoOpen: true })
  }
  const handleParkingInfoSubmit = (data) => {
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{...data,coords:this.state.coords},
      withCredentials: true
    })
    .then(res => console(res))
  }
    return (
      <div>
        <button onClick={testbutton}>
          Parking Info Test Button
        </button>
        {/* <Nav username={this.state.username}/> */}

        <AddParkingInfo 
        classname={this.state.isAddInfoOpen ? 'parking-info': 'parking-info-hide'} 
        onInfoShow={this.handleShow} 
        onInfoHide={this.handleClose} 
        getCoords={this.state.coords} 
        onSubmit={handleParkingInfoSubmit}/>
          <ParkingInfo 
          classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'}/>

        <div className='map-container'>
          < Map coords={this.state.coords} 
          onInfoShow={this.handleShow} 
          onInfoHide={this.handleClose } 
          setCoords={this.setCoords}/>
        </div>
      </div>
    );
  }
}

export default Home;