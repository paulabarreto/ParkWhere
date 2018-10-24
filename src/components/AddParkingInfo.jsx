import React, {Component} from 'react';
import { Well, Button, FormGroup, InputGroup, FormControl, DropdownButton, MenuItem }from 'react-bootstrap';

class AddParkingInfo  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:'Duration',
      price:'$/hr',
      from_time:'',
      to_time:'',
      from_suffix: 'AM',
      to_suffix: 'AM'
    };
  }

  onInfoHide = () => {
    this.props.onInfoHide('isAddInfoOpen')
    this.setState({
      date:'Duration',
      price:'$/hr',
      from_time:'',
      to_time:'',
      from_suffix: 'AM',
      to_suffix: 'AM'
    })
  }

  render(){
    const onSelect = key => (ek,e) => {
      let newVal = e.target.text;
      this.setState(prevState => ({...prevState, [key]: newVal}))
    };

    const onSubmit = (e) => {
      e.preventDefault();
      this.props.onSubmit();
      this.props.onInfoHide('isInfoOpen');
    }

    const onChange = key => (e) => {
      let newVal = e.target.value;
      this.setState(prevState => ({...prevState, [key]: newVal}));
    };

    return  (
      <Well className={this.props.classname}> 
        <form onSubmit={onSubmit}>
        <div>
          
        </div>
        Add Parkin Info
          <FormGroup>
            <DropdownButton
              id="input-dropdown-price" 
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
              id="input-dropdown-date" 
              title={this.state.date}
              onSelect={onSelect('date')}
              >
                <MenuItem key="1">MON-FRI</MenuItem>
                <MenuItem key="2">SAT</MenuItem>
                <MenuItem key="3">SUN</MenuItem>
            </DropdownButton>
            <InputGroup>
              <InputGroup.Addon>From</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('from_time')}
                value={this.state.from_time}
                />
              <DropdownButton 
              componentClass={InputGroup.Button}
              id="input-dropdown-tim1"  
              title={this.state.from_suffix}
              onSelect={onSelect('from_suffix')}
              >
                <MenuItem key="1">AM</MenuItem>
                <MenuItem key="2">PM</MenuItem>
              </DropdownButton>
            </InputGroup>

            <InputGroup>
              <InputGroup.Addon>To</InputGroup.Addon>
                <FormControl 
                type="text" 
                onChange={onChange('to_time')}
                value={this.state.to_time}
                />
              <DropdownButton 
              id="input-dropdown-tim2"
              componentClass={InputGroup.Button} 
              title={this.state.to_suffix}
              onSelect={(onSelect('to_suffix'))}
              >
                <MenuItem key="1">AM</MenuItem>
                <MenuItem key="2">PM</MenuItem>
              </DropdownButton>
            </InputGroup>     
          </FormGroup>
          <Button onClick={this.onInfoHide}>Cancel</Button>
         <Button type='submit'>Submit</Button>
        </form>
      </Well>
    )
  }
}

export default AddParkingInfo;