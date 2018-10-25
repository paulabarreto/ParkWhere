import React, {Component} from 'react';
import { Well, Button } from 'react-bootstrap';
import uuid from 'uuid/v4';
import Rating from 'react-rating';
class ParkingInfo  extends Component {

  onClick = () => {
    this.props.onEditClick('isInfoOpen',false);
    this.props.onEditClick('isSubmitInfoOpen',true);
    this.props.onEditClick('isEditClick',true);
  }
  render(){
    const onRatingClick = e => (this.props.onChange('rating', e));

    const coordsArr = this.props.polyLine? this.props.polyLine.getPath().getArray() : '';
    
    return  (
      <Well className={this.props.classname}> 
        <h3>Parkin Info</h3>
        <p>Coordinates:</p><br/>
         {this.props.polyLine? coordsArr.map(coord => <p key={uuid()}>{coord.lat()},{coord.lng()}</p>):''}
        <p>Hours: {this.props.polyLine.hours}</p> <br/>
        <p>Rate: ${this.props.polyLine.rate}/hr </p>
        <Button bsStyle="primary" onClick={this.onClick}>Edit</Button><br/>
        Rating:
        <Rating
          emptySymbol={<img src="star-empty.png" className="icon" />}
          fullSymbol={<img src="star-full.png" className="icon" />}
          initialRating={this.props.polyLine.rating}
          onClick={onRatingClick}
          placeholderSymbol={<img src="star-full.png" className="icon" />}
        />
        <br/>
      </Well>
    )
  }
}

export default ParkingInfo;