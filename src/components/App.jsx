import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import NewParkingInfo from './NewParkingInfo.jsx'
import ParkingInfo from './ParkingInfo.jsx'
import HomePage from './HomePage';
import moment from 'moment';
import Search from './Search.jsx';
import Footer from './Footer.jsx';

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
    isShowInputBox:false,
    mapVisible:false
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
    poly.rate = this.state.dynline.rate;
    poly.hours = this.state.dynline.hours;
    poly.setPath(this.state.dynline.coords);
    this.setState(prevState => ({...prevState, polyline:poly}));
    switch(true){
      case (this.state.polyline.rate === 5):
        this.state.polyline.setOptions({strokeColor:'#FD795B'})
        break;
      case (this.state.polyline.rate === 4):
        this.state.polyline.setOptions({strokeColor:'#814374'})
        break;
     case (this.state.polyline.rate === 3):
        this.state.polyline.setOptions({strokeColor:'#336699'})
        break;
      case (this.state.polyline.rate === 2):
      this.state.polyline.setOptions({strokeColor:'green'})
        break;
      default:
        this.state.polyline.setOptions({strokeColor:'#3A3A3C'})
        break;
    }

    this.addLine(this.state.polyline);
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{coords:this.state.polyline.getPath().getArray(),
            id: this.state.polyline.id,
            address: this.state.polyline.address,
            hours:JSON.stringify(this.state.polyline.hours),
            rate:this.state.polyline.rate,
            rating:0},
      withCredentials: true
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
  }

  _handleRatingSubmit = (key,value) => {
    let {dynline} = this.state;
    this.setPolyWithKey(key,value);
    this.setState(prevState => ({...prevState, polyline:dynline}));
    console.log(this.state.polyline.rating)
    axios.post("http://localhost:8080/add_rating",{
      data:{rating:this.state.polyline.rating,
            parking_id:this.state.polyline.id},
      withCredentials: true
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

    let dynline;
    if(poly!==undefined){
      dynline = {...poly};
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

  setApiObj = (map,geocoder) => {
    this.setState(prevState => ({...prevState, map:map, geocoder:geocoder}));
  }

  setPolyWithKey = (key,value) => {
    let {dynline} = this.state;
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

  handleSearch = (address,dateObject) =>{
    this.handleDateSearch(dateObject);
    this.handlePlaceSearch(address);
  }

  handlePlaceSearch = (address) => {
    if (address){
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
  }

  handleDateSearch = (dateObject) => {
    let searchTime = dateObject ? dateObject.format('HH:mm') : '';
    let searchTimeNum = Number(searchTime.split(':')[0]) + Number(searchTime.split(':')[1])/60;
    let searchDate = dateObject ? dateObject.format('dddd') : '';
    // console.log(moment(this.state.polyline.hours[0].endT,'h:mm a').format('HH:mm'))
    this.state.lines.forEach(line=>{
      if (line.hours) {
        line.hours.forEach(hour=>{
          let parkingStartTime = Number(moment(hour.startT,'h:mm a').format('HH:mm').split(':')[0])+Number(moment(hour.startT,'h:mm a').format('HH:mm').split(':')[1])/60;
          let parkingEndTime = Number(moment(hour.endT,'h:mm a').format('HH:mm').split(':')[0])+Number(moment(hour.endT,'h:mm a').format('HH:mm').split(':')[1])/60;
          if (hour.date === 'Saturday' && searchDate === 'Saturday'){
            console.log("hour.date",hour.date,"searchDate",searchDate)
            if (parkingStartTime > parkingEndTime){
              if(parkingStartTime > searchTimeNum && searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('Saturday night',searchTimeNum)
              }
            }else if (parkingStartTime < parkingEndTime){
              if(parkingStartTime > searchTimeNum || searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('Saturday day',searchTimeNum)
              }
            }
          }
          else if (hour.date === 'Sunday' && searchDate === 'Sunday'){
            console.log("hour.date",hour.date,"searchDate",searchDate)
            if (parkingStartTime > parkingEndTime){
              if(parkingStartTime > searchTimeNum && searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('Sunday night',searchTimeNum)
              }
            }else if (parkingStartTime < parkingEndTime){
              if(parkingStartTime > searchTimeNum || searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('Sunday day',searchTimeNum)
              }
            }
          }
          else if (hour.date === 'Mon-Fri' && searchDate !== 'Saturday' && searchDate !== 'Sunday'){
            console.log("hour.date",hour.date,"searchDate",searchDate)
            if (parkingStartTime > parkingEndTime){
              if(parkingStartTime > searchTimeNum && searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('weekday night',parkingStartTime,searchTimeNum,parkingEndTime)
              }
            }else if (parkingStartTime < parkingEndTime){
              if(parkingStartTime > searchTimeNum || searchTimeNum > parkingEndTime ){
                line.setVisible(false);
                console.log('weekday day',searchTimeNum)
              }
            }
          }
        })
      }
    })
  }

  render() {
    let {mapVisible} = this.state;
    return (
      <div>
        <Nav
          handleSearch={this.handleSearch}
          setCond={this.setCond}
          mapVisible={this.state.mapVisible}
          map={this.state.map}
        />
      {!mapVisible ?
        <HomePage handleSearchPlace={this.handleSearchPlace}/> : '' }

        {this.state.isSubmitInfoOpen ? (
          <NewParkingInfo
            classname={!mapVisible?'parking-info ':'parking-info-map '}
            onCondChange={this.setCond}
            dynline={this.state.dynline}
            polyline={this.state.polyline}
            onSubmit={this._handleInfoSubmit}
            onChange={this.setPolyWithKey}
            clearPoly={this.clearPoly}
          />) : ''}

        {this.state.isInfoOpen ?(
          <ParkingInfo
            classname={!mapVisible?'parking-info':'parking-info-map'}
            onClick={this.setCond}
            polyline={this.state.polyline}
            dynline={this.state.dynline}
            onRatingSubmit={this._handleRatingSubmit}
            onChange={this.setPolyWithKey}
            showInputBox={this.state.isShowInputBox}
            onCommentSubmit={this._handleCommentSubmit}
          />
          ) : ''}

        <div className="map-search-container">
        {!mapVisible?
          <div className="search">
            <Search
              handleSearch={this.handleSearch}
            />
          </div> : ''
          }
         <div className= {!mapVisible ? 'map-container' : 'map-only'}>
            < Map
              coords={this.state.infofromserver}
              setCond={this.setCond}
              setPoly={this.setPoly}
              clearPoly={this.clearPoly}
              addLine={this.addLine}
              setApiObj ={this.setApiObj }
              onHourRateClick={this._handleParkingFilter}
              showPolyline={this.showLines}
              selectedLine={this.state.polyline}
            />
          </div>
        </div>
        {!mapVisible?<Footer />: ''}
      </div>
    );
  }
}

export default App;
