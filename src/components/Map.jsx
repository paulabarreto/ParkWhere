import React, { Component } from 'react';
import { render } from 'react-dom';
import {InfoWindow} from 'react-google-maps'
// function InfoWindow(props) {
//   return (
//     <div>
//     </div>
//   );
// }

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapElementId: 'map',
      mapOption:{
        center:{lat:43.6529, lng: -79.3849},
        zoom: 8
      }
    }
  }

  onMapLoad = (map) => {
    let marker = new window.google.maps.Marker({
      position: {lat: 43.6529, lng: -79.3849},
      map: map,
      title: 'Hello Toronto!',
      icon:'https://cdn.iconscout.com/icon/premium/png-32-thumb/parking-place-2-897308.png'
    });

    marker.addListener('click', e => {
      this.createInfoWindow(e, map)
    })
  }

  createInfoWindow = (e, map) => {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />My First Parking </div>',
        position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
    })

    infoWindow.addListener('domready', e => {
      render(<InfoWindow position ={{lat:43.6529, lng: -79.3849}}><div></div></InfoWindow>, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.state.mapElementId),
      this.state.mapOption);
    this.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBy4S2fVXGUqZOTXl_QIFicfPb56BWbVGo';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', () => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: '50%', height: '50vh' }} id={this.state.mapElementId} />
    );
  }
}

export default Map