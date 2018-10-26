import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import NewParkingInfo from './NewParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
class Home extends Component {
  state = {
    infofromserver:[],
    polyline:'',
    isInfoOpen: false,
    isSubmitInfoOpen: false,
    isClearPoly:false
  }

  componentDidMount() {

    axios.get("http://localhost:8080/parking_info",{
      withCredentials: true
    })
    .then(res => {
      this.setState(prevState => ({...prevState, infofromserver:res.data}))
    })
  }

  // handle new parking info sumbmit which it passed to NewParkingInfo component
  _handleInfoSubmit = () => {
    axios.post("http://localhost:8080/add_parking_info_data",{

      data:{coords:this.state.polyline.getPath().getArray(),
            hours:this.state.polyline.hours,
            rate:this.state.polyline.rate,
            id: this.state.polyline.id,
            comment: this.state.polyline.comment},
      withCredentials: true
    })
    .then(res => {console.log(res.data)
      this.state.polyline.id = res.data.id;
    })
  }

  _handleRatingSubmit = (key,value) => {
    console.log(this.props.username)
    this.setPolyWithKey(key,value)
    console.log('rating',this.state.polyline.rating)
    axios.post("http://localhost:8080/add_rating",{
      data:{rating:this.state.polyline.rating,
            user:this.props.username},
      withCredentials: true
    })
    .then(res => {console.log(res.data)
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
    if(this.state.isClearPoly){
      this.state.polyline.setMap(null);
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
        <Nav username={this.props.username}/>

        <NewParkingInfo
        classname={this.state.isSubmitInfoOpen ? 'parking-info': 'parking-info-hide'}
        onCondChange={this.setCond}
        polyLine={this.state.polyline}
        onSubmit={this._handleInfoSubmit}
        onChange={this.setPolyWithKey}
        clearPoly={this.clearPoly}
        />

        <ParkingInfo
        classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'}
        onEditClick={this.setCond}
        polyLine={this.state.polyline}
        onChange={this._handleRatingSubmit}
        />

        <div className='map-container'>
          < Map
          coords={this.state.infofromserver}
          setCond={this.setCond}
          setPoly={this.setPoly}
          polyLine={this.state.polyline}
          />
        </div>
      </div>
    );
  }
}

export default Home;
