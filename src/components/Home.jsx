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
    isClearPoly:false,
    isShowInputBox:false
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
    console.log(this.state.polyline)
    axios.post("http://localhost:8080/add_parking_info_data",{

      data:{coords:this.state.polyline.getPath().getArray(),
            hours:this.state.polyline.hours,
            rate:this.state.polyline.rate,
            rating:this.state.polyline.rating,
            comment: this.state.polyline.comment},
      withCredentials: true
    })
    .then(res => {console.log(res.data)
      this.setPolyWithKey('id',res.data.id)
      this.setPolyWithKey('comments',res.data.comments)
      this.setPolyWithKey('rating',res.data.rating)
    })
  }

  _handleCommentSubmit = () => {
    axios.post("http://localhost:8080/add_comment",{
      data:{comment:this.state.polyline.comment,
            parking_id:this.state.polyline.id},
      withCredentials: true
    })
    .then(res => {console.log(res.data)
    })
  }

  _handleRatingSubmit = (key,value) => {
    this.setPolyWithKey(key,value)
    console.log('rating',this.state.polyline.rating)
    axios.post("http://localhost:8080/add_rating",{
      data:{rating:this.state.polyline.rating,
            parking_id:this.state.polyline.id},
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
        onClick={this.setCond}
        polyLine={this.state.polyline}
        onRatingSubmit={this._handleRatingSubmit}
        onChange={this.setPolyWithKey}
        showInputBox={this.state.isShowInputBox}
        onCommentSubmit={this._handleCommentSubmit}
        />

        <div className='map-container'>
          < Map
          coords={this.state.infofromserver}
          setCond={this.setCond}
          setPoly={this.setPoly}
          polyLine={this.state.polyline}
          clearPoly={this.clearPoly}
          />
        </div>
      </div>
    );
  }
}

export default Home;
