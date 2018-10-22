import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow.jsx';
import mapstyle from './mapcontrols/mapstyle';
import './Map.css';
import CurrentLocationControl from './mapcontrols/CurrentLocationControl';
import DrawPolyControl from './mapcontrols/DrawPolyControl';
import NotificationControl from  './mapcontrols/NotificationControl';
import CheckedControl from './mapcontrols/CheckedControl';
import UncheckedControl from  './mapcontrols/UncheckedControl';

class Map extends Component {
  state={
    curloc: null
  }

  //create google map on the window
  loadMap = () => {
    let mapOption = {
      center:{lat:43.6529, lng: -79.3849},
      zoom: 15,
      mapTypeControl: false,
      draggableCursor: 'default',
      disableDefaultUI: true,
      styles: mapstyle
    }
    const map = new window.google.maps.Map(document.getElementById('map'),mapOption);

    //put all markers from database to the map
    this.props.coords.forEach(coord =>{
      this.placeMarker(map,coord);
    }) 

    //add a map control button at the right-bottom
    let currentLocationDiv = this.newControl(CurrentLocationControl);
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(currentLocationDiv);

    //click and centre to the current location
    currentLocationDiv.addEventListener('click', () => {
      if (this.state.curloc) {
        this.state.curloc.setMap(null);
        this.currentLocation(map);
      }
      else{
        this.currentLocation(map);
      }
    });
    
    //add button for new parking info
    let drawPolyDiv = this.newControl(DrawPolyControl)
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(drawPolyDiv);

    drawPolyDiv.addEventListener('click',() =>{

      let mapClickCount = 1;
      let checkClick = true;
      let startCoord,endCoord;
      let newMarkers =[], poly;
      let NotificationControlDiv = this.newControl(NotificationControl);
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(NotificationControlDiv);

      let CheckedControlDiv = this.newControl(CheckedControl)
      map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(CheckedControlDiv);
      CheckedControlDiv.addEventListener('click', ()=>{
        map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear();
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear();
        newMarkers.forEach(marker=>(marker.setMap(null)));
        checkClick = false;
        mapClickCount = 3;
      })

      let UncheckedControlDiv = this.newControl(UncheckedControl)
      map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(UncheckedControlDiv);
      UncheckedControlDiv.addEventListener('click',() =>{
        map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear();
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear();
        newMarkers.forEach(marker=>(marker.setMap(null)));
        if (poly){
          poly.setMap(null)
        };
        checkClick = false;
        mapClickCount = 3;
      })

      if(checkClick){
        map.addListener('click', (e) => {
          //draw a polyline on map between 2 markers
          if (mapClickCount === 1){
            //add new marker on click
            newMarkers.push(this.placeMarker(map,e.latLng));
            startCoord = e.latLng;
            mapClickCount++;
          }else if (mapClickCount === 2){
            //add new marker on click
            newMarkers.push(this.placeMarker(map,e.latLng));
            endCoord = e.latLng;
            poly = this.placePoly(startCoord,endCoord);
            poly.setMap(map);
            mapClickCount++;
          }
        })
      }
    })
  }

  newControl = (Control) =>{
    let ControlDiv = document.createElement('div');
    Control(ControlDiv);
    ControlDiv.index = 1;
    return ControlDiv
  }

  //place markers on the map
  placeMarker = (map,coord) => {
    let marker = new window.google.maps.Marker({
      position: coord,
      map: map,
      icon: {url:'pin.png',
             scaledSize: new window.google.maps.Size(30, 30)},
      animation: window.google.maps.Animation.DROP,
    });
    marker.addListener('click', e => {
      this.createInfoWindow(e, map)
    })
    return marker
  }

  placePoly = (startCoord,endCoord) => {
    let poly = new window.google.maps.Polyline({
      path:[startCoord,endCoord],
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 1.5
    });
    return poly
  }
  // info window for corresponding marker
  createInfoWindow = (e, map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />',
        position: e.latLng
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  currentLocation = (map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        map.setCenter(pos);
        let curloc = new window.google.maps.Marker({
          clickable: false,
          icon:  {url:'mylocation.png',
                  scaledSize: new window.google.maps.Size(30, 30),
                  origin: new window.google.maps.Point(0, 0), 
                  anchor: new window.google.maps.Point(0, 0)},
          shadow: null,
          zIndex: 999,
          map: map,
          animation: window.google.maps.Animation.DROP,
          position:pos
        });
        window.setTimeout(() => {
          curloc.setAnimation(window.google.maps.Animation.BOUNCE)
          window.setTimeout(() => {
            curloc.setAnimation(null)
          },2000)
        },800) 
        this.setState({curloc: curloc}) 
      })
    }
  }
  

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBy4S2fVXGUqZOTXl_QIFicfPb56BWbVGo';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', () => {
        this.loadMap();
      })
    } else {
      this.loadMap()
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '80vh' }} id={'map'} />
    );
  }
}

export default Map
