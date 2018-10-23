import React, {Component} from 'react';
import { Well, Button } from 'react-bootstrap';
import AddParkingInfo from './AddParkingInfo.jsx'

class ParkingInfo  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parking_id:'',
      date:'Duration',
      price:'$/hr',
      from_time:'',
      to_time:'',
      from_suffix: 'AM',
      to_suffix: 'AM'
    };
  }

  render(){

    return  (
      <Well className={this.props.classname}> 
        <h3>Parkin Info</h3>
        <p>Title:</p> <br/>
        <p>Info:</p>
        <Button bsStyle="primary">Edit</Button>
      </Well>
    )
  }
}

export default ParkingInfo;