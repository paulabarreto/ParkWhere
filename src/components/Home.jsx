import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import SubmitParkingInfo from './SubmitParkingInfo.jsx'
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
    infoFromServer:[],
    isInfoOpen: false,
    isSubmitInfoOpen: false,
    isEditInfoClicked: false
  }
  componentDidMount() {

    axios.get("http://localhost:8080/parking_info",{
      withCredentials: true
    })
      .then(res => {
        this.setState(prevState => ({...prevState, infoFromServer:res.data}))
        console.log(res.data)
      })
  }

  setTrue = key => {
    this.setState(prevState => ({...prevState, [key]: true}));
  }

  setFalse = key => {
    this.setState(prevState => ({...prevState, [key]: false}));
 }

  _handleInfoSubmit = () => {
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{...this.state.parkinginfo},
      withCredentials: true
    })
    .then(res => console(res))
  }

  setPrkInfo = (key,value) => {
    let prkinfo = {...this.state.parkinginfo};
    prkinfo[key] = value;
    this.setState(prevState => ({...prevState, parkinginfo:prkinfo}));
    console.log(this.state.parkinginfo)
  }
  render() {
    const testbutton =()=>{
      this.setState({ isInfoOpen: true })
  }

    return (
      <div>
        <button onClick={testbutton}>
          Parking Info Test Button
        </button>
        {/* <Nav username={this.state.username}/> */}

        <SubmitParkingInfo 
        classname={this.state.isSubmitInfoOpen ? 'parking-info': 'parking-info-hide'} 
        onInfoShow={this.setTrue} 
        onInfoHide={this.setFalse} 
        getInfo={this.state.parkinginfo} 
        onSubmit={this._handleInfoSubmit}
        onChange={this.setPrkInfo}
        />
          <ParkingInfo 
          classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'}
          getInfo={this.state.parkinginfo} 
          />

        <div className='map-container'>
          < Map coords={this.state.infoFromServer} 
          onInfoShow={this.setTrue} 
          onInfoHide={this.setFalse } 
          setInfo={this.setPrkInfo}/>
        </div>
      </div>
    );
  }
}

export default Home;