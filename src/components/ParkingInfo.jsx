import React, {Component} from 'react';
import { Well, Button } from 'react-bootstrap';

class ParkingInfo  extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const lat1 = this.props.getInfo.startCoord.lat;
    const lng1 = this.props.getInfo.startCoord.lng;
    const lat2 = this.props.getInfo.endCoord.lat;
    const lng2 = this.props.getInfo.endCoord.lng;
    return  (
      <Well className={this.props.classname}> 
        <h3>Parkin Info</h3>
        <p>Coordinates: [{lat1},{lng1}],[{lat2},{lng2}]</p> <br/>
        <p>Hours: {this.props.getInfo.hours}</p> <br/>
        <p>Rate: {this.props.getInfo.rate}</p> <br/>
        <Button bsStyle="primary">Edit</Button>
      </Well>
    )
  }
}

export default ParkingInfo;