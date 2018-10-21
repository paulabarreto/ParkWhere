import React, { Component } from 'react';
import { render } from 'react-dom';
import InfoWindow from './InfoWindow.jsx'
import './Map.css'
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapOption:{
        center:{lat:43.6529, lng: -79.3849},
        zoom: 14,
        mapTypeControl: false,
        styles: [{
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }]
      }
    }
  }
  
  //create google map on the window

  loadMap = () => {
    const map = new window.google.maps.Map(
      document.getElementById('map'),
      this.state.mapOption);

    this.props.coords.forEach(coord =>{
      this.placeMarker(map,coord);
    })  
    
    map.addListener('click', (e) => {
      let marker = new window.google.maps.Marker({
        position: e.latLng,
        map: map
      });
      marker.addListener('click', e => {
        this.createInfoWindow(e, map)
      })
      //this.placeMarker = (map, e.latLng)
      map.panTo(e.latLng);

      // window.setTimeout(() => {
      //   this.createInfoWindow(e, map) 
      // }, 1000);
    });
  }
  
  //place markers on the map

  placeMarker = (map,coord) => {
    let marker = new window.google.maps.Marker({
      position: coord,
      map: map
    });
    marker.addListener('click', e => {
      this.createInfoWindow(e, map)
    })
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
