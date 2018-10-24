import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import NewParkingInfo from './NewParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
class Home extends Component {
  state = {
    parkinginfo:{
      startCoord:{lat:'',lng:''},
      endCoord:{lat:'',lng:''},
      hours:'',
      rate:'',
      parking_id:''},
    username: this.props.username,
    infofromserver:[],
    curpoly:'',
    isInfoOpen: false,
    isSubmitInfoOpen: false,
    isPolyPlaced: false
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

  _handleInfoSubmit = () => {
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{...this.state.parkinginfo},
      withCredentials: true
    })
    .then(res => console(res))
  }
  setCond = (key,boolean) => {
    this.setState(prevState => ({...prevState, [key]: boolean}));
  }

  setPrkInfo = (key,value) => {
    let prkinfo = {...this.state.parkinginfo};
    prkinfo[key] = value;
    this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
    console.log(this.state.parkinginfo)
  }

  setOriginPrkInfoState = () => {
    let prkinfo = {
      startCoord:{lat:'',lng:''},
      endCoord:{lat:'',lng:''},
      hours:'',
      rate:'',
      parking_id:''};
    this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
  }
  setPoly = (poly) => {
    this.setState(prevState => ({...prevState, curpoly:poly}));
  }

  render() {

    return (
      <div>
        <Nav username={this.state.username}/>

        <NewParkingInfo 
        classname={this.state.isSubmitInfoOpen ? 'parking-info': 'parking-info-hide'} 
        onCondChange={this.setCond} 
        getInfo={this.state.parkinginfo} 
        onSubmit={this._handleInfoSubmit}
        onChange={this.setPrkInfo}
        clearForm={this.setOriginPrkInfoState}
        />
          <ParkingInfo 
          classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'}
          getInfo={this.state.parkinginfo} 
          onEditClick={this.setCond}
          />

        <div className='map-container'>
          < Map coords={this.state.infofromserver} 
          onCondChange={this.setCond} 
          setInfo={this.setPrkInfo}
          isPolyPlaced={this.state.isPolyPlaced}
          setPoly={this.setPoly}
          getPoly={this.state.curpoly}
          />
        </div>
      </div>
    );
  }
}

export default Home;