import React, {Component} from 'react';
import { Well, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem }from 'react-bootstrap';

class ParkingInfo  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'Duration',
      price:'$/hr',
      time1: 'AM',
      time2: 'AM'
    };
  }

  onInfoHide = () => {
    this.props.onInfoHide('isInfoOpen')
  }

  render(){
    const onSelect = key => (ek,e) => {
      let newVal = e.target.text;
      this.setState(prevState => ({...prevState, [key]: newVal}))
    };
    const onSubmit = (e) => {
      e.preventDefault();
    }
    return  (
      <Well className={this.props.classname}> 
        <form onSubmit={onSubmit}>
        <div>
          
        </div>
          <FormGroup>
            <DropdownButton
              bsStyle="default"
              bsSize="small"
              title={this.state.price}
              onSelect={onSelect('price')}
              >
              <MenuItem key="1" >5</MenuItem>
              <MenuItem key="2" >4</MenuItem>
              <MenuItem key="3" >3</MenuItem>
              <MenuItem key="4" >2</MenuItem>
            </DropdownButton>

            <DropdownButton 
              componentClass={InputGroup.Button} 
              id="input-dropdown-addon" 
              title={this.state.date}
              onSelect={onSelect('date')}
              >
                <MenuItem key="1">MON-FRI</MenuItem>
                <MenuItem key="2">SAT</MenuItem>
                <MenuItem key="3">SUN</MenuItem>
            </DropdownButton>
            <InputGroup>
              <InputGroup.Addon>From</InputGroup.Addon>
                <FormControl type="text" />
              <DropdownButton 
              componentClass={InputGroup.Button} 
              title={this.state.time1}
              onSelect={onSelect('time1')}
              >
                <MenuItem key="1">AM</MenuItem>
                <MenuItem key="2">PM</MenuItem>
              </DropdownButton>
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>To</InputGroup.Addon>
                <FormControl type="text" />
              <DropdownButton 
              componentClass={InputGroup.Button} 
              title={this.state.time2}
              onSelect={(onSelect('time2'))}
              >
                <MenuItem key="1">AM</MenuItem>
                <MenuItem key="2">PM</MenuItem>
              </DropdownButton>
            </InputGroup>     
          </FormGroup>
        </form>
        <Button onClick={this.onInfoHide}>Cancel</Button>
        <Button type='submit'>Submit</Button>
      </Well>
    )
  }
}

export default ParkingInfo;