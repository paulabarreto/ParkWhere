import React, {Component} from 'react';
import { Well, FormControl } from 'react-bootstrap';
import{ Button } from 'antd';
import uuid from 'uuid/v4';
import Rating from 'react-rating';
import { Icon } from 'antd';

class ParkingInfo  extends Component {

 KeyPress = e => {
   if (e.key === 'Enter' ){
     this.props.onCommentSubmit();
     e.target.value = '';
     this.props.onClick('isShowInputBox',false);
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
    this.props.onChange('comment', '');
    this.props.onClick('isShowInputBox',true);
  }
  onChange = key => e => {
    this.props.onChange(key, e.target.value);
  }
  inputValue = (key) => (
    this.props.dynline[key] ? this.props.dynline[key] : ''
  )
  onRatingClick = e => (this.props.onRatingSubmit('rating', e));

  render(){
    // const coordsArr = this.props.polyline? this.props.polyline.getPath().getArray() : '';
    const dolllarDiv = [];
    const rate = this.props.polyline.rate ? this.props.polyline.rate : 0
    for(let i = 0; i < rate;i++){
      dolllarDiv.push(<Icon type="dollar" style={{color:'#EEBA4C', fontSize:40}}/>)
    }

    return  (
      <div className={this.props.classname}>
        <div className={'info-title'}>
          <h3><strong>Parking Info</strong></h3>
          <Button className={'edit-info'} type="default" icon="edit" onClick={this.onClick} />
        </div>
        <strong>Nearby Address:</strong>
        <p>{this.props.polyline.address}</p><br/>
        <strong>Hours: </strong>
        { this.props.polyline.hours ? this.props.polyline.hours.map(hour=>(
            <p key={uuid()}> {hour.date} {hour.startT} to {hour.endT} </p>
          )) : ''
        }
        <p><strong>Rate</strong>: ${this.props.polyline.rate}/hr </p>
        {rate === 0 ? <Icon type="dollar" style={{color:'rgba(0, 0, 0, .45)', fontSize:40}}/> : dolllarDiv.map(element =>(<span key={uuid()}>{element}</span>))}
        <br/><br/>
        <strong>Rating:</strong>
        <Rating
          emptySymbol={<img src="star-empty.png" className="icon" alt="empty star"/>}
          fullSymbol={<img src="star-full.png" className="icon" alt="full star"/>}
          initialRating={this.props.polyline.rating}
          onClick={this.onRatingClick}
          placeholderSymbol={<img src="star-full.png" className="icon" alt="full star"/>}
        />
      <br/><br/>
      <strong>Comments:</strong>
         {this.props.polyline.comments? this.props.polyline.comments.map(comment => <p key={uuid()}>{comment}</p>):''}
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
      </div>
    )
  }
}

export default ParkingInfo;
