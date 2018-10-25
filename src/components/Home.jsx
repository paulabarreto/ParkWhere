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
    isSubmitInfoOpen: false
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

  setPolyWithKey = (key,value) => {
    let poly = this.state.polyline;
    poly[key] = value;
    this.setState(prevState => ({...prevState, polyline:poly}));
  }
  // setPrkInfo = (key,value) => {
  //   let prkinfo = {...this.state.parkinginfo};
  //   prkinfo[key] = value;
  //   this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
  //   //console.log(this.state.parkinginfo)
  // }

  // update the coordi
  // setCoordInfo = (key,latlng,value) => {
  //   let prkinfo = {...this.state.parkinginfo};
  //   let {startCoord} = this.state.parkinginfo;
  //   let {endCoord} = this.state.parkinginfo;
  //   switch (key){
  //     case 'startCoord':
  //       startCoord[latlng] = value;
  //       prkinfo.startCoord = startCoord;
  //     break;
  //     case 'endCoord':
  //       endCoord[latlng] = value;
  //       prkinfo.endCoord = endCoord;
  //     break;
  //   }
  //   this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
  //   console.log(this.state.parkinginfo)
  // }
  // setOriginPrkInfoState = () => {
  //   let prkinfo = {
  //     startCoord:{lat:'',lng:''},
  //     endCoord:{lat:'',lng:''},
  //     hours:'',
  //     rate:'',
  //     id:''};
  //   this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
  // }

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