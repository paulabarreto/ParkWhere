import React, { Component } from 'react';
import mapstyle from './mapcontrols/mapstyle';
import mapstyle_silver from '././mapcontrols/mapstyle_silver';
import CurrentLocationControl from './mapcontrols/CurrentLocationControl';
import DrawPolyControl from './mapcontrols/DrawPolyControl';
import NotificationControl from  './mapcontrols/NotificationControl';
import CheckedControl from './mapcontrols/CheckedControl';
import UncheckedControl from  './mapcontrols/UncheckedControl'; 
import LegendCollapseControl from  './mapcontrols/LegendCollapseControl'; 
import LegendExpendControl from './mapcontrols/LegendExpendControl';
import Rate5Control from './mapcontrols/Rate5Control';
import Rate4Control from './mapcontrols/Rate4Control';
import Rate3Control from './mapcontrols/Rate3Control';
import Rate2Control from './mapcontrols/Rate2Control';
import RefreshControl from './mapcontrols/RefreshControl';
import StreetParkingRate from './mapcontrols/StreetParkingRate';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      curloc: null,
      address:'',
      map:'',
      legendExpendClick:true
    };
  }

  //create google map on the window
  loadMap = () => {
    let mapOption = {
      center:{lat:43.6529, lng: -79.3849}, // toronto
      zoom: 15,
      mapTypeControl: false,
      draggableCursor: 'default',
      disableDefaultUI: true,
      styles: mapstyle
    }
    const map = new window.google.maps.Map(document.getElementById('map'),mapOption);
    const geocoder = new window.google.maps.Geocoder();
    map.addListener('click',()=>{
      this.props.setCond('isInfoOpen',false);
    });
    if(this.state.curloc){
      map.addListener('zoom_changed',()=>{
        this.state.curloc.setMap(null);
      })
    }

    map.addListener('rightclick', ()=>{
      map.setZoom(15);
    })
    this.setState(prevState => ({...prevState, map: map}));
    this.props.setApiObj(map,geocoder);
    this.handleCurrentLocation(map);
    this.handleDrawPoly(map,geocoder);
    this.LegendDiv(map);
    this.loadData(geocoder);

    let RefreshControlDiv = this.newControl(RefreshControl);
    map.controls[window.google.maps.ControlPosition.LEFT_BOTTOM].push(RefreshControlDiv);
    RefreshControlDiv.addEventListener('click', ()=>{
      this.props.showPolyline();
    }) 
  }

  // loadData = (geocoder) => {
    
  //   let coords = this.props.coords;
  //   let runFetch = ()=>{
  //     if (coords.length ===0){
  //       return
  //     }
  //     console.log(coords)
  //     let coord = coords.pop();
  //     let startCoord = {lat: coord.lat_start, lng: coord.lng_start};
  //     let endCoord = {lat: coord.lat_end, lng: coord.lng_end};
  //     let midCoord = {
  //       lat:(startCoord.lat + endCoord.lat)/2,
  //       lng:(startCoord.lng + endCoord.lng)/2
  //     }
  //     geocoder.geocode({ 'location': midCoord }, (results, status) => {
  //       if (status === window.google.maps.GeocoderStatus.OK) {
  //         let data = {
  //           hours:coord.hours,
  //           rate:coord.rate,
  //           rating:coord.rating,
  //           id: coord.parking_id,
  //           comments: coord.comments,
  //           address: results[0].formatted_address};
  //         let newPoly = this.placePoly(startCoord, endCoord, data);
  //         switch(true){
  //           case (coord.rate === 5):
  //           newPoly.setOptions({strokeColor:'red'})
  //           break;
  //           case (coord.rate === 4):
  //           newPoly.setOptions({strokeColor:'purple'})
  //           break;
  //           case (coord.rate === 3):
  //           newPoly.setOptions({strokeColor:'blue'})
  //           break;
  //           case (coord.rate === 2):
  //           newPoly.setOptions({strokeColor:'green'})
  //           break;
  //         }
  //         newPoly.setMap(this.state.map);
  //         this.props.addLine(newPoly);
  //       }
  //       else{
  //         console.log('Status Error:',status)
  //       }
  //     })
  //     setTimeout(() => {
  //       runFetch();
  //     }, 1500);
  //   };
  //   runFetch();
  // }
  loadData = () => {
    this.props.coords.forEach(coord=>{    
      let startCoord = {lat: coord.lat_start, lng: coord.lng_start};
      let endCoord = {lat: coord.lat_end, lng: coord.lng_end};
      let data = {
        hours:coord.hours,
        rate:coord.rate,
        rating:coord.rating,
        id: coord.id,
        comments: coord.comments,
        address: ''
      }
     
      let newPoly = this.placePoly(startCoord, endCoord, data,this.state.map);
        switch(true){
          case (coord.rate === 5):
            newPoly.setOptions({strokeColor:'#FD795B'})
            break;
          case (coord.rate === 4):
            newPoly.setOptions({strokeColor:'#814374'})
            break;
         case (coord.rate === 3):
            newPoly.setOptions({strokeColor:'#336699'})
            break;
          case (coord.rate === 2):
          newPoly.setOptions({strokeColor:'#8EDC9D'})
            break;
          default:
            newPoly.setOptions({strokeColor:'#3A3A3C'})
            break;
        }
      newPoly.setMap(this.state.map);
      this.props.addLine(newPoly);
    })
}


  handleCurrentLocation = (map) => {

    //create a div container for current location
    let currentLocationDiv = this.newControl(CurrentLocationControl);
    //push the div into google map as a new map control
    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(currentLocationDiv);
    currentLocationDiv.addEventListener('mouseover', ()=>{
      currentLocationDiv.style.backgroundImage = "url('gps-fixed.png')";
    });
    currentLocationDiv.addEventListener('mouseleave', ()=>{
      currentLocationDiv.style.backgroundImage = "url('gps-location.png')";
    });

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

  handleDrawPoly = (map,geocoder) => {
    //create a div container for button to enable poly drawing
    let drawPolyDiv = this.newControl(DrawPolyControl);
    // add checked button to confirm draw poly line
    let CheckedControlDiv = this.newControl(CheckedControl);
    let UncheckedControlDiv = this.newControl(UncheckedControl);
    CheckedControlDiv.addEventListener('mouseover', ()=>{
      CheckedControlDiv.style.backgroundImage = "url('confirm-color.png')";
    })
    CheckedControlDiv.addEventListener('mouseleave', ()=>{
      CheckedControlDiv.style.backgroundImage = "url('confirm.png')"
    })
    UncheckedControlDiv.addEventListener('mouseover', ()=>{
      UncheckedControlDiv.style.backgroundImage = "url('cancel-color.png')";
    })
    UncheckedControlDiv.addEventListener('mouseleave', ()=>{
      UncheckedControlDiv.style.backgroundImage = "url('cancel.png')"
    })

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(drawPolyDiv);
    drawPolyDiv.addEventListener('mouseover', ()=>{
      drawPolyDiv.style.backgroundImage = "url('add-circular-button.png')";
    })
    drawPolyDiv.addEventListener('mouseleave', ()=>{
      drawPolyDiv.style.backgroundImage = "url('add-circular-button-small.png')"
    })

    //store the click state of the draw_poly_button
    let checkDrawPolyClick  = true;

    // add click event to the draw_poly_button
    drawPolyDiv.addEventListener('click',() =>{
      map.setZoom(16);
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

        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(CheckedControlDiv);
        
        CheckedControlDiv.addEventListener('click', ()=>{
          if (startCoord && endCoord){
            this.props.setCond('isSubmitInfoOpen',true);
          }
          CheckedControlDiv.style.backgroundImage = "url('confirm.png')";
          map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear(); // clear notification
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear(); //clear both c
          newMarkers.forEach(marker=>(marker.setMap(null)));
          checkMapClick = false;
          mapClickCount = 3;
          checkDrawPolyClick = true;
        })

        map.controls[window.google.maps.ControlPosition.LEFT_TOP].push(UncheckedControlDiv);
        UncheckedControlDiv.addEventListener('click',() =>{
          UncheckedControlDiv.style.backgroundImage = "url('cancel.png')";
          map.controls[window.google.maps.ControlPosition.LEFT_TOP].clear();
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].clear();
          newMarkers.forEach(marker=>(marker.setMap(null)));
          if (!this.props.selectedLine.id){
            this.props.clearPoly();
          }
          checkMapClick = false;
          mapClickCount = 3;
          checkDrawPolyClick = true;
          map.setZoom(15);
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
              this.props.setCond('isClearPoly',true);
              //add new marker on click
              newMarkers.push(this.placeMarker(map,e.latLng));
              endCoord = e.latLng;
              
              let data = {hours:[], rate:'', id:'', rating:0,comment:'',address:''};
              let newPoly = this.placePoly(startCoord,endCoord,data,map);
              this.props.setPoly(newPoly);
              newPoly.setMap(map);
              mapClickCount++;
              newMarkers.forEach(marker=>{
                window.setTimeout(() => {
                  marker.setAnimation(window.google.maps.Animation.BOUNCE)
                  window.setTimeout(() => {
                    marker.setAnimation(null)
                  },5000)
                },1000)
              });
              let midCoord = {
                lat:(startCoord.lat() + endCoord.lat())/2,
                lng:(startCoord.lng() + endCoord.lng())/2
              }
              geocoder.geocode({ 'location': midCoord }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK) {
                  let address = results[0].formatted_address;
                  newPoly.address = address;
                }})
            }
          })
        }
      }
    })
  }

  LegendDiv = (map) => {
    let LegendExpendControlDiv = this.newControl(LegendExpendControl);
    let LegendCollapseControlDiv = this.newControl( LegendCollapseControl);
    let StreetParkingRateDiv = this.newControl(StreetParkingRate);
    let Rate5ControlDiv = this.newControl(Rate5Control);

    let Rate4ControlDiv = this.newControl(Rate4Control);
    let Rate3ControlDiv = this.newControl(Rate3Control);
    let Rate2ControlDiv = this.newControl(Rate2Control);

    Rate5ControlDiv.addEventListener('click',()=>{this.props.onHourRateClick(5)});
    Rate4ControlDiv.addEventListener('click',()=>{this.props.onHourRateClick(4)});
    Rate3ControlDiv.addEventListener('click',()=>{this.props.onHourRateClick(3)});
    Rate2ControlDiv.addEventListener('click',()=>{this.props.onHourRateClick(2)});

    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(LegendExpendControlDiv);
    // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(StreetParkingRateDiv);
    LegendExpendControlDiv.addEventListener('click',() =>{
      if(this.state.legendExpendClick){
       // window.setTimeout(()=>{},400)
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].clear();
        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push( LegendCollapseControlDiv);
        window.setTimeout(()=>{map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate5ControlDiv);},100) 
        window.setTimeout(()=>{map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate4ControlDiv);},150) 
        window.setTimeout(()=>{map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate3ControlDiv);},200) 
        window.setTimeout(()=>{map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate2ControlDiv);},250) 

        // map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate4ControlDiv);
        // map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate3ControlDiv);
        // map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(Rate2ControlDiv);
        this.setState(prevState => ({...prevState, legendExpendClick: false}));
      }
    })
    LegendExpendControlDiv.addEventListener('mouseover', ()=>{
      LegendExpendControlDiv.style.backgroundImage = "url('menu-hover.png')";
    });
    LegendExpendControlDiv.addEventListener('mouseleave', ()=>{
      LegendExpendControlDiv.style.backgroundImage = "url('menu.png')";
    });

    LegendCollapseControlDiv.addEventListener('click',()=>{
      
      map.controls[window.google.maps.ControlPosition.RIGHT_TOP].clear(); 
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].clear(); 
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(LegendExpendControlDiv);
      // map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(StreetParkingRateDiv);
      this.setState(prevState => ({...prevState, legendExpendClick: true}));
      this.props.showPolyline();
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

  placePoly = (startCoord,endCoord,data,map) => {
    let poly = new window.google.maps.Polyline({
      path:[startCoord,endCoord],
      //editable: true,
      strokeColor: '#3A3A3C',
      strokeOpacity: 0.8,
      strokeWeight: 5
    });
    for(let key in data){
      poly[key] = data[key]
    }
    poly.addListener('click',(e)=>{
      this.props.setCond('isInfoOpen',true);
      this.props.setPoly(poly);
      this.props.setCond('isClearPoly',false);
      map.setZoom(16);
      map.setCenter(startCoord);
    })

    poly.addListener('mouseover', ()=>{
      poly.setOptions({strokeWeight:7,strokeOpacity: 1});
    })
    poly.addListener('mouseout', ()=>{
      poly.setOptions({strokeWeight:3,strokeOpacity: 0.8});
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
                  scaledSize: new window.google.maps.Size(40, 40),
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
        this.setState(prevState => ({...prevState, curloc: curloc}));
      })
    }
  }

  componentDidMount() {
    if (!window.google) {
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBy4S2fVXGUqZOTXl_QIFicfPb56BWbVGo&libraries=places';
      let x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', () => {
        this.loadMap();
      })
    } else {
      this.loadMap();
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '80vh' }} id={'map'} />
    );
  }
}
export default Map;