import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import NewParkingInfo from './NewParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
import HomePage from './HomePage';



class App extends Component {
  state = {
    map:'',
    infofromserver:[],
    polyline:'',    // update static line when change on dynamic line confirm
    dynline:'',    // dynamic line to store change
    lines:[],
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

    let poly = this.state.polyline;
    poly.rating = this.state.dynline.rating;
    poly.hours = this.state.dynline.hours;
    poly.setPath(this.state.dynline.coords);
    this.setState(prevState => ({...prevState, polyline:poly}));

    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{coords:this.state.polyline.getPath().getArray(),
            id: this.state.polyline.id,
            hours:this.state.polyline.hours,
            rate:this.state.polyline.rate},
      withCredentials: true
    })
    .then(res => {
      // this.setPolyWithKey('id',res.data.id)
      // this.setPolyWithKey('comments',res.data.comments)
      // this.setPolyWithKey('rating',res.data.rating)
      console.log('data from new info submit',res.data)
    })
  }

  _handleCommentSubmit = () => {
    let poly = this.state.polyline;
    poly.comments.push(this.state.dynline.comment)
    console.log(poly.comments)
    this.setState(prevState => ({...prevState, polyline:poly}));
    axios.post("http://localhost:8080/add_comment",{
      data:{comment:this.state.dynline.comment,
            parking_id:this.state.polyline.id},
      withCredentials: true
    })
    .then(res => {console.log('data from comment submit',res.data)
    })
  }

  _handleRatingSubmit = (key,value) => {
    this.setPolyWithKey(key,value)
    axios.post("http://localhost:8080/add_rating",{
      data:{rating:this.state.polyline.rating,
            parking_id:this.state.polyline.id},
      withCredentials: true
    })
    .then(res => {console.log('data from rating submit',res.data)
    })
  }

  _handleParkingFilter = (index) => {
    this.state.lines.forEach( line => {
      if (line.rate === index) {
        line.setVisible(true);
      }else{
        line.setVisible(false)
      }
    })
  }
  // set condition base on the input key value and boolean value
  setCond = (key,boolean) => {
    this.setState(prevState => ({...prevState, [key]: boolean}));
  }

  setPoly = (poly) => {
    let dynline = {
      address:'',
      rate:'',
      hours:'',
      rating:'',
      comment:'',
      parking_id:'',
      coords:[]
    };
    if(poly!==undefined){
      dynline['address'] = poly.address;
      dynline['rate'] = poly.rate;
      dynline['rating'] = poly.rating;
      dynline['hours'] = poly.hours;
      dynline['comment'] = '';
      dynline['parking_id'] = poly.parking_id;
      dynline['coords'] = poly.getPath().getArray();
    }

    this.setState(prevState => ({...prevState, polyline:poly}));
    this.setState(prevState => ({...prevState, dynline:dynline}));
  }

  clearPoly = () => {
    if(this.state.isClearPoly){
      this.state.polyline.setMap(null);
    }
  }

  setApiOjb = (map,geocoder) => {
    this.setState(prevState => ({...prevState, map:map, geocoder:geocoder}));
  }

  setPolyWithKey = (key,value) => {
    let dynline = this.state.dynline;
    dynline[key] = value;
    this.setState(prevState => ({...prevState, dynline:dynline}));
  }

  addLine = (newline) => {
    this.setState(prevState => ({lines: [...prevState.lines, newline]}))
  }

  showLines = () => {
    this.state.lines.forEach(line=>{
      line.setVisible(true)
    })
  }

  handleSearch = (address,dateOjbect) =>{

  }
  handlePlaceSearch = (address) => {
    this.state.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        let queryloc = results[0].geometry.location;
        this.state.map.setCenter(queryloc);
        let querymarker = new window.google.maps.Marker({
          clickable: false,
          icon:  {url:'mylocation.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(0, 0)},
          shadow: null,
          zIndex: 999,
          map: this.state.map,
          animation: window.google.maps.Animation.DROP,
          position:queryloc
        });
        this.state.map.addListener('zoom_changed', () => {
          querymarker.setMap(null);
      });
      }else{
        console.log('Status Error', status)
      }
    })
  }

  handleDateSearch = (dateOjbect) => {

  }
  render() {

    return (
      <div>
        <Nav
          handleSearch={this.handleSearch}
        />

        <HomePage handleSearchPlace={this.handleSearchPlace}/>

        {this.state.isSubmitInfoOpen ? (
          <NewParkingInfo
            classname={'parking-info'}
            onCondChange={this.setCond}
            dynline={this.state.dynline}
            polyline={this.state.polyline}
            onSubmit={this._handleInfoSubmit}
            onChange={this.setPolyWithKey}
            clearPoly={this.clearPoly}
          />) : ''}

        {this.state.isInfoOpen ?(
          <ParkingInfo
            classname={'parking-info'}
            onClick={this.setCond}
            polyline={this.state.polyline}
            dynline={this.state.dynline}
            onRatingSubmit={this._handleRatingSubmit}
            onChange={this.setPolyWithKey}
            showInputBox={this.state.isShowInputBox}
            onCommentSubmit={this._handleCommentSubmit}
          />
          ) : ''}

        <div className='map-container'>
          < Map
            coords={this.state.infofromserver}
            setCond={this.setCond}
            setPoly={this.setPoly}
            clearPoly={this.clearPoly}
            addLine={this.addLine}
            setApiOjb ={this.setApiOjb }
            onHourRateClick={this._handleParkingFilter}
            showPolyline={this.showLines}
          />
        </div>
      </div>
    );
  }
}

export default App;
