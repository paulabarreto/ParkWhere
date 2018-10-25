import React, {Component} from 'react';
import { Well, Button, FormGroup, InputGroup, FormControl }from 'react-bootstrap';

class NewParkingInfo  extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const coordsArr = this.props.polyLine? this.props.polyLine.getPath().getArray() : '';

    const onCancel = () => {
      this.props.onCondChange('isSubmitInfoOpen',false)
      // this.props.clearForm();
    }
    const onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit();
      onCancel();
    }
    const onChange = key => e => {
      this.props.onChange(key, e.target.value)
    }
    const onCoordChange = (key,latlng) => e => {
      this.props.OnCoordChange(key,latlng,e.target.value)
    }
    return  (
      <Well className={this.props.classname}> 
        <form onSubmit={onSubmit}>
        Enter Parking Info
          <FormGroup>
            <InputGroup.Addon>Coodinates</InputGroup.Addon>
            <InputGroup>
              {this.props.polyLine?coordsArr.map(coord=>(
                <>
                  <FormControl 
                  type="text" 
                  value={coord.lat()}
                  />
                  <FormControl 
                  type="text" 
                  value={coord.lng()}
                  />
                </>      
              )):''}
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>Hours</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('hours')}
                value={this.props.polyLine.hours}
                />
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>Rate</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('rate')}
                value={this.props.polyLine.rate}
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