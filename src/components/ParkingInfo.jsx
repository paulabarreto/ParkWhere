import React, {Component} from 'react';
import { Well, Button } from 'react-bootstrap';

class ParkingInfo  extends Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.onEditClick('isInfoOpen',false);
    this.props.onEditClick('isSubmitInfoOpen',true);
    this.props.onEditClick('isEditClick',true);
  }
  render(){
    
    const coordsArr = this.props.polyLine? this.props.polyLine.getPath().getArray() : '';
    
    return  (
      <Well className={this.props.classname}> 
        <h3>Parkin Info</h3>
        <p>Coordinates:</p><br/>
         {this.props.polyLine? coordsArr.map(coord => <p>{coord.lat()},{coord.lng()}</p>):''}
        <p>Hours: {this.props.polyLine.hours}</p> <br/>
        <p>Rate: ${this.props.polyLine.rate}/hr </p> <br/>
        <Button bsStyle="primary" onClick={this.onClick}>Edit</Button>
      </Well>
    )
  }
}

export default ParkingInfo;