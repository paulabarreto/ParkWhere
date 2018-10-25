import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import NewParkingInfo from './NewParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
class Home extends Component {
  state = {
    username: this.props.username,
    infofromserver:[],
    polyline:'',
    isInfoOpen: false,
    isSubmitInfoOpen: false,
    isEditInfo:false
  }

  componentDidMount() {

    axios.get("http://localhost:8080/parking_info",{
      withCredentials: true
    })
    .then(res => {
      this.setState(prevState => ({...prevState, infofromserver:res.data}))
      console.log(res.data)
    })
  }

  // handle new parking info sumbmit which it passed to NewParkingInfo component
  _handleInfoSubmit = () => {
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{...this.state.parkinginfo},
      withCredentials: true
    })
    .then(res => {console.log(res.data)
      this.state.polyline.id = res.data.id;
    })
  }

  // set condition base on the input key value and boolean value
  setCond = (key,boolean) => {
    this.setState(prevState => ({...prevState, [key]: boolean}));
  }

  setPoly = (poly) => {
    this.setState(prevState => ({...prevState, polyline:poly}));
  }
  clearPoly = () => {
    if(this.state.polyline){
      this.state.polyline.setMap(null)
    }
  }
  setPolyWithKey = (key,value) => {
    let poly = this.state.polyline;
    poly[key] = value;
    this.setState(prevState => ({...prevState, polyline:poly}));
  }

  render() {

    return (
      <div>
        <Nav username={this.state.username}/>

        <NewParkingInfo 
        classname={this.state.isSubmitInfoOpen ? 'parking-info': 'parking-info-hide'} 
        onCondChange={this.setCond} 
        polyLine={this.state.polyline}
        onSubmit={this._handleInfoSubmit}
        onChange={this.setPolyWithKey}
        clearPoly={this.clearPoly}
        checkEditClick={this.state.isEditInfo}
        />

        <ParkingInfo 
        classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'}
        getInfo={this.state.parkinginfo} 
        onEditClick={this.setCond}
        polyLine={this.state.polyline}
        />

        <div className='map-container'>
          < Map 
          coords={this.state.infofromserver} 
          onCondChange={this.setCond} 
          setPoly={this.setPoly}
          polyLine={this.state.polyline}
          getInfo={this.state.parkinginfo}
          />
        </div>
      </div>
    );
  }
}

export default Home;