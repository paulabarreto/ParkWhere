import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow.jsx'
import mapstyle from './mapstyle'
import './Map.css'
import NewControl from './NewMapControl.js'
class Map extends Component {
  
  //create google map on the window

  loadMap = () => {
    let mapOption = {
      center:{lat:43.6529, lng: -79.3849},
      zoom: 15,
      mapTypeControl: false,
      draggableCursor: 'default',
      zoomControl: false,
      fullscreenControl: false,
      styles: mapstyle
    }
    const map = new window.google.maps.Map(document.getElementById('map'),mapOption);

    //put all markers from database to the map
    this.props.coords.forEach(coord =>{
      this.placeMarker(map,coord);
    })  
    let clickCount = 1;
    let startCoord,endCoord;
    map.addListener('click', (e) => {
      let newMarker = this.placeMarker(map,e.latLng)
      newMarker.setMap(map)
      //this.placeMarker = (map, e.latLng)
      if (clickCount === 1){
        startCoord = e.latLng;
        clickCount++;
      }else if (clickCount === 2){
        endCoord = e.latLng;
        let poly = this.placePoly(startCoord,endCoord);
        poly.setMap(map);
        clickCount--;
      }
    });

    //add a map control button at the right-bottom
    let controlDiv = document.createElement('div');
    NewControl(controlDiv);
    controlDiv.index = 1;
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    //click and centre to the current location
    controlDiv.addEventListener('click', () => {
      this.currentLocation(map);
    });
  
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
    const curloc = new window.google.maps.Marker({
      clickable: false,
      icon: {url:'mylocation.png',
      scaledSize: new window.google.maps.Size(30, 30),
      origin: new window.google.maps.Point(0, 0), // origin
      anchor: new window.google.maps.Point(0, 0)},
      shadow: null,
      zIndex: 999,
      map: map
    });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        curloc.setPosition(pos);
        map.setCenter(pos);
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
