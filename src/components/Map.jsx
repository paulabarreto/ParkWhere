import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow.jsx'
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapOption:{
        center:{lat:43.6529, lng: -79.3849},
        zoom: 8,
        mapTypeControl: false
      }
    }
  }
  
  //create google map on the window
  createMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById('map'),
      this.state.mapOption);
    this.createMarker(map);

  }
  
  //create marker based on coordinates from database
  createMarker = (map) => {
    this.props.coords.forEach((coord) => { 
      let marker = new window.google.maps.Marker({
        position: {lat: coord.latitude, lng: coord.longitude},
        map: map,
        icon:'https://cdn.iconscout.com/icon/premium/png-32-thumb/parking-place-2-897308.png'
      });
      marker.addListener('click', e => {
        this.createInfoWindow(e, map)
      })
    })
  }

  // info window for corresponding marker
  createInfoWindow = (e, map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />',
        position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBy4S2fVXGUqZOTXl_QIFicfPb56BWbVGo';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', () => {
        this.createMap();
      })
    } else {
      this.createMap()
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100vh' }} id={'map'} />
    );
  }
}

export default Map