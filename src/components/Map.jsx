import React, { Component } from 'react';
import mapstyle from './mapcontrols/mapstyle';
import CurrentLocationControl from './mapcontrols/CurrentLocationControl';
import DrawPolyControl from './mapcontrols/DrawPolyControl';
import NotificationControl from  './mapcontrols/NotificationControl';
import CheckedControl from './mapcontrols/CheckedControl';
import UncheckedControl from  './mapcontrols/UncheckedControl';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      curloc: null
    };
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
    map.addListener('click',()=>{
      this.props.onCondChange('isInfoOpen',false)
    })
    //put all markers from database to the map
    this.props.coords.forEach(coord => {
      let startCoord = {lat: coord.lat_start, lng: coord.lng_start};
      let endCoord = {lat: coord.lat_end, lng: coord.lng_end};
      let data = {hours:coord.hours,rate:coord.rate,id:coord.id};
      let newPoly = this.placePoly(startCoord, endCoord, data);
      newPoly.setMap(map);
    })
    
    this.handleCurrentLocation(map);
    this.handleDrawPoly(map);
    if(this.props.getPoly&&this.props.isPolyPlaced){
      console.log('lalalalal')
      this.props.getPoly.setMap(null)
    }
  }

  handleCurrentLocation = (map) => {

    //create a div container for current location
    let currentLocationDiv = this.newControl(CurrentLocationControl);
    //push the div into google map as a new map control
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(currentLocationDiv);

    //add eventlistener for the current location button to get the pin point to current location
    currentLocationDiv.addEventListener('click', () => {
      if (this.state.curloc) {
        //clear the marker if existed on the map
        this.state.curloc.setMap(null);
        this.currentLocation(map);
      }
      else{
        this.currentLocation(map);
      }
    });
  }

  handleDrawPoly = (map) => {
    //create a div container for button to enable poly drawing
    let drawPolyDiv = this.newControl(DrawPolyControl)
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(drawPolyDiv);

    //store the click state of the draw_poly_button
    let checkDrawPolyClick  = true;
   
    // add click event to the draw_poly_button
    drawPolyDiv.addEventListener('click',() =>{
      if (checkDrawPolyClick){
        //disable the click state once it has been click
        checkDrawPolyClick = false;

        let mapClickCount = 1; //count clicks on the map
        let checkMapClick = true; //enable map click
        let startCoord,endCoord; //coordinates for poly line based on first and second click
        let newMarkers =[]; //add markers for the coordinates

        // add notification for draw poly instruction, shown on the top centre on the map
        let NotificationControlDiv = this.newControl(NotificationControl);
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(NotificationControlDiv);

        // add checked button to confirm draw poly line
        let CheckedControlDiv = this.newControl(CheckedControl)
        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(CheckedControlDiv);

        CheckedControlDiv.addEventListener('click', ()=>{
          if (startCoord && endCoord){
            let c1 = {lat:startCoord.lat(),lng: startCoord.lng()}
            let c2 = {lat:endCoord.lat(),lng: endCoord.lng()}
            this.props.onCondChange('isSubmitInfoOpen',true);
            this.props.setInfo('startCoord',c1);
            this.props.setInfo('endCoord',c2);
          }

          map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear(); // clear notification
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear(); //clear both c
          newMarkers.forEach(marker=>(marker.setMap(null)));
          checkMapClick = false;
          mapClickCount = 3;
          checkDrawPolyClick = true;
        })

        let UncheckedControlDiv = this.newControl(UncheckedControl)
        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(UncheckedControlDiv);
        UncheckedControlDiv.addEventListener('click',() =>{
          map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear();
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear();
          newMarkers.forEach(marker=>(marker.setMap(null)));
          this.props.getPoly.setMap(null)
          checkMapClick = false;
          mapClickCount = 3;
          checkDrawPolyClick = true;
        })

        if(checkMapClick){
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
              this.props.setPoly(this.placePoly(startCoord,endCoord,{hours:'',rate:''}))
              this.props.getPoly.setMap(map);
              mapClickCount++;
            }
          })
        }
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
    // marker.addListener('click', e => {
    //   this.createInfoWindow(e, map)
    // })
    return marker
  }

  placePoly = (startCoord,endCoord,data) => {
    let poly = new window.google.maps.Polyline({
      path:[startCoord,endCoord],
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 1.5
    });
    for(let key in data){
      poly[key] = data[key]
    }
    poly.addListener('click',(e)=>{
      this.props.onCondChange('isInfoOpen',true);
      this.props.setInfo('startCoord',startCoord);
      this.props.setInfo('endCoord',endCoord)
      for(let key in data){
        this.props.setInfo(key,data[key])
      }
    })
    return poly
  }

  // info window for corresponding marker
  // createInfoWindow = (e, map) => {
  //   const infoWindow = new window.google.maps.InfoWindow({
  //       content: '<div id="infoWindow" />',
  //       position: e.latLng
  //   })
  //   infoWindow.addListener('domready', e => {
  //     render(<InfoWindow />, document.getElementById('infoWindow'))
  //   })
  //   infoWindow.open(map)
  // }

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
      <div style={{ width: '100%', height: '84vh' }} id={'map'} />
    );
  }
}
export default Map
