import React, {Component} from 'react';
import { Well, Button, FormControl } from 'react-bootstrap';
import uuid from 'uuid/v4';
import Rating from 'react-rating';
class ParkingInfo  extends Component {
  
  KeyPress = e => {
    if (e.key === 'Enter'){
      this.props.onCommentSubmit();
      e.target.value = '';
    }
  }
  
  onClick = () => {
    this.props.onClick('isInfoOpen',false);
    this.props.onClick('isSubmitInfoOpen',true);
    this.props.onClick('isEditClick',true);
    this.props.polyline.setEditable(true);
    this.props.polyline.setDraggable(true);
  }
  onCommentClick = () => {
    this.props.onClick('isShowInputBox',true)
  }
  onChange = key => e => {
    this.props.onChange(key, e.target.value);
  }
  inputValue = (key) => (
    this.props.polyline[key] ? this.props.polyline[key] : ' '
  )
  onRatingClick = e => (this.props.onRatingSubmit('rating', e));

  render(){
    // const coordsArr = this.props.polyline? this.props.polyline.getPath().getArray() : '';
    const commentsArr = this.props.polyline.comments? this.props.polyline.comments : [];

    return  (
      <Well className={this.props.classname}>
        <h3>Parking Info <button type="button" className="btn btn-outline-info" onClick={this.onClick}>Edit</button></h3> 
        <p>Nearby Address:</p>
        <p>{this.props.polyline.address}</p><br/>
        <p>Hours: {this.props.polyline.hours}</p>
        <p>Rate: ${this.props.polyline.rate}/hr </p>
        Rating:
        <Rating
          emptySymbol={<img src="star-empty.png" className="icon" alt="empty star"/>}
          fullSymbol={<img src="star-full.png" className="icon" alt="full star"/>}
          initialRating={this.props.polyline.rating}
          onClick={this.onRatingClick}
          placeholderSymbol={<img src="star-full.png" className="icon" alt="full star"/>}
        />
      <br/><br/>
      <p>Comments:</p>
         {this.props.polyline.comments? commentsArr.map(comment => <p key={uuid()}>{comment}</p>):''}
         <br/>
         <Button bsStyle="primary" onClick={this.onCommentClick}>Add a Comment</Button>
         <FormControl
          className={this.props.showInputBox ? 'add-comment':'add-comment-hide'}
          type="text"
          placeholder="Type a comment and hit ENTER"
          onChange={this.onChange('comment')}
          value={this.inputValue('comment')}
          onKeyPress={this.KeyPress}
          /> 
      </Well>
    )
  }
}

export default ParkingInfo;
