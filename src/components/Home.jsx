import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Map from './Map.jsx';
import axios from 'axios';
import AddParkingInfo from './AddParkingInfo.jsx'
class Home extends Component {
  state = {
    coords: [],
    username: this.props.username,
    show:false,
    isInfoOpen: false
  }
  componentDidMount() {

    // axios.get("http://localhost:8080/",{
    //   params: {
    //     ID: 12345
    //   },
    //   withCredentials: true
    // })
    //   .then(res => {
    //     this.setState({coords:res.data})
    //     // console.log(res)
    //     // axios.get("http://localhost:8080/session", {withCredentials: true})
    //     // .then(console.log)
    //   })
  }

  handleShow = key => {
    this.setState({ [key]: true });
  }

  handleClose = key => {
   this.setState({ [key]: false });
 }
  setCoords = (coord1,coord2) => {
    this.setState({coords:[coord1,coord2]})
  }
  
  render() {
  const onButton = () => {
    this.handleShow('isInfoOpen')
  }
  const handleParkingInfoSubmit = (data) => {
    axios.post("http://localhost:8080/add_parking_info_data",{
      data:{...data,coords:this.state.coords},
      withCredentials: true
    })
    .then(res => console(res))
  }
    return (
      <div>
        {/* <button onClick={onButton}>
          Parking Info Test Button
        </button> */}
        <Nav username={this.state.username}/>
        <AddParkingInfo classname={this.state.isInfoOpen ? 'parking-info': 'parking-info-hide'} onInfoShow={this.handleShow} onInfoHide={this.handleClose} getCoords={this.state.coords} onSubmit={handleParkingInfoSubmit}/>

        <div className='map-container'>
          < Map coords={this.state.coords} onInfoShow={this.handleShow} onInfoHide={this.handleClose } setCoords={this.setCoords}/>
        </div>
      </div>
    );
  }
}

export default Home;
