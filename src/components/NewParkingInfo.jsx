import React, {Component} from 'react';
import { Well, Button, FormGroup, InputGroup, FormControl }from 'react-bootstrap';

class NewParkingInfo  extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const lat1 = this.props.getInfo.startCoord.lat;
    const lng1 = this.props.getInfo.startCoord.lng;
    const lat2 = this.props.getInfo.endCoord.lat;
    const lng2 = this.props.getInfo.endCoord.lng;
    const onCancel = () => {
      this.props.onInfoHide('isSubmitInfoOpen',false)
      this.props.clearForm()
    }
    const onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit();
      onCancel();
      this.props.clearForm()
    }
    const onChange = key => e => {
      this.props.onChange(key, e.target.value)
    }

    return  (
      <Well className={this.props.classname}> 
        <form onSubmit={onSubmit}>
        Enter Parkin Info
          <FormGroup>
          <InputGroup.Addon>Coodinates</InputGroup.Addon>
          <InputGroup>
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={lat1}
                />
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={lng1}
                />
                <br/>
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={lat2}
                />
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={lng2}
                />
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>Hours</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={this.props.getInfo.hours}
                />
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>Rate</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('rate')}
                value={this.props.getInfo.rate}
                />
            </InputGroup>     
          </FormGroup>
          <Button onClick={onCancel}>Cancel</Button>
         <Button type='submit'>Submit</Button>
        </form>
      </Well>
    )
  }
}


export default NewParkingInfo;